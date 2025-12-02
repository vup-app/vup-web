<!-- src/components/SignUp.svelte -->
<script lang="ts">
    import { app } from "../../state.svelte";
    import PassphraseCard from "$lib/components/Passphrase-Card.svelte";
    import Button from "$lib/components/Button.svelte";
    import Checkbox from "$lib/components/Checkbox.svelte";
    import { writable } from "svelte/store";

    import { generate_seed_phrase } from "@redsolver/s5-wasm";

    let passphrase = $state<string>("");
    let passphraseConfirmed = writable<boolean>(false);
    let isDisabled = $state<boolean>(false);

    // Generate initial passphrase once WASM is ready
    $effect(() => {
        if (app.isInitialized && !passphrase) {
            passphrase = generate_seed_phrase();
        }
    });

    function getNewPassphrasFn() {
        passphrase = generate_seed_phrase();
    }

    async function createIdentity() {
        try {
            isDisabled = true;
            await app.login(passphrase);
        } catch (e) {
            alert(e);
        }
        isDisabled = false;
    }
</script>

<div style="display: flex; flex-direction: column; align-items: flex-start;">
    <h1 class="u:step-4 u:fw-600">Create a new account</h1>
    <p style="max-width: 430px; margin-bottom: 0.5rem; margin-top: 0.1rem;">
        This unique passphrase contains your secret S5 identity, used to encrypt
        all your data and authenticate with portals. Make sure to keep it
        somewhere safe and secure, if you lose it there's no way to recover your
        files!
    </p>

    <PassphraseCard {passphrase} {getNewPassphrasFn} />
    <div style="margin-top: 0.5rem; margin-bottom: 0.75rem;">
        <Checkbox
            checked={passphraseConfirmed}
            label="I made a backup of my passphrase"
            {isDisabled}
            isRequired={true}
        />
    </div>

    <Button
        label="Create account"
        variant="branded"
        onClick={createIdentity}
        isDisabled={!$passphraseConfirmed || isDisabled}
    />

    <p class="u:step-1" style="margin-bottom: 0.25rem; margin-top: 2.5rem;">
        Already have an account?
    </p>
    <Button
        label="Sign In instead"
        variant="primary"
        {isDisabled}
        onClick={() => (app.showSignInPage = true)}
    />
</div>
