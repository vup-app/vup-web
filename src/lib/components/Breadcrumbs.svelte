<script lang="ts">
    const { path, onClick } = $props();

    const handleDirChange = (dir: string) => {
        onClick(dir);
    };
</script>

<div class="breadcrumb-component">
    {#if path.length > 1}
        <nav aria-label="File Directory">
            <ol class="breadcrumbs">
                {#if path.length > 4}
                    <li class="dir">
                        <button
                            class="dir-btn"
                            onclick={() => handleDirChange("home")}>home</button
                        >
                    </li>
                    <li class="dir">
                        <span role="presentation">…</span>
                        <span data-visually-hidden>
                            truncated directory path
                        </span>
                    </li>
                {/if}
                {#each path.length > 4 ? path.slice(-4, -1) : path.slice(0, -1) as dir, index}
                    <li class="dir">
                        <button
                            class="dir-btn"
                            onclick={() => handleDirChange(dir)}>{dir}</button
                        >
                    </li>
                {/each}
            </ol>
        </nav>
    {/if}
    <div
        class="currentDir u:step-5 u:fw-600"
        aria-current={path[path.length - 1]}
    >
        {path[path.length - 1]}
    </div>
</div>

<style>
    .breadcrumbs {
        list-style-type: none;
        display: block;
        margin-left: calc(-1 * var(--space-2xs));
    }

    .dir {
        display: inline-block;
        font-size: var(--step--1);

        &:after {
            content: "/";
            color: var(--hue-neutral-300);
            font-weight: 600;
            display: inline-block;
            margin-inline: var(--space-3xs);
        }
    }

    .dir-btn {
        cursor: pointer;
        padding-block: var(--space-2xs);
        padding-inline: var(--space-2xs);
        border-radius: var(--radii-chip);
        outline: 4px solid transparent;

        &:hover,
        &:focus {
            text-decoration: underline;
        }

        &:focus {
            outline: 4px solid var(--hue-amber-300);
        }

        &:active {
            transform: translateY(1px);
        }
    }

    @media (prefers-color-scheme: dark) {
        .dir:after {
            color: var(--hue-neutral-800);
            /* outline: 1px solid red; */
        }

        .dir-btn:focus {
            outline-color: var(--hue-amber-700);
        }
    }
</style>
