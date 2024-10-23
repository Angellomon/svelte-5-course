<script lang="ts">
    let { name,
        fakeName = null
     }: {
        name: string,
        fakeName?: string | null
     } = $props()
    let storeName = $derived(fakeName || name + "'s Store" )
</script>

<h1>Hello ´{fakeName || name}´ from Header</h1>
<h2>{storeName}</h2>

{fakeName}

<style>

</style>