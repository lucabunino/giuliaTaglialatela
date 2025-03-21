<script>
// Data
let { data } = $props()

// Imports
import SwiperContainer from '$lib/components/SwiperContainer.svelte';

// Lifecycle
$effect(() => {
  
})
</script>

<section id="commercial">
  <SwiperContainer projects={data.commercial}/>
</section>