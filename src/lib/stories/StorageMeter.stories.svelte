<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import StorageMeter from "$lib/components/StorageMeter.svelte";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Component/Storage Meter",
        component: StorageMeter,
        tags: ["autodocs"],
        args: {
            locationName: "string",
        },
    });
</script>

<Story
    name="No maximum"
    args={{
        locationName: "Storage Location",
        storageMessage: "Files expire after 120 days",
        storedAmount: 0,
    }}
/>

<Story
    name="Low Usage"
    args={{
        locationName: "Storage Location",
        storageMessage: "a message about this storage service",
        storedAmount: 3173,
        maxStorage: 102400,
    }}
/>

<Story
    name="Medium Usage"
    args={{
        locationName: "Storage Location",
        storedAmount: 104910564,
        maxStorage: 209715200,
    }}
/>

<Story
    name="High Usage"
    args={{
        locationName: "Storage Location",
        storedAmount: 179715200,
        maxStorage: 209715200,
    }}
/>

<Story
    name="Max Usage"
    args={{
        locationName: "Storage Location",
        storedAmount: 209715200,
        maxStorage: 209715200,
    }}
/>
