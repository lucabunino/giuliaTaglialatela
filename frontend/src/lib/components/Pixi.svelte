<script>
  import { urlFor } from '$lib/utils/image.js';
  import { Application, Assets, Sprite, DisplacementFilter, WRAP_MODES } from 'pixi.js';

  let res = 2
  let domLoaded = $state(false)
  let domVisible = $state(false)
  let pixi = $state(false);
  let app = $state();
  let canvas = $state();
  let { displaceImages, projectHover, canvasWidth, canvasHeight } = $props();
  let singlePaged = projectHover.singlePaged;
  let previewUrl = urlFor(projectHover.preview.asset).width(720*res).url();  
  let randomIndex = Math.floor(Math.random() * displaceImages.displaceImages.length);
  let displaceUrl = urlFor(displaceImages.displaceImages[randomIndex].asset).width(1080).url();
  let innerWidth = $state();
  let innerHeight = $state();
  let resized = $state(false);
  
  async function renderPixi() {
    app = new Application();
    await app.init({ background: '#fff', width: canvasWidth*res, height: Math.round(canvasWidth*res/projectHover.preview.asset.metadata.dimensions.aspectRatio), resolution: res, antialias:  true});
  
    if (canvas) {
      canvas.appendChild(app.canvas);
    }
  
    // Load the main image as a Sprite
    const texture = await Assets.load(previewUrl);
    let mainSprite = new Sprite(texture);
    mainSprite.anchor.set(0.5);
    if (app.stage && mainSprite) {
      app.stage.addChild(mainSprite);
    }
  
    // Load displacement texture
    let displacementSprite = new Sprite(await Assets.load(displaceUrl));
    displacementSprite.texture.source.addressMode = 'mirror-repeat';
    displacementSprite.scale.set(.9*(.5 + Math.random()));
  
    const displacementFilter = new DisplacementFilter(displacementSprite);
    displacementFilter.autoFit = true;

    resizeSprite();


    mainSprite.filters = [displacementFilter];
    if (app.stage && displacementSprite) {
      app.stage.addChild(displacementSprite);
    }
  
    let count = 0;
    let maxIntensity = 200 * (.5 + Math.random());
    let frameCount = 0;
    let randomFactor = 3*(-.5 + Math.random())
  
    let startTime = performance.now();
    let targetDuration = .5; // Target duration in seconds

    function animate() {
      let currentTime = performance.now();
      let elapsedTime = (currentTime - startTime) / 1000; // Elapsed time in seconds
      if (singlePaged) {
        // Calculate the progress based on the elapsed time
        let progress = Math.min(elapsedTime / targetDuration, 1); // Ensure progress doesn't exceed 1
        // Adjust displacement based on progress
        let displacementAmount = maxIntensity * (1 - progress) + (0.8 + Math.random() * 0.4);
        displacementSprite.x = displacementAmount * randomFactor;
        displacementSprite.y = displacementAmount * randomFactor;
        displacementFilter.scale.set(displacementAmount); 
        // Continue the animation until it's finished
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      } else {
        // Adjust displacement based on progress
        let displacementAmount = maxIntensity + (0.8 + Math.random() * 0.4);
        displacementSprite.x -= 2 * randomFactor;
        displacementSprite.y -= 2 * randomFactor;
        displacementFilter.scale.set(displacementAmount);
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);

    function resizeSprite() {
      if (app.stage && mainSprite) {
        // Update Pixi canvas size dynamically
        app.renderer.resize(canvasWidth * res, canvasHeight * res);

        // Calculate correct scale
        const scaleX = (canvasWidth * res) / texture.width + 0.01;
        const scaleY = (canvasHeight * res) / texture.height + 0.01;
        const scale = Math.min(scaleX, scaleY);

        mainSprite.scale.set(scale);
        mainSprite.x = (canvasWidth * res) / 2;
        mainSprite.y = (canvasHeight * res) / 2;
      }
    }
  }
  
  $effect(() => {
    setTimeout(() => {
      domLoaded = true
    }, 50);
    setTimeout(() => {
      domVisible = true
    }, 0);
    if (!pixi && domLoaded) {
      pixi = renderPixi();
    }
    return () => {
			if (pixi) {
        app.destroy(true);
      }
		};
  });
  </script>
  
  <svelte:window
    bind:innerWidth
    bind:innerHeight
    onresize={() => { resized = true }}
  ></svelte:window>
  
  <div
    id="canvas"
    bind:this={canvas}
    class:hidden={!domVisible}
    style="aspect-ratio: {projectHover.preview.asset.metadata.dimensions.aspectRatio};"
  ></div>
  
  <style>
  #canvas {
    width: 100%;
    height: auto;
    opacity: 1;
  }
  #canvas.hidden {
    opacity: 0;
  }
  </style>
  