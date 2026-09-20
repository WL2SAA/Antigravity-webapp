# Google Antigravity Website - Complete Architecture & File Reference

> **Project Source:** `https://antigravity.google`  
> **Extraction Location:** `D:\Xcode\antigravity.google`  
> **Total Files Extracted:** 402  
> **Total Directories:** 181  
> **Primary Technology Stack:** Astro v7.2.4, Starlight v0.41.7, GreenSock (GSAP 3), Pagefind Search, Google Cloud App Engine / Cloud CDN

---

## 1. Executive Architectural Overview

`antigravity.google` is the official public portal, documentation hub, and product showcase for **Google Antigravity**—Google's agentic AI software development platform. The web application is engineered as a high-performance static site using modern web standards, featuring:

1. **Astro v7.2.4 (Static Site Generation & Island Architecture):**
   - High-speed zero-JS baseline rendering with selective client hydration for interactive components (`client:load`, `client:idle`).
   - Route-based static generation producing clean directory-based URLs (`/docs/overview/`, `/blog/gemini-3-8-flash/`).
   - Integrated with **Astro Link Prefetching** (`page.Dwipeu-R.js`) for near-instant subpage navigation using intersection observers and pointer hover heuristics.

2. **Starlight v0.41.7 (Documentation Framework):**
   - Powers the `/docs/` technical documentation portal.
   - Built-in multi-level sidebar navigation, dynamic table of contents spier (`TableOfContents.astro`), mobile TOC accordion (`MobileTableOfContents.astro`), dark/light theme switching (`StarlightThemeProvider`), and responsive layout.
   - Client-side full-text search powered by **Pagefind** (`Search.astro`, `ui-core.BzPh4z-r.js`).

3. **GreenSock Animation Platform (GSAP 3) & Kinetic Effects:**
   - **GSAP Core (`gsap.DWxn8li7.js`):** High-framerate timeline orchestration for all interactive elements.
   - **ScrollTrigger (`ScrollTrigger.DBzICErp.js`):** Scroll-driven triggers, video auto-play on viewport entry, section scaling, and header appearance.
   - **ScrollSmoother (`SmoothScrollLayout.astro...js`):** Hardware-accelerated virtual smooth scrolling with touch normalization and velocity damping.
   - **SplitText (`SplitText.D2RYeBm1.js`):** Character-by-character and word-by-word staggered typography animations on headers and feature cards.
   - **Draggable (`Draggable.CK_AoxCI.js`):** Inertial dragging and snap physics on responsive carousel tracks (`Slider.astro`).
   - **GSAP `quickTo`:** High-performance 60fps cursor follower physics without layout thrashing.

4. **Interactive Particle Simulations:**
   - WebGL / HTML5 Canvas particle systems (`MorphingParticlesComponent.astro`, `MainParticlesComponent.astro`) that render reactive particle meshes reacting to pointer position and velocity.

5. **Design System & Typography:**
   - **Google Sans Flex:** Multi-axis variable font (`GoogleSansFlex-VariableFont_ROND_opsz_slnt_wdth_wght.CKtV24Ka.ttf`) enabling fine-grained weight, optical size, slant, and roundness adjustments.
   - **Google Sans Code:** Fixed-width font for code snippets and CLI terminal representations.
   - **Google Symbols:** Variable icon font for directional arrows, play buttons, and interface badges.
   - Dark-mode default color palette featuring deep carbon backgrounds (`#0e0e11`), neutral translucent overlays with `backdrop-filter: blur(16px)`, and Google brand accents.

---

## 2. Directory Hierarchy & Category Breakdown

