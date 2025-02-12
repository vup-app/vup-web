<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
    import { fn } from "@storybook/test";

    const path = ["file", "path", "here", "current path"];

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Breadcrumbs",
        component: Breadcrumbs,
        tags: ["autodocs"],
        args: {
            path: path,
            onClick: fn(),
        },
    });
</script>

<Story name="Default" />
