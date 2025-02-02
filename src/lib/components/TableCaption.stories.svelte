<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import TableCaption from "./TableCaption.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Table/Table Caption",
        component: TableCaption,
        tags: ["autodocs"],
        args: {},
    });
</script>

<Story name="Default" />
