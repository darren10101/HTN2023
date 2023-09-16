<script lang="ts">
  import { onMount } from "svelte";
  let location: string;
  
  let searchResults: string[] = [];
  let waitingForResponse: boolean = false;
  const handleGenerate = async () => {
    waitingForResponse = true;
    const response = await fetch("/nearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ location })
    }).then(res => res.json());
    searchResults = response.data.filter((item: string) => item.toLowerCase().trim() !== location.toLowerCase().trim() && item.toLowerCase().trim() !== "");
    waitingForResponse = false;
  };

</script>

<main>
  <div>
    <h1>Discover Your Travel Plan</h1>
    <form on:submit={handleGenerate}>
      <input class="location" type="text" placeholder="Location..." bind:value={location} disabled={waitingForResponse} />
      <input type="submit" disabled={waitingForResponse} />
    </form>
    {#if waitingForResponse}
      <p>Waiting for response...</p>
    {/if}
  </div>
  {#each searchResults as result}
    <div class="item">
      <span>{result}</span>
      <button>Add</button>
    </div>
  {/each}
  <div class="item">
    <span>Canada</span>
    <button>Add</button>
</main>


<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5rem 3rem 0 3rem;
    div {
      margin-bottom: 2rem;
      padding: 0 4rem 0 4rem;
      border-radius: 1rem;
      background-color: rgba(#fff, 0.4);
      box-shadow: 0.1rem 0.1rem 0.2rem rgba(#000, 0.2);
      width: calc(100% - 8rem);
      &.item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.7rem;
        padding: 1rem 2rem;
        width: calc(100% - 4rem);
        button {
          border: none;
          border-radius: 1rem;
          padding: 1rem 2rem;
          background-color: $button;
          transition: 0.2s ease-in-out;
          &:hover {
            cursor: pointer;
            background-color: lighten($button, 15%);
            box-shadow: 0 0 0.5rem rgba(#000, 0.2);
          }
        }
      } 
      h1 {
        text-align: center;
        font-size: 4rem;
        // border-bottom: 0.5rem solid black;
      }
      form {
        width: 100%;
        margin-bottom: 3rem;
        display: flex;
        gap: 1rem;
        input {
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-size: 1.3rem;
          border: none;
          background-color: $button;
          transition: 0.2s ease-in-out;
          &:hover {
            cursor: pointer;
            background-color: lighten($button, 15%);
            box-shadow: 0 0 0.5rem rgba(#000, 0.2);
          }
          &.location {
            background-color: #fff;
            flex: 1;
            &:focus, &:hover {
              outline: none;
            }
          }
        }
        .location:hover {
          cursor: text;
        }
      }
    }
  }
</style>