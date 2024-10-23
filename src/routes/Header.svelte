<script lang="ts">
	let {
		name
	}: {
		name: string;
		fakeName?: string | null;
	} = $props();
</script>

<h1>{name ? name + "'s" : 'User Form'}</h1>

<style>
</style>
