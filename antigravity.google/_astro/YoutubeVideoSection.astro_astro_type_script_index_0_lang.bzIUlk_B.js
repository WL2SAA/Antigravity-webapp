/**
 * ============================================================================
 * YOUTUBE VIDEO SECTION & MODAL (YoutubeVideoSection.astro...js)
 * ============================================================================
 * Controls video section presentation:
 *  1. Scroll-triggered scale-in animation via GSAP ScrollTrigger.
 *  2. Auto-playing muted video preview when in viewport.
 *  3. Magnetic play cursor follower over video.
 *  4. Launching full-screen modal YouTube dialog with iframe auto-play.
 */

import { t as gsap } from "./gsap.DWxn8li7.js";
import { t as ScrollTrigger } from "./ScrollTrigger.DBzICErp.js";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

var initVideoSections = () => {
  document.querySelectorAll(`[data-youtube-video-section]`).forEach(section => {
    if (section._youtubeSectionInitialized) return;
    section._youtubeSectionInitialized = true;

    let videoWrapper = section.querySelector(`[data-video-wrapper]`);
    let previewVideo = section.querySelector(`[data-video]`);
    let playCursor = section.querySelector(`[data-cursor]`);
    let modalDialog = section.querySelector(`[data-modal-youtube]`);

    if (!videoWrapper || !playCursor) return;

    let isModalOpen = false;
    let mouseX = 0;
    let mouseY = 0;
    let isCursorActive = false;
    let modalHelperInstance = null;

    // ------------------------------------------------------------------------
    // 1. SCROLL TRIGGER: Scale section up smoothly as user scrolls into view
    // ------------------------------------------------------------------------
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: `top bottom`,
        end: `top center`,
        scrub: 1
      },
      scale: 0.5,
      ease: `power2.out`
    });

    // ------------------------------------------------------------------------
    // 2. AUTO-PLAY / PAUSE PREVIEW: Play muted preview when in viewport
    // ------------------------------------------------------------------------
    let safelyPlayVideo = (video) => {
      if (!video) return;
      video.muted = true;
      let playPromise = video.play();
      if (playPromise !== void 0) {
        playPromise.catch((err) => {
          console.warn(`Autoplay prevented by browser:`, err);
        });
      }
    };

    ScrollTrigger.create({
      trigger: section,
      start: `top bottom`,
      end: `bottom top`,
      onEnter: () => safelyPlayVideo(previewVideo),
      onLeave: () => previewVideo?.pause(),
      onEnterBack: () => safelyPlayVideo(previewVideo),
      onLeaveBack: () => previewVideo?.pause()
    });

    // ------------------------------------------------------------------------
    // 3. MAGNETIC PLAY CURSOR: Floats over video preview
    // ------------------------------------------------------------------------
    gsap.set(playCursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
    let moveCursorX = gsap.quickTo(playCursor, `x`, { duration: 0.35, ease: `power2.out` });
    let moveCursorY = gsap.quickTo(playCursor, `y`, { duration: 0.35, ease: `power2.out` });

    let isInsideVideo = (x, y) => {
      let rect = videoWrapper.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    let activateCursor = (event) => {
      if (isCursorActive || isModalOpen) return;
      isCursorActive = true;
      videoWrapper.style.cursor = `none`;
      mouseX = event.clientX;
      mouseY = event.clientY;
      updateCursorPosition(true);
      gsap.to(playCursor, { scale: 1, opacity: 1, duration: 0.3, ease: `back.out(1.7)` });
    };

    let deactivateCursor = () => {
      if (!isCursorActive) return;
      isCursorActive = false;
      videoWrapper.style.cursor = ``;
      gsap.to(playCursor, { scale: 0, opacity: 0, duration: 0.2, ease: `power2.in` });
    };

    let updateCursorPosition = (instant = false) => {
      if (isModalOpen) return;
      let rect = videoWrapper.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        if (isCursorActive) deactivateCursor();
        return;
      }
      if (!(mouseX >= rect.left - 50 && mouseX <= rect.right + 50 && mouseY >= rect.top - 50 && mouseY <= rect.bottom + 50)) {
        if (isCursorActive) deactivateCursor();
        return;
      }
      let scaleX = rect.width > 0 ? videoWrapper.offsetWidth / rect.width : 1;
      let scaleY = rect.height > 0 ? videoWrapper.offsetHeight / rect.height : 1;
      let relX = (mouseX - rect.left) * scaleX;
      let relY = (mouseY - rect.top) * scaleY;

      if (instant) {
        gsap.set(playCursor, { x: relX, y: relY });
      } else {
        moveCursorX(relX);
        moveCursorY(relY);
      }
    };

    let onMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!isModalOpen && (!isCursorActive && isInsideVideo(event.clientX, event.clientY))) {
        activateCursor(event);
      } else if (isCursorActive) {
        updateCursorPosition();
      }
    };

    videoWrapper.addEventListener(`mousemove`, onMouseMove);
    videoWrapper.addEventListener(`mouseenter`, activateCursor);
    videoWrapper.addEventListener(`mouseleave`, deactivateCursor);
    window.addEventListener(`scroll`, () => { if (isCursorActive) updateCursorPosition(); }, { passive: true });
    window.addEventListener(`mousemove`, onMouseMove, { passive: true });

    // ------------------------------------------------------------------------
    // 4. MODAL DIALOG LAUNCHER: Opens YouTube dialog on click
    // ------------------------------------------------------------------------
    videoWrapper.addEventListener(`click`, () => {
      isModalOpen = true;
      deactivateCursor();
      if (modalDialog) {
        if (!modalHelperInstance && window.ModalYoutubeHelper) {
          modalHelperInstance = new window.ModalYoutubeHelper(modalDialog);
        }
        if (modalHelperInstance) {
          modalHelperInstance.show();
        }
      }
    });

    if (modalDialog) {
      modalDialog.addEventListener(`close`, () => {
        isModalOpen = false;
        if (isInsideVideo(mouseX, mouseY)) {
          activateCursor({ clientX: mouseX, clientY: mouseY });
        }
      });
    }
  });
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, initVideoSections);
} else {
  initVideoSections();
}
