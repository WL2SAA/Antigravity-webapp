# Google Antigravity - Interactive Visuals, Particle Systems & Cursor Effects

> **Location in Project:** Extracted from `https://antigravity.google`  
> **Target Document:** `D:\Xcode\orb_interactive_particles.md`  
> **Master File Index:** [`D:/Xcode/info.md`](file:///D:/Xcode/info.md)  
> **Primary Technologies:** Three.js / WebGL, Custom GLSL Shaders, GPGPU Ping-Pong Buffers, Web Workers, Poisson Disk Sampling, GSAP 3 (ScrollTrigger, Draggable, SplitText, quickTo)

---

## Overview

The Google Antigravity website features a rich collection of **reactive visual effects, 3D WebGL particle systems, cursor-following dynamics, and kinetic typography**. These components are distributed across the landing page and product showcases to create an immersive, futuristic "agent-first" experience.

This document provides a comprehensive technical catalog of **every interactive visual and cursor effect** implemented across the platform.

```
+---------------------------------------------------------------------------------------------+
|                                    PAGE VISUAL ARCHITECTURE                                 |
|                                                                                             |
|  [01. MainParticlesComponent (Hero Orb)]       -> 3D particle ring following cursor         |
|  [02. TypedHeader (Typewriter Cursor)]         -> Blinking cursor image tracking characters |
|  [03. CustomCursor (Magnetic Video Badge)]     -> GSAP quickTo pill following pointer       |
|  [04. AgentFirst (Floating Bouncer Badges)]    -> Scroll-driven dispersed developer icons   |
|  [05. Slider (Inertia Draggable Cards)]        -> Physics-based momentum swipe & snap       |
|  [06. MorphingParticlesComponent (Mesh Icons)] -> WebGL particles morphing to 3D icons      |
|  [07. MainParticlesComponent (Dark Orb)]       -> Deep indigo particle orb in Download card|
|  [08. AntigravityFooter (Zero-G Wordmark)]     -> Brand letters floating into anti-gravity  |
|  [09. AgyVcsReview & SimGenMedia]              -> Interactive git and simulation players    |
+---------------------------------------------------------------------------------------------+
```

---

## 1. Hero Particle Orb (`MainParticlesComponent` - Light Theme)

### What It Is
The primary visual element behind the homepage hero title ("Experience liftoff with the next-gen agent platform"). An interactive, breathing 3D particle orb and ring that magnetically tracks the user's cursor across the viewport.

- **DOM Hook in `index.html`:** Line 34
- **Element:** `<div class="main-particles-component-section" data-main-particles-component>`
- **Source Script:** [`_astro/MainParticlesComponent.astro_astro_type_script_index_0_lang.ZV8AJEPG.js`](file:///D:/Xcode/antigravity.google/_astro/MainParticlesComponent.astro_astro_type_script_index_0_lang.ZV8AJEPG.js)
- **Math / Physics:** 
  - **Poisson Disk Sampling:** Even distribution of hundreds of base coordinates using a multi-dimensional spatial grid.
  - **GPGPU Ping-Pong Simulation:** Two floating-point framebuffers (`rt1`, `rt2`) swap positions every frame to preserve momentum and velocity without CPU-GPU transfer bottlenecks.
  - **3D Raycaster:** Casts a ray from the camera onto a virtual 12.5 × 12.5 unit plane to convert 2D mouse pixels into 3D world coordinates.
  - **Spring Damping:** Orb target position (`ringPos`) springs towards the cursor with an easing coefficient of `0.02`.
  - **Autonomous Harmonic Breathing:** Uses sine and cosine wave superposition to breathe even when the cursor is idle:
    ```javascript
    uRingRadius = 0.175 + Math.sin(time * 1.0) * 0.03 + Math.cos(time * 3.0) * 0.02;
    ```
- **Color Palette (Light Theme):**
  - Outer Halo: `#2c64ed` (Royal Blue)
  - Mid Ring: `#f84242` (Coral Red)
  - Inner Core: `#ffcf03` (Amber Yellow)

---

## 2. Download Backdrop Particle Orb (`MainParticlesComponent` - Dark Theme)

### What It Is
Located in the footer download card (`#download-section`), this is the **cosmic dark-mode sibling** of the hero orb. It renders inside a deep charcoal backdrop container, pulling particles into a denser, higher-contrast zero-gravity cluster around your pointer.

- **DOM Hook in `index.html`:** Line 220
- **Element:**
  ```html
  <div class="download-section-backdrop">
    <div class="main-particles-component-section" 
         data-main-particles-component 
         data-theme="dark" 
         data-ring-width="0.15" 
         data-ring-width2="0.05" 
         data-ring-displacement="0.23" 
         data-density="220" 
         data-particles-scale="0.65">
      <div class="main-particles-container" data-container></div>
    </div>
  </div>
  ```
- **Key Differences from Hero Orb:**
  - **`data-theme="dark"`:** Switches shader uniforms to deep luminous blues:
    - `uColor1`: `#7189ff` (Electric Soft Indigo)
    - `uColor2`: `#3074f9` (Gemini Deep Blue)
    - `uColor3`: `#000000` (Negative Space Void)
  - **`data-ring-width="0.15"`**: 25× thicker ring boundary for a solid nebula look.
  - **`data-ring-displacement="0.23"`**: Smoother, broader gravitational suction field.

---

## 3. Morphing Particle Icon Meshes (`MorphingParticlesComponent`)

### What It Is
Located in the **Try Solutions** section (`data-try-solutions-section`), this component displays ambient clouds of glowing particles that **morph into 3D recognizable icons** when the user hovers over solution cards.

- **DOM Hook in `index.html`:** Lines 220–221
- **Element:**
  - **Card 1 ("For developers"):**
    ```html
    <div data-morphing-particles-component
         data-theme="light"
         data-density="50"
         data-particles-scale="0.6"
         data-camera-zoom="8.8"
         data-textures='["/assets/textures/icons/individual.png"]'
         data-color1="#676A72" data-color2="#FF4641" data-color3="#346BF1">
    ```
    *Morphs into a developer silhouette.*
  - **Card 2 ("For organizations"):**
    ```html
    <div data-morphing-particles-component
         data-theme="light"
         data-density="50"
         data-particles-scale="0.6"
         data-camera-zoom="8.8"
         data-textures='["/assets/textures/icons/cube.png"]'
         data-color1="#676A72" data-color2="#FF4641" data-color3="#346BF1">
    ```
    *Morphs into an enterprise isometric cube.*
- **Source Script:** [`_astro/MorphingParticlesComponent.astro_astro_type_script_index_0_lang.CitabInM.js`](file:///D:/Xcode/antigravity.google/_astro/MorphingParticlesComponent.astro_astro_type_script_index_0_lang.CitabInM.js)
- **Technical Architecture:**
  - **Web Worker Analysis:** An in-memory Web Worker (`createPointsDistanceDataWorker`) loads the 2D PNG icon mask, calculates pixel luminance, and computes nearest-neighbor destination coordinates for all base particles in parallel off the main thread.
  - **Hover Trigger (`data-hover-trigger`):**
    - `mouseenter`: Animates `hoverProgress` to 1.0 (morphing into target shape) and dispatches a 2-second outward shockwave ring (`pushProgress: 0 -> 1`).
    - `mouseleave`: Reverts `hoverProgress` to 0.0 with `power3.out`, returning particles into an ambient drifting field.

---

## 4. Magnetic Custom Cursor (`CustomCursor`)

### What It Is
An interactive pointer follower that replaces the standard operating system arrow with a **floating, magnetic pill badge** when hovering over interactive media containers.

- **DOM Hook in `index.html`:** Lines 127 and 220
- **Instances on Page:**
  1. **Hero Video Preview:** Shows a pill containing a play icon and text: `[ ▶ Play intro ]`.
  2. **Use-Case Carousel Slides:** Shows a pill: `[ ▶ Watch case ]` for Fullstack, Enterprise, and Frontend stories.
- **Source Script:** [`_astro/CustomCursor.astro_astro_type_script_index_0_lang.CPzCIKxN.js`](file:///D:/Xcode/antigravity.google/_astro/CustomCursor.astro_astro_type_script_index_0_lang.CPzCIKxN.js)
- **Technical Mechanics:**
  - Uses GSAP `quickTo()` with `power2.out` easing to achieve 60fps tracking without triggering layout reflows (`getBoundingClientRect`).
  - Scales up with an elastic overshoot on entrance:
    ```javascript
    gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
    ```
  - Hides the native cursor (`parentElement.style.cursor = 'none'`) while clamping within the container's perimeter.

---

## 5. Agent-First Kinetic Bouncing Badges (`AgentFirst`)

### What It Is
Inside `<section class="agent-first-section" data-agent-first-section>`, a grid of **22 developer tool symbol badges** floats across the screen. As the user scrolls, they disperse and re-align in a kinetic floating dance.

- **DOM Hook in `index.html`:** Line 127
- **Elements:** `<li data-bouncer><div class="bouncer symbol">...</div></li>`
- **Symbols Displayed:**
  - `terminal`, `code_blocks`, `merge`, `commit`, `deployed_code`, `device_hub`, `search_spark`, `spark`, `keyboard_tab`, `keyboard_command_key`, `refresh`, `folder`, `check_circle`, `data_object`, etc.
- **Source Script:** [`_astro/AgentFirst.astro_astro_type_script_index_0_lang.UoJ_qKTy.js`](file:///D:/Xcode/antigravity.google/_astro/AgentFirst.astro_astro_type_script_index_0_lang.UoJ_qKTy.js)
- **Physics Mechanism:**
  - Bound to GSAP `ScrollTrigger` with `scrub: 1`.
  - Calculates staggered vertical displacement vectors based on index:
    ```javascript
    let randomY = (index % 2 === 0 ? -1 : 1) * (30 + index * 10);
    timeline.from(item, { y: randomY, opacity: 0.2, ease: "power1.out" }, 0);
    ```

---

## 6. Typewriter Effect with Dynamic Blinking Cursor (`TypedHeader`)

### What It Is
Appears across all major section headers, simulating live typing into a code terminal. A distinct visual feature is the **blinking purple terminal cursor image** that physically travels along the text as each letter appears.

- **DOM Hook in `index.html`:** Lines 34, 127, 220
- **Cursor Image:** `/assets/image/antigravity-cursor.png`
- **Source Script:** [`_astro/TypedHeader.astro_astro_type_script_index_0_lang.CVh8pq8w.js`](file:///D:/Xcode/antigravity.google/_astro/TypedHeader.astro_astro_type_script_index_0_lang.CVh8pq8w.js)
- **Technical Implementation:**
  - Uses GSAP `SplitText` to wrap every letter in a span.
  - On each character reveal tick, reads the target letter's `offsetLeft` and `offsetTop` plus character width, updating CSS variables in real time:
    ```javascript
    cursorContainer.style.setProperty("--cursor-pos-x", `${x}px`);
    cursorContainer.style.setProperty("--cursor-pos-y", `${y}px`);
    ```
  - Includes a window resize observer that realigns the blinking cursor if the browser viewport changes dimensions.

---

## 7. Interactive Momentum Carousel (`Slider` / `Draggable`)

### What It Is
Powers the horizontal card sliders for both the **Use Cases** section and the **Latest Blogs** section.

- **DOM Hook in `index.html`:** Line 220
- **Source Script:** [`_astro/Slider.astro_astro_type_script_index_0_lang.uOpsnXI6.js`](file:///D:/Xcode/antigravity.google/_astro/Slider.astro_astro_type_script_index_0_lang.uOpsnXI6.js)
- **Physics Engine:**
  - Powered by **GSAP Draggable** with inertia physics (`resistance: 100`).
  - Supports swipe velocity, overshoot tolerance (`0.2`), and boundary calculation.
  - Snaps to discrete slide indices with a smooth cubic deceleration curve (`power3.out`).

---

## 8. Kinetic Zero-Gravity Footer Letters (`AntigravityFooter`)

### What It Is
At the very bottom of the page in `<footer class="footer">`, the giant SVG wordmark **"ANTIGRAVITY"** features a literal zero-gravity visual pun.

- **DOM Hook in `index.html`:** Line 220
- **Element:** `<div id="antigravity-footer-wrapper" data-antigravity-footer-wrapper>`
- **Source Script:** [`_astro/AntigravityFooter.astro_astro_type_script_index_0_lang.CdFtjRvA.js`](file:///D:/Xcode/antigravity.google/_astro/AntigravityFooter.astro_astro_type_script_index_0_lang.CdFtjRvA.js)
- **Visual Effect:**
  - Targets letter paths `[data-letter-y]` and `[data-letter-t]`.
  - As the user scrolls into the footer, a `ScrollTrigger` scrubs both letters **upward by -60 pixels**, making the letters literally float into the air as if escaping gravity!

---

## 9. Interactive Version Control & Diff Review Simulator (`AgyVcsReview`)

### What It Is
An interactive simulator embedded on the Version Control and terminal blog posts and documentation pages (`/blog/vcs-and-terminal/`).

- **Source Script:** `_astro/AgyVcsReview.astro_astro_type_script_index_0_lang.Bl6BcE8l.js`
- **Visual Effect:**
  - Renders a multi-branch Git timeline with interactive node selection, commit inspection, and line-by-line diff expansion.

---

## 10. Generative Simulation Media Player (`SimGenMedia`)

### What It Is
A simulation player module utilized across Antigravity product demo pages (`/product/`).

- **Source Script:** `_astro/SimGenMedia.astro_astro_type_script_index_0_lang.Bez1x2tV.js`
- **Visual Effect:**
  - Interactive scrubbing timeline with real-time waveform / state rendering and synchronized video playback.

---

## Complete Interactive Component Matrix

| Component | Target DOM Hook | Core Visual Effect | Primary Technology |
| :--- | :--- | :--- | :--- |
| **Hero Orb** | `[data-main-particles-component]` (light) | 3D particle ring following cursor with spring damping | Three.js, GPGPU, GLSL shaders |
| **Dark Orb** | `[data-main-particles-component]` (dark) | Cosmic indigo particle nebula in download backdrop | Three.js, GPGPU, GLSL shaders |
| **Morphing Particles** | `[data-morphing-particles-component]` | Particles morphing into 3D developer & cube icons | Web Workers, Poisson Sampling, Three.js |
| **Custom Cursor** | `[data-custom-cursor-wrapper]` | Floating magnetic pill cursor following pointer | GSAP `quickTo()`, Bounding Rect |
| **Agent-First Bouncers**| `[data-bouncer-list]` | 22 floating IDE badges dispersing on scroll | GSAP ScrollTrigger |
| **Typed Header** | `[data-typed-header]` | Terminal typewriter text with traveling cursor image | GSAP SplitText, CSS Variables |
| **Inertia Slider** | `[data-slider]` | Momentum drag, inertia flick, and card snap | GSAP Draggable |
| **Zero-G Footer** | `[data-antigravity-footer-wrapper]` | Brand letters 'Y' and 'T' floating upward | GSAP ScrollTrigger |
| **VCS Diff Review** | `AgyVcsReview` | Interactive git branch and diff simulator | Canvas / DOM SVG |
| **SimGen Media** | `SimGenMedia` | Generative simulation audio & scrubber viewer | Web Media API |

---

## Secret Debug GUI Instructions

Both particle systems (`MainParticlesComponent` and `MorphingParticlesComponent`) have hidden live-tuner GUIs built into them!

### How to access:
1. Start your local server (`python -m http.server 3000 -d "D:\Xcode\antigravity.google"`).
2. Open: **`http://localhost:3000/?gui=true`**
3. A floating **`dat.GUI`** window will appear at the top-right corner of the screen, allowing you to tweak:
   - **Color 1, 2, 3**: Live RGB/Hex color pickers.
   - **Ring Width & Ring Width 2**: Thickness and halo diffusion.
   - **Displacement**: Suction gravity strength.
   - **Density**: Number of particles generated in the Poisson disk grid.
   - **Particles Scale**: Point size of each particle.
