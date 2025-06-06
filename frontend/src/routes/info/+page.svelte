<script>
import { urlFor } from '$lib/utils/image';
let { data } = $props()
</script>

<svelte:head>
  {#if data.seo[0].SEOTitle}<title>{data.seo[0].SEOTitle} | Info</title>{/if}
</svelte:head>

<section id="info">
  <p>{data.info.content}</p>
  <div> 
    <img alt="Portrait of Giulia Taglialatela"
	srcset="
		{urlFor(data.info.portrait).width(600)} 400w,
		{urlFor(data.info.portrait).width(800)} 800w,
		{urlFor(data.info.portrait).width(1000)} 1200w,
		{urlFor(data.info.portrait).width(1200)} 1400w
	"
	sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 700px"
	src={urlFor(data.info.portrait).width(1000)}
	>
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
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr;
  grid-template-columns: repeat(12, 1fr);
  -webkit-column-gap: var(--gutter);
     -moz-column-gap: var(--gutter);
          column-gap: var(--gutter);
  row-gap: calc(var(--gutter)/2);
}
p {
  -ms-grid-column: 1;
  -ms-grid-column-span: 6;
  grid-column: 1 / span 6;
}
div {
  -ms-grid-column: 1;
  -ms-grid-column-span: 6;
  grid-column: 1 / span 6;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: calc(var(--gutter)/2);
}
img {
  width: calc((100% - var(--gutter)*2)/3);
}

@media screen and (max-width: 1100px) {
  p {
    -ms-grid-column: 1;
    -ms-grid-column-span: 8;
    grid-column: 1 / span 8;
  }
  div {
    -ms-grid-column: 1;
    -ms-grid-column-span: 8;
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
    -ms-grid-column: 1;
    -ms-grid-column-span: 12;
    grid-column: 1 / span 12;
  }
  div {
    -ms-grid-column: 1;
    -ms-grid-column-span: 12;
    grid-column: 1 / span 12;
    gap: var(--gutter);
  }
}
</style>