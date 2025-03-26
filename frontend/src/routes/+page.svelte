<script>
// Data
let { data, menuOpen } = $props()

// Imports
import SwiperContainer from '$lib/components/SwiperContainer.svelte';

// Lifecycle
$effect(() => {
  
})
</script>

<section id="homepage">
  <SwiperContainer index={0} menuOpen={menuOpen} projects={data.homepage}/>
</section>