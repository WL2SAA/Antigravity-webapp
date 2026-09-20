/**
 * ============================================================================
 * TYPED HEADER COMPONENT (TypedHeader.astro...js)
 * ============================================================================
 * Creates typewriter character-by-character text reveal animations using 
 * GSAP Timeline and SplitText plugin, tracking a blinking cursor marker.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";
import { t as SplitText } from "./SplitText.D2RYeBm1.js";

// Register GreenSock SplitText plugin
gsap.registerPlugin(SplitText);

/**
 * Class coordinating text segmentation, character timeline, and cursor positioning.
 */
class TypedHeaderHelper {
  element;
  cursorContainer;
  typedContent;
  splitContent;
  cursorPersists;
  doneTyping = false;
  activeTimeline = null;

  /**
   * @param {HTMLElement} element - Root element marked with [data-typed-header]
   */
  constructor(element) {
    this.element = element;
    this.cursorContainer = element.querySelector(`[data-cursor-container]`);
    this.typedContent = element.querySelector(`.typed-content`);
    this.cursorPersists = element.getAttribute(`data-cursor-persists`) === `true`;

    // Segment text into spans for each character and word
    this.splitContent = SplitText.create(this.typedContent, { type: `chars, words` });
    gsap.set(this.cursorContainer, { opacity: 0 });
    gsap.set(this.splitContent.chars, { opacity: 0 });

    // Initialize cursor position at the first character
    let firstChar = this.splitContent.chars[0];
    if (firstChar) {
      let offsetParent = firstChar.offsetParent;
      this.updateBlinkingCursor(
        offsetParent ? offsetParent.offsetLeft + firstChar.offsetLeft : firstChar.offsetLeft,
        offsetParent ? offsetParent.offsetTop + firstChar.offsetTop : firstChar.offsetTop
      );
    }

    // Keep cursor aligned if viewport resizes
    window.addEventListener(`resize`, () => this.onResize());
  }

  /**
   * Stops active typing animations and kills ongoing GSAP tweens.
   */
  stopAnimation() {
    if (this.activeTimeline) {
      this.activeTimeline.kill();
      this.activeTimeline = null;
    }
    if (this.cursorContainer) gsap.killTweensOf(this.cursorContainer);
    if (this.splitContent?.chars) gsap.killTweensOf(this.splitContent.chars);
  }

  /**
   * Resets character opacity and cursor state back to beginning.
   */
  initialize() {
    this.stopAnimation();
    if (this.cursorContainer) gsap.set(this.cursorContainer, { opacity: 0 });
    if (this.splitContent?.chars) {
      gsap.set(this.splitContent.chars, { opacity: 0 });
      let firstChar = this.splitContent.chars[0];
      if (firstChar && firstChar.offsetParent) {
        this.updateBlinkingCursor(
          firstChar.offsetParent.offsetLeft + firstChar.offsetLeft,
          firstChar.offsetParent.offsetTop + firstChar.offsetTop
        );
      }
    }
    this.doneTyping = false;
  }

  /**
   * Dynamically changes the text content and rebuilds the character breakdown.
   * @param {string} newText - Replacement text string
   */
  setText(newText) {
    this.stopAnimation();
    if (this.splitContent) this.splitContent.revert();
    if (this.typedContent) this.typedContent.innerHTML = newText;
    let hiddenElement = this.element.querySelector(`.visually-hidden`);
    if (hiddenElement) hiddenElement.innerHTML = newText;
    this.splitContent = SplitText.create(this.typedContent, { type: `chars, words` });
    this.initialize();
  }

  reset() {
    this.initialize();
  }

  /**
   * Updates CSS custom properties controlling cursor position.
   * @param {number} x - Horizontal offset in pixels
   * @param {number} y - Vertical offset in pixels
   */
  updateBlinkingCursor(x, y) {
    this.cursorContainer.style.setProperty(`--cursor-pos-x`, `${x}px`);
    this.cursorContainer.style.setProperty(`--cursor-pos-y`, `${y}px`);
  }

  /**
   * Window resize handler ensuring cursor stays pinned to final character.
   */
  onResize() {
    if (this.doneTyping && this.cursorPersists) {
      let charCount = this.splitContent?.chars.length || 1;
      let lastChar = this.splitContent?.chars[charCount - 1];
      if (lastChar && lastChar.offsetParent) {
        this.updateBlinkingCursor(
          lastChar.offsetParent.offsetLeft + lastChar.offsetLeft + lastChar.offsetWidth + 10,
          lastChar.offsetParent.offsetTop + lastChar.offsetTop
        );
      }
    }
  }

  /**
   * Starts sequential character reveal with typewriter animation timing.
   * @param {GSAPTimeline} [timeline] - Existing timeline or creates new one
   * @param {number} [delay=0] - Initial delay before typing begins
   * @param {number} [stagger=0.05] - Time interval between each character
   * @returns {GSAPTimeline}
   */
  startTyping(timeline, delay = 0, stagger = 0.05) {
    this.stopAnimation();
    let tl = timeline || gsap.timeline();
    this.activeTimeline = tl;
    let self = this;

    // Show blinking cursor
    tl.set(this.cursorContainer, { opacity: 1 });

    // Animate character opacity sequentially
    tl.fromTo(this.splitContent.chars, { opacity: 0 }, {
      opacity: 1,
      duration: 0.01,
      delay: delay,
      stagger: {
        each: stagger,
        onStart: function() {
          let charTarget = this.targets()[0];
          if (charTarget && charTarget.offsetParent) {
            self.updateBlinkingCursor(
              charTarget.offsetParent.offsetLeft + charTarget.offsetLeft + charTarget.offsetWidth + 10,
              charTarget.offsetParent.offsetTop + charTarget.offsetTop
            );
          }
        }
      },
      ease: `power2.out`,
      onComplete: () => {
        self.doneTyping = true;
        self.activeTimeline = null;
      }
    });

    // Fade out cursor if data-cursor-persists is false
    if (!this.cursorPersists) {
      tl.to(this.cursorContainer, { opacity: 0, duration: 0.5, ease: `none` });
    }

    return tl;
  }
}

// Expose helper globally for other component scripts
window.TypedHeaderHelper = TypedHeaderHelper;

// Initialize on DOM load
var initTypedHeaders = () => {
  document.querySelectorAll(`[data-typed-header]`).forEach(header => {
    if (!header.helper) {
      let helper = new TypedHeaderHelper(header);
      header.helper = helper;
      helper.startTyping(gsap.timeline(), 0.2);
    }
  });
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, initTypedHeaders);
} else {
  initTypedHeaders();
}
