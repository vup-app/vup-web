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
    <ol class="breadcrumbs">
        {#if path.length > 4}
            <li class="dir">
                <button class="dir-btn" onclick={() => handleDirChange("home")}>
                    home
                </button>
            </li>
            <li class="dir">
                <span role="presentation">…</span>
                <span data-visually-hidden>truncated directory</span>
            </li>
        {/if}
        {#each path.length > 4 ? path.slice(-4, -1) : path.slice(0, -1) as dir, index}
            <li class="dir">
                <button class="dir-btn" onclick={() => handleDirChange(dir)}>
                    {dir}
                </button>
            </li>
        {/each}
    </ol>
    <div class="u:step-5 u:fw-600" aria-current={path[path.length - 1]}>
        {path[path.length - 1]}
    </div>
</nav>

<style>
    .breadcrumbs {
        list-style-type: none;
    }

    .dir {
        display: inline-block;
        font-size: var(--step--1);

        & + & {
            margin-inline-start: var(--space-2xs);

            &:before {
                content: "/";
                color: var(--hue-neutral-300);
                font-weight: 600;
                /* background-color: var(--hue-neutral-300); */
                width: 2px;
                display: inline-block;
                /* height: 1.2em; */
                /* transform: rotate(20deg); */
                /* vertical-align: middle; */
                /* margin-top: -2px; */
                /* border-radius: 2px; */
                margin-inline-end: var(--space-xs);
            }
        }
    }

    .dir-btn {
        cursor: pointer;

        &:hover,
        &:focus {
            text-decoration: underline;
        }

        &:active {
            transform: translateY(1px);
        }
    }
</style>
