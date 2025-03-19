<script lang="ts">
    const {
        locationName,
        storageMessage = undefined,
        storedAmount = 0,
        maxStorage = undefined,
    } = $props();

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return `0 kb`;

        const units = ["kb", "mb", "gb", "tb", "pb"];

        let size = bytes / 1024;

        if (size > 0 && size < 0.01) {
            return `0.01 kb`;
        }

        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size = size / 1024;
            unitIndex++;
        }

        let formattedNumber;

        if (Number.isInteger(size)) {
            formattedNumber = size.toString();
        } else {
            const twoDecimals = size.toFixed(2);
            formattedNumber = twoDecimals.replace(/\.?0+$/, "");
        }

        return `${formattedNumber} ${units[unitIndex]}`;
    };
</script>

<div>
    <div class="u:fw-600">{locationName}</div>
    {#if storageMessage}
        <p class="storage-message">{storageMessage}</p>
    {/if}
    {#if maxStorage}
        <div>
            <meter
                class="meter"
                id="storageUsage"
                value={storedAmount}
                min="0"
                max={maxStorage}
                low={maxStorage / 4}
                high={(maxStorage / 5) * 4 - 1}
                optimum={1000}>70%</meter
            >
        </div>
    {/if}
    <div>
        <span class="stored-amount">{formatBytes(storedAmount)}</span>
        <span>/</span>
        {#if maxStorage}
            <span>{formatBytes(maxStorage)}</span>
        {:else}
            <span>infinity</span>
        {/if}
    </div>
</div>

<style>
    .storage-message {
        color: var(--hue-neutral-600);
    }

    .stored-amount {
        color: var(--hue-emerald-500);
        font-weight: 600;
    }

    .meter {
        height: 30px;
        width: 100%;
        display: block;
    }

    .meter::-webkit-meter-bar,
    .meter::-webkit-meter-inner-element {
        background: var(--hue-neutral-300);
        border-radius: 50px;
    }

    .meter::webkit-meter-optimum-value,
    .meter::webkit-meter-suboptimum-value,
    .meter::webkit-meter-even-less-good-value {
        border-radius: var(--radii-pill);
    }

    .meter::webkit-meter-optimum-value {
        background: green;
    }
    .meter::webkit-meter-suboptimum-value {
        background: purple;
    }
    .meter::webkit-meter-even-less-good-value {
        background: blue;
    }
</style>
