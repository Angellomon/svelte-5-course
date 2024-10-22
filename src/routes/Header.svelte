<script lang="ts">
    let { name = "human" } = $props()
</script>

<h1>Hello ´{name}´ from Header</h1>
<h2>{name.toUpperCase()}</h2>

<style>

</style>