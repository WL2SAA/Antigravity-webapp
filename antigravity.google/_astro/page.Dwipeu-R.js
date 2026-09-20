/**
 * ============================================================================
 * ASTRO LINK PREFETCH ENGINE (page.Dwipeu-R.js)
 * ============================================================================
 * This module coordinates speculative prefetching of HTML pages and static 
 * documents when user interaction indicates an intent to navigate.
 * 
 * Supports three primary strategies:
 *  1. 'tap' / Touchstart: Prefetches immediately when mobile user presses a link.
 *  2. 'hover': Prefetches on desktop pointer hover with an 80ms debounce.
 *  3. 'viewport': Uses IntersectionObserver to prefetch links entering view.
 */

// Cache of already prefetched URLs to avoid redundant network requests
var prefetchedUrls = {};
var observedElements = new Set();
var processedAnchors = new WeakSet();
var prefetchAll = true;
var defaultStrategy = void 0;
var isInitialized = false;

/**
 * Initializes global prefetch listeners and observers.
 * @param {Object} options - Configuration object containing defaultStrategy and prefetchAll.
 */
function initPrefetch(options) {
  if (isInitialized) return;
  isInitialized = true;
  
  // Set default strategy and fallback configuration
  prefetchAll ??= options?.prefetchAll ?? false;
  defaultStrategy ??= options?.defaultStrategy ?? "hover";

  // Initialize mobile touch, desktop hover, and viewport intersection listeners
  setupTapPrefetch();
  setupHoverPrefetch();
  setupViewportPrefetch();
  observeDomMutations();
}

/**
 * Sets up touchstart and mousedown event listeners for instant mobile tap prefetching.
 */
function setupTapPrefetch() {
  for (let eventType of ["touchstart", "mousedown"]) {
    document.addEventListener(eventType, (event) => {
      let anchor = event.target.closest("a");
      // If the link matches prefetch criteria, trigger speculative fetch immediately
      if (shouldPrefetch(anchor, "tap")) {
        fetchUrl(anchor.href, { ignoreSlowConnection: true });
      }
    }, { passive: true });
  }
}

/**
 * Sets up mouseenter, focusin, and focusout listeners with 80ms debouncing for hover prefetching.
 */
function setupHoverPrefetch() {
  let hoverTimeout;

  // Prefetch when keyboard navigation focuses a link
  document.body.addEventListener("focusin", (event) => {
    let anchor = event.target.closest("a");
    if (shouldPrefetch(anchor, "hover")) {
      schedulePrefetch(anchor.href);
    }
  }, { passive: true });

  // Cancel pending prefetch if user focuses away before timeout
  document.body.addEventListener("focusout", cancelPendingPrefetch, { passive: true });

  // Attach hover listeners to all existing anchor elements in document
  queueTask(() => {
    for (let anchor of document.getElementsByTagName("a")) {
      if (!processedAnchors.has(anchor) && shouldPrefetch(anchor, "hover")) {
        processedAnchors.add(anchor);
        anchor.addEventListener("mouseenter", (e) => schedulePrefetch(e.currentTarget.href), { passive: true });
        anchor.addEventListener("mouseleave", cancelPendingPrefetch, { passive: true });
      }
    }
  });

  /**
   * Schedules a speculative fetch with an 80ms debounce delay.
   * @param {string} url - Target URL to prefetch.
   */
  function schedulePrefetch(url) {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      fetchUrl(url);
    }, 80);
  }

  /**
   * Cancels any currently pending debounced prefetch.
   */
  function cancelPendingPrefetch() {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
  }
}

/**
 * Sets up an IntersectionObserver to prefetch links as they scroll into view.
 */
function setupViewportPrefetch() {
  let observer;
  queueTask(() => {
    for (let anchor of document.getElementsByTagName("a")) {
      if (!processedAnchors.has(anchor) && shouldPrefetch(anchor, "viewport")) {
        processedAnchors.add(anchor);
        observer ??= createViewportObserver();
        observer.observe(anchor);
      }
    }
  });
}

/**
 * Creates and returns an IntersectionObserver instance for viewport prefetching.
 * @returns {IntersectionObserver}
 */
function createViewportObserver() {
  let elementMap = new WeakMap();
  return new IntersectionObserver((entries, observer) => {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        let anchor = entry.target;
        observer.unobserve(anchor);
        fetchUrl(anchor.href);
      }
    }
  });
}

/**
 * Validates whether an anchor element is eligible for prefetching under a given strategy.
 * @param {HTMLAnchorElement} anchor - Anchor element to test.
 * @param {string} strategy - 'tap', 'hover', or 'viewport'.
 * @returns {boolean}
 */
function shouldPrefetch(anchor, strategy) {
  if (!anchor || !anchor.href) return false;
  // Ignore links to external origins or non-HTTP protocols
  if (anchor.origin !== window.location.origin) return false;
  let elementStrategy = anchor.getAttribute("data-astro-prefetch") || defaultStrategy;
  return elementStrategy === strategy || (elementStrategy === "true" && strategy === "hover");
}

/**
 * Executes low-priority HTTP fetch for a document and stores it in browser HTTP cache.
 * @param {string} url - Target URL.
 * @param {Object} [options] - Optional settings (e.g. ignoreSlowConnection).
 */
function fetchUrl(url, options = {}) {
  // Check if network connection has Save-Data enabled or 2G slow connection
  let conn = navigator.connection;
  if (!options.ignoreSlowConnection && conn && (conn.saveData || /(2|3)g/.test(conn.effectiveType))) {
    return;
  }
  if (prefetchedUrls[url]) return;
  prefetchedUrls[url] = true;

  // Use low priority fetch to avoid competing with foreground resources
  fetch(url, { priority: "low" }).catch((err) => {
    delete prefetchedUrls[url];
  });
}

/**
 * Queues a callback using requestIdleCallback or setTimeout fallback.
 * @param {Function} callback - Task function to run when browser is idle.
 */
function queueTask(callback) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback);
  } else {
    setTimeout(callback, 200);
  }
}

/**
 * Observes DOM mutations to automatically attach prefetch listeners to dynamically added links.
 */
function observeDomMutations() {
  let observer = new MutationObserver(() => {
    setupHoverPrefetch();
    setupViewportPrefetch();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Automatically initialize prefetching on script execution
initPrefetch();
