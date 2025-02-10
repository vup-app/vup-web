<thead class="table-header"><slot /></thead>

<style>
    .table-header {
        border-block-end: 2px solid var(--hue-neutral-200);
    }

    @media (prefers-color-scheme: dark) {
        .table-header {
            border-block-end-color: var(--hue-neutral-900);
            color: var(--hue-neutral-50);
        }
    }
</style>
