<script>
// Data
let { data } = $props()
$inspect(data)

// Imports
import { urlFor } from '$lib/utils/image';

// Variables

// Functions


// Lifecycle
$effect(() => {

})
</script>

<section id="info">
  <p>{data.info.content}</p>
  <div> 
    <img src={urlFor(data.info.portrait)} alt="">
    <ul>
      <li>{data.info.title}</li>
      <li>{data.info.scope}</li>
      <li><a href="mailto:{data.info.email}">{data.info.email}</a></li>
      <li><a href="tel:{data.info.phone.replace(/[^\d+]/g, '')}">{data.info.phone}</a></li>
    </ul>
  </div>
</section>

<style>
#info {
  padding: 11em var(--margin) 2em;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: var(--gutter);
  row-gap: calc(var(--gutter)/2);
}
p {
  grid-column: 1 / span 6;
}
div {
  grid-column: 1 / span 6;
  display: flex;
  gap: calc(var(--gutter)/2);
}
img {
  width: calc((100% - var(--gutter)*2)/3);
}

@media screen and (max-width: 1100px) {
  p {
    grid-column: 1 / span 8;
  }
  div {
    grid-column: 1 / span 8;
  }
  img {
    width: calc((100% - var(--gutter))/2);
  }
}

@media screen and (max-width: 700px) {
  #info {
    padding: 37vw var(--margin) 15vw;
  }
  p {
    grid-column: 1 / span 12;
  }
  div {
    grid-column: 1 / span 12;
    gap: var(--gutter);
  }
}
</style>