# Google Antigravity - Website Mirror & Architecture Study

> **⚠️ RESEARCH & EDUCATIONAL NOTICE**  
> *This repository is an offline technical archive, architectural teardown, and reverse-engineering study of [Google Antigravity](https://antigravity.google). It is created strictly for non-commercial educational and design research under Fair Use (17 U.S.C. § 107). This repository is NOT affiliated with, sponsored by, or endorsed by Google LLC or Alphabet Inc. All trademarks and brand assets belong to Google LLC.*  
> 👉 See [**`DISCLAIMER.md`**](file:///D:/Xcode/DISCLAIMER.md) and [**`LICENSE`**](file:///D:/Xcode/LICENSE) for complete legal details.

---

## 🚀 Quickstart: Running the Local Server

Because the website utilizes root-relative paths (`/_astro/...` and `/assets/...`) and strict ES module MIME types, running a standard web server out of parent folders often results in missing styles, 404s, or MIME-type blocking on Windows.

We have included a custom zero-dependency Python server script (`serve.py`) that resolves all paths and MIME types automatically.

### 1. Start the Server
Run the following command from your terminal:
```bash
python serve.py
```

### 2. View in Browser
The server will automatically launch your default browser at:
👉 **`http://localhost:3000/`**

### 3. Secret Debug GUI Mode
Both 3D particle systems on the site feature a hidden developer control panel (`dat.GUI`). To access it live in your browser, open:
👉 **`http://localhost:3000/?gui=true`**

---

## 🛠️ Why `serve.py` is Necessary

Standard simple HTTP servers (like `python -m http.server`) often fail when serving extracted production websites because:

| Problem with Default Server | How `serve.py` Solves It |
| :--- | :--- |
| **Path Mismatch:** The HTML requests `/_astro/BaseLayout.css`. In a parent directory, this maps to `D:\_astro\...` (404 Not Found). | Automatically maps root-relative `/` requests directly to `antigravity.google/` regardless of where the script was launched. |
| **Windows MIME Type Glitch:** Windows registries often serve `.js` as `text/plain` or `.wasm` incorrectly, causing browsers to block scripts (`strict MIME type checking`). | Explicitly registers compliant MIME types (`application/javascript`, `text/css`, `image/svg+xml`, etc.). |
| **Clean URLs:** Routes like `/docs/overview` lack extensions and fail on basic file servers. | Translates clean folder routes to their corresponding `/index.html` file seamlessly. |
| **Video Streaming:** Embedded MP4 demo videos require byte-range requests for seeking. | Implements standard HTTP response headers for video streaming and caching. |

---

## 🌟 Interactive Visuals, Particle Systems & Cursor Effects

The site features an array of 10 distinct interactive visual effects and physics simulations:

### 1. The Hero Particle Orb (`MainParticlesComponent` - Light Theme)
- **Location:** Hero section behind the main headline (`index.html` Line 34).
- **Technology:** WebGL GPGPU ping-pong simulation using Three.js and custom GLSL vertex/fragment shaders.
- **Behavior:** 
  - Generates hundreds of micro-particles using **Poisson Disk Sampling**.
  - Uses a **3D Raycaster** to project mouse coordinates onto a virtual plane.
  - Smoothly springs towards the cursor (`0.02` easing) while maintaining continuous harmonic breathing (`uRingRadius = 0.175 + sin(t)*0.03 + cos(3t)*0.02`).
  - Google brand chromatic gradient: `#2c64ed` (Blue), `#f84242` (Red), `#ffcf03` (Yellow).

### 2. The Download Backdrop Dark Orb (`MainParticlesComponent` - Dark Theme)
- **Location:** Inside `#download-section` backdrop (`index.html` Line 220).
- **Behavior:** Cosmic indigo variation (`#7189ff`, `#3074f9`, `#000000`) with 25× thicker ring width (`0.15`) and higher displacement suction (`0.23`) creating a deep space nebula effect.

### 3. Morphing Particle Icon Meshes (`MorphingParticlesComponent`)
- **Location:** "Try Solutions" section (`data-try-solutions-section`).
- **Behavior:**
  - Employs dedicated **Web Workers** (`createPointsDistanceDataWorker`) to sample 2D icon textures off the main thread.
  - **Card 1 ("For developers"):** Morphs ambient particles into a developer silhouette (`individual.png`).
  - **Card 2 ("For organizations"):** Morphs particles into an isometric enterprise cube (`cube.png`).
  - Triggers an outward shockwave ring on hover (`pushProgress: 0 -> 1` over 2 seconds) and smoothly disperses back on mouse leave.

### 4. Magnetic Play Cursor Badge (`CustomCursor`)
- **Location:** Hero intro video and Use-Case carousel slides.
- **Behavior:** Replaces the OS mouse pointer with an elastic pill badge (`[ ▶ Play intro ]` and `[ ▶ Watch case ]`) that snaps to pointer position at 60fps using GSAP `quickTo()`.

### 5. Agent-First Bouncing Badges (`AgentFirst`)
- **Location:** Agent-first section (`data-agent-first-section`).
- **Behavior:** 22 developer symbol badges (`terminal`, `code_blocks`, `merge`, `deployed_code`, `spark`, etc.) that disperse and re-align along the scroll path using GSAP `ScrollTrigger`.

### 6. Terminal Typewriter with Traveling Cursor (`TypedHeader`)
- **Location:** All section headers.
- **Behavior:** Uses `SplitText` character sequencing while dynamically updating CSS variables `--cursor-pos-x` and `--cursor-pos-y` to move an authentic blinking terminal cursor image (`antigravity-cursor.png`) along the text.

### 7. Momentum Inertia Draggable Slider (`Slider`)
- **Location:** Use Cases and Latest Blogs carousel tracks.
- **Behavior:** Built on GSAP `Draggable` with inertia momentum, boundary limits, and cubic snap physics.

### 8. Kinetic Zero-Gravity Footer Wordmark (`AntigravityFooter`)
- **Location:** Page footer SVG.
- **Behavior:** Letters **"Y"** and **"T"** detach from the wordmark and float **60px upward** into the air as you scroll into view.

> 📖 **Deep Technical Dive:** See [`D:/Xcode/orb_interactive_particles.md`](file:///D:/Xcode/orb_interactive_particles.md) for full shader math, GLSL source code, and parameter tables.

---

## 📁 Repository Structure

```
D:\Xcode
├── README.md                    # Master documentation and local setup guide
├── info.md                      # Comprehensive file-by-file catalog & function reference
├── orb_interactive_particles.md # Dedicated technical breakdown of all 10 visual & particle effects
├── serve.py                     # Custom local HTTP server script with automatic path/MIME routing
│
└── antigravity.google/          # Complete extracted website (402 files)
    ├── index.html               # Main landing page
    ├── robots.txt               # Crawler directives
    ├── sitemap.xml              # Sitemap index redirect
    ├── sitemap-0.xml            # Full 136-page URL index
    │
    ├── _astro/                  # Compiled Astro & Starlight bundles
    │   ├── *.js                 # 30 Client-side modules with extensive JSDoc function comments
    │   ├── *.css                # 22 Responsive stylesheets and typography variables
    │   ├── *.svg                # Vector brand assets and icons
    │   └── *.ttf                # Google Sans Flex variable font
    │
    ├── assets/                  # Media assets
    │   ├── image/               # Screenshots, feature diagrams, sitecards, demo GIFs
    │   └── video/               # MP4 video recordings (hero_video.mp4, editor.mp4, etc.)
    │
    ├── docs/                    # Complete technical documentation (35+ directories)
    │   ├── overview/, getting-started/, cli/, ide/, sdk/, subagents/, mcp/, skills/, teamwork/ ...
    │
    ├── blog/                    # Complete engineering blog (20+ articles & rss.xml)
    ├── product/                 # Dedicated landing pages (antigravity-2, cli, ide, sdk)
    ├── download/                # Distribution pages (macOS, Windows, Linux)
    ├── pricing/, changelog/, use-cases/, terms/, support/
```

---

## 📚 Technical Reference Documents

- **[Master System Architecture & File Catalog (`info.md`)](file:///D:/Xcode/info.md)**: Exhaustive breakdown of all 402 files, routes, Astro layouts, and function signatures.
- **[Interactive Visuals & Particle Systems Guide (`orb_interactive_particles.md`)](file:///D:/Xcode/orb_interactive_particles.md)**: Deep dive into GLSL shaders, raycasting math, Poisson Disk Sampling, and custom cursor followers.
- **[Local Server Script (`serve.py`)](file:///D:/Xcode/serve.py)**: Ready-to-run zero-dependency local preview server.
