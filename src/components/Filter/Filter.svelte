<script lang="ts">
  const validFilters = ["market", "name", "style"] as const;
  /**
   * "An array has a numeric index signature, as it’s indexed by numbers (0, 1, 2, …), d d
   * so we use typeof animals[number] to get a union type of all items in our array: 
   * 'cat' | 'dog' | 'mouse'."
   * https://steveholgado.com/typescript-types-from-arrays/
   */
  type FilterMode = typeof validFilters[number];
  export let mode: FilterMode, data;
  $: data && data.then(res => console.log(res));
</script>

<article class="filters">
    <!-- {#await data}
      <h1 style="color: red">No data!</h1>
    {:then galleryData}
      {@debug galleryData}
    {:catch error}
      <h1 style="color: red">Uh oh: {@debug error}</h1>
    {/await} -->
</article>

<style type="scss">
  $gray: #EAEAEA;
  .filters {
    background-color: $gray;
    padding: 1.5rem;
  }

  .large-label {
    font-size: 2rem;
    font-weight: 100;
  }

  #filter-select, .large-label {
    display: inline-block;
  }
</style>