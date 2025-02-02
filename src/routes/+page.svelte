<script>
    import SortableTable from "$lib/components/SortableTable.svelte";
    import TableCaption from "$lib/components/TableCaption.svelte";
    import TableHeader from "$lib/components/TableHeader.svelte";
    import TableRow from "$lib/components/TableRow.svelte";
    import TableHeaderCell from "$lib/components/TableHeaderCell.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableDataCell from "$lib/components/TableDataCell.svelte";
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<SortableTable>
    <TableCaption
        caption="This is a caption for the table. This is necessary for accessibility"
    />
    <TableHeader>
        <TableRow>
            <TableHeaderCell heading="Heading One" />
            <TableHeaderCell heading="Heading Two" />
            <TableHeaderCell heading="Heading Three" />
        </TableRow>
    </TableHeader>
    <TableBody>
        <tr>
            <TableDataCell>column 1</TableDataCell>
            <TableDataCell>column 2</TableDataCell>
            <TableDataCell>column 3</TableDataCell>
        </tr>
        <tr>
            <TableDataCell>column 1</TableDataCell>
            <TableDataCell>column 2</TableDataCell>
            <TableDataCell>column 3</TableDataCell>
        </tr>
        <tr>
            <TableDataCell>column 1</TableDataCell>
            <TableDataCell>column 2</TableDataCell>
            <TableDataCell>column 3</TableDataCell>
        </tr>
    </TableBody>
</SortableTable>
