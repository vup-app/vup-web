<script lang="ts">
    import { writable } from "svelte/store";
    const { label, placeholder, value = writable("") } = $props();

    const inputId = crypto.randomUUID();

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        value.set(target.value);
    };
</script>

<div>
    <label for={inputId}>{label}</label>
    <input
        id={inputId}
        type="text"
        placeholder={`${placeholder}…`}
        oninput={handleInput}
        bind:value={$value}
    />
</div>

<style>
</style>
