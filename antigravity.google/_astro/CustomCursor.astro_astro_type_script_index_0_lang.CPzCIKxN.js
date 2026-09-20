/**
 * ============================================================================
 * CUSTOM MAGNETIC CURSOR COMPONENT (CustomCursor.astro...js)
 * ============================================================================
 * Replaces standard mouse pointer with an interactive, spring-interpolated 
 * custom badge when hovering over interactive containers.
 * 
 * Uses GSAP quickTo() for 60fps hardware-accelerated pointer following.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";

/**
 * Initializes cursor tracking on all [data-custom-cursor-wrapper] elements.
 */
var initCustomCursor = () => {
  document.querySelectorAll(`[data-custom-cursor-wrapper]`).forEach(wrapper => {
    let parentElement = wrapper.parentElement;
    if (!parentElement || parentElement._cursorInitialized) return;
    parentElement._cursorInitialized = true;

    let cursorElement = wrapper.querySelector(`[data-cursor]`);
    if (!cursorElement) return;

    // Center cursor transform origin and hide initially
    gsap.set(cursorElement, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    // High-performance GSAP quickTo tweens with power2 damping
    let moveX = gsap.quickTo(cursorElement, `x`, { duration: 0.35, ease: `power2.out` });
    let moveY = gsap.quickTo(cursorElement, `y`, { duration: 0.35, ease: `power2.out` });

    let mouseX = 0;
    let mouseY = 0;
    let isCursorActive = false;

    /**
     * Checks if coordinates fall within container bounds
     * @param {number} x - Client X coordinate
     * @param {number} y - Client Y coordinate
     * @returns {boolean}
     */
    let isInsideBounds = (x, y) => {
      let rect = parentElement.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    /**
     * Activates the custom cursor with an elastic bounce animation.
     * @param {MouseEvent} event - Mouse enter event
     */
    let activateCursor = (event) => {
      if (isCursorActive) return;
      isCursorActive = true;
      parentElement.style.cursor = `none`;
      mouseX = event.clientX;
      mouseY = event.clientY;
      updatePosition(true);
      gsap.to(cursorElement, { scale: 1, opacity: 1, duration: 0.3, ease: `back.out(1.7)` });
    };

    /**
     * Deactivates the custom cursor and restores normal cursor.
     */
    let deactivateCursor = () => {
      if (!isCursorActive) return;
      isCursorActive = false;
      parentElement.style.cursor = ``;
      gsap.to(cursorElement, { scale: 0, opacity: 0, duration: 0.2, ease: `power2.in` });
    };

    /**
     * Updates cursor coordinates relative to parent container, handling CSS scaling.
     * @param {boolean} [instant=false] - Whether to set position immediately without tweening
     */
    let updatePosition = (instant = false) => {
      let rect = parentElement.getBoundingClientRect();
      // Deactivate if element scrolled outside viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        if (isCursorActive) deactivateCursor();
        return;
      }
      // Check buffer around element
      if (!(mouseX >= rect.left - 50 && mouseX <= rect.right + 50 && mouseY >= rect.top - 50 && mouseY <= rect.bottom + 50)) {
        if (isCursorActive) deactivateCursor();
        return;
      }

      // Handle CSS transform scales
      let scaleX = rect.width > 0 ? parentElement.offsetWidth / rect.width : 1;
      let scaleY = rect.height > 0 ? parentElement.offsetHeight / rect.height : 1;
      let relX = (mouseX - rect.left) * scaleX;
      let relY = (mouseY - rect.top) * scaleY;

      if (instant) {
        gsap.set(cursorElement, { x: relX, y: relY });
      } else {
        moveX(relX);
        moveY(relY);
      }
    };

    /**
     * Master pointermove handler tracking client mouse coordinates.
     * @param {MouseEvent} event
     */
    let onMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!isCursorActive && isInsideBounds(event.clientX, event.clientY)) {
        activateCursor(event);
      } else if (isCursorActive) {
        updatePosition();
      }
    };

    // Attach mouse and scroll event listeners
    parentElement.addEventListener(`mousemove`, onMouseMove);
    parentElement.addEventListener(`mouseenter`, activateCursor);
    parentElement.addEventListener(`mouseleave`, deactivateCursor);
    window.addEventListener(`scroll`, () => { if (isCursorActive) updatePosition(); }, { passive: true });
    window.addEventListener(`mousemove`, onMouseMove, { passive: true });
  });
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, initCustomCursor);
} else {
  initCustomCursor();
}
