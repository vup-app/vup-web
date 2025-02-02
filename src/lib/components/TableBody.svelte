<tbody class="tableBody"><slot /></tbody>

<style>
    .tableBody {
        background-color: white;
    }

    :global(.tableBody tr + tr) {
        border-block-start: 1px solid rgba(0, 0, 0, 0.08);
    }
</style>
