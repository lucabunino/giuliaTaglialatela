<script>
// Data
let { data } = $props()

// Variables
let lastHover = $state('commercial')

let commercialIndex = $state(0)
let commercialHover = $derived(data.commercial[commercialIndex])
let commercialImg = $derived(commercialHover.preview)

let interiorIndex = $state(null)
let interiorHover = $derived(data.interior[interiorIndex])
let interiorImg = $derived(interiorHover.preview)

let canvasWidth = $state()
let canvasHeight = $state()
let innerWidth = $state()
let domLoaded = $state(false)

// Imports
import Pixi from '$lib/components/Pixi.svelte'
import { urlFor } from '$lib/utils/image.js';
import { fade } from "svelte/transition";

function mobileClick(event) {
	if (innerWidth > 700) {
		return
	} else {
		event.preventDefault()
	}
}

$effect(() => {
	domLoaded = true
})
</script>

<svelte:head>
	{#if data.seo[0].SEOTitle}<title>{data.seo[0].SEOTitle} | Archive</title>{/if}
</svelte:head>

<svelte:window bind:innerWidth></svelte:window>

<section id="archive" translate="no">
	<h3>Commercial</h3>
	{#each data.commercial as project, i}
	{#if project.singlePaged && innerWidth > 700}
		<a class="row hoverColor" class:mobileActive={i === commercialIndex} href="archive/{project.slug.current}" onmouseover={() => {commercialIndex = i; lastHover = "commercial"}} onclick={(e) => {mobileClick(e)}}>
		<p translate="no" class="client">{project.client.title}</p>
		<p class="project">{project.title}</p>
		<span class="cta honeymoon-24">View</span>
		</a>
	{:else}
	<button class="row hoverColor" class:mobileActive={i === commercialIndex} onmouseover={() => {commercialIndex = i; lastHover = "commercial"}}>
		<p class="client">{project.client.title}</p>
		<p class="project">{project.title}</p>
		{#if project.singlePaged}
			<a class="mobile-only cta honeymoon-24" class:mobileActive={i === commercialIndex} href="archive/{project.slug.current}">View</a>
		{/if}
	</button>
	{/if}
	{/each}

	<h3 class="mt">Interior</h3>
	{#each data.interior as project, i}
	{#if project.singlePaged && innerWidth > 700}
		<a class="row hoverColor" class:mobileActive={i === interiorIndex} href="archive/{project.slug.current}" onmouseover={() => {interiorIndex = i; lastHover = "interior"}} onclick={(e) => {mobileClick(e)}}>
		<p translate="no" class="client">{project.client.title}</p>
		<p class="project">{project.title}</p>
		<span class="cta honeymoon-24">View</span>
		</a>
	{:else}
	<button class="row hoverColor" class:mobileActive={i === interiorIndex} onmouseover={() => {interiorIndex = i; lastHover = "interior"}}>
		<p class="client">{project.client.title}</p>
		<p class="project">{project.title}</p>
		{#if project.singlePaged}
			<a class="mobile-only cta honeymoon-24" class:mobileActive={i === interiorIndex} href="archive/{project.slug.current}">View</a>
		{/if}
	</button>
	{/if}
	{/each}

		{#if lastHover === "commercial"}
	<img class="target" src={urlFor(commercialImg).width(1080)} alt={commercialImg.asset.altText} bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight} style="aspect-ratio: {commercialImg.asset.metadata.dimensions.aspectRatio}">
	{#if domLoaded}
		{#key commercialImg}
		<div
		class="preview"
		style="aspect-ratio: {commercialImg.asset.metadata.dimensions.aspectRatio}"
		in:fade|global={{ duration: 50, delay: 50 }}
		out:fade|global={{ duration: 50, delay: 50}}>
			<Pixi displaceImages={data.displaceImages} projectHover={commercialHover} canvasWidth={canvasWidth} canvasHeight={canvasHeight}/>
		</div>
		{/key}
	{/if}
{:else}
	<img class="target" src={urlFor(interiorImg).width(1080)} alt={interiorImg.asset.altText} bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight} style="aspect-ratio: {interiorImg.asset.metadata.dimensions.aspectRatio}">
	{#if domLoaded}
		{#key interiorImg}
			<div
			class="preview"
			style="aspect-ratio: {interiorImg.asset.metadata.dimensions.aspectRatio}"
			in:fade|global={{ duration: 50, delay: 50 }}
			out:fade|global={{ duration: 50, delay: 50}}>
				<Pixi displaceImages={data.displaceImages} projectHover={interiorHover} canvasWidth={canvasWidth} canvasHeight={canvasHeight}/>
			</div>
		{/key}
	{/if}
{/if}
</section>

<style>
@media screen and (min-width: 701px) {
	.hoverColor:hover {
		color: var(--hoverColor);
		mix-blend-mode: normal;
	}
}
#archive {
	padding: 13em var(--margin);
	display: -ms-grid;
	display: grid;
	-ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr;
	grid-template-columns: repeat(12, 1fr);
	-webkit-column-gap: var(--gutter);
		 -moz-column-gap: var(--gutter);
					column-gap: var(--gutter);
	position: relative;
}
.row {
	-ms-grid-column: 1;
	-ms-grid-column-span: 12;
	grid-column: 1 / span 12;
	display: -ms-grid;
	display: grid;
	-ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr;
	grid-template-columns: repeat(12, 1fr);
	gap: var(--gutter);
	position: relative;
	mix-blend-mode: difference;
	color: var(--white);
}
h3 {
	-ms-grid-column: 1;
	-ms-grid-column-span: 12;
	grid-column: 1 / span 12;
	margin-bottom: 2em;
	height: 1.431rem;
	text-align: center;
}
h3:not(:first-of-type) {
	margin-top: 2em;
}
button:hover {
	cursor: default;
}

.row>* {
	white-space: nowrap;
	overflow: hidden;
	-o-text-overflow: ellipsis;
		 text-overflow: ellipsis;
}
.row>.client {
	-ms-grid-column: 4;
	-ms-grid-column-span: 2;
	grid-column: 4 / span 2;
}
.row>.project {
	-ms-grid-column: 6;
	-ms-grid-column-span: 3;
	grid-column: 6 / span 3;
	width: 120%;
}
.row>.cta {
	-ms-grid-column: 9;
	-ms-grid-column-span: 1;
	grid-column: 9 / span 1;
	text-align: right;
}
.preview, .target {
	position: fixed;
	width: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*3 + var(--gutter)*2);
	top: calc(13em + 3.431em);
	right: var(--margin);
	height: auto;
	overflow: visible;
	-ms-grid-column: 10;
	-ms-grid-column-span: 3;
	grid-column: 10 / span 3;
	-ms-grid-row: 2;
	grid-row: 2;
	z-index: 1;
}
.target {
	visibility: hidden;
}
@media screen and (max-width: 900px) {
	.row>.client {
		-ms-grid-column: 1;
		-ms-grid-column-span: 2;
		grid-column: 1 / span 2;
	}
	.row>.project {
		-ms-grid-column: 3;
		-ms-grid-column-span: 4;
		grid-column: 3 / span 4;
		position: relative;
		width: 135%;
	}
	.row>.cta {
		-ms-grid-column: 7;
		-ms-grid-column-span: 2;
		grid-column: 7 / span 2;
	}
	.preview, .target {
		-ms-grid-column: 9;
		-ms-grid-column-span: 4;
		grid-column: 9 / span 4;
		width: calc((100% - var(--margin)*2 - var(--gutter)*11)/12*4 + var(--gutter)*3);
		top: unset;
	}
}
@media screen and (max-width: 700px) {
	.mobileActive {
		color: var(--hoverColor);
		mix-blend-mode: normal;
	}
	#archive {
		padding: 37vw var(--margin) 45vw;
	}
	.row {
		-ms-grid-columns: (1fr)[8];
		grid-template-columns: repeat(8, 1fr);
		z-index: 2;
	}
	.row:nth-child(1) {
		margin-top: calc(var(--margin)*2);
	}
	.row>.client {
		-ms-grid-column: 1;
		-ms-grid-column-span: 3;
		grid-column: 1 / span 3;
	}
	.row>.project {
		-ms-grid-column: 4;
		-ms-grid-column-span: 3;
		grid-column: 4 / span 3;
		position: relative;
	}
	.row>.cta {
		-ms-grid-column: 8;
		-ms-grid-column-span: 1;
		grid-column: 8 / span 1;
	}
	.preview, .target {
		width: calc((100% - var(--margin)*2 - var(--gutter)*7)/8*4 + var(--gutter)*3);
		-ms-grid-column: 4;
		-ms-grid-column-span: 4;
		grid-column: 4 / span 4;
		bottom: var(--margin);
	}
}
@media screen and (max-width: 500px) {
	.row>.client {
		-ms-grid-column: 1;
		-ms-grid-column-span: 2;
		grid-column: 1 / span 2;
	}
	.row>.project {
		-ms-grid-column: 3;
		-ms-grid-column-span: 3;
		grid-column: 3 / span 3;
		position: relative;
		width: 170%;
	}
	.row>.cta {
		-ms-grid-column: 7;
		-ms-grid-column-span: 2;
		grid-column: 7 / span 2;
	}
	.preview, .target {
		-ms-grid-column: 3;
		-ms-grid-column-span: 5;
		grid-column: 3 / span 5;
	}
}
</style>