```
D:\Xcodentigravity.google
├── index.html                   # Primary landing page
├── robots.txt                   # Web crawler directives & sitemap references
├── sitemap.xml                  # Main sitemap redirect
├── sitemap-index.xml            # Sitemap index linking sitemap-0.xml
├── sitemap-0.xml                # Comprehensive 136-page URL manifest
├── favicon.ico                  # Browser tab icon
├── apple-touch-icon.png         # iOS home screen web clip icon
├── apple-touch-icon-precomposed.png
│
├── _astro/                      # Compiled Astro bundles (Styles, Scripts, Fonts, SVGs)
│   ├── *.css                    # 22 Component and layout stylesheets
│   ├── *.js                     # 30 Client-side JavaScript modules & GSAP plugins
│   ├── *.svg                    # Vector brand marks & decorative vectors
│   └── *.ttf                    # Google Sans Flex variable font
│
├── assets/                      # Static media assets
│   ├── image/                   # Raster images, diagrams, GIF demos, sitecards
│   │   ├── blog/                # Blog post header cards & architecture diagrams
│   │   ├── brand/               # Official Antigravity lockups & wordmarks
│   │   ├── docs/                # Documentation screenshots (CLI, IDE, Workflows)
│   │   ├── product/             # Product feature showcases & skill cards
│   │   └── sitecards/           # Social media Open Graph (OG) share images
│   └── video/                   # High-definition MP4 UI screen recordings
│       ├── hero_video.mp4       # Main landing page hero video
│       └── product-page/        # Video clips of editor, flight tracker, and terminal
│
├── docs/                        # Complete technical documentation (35+ sections)
│   ├── overview/                # Antigravity 2.0 system overview
│   ├── getting-started/         # Quickstart guides and environment setup
│   ├── agent/                   # Agent core capabilities and configuration
│   ├── agent-settings/          # Autonomy levels, approvals, and permissions
│   ├── artifacts/               # Artifact system and design doc generation
│   ├── artifact-review/         # Reviewing and approving agent diffs
│   ├── boost/                   # Boost mode for complex research & multi-agent tasks
│   ├── build-with-google/       # Integrating with Google Cloud, BigQuery & Firebase
│   ├── cli/                     # Complete Antigravity CLI guide and command references
│   │   ├── commands/            # CLI subcommands: agents, codesearch, diff, permissions, etc.
│   │   ├── overview/, install/, tutorial/, reference/, troubleshooting/
│   │   └── vim-editor-mode/, modes/, prompting/, statusline/
│   ├── ide/                     # Antigravity IDE (modified VS Code) guides
│   │   ├── agent-side-panel/    # Dockable agent panel controls
│   │   ├── allowlist-denylist/  # Tool execution security boundaries
│   │   ├── browser/             # Integrated Chromium browser automation
│   │   ├── browser-recordings/  # Session video capture and visual verification
│   │   ├── extensions/          # Extension integration for VS Code, JetBrains, Xcode, Zed
│   │   ├── review-changes-editor/# Visual diff split-editor
│   │   └── tab/, workflows/
│   ├── sdk/                     # Antigravity Python/Node SDK developer guides
│   │   ├── overview/, lifecycle/, mcp/, personas/, policies/
│   │   └── structured-output/, subagents/, tools/
│   ├── enterprise/              # Gemini Enterprise security, SSO, and audit compliance
│   ├── faq/                     # Frequently asked questions
│   ├── features/                # Platform feature matrix
│   ├── hooks/                   # Pre-commit, post-execution, and lifecycle hooks
│   ├── mcp/                     # Model Context Protocol (MCP) server integration
│   ├── models/                  # Gemini 3.8 Flash, Gemini 3.1 Pro model selector
│   ├── permissions/             # Read/write tool authorization model
│   ├── plans/                   # Plan generation, interview mode (/grill-me)
│   ├── plugins/                 # Antigravity plugin ecosystem
│   ├── projects/                # Project workspaces, multi-repo support
│   ├── remote-control/          # Remote CLI session management
│   ├── rules-workflows/         # Rule definition (.gemini/rules)
│   ├── sandbox/                 # Containerized terminal and safe execution
│   ├── screenshots/             # Visual UI capture and review
│   ├── sidecars/                # Background sidecar processes and MCP daemons
│   ├── skills/                  # Skill folders and YAML frontmatter specification
│   ├── slash-commands/          # Interactive shortcuts (/goal, /plan, /learn, etc.)
│   ├── subagents/               # Multi-agent delegation and concurrency
│   ├── teamwork/                # Multi-agent collaboration and parallel worktrees
│   ├── tools/                   # Native tool API catalog
│   └── walkthrough/             # Walkthrough generation and verification reports
│
├── blog/                        # Official Google Antigravity engineering blog
│   ├── rss.xml                  # XML RSS 2.0 syndicate feed
│   ├── introducing-google-antigravity/
│   ├── introducing-google-antigravity-2/
│   ├── introducing-google-antigravity-cli/
│   ├── introducing-google-antigravity-sdk/
│   ├── introducing-custom-agents/
│   ├── antigravity-enterprise/
│   ├── gemini-3-flash-in-google-antigravity/
│   ├── gemini-3-1-pro-in-google-antigravity/
│   ├── gemini-3-5-flash-in-google-antigravity/
│   ├── gemini-3-6-flash-in-google-antigravity/
│   ├── gemini-3-7-flash-in-google-antigravity/
│   ├── gemini-3-8-flash-in-google-antigravity/
│   ├── google-antigravity-built-an-os/
│   ├── google-antigravity-for-enterprises/
│   ├── google-io-2026/
│   ├── google-io-2026-feature-deep-dive/
│   ├── nano-banana-pro/
│   ├── remote-control-for-antigravity/
│   ├── teamwork-when-ai-becomes-a-research-partner/
│   ├── vcs-and-terminal/
│   ├── visualizing-with-the-help-of-antigravity/
│   └── changes-to-antigravity-plans/
│
├── product/                     # Dedicated product landing pages
│   ├── antigravity-2/           # Antigravity 2.0 platform highlights
│   ├── antigravity-cli/         # Autonomous CLI command-line assistant
│   ├── antigravity-ide/         # AI-first IDE environment
│   └── antigravity-sdk/         # Agent orchestration software development kit
│
├── download/                    # Client installer distributions
│   └── linux/                   # Linux package (.deb, .rpm, tarball) download instructions
├── pricing/                     # Tier comparison (Standard, Pro, Gemini Enterprise)
├── changelog/                   # Chronological version release notes
├── use-cases/                   # Persona-driven usage workflows
│   ├── enterprise/, frontend/, fullstack/, marketer/, science/
├── terms/, support/, interest-form/
└── g1-activity/, g1-credits/, g1-upgrade/, oauth-callback/
```

