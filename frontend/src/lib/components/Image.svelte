<script>
import { urlFor } from '$lib/utils/image.js';
let {image} = $props()
</script>

<div class="image-wrapper" style="aspect-ratio: {image.asset.metadata.dimensions.aspectRatio}">
  <img
    src={image.asset.metadata.lqip}
    alt={image.asset.altText}
    class="lqip"
    aria-hidden="true"
  />
  <img
    class="image"
    srcset="
      {urlFor(image).width(800)} 400w,
      {urlFor(image).width(1000)} 800w,
      {urlFor(image).width(1200)} 1200w,
      {urlFor(image).width(1400)} 1400w
    "
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 700px"
    src={urlFor(image).width(1400)}
    alt={image.asset.altText}
  />
</div>
<style>
.image-wrapper {
  position: relative;
  overflow: hidden;
}
.lqip {
  position: absolute;
  width: 100%;
  -webkit-transform: scale(1.05);
      -ms-transform: scale(1.05);
          transform: scale(1.05);
  -webkit-filter: blur(10px);
          filter: blur(10px);
  -webkit-transition: opacity 0.3s ease;
  -o-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}
.image {
  position: relative;
  width: 100%;
  height: auto;
  display: block;
  -webkit-transition: opacity 0.3s ease;
  -o-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}
</style>