<script>
import { urlFor } from "$lib/utils/image.js";
import { T } from '@threlte/core'
import { useTexture } from '@threlte/extras'

let { img } = $props()

let innerWidth = $state()
let innerHeight = $state()
let imgUrl = $derived(urlFor(img).width(innerWidth).url());
let canvasWidth = $derived(5.2);
</script>

<svelte:window bind:innerWidth bind:innerHeight></svelte:window>


<T.Scene>
  <!-- Camera -->
  <T.PerspectiveCamera position={[0, 0, 5]} />

  <!-- Light -->
  <T.AmbientLight intensity={0.5} />
  <T.DirectionalLight position={[1, 1, 1]} intensity={0.8} />

  <!-- Sprite -->
  {#await useTexture(imgUrl) then texture}
    <T.Mesh>
      <T.Sprite material={{ map: texture }} args={[canvasWidth, canvasWidth/img.asset.metadata.dimensions.aspectRatio]} />
    </T.Mesh>
  {/await}
  {#await useTexture(imgUrl) then texture}
    <T.Sprite material={{ map: texture }} position={[0, 0, 0]} scale={[2, 2, 1]} />
  {/await}
</T.Scene>