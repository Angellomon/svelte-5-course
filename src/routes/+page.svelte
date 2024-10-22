<script lang="ts">
    import Header from "./Header.svelte";

    let name = $state("Angel")

    let status: "OPEN" | "CLOSED" = $state("OPEN")

    // function toggle() {
    //     status = status === "OPEN" ? "CLOSED" : "OPEN"
    // }
    function onclick() {
        status = status === "OPEN" ? "CLOSED" : "OPEN"
    }
</script>


<Header {name} />

<input type="text" name="name" id="name" bind:value={name}>

<p>The store is now {status}</p>

<button {onclick}>Toggle Status</button>