---

## 3. In-Depth JavaScript Module & Function Catalog

The client-side scripts located in `_astro/` power all interactivity, animations, and state on `antigravity.google`. Below is a comprehensive functional deconstruction of every JavaScript module:

### 1. `page.Dwipeu-R.js` (Astro Link Prefetch Engine)
- **Role:** Implements speculative document prefetching to make transitions instantaneous.
- **Key Functions:**
  - `o(config)`: Master entry point that registers event listeners based on prefetch strategy.
  - `s()`: Listens for `touchstart` and `mousedown` events on `<a>` anchor elements, invoking `f(href)` to prefetch target pages immediately on tap.
  - `c()`: Binds `focusin`, `focusout`, and `mouseenter` events. Includes debouncing (80ms delay) to avoid wasteful network requests on rapid cursor hovering.
  - `l()` & `u()`: Creates an `IntersectionObserver` observing all links with the `viewport` prefetch strategy, downloading resources as soon as links scroll into view.
  - `f(url, options)`: Dispatches the underlying HTTP fetch request with low priority (`importance: 'low'`).

### 2. `SmoothScrollLayout.astro_astro_type_script_index_0_lang.BWgXG9Oy.js` (Virtual Scroll Smoother)
- **Role:** GSAP ScrollSmoother implementation providing inertia-damped virtual scrolling.
- **Key Functions:**
  - `C(options)`: ScrollSmoother class constructor configuring smoothness factor (`smooth: 0.8`), touch response (`smoothTouch`), and keyboard navigation.
  - `S(target)`: Wraps the page's main scrollable tree in `.ScrollSmoother-wrapper` and `.ScrollSmoother-content` DOM containers.
  - `Y(scrollPos, force)`: Calculates the 3D translation matrix (`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, y, 0, 1)`) and applies it to the content element at 60fps.
  - `te(element, speed)`: Computes parallax offsets for elements tagged with custom scroll speeds or effects.

### 3. `Header.astro_astro_type_script_index_0_lang.B83MSiN-.js` (Navigation Controller)
- **Role:** Controls sticky header reactivity, mobile navigation drawer, and the hidden logo context menu.
- **Key Functions:**
  - `window.addEventListener('scroll')`: Tracks scroll delta (`currentScroll - lastScroll`). Adds `.scrolled` when past top, adds `.hidden` when scrolling down rapidly, and removes `.hidden` when scrolling upward.
  - `g()`: Dismisses the custom logo context menu and resets `aria-hidden` attributes.
  - `logoLink.addEventListener('contextmenu')`: Intercepts right-clicks on the Google Antigravity logo to display a custom context menu with actions:
    - `copy-logo`: Copies raw Antigravity SVG mark to the user's clipboard (`navigator.clipboard.writeText(...)`).
    - `copy-wordmark`: Copies full SVG wordmark to the clipboard.
  - `mobileToggle.addEventListener('click')`: Toggles `.menu-open` class on the navigation bar, animates the mobile hamburger icon into an 'X', and traps focus.

