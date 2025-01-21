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
    @property --c1Sat {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 0%;
    }

    @property --c2Sat {
        syntax: "<number>";
        inherits: false;
        initial-value: 0%;
    }

    @property --c1Light {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 0%;
    }

    @property --c2Light {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 0%;
    }

    @property --inset-shadow-opacity {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 0%;
    }

    .button {
        padding: var(--space-2xs);
        font-size: var(--step-0);
        cursor: pointer;
        outline: 4px solid rgba(0, 0, 0, 0);

        &:hover,
        &:focus {
            cursor: pointer;
        }

        &:focus {
            outline: 4px solid #fdd3b3;
        }

        &[disabled] {
            pointer-events: none;
        }
    }

    .branded,
    .primary,
    .secondary {
        border-radius: var(--radii-pill);
        font-weight: 500;
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

        &[disabled] {
            box-shadow: none;
        }
    }

    .branded,
    .primary {
        --gradientTransitionDuration: 250ms;
        padding-block: calc(var(--space-xs) + 2px);
        padding-inline: calc(var(--space-m) + 2px);
    }

    .branded {
        --c1Sat: 85%;
        --c1Light: 70%;
        --c2Sat: 100%;
        --c2Light: 40%;
        --color1: hsl(113, var(--c1Sat), var(--c1Light));
        --color2: hsl(113, var(--c2Sat), var(--c2Light));
        --inset-box-shadow-color: hsl(113, 95%, 80%);
        --inset-box-shadow: inset 0 10px 8px 0 var(--inset-box-shadow-color);
        transition:
            --c1Sat var(--gradientTransitionDuration),
            --c1Light var(--gradientTransitionDuration),
            --c2Sat var(--gradientTransitionDuration),
            --c2Light var(--gradientTransitionDuration),
            box-shadow 75ms,
            transform 150ms;
        border: none;

        background-image: linear-gradient(
            to bottom,
            var(--color1),
            var(--color2)
        );

        box-shadow:
            var(--inset-box-shadow),
            0px 25px 10px rgba(0, 55, 3, 0.01),
            0px 14px 8px rgba(0, 55, 3, 0.04),
            0px 6px 6px rgba(0, 55, 3, 0.07),
            0px 2px 3px rgba(0, 55, 3, 0.08);
        box-shadow:
            var(--inset-box-shadow),
            0px 25px 10px color(display-p3 0.008 0.212 0.043 / 0.01),
            0px 14px 8px color(display-p3 0.008 0.212 0.043 / 0.04),
            0px 6px 6px color(display-p3 0.008 0.212 0.043 / 0.07),
            0px 2px 3px color(display-p3 0.008 0.212 0.043 / 0.08);

        &:hover,
        &:focus {
            --c1Sat: 100%;
            --c1Light: 78%;
            --c2Sat: 100%;
            --c2Light: 43%;
            --inset-box-shadow: inset 0 15px 7px 0 var(--inset-box-shadow-color);
            transform: scale(1.05);
            box-shadow:
                var(--inset-box-shadow),
                0px 38px 15px rgba(0, 55, 3, 0.01),
                0px 21px 13px rgba(0, 55, 3, 0.04),
                0px 9px 9px rgba(0, 55, 3, 0.06),
                0px 2px 5px rgba(0, 55, 3, 0.07);
            box-shadow:
                var(--inset-box-shadow),
                0px 38px 15px color(display-p3 0.008 0.212 0.043 / 0.01),
                0px 21px 13px color(display-p3 0.008 0.212 0.043 / 0.04),
                0px 9px 9px color(display-p3 0.008 0.212 0.043 / 0.06),
                0px 2px 5px color(display-p3 0.008 0.212 0.043 / 0.07);
        }

        &:active {
            --c1Sat: 90%;
            --c1Light: 65%;
            --c2Sat: 100%;
            --c2Light: 35%;
            --inset-box-shadow-color: hsla(113, 95%, 80%, 0.5);
            transform: scale(1);

            box-shadow:
                var(--inset-box-shadow),
                0px 10px 4px rgba(0, 55, 3, 0.01),
                0px 6px 3px rgba(0, 55, 3, 0.05),
                0px 3px 3px rgba(0, 55, 3, 0.09),
                0px 1px 1px rgba(0, 55, 3, 0.1);
            box-shadow:
                var(--inset-box-shadow),
                0px 10px 4px color(display-p3 0.008 0.212 0.043 / 0.01),
                0px 6px 3px color(display-p3 0.008 0.212 0.043 / 0.05),
                0px 3px 3px color(display-p3 0.008 0.212 0.043 / 0.09),
                0px 1px 1px color(display-p3 0.008 0.212 0.043 / 0.1);
        }

        &[disabled] {
            background: #93c58d;
            color: #47754a;
        }
    }

    .primary {
        color: rgba(0, 0, 0, 1);
        background-color: #f5f4f4;
        box-shadow:
            inset 0 10px 8px 0 #fff,
            0 0 0 1px rgba(0, 0, 0, 0.08),
            0 1px 2px 0 rgba(0, 0, 0, 0.25);
        cursor: pointer;

        transition:
            box-shadow 150ms ease,
            color 150ms ease;

        &:hover,
        &:focus {
            color: rgba(0, 0, 0, 0.65);
            box-shadow:
                inset 0 20px 6px 0 #fff,
                0 0 0 1px rgba(0, 0, 0, 0.08),
                0 2px 3px 0 rgba(0, 0, 0, 0.2);
        }

        &:active {
            color: rgba(0, 0, 0, 1);
            box-shadow:
                inset 0 5px 12px 0 #fff,
                0 0 0 1px rgba(0, 0, 0, 0.08),
                0 0px 1px 0 rgba(0, 0, 0, 0.45);
        }

        &[disabled] {
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
            color: rgba(0, 0, 0, 0.6);
        }
    }

    .secondary {
        background-color: #e2e2e2;
        border: 1px solid #e2e2e2;
        padding-block: var(--space-xs);
        padding-inline: var(--space-m);

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

        &[disabled] {
            color: #939393;
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

        &:hover,
        &:focus {
            transform: translateY(-4px);
            text-decoration-color: #5b5b5b;
            text-underline-offset: 6px;
        }

        &:active {
            transform: translateY(-2px);
            text-underline-offset: 3px;
        }

        &[disabled] {
            color: #bcbcbc;
            text-decoration-color: currentColor;
        }
    }
</style>
