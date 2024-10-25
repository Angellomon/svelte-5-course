<script lang="ts">
	import { fly } from 'svelte/transition';
	import Header from './Header.svelte';

	type StrError = string;


	let formState = $state({
		name: '',
		birthday: '',
		hobby: '',
		favoriteColor: '',
		step: 0,
		error: ''
	});

	const steps: {
		key: keyof typeof formState;
		question: string;
		type: 'text' | 'date' | 'color';
		validator: (arg: string) => StrError;
	}[] = [
		{
			key: 'name',
			question: 'Your Name',
			type: 'text',
			validator: validateName
		},
		{
			key: 'birthday',
			question: 'Your Birthday',
			type: 'date',
			validator: validateBirthday
		},
		{
			key: 'hobby',
			question: 'Your Hobby',
			type: 'text',
			validator: validateHobby
		},
		{
			key: 'favoriteColor',
			question: 'Your Favorite Color',
			type: 'color',
			validator: validateFavoriteColor
		}
	];

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

	function validateFavoriteColor(color: string): StrError {
		if (!color) return 'missing favorite color';

		return '';
	}

	function validateStep(): StrError {
		for (let i = 0; i < steps.length; i++) {
			if (i === formState.step) {
				const stepValue = formState[steps[i].key];
				return steps[i].validator(stepValue as string);
			}
		}

		// if (formState.step === steps.NAME) return validateName(formState.name);
		// else if (formState.step === steps.BIRTHDAY) return validateBirthday(formState.birthday);
		// else if (formState.step === steps.HOBBY) return validateHobby(formState.hobby);
		// else if (formState.step === steps.) return validateHobby(formState.hobby);

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

	{@render formItems({ include: ['name', 'birthday', 'hobby', "favoriteColor"] })}

	{#each steps as { type, key, question }, i}
		{#if formState.step === i}
			{@render formStep({ type, id: key, question })}
		{/if}
	{/each}

	<!-- {#if formState.step === steps.NAME}
		{@render formStep({ id: 'name', type: 'text', question: 'Your Name' })}
	{:else if formState.step === steps.BIRTHDAY}
		{@render formStep({ id: 'birthday', type: 'date', question: 'Your Birthday' })}
	{:else if formState.step === steps.HOBBY}
		{@render formStep({ id: 'hobby', type: 'text', question: 'Your Hobby' })}
	{/if} -->
	<!-- {#if formState.step === steps.FINISHED}
		<div in:fly={{
			x: 200,
			opacity: 0,
			delay: 250
		}} out:fly={{
			x: -200,
			opacity: 0
		}}>
			{@render formItems({ include: ["name", "birthday", "hobby"] })}
		</div>
	{/if} -->

	<span class="buttons">
		{#if formState.step > 0}
			<button onclick={previousStep}>Previous</button>
		{/if}
		{#if formState.step < steps.length - 1}
			<button onclick={nextStep}>Next</button>
		{/if}
		{#if formState.step === steps.length - 1}
			<button onclick={nextStep}>Finish</button>
		{/if}
	</span>

	{#if formState.error}
		<div class="error">{formState.error}</div>
	{/if}
</main>

{#snippet formStep({
	id,
	type,
	question
}: {
	id: keyof typeof formState;
	type: 'text' | 'date' | 'color';
	question: string;
})}
	<div
		in:fly={{
			x: 200,
			opacity: 0,
			delay: 250
		}}
		out:fly={{
			x: -200,
			opacity: 0
		}}
	>
		<label for={id} {id}>{question}</label>
		<input {type} {id} bind:value={formState[id]} />
	</div>
{/snippet}

{#snippet formItems({ include = [] }: { include: (keyof typeof formState)[] })}
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