### 4. `CustomCursor.astro_astro_type_script_index_0_lang.CPzCIKxN.js` (Magnetic Cursor Follower)
- **Role:** Replaces default pointer over hero and media elements with a branded interactive floating badge.
- **Key Functions:**
  - `e.quickTo(r, 'x')` & `e.quickTo(r, 'y')`: Sets up optimized GSAP tweens with `duration: 0.35` and `ease: 'power2.out'` to eliminate cursor lag.
  - `l(x, y)`: Hit-testing function testing whether coordinates fall within the element's bounding rectangle.
  - `u(event)`: Triggers cursor scale-up (`scale: 1, opacity: 1, ease: 'back.out(1.7)'`) and hides standard CSS cursor (`cursor: 'none'`).
  - `d()`: Reverts cursor to hidden state on `mouseleave`.
  - `f(instant)`: Computes scaled offsets relative to container dimensions (`offsetWidth / rect.width`).

### 5. `TypedHeader.astro_astro_type_script_index_0_lang.CVh8pq8w.js` (Typewriter Engine)
- **Role:** Coordinates character-by-character typewriter text animations on hero headlines.
- **Key Functions:**
  - `constructor(element)`: Uses `SplitText` to segment text into individual `<span>` character nodes and initializes cursor positioning.
  - `startTyping(timeline, delay, stagger)`: Builds an asynchronous GSAP timeline revealing characters sequentially, firing `onStart` callbacks to advance the blinking cursor marker.
  - `updateBlinkingCursor(x, y)`: Adjusts CSS custom properties `--cursor-pos-x` and `--cursor-pos-y` to align the blinking vertical cursor with the active typing character.
  - `onResize()`: Recalculates ending character positions on window resize events to keep the cursor aligned.

### 6. `YoutubeVideoSection.astro_astro_type_script_index_0_lang.bzIUlk_B.js` (Video Player & Dialog)
- **Role:** Viewport-triggered video scaling, muted preview auto-playback, and full-screen modal launch.
- **Key Functions:**
  - `ScrollTrigger.create(...)`: Monitors entry and exit of video containers in the viewport:
    - Automatically triggers `.play()` on muted video previews when scrolled into view.
    - Pauses video previews on viewport exit to conserve CPU and GPU cycles.
  - `section.addEventListener('click')`: Displays the high-resolution YouTube video dialog (`<dialog>`), dynamically instantiating `ModalYoutubeHelper`.

### 7. `Search.astro_astro_type_script_index_0_lang.B-Vh4ymV.js` (Documentation Search)
- **Role:** Powers the `<site-search>` custom web component integrating Pagefind client search.
- **Key Functions:**
  - `constructor()`: Registers search modal triggers (`data-open-modal`, `data-close-modal`).
  - `window.addEventListener('keydown')`: Binds global keyboard shortcuts (`Cmd+K` on macOS, `Ctrl+K` on Windows/Linux) to open the search modal.
  - `i(moduleLoader, dependencies)`: Custom module preloader that resolves URLs, checks for duplicates, and injects `<link rel="modulepreload">` tags dynamically.
  - `PagefindUI`: Initializes index querying, sub-result highlighting, and URL formatting upon idle callback.

### 8. `Slider.astro_astro_type_script_index_0_lang.uOpsnXI6.js` (Card Carousel)
- **Role:** Powers horizontal card sliders with smooth touch dragging and snapping.
- **Key Functions:**
  - `calculateWidth()`: Measures container dimensions and sets the CSS variable `--slider-width`.
  - `setupDraggable()`: Initializes GSAP `Draggable` with momentum inertia (`inertia: true`, `resistance: 100`) and boundaries matching total card count.
  - `snapToIndex(index)`: Smoothly tweens the track to `-(index * (width + gap))` using `ease: 'power3.out'`.

### 9. `DownloadSection.astro_astro_type_script_index_0_lang.tBxP4oYW.js` (OS Detection & CTA)
- **Role:** Detects user operating system and adapts download CTAs dynamically.
- **Key Functions:**
  - Evaluates `deviceInfo.operatingSystem`:
    - macOS: Pre-selects Apple Silicon / Intel `.dmg` installer.
    - Windows: Pre-selects Windows 64-bit `.exe` / `.msi` setup.
    - Linux: Routes to `/download/linux` package instructions (`.deb` / `.rpm`).
  - Updates headline text dynamically and triggers typewriter entrance animation.

### 10. `AntigravityFooter.astro_astro_type_script_index_0_lang.CdFtjRvA.js` (Kinetic Footer)
- **Role:** Parallax floating animation of letter glyphs in the footer.
- **Key Functions:**
  - Creates a GSAP ScrollTrigger timeline bound to `[data-antigravity-footer-wrapper]`.
  - Shifts letters "Y" (`data-letter-y`) and "T" (`data-letter-t`) upward by `-60px` as the user scrolls into the footer zone, simulating zero-gravity floatation.

