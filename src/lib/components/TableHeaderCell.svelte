<script lang="ts">
    const { heading } = $props();
</script>

<th scope="col" class="th-cell">
    <span class="th-label">{heading}</span>
    <!-- <button><span>i</span><span data-visually-hidden>Sort by {heading}</span></button> -->
    <!-- @TODO work out sorting -->
</th>

<style>
    .th-cell {
        padding-block: var(--space-2xs);
        padding-inline: var(--space-xs) var(--space-m);
    }

    .th-label {
        font-weight: 600;
    }
</style>
