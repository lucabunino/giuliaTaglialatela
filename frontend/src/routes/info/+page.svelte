<script>
import Pixi from '$lib/components/Pixi.svelte'
import { fade } from "svelte/transition";
import { urlFor } from '$lib/utils/image';
import { div } from 'three/tsl';
let { data } = $props()

let indexPortrait = $state(0)
let aboutImage = $derived(data.info.aboutImages?.[indexPortrait])

let innerWidth = $state()
let canvasWidth = $state(500)
let canvasHeight = $state(625)
let hoverImg = $state(false)

let mouse = $state({})
function handleMousemove(event) {	
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}
</script>

<svelte:window bind:innerWidth></svelte:window>

<svelte:head>
{#if data.seo[0].SEOTitle}<title>{data.seo[0].SEOTitle} | Info</title>{/if}
</svelte:head>

<section id="info">
	<p>{data.info.content}</p>
	<ul>
		<li>{data.info.title}</li>
		<li>{data.info.scope}</li>
		<li><a href="mailto:{data.info.email}">{data.info.email}</a></li>
		<li><a href="tel:{data.info.phone.replace(/[^\d+]/g, '')}">{data.info.phone}</a></li>
	</ul>
	<!-- <img alt="About image of Giulia Taglialatela"
	onclick={() => {
		if (data.info.aboutImages?.length - 1 > indexPortrait) {
			indexPortrait++
		} else {
			indexPortrait = 0
		}
	}}
	srcset="
		{urlFor(aboutImage).width(600)} 400w,
		{urlFor(aboutImage).width(800)} 800w,
		{urlFor(aboutImage).width(1000)} 1200w,
		{urlFor(aboutImage).width(1200)} 1400w
	"
	sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 700px"
	src={urlFor(aboutImage).width(1000)}
	> -->
	{#if aboutImage}
		<div class="image-wrapper"
		onclick={() => {
		if (data.info.aboutImages?.length - 1 > indexPortrait) {
				indexPortrait++
			} else {
				indexPortrait = 0
			}
		}}
		>
			<img class="target" src={urlFor(aboutImage).width(1080)} alt={aboutImage.asset.altText} bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight} >
			<div class="image"
			onmouseenter={() => {hoverImg = true}}
			onmouseleave={() => {hoverImg = false}}
			onmousemove={(e) => {handleMousemove(e)}}
			>
			{#key aboutImage}
				{#if innerWidth > 700}
					{#if hoverImg}
						<div
						class="preview"
						>
							<div
							in:fade|global={{ duration: 100, delay: 0 }}
							out:fade|global={{ duration: 100, delay: 0 }}
							>
								<Pixi displaceImages={data.displaceImages} preview={aboutImage} singlePaged={false} canvasWidth={canvasWidth} canvasHeight={canvasHeight} fitCover={true}/>
							</div>
						</div>
					{:else}
						<img
						in:fade|global={{ duration: 0, delay: 0 }}
						out:fade|global={{ duration: 100, delay: 200 }}
						class="still" src={urlFor(aboutImage).width(1080)} alt={aboutImage.asset.altText} bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight} >
					{/if}
				{:else}
					<div class="preview"
					in:fade|global={{ duration: 100, delay: 100 }}
					out:fade|global={{ duration: 100, delay: 100 }}
					>
						<Pixi displaceImages={data.displaceImages} preview={aboutImage} singlePaged={true} canvasWidth={canvasWidth} canvasHeight={canvasHeight} fitCover={true}/>
					</div>
				{/if}
			{/key}
			</div>
			<span class="counter honeymoon-120"
			style="left: {mouse.x}px;top: {mouse.y}px;"
			>{indexPortrait+1}/{data.info.aboutImages?.length}</span>
		</div>
	{/if}
</section>

<style>
#info {
	padding: 11em var(--margin) 2em;
	display: -ms-grid;
	display: grid;
	-ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr;
	grid-template-columns: repeat(12, 1fr);
	-webkit-column-gap: var(--gutter);
		-moz-column-gap: var(--gutter);
			column-gap: var(--gutter);
	row-gap: -moz-calc(var(--gutter)/2);
	row-gap: calc(var(--gutter)/2);
}
p {
	-ms-grid-column: 1;
	-ms-grid-column-span: 8;
	grid-column: 1 / span 8;
}
ul {
	-ms-grid-column: 1;
	-ms-grid-column-span: 8;
	grid-column: 1 / span 8;
}
.image-wrapper {
	aspect-ratio: .8;
	width: -moz-calc(((100% - var(--margin)*2 - var(--gutter)*11)/12) * 4 + var(--gutter)*3);
	width: calc(((100% - var(--margin)*2 - var(--gutter)*11)/12) * 4 + var(--gutter)*3);
	position: absolute;
	bottom: var(--margin);
	right: var(--margin);
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	   -moz-box-align: center;
	    -ms-flex-align: center;
	        align-items: center;
}
.preview, .target {
	width: 100%;
	height: 100%;
	-o-object-fit: cover;
	   object-fit: cover;
	cursor: pointer;
	position: absolute;
}
.target {
	visibility: hidden;
	opacity: 0;
}
.image {
	width: 100%;
	height: 100%;
}
.still {
	position: absolute;
	z-index: -1;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.counter {
	position: fixed;
	z-index: 2;
	pointer-events: none;
	opacity: 0;
	transform: translateX(-130%) translateY(-50%);
}
.image-wrapper:hover .counter {
	opacity: 1;
}
@media screen and (max-width: 1100px) {
p {
	-ms-grid-column: 1;
	-ms-grid-column-span: 8;
	grid-column: 1 / span 8;
}
ul {
	-ms-grid-column: 1;
	-ms-grid-column-span: 8;
	grid-column: 1 / span 8;
	margin-top: 1rem;
}
}

@media screen and (max-width: 700px) {
#info {
	padding: 37vw var(--margin) 15vw;
}
p {
	-ms-grid-column: 1;
	-ms-grid-column-span: 12;
	grid-column: 1 / span 12;
}
.image-wrapper {
	aspect-ratio: .8;
	position: relative;
	-ms-grid-column: 1;
	-ms-grid-column-span: 12;
	grid-column: 1 / span 12;
	width: 100%;
	bottom: unset;
	right: unset;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	   -moz-box-align: center;
	    -ms-flex-align: center;
	        align-items: center;
	margin-top: 2rem;
}
.preview, .target {
	width: 100%;
	height: 100%;
	-o-object-fit: cover;
	   object-fit: cover;
	cursor: pointer;
	position: absolute;
	border: solid 1px red;
}
.still {
	display: none;
}
.counter {
	position: absolute;
	top: -.5em !important;
	left: unset !important;
	right: 0;
	opacity: 1;
	transform: none;
}
}
</style>