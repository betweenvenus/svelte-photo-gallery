<script lang="ts">
  import { FilterMode } from "../../util";
  const options = Object.values(FilterMode).map((el) => el.toLowerCase());
</script>

<article>
  <label class="large-label" for="filter-select">View galleries...</label>
  <select name="filters" id="filter-select">
    {#each options as option}
      <option value={option}>... by {option}</option>
    {/each}
  </select>
</article>

<style type="scss">
  $gray: #eaeaea;
  .filters {
    background-color: $gray;
    padding: 1.5rem;
  }

  .large-label {
    font-size: 2rem;
    font-weight: 100;
  }

  #filter-select,
  .large-label {
    display: inline-block;
  }
</style>
