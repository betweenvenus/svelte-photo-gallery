<script lang="ts">
  import { urlFragment } from "../../stores";
  let idFromUrlFragment;
  $: idFromUrlFragment = parseInt($urlFragment.substring(1));
  export let gallery;
  let opened: Boolean = false,
    thumb: string;
  $: gallery && (thumb = gallery.photos[0]);
  const open = (): void => {
    opened = !opened;
  };
</script>

{#if !opened}
  <div on:click={open} class="gallery">
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
      <caption> No post title! </caption>
    {/if}
  </div>
{:else}
  <div class="opened-gallery">
    {#each gallery.photos as photo}
      <img src={photo} alt="Placeholder" />
    {/each}
  </div>
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

	.opened-gallery {
		position: absolute;
		top: 0;
		left: 0;
		max-height: 100vh;
		max-width: 100vw;
		overflow: hidden;
		background-color: rgba(0, 0, 0, .85);
		z-index: 999;
		display: flex;
		flex-wrap: wrap;
		padding: 3em;
		justify-content: center;
		align-items: center;
	}
</style>
