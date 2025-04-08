<script lang="ts">
    import "$lib/styles/foundation.css";
    import { app } from "../state.svelte";
    import AuthPage from "./auth/+page.svelte";
    import MainPage from "./main/+page.svelte";
</script>

{#if !app.isInitialized}
    <main>
        <p>Loading...</p>
    </main>
{:else if app.isLoggedIn}
    <MainPage />
{:else if !app.isLoggedIn}
    <main>
        <AuthPage />
    </main>
{/if}

<style>
    main {
        padding: 2rem;
        position: relative;
    }
</style>
