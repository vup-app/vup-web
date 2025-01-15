<script lang="ts">
    const {
        label,
        variant = "secondary",
        isDisabled = false,
        onClick,
    } = $props();

    type Variant = "branded" | "primary" | "secondary" | "ghost";

    // Ensure `variant` is only one of the allowed types
    const typedVariant: Variant = variant as Variant;
</script>

<button
    class={`button ${typedVariant}`}
    {...isDisabled && { disabled: true }}
    onclick={onClick}
>
    <span class="button-label">{label}</span>
</button>

<style>
    .button {
        padding: var(--space-2xs);
        font-size: var(--step-0);
        cursor: pointer;
        outline: 4px solid rgba(0, 0, 0, 0);
    }

    .button:focus {
        outline: 4px solid #fdd3b3;
    }

    .button[disabled] {
        pointer-events: none;
    }

    .branded {
        outline: 1px solid red !important;
    }

    .primary {
        outline: 1px solid blue !important;
    }

    .secondary {
        outline: 1px solid green !important;
    }

    .ghost {
        font-size: var(--step--1);
        border-radius: 4px;
        text-decoration: underline;
        text-decoration-color: #bcbcbc;
        text-underline-offset: 4px;
        transition:
            outline-color 150ms ease,
            text-underline-offset 75ms ease,
            transform 75ms ease;
    }

    .ghost:hover,
    .ghost:focus {
        transform: translateY(-4px);
        text-decoration-color: #5b5b5b;
        text-underline-offset: 6px;
    }

    .ghost:active {
        transform: translateY(-2px);
        text-underline-offset: 3px;
    }

    .ghost[disabled] {
        color: #bcbcbc;
        text-decoration-color: currentColor;
    }
</style>
