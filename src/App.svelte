<script lang="ts">
	import { onMount } from 'svelte';
	import Filter from './components/Filter/Filter.svelte';

	const baseURL = "https://innovativefitness.ahn2k5uj-liquidwebsites.com";
	const endpoint = "/wp-json/wp/v2/galleries";

  const includedFields: string[] = ['title', 'photos', 'meta=featured', '_links'];
  const queryParams: any = {
    "_fields": includedFields.join(),
    "_embed": "",
    "_embedded": ""
  }
  const query = new URLSearchParams(queryParams);

  const fetchGalleries = async () => {
    const res = await Promise.all([
      fetch(`${baseURL}${endpoint}?${query.toString()}`),
      fetch(`https://innovativefitness.ahn2k5uj-liquidwebsites.com/wp-json/wp/v2/market?_fields=name&hide_empty=false&per_page=100`)
    ]);
    const data = await res.json();
    if (res.ok) {
      return data;
    }
    else {
      throw new Error(data);
    }
  }

  const data = fetchGalleries();

</script>

<main>
	<Filter mode="market" {data} />
</main>

<style type="scss">
	main {
		font-family: 'Roboto';
		font-size: 18px;
	}
</style>