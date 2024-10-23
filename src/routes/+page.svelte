<script lang="ts">
	import Header from './Header.svelte';

	type StrError = string;
	const steps = {
		NAME: 0,
		BIRTHDAY: 1,
		HOBBY: 2,
		FINISHED: 3
	};

	let formState = $state({
		name: '',
		birthday: '',
		hobby: '',
		step: 0,
		error: ''
	});

	function validateName(name: string): StrError {
		if (!name) return 'missing name';

		return '';
	}

	function validateBirthday(birthday: string): StrError {
		if (!birthday) return 'missing birthday';

		const now = Date.now();
		const date = new Date(birthday);

		let diff = now - date.getTime(); // milliseconds
		diff /= 60 * 60 * 24 * 1000; // days
		diff = Math.abs(Math.round(diff / 365.25)); // years aprox

		if (diff < 18) return 'you must be 18 or older';

		return '';
	}

	function validateHobby(hobby: string): StrError {
		if (!hobby) return 'missing hobby';

		return '';
	}

	function validateStep(): StrError {
		if (formState.step === steps.NAME) return validateName(formState.name);
		else if (formState.step === steps.BIRTHDAY) return validateBirthday(formState.birthday);
		else if (formState.step === steps.HOBBY) return validateHobby(formState.hobby);

		return '';
	}

	function nextStep() {
		const error = validateStep();

		if (error) {
			formState.error = error;
			return;
		}
		formState.error = '';
		formState.step += 1;
	}

	function previousStep() {
		if (formState.step <= 0) return;

		formState.error = '';
		formState.step -= 1;
	}
</script>

<main>
	<p>step: {formState.step}</p>

	{#if formState.step === steps.NAME}
		<div>
			<label for="name">Your Name</label>
			<input type="text" name="name" id="name" bind:value={formState.name} />
		</div>
	{:else if formState.step === steps.BIRTHDAY}
		<div>
			<p>Name: {formState.name}</p>
			<label for="birthday">Your Birthday</label>
			<input type="date" name="birthday" id="birthday" bind:value={formState.birthday} />
		</div>
	{:else if formState.step === steps.HOBBY}
		<div>
			<p>Name: {formState.name}</p>
			<p>Birthday: {formState.birthday}</p>

			<label for="hobby">Your Hobby</label>
			<input type="text" name="hobby" id="hobby" bind:value={formState.hobby} />
		</div>
	{/if}
	{#if formState.step === steps.FINISHED}
		<div>
			<p>Name: {formState.name}</p>
			<p>Birthday: {formState.birthday}</p>
			<p>Hobby: {formState.hobby}</p>
		</div>
	{/if}
	{#if formState.error}
		<div class="error">{formState.error}</div>
	{/if}

	<span class="buttons">
		{#if formState.step > steps.NAME}
			<button onclick={previousStep}>Previous</button>
		{/if}
		{#if formState.step < steps.HOBBY}
			<button onclick={nextStep}>Next</button>
		{/if}
		{#if formState.step === steps.HOBBY}
			<button onclick={nextStep}>Finish</button>
		{/if}
	</span>
</main>

<style>
	span.buttons {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	div.error {
		color: red;
		text-decoration: underline;
	}
</style>
