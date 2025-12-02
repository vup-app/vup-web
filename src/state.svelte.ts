import { browser } from '$app/environment';
import wasmInit, { S5Client } from "@redsolver/s5-wasm";

// Remote S5 node for storage (untrusted - only sees encrypted data)
const REMOTE_NODE_ID = "TODO_REPLACE_ME";

class MainState {
    isLoggedIn = $state<boolean>(false);
    showSignInPage = $state<boolean>(false);

    isInitialized = $state<boolean>(false);

    path = $state<string[]>(['home'])
    currentDirectory = $state<any | undefined | null>()

    accountUsageStats = $state<{ [key: string]: any }>({});

    s5: S5Client | undefined;

    async init() {
        await wasmInit();
        
        // Check for existing session (seed phrase in localStorage)
        const seedPhrase = localStorage.getItem('s5_seed_phrase');
        
        if (seedPhrase) {
            try {
                this.s5 = new S5Client(seedPhrase, REMOTE_NODE_ID);
                await this.s5.connect();
                this.isLoggedIn = true;
                this.updateDirectory('home');
            } catch (e) {
                console.error("Failed to restore session:", e);
                localStorage.removeItem('s5_seed_phrase');
            }
        }
        
        this.isInitialized = true;
    }

    async updateDirectory(path: string): Promise<void> {
        if (!this.s5) return;
        
        try {
            const dir = await this.s5.list_directory(path);
            if (this.path.join('/') === path) {
                console.log('dir', dir);
                // API: files is an object { filename => FileRef }, directories is an array of strings
                const files: Record<string, any> = {};
                const rawFiles: any = dir.files;
                if (rawFiles instanceof Map) {
                    for (const [name, fileRef] of rawFiles.entries()) {
                        files[name] = {
                            size: fileRef.size,
                            media_type: fileRef.media_type || 'application/octet-stream',
                            // timestamp is in seconds, convert to milliseconds for JS Date
                            created: fileRef.timestamp ? fileRef.timestamp * 1000 : 0,
                        };
                    }
                } else {
                    for (const [name, fileRef] of Object.entries(rawFiles ?? {})) {
                        files[name] = {
                            size: (fileRef as any).size,
                            media_type: (fileRef as any).media_type || 'application/octet-stream',
                            // timestamp is in seconds, convert to milliseconds for JS Date
                            created: (fileRef as any).timestamp ? (fileRef as any).timestamp * 1000 : 0,
                        };
                    }
                }
                
                // Convert directories array to object for UI compatibility
                // Note: FS5 listing doesn't include DirRef metadata, so no timestamps available
                const directories: Record<string, any> = {};
                const dirNames: any = dir.directories;
                if (Array.isArray(dirNames)) {
                    for (const name of dirNames) {
                        directories[name] = { created: null };  // null = not available
                    }
                } else if (dirNames && typeof dirNames === 'object') {
                    for (const name of Object.keys(dirNames)) {
                        directories[name] = { created: null };
                    }
                }
                
                this.currentDirectory = {
                    files,
                    directories,
                    file_count: dir.file_count,
                    directory_count: dir.directory_count
                };
            }
        } catch (e: any) {
            // Auto-create home directory on first use
            if (path === 'home' && e.message?.includes('not found')) {
                console.log("Creating home directory for new account...");
                try {
                    await this.s5.create_directory('home');
                    // Retry listing
                    await this.updateDirectory(path);
                    return;
                } catch (createErr) {
                    console.error("Failed to create home directory:", createErr);
                }
            }
            console.error("Failed to list directory:", e);
            this.currentDirectory = null;
        }
    }

    async login(seedPhrase: string) {
        this.s5 = new S5Client(seedPhrase, REMOTE_NODE_ID);
        await this.s5.connect();
        localStorage.setItem('s5_seed_phrase', seedPhrase);
        this.markLoggedIn();
    }

    markLoggedIn() {
        this.isLoggedIn = true;
        this.updateDirectory('home');
    }

    async logout() {
        if (this.s5) {
            await this.s5.disconnect();
        }
        localStorage.removeItem('s5_seed_phrase');
        this.isLoggedIn = false;
        this.currentDirectory = null;
        window.location.reload();
    }

    async startAccountUsageStatsUpdater() {
        // Not implemented in WASM yet
        // await this.s5.apiWithIdentity!.updatePortalUsage();
        // this.accountUsageStats = this.s5.apiWithIdentity!.accountUsageStats;
    }

    async clearLocalStateAndReload() {
        localStorage.clear();
        try {
            const databases = await indexedDB.databases();
            for (const dbInfo of databases) {
                const dbName = dbInfo.name;
                if (dbName) {
                    const deleteRequest = indexedDB.deleteDatabase(dbName);
                    deleteRequest.onsuccess = () => {
                        console.log(`Database ${dbName} deleted successfully.`);
                    };
                    deleteRequest.onerror = (event) => {
                        // @ts-ignore
                        console.error(`Error deleting database ${dbName}:`, event.target.error);
                    };
                }
            }
        } catch (error) {
            console.error("Error listing databases:", error);
        }


        window.location.reload();
    }
}
export const app = new MainState();

if (browser) {
    app.init();
}