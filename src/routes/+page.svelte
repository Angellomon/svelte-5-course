<script lang="ts">
	import { fly } from 'svelte/transition';
	import Header from './Header.svelte';
	import { createForm } from './state.svelte';

	const form = createForm();
</script>

<Header name={form.value.name} />

<main>
	<p>step: {form.value.step}</p>

	{@render formItems({ include: ['name', 'birthday', 'hobby', 'favoriteColor'] })}

	{#each form.steps as { type, id, question }, i}
		{#if form.value.step === i}
			{@render formStep({ type, id, question })}
		{/if}
	{/each}

	<span class="buttons">
		{#if form.value.step > 0}
			<button onclick={form.previousStep}>Previous</button>
		{/if}
		{#if form.value.step < form.steps.length - 1}
			<button onclick={form.nextStep}>Next</button>
		{/if}
		{#if form.value.step === form.steps.length - 1}
			<p>Thak You for your info</p>
			<button onclick={form.nextStep}>Finish</button>
		{/if}
	</span>

	{#if form.value.error}
		<div class="error">{form.value.error}</div>
	{/if}
</main>

{#snippet formStep({
	id,
	type,
	question
}: {
	id: keyof typeof form.value;
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
		<input {type} {id} bind:value={form.value[id]} />
	</div>
{/snippet}

{#snippet formItems({ include = [] }: { include: (keyof typeof form.value)[] })}
	{#each include as item}
		<p>{item}: {form.value[item]}</p>
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
