<script>
import { urlFor } from '$lib/utils/image.js';
import Image from '$lib/components/Image.svelte'

let { data } = $props()
</script>

<svelte:head>
  {#if data.seo[0].SEOTitle && data.project[0].title}<title>{data.seo[0].SEOTitle} | {data.project[0].title}</title>{/if}
  {#if data.seo[0].SEOTitle && data.project[0].title}<meta property="og:title" content="{data.seo[0].SEOTitle} | {data.project[0].title}">{/if}
  {#if data.project[0].images[0]}<meta property="og:image" content={urlFor(data.project[0].images[0]).width(1280).url()}>{/if}
</svelte:head>

<section id="project">
  <div class="project-info">
    <p class="client">{data.project[0].client.title}, {data.project[0].title}, {data.project[0].date.split('-')[0]}<span class="mobile-only">,</span></p>
    {#if data.project[0].photographer}<p class="client">Ph. {data.project[0].photographer.title}</p>{/if}
  </div>
  {#if data.project[0].images}
    <div class="images">
      {#each data.project[0].images as image, i}
		<Image image={image} />
      {/each}
    </div>
  {/if}
</section>
  
<style>
#project {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr;
  grid-template-columns: repeat(12, 1fr);
  -webkit-column-gap: var(--gutter);
     -moz-column-gap: var(--gutter);
          column-gap: var(--gutter);
  position: relative;
  margin-bottom: -3em;
  z-index: -1;
}
.project-info {
  position: fixed;
  margin: 13em var(--margin);
  max-width: 600px;
}
.images {
  -ms-grid-column: 5;
  -ms-grid-column-span: 4;
  grid-column: 5 / span 4;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  gap: .3em;
}
@media screen and (max-width: 700px) {
  #project {
    padding: 37vw var(--margin) 15vw;
  }
  .project-info {
    position: relative;
    -ms-grid-column: 1;
    -ms-grid-column-span: 12;
    grid-column: 1 / span 12;
    margin: calc(var(--margin)*2) var(--margin);
    max-width: unset;
    text-align: center;
  }
  .project-info * {
    display: inline;
  }
  .images {
    -ms-grid-column: 1;
    -ms-grid-column-span: 12;
    grid-column: 1 / span 12;
  }
}
</style>