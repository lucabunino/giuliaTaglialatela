<script>
import SwiperContainer from '$lib/components/SwiperContainer.svelte';
let { data, menuOpen } = $props()
</script>

<svelte:head>
  {#if data.seo[0].SEOTitle}<title>{data.seo[0].SEOTitle} | Commercial</title>{/if}
</svelte:head>

<section id="commercial">
  <SwiperContainer index={1} menuOpen={menuOpen} projects={data.commercial}/>
</section>