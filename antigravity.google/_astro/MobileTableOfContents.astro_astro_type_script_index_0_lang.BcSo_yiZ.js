/**
 * ============================================================================
 * MOBILE TABLE OF CONTENTS (MobileTableOfContents.astro...js)
 * ============================================================================
 * Custom element <mobile-starlight-toc> extending Starlight TOC to provide
 * mobile floating accordion navigation with Escape key dismissal and current
 * heading tracking.
 */

import { t as StarlightTOC } from "./starlight-toc.CTCQXEge.js";

/**
 * Mobile TOC Component class
 */
class MobileStarlightTOC extends StarlightTOC {
  /**
   * Overrides current heading setter to update visible label in mobile bar.
   */
  set current(headingElement) {
    super.current = headingElement;
    let labelNode = this.querySelector(`.display-current`);
    if (labelNode) {
      labelNode.textContent = headingElement.textContent;
    }
  }

  constructor() {
    super();
    let detailsElement = this.querySelector(`details`);
    if (!detailsElement) return;

    let closeAccordion = () => {
      detailsElement.open = false;
    };

    // Close accordion whenever a table-of-contents link is tapped
    detailsElement.querySelectorAll(`a`).forEach(link => {
      link.addEventListener(`click`, closeAccordion);
    });

    // Close on clicks outside the accordion container
    window.addEventListener(`click`, (event) => {
      if (!detailsElement.contains(event.target)) {
        closeAccordion();
      }
    });

    // Close on Escape key and restore keyboard focus to <summary>
    window.addEventListener(`keydown`, (event) => {
      if (event.key === `Escape` && detailsElement.open) {
        let wasFocusedInside = detailsElement.contains(document.activeElement);
        closeAccordion();
        if (wasFocusedInside) {
          let summary = detailsElement.querySelector(`summary`);
          if (summary) summary.focus();
        }
      }
    });
  }
}

customElements.define(`mobile-starlight-toc`, MobileStarlightTOC);
