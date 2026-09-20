/**
 * ============================================================================
 * ANTIGRAVITY FOOTER KINETIC ANIMATION (AntigravityFooter.astro...js)
 * ============================================================================
 * Creates a zero-gravity floating effect for letters in the Antigravity brand
 * wordmark as the user reaches the bottom of the page.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";
import { t as ScrollTrigger } from "./ScrollTrigger.DBzICErp.js";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener(`DOMContentLoaded`, () => {
  let footerWrapper = document.querySelector(`[data-antigravity-footer-wrapper]`);
  if (!footerWrapper) return;

  // Select individual letter glyph elements: 'Y' and 'T'
  let letterY = footerWrapper.querySelector(`[data-letter-y]`);
  let letterT = footerWrapper.querySelector(`[data-letter-t]`);

  // Create scrubbed ScrollTrigger timeline bound to footer scroll entry
  let footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: footerWrapper,
      start: `top+=30% bottom`,
      end: `center+=30% bottom`,
      scrub: true,
      id: `AntigravityFooterAnimation`
    }
  });

  // Float letters upward by 60px simulating zero gravity
  if (letterY && letterT) {
    footerTimeline.to(letterY, { y: -60, ease: `power1.out` }, 0);
    footerTimeline.to(letterT, { y: -60, ease: `power1.out` }, 0);
  }
});
