<script lang="ts">
	import { urlFragment } from '../../stores';
	let idFromUrlFragment;
	$: idFromUrlFragment = parseInt($urlFragment.substring(1))
  export let gallery;
  let opened: Boolean = false,
    thumb: string;
  $: gallery && (thumb = gallery.photos[0]);
	const openSelf = () => opened = true;
</script>

{#if !opened}
  <div class="gallery">
    {#if thumb}
      <img src={thumb} alt="Placeholder" />
    {:else}
      <h2>[placeholder image]</h2>
    {/if}
		{#if gallery.title}
		<caption>
			{gallery.title}
		</caption>
		{:else}
		<caption>
			No post title!
		</caption>
		{/if}
  </div>
{:else}
  {#each gallery.photos as photo}
    <img src={photo} alt="Placeholder" />
  {/each}
{/if}

{#if idFromUrlFragment == gallery.id}
	<h1 style="color: red">&lt;-- it's me!!</h1>
{/if}

<style type="scss">
	.gallery {
		margin: 1em;
		max-width: 300px;
	}

	.gallery caption {
		width: 100%;
	}
</style>