<script lang="ts">
  import { onMount } from "svelte";
  let currentPath: string;
  onMount(() => { currentPath = window.location.pathname; })
  export let title: string = "";
  export let href: string;
</script>

<a {href} class:active={currentPath==href}>
  <slot>{title}</slot>
</a>

<style lang="scss">

</style>
