<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Button from "./Button.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Button",
        component: Button,
        tags: ["autodocs"],
        args: {
            label: "string",
            onClick: () => {
                console.log("Hello world");
            },
        },
    });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Branded" args={{ variant: "branded", label: "Branded" }} />
<Story name="Primary" args={{ variant: "primary", label: "Primary" }} />
<Story name="Secondary" args={{ variant: "secondary", label: "Secondary" }} />
<Story name="Ghost" args={{ variant: "ghost", label: "Ghost" }} />
