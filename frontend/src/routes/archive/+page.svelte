<script>
// Data
let { data } = $props()

// Variables
let index = $state(0)
let projectHover = $derived(data.archive[index])
let displaceImages = data.displaceImages
let img = $derived(projectHover.preview)
let canvasWidth = $state()
let canvasHeight = $state()

// Imports
import Pixi from '$lib/components/Pixi.svelte'
import { urlFor } from '$lib/utils/image.js';
import { fade } from "svelte/transition";
</script>

<section id="archive">
  <div class="row">
    <label>Client</label>
    <label>Project</label>
    <label>Year</label>
    <label>Preview</label>
  </div>
  {#each data.archive as project, i}
  {#if project.singlePaged}
    <a class="row" href="archive/{project.slug.current}" onmouseover={() => index = i}>
      <p class="client">{project.client.title}</p>
      <div class="project">
        <span class="cta honeymoon-24">View</span>
        <p>{project.title}</p>
      </div>
      <p class="year">{project.date.split('-')[0]}</p>
    </a>
  {:else}
  <div class="row hoverColor" onmouseover={() => index = i}>
    <p class="client">{project.client.title}</p>
    <div class="project">
      <p>{project.title}</p>
    </div>
    <p class="year">{project.date.split('-')[0]}</p>
  </div>
  {/if}
  {/each}
  <img class="target" src={urlFor(img).width(1080)} alt="" bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight} style="aspect-ratio: {img.asset.metadata.dimensions.aspectRatio}">
    {#key img}
      <div
      class="preview"
      style="aspect-ratio: {img.asset.metadata.dimensions.aspectRatio}"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}>
        <Pixi displaceImages={displaceImages} projectHover={projectHover} canvasWidth={canvasWidth} canvasHeight={canvasHeight}/>
      </div>
    {/key}
</section>

<style>
.hoverColor:hover {
  color: var(--hoverColor);
}
#archive {
  padding: 13em var(--margin);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: var(--gutter);
  position: relative;
}
.row {
  grid-column: 1 / span 12;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gutter);
  position: relative;
}
.row:nth-child(1) {
  margin-bottom: 2em;
  height: 1.431rem;
}
.row label {
  position: fixed;
}
.row label:nth-child(1) {grid-column: 4 / span 2;}
.row label:nth-child(2) {grid-column: 6 / span 3;}
.row label:nth-child(3) {grid-column: 9 / span 1;justify-self: right;}
.row label:nth-child(4) {grid-column: 10 / span 3;}

.row>.client {
  grid-column: 4 / span 2;
}
.row>.project {
  grid-column: 6 / span 3;
  position: relative;
}
.row>.year {
  grid-column: 9 / span 1;
  text-align: right;
}
.cta {
  position: absolute;
  left: -.5em;
  top: -.2em;
  transform: translateX(-100%);
}
.preview, .target {
  position: fixed;
  width: -webkit-fill-available;
  margin-right: var(--margin);
  height: auto;
  overflow: visible;
  grid-column: 10 / span 3;
  grid-row: 2;
  mix-blend-mode: multiply;
}
.target {
  visibility: hidden;
}
@media screen and (max-width: 900px) {
  .row label:nth-child(1) {grid-column: 1 / span 3;}
  .row label:nth-child(2) {grid-column: 4 / span 4;}
  .row label:nth-child(3) {grid-column: 8 / span 1;justify-self: right;}
  .row label:nth-child(4) {grid-column: 9 / span 4;}

  .row>.client {
    grid-column: 1 / span 3;
  }
  .row>.project {
    grid-column: 4 / span 4;
    position: relative;
  }
  .row>.year {
    grid-column: 8 / span 1;
    text-align: right;
  }
  .preview, .target {
    grid-column: 9 / span 4;
  }
}
@media screen and (max-width: 700px) {
  .row {
    grid-template-columns: repeat(8, 1fr);
  }
  .row label:nth-child(1) {grid-column: 1 / span 2;}
  .row label:nth-child(2) {grid-column: 3 / span 5;}
  .row label:nth-child(3) {grid-column: 8 / span 1;justify-self: right;}
  .row label:nth-child(4) {display: none;}

  .row>.client {
    grid-column: 1 / span 2;
  }
  .row>.project {
    grid-column: 3 / span 5;
    position: relative;
  }
  .row>.year {
    grid-column: 8 / span 1;
    text-align: right;
  }
  .preview, .target {
    grid-column: 9 / span 4;
    top: 50vh;
  }
}
</style>