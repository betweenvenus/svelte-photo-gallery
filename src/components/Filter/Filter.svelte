<script lang="ts">
  const validFilters = ["market", "name", "style"] as const;
  type FilterMode = typeof validFilters[number];
  export let mode: FilterMode;
  export let data;
</script>

<article class="filters">
    <div class="filter-picker">
        <label class="large-label" for="filter-select">View galleries...</label>
        <select name="modes" id="filter-select">
            {#each validFilters as filter }
              <option value="{ filter }">... by { filter }</option>
            {/each}
        </select>
    </div>
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