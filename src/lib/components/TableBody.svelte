<tbody class="tableBody"><slot /></tbody>

<style>
    :global(.tableBody tr + tr) {
        border-block-start: 1px solid var(--hue-neutral-100);
    }
</style>
