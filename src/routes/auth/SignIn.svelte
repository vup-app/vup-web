<script lang="ts">
    import { app } from "../../state.svelte";
    import InputText from "$lib/components/InputText.svelte";
    import Button from "$lib/components/Button.svelte";
    import { derived, writable } from "svelte/store";

    let passphrase = writable<string>("");
    let isDisabled = $state<boolean>(false);
    let isPassphraseTooShort = derived(
        passphrase,
        (value) => value.split(" ").length < 15,
    );

    async function recoverIdentity() {
        try {
            isDisabled = true;
            await app.s5.recoverIdentityFromSeedPhrase($passphrase);
            await app.s5.fs.ensureIdentityInitialized();
            app.markLoggedIn();
        } catch (e) {
            alert(e);
        }
        isDisabled = false;
    }
</script>

<div style="display: flex; flex-direction: column; align-items: flex-start;">
    <h1 class="u:step-4 u:fw-600">Sign in with your identity</h1>
    <p style="max-width: 430px; margin-bottom: 0.5rem; margin-top: 0.1rem;">
        If you already have a S5 identity, you can enter your secret passphrase
        here to sign in
    </p>

    <InputText
        class="passphrase-input-field"
        label="passphrase"
        placeholder="lorem ipsum dolor"
        isRequired={true}
        value={passphrase}
    />
    <div style="margin-top: 0.5rem; margin-bottom: 0.75rem;"></div>

    <Button
        label="Sign in"
        variant="branded"
        onClick={recoverIdentity}
        isDisabled={isDisabled || $isPassphraseTooShort}
    />

    <p class="u:step-1" style="margin-bottom: 0.25rem; margin-top: 2.5rem;">
        Don't have an account?
    </p>
    <Button
        label="Sign Up instead"
        variant="primary"
        {isDisabled}
        onClick={() => (app.showSignInPage = false)}
    />
</div>

<style>
    .input {
        width: 100rem;
    }
</style>
