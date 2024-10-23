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

<Header name={formState.name} />

<main>
	<p>step: {formState.step}</p>

	{#if formState.step === steps.NAME}
		<div>
			{@render formStep({id: "name", type: "text", question: "Your Name"})}
		</div>
	{:else if formState.step === steps.BIRTHDAY}
		<div>
			{@render formItem({ include: ["name"] })}
			{@render formStep({ id: "birthday", type: "date", question: "Your Birthday" })}
		</div>
	{:else if formState.step === steps.HOBBY}
		<div>
			{@render formItem({ include: ["name", "birthday"] })}
			{@render formStep({ id: "hobby", type: "text", question: "Your Hobby" })}
		</div>
	{/if}
	{#if formState.step === steps.FINISHED}
		<div>
			{@render formItem({ include: ["name", "birthday", "hobby"] })}
		</div>
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

	{#if formState.error}
		<div class="error">{formState.error}</div>
	{/if}
</main>

{#snippet formStep({ id, type, question }: {
	id: keyof typeof formState,
	type: "text" | "date",
	question: string
})}
	<label for={id} {id}>{question}</label>
	<input {type} {id} bind:value={formState[id]}>
{/snippet}

{#snippet formItem({ include = [] }: {
	include: (keyof typeof formState)[]
})}
	{#each include as item}
		<p>{item}: {formState[item]}</p>
	{/each}
{/snippet}

<style>
	span.buttons {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	p {
		text-transform: capitalize;
	}

	div.error {
		color: red;
		text-decoration: underline;
	}
</style>
