<script lang="ts">
  import { FilterMode } from "../../util";
  import TermButton from "./TermButton.svelte";
  export let mode: FilterMode, terms: string[];
  terms = [
    "Country clubs",
    "Athletics & professional sports",
    "Corporate fitness & wellness",
    "Religious facilities",
    "Schools",
    "Health clubs",
		"Medical/rehab",
		"Multi-family",
		"Police & fire",
		"Cross-training/specialty studios",
		"Single family/HOA",
		"Hospitality"
  ].sort((a, b) => a > b ? 1 : -1);
</script>

{#if mode === FilterMode.Market}
  <div>
    {#each terms as term}
      <TermButton {term} />
    {/each}
  </div>
{/if}

<style type="scss">
	div {
		margin-top: 1em;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
</style>
