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
        font-weight: 600;
    }

    .checkbox + .label::before {
        content: "";
        display: block;
        flex-grow: 1;
        width: 1.4em;
        height: 1.4em;
        aspect-ratio: 1 / 1;
        border: 3px solid var(--hue-neutral-500);
        margin-inline-end: 10px;
        transition: 75ms;
        padding: 0;
        border-radius: var(--radii-default);
        outline: 4px solid rgba(0, 0, 0, 0);
    }

    .checkbox:hover + .label::before,
    .checkbox:focus-within + .label::before {
        border-color: var(--hue-neutral-700);
    }

    .checkbox:focus-within + .label::before {
        outline: 4px solid #fdd3b3;
        outline-offset: 2px;
    }

    .checkbox-wrapper:has(.checkbox:checked) .checkbox + .label::before {
        border-color: var(--hue-emerald-500);
        background-color: var(--hue-emerald-500);
        box-shadow: inset 0 0 0 3px white;
    }
</style>
