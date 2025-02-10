<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import TableDemo from "$lib/stories/TableDemo.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Table/Demo",
        component: TableDemo,
        tags: ["autodocs"],
        args: {},
    });
</script>

<Story name="Table" />
