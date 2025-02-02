<script lang="ts">
    const { heading } = $props();
</script>

<th scope="col">
    <span>{heading}</span>
    <button>Sort by {heading}</button>
</th>
