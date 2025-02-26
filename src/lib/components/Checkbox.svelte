<script lang="ts">
    import { writable } from "svelte/store";

    const {
        label,
        isRequired = false,
        isDisabled = false,
        checked = writable(false),
    } = $props();

    const fieldId = crypto.randomUUID();

    // Handle the change event when checkbox is clicked
    const handleChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        checked.set(target.checked);
    };
</script>

<div class="checkbox-wrapper">
    <input
        class="checkbox"
        id={fieldId}
        type="checkbox"
        {...isDisabled && { disabled: true }}
        {...isRequired && { required: true }}
        onchange={handleChange}
        bind:checked={$checked}
    />
    <label class="label" for={fieldId}>{label}</label>
</div>

<style>
    .checkbox-wrapper {
        display: inline-flex;
        align-items: center;
    }

    .checkbox + .label {
        user-select: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
    }

    .checkbox + .label::before {
        content: "";
        display: block;
        flex-grow: 1;
        width: 1em;
        height: 1em;
        aspect-ratio: 1 / 1;
        background-color: red;
        border: 2px solid blue;
        margin-inline-end: 10px;
        transition: 75ms;
        padding: 0;
        outline: 1px solid green;
    }

    .checkbox-wrapper:has(.checkbox:checked) .checkbox + .label::before {
        outline: 5px solid green;
        background-color: blue;
    }
</style>
