<script>
// Data
let { index, projects } = $props()

// Imports
import { urlFor } from '$lib/utils/image';
import Swiper from '$lib/components/Swiper.svelte';

// Variables
let innerWidth = $state();
let innerHeight = $state();

let projectsElements = $state([]);
let aboveElements = $state([]);
$inspect(aboveElements)

function handleScroll() {
  let threshold = innerHeight * .05;
  projectsElements.forEach((el, i) => {
    if (!el) return;
    let rect = el.getBoundingClientRect();
    if (rect.top <= threshold) {
      if (!aboveElements.includes(i)) {
        aboveElements.push(i)
      }
    } else {
      aboveElements = aboveElements.filter(index => index !== i);
    }
  });
}
</script>
  
<svelte:window bind:innerWidth bind:innerHeight onscroll={handleScroll}></svelte:window>
  
{#if innerWidth > 700}
  <Swiper projects={projects} index={index}/>
{:else}
  <div class="mobile-swiper">
    {#each projects as project, i}
      <a class="project"
      href="archive/{project.reference.slug.current}"
      bind:this={projectsElements[i]}
      class:active={aboveElements.includes(i)}
      >
      <img
      class="img {project.size} transition-{i%4+1}"
      width={project.reference.preview.asset.metadata.dimensions.width}
      height={project.reference.preview.asset.metadata.dimensions.height}
      alt={project.reference.preview.asset.altText}
      src={urlFor(project.reference.preview).height(1920)}
      >
      <p class="caption">{project.reference.client.title}, {project.reference.title}, {project.reference.date.split('-')[0]}</p>
      </a>
    {/each}
  </div>
{/if}

<style>
@media screen and (max-width: 700px) {
  .mobile-swiper {
    margin: 27vw var(--margin);
    overflow: hidden;
  }
  .project {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .caption {
    margin-bottom: .1em;
  }
  .img {
    object-fit: unset;
    height: auto;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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
  :global(.project.active .img.transition-1)   {transform: translateY(5%) rotate3D(1, -1, 0, 45deg) scale(.9);}
  :global(.project.active .img.transition-2)   {transform: translateY(5%) rotate3D(-1, -1, 0, 45deg) scale(.9);}
  :global(.project.active .img.transition-3)   {transform: translateY(5%) rotate3D(1, 1, .3, 30deg) scale(.9);}
  :global(.project.active .img.transition-4)   {transform: translateY(5%) rotate3D(1, 1, 1, 10deg) scale(.9);}
}
</style>