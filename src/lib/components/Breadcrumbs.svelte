<script lang="ts">
    const { path, onClick } = $props();

    const handleDirChange = (dir: string) => {
        const clickedPathIndex = path.indexOf(dir);
        const newPath = path.slice(0, clickedPathIndex + 1);
        onClick(newPath);
    };
</script>

<nav>
    <ol>
        {#each path.slice(0, -1) as dir, index}
            <li>
                <button onclick={() => handleDirChange(dir)}>{dir}</button>
            </li>
        {/each}
    </ol>
    <div>{path[path.length - 1]}</div>
</nav>
