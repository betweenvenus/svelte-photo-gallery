<script lang="ts">
	import { onMount } from 'svelte';
	import dummyData from './dummy.js';
	import Filter from './components/Filter/Filter.svelte';

	onMount(async() => {
		await console.info(data)
	})
	// Response from REST API
	export let data: any = JSON.parse(dummyData);
</script>

<main>
	<Filter mode="market" {data} />
</main>

<style type="scss">
	$color: blue;
	main {
		font-family: 'Roboto';
		font-size: 18px;
	}

	h1 {
		color: $color;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>