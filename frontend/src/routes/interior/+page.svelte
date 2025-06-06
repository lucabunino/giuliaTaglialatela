<script>
import SwiperContainer from '$lib/components/SwiperContainer.svelte';
let { data, menuOpen } = $props()
</script>

<svelte:head>
  {#if data.seo[0].SEOTitle}<title>{data.seo[0].SEOTitle} | Interior</title>{/if}
</svelte:head>

<section id="interior">
  <SwiperContainer index={2} menuOpen={menuOpen} projects={data.interior}/>
</section>