<script lang="ts">
  import background from '$lib/assets/background.jpg';
</script>

<main>
  <div class="opacity">
    <div class="title">
      <h1>Tourista</h1>
    </div>
    <h2>The best way to travel</h2>
  </div>
</main>

<style lang="scss">
  main {
    // color: white;
    // background-image: url({background});
    h1 {
      font-size: 10rem;
      line-height: 0;
    }
  }
  // .title {
  //   border-bottom: 0.5rem solid white;
  // }
  .opacity {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    // background-color: rgba(0, 0, 0, 0.5);
  }
</style>