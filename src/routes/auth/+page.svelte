<script lang="ts">
    import SignIn from "./SignIn.svelte";
    import SignUp from "./SignUp.svelte";

    import { app } from "../../state.svelte";
</script>

<div>
    {#if app.showSignInPage}
        <SignIn />
    {:else}
        <SignUp />
    {/if}
</div>
