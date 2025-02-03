<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import TableRow from "$lib/components/TableRow.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Table/Table Row",
        component: TableRow,
        tags: ["autodocs"],
        args: {},
    });
</script>

<Story name="Default" />
