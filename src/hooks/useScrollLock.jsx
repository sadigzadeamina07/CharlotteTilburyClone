import { useLayoutEffect } from 'react';

let activeLocks = 0;

export default function useScrollLock(shouldLock) {
  useLayoutEffect(() => {
    if (!shouldLock) return;

    activeLocks++;

    if (activeLocks === 1) {
      
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

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
        
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.touchAction = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [shouldLock]);
}