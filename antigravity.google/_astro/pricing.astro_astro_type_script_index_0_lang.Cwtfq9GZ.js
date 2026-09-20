/**
 * ============================================================================
 * PRICING PAGE CONTROLLER (pricing.astro...js)
 * ============================================================================
 * Triggers entrance typewriter text animations on pricing tier headings.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";

document.addEventListener(`DOMContentLoaded`, () => {
  let pricingPage = document.querySelector(`[data-pricing-page]`);
  if (!pricingPage) return;

  // Initialize and animate typed headers across pricing columns
  pricingPage.querySelectorAll(`[data-typed-header]`).forEach(header => {
    if (header.helper) {
      header.helper.initialize();
      header.helper.startTyping(gsap.timeline());
    }
  });
});
