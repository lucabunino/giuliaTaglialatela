<script>
// Data
let { projects } = $props()

// Imports
import { urlFor } from '$lib/utils/image';
import Swiper from '$lib/components/Swiper.svelte';

// Variables
let innerWidth = $state();
let innerHeight = $state();
</script>
  
<svelte:window bind:innerWidth bind:innerHeight></svelte:window>
  
{#if innerWidth > 700}
  <Swiper projects={projects}/>
{:else}
  <div class="mobile-swiper">
    {#each projects as project, i}
      <a class="project"
      href="archive/{project.reference.slug.current}"
      >
      <img
      class="img {project.size} transition-{i%4+1}"
      width={project.image.asset.metadata.dimensions.width}
      height={project.image.asset.metadata.dimensions.height}
      alt={project.image.asset.altText}
      src={urlFor(project.image).height(1920)}
      >
      </a>
    {/each}
  </div>
{/if}

<style>
@media screen and (max-width: 700px) {
  .project {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img {
    object-fit: unset;
    height: auto;
  }
  .img.S {
    max-height: unset;
    width: 60%;
  }
  .img.M {
    max-height: unset;
    width: 80%;
  }
  .img.L {
    max-height: unset;
    width: 100%;
  }
}
</style>