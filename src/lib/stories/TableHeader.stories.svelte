<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import TableHeader from "$lib/components/TableHeader.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Table/Table Header",
        component: TableHeader,
        tags: ["autodocs"],
        args: {},
    });
</script>

<Story name="Default" />
