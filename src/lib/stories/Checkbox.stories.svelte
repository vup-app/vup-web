<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Checkbox from "$lib/components/Checkbox.svelte";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Checkbox",
        component: Checkbox,
        tags: ["autodocs"],
        args: {
            label: "Input Label",
            isDisabled: false,
            isRequired: false,
        },
    });
</script>

<Story name="Default" />
