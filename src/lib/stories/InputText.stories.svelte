<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import InputText from "$lib/components/InputText.svelte";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Text Input",
        component: InputText,
        tags: ["autodocs"],
        args: {
            label: "Input Label",
            placeholder: "Placeholder",
            isDisabled: false,
            isRequired: false,
        },
    });
</script>

<Story name="Default" />
