/**
 * ============================================================================
 * AGENT FIRST SECTION ANIMATION (AgentFirst.astro...js)
 * ============================================================================
 * Scroll-triggered physics simulation of floating badges and interactive tags
 * that disperse and converge as user scrolls through the Agent-First section.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";
import { t as ScrollTrigger } from "./ScrollTrigger.DBzICErp.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener(`DOMContentLoaded`, () => {
  let section = document.querySelector(`[data-agent-first-section]`);
  if (!section) return;

  let bouncerList = section.querySelector(`[data-bouncer-list]`);
  let bouncerItems = bouncerList?.querySelectorAll(`[data-bouncer]`) || [];
  let textContainer = section.querySelector(`[data-text-container]`);
  let typedHeader = textContainer?.querySelector(`[data-typed-header]`);

  // Build scroll-linked animation timeline
  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: `top 70%`,
      end: `bottom bottom`,
      scrub: 1
    }
  });

  bouncerItems.forEach((item, index) => {
    let randomY = (index % 2 === 0 ? -1 : 1) * (30 + index * 10);
    timeline.from(item, {
      y: randomY,
      opacity: 0.2,
      ease: `power1.out`
    }, 0);
  });
});
