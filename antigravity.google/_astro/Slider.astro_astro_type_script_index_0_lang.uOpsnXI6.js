/**
 * ============================================================================
 * INTERACTIVE DRAGGABLE SLIDER COMPONENT (Slider.astro...js)
 * ============================================================================
 * Provides horizontal card carousel with touch gestures, momentum inertia,
 * bounds checking, and animated snapping using GSAP and Draggable plugin.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";
import { t as Draggable } from "./Draggable.CK_AoxCI.js";

// Register GSAP Draggable plugin
gsap.registerPlugin(Draggable);

/**
 * Helper class controlling carousel metrics, touch dragging, and snapping.
 */
window.SliderHelper = class SliderHelper {
  container;
  track;
  itemCount;
  activeIndex;
  sliderWidth = 0;
  gap = 24;
  draggable = null;
  onIndexChangeCallbacks = [];
  onWidthChangeCallbacks = [];

  /**
   * @param {HTMLElement} container - Carousel root element
   */
  constructor(container) {
    this.container = container;
    this.track = container.querySelector(`[data-track]`);
    this.itemCount = parseInt(container.getAttribute(`data-item-count`) || `1`);
    this.activeIndex = parseInt(container.getAttribute(`data-active-index`) || `0`);

    this.calculateWidth();
    this.setupDraggable();

    // Recalculate dimensions on window resize
    window.addEventListener(`resize`, () => {
      this.calculateWidth();
      if (this.draggable) this.draggable.update();
    });
  }

  /**
   * Measures current container width and sets CSS variable --slider-width.
   */
  calculateWidth() {
    this.sliderWidth = this.container.getBoundingClientRect().width;
    this.track.style.setProperty(`--slider-width`, `${this.sliderWidth}px`);
    let computedStyle = window.getComputedStyle(this.track);
    let gutter = computedStyle.getPropertyValue(`--grid-gutter`);
    this.gap = gutter ? (parseFloat(gutter) || 24) : (parseFloat(computedStyle.gap) || 24);
    this.onWidthChangeCallbacks.forEach(cb => cb(this.sliderWidth));
  }

  /**
   * Initializes GSAP Draggable on the track element with inertia and snapping.
   */
  setupDraggable() {
    let self = this;
    let instances = Draggable.create(this.track, {
      type: `x`,
      inertia: {
        resistance: 100,
        minDuration: 0.2,
        maxDuration: 1.5,
        overshootTolerance: 0.2
      },
      bounds: {
        get minX() {
          return -((self.itemCount - 1) * (self.sliderWidth + self.gap));
        },
        maxX: 0
      },
      onDragEnd: function() {
        let currentX = this.x;
        let stride = self.sliderWidth + self.gap;
        let targetIndex = Math.round(-currentX / stride);
        // Clamp to valid index range
        targetIndex = Math.max(0, Math.min(targetIndex, self.itemCount - 1));
        self.snapToIndex(targetIndex);
        self.notifyIndexChange(targetIndex);
      }
    });
    this.draggable = instances[0];
  }

  /**
   * Animates track translation to align with specified slide index.
   * @param {number} index - Zero-based target card index
   */
  snapToIndex(index) {
    this.activeIndex = index;
    let targetX = -(index * (this.sliderWidth + this.gap));
    gsap.to(this.track, {
      x: targetX,
      duration: 0.7,
      ease: `power3.out`,
      overwrite: true
    });
  }

  /**
   * Registers a callback fired when active slide index changes.
   * @param {Function} callback - (newIndex: number) => void
   */
  onIndexChange(callback) {
    this.onIndexChangeCallbacks.push(callback);
  }

  /**
   * Registers a callback fired when slider width is recalculated.
   * @param {Function} callback - (newWidth: number) => void
   */
  onWidthChange(callback) {
    this.onWidthChangeCallbacks.push(callback);
  }

  /**
   * Dispatches index change notifications to all listeners.
   * @param {number} index - Active index
   */
  notifyIndexChange(index) {
    this.onIndexChangeCallbacks.forEach(cb => cb(index));
  }
};
