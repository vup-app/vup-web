<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import TableCaption from "$lib/components/TableCaption.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Table/Table Caption",
        component: TableCaption,
        tags: ["autodocs"],
        args: {
            caption: "string",
        },
    });
</script>

<Story name="Default" />
