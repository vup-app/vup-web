<script lang="ts">
    import { writable } from "svelte/store";
    const {
        label,
        placeholder,
        isDisabled = false,
        isRequired = false,
        value = writable(""),
    } = $props();

    const inputId = crypto.randomUUID();

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        value.set(target.value);
    };
</script>

<div>
    <label data-visually-hidden for={inputId}>{label}</label>
    <input
        class="input"
        id={inputId}
        type="text"
        placeholder={`${placeholder}…`}
        {...isDisabled && { disabled: true }}
        {...isRequired && { required: true }}
        oninput={handleInput}
        bind:value={$value}
    />
</div>

<style>
    .input {
        border: 1px solid var(--hue-neutral-300);
        border-radius: var(--radii-default);
        padding: var(--space-2xs);
        background-color: white;
        color: black;
        line-height: var(--lh-ui);
        transition: border-color 75ms ease;

        box-shadow:
            inset 0 16px 5px 0 rgba(0, 0, 0, 0),
            inset 0 11px 4px 0 rgba(0, 0, 0, 0.01),
            inset 0 6px 4px 0 rgba(0, 0, 0, 0.03),
            inset 0 3px 3px 0 rgba(0, 0, 0, 0.04),
            inset 0 1px 1px 0 rgba(0, 0, 0, 0.05);

        /* &:focus,
        &:focus:placeholder-shown {
            outline: 4px solid orange;
        }

        &:not(:placeholder-shown),
        &:focus {
            border-color: var(--hue-neutral-500);
        } */

        &:focus,
        &:hover,
        &:not(:placeholder-shown) {
            border-color: var(--hue-neutral-500);
        }

        &:focus {
            outline: 4px solid var(--hue-amber-300);
            outline-offset: 0.125ex;
        }

        &:focus,
        &:not(:placeholder-shown) {
            border-color: var(--hue-neutral-500);
        }

        &[disabled] {
            cursor: not-allowed;
            pointer-events: none;
            opacity: 0.5;
        }
    }
</style>
