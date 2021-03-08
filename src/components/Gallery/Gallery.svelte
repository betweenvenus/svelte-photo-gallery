<script lang="ts">
  import GallerySingle from "./GallerySingle.svelte";
  export let galleries: { id: number, title: string, photos: { id: number, title: string, photos: string[] } }= undefined;
  let dummyImages: string[] = [];
  for (let i = 0; i < 8; i++) {
    dummyImages.push(
      `https://picsum.photos/300/300?random=${Math.ceil(Math.random() * 10)}`
    );
  }

  galleries = [
    "This is a post",
    "This is another post with a longer title",
    "I need to clean my desk up",
    "I also need to pay my taxes",
    "Jon really really hates making mock data and views it as a waste of time",
    "Just kidding",
    "B",
    "I'm sure there will be single-letter titles here IRL",
  ].map((el, i) => {
    return {
			id: i,
      title: el,
      photos: dummyImages,
    };
  });
</script>

<!-- 
{#if galleries !== undefined}
	{#each galleries as gallery}
		<GallerySingle {gallery} />
	{/each}
{/if} -->

{#if galleries}
  <div class="gallery-list">
    {#each galleries as gallery}
      <GallerySingle {gallery} on:click="" />
    {/each}
  </div>
{/if}

<style type="scss">
	.gallery-list {
		display: flex;
		/* justify-content: space-between; */
		flex-wrap: wrap;
	}
</style>