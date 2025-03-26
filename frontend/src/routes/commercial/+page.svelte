<script>
// Data
let { data, menuOpen } = $props()

// Imports
import SwiperContainer from '$lib/components/SwiperContainer.svelte';

// Lifecycle
$effect(() => {
  
})
</script>

<section id="commercial">
  <SwiperContainer index={1} menuOpen={menuOpen} projects={data.commercial}/>
</section>