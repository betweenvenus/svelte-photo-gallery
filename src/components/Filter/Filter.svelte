<script lang="ts">
	import FilterButton from './TermButton.svelte';
	import { FilterMode } from '../../util';
	export let mode: FilterMode, data: Promise<Response[]>;
	let currentMode;
	$: console.log(currentMode);
	const allModes = Object.values(FilterMode).map(el => el.toLowerCase()); 
</script>

<article class="filters">
	{#await data}
		{:then [galleries, markets]}
		{#await markets}
		{:then value}
		<h1>View galleries by...</h1>
		<select bind:value={currentMode} name="filters" id="">
		{#each allModes as mode}
			<option value="{mode}">{mode}</option>
		{/each}
		</select>
		<br>
			{#each value as market}
				<FilterButton name={market.name} />
				<br/>
			{/each}
		{/await}
	{/await}
</article>

<style type="scss">
	@use '/colors';
	.filters {
		background-color: $gray;
		padding: 1.5rem;
	}

	.large-label {
		font-size: 2rem;
		font-weight: 100;
	}

	#filter-select,
	.large-label {
		display: inline-block;
	}
</style>
