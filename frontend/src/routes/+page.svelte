<script>
// Data
let { data, menuOpen } = $props()
$inspect(menuOpen)

// Imports
import SwiperContainer from '$lib/components/SwiperContainer.svelte';

// Lifecycle
$effect(() => {
  
})
</script>

<section id="homepage">
  <SwiperContainer menuOpen={menuOpen} projects={data.homepage}/>
</section>