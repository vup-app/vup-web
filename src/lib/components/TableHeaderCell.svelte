<script lang="ts">
    const { heading } = $props();
</script>

<th scope="col" class="th-cell">
    <span class="th-label">{heading}</span>
    <button>Sort by {heading}</button>
</th>

<style>
    .th-cell {
        padding-block: var(--space-2xs);
        padding-inline: var(--space-2xs);
    }

    .th-label {
        font-weight: 600;
    }
</style>
