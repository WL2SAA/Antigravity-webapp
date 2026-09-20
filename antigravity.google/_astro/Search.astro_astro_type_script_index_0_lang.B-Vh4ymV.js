/**
 * ============================================================================
 * STARLIGHT DOCUMENTATION CLIENT SEARCH (Search.astro...js)
 * ============================================================================
 * Defines the custom web component <site-search> that connects to Pagefind
 * full-text client-side search index, handles modal dialog states, dynamic
 * CSS/JS module preloading, and keyboard shortcut listeners (Cmd+K / Ctrl+K).
 */

// Pagefind scoring and ranking weight configurations
var searchRankingConfig = {
  ranking: {
    pageLength: 0.1,
    termFrequency: 0.1,
    termSaturation: 2,
    termSimilarity: 9,
    diacriticSimilarity: 0.8
  }
};

/**
 * Detects browser support for modulepreload vs standard preload
 */
var preloadRelType = (function() {
  let link = typeof document < "u" && document.createElement("link").relList;
  return link && link.supports && link.supports("modulepreload") ? "modulepreload" : "preload";
})();

var formatPath = function(path) {
  return "/" + path;
};

// Cache of already preloaded module URLs
var preloadedModules = {};

/**
 * Dynamically preloads dependencies with CSP nonce handling and error dispatch.
 * @param {Function} loader - Dynamic import loader function
 * @param {string[]} dependencies - Array of resource paths to preload
 * @returns {Promise}
 */
var preloadModule = function(loader, dependencies, base) {
  let preloadPromise = Promise.resolve();

  if (dependencies && dependencies.length > 0) {
    let linkElements = document.getElementsByTagName("link");
    let cspMeta = document.querySelector("meta[property=csp-nonce]");
    let nonce = cspMeta?.nonce || cspMeta?.getAttribute("nonce");

    function settleAll(promises) {
      return Promise.all(
        promises.map(p => Promise.resolve(p).then(
          value => ({ status: "fulfilled", value }),
          reason => ({ status: "rejected", reason })
        ))
      );
    }

    function resolveUrl(url) {
      return import.meta.resolve ? import.meta.resolve(url) : new URL(url, import.meta.url).href;
    }

    preloadPromise = settleAll(dependencies.map(dep => {
      dep = formatPath(dep, base);
      dep = resolveUrl(dep);
      if (dep in preloadedModules) return;
      preloadedModules[dep] = true;

      let isCss = dep.endsWith(".css");
      for (let i = linkElements.length - 1; i >= 0; i--) {
        let el = linkElements[i];
        if (el.href === dep && (!isCss || el.rel === "stylesheet")) return;
      }

      let link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : preloadRelType;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (nonce) link.setAttribute("nonce", nonce);
      document.head.appendChild(link);

      if (isCss) {
        return new Promise((resolve, reject) => {
          link.addEventListener("load", resolve);
          link.addEventListener("error", () => reject(new Error(`Unable to preload CSS for ${dep}`)));
        });
      }
    }));
  }

  function dispatchPreloadError(err) {
    let event = new Event("vite:preloadError", { cancelable: true });
    event.payload = err;
    window.dispatchEvent(event);
    if (!event.defaultPrevented) throw err;
  }

  return preloadPromise.then(results => {
    for (let res of results || []) {
      if (res.status === "rejected") dispatchPreloadError(res.reason);
    }
    return loader().catch(dispatchPreloadError);
  });
};

/**
 * Custom Web Component <site-search> for modal-based documentation search.
 */
class SiteSearch extends HTMLElement {
  constructor() {
    super();

    let openButton = this.querySelector(`button[data-open-modal]`);
    let closeButton = this.querySelector(`button[data-close-modal]`);
    let modalDialog = this.querySelector(`dialog`);
    let dialogFrame = this.querySelector(`.dialog-frame`);

    /**
     * Closes search modal if clicking outside dialog contents
     */
    let handleOutsideClick = (event) => {
      if ("href" in (event.target || {}) || (document.body.contains(event.target) && !dialogFrame.contains(event.target))) {
        closeModal();
      }
    };

    /**
     * Opens the search dialog and focuses the search input.
     */
    let openModal = (event) => {
      modalDialog.showModal();
      document.body.toggleAttribute(`data-search-modal-open`, true);
      this.querySelector(`input`)?.focus();
      event?.stopPropagation();
      window.addEventListener(`click`, handleOutsideClick);
    };

    /**
     * Closes the search dialog.
     */
    let closeModal = () => modalDialog.close();

    // Attach trigger listeners
    openButton.addEventListener(`click`, openModal);
    openButton.disabled = false;
    closeButton.addEventListener(`click`, closeModal);

    modalDialog.addEventListener(`close`, () => {
      document.body.toggleAttribute(`data-search-modal-open`, false);
      window.removeEventListener(`click`, handleOutsideClick);
    });

    // Global keyboard listener: Cmd+K / Ctrl+K
    window.addEventListener(`keydown`, (event) => {
      if ((event.metaKey === true || event.ctrlKey === true) && event.key === `k`) {
        if (modalDialog.open) {
          closeModal();
        } else {
          openModal();
        }
        event.preventDefault();
      }
    });

    // Parse localized UI translations
    let translations = {};
    try {
      translations = JSON.parse(this.dataset.translations || `{}`);
    } catch {}

    let stripTrailingSlash = this.dataset.stripTrailingSlash === void 0
      ? url => url
      : url => url.replace(/(.)\/(#.*)?$/, `$1$2`);

    // Initialize Pagefind search interface when browser is idle
    window.addEventListener(`DOMContentLoaded`, () => {
      (window.requestIdleCallback || (cb => setTimeout(cb, 1)))(async () => {
        let { PagefindUI } = await preloadModule(async () => {
          let { PagefindUI: UI } = await import(`./ui-core.BzPh4z-r.js`);
          return { PagefindUI: UI };
        }, []);

        new PagefindUI({
          ...searchRankingConfig,
          element: `#starlight__search`,
          baseUrl: `/`,
          bundlePath: `/`.replace(/\/$/, ``) + `/pagefind/`,
          showImages: false,
          translations: translations,
          showSubResults: true,
          processResult: result => {
            result.url = stripTrailingSlash(result.url);
            result.sub_results = result.sub_results.map(sub => {
              sub.url = stripTrailingSlash(sub.url);
              return sub;
            });
          }
        });
      });
    });
  }
}

customElements.define(`site-search`, SiteSearch);
export { preloadModule as t };
