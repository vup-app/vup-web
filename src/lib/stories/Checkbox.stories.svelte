<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Checkbox from "$lib/components/Checkbox.svelte";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Checkbox",
        component: Checkbox,
        tags: ["autodocs"],
        argTypes: {
            label: {
                description: "Text label displayed next to the checkbox",
                control: "text",
                table: {
                    type: { summary: "string" },
                    defaultValue: { summary: "undefined" },
                },
            },
            isDisabled: {
                description: "Whether the checkbox is disabled",
                control: "boolean",
                table: {
                    type: { summary: "boolean" },
                    defaultValue: { summary: "false" },
                },
            },
            isRequired: {
                description: "Whether the checkbox is required for form submission. Adds both HTML required attribute and aria-required for accessibility.",
                control: "boolean",
                table: {
                    type: { summary: "boolean" },
                    defaultValue: { summary: "false" },
                },
            },
            checked: {
                description: "Svelte store representing the checked state of the checkbox",
                control: false,
                table: {
                    type: { summary: "WritableStore<boolean>" },
                    defaultValue: { summary: "writable(false)" },
                },
            },
        },
        args: {
            label: "Checkbox Label",
            isDisabled: false,
            isRequired: false,
        },
    });
</script>

<Story name="Default" />

<Story name="Required" args={{ isRequired: true }} />

<Story name="Disabled" args={{ isDisabled: true }} />
