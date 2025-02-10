<script lang="ts">
    const { path, onClick } = $props();

    const handleDirChange = (dir: string) => {
        if (dir == "home") {
            onClick(dir);
        } else {
            const clickedPathIndex = path.indexOf(dir);
            const newPath = path.slice(0, clickedPathIndex + 1);
            onClick(newPath);
        }
    };
</script>

<nav aria-label="Directory navigation">
    <ol>
        {#if path.length > 4}
            <li>
                <button onclick={() => handleDirChange("home")}>home</button>
            </li>
            <li>
                <span role="presentation">…</span>
                <span data-visually-hidden>truncated directory</span>
            </li>
        {/if}
        {#each path.length > 4 ? path.slice(-4, -1) : path.slice(0, -1) as dir, index}
            <li>
                <button onclick={() => handleDirChange(dir)}>{dir}</button>
            </li>
        {/each}
    </ol>
    <div aria-current={path[path.length - 1]}>{path[path.length - 1]}</div>
</nav>
