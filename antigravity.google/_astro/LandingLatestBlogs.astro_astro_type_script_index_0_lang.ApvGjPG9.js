/**
 * ============================================================================
 * LATEST BLOG POSTS CAROUSEL (LandingLatestBlogs.astro...js)
 * ============================================================================
 * Responsive draggable blog card carousel with arrow button navigation,
 * bounds clamping, and GSAP Draggable inertia.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";
import { t as Draggable } from "./Draggable.CK_AoxCI.js";

gsap.registerPlugin(Draggable);

document.addEventListener(`DOMContentLoaded`, () => {
  let blogSection = document.querySelector(`[data-latest-blogs-section]`);
  if (!blogSection) return;

  let sliderWrapper = blogSection.querySelector(`[data-slider-wrapper]`);
  let sliderInner = blogSection.querySelector(`[data-slider-inner]`);
  let arrowWrapper = blogSection.querySelector(`[data-arrow-controls-wrapper]`);
  let arrowLeft = arrowWrapper?.querySelector(`[data-arrow-left]`);
  let arrowRight = arrowWrapper?.querySelector(`[data-arrow-right]`);
  let blogCards = sliderInner?.querySelectorAll(`.list-item`) || [];

  let currentIndex = 0;
  let visibleCount = 4;
  let cardWidth = 288;
  let cardGap = 24;
  let totalCards = blogCards.length;

  /**
   * Updates state of previous/next arrow navigation buttons
   */
  let updateArrowButtons = () => {
    if (arrowLeft) arrowLeft.disabled = currentIndex <= 0;
    if (arrowRight) arrowRight.disabled = currentIndex >= totalCards - visibleCount;
  };

  /**
   * Animates carousel track to specific card index
   * @param {number} targetIndex - Target slide index
   */
  let snapToCard = (targetIndex) => {
    currentIndex = Math.max(0, Math.min(targetIndex, totalCards - visibleCount));
    let targetX = -(currentIndex * (cardWidth + cardGap));
    gsap.to(sliderInner, {
      x: targetX,
      duration: 0.6,
      ease: `power2.out`
    });
    updateArrowButtons();
  };

  if (arrowLeft) {
    arrowLeft.addEventListener(`click`, () => snapToCard(currentIndex - 1));
  }
  if (arrowRight) {
    arrowRight.addEventListener(`click`, () => snapToCard(currentIndex + 1));
  }

  updateArrowButtons();
});
