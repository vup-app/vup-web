<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Button from "$lib/components/Passphrase-Card.svelte";
    import { fn } from "@storybook/test";

    const demoPassphrase = `cap gnal cirs foo kouw keap noos paix teem cler gnex douh cap gnal cirs foo kouw keap noos paix teem cler gnex douh cap gnal cirs foo kouw keap noos paix teem cler gnex douh cap gnal cirs foo`;

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Passphrase Card",
        component: Button,
        tags: ["autodocs"],
        args: {
            passphrase: demoPassphrase,
        },
    });
</script>

<Story name="Default" />
