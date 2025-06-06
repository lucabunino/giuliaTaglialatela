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
let innerWidth = $state()
let domLoaded = $state(false)

// Imports
import Pixi from '$lib/components/Pixi.svelte'
import { urlFor } from '$lib/utils/image.js';
import { fade } from "svelte/transition";

function mobileClick(event) {
  if (innerWidth > 700) {
    return
  } else {
    event.preventDefault()
  }
}

$effect(() => {
  domLoaded = true
})
</script>

<svelte:head>
  {#if data.seo[0].SEOTitle}<title>{data.seo[0].SEOTitle} | Archive</title>{/if}
</svelte:head>

<svelte:window bind:innerWidth></svelte:window>

<section id="archive" translate="no">
  <div class="row">
    <label>Client</label>
    <label>Project</label>
    <label>Year</label>
    <label>Preview</label>
  </div>
  {#each data.archive as project, i}
  {#if project.singlePaged && innerWidth > 700}
    <a class="row hoverColor" class:mobileActive={i === index} href="archive/{project.slug.current}" onmouseover={() => index = i} onclick={(e) => {mobileClick(e)}}>
      <p translate="no" class="client">{project.client.title}</p>
      <div class="project">
        <span class="cta honeymoon-24">View</span>
        <p>{project.title}</p>
      </div>
      <p class="year">{project.date.split('-')[0]}</p>
    </a>
  {:else}
  <button class="row hoverColor" class:mobileActive={i === index} onmouseover={() => index = i}>
    <p class="client">{project.client.title}</p>
    <div class="project">
      {#if project.singlePaged}
        <a class="mobile-only cta honeymoon-24" class:mobileActive={i === index} href="archive/{projectHover.slug.current}">View</a>
      {/if}
      <p>{project.title}</p>
    </div>
    <p class="year">{project.date.split('-')[0]}</p>
  </button>
  {/if}
  {/each}
  <img class="target" src={urlFor(img).width(1080)} alt={img.asset.altText} bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight} style="aspect-ratio: {img.asset.metadata.dimensions.aspectRatio}">
  {#if domLoaded}
    {#key img}
      <div
      class="preview"
      style="aspect-ratio: {img.asset.metadata.dimensions.aspectRatio}"
      in:fade|global={{ duration: 50, delay: 50 }}
      out:fade|global={{ duration: 50, delay: 50}}>
        <Pixi displaceImages={displaceImages} projectHover={projectHover} canvasWidth={canvasWidth} canvasHeight={canvasHeight}/>
        <!-- {#if projectHover.singlePaged}
          <a class="mobile-only view-project" href="archive/{projectHover.slug.current}">View project</a>
        {/if} -->
      </div>
    {/key}
  {/if}
</section>

<style>
@media screen and (min-width: 701px) {
  .hoverColor:hover {
    color: var(--hoverColor);
  }
}
#archive {
  padding: 13em var(--margin);
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr;
  grid-template-columns: repeat(12, 1fr);
  -webkit-column-gap: var(--gutter);
     -moz-column-gap: var(--gutter);
          column-gap: var(--gutter);
  position: relative;
}
.row {
  -ms-grid-column: 1;
  -ms-grid-column-span: 12;
  grid-column: 1 / span 12;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gutter);
  position: relative;
}
.row:nth-child(1) {
  margin-bottom: 2em;
  height: 1.431rem;
}
button:hover {
  cursor: default;
}
.row label {
  position: fixed;
}
.row label:nth-child(1) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*3 + var(--gutter)*3);}
.row label:nth-child(2) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*5 + var(--gutter)*5);}
.row label:nth-child(3) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*9 + var(--gutter)*8); -webkit-transform: translateX(-100%); -ms-transform: translateX(-100%); transform: translateX(-100%);}
.row label:nth-child(4) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*9 + var(--gutter)*9);}

