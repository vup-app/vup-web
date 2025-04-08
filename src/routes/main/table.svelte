<script lang="ts">
    import SortableTable from "$lib/components/SortableTable.svelte";
    import TableCaption from "$lib/components/TableCaption.svelte";
    import TableHeader from "$lib/components/TableHeader.svelte";
    import TableRow from "$lib/components/TableRow.svelte";
    import TableHeaderCell from "$lib/components/TableHeaderCell.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableDataCell from "$lib/components/TableDataCell.svelte";

    import { app } from "../../state.svelte";

    import type { FS5Directory } from "s5/src/fs/directory";
    import { filesize } from "filesize";

    const dir: FS5Directory = app.currentDirectory;

    function clickFile(name: string) {
        const file = dir?.files[name]!;
        const cid = file.cidString;
        const mediaType = file.mediaType;
        window.location.href = `/s5/blob/${cid}?mediaType=${mediaType}`; // &filename=${name}
    }
    function clickDirectory(dirName: string) {
        app.currentDirectory = undefined;
        app.path = [...app.path, dirName];
        app.updateDirectory(app.path.join("/"));
    }
</script>

<SortableTable>
    <TableCaption
        caption="List with the content of the currently selected directory"
    />
    <TableHeader>
        <TableRow>
            <TableHeaderCell heading="Name" />
            <TableHeaderCell heading="Size" />
            <TableHeaderCell heading="Date Created" />
        </TableRow>
    </TableHeader>
    <TableBody>
        {#each Object.keys(dir.directories) as d}
            <tr
                class="table-row"
                onclick={() => clickDirectory(d)}
                style="cursor: pointer;"
            >
                <TableDataCell>{d}/</TableDataCell>
                <TableDataCell></TableDataCell>
                <TableDataCell
                    >{new Date(
                        Number(dir.directories[d].created),
                    ).toLocaleString()}</TableDataCell
                >
            </tr>
        {/each}

        {#each Object.keys(dir.files) as f}
            <tr
                class="table-row"
                onclick={() => clickFile(f)}
                style="cursor: pointer;"
            >
                <TableDataCell>{f}</TableDataCell>
                <TableDataCell
                    >{filesize(dir.files[f].size, {
                        standard: "jedec",
                    })}</TableDataCell
                >
                <TableDataCell
                    >{new Date(
                        Number(dir.files[f].created),
                    ).toLocaleString()}</TableDataCell
                >
            </tr>
        {/each}
    </TableBody>
</SortableTable>

<style>
    .table-row {
        border-block-end: 1px solid var(--hue-neutral-200);
    }

/*     @media (prefers-color-scheme: dark) {
        .table-row {
            border-block-end-color: var(--hue-neutral-900);
        }
    } */
</style>
