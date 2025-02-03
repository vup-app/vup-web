<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import TableDataCell from "$lib/components/TableDataCell.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Table/Table Data Cell",
        component: TableDataCell,
        tags: ["autodocs"],
        args: {},
    });
</script>

<Story name="Default" />
