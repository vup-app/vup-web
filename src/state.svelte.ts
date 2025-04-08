import { browser } from '$app/environment';
import { S5 } from "s5/src/s5";

class MainState {
    isLoggedIn = $state<boolean>(false);
    showSignInPage = $state<boolean>(false);

    isInitialized = $state<boolean>(false);

    path = $state<string[]>(['home'])
    currentDirectory = $state<FS5Directory | undefined | null>()

    accountUsageStats = $state<{ [key: string]: any }>({});

    s5: S5;

    async init() {
        this.s5 = await S5.create({});
        this.isLoggedIn = this.s5.hasIdentity;
        this.isInitialized = true;
        if (this.isLoggedIn) {
            this.startAccountUsageStatsUpdater();
            this.updateDirectory('home');
        }
    }

    async updateDirectory(path: string) {
        const dir = await this.s5.fs.list(path);
        if (this.path.join('/') === path) {
            console.log('dir', dir);
            if (dir === undefined) {
                this.currentDirectory = null;
            } else {
                this.currentDirectory = dir;
            }
        }
    }

    markLoggedIn() {
        this.isLoggedIn = true;
        this.startAccountUsageStatsUpdater();
        this.updateDirectory('home');
    }

    async startAccountUsageStatsUpdater() {
        await this.s5.apiWithIdentity!.updatePortalUsage();
        this.accountUsageStats = this.s5.apiWithIdentity!.accountUsageStats;
    }

    async clearLocalStateAndReload() {
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