.row>*:not(.project), .row>*>* {
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
     text-overflow: ellipsis;
}
.row>.client {
  -ms-grid-column: 4;
  -ms-grid-column-span: 2;
  grid-column: 4 / span 2;
  width: calc(100% - var(--gutter));
}
.row>.project {
  -ms-grid-column: 6;
  -ms-grid-column-span: 3;
  grid-column: 6 / span 3;
  position: relative;
  width: 123%;
}
.row>.year {
  -ms-grid-column: 9;
  -ms-grid-column-span: 1;
  grid-column: 9 / span 1;
  text-align: right;
}
.cta {
  position: absolute;
  left: -.5em;
  top: -.2em;
  -webkit-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
          transform: translateX(-100%);
}
.preview, .target {
  position: fixed;
  width: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*3 + var(--gutter)*2);
  top: calc(13em + 3.431em);
  right: var(--margin);
  height: auto;
  overflow: visible;
  -ms-grid-column: 10;
  -ms-grid-column-span: 3;
  grid-column: 10 / span 3;
  -ms-grid-row: 2;
  grid-row: 2;
  z-index: 1;
}
.target {
  visibility: hidden;
}
@media screen and (max-width: 900px) {
  .row label:nth-child(1) {margin-left: 0;}
  .row label:nth-child(2) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*3 + var(--gutter)*3);}
  .row label:nth-child(3) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*8 + var(--gutter)*7);}
  .row label:nth-child(4) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*8 + var(--gutter)*8);}

  .row>.client {
    -ms-grid-column: 1;
    -ms-grid-column-span: 3;
    grid-column: 1 / span 3;
	width: calc(100% - 50px);
  }
  .row>.project {
    -ms-grid-column: 4;
    -ms-grid-column-span: 4;
    grid-column: 4 / span 4;
    position: relative;
	width: 110%;
  }
  .row>.year {
    -ms-grid-column: 8;
    -ms-grid-column-span: 1;
    grid-column: 8 / span 1;
    text-align: right;
  }
  .preview, .target {
    -ms-grid-column: 9;
    -ms-grid-column-span: 4;
    grid-column: 9 / span 4;
    width: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*4 + var(--gutter)*3);
    top: unset;
  }
}
@media screen and (max-width: 700px) {
  .view-project {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
            transform: translateX(-50%);
    width: auto;
    text-align: center;
    z-index: 2;
    background-color: var(--white);
    padding: .3em 1em .5em;
    border-radius: 1em;
  }
  .mobileActive {
    color: var(--hoverColor);
  }
  #archive {
    padding: 37vw var(--margin) 15vw;
  }
  .row {
    -ms-grid-columns: (1fr)[8];
    grid-template-columns: repeat(8, 1fr);
    z-index: 2;
  }
  .row:nth-child(1) {
    margin-top: calc(var(--margin)*2);
  }
  .row label:nth-child(2) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*7)/8*3 + var(--gutter)*3);}
  .row label:nth-child(3) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*7)/8*8 + var(--gutter)*7);}
  .row label:nth-child(4) {display: none;}

  .row>.client {
    -ms-grid-column: 1;
    -ms-grid-column-span: 3;
    grid-column: 1 / span 3;
  }
  .row>.project {
    -ms-grid-column: 4;
    -ms-grid-column-span: 4;
    grid-column: 4 / span 4;
    position: relative;
  }
  .row>.year {
    -ms-grid-column: 8;
    -ms-grid-column-span: 1;
    grid-column: 8 / span 1;
    text-align: right;
  }
  .preview, .target {
    width: calc((100% - var(--margin)*2 - var(--gutter)*7)/8*4 + var(--gutter)*3);
    -ms-grid-column: 4;
    -ms-grid-column-span: 4;
    grid-column: 4 / span 4;
    bottom: var(--margin);
  }
}
@media screen and (max-width: 500px) {
  .preview, .target {
    width: calc((100% - var(--margin)*2 - var(--gutter)*7)/8*5 + var(--gutter)*4);
    -ms-grid-column: 3;
    -ms-grid-column-span: 5;
    grid-column: 3 / span 5;
  }
}
@media screen and (max-width: 320px) {
  .row label:nth-child(2) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*7)/8*2 + var(--gutter)*2);}
  .row label:nth-child(3) {margin-left: calc((100% - var(--margin)*2 - var(--gutter)*7)/8*8 + var(--gutter)*7);}
  .row>.project {
	width: 130%;
    -ms-grid-column: 4;
    -ms-grid-column-span: 3;
    grid-column: 4 / span 3;
  }
  .row>.year {
    -ms-grid-column: 7;
    -ms-grid-column-span: 2;
    grid-column: 7 / span 2;
  }
}
</style>