### 11. `MobileTableOfContents.astro_astro_type_script_index_0_lang.BcSo_yiZ.js` (Mobile TOC)
- **Role:** Defines `<mobile-starlight-toc>` custom element.
- **Key Functions:**
  - Intercepts link clicks inside `<details>` to auto-collapse the menu.
  - Listens for `Escape` key to close the drawer and restore focus to `<summary>`.
  - Updates `.display-current` text node to reflect the currently active heading on scroll.

### 12. `MorphingParticlesComponent.astro...js` & `MainParticlesComponent.astro...js` (Canvas Particle Systems)
- **Role:** Renders interactive particle mesh field in the hero section.
- **Key Functions:**
  - Canvas 2D/WebGL buffer allocation and DPR (device pixel ratio) scaling for retina clarity.
  - Particle vector physics calculations: velocity damping, random Brownian oscillation, and cursor attraction/repulsion.
  - `requestAnimationFrame` render loop updating particle positions and drawing connecting lines below distance thresholds.

---

## 4. Key HTML Pages & Documentation Sections

| Route Path | Local File | Purpose & Contents |
| :--- | :--- | :--- |
| `/` | `index.html` | Official homepage featuring hero animation, product suite overview, interactive videos, and feature highlights. |
| `/docs/overview/` | `docs/overview/index.html` | Antigravity 2.0 architecture overview, core philosophies, and system capabilities. |
| `/docs/getting-started/` | `docs/getting-started/index.html` | Step-by-step setup guide for Antigravity IDE, CLI, and credentials. |
| `/docs/cli/` | `docs/cli/overview/index.html` | Terminal assistant guide covering headless mode, commands, and shortcuts. |
| `/docs/ide/` | `docs/ide/overview/index.html` | In-editor agent guide detailing the side panel, diff viewer, and integrated browser. |
| `/docs/sdk/` | `docs/sdk/overview/index.html` | Antigravity Python and Node.js SDK reference for programmatic agent workflows. |
| `/docs/subagents/` | `docs/subagents/index.html` | Architectural documentation for spawning, supervising, and coordinating parallel subagents. |
| `/docs/mcp/` | `docs/mcp/index.html` | Model Context Protocol server configuration, connecting custom databases, APIs, and tools. |
| `/docs/skills/` | `docs/skills/index.html` | Defining reusable agent skills with `SKILL.md` workflows and scripts. |
| `/docs/teamwork/` | `docs/teamwork/index.html` | Agent-to-agent collaboration across isolated git worktrees. |
| `/blog/` | `blog/index.html` | Directory of all official announcements, engineering deep-dives, and version launches. |
| `/product/` | `product/antigravity-2/index.html` | Dedicated platform capability and workflow showcases. |
| `/download/` | `download/index.html` | Direct binaries for macOS, Windows, and Linux. |
| `/pricing/` | `pricing/index.html` | Individual, Pro, and Gemini Enterprise feature tiers and credits. |
| `/changelog/` | `changelog/index.html` | Complete release history and feature updates. |

---

## 5. Local Serving & Preview Instructions

Because the extracted website utilizes root-relative URLs (e.g. `/_astro/...` and `/assets/...`), static files must be served from `D:\Xcode\antigravity.google` as the server root:

### Option A: Python Built-In HTTP Server (Quick & Reliable)
```bash
python -m http.server 3000 --directory "D:/Xcode/antigravity.google"
```
Then open: **`http://localhost:3000/`**

### Option B: Node.js `serve` / `npx`
```bash
npx serve "D:/Xcode/antigravity.google" -p 3000
```
Then open: **`http://localhost:3000/`**

### Option C: VS Code Live Preview Extension
1. Open folder **`D:/Xcode/antigravity.google`** directly as your workspace root in VS Code.
2. Right-click **`index.html`** and select **Show Preview**.
3. Live Preview will serve `index.html` with all `/_astro/...` and `/assets/...` paths resolving correctly without 404s.

---
## 6. Related In-Depth Documents
- 🌟 **[Interactive Visuals, Particle Systems & Cursor Effects Guide](file:///D:/Xcode/orb_interactive_particles.md)**: Deep technical dive into the Hero Particle Orb, Download Dark Orb, Morphing Particle Meshes, Custom Magnetic Cursors, and Kinetic Typography.

---
*Documentation compiled on 2026-09-20. Total files cataloged: 402.*
