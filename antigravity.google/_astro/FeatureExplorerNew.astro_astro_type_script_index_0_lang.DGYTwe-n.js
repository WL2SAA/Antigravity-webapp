/**
 * ============================================================================
 * FEATURE EXPLORER COMPONENT (FeatureExplorerNew.astro...js)
 * ============================================================================
 * Coordinates ScrollTrigger character reveal animations across interactive
 * feature highlight items on product landing pages.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";
import { t as ScrollTrigger } from "./ScrollTrigger.DBzICErp.js";
import { t as SplitText } from "./SplitText.D2RYeBm1.js";

// Register animation plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener(`DOMContentLoaded`, () => {
  document.querySelectorAll(`[data-feature-explorer-section]`).forEach(section => {
    section.querySelectorAll(`[data-feature-item]`).forEach(item => {
      let titleElement = item.querySelector(`[data-feature-title]`);
      let descElement = item.querySelector(`[data-feature-desc]`);
      if (!titleElement || !descElement) return;

      setTimeout(() => {
        // Split description text into characters
        let splitDesc = new SplitText(descElement, { type: `words, chars` });
        gsap.set(splitDesc.chars, { opacity: 0 });

        // Trigger character-by-character reveal when title enters 85% of viewport
        gsap.timeline({
          scrollTrigger: {
            trigger: titleElement,
            start: `top 85%`,
            toggleActions: `play none none none`
          }
        }).to(splitDesc.chars, {
          opacity: 1,
          stagger: 0.005,
          duration: 0.1,
          ease: `power2.out`
        });
      }, 100);
    });
  });
});
