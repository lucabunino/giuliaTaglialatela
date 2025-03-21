<script>
// Data
let { data, children } = $props();
$inspect(data)

// Imports
import "../app.css";
import { dev } from '$app/environment';
import { page } from '$app/stores';
import { urlFor } from '$lib/utils/image';

// Variables
let domLoaded = $state(false)
let innerWidth = $state(0)
let innerHeight = $state(0)
let menuOpen = $state(false)

// Functions


// Lifecycle
$effect(() => {
  domLoaded = true
});

// Dev
let viewGrid = $state(false)
const gridColumnsDesktop = 12
const gridColumnsMobile = 4
function handleKey({key}) {if (key === 'G' && dev) {viewGrid = !viewGrid}}
</script>

<svelte:window bind:innerWidth bind:innerHeight onkeyup={handleKey}></svelte:window>

{#if viewGrid}
<div id="layout"
      style="grid-template-columns:repeat({innerWidth > 800 ? gridColumnsDesktop : gridColumnsMobile}, 1fr);pointer-events:none;display: grid;position:fixed; z-index:999;width: -moz-available;width: -webkit-fill-available;height: -moz-available;height: -webkit-fill-available;margin:0 var(--margin);gap:var(--gutter);opacity:.2;">
  {#each Array(innerWidth > 800 ? gridColumnsDesktop : gridColumnsMobile) as _, i}
    <div style="background-color:red"></div>
  {/each}
</div>
{/if}

<svelte:head>
  {#if data.seo[0].SEOTitle}<title>{data.seo[0].SEOTitle}</title>{/if}
  {#if data.seo[0].SEODescription}<meta name="description" content={data.seo[0].SEODescription}>{/if}
  <link rel="canonical" href={$page.url}>
  <meta name="robots" content="index,follow">
  <meta name="googlebot" content="index,follow">
  {#if data.seo[0].SEOTitle}<meta property="og:title" content={data.seo[0].SEOTitle}>{/if}
  {#if data.seo[0].SEODescription}<meta property="og:description" content={data.seo[0].SEODescription}>{/if}
  {#if data.seo[0].SEOImage}<meta property="og:image" content={urlFor(data.seo[0].SEOImage).width(2000).url()}>{/if}
  <meta property="og:url" content={$page.url}>
  <meta property="og:type" content="website">
  {#if data.seo[0].SEOTitle}<meta property="og:site_name" content={data.seo[0].SEOTitle}>{/if}
</svelte:head>


<div style="--hoverColor:{data.settings.hoverColor.hex}">
<header class="honeymoon-120">
  <nav>
    <ul class="menu" class:open={menuOpen}>
      <li class="menu-item">
        <a href="/" class="active" onclick={(e) => {menuOpen = false}}><span class="logo page-active">G</span><span class="menu-active">iulia</span> <span class="logo page-active">T</span><span class="menu-active">aglialatela</span></a></li>
      <div>
        <li class="menu-item">
          <a href="/commercial" class:active={$page.url.pathname === "/commercial"} onclick={(e) => {menuOpen = false}}><span class="page-active">C</span><span class="menu-active">ommercial</span></a>
        </li>
        <li class="menu-item" style="overflow:hidden">
          <a href="/interior" class:active={$page.url.pathname === "/interior"} onclick={(e) => {menuOpen = false}}><span class="page-active">I</span><span class="menu-active">nterior</span></a>
        </li>
      </div>
      <li class="menu-item">
        <a href="/archive" class:active={$page.url.pathname === "/archive"} onclick={(e) => {menuOpen = false}}><span class="page-active">A</span><span class="menu-active">rchive</span></a>
      </li>
      <li class="menu-item menu-ig">
        <a href="/info" class:active={$page.url.pathname === "/info"} onclick={(e) => {menuOpen = false}}><span class="page-active">I</span><span class="menu-active">nfo</span></a>
        <a href={data.settings.instagramUrl} target="_blank" rel="noopener noreferrer">
          <svg version="1.1" viewBox="-0.1 -0.1 8.2 8.2" xmlns="http://www.w3.org/2000/svg">
            <g>
              <rect class="st0" width="8.1" height="8.1" rx="2.1" ry="2.1"/>
              <rect class="st1" x="0" y="0" width="8" height="8" rx="2" ry="2"/>
            </g>
            <g>
              <ellipse class="st0" cx="4.1" cy="4.2" rx="2" ry="2"/>
              <ellipse class="st1" cx="4.1" cy="4.2" rx="1.9" ry="1.9"/>
            </g>
            <circle cx="6.5" cy="1.8" r=".3"/>
          </svg>          
        </a>
      </li>
    </ul>
    <button class="menu-switch" onclick={(e) => {menuOpen = !menuOpen}} onkeydown={(e) => {if (e.key === 'Enter' || e.key === ' ') {menuOpen = !menuOpen}}} class:crossed={menuOpen}>
      <div style="position: relative; height:100%;">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </button>
  </nav>
</header>

{#if domLoaded}
  <main>
    {@render children()}
  </main>
{/if}

{#if domLoaded && $page.url.pathname !== "/"}
  <footer>© Giulia Taglialela, 2025</footer>
{/if}
</div>
  
<style>
/* Header */
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--margin) 0;
  z-index: 10;
  pointer-events: none;
}
.menu.open {
  backdrop-filter: blur(15px);
  pointer-events: all;
}
.menu-item {
  margin-left: -.15em;
}
.menu:not(.open) .menu-item a {
  opacity: 0;
  pointer-events: none;
}
.menu:not(.open) .menu-item a.active,
.menu.open a {
  opacity: 1;
  pointer-events: all;
}
.menu-item.menu-ig {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu-item.menu-ig svg {
  margin-right: var(--margin);
  width: 7vw;
  fill: var(--black);
}
.menu-item.menu-ig .st0, .st1 {
  fill: none;
}
.menu-item.menu-ig .st1 {
  stroke: var(--black);
  stroke-width: 0.01vw;
}
.menu-item.menu-ig svg:hover {
  fill: var(--hoverColor);
}
.menu-item.menu-ig svg:hover .st1 {
  stroke: var(--hoverColor);
  stroke-width: 0.01vw;
}


.menu-active {opacity: 0;pointer-events: none;}
.open .menu-active {opacity: 1;pointer-events: all;}

.page-active::after {content: "…";position: absolute;}
.page-active.logo::after {content: ".";}
.open .page-active::after {opacity: 0;pointer-events: none;}

/* Menu switch */
.menu-switch {
  position: fixed;
  top: calc(.55em - var(--margin));
  right: 0;
  width: calc(10.156vw + var(--margin)*2);
  height: calc(2.5vw + var(--margin)*2);
  cursor: pointer;
  z-index: 10;
  padding: var(--margin);
}
.line {
  width: 100%;
  height: .1vw;
  background-color: var(--black);
  position: absolute;
  transition: var(--transition);
  transition-property: top, transform;
  transform-origin: center;
}
.line:nth-child(1) {top: 0;}
.line:nth-child(2) {top: 50%;}
.line:nth-child(3) {top: 100%;}
.menu-switch.crossed .line:nth-child(1) {
  transform: rotate(20deg);
  top: 50%;
}
.menu-switch.crossed .line:nth-child(2) {
  transform: scaleX(0);
}
.menu-switch.crossed .line:nth-child(3) {
  transform: rotate(-20deg);
  top: 50%;
}
.menu-switch:hover .line {
  background-color: var(--hoverColor);
}

/* Main */
main {
  min-height: calc(100vh - 3rem);
}

/* Footer */
footer {
  display: flex;
  justify-content: center;
}


@media screen and (max-width: 900px) {
  svg {
    width: 6rem;
  }
  footer {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 1em;
  }
  footer div {
    display: flex;
    flex-direction: column;
  }
  footer div>*:nth-child(even) {
    margin-bottom: 1.5em;
  }
}
</style>