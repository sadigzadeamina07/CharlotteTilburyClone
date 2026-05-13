import { useLayoutEffect } from 'react';

/**
 * useScrollLock — The "invisible" scroll lock.
 *
 * When shouldLock is true:
 *   1. Measures the scrollbar width (usually 15-17px on Windows)
 *   2. Applies padding-right equal to the scrollbar width → zero layout jump
 *   3. Sets overflow: hidden on html + body
 *   4. Disables iOS elastic bounce via touch-action: none
 *
 * When shouldLock becomes false:
 *   Restores everything to exactly how it was before.
 *
 * Global lock counter ensures multiple overlays (Cart + Search + Menu) never fight.
 */

let activeLocks = 0;
let saved = {};

export default function useScrollLock(shouldLock) {
  useLayoutEffect(() => {
    if (!shouldLock) return;

    activeLocks++;

    if (activeLocks === 1) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      saved = {
        bodyOverflow:    document.body.style.overflow,
        htmlOverflow:    document.documentElement.style.overflow,
        bodyPaddingRight: document.body.style.paddingRight,
        bodyTouchAction: document.body.style.touchAction,
        bodyPosition:    document.body.style.position,
      };

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      activeLocks--;

      if (activeLocks === 0) {
        document.body.style.overflow = saved.bodyOverflow;
        document.documentElement.style.overflow = saved.htmlOverflow;
        document.body.style.paddingRight = saved.bodyPaddingRight;
        document.body.style.touchAction = saved.bodyTouchAction;
      }
    };
  }, [shouldLock]);
}
