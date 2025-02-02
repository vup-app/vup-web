<script lang="ts">
    const { passphrase, getNewPassphrasFn } = $props();

    const copyToClipboard: any = () => {
        navigator.clipboard.writeText(passphrase);
    };
</script>

<section class="passphraseCard">
    <div class="heading">
        <div class="title">Secret Passphrase</div>
        <button class="button" onclick={getNewPassphrasFn}>New</button>
    </div>
    <p class="code">{passphrase}</p>
    <button class="button" onclick={copyToClipboard}>Copy</button>
</section>

<style>
    .passphraseCard {
        max-width: 430px;
        background-color: var(--hue-emerald-800);
        padding-block: var(--space-s);
        padding-inline: var(--space-l);
        border-radius: var(--radii-soft);
    }

    .heading {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-block-end: var(--space-xs);
    }

    .title {
        text-transform: uppercase;
        font-size: var(--step--2);
        color: var(--hue-pink-300);
        font-weight: 600;
    }

    .code {
        font-family: monospace;
        background-image: linear-gradient(
            135deg,
            var(--hue-emerald-300),
            var(--hue-slate-50),
            var(--hue-emerald-300)
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        margin-block-end: var(--space-xs);
    }

    .button {
        font-size: var(--step--1);
        color: var(--hue-emerald-200);
        border: 1px solid #437a50;
        border-radius: var(--radii-pill);
        padding-block: var(--space-3xs);
        padding-inline: var(--space-xs);
        line-height: var(--lh-ui);
        cursor: pointer;

        &:hover,
        &:focus {
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0px);
        }
    }
</style>
