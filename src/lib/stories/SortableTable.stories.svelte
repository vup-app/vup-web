<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import SortableTable from "$lib/components/SortableTable.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Table/Sortable Table",
        component: SortableTable,
        tags: ["autodocs"],
        args: {},
    });
</script>

<Story name="Default" />
