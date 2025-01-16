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

    .branded,
    .primary,
    .secondary {
        border-radius: var(--radii-pill);
        font-weight: 500;
        padding-block: var(--space-xs);
        padding-inline: var(--space-m);
        border-width: 1px;
        border-style: solid;
        border-color: transparent;

        &:hover,
        &:focus {
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(1px);
        }
    }

    .branded {
        outline: 1px solid red !important;
    }

    .primary {
        outline: 1px solid blue !important;
    }

    .secondary {
        background-color: #e2e2e2;
        border: 1px solid #e2e2e2;

        transition:
            outline-color 150ms ease,
            background-color 75ms ease,
            border-color 75ms ease,
            transform 75ms ease;

        &:hover,
        &:focus {
            background-color: #f0f0f0;
        }

        &:focus {
            border-color: #cdaf98;
        }

        &:active {
            background-color: #c9c9c9;
            border-color: #c9c9c9;
        }
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
