<script>
// Data
let { data } = $props()
$inspect(data)

// Imports
import { urlFor } from '$lib/utils/image.js';

// Variables



// Lifecycle

</script>

<section id="project">
  <div class="project-info">
    <p class="client">{data.project[0].client.title}, {data.project[0].title}, {data.project[0].date.split('-')[0]}<span class="mobile-only">,</span></p>
    {#if data.project[0].photographer}<p class="client">Ph. {data.project[0].photographer.title}</p>{/if}
  </div>
  {#if data.project[0].images}
    <div class="images">
      {#each data.project[0].images as image, i}
        <img class="image" src={urlFor(image).width(1080)} alt={image.asset.altText} style="aspect-ratio: {image.asset.metadata.dimensions.aspectRatio}">
      {/each}
    </div>
  {/if}
</section>
  
<style>
#project {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
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
  grid-column: 5 / span 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .3em;
}
@media screen and (max-width: 700px) {
  #project {
    padding: 37vw var(--margin) 15vw;
  }
  .project-info {
    position: relative;
    grid-column: 1 / span 12;
    margin: calc(var(--margin)*2) var(--margin);
    max-width: unset;
    text-align: center;
  }
  .project-info * {
    display: inline;
  }
  .images {
    grid-column: 1 / span 12;
  }
}
</style>