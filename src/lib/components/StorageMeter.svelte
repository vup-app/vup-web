<script lang="ts">
    const {
        locationName,
        storageMessage = undefined,
        storedAmount = 0,
        maxStorage = undefined,
    } = $props();

    let meterStyleClass = $state<string | undefined>(undefined);

    $effect(() => {
        if (!maxStorage || !storedAmount) return;

        const usageRatio = storedAmount / maxStorage;

        if (usageRatio >= 1) {
            meterStyleClass = "max-use";
        } else if (usageRatio > 0.8) {
            meterStyleClass = "high-use";
        } else if (usageRatio < 0.25) {
            meterStyleClass = "low-use";
        } else {
            meterStyleClass = undefined;
        }
    });

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return `0 kB`;

        const units = ["kB", "MB", "GB", "TB", "PB"];

        let size = bytes / 1000;

        if (size > 0 && size < 0.01) {
            return `0.01 kB`;
        }

        let unitIndex = 0;

        while (size >= 1000 && unitIndex < units.length - 1) {
            size = size / 1000;
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

    const formatPercentage = () => {
        const total = (storedAmount / maxStorage) * 100;

        let formattedNumber;

        if (Number.isInteger(total)) {
            formattedNumber = total.toString();
        } else {
            const twoDecimals = total.toFixed(2);
            formattedNumber = twoDecimals.replace(/\.?0+$/, "");
        }

        return `${formattedNumber}%`;
    };
</script>

<div class="meter" aria-label={`${locationName} storage`}>
    <div class="storage-title">{locationName}</div>
    {#if storageMessage}
        <p class="storage-message">{storageMessage}</p>
    {/if}
    {#if maxStorage}
        <div
            class={meterStyleClass
                ? `meter-bar ${meterStyleClass}`
                : "meter-bar"}
            data-meter-percentage={(storedAmount / maxStorage) * 100}
            style="--meter-percentage: {(storedAmount / maxStorage) * 100}%"
        >
            <meter
                data-visually-hidden
                value={storedAmount}
                min="0"
                max={maxStorage}
                low={maxStorage / 4}
                high={(maxStorage / 5) * 4 - 1}
                optimum={1000}>70%</meter
            >
        </div>
    {/if}
    <div class="usage-recap c:spread-items">
        <span>
            <span class="stored-amount">
                {#if !storedAmount}0 kB{:else}{formatBytes(storedAmount)}{/if}
            </span>
            <span class="max-storage">/</span>
            {#if maxStorage}
                <span class="max-storage">{formatBytes(maxStorage)}</span>
            {:else}
                <span class="max-storage">infinity</span>
            {/if}
        </span>
        {#if maxStorage}
            <span class="usage-percentage">{formatPercentage()}</span>
        {/if}
    </div>
</div>

<style>
    .storage-title {
        font-weight: 600;
        margin-block: var(--space-3xs);
    }

    .storage-message {
        color: var(--hue-neutral-600);
        margin-block: var(--space-3xs);
    }

    .stored-amount {
        color: var(--hue-emerald-500);
        font-weight: 600;
    }

    .meter-bar {
        position: relative;
        display: block;
        height: 6px;
        margin-block: var(--space-2xs);
    }
    .meter-bar:before,
    .meter-bar:after {
        border-radius: var(--radii-pill);
        display: block;
        content: "";
        height: 6px;
        position: absolute;
    }

    .meter-bar:before {
        background-color: var(--hue-sand-200);
        width: 100%;
    }

    .meter-bar:after {
        width: var(--meter-percentage, 0%);
        background-color: var(--hue-green-500);
    }

    .meter-bar.low-use:after {
        background-color: var(--hue-emerald-500);
    }

    .meter-bar.high-use:after {
        background-color: var(--hue-yellow-500);
    }

    .meter-bar.max-use:after {
        background-color: var(--hue-orange-500);
    }

    .max-storage,
    .usage-percentage {
        color: var(--hue-sand-500);
        font-size: var(--step--2);
        font-weight: 600;
    }
</style>
