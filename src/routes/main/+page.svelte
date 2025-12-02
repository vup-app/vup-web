<script lang="ts">
    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
    import Button from "$lib/components/Button.svelte";
    import StorageMeter from "$lib/components/StorageMeter.svelte";
    
    import { app } from "../../state.svelte";

    import DirectoryTable from "./table.svelte";

    function onChangePath(path: string) {
        console.log("onChangePath", path);
        app.currentDirectory = undefined;
        app.path = path.split("/");
        app.updateDirectory(path);
    }

    async function createDirectory() {
        if (!app.s5) return;
        const name = prompt("Name your new directory:");
        if (name) {
            try {
                if (name.includes("/")) {
                    throw "Invalid Name, contains / character";
                }
                const path = app.path.join("/");
                // In WASM, create_directory takes the full path
                const fullPath = path + "/" + name;
                await app.s5.create_directory(fullPath);
                app.currentDirectory = undefined;
                app.updateDirectory(path);
            } catch (e) {
                alert(e);
            }
        }
    }
    async function uploadFiles() {
        if (!app.s5) return;
        var input = document.createElement("input");
        input.type = "file";
        input.onchange = async (e) => {
            if (!app.s5) return;
            // @ts-ignore
            console.log(e.target.files);
            // @ts-ignore
            const file: File = e.target.files[0];

            const path = app.path.join("/");

            const arrayBuffer = await file.arrayBuffer();
            const content = new Uint8Array(arrayBuffer);
            
            await app.s5.upload_file(path, file.name, content, file.type);

            app.currentDirectory = undefined;
            app.updateDirectory(path);
            // TODO Use file.lastModified;
        };
        input.click();
    }
</script>

<main style="height: 100%; margin: 0;">
    <div
        style="display: flex; flex-direction: row; height: 100vh; width: 100vw;"
    >
        <div
            style="width: 12rem; padding: 1rem; display: flex; flex-direction: column; background-color: var(--hue-mauve-50)"
        >
            <h3 class="u:step-1 u:fw-600">Quick Access</h3>
            <ul style="list-style-type: none;">
                {#each [["Home", "home"] /* , ["Root Directory", ""] */] as path}
                    <li
                        class="u:step-2 u:fw-400"
                        style="margin: var(--space-2xs);"
                    >
                        <button
                            style="cursor: pointer;"
                            onclick={() => onChangePath(path[1])}
                            >{path[0]}</button
                        >
                    </li>
                {/each}
            </ul>
            <div style="flex-grow: 1"></div>
            {#each Object.entries(app.accountUsageStats) as portal}
                <StorageMeter
                    locationName={portal[0].split(":")[0]}
                    storageMessage={"tier: " + portal[1]["tier"]["name"]}
                    storedAmount={portal[1]["stats"]["total"]["usedStorage"]}
                    maxStorage={portal[1]["tier"]["storageLimit"]}
                />
            {/each}
            <div style="margin-top: 0.5rem;">
                <Button
                    label="Log Out"
                    onClick={app.clearLocalStateAndReload}
                />
            </div>
        </div>
        <div
            style="flex-grow: 1; align-self: stretch; margin: 1rem; max-width: 56rem"
        >
            <div
                style="display: flex; flex-direction: row; align-items: start; min-height: 3rem;"
            >
                <Breadcrumbs path={app.path} onClick={onChangePath} />
                <div style="flex-grow: 1;"></div>

                <Button
                    label="Create Directory"
                    variant="primary"
                    onClick={createDirectory}
                />
                <div style="width: 1rem;"></div>
                <Button
                    label="Upload Files"
                    variant="branded"
                    onClick={uploadFiles}
                />
            </div>
            {#if app.currentDirectory === undefined}
                <span>Loading directory...</span>
            {:else if app.currentDirectory === null}
                <span>This directory is empty</span>
            {:else}
                <DirectoryTable />
            {/if}
        </div>
    </div>
</main>
