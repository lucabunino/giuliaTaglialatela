<script>
// Data
let { index, projects, captionHidden = false } = $props()

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
  <Swiper projects={projects} index={index} captionHidden={captionHidden}/>
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
      src={urlFor(project.reference.preview).height(1500)}
      >
      <p class="caption" class:invisible={captionHidden}>{project.reference.client.title}, {project.reference.title}</p>
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }
  .caption {
    margin-bottom: .1em;
	opacity: 0;
  }
  .img {
    -o-object-fit: unset;
       object-fit: unset;
    height: auto;
    -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    transition: -webkit-transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    -o-transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), -webkit-transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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
  :global(.project.active .img.transition-1)   {-webkit-transform: translateY(5%) rotate3D(1, -1, 0, 45deg) scale(.9);-ms-transform: translateY(5%) rotate3D(1, -1, 0, 45deg) scale(.9);transform: translateY(5%) rotate3D(1, -1, 0, 45deg) scale(.9);}
  :global(.project.active .img.transition-2)   {-webkit-transform: translateY(5%) rotate3D(-1, -1, 0, 45deg) scale(.9);-ms-transform: translateY(5%) rotate3D(-1, -1, 0, 45deg) scale(.9);transform: translateY(5%) rotate3D(-1, -1, 0, 45deg) scale(.9);}
  :global(.project.active .img.transition-3)   {-webkit-transform: translateY(5%) rotate3D(1, 1, .3, 30deg) scale(.9);-ms-transform: translateY(5%) rotate3D(1, 1, .3, 30deg) scale(.9);transform: translateY(5%) rotate3D(1, 1, .3, 30deg) scale(.9);}
  :global(.project.active .img.transition-4)   {-webkit-transform: translateY(5%) rotate3D(1, 1, 1, 10deg) scale(.9);-ms-transform: translateY(5%) rotate3D(1, 1, 1, 10deg) scale(.9);transform: translateY(5%) rotate3D(1, 1, 1, 10deg) scale(.9);}
}
</style>