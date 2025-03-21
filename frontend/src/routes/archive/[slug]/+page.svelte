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
      <p class="client">{data.project[0].client.title}, {data.project[0].title}, {data.project[0].date.split('-')[0]}</p>
      {#if data.project[0].photographer}<p class="client">{data.project[0].photographer.title}</p>{/if}
    </div>
    {#if data.project[0].images}
      <div class="images">
        {#each data.project[0].images as image, i}
          <img class="image" src={urlFor(image).width(1080)} alt="" style="aspect-ratio: {image.asset.metadata.dimensions.aspectRatio}">
        {/each}
      </div>
    {/if}
  </section>
  
  <style>
  .hoverColor:hover {
    color: var(--hoverColor);
  }
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
  </style>