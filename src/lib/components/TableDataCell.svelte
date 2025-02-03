<td class="td-cell u:step--1"><slot /></td>

<style>
    .td-cell {
        padding-block: var(--space-3xs);
        padding-inline: var(--space-xs) var(--space-m);
        color: var(--hue-neutral-800);
    }

    @media (prefers-color-scheme: dark) {
        .td-cell {
            color: var(--hue-neutral-200);
        }
    }
</style>
