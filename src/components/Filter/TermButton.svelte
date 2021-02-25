<script lang="ts">
  export let term: string = "";
</script>

{#if term}
  <!-- using the @html directive so that stuff like &amp; doesn't get escaped  -->
  <button>{@html term}</button>
{/if}

<style type="scss">
	@use '/colors.scss';
  button {
    color: white;
    background-color: var(--purple);
    padding: 1em;
		border-radius: 1337px;
		margin-bottom: 1em;
		transition: all .05s ease-out;
  }

	button:hover {
		opacity: .75;
	}

	button:focus {
		opacity: .65;
	}

	button:active {
		background-color: var(--purple);
		opacity: .65;
	}
</style>
