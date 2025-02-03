<script>
    import SortableTable from "$lib/components/SortableTable.svelte";
    import TableCaption from "$lib/components/TableCaption.svelte";
    import TableHeader from "$lib/components/TableHeader.svelte";
    import TableRow from "$lib/components/TableRow.svelte";
    import TableHeaderCell from "$lib/components/TableHeaderCell.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableDataCell from "$lib/components/TableDataCell.svelte";
</script>

<SortableTable>
    <TableCaption
        caption="This is a caption for the table. This is necessary for accessibility"
    />
    <TableHeader>
        <TableRow>
            <TableHeaderCell heading="File name" />
            <TableHeaderCell heading="Size" />
            <TableHeaderCell heading="Date Modified" />
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
            <TableDataCell>File_name.mp4</TableDataCell>
            <TableDataCell>273mb</TableDataCell>
            <TableDataCell>Jun 25, 2021 at 9:20 PM</TableDataCell>
        </TableRow>
        <TableRow>
            <TableDataCell>Presentation.pdf</TableDataCell>
            <TableDataCell>9mb</TableDataCell>
            <TableDataCell>Dec 19, 2015 at 11:20 AM</TableDataCell>
        </TableRow>
        <TableRow>
            <TableDataCell>Logo_handoff_final_finalv2.zip</TableDataCell>
            <TableDataCell>1.2gb</TableDataCell>
            <TableDataCell>Aug 01, 2021 at 12:36 PM</TableDataCell>
        </TableRow>
    </TableBody>
</SortableTable>
