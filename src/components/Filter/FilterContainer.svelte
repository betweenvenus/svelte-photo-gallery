<script lang="ts">
	import { FilterMode } from '../../util';
	import FilterSelector from './FilterSelector.svelte';
	import FilterTerms from './FilterTerms.svelte';
</script>

<style type="scss">
</style>

<FilterSelector />
<FilterTerms mode="{FilterMode.Market}" />
