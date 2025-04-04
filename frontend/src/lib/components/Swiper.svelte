<script>
// Data
let { index, projects } = $props()

// Imports
import { register } from 'swiper/element/bundle';register();
import { urlFor } from '$lib/utils/image';

// Variables
let currentIndex = $state(0);
let currentProject = $derived(projects[currentIndex]);
let innerWidth = $state();
let innerHeight = $state();
let mouse = $state([])
let cta = $state()

import { getSlide } from "$lib/stores/slide.svelte";
let slider = getSlide()
$inspect(slider)

// Functions
function setCta(text) {
  cta = text
}
function onRealIndexChange(e) {
  const [swiper] = e.detail;
  currentIndex = swiper.realIndex
  slider.setSlide(swiper.realIndex)
}
function handleMousemove(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}
function addClicked(selector) {
  let slide = document.querySelector(selector);
  if (!slide) return;

  // Get the current transform property
  const computedStyle = window.getComputedStyle(slide);
  const currentTransform = computedStyle.transform;

  // Temporarily lock the transform
  slide.style.transform = currentTransform;
  slide.classList.add("clicked");

  setTimeout(() => {
    slide.classList.remove("clicked");
    slide.style.transform = ""; // Restore default behavior
  }, 200);
}

// Lifecycle
$effect(() => {
  setTimeout(() => {
    const swiperEl = document.querySelector('#swiper-' + index);
    const swiperParams = {
      slidesPerView: 1.5,
      centeredSlides: true,
      loop: true,
      mousewheel: {
        forceToAxis: false,
        sensitivity: .3,
        thresholdDelta: 10,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      speed: 400,
      keyboard: true,
      hashNavigation: true,
      breakpoints: {
        900: {
          slidesPerView: 2,
        },
      },
    };
    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  }, 100);
})
</script>
  
<svelte:window bind:innerWidth bind:innerHeight onmousemove={handleMousemove}></svelte:window>
  
<swiper-container
id="swiper-{index}"
init="false"
initial-slide = {slider.slide}
onswiperrealindexchange={onRealIndexChange}
>
  {#each projects as project, i}
    <swiper-slide>
      <a class="project"
      onmouseover={() => setCta("View")}
      onmouseleave={() => setCta("")}
      href="archive/{project.reference.slug.current}"
      >
      <img
      class="img {project.size} transition-{i%4+1}"
      class:hoverNext={mouse.x > innerWidth/4*3}
      class:hoverPrev={mouse.x < innerWidth/4*1}
      width={project.reference.preview.asset.metadata.dimensions.width}
      height={project.reference.preview.asset.metadata.dimensions.height}
      alt={project.reference.preview.asset.altText}
      src={urlFor(project.reference.preview).height(1920)}
      >
      </a>
    </swiper-slide>
  {/each}
</swiper-container>
<button class="swiper-button swiper-button-prev" onclick={() => addClicked('.swiper-slide-active>a>img')} onmouseover={() => setCta("Prev")} onmouseleave={() => setCta("")}></button>
<button class="swiper-button swiper-button-next" onclick={() => addClicked('.swiper-slide-active>a>img')} onmouseover={() => setCta("Next")} onmouseleave={() => setCta("")}></button>
<p translate="no" id="cta" class="honeymoon-120" style={cta === "" ? `-webkit-transform: translateX(${(mouse.x / innerWidth)*-100}%);-ms-transform: translateX(${(mouse.x / innerWidth)*-100}%);transform: translateX(${(mouse.x / innerWidth)*-100}%);left: ${mouse.x}px;top: ${mouse.y}px;` : `-webkit-transform: translateX(${(mouse.x / innerWidth)*-100}%);-ms-transform: translateX(${(mouse.x / innerWidth)*-100}%);transform: translateX(${(mouse.x / innerWidth)*-100}%);left: ${mouse.x}px;top: ${mouse.y}px;`}>{cta}</p>
<p class="project-info"><span>{currentProject.reference.title}</span>{#if currentProject.reference.client}<span>, {currentProject.reference.client.title}</span>{/if}<span>, {currentProject.reference.date.split('-')[0]}</span></p>

<style>
swiper-slide a {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper-button {
  background: transparent;
  border: none;
  width: 25vw;
  height: 100vh;
  position: absolute;
  display: block;
  top: 0;
  z-index: 1;
  cursor: pointer;
}
.swiper-button-prev {
  left: 0;
}
.swiper-button-next {
  right: 0;
}
.img {
  /* object-fit: contain; */
  transition: var(--transition);
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: rotate3D(0, 0, 0, 0deg) scale(1);
  transition-delay: 0;
  width: auto;
}
.img.S {
  height: 56vh;
}
.img.M {
  height: 64vh;
}
.img.L {
  height: 80vh;
}
:global(.swiper-slide-active:hover .img.transition-1)   {transform: rotate3D(1, -1, 0, 45deg) scale(1.1);}
:global(.swiper-slide-next .img.hoverNext.transition-1) {transform: rotate3D(-1, 1, 0, 20deg) scale(1.05) translateX(-5%);}
:global(.swiper-slide-prev .img.hoverPrev.transition-1) {transform: rotate3D(-1, -1, 0, 20deg) scale(1.05) translateX(5%);}

:global(.swiper-slide-active:hover .img.transition-2)   {transform: rotate3D(-1, -1, 0, 45deg) scale(1.1);}
:global(.swiper-slide-next .img.hoverNext.transition-2) {transform: rotate3D(-1, 1, 0, 30deg) scale(1.05) translateX(-5%);}
:global(.swiper-slide-prev .img.hoverPrev.transition-2) {transform: rotate3D(1, -1, 0, 60deg) scale(1.05) translateX(5%);}

:global(.swiper-slide-active:hover .img.transition-3)   {transform: rotate3D(1, 1, .3, 30deg) scale(1.1);}
:global(.swiper-slide-next .img.hoverNext.transition-3) {transform: rotate3D(1, -1, 0, 45deg) scale(1.05) translateX(-5%);}
:global(.swiper-slide-prev .img.hoverPrev.transition-3) {transform: rotate3D(-1, -1, 0, 45deg) scale(1.05) translateX(5%);}

:global(.swiper-slide-active:hover .img.transition-4)   {transform: rotate3D(1, 1, 1, 10deg) scale(1.1);}
:global(.swiper-slide-next .img.hoverNext.transition-4) {transform: rotate3D(1, -1, -1, 20deg) scale(1.05) translateX(-5%);}
:global(.swiper-slide-prev .img.hoverPrev.transition-4) {transform: rotate3D(-1, -1, -1, 20deg) scale(1.05) translateX(5%);}

.project-info {
  display: inline;
  position: fixed;
  bottom: 3vh;
  z-index: 9;
  max-width: 600px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
}

#cta {
  z-index: 9;
  position: absolute;
  top: -50%;
  pointer-events: none;
  margin: .1em;
}

@media screen and (max-width: 700px) {
  .project {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img {
    object-fit: unset;
    height: auto;
  }
  .img.S {
    max-height: unset;
    width: 60%;
  }
  .img.M {
    max-height: unset;
    width: 80%;
  }
  .img.L {
    max-height: unset;
    width: 100%;
  }
}
</style>