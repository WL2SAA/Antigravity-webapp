/**
 * ============================================================================
 * DOWNLOAD SECTION OS SELECTOR (DownloadSection.astro...js)
 * ============================================================================
 * Dynamically detects client platform (macOS, Windows, Linux) and configures
 * the primary download buttons and animated typewriter headline.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";
import { t as ScrollTrigger } from "./ScrollTrigger.DBzICErp.js";
import { t as deviceInfo } from "./deviceInfo.CrIc9Qvc.js";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

var initDownloadSection = () => {
  document.querySelectorAll(`[data-download-section]`).forEach(section => {
    if (section._downloadSectionInitialized) return;
    section._downloadSectionInitialized = true;

    let sectionElement = section.querySelector(`[data-section-element]`);
    let typedHeader = section.querySelector(`[data-typed-header]`);
    let ctaContainer = section.querySelector(`[data-cta-container]`);
    let hasOsPlaceholder = typedHeader?.getAttribute(`data-os-title-placeholder`) === `true`;
    let customButtonText = ctaContainer?.getAttribute(`data-button-text`);

    // ------------------------------------------------------------------------
    // 1. DYNAMIC HEADLINE: Set headline based on client operating system
    // ------------------------------------------------------------------------
    if (hasOsPlaceholder && typedHeader) {
      let osName = deviceInfo.operatingSystem.buttonText || ` for MacOS`;
      let headlineText = `Download Google Antigravity${osName}`;
      let contentNode = typedHeader.querySelector(`.typed-content`);
      let hiddenNode = typedHeader.querySelector(`.visually-hidden`);
      
      if (contentNode) contentNode.innerHTML = headlineText;
      if (hiddenNode) hiddenNode.innerHTML = headlineText;
      if (window.TypedHeaderHelper) {
        typedHeader.helper = new window.TypedHeaderHelper(typedHeader);
      }
    }

    // ------------------------------------------------------------------------
    // 2. DYNAMIC BUTTONS: Generate OS-specific download links
    // ------------------------------------------------------------------------
    if (!customButtonText && ctaContainer) {
      let downloadLinks = deviceInfo.operatingSystem.links;
      if (downloadLinks.length > 0) {
        ctaContainer.innerHTML = ``;
        downloadLinks.forEach((link, index) => {
          let button = document.createElement(`a`);
          button.className = `button button-${index === 0 ? `primary-inverse` : `secondary-inverse`}`;
          button.href = `/download`;
          button.innerHTML = `<span>${link.buttonText}</span>`;
          ctaContainer.appendChild(button);
        });
      }
    }

    // ------------------------------------------------------------------------
    // 3. ENTRANCE ANIMATION: Scale in with ScrollTrigger and start typing
    // ------------------------------------------------------------------------
    setTimeout(() => {
      if (typedHeader && typedHeader.helper) {
        typedHeader.helper.startTyping(gsap.timeline());
      }
      gsap.from(sectionElement, {
        scale: 0.85,
        scrollTrigger: {
          trigger: sectionElement,
          start: `top 75%`,
          end: `bottom bottom`,
          scrub: true,
          onEnter: () => {
            if (typedHeader && typedHeader.helper) {
              typedHeader.helper.startTyping(gsap.timeline());
            }
          },
          once: true
        }
      });
    }, 50);
  });
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, initDownloadSection);
} else {
  initDownloadSection();
}
