<script lang="ts">
  import { FilterMode, fetchData, sortByKey } from "./util";
  import FilterContainer from "./components/Filter/FilterContainer.svelte";
  import Gallery from "./components/Gallery/Gallery.svelte";
  import { urlFragment } from "./stores";
  import { onMount } from "svelte";
  // import Filter from "./components/Filter/Filter.svelte";
  // import Gallery from "./components/Gallery/Gallery.svelte";

  let mode: FilterMode;
  const modes = Object.values(FilterMode).map((el) => el.toLowerCase());

  let markets, galleries;

  const baseURL = "https://innovativefitness.ahn2k5uj-liquidwebsites.com";
  const galleryQuery = new URLSearchParams({
    _fields: ["title", "gallery_title", "photos", "meta=featured", "_links"].join(),
    _embed: "1",
    _embedded: "1",
  });
  const marketQuery = new URLSearchParams({
    _fields: "name",
    hide_empty: "false",
    per_page: "100",
  });
  const galleryEndpoint = `${baseURL}/wp-json/wp/v2/galleries?${galleryQuery.toString()}`;
  const marketEndpoint = `${baseURL}/wp-json/wp/v2/market?${marketQuery.toString()}`;

  (async () =>
    ([galleries, markets] = await fetchData([
      galleryEndpoint,
      marketEndpoint,
    ])))();

  const setURLFragment = (e: HashChangeEvent) =>
    urlFragment.set(new URL(e.newURL).hash);
		let sorted;
		$: galleries && (sorted = sortByKey(galleries, "gallery_title"));
		// $: console.log(galleries);
		$: console.log(sorted);
</script>

<!-- Sets the urlFragment store value whenever onhashchange is fired -->
<svelte:window on:hashchange={setURLFragment} />

<main>
  <FilterContainer />
  <Gallery />
</main>

<style type="scss">
  :global(:root) {
    --purple: #5b2963;
    --gray: #eaeaea;
  }

  main {
    font-family: "Roboto";
    font-size: 18px;
    padding: 2.5rem;
  }
</style>
