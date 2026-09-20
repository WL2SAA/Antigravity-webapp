/**
 * ============================================================================
 * HEADER & NAVIGATION CONTROLLER (Header.astro...js)
 * ============================================================================
 * Orchestrates:
 *  1. Sticky navigation scroll reactivity (hiding on scroll-down, showing on scroll-up).
 *  2. Background transparency / blur toggle (.scrolled).
 *  3. Mobile navigation drawer toggle (.menu-open).
 *  4. Dropdown navigation panels with GSAP animations.
 *  5. Secret Antigravity logo context menu with SVG clipboard copying.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";

/**
 * Main initialization routine for the header.
 */
var initHeader = () => {
  let headerElement = document.querySelector(`[data-header]`);
  if (!headerElement) return;

  // Configuration attributes & element selectors
  let isScrollReactive = headerElement.getAttribute(`data-scroll-reactive`) === `true`;
  let dropdownTriggers = headerElement.querySelectorAll(`[data-dropdown-trigger]`);
  let dropdownPanels = headerElement.querySelectorAll(`[data-dropdown-panel-id]`);
  let dropdownsContainer = headerElement.querySelector(`[data-dropdowns-container]`);
  let dropdownOverlay = document.querySelector(`[data-dropdown-overlay]`);
  let mobileMenuToggle = headerElement.querySelector(`[data-mobile-menu-toggle]`);
  let mobileMenu = headerElement.querySelector(`[data-mobile-menu]`);
  let mobileDropdownTriggers = headerElement.querySelectorAll(`[data-mobile-dropdown-trigger]`);
  let mobileDropdownPanels = headerElement.querySelectorAll(`[data-mobile-dropdown-panel]`);

  let lastScrollY = window.scrollY;
  let isAnimating = false;
  let activeDropdown = null;

  // --------------------------------------------------------------------------
  // 1. SCROLL REACTIVITY: Auto-hide on scroll-down, show on scroll-up
  // --------------------------------------------------------------------------
  if (isScrollReactive) {
    window.addEventListener(`scroll`, () => {
      if (isAnimating || headerElement.classList.contains(`menu-open`)) return;
      
      let currentScrollY = window.scrollY;
      // Add visual background blur once user has scrolled past top
      if (currentScrollY > 0) {
        headerElement.classList.add(`scrolled`);
      } else {
        headerElement.classList.remove(`scrolled`);
      }

      let deltaY = currentScrollY - lastScrollY;
      // Hide header when scrolling down past threshold
      if (deltaY > 5) {
        headerElement.classList.add(`hidden`);
        closeActiveDropdown();
        hideLogoContextMenu();
      } else if (deltaY < -5) {
        // Reveal header when scrolling up
        headerElement.classList.remove(`hidden`);
      }

      if (Math.abs(deltaY) > 5) {
        lastScrollY = currentScrollY;
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 2. LOGO CONTEXT MENU: Right-click easter egg to copy brand SVGs
  // --------------------------------------------------------------------------
  let logoLink = headerElement.querySelector(`[data-logo-link]`);
  let logoContextMenu = headerElement.querySelector(`[data-logo-context-menu]`);

  /**
   * Hides the custom logo context menu and resets accessibility attributes.
   */
  let hideLogoContextMenu = () => {
    if (logoContextMenu) {
      logoContextMenu.classList.remove(`visible`);
      logoContextMenu.setAttribute(`aria-hidden`, `true`);
    }
  };

  if (logoLink && logoContextMenu) {
    // Show custom menu on right-click instead of default browser menu
    logoLink.addEventListener(`contextmenu`, (event) => {
      event.preventDefault();
      event.stopPropagation();
      logoContextMenu.classList.add(`visible`);
      logoContextMenu.setAttribute(`aria-hidden`, `false`);
    });

    // Prevent navigation if menu is open
    logoLink.addEventListener(`click`, (event) => {
      if (logoContextMenu.classList.contains(`visible`)) {
        event.preventDefault();
      }
    });

    // Dismiss context menu when clicking outside, scrolling, or pressing Escape
    window.addEventListener(`pointerdown`, (event) => {
      let target = event.target;
      if (!logoContextMenu.contains(target) && !logoLink.contains(target)) {
        hideLogoContextMenu();
      }
    });
    window.addEventListener(`scroll`, hideLogoContextMenu, { passive: true });
    window.addEventListener(`keydown`, (event) => {
      if (event.key === `Escape`) hideLogoContextMenu();
    });

    // Actions inside context menu
    let copyLogoButton = logoContextMenu.querySelector(`[data-context-action="copy-logo"]`);
    let copyWordmarkButton = logoContextMenu.querySelector(`[data-context-action="copy-wordmark"]`);

    /**
     * Shows temporary "Copied!" feedback state on button
     * @param {HTMLElement} element - Button element to toggle
     */
    let showCopiedState = (element) => {
      element.classList.add(`copied`);
      setTimeout(() => {
        element.classList.remove(`copied`);
        hideLogoContextMenu();
      }, 1200);
    };

    // Copy raw Antigravity icon SVG to clipboard
    if (copyLogoButton) {
      copyLogoButton.addEventListener(`click`, (event) => {
        event.stopPropagation();
        navigator.clipboard.writeText(`<svg viewBox="0 0 113 113" height="113" width="113" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M89.6992 93.695C94.3659 97.195 101.366 94.8617 94.9492 88.445C75.6992 69.7783 79.7825 18.445 55.8659 18.445C31.9492 18.445 35.6992 69.7783 16.4492 88.445C10.0325 94.8617 17.0325 97.195 21.6992 93.695C42.8659 78.445 44.8659 40.445 55.6992 40.445C66.5325 40.445 68.5325 78.445 89.6992 93.695Z" fill="currentColor"/></svg>`);
        showCopiedState(copyLogoButton);
      });
    }

    // Copy full brand wordmark SVG to clipboard
    if (copyWordmarkButton) {
      copyWordmarkButton.addEventListener(`click`, (event) => {
        event.stopPropagation();
        navigator.clipboard.writeText(`<svg viewBox="0 0 869 113" height="113" width="869" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="..." fill="currentColor"/></svg>`);
        showCopiedState(copyWordmarkButton);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 3. DROPDOWN PANELS: GSAP animated disclosure menus
  // --------------------------------------------------------------------------
  let closeActiveDropdown = () => {
    dropdownPanels.forEach(panel => panel.classList.remove(`active`));
    dropdownTriggers.forEach(trigger => trigger.classList.remove(`active`));
    if (dropdownOverlay) dropdownOverlay.classList.remove(`visible`);
    activeDropdown = null;
  };

  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener(`click`, (event) => {
      event.preventDefault();
      let targetId = trigger.getAttribute(`data-dropdown-trigger`);
      let targetPanel = headerElement.querySelector(`[data-dropdown-panel-id="${targetId}"]`);
      
      if (activeDropdown === targetId) {
        closeActiveDropdown();
      } else {
        dropdownPanels.forEach(p => p.classList.remove(`active`));
        dropdownTriggers.forEach(t => t.classList.remove(`active`));
        trigger.classList.add(`active`);
        if (targetPanel) targetPanel.classList.add(`active`);
        if (dropdownOverlay) dropdownOverlay.classList.add(`visible`);
        activeDropdown = targetId;
      }
    });
  });

  if (dropdownOverlay) {
    dropdownOverlay.addEventListener(`click`, closeActiveDropdown);
  }

  // --------------------------------------------------------------------------
  // 4. MOBILE MENU: Slide-in navigation drawer
  // --------------------------------------------------------------------------
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener(`click`, () => {
      let isOpen = headerElement.classList.toggle(`menu-open`);
      mobileMenuToggle.setAttribute(`aria-expanded`, isOpen ? `true` : `false`);
      document.body.style.overflow = isOpen ? `hidden` : ``;
    });
  }
};

// Initialize header when DOM is ready
if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, initHeader);
} else {
  initHeader();
}
