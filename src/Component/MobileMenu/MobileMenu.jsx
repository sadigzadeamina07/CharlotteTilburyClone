import React, { useEffect } from "react";
import { NavProvider, useNav } from "../../Context/NavContext";
import MenuRenderer from "./MenuRenderer";

function MobileMenu() {
  const { state, handleMenuState } = useNav();

  // Menu açıq olanda arxa səhifə scroll olmasın
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isOpen]);

  return (
    <>
      <div
        onClick={() => handleMenuState(false)}
        className={
          state.isOpen
            ? "fixed inset-0 bg-black/40 z-40 opacity-100 visible transition-opacity duration-300"
            : "fixed inset-0 bg-black/40 z-40 opacity-0 invisible transition-opacity duration-300"
        }
      />

      <div
        className={
          state.isOpen
            ? "fixed top-0 left-0 bottom-0 w-full sm:w-[400px] bg-white z-50 translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl"
            : "fixed top-0 left-0 bottom-0 w-full sm:w-[400px] bg-white z-50 -translate-x-full transition-transform duration-300 ease-in-out shadow-2xl"
        }
      >
        <MenuRenderer />
      </div>
    </>
  );
}

function MobileNavigation({ children }) {
  return (
    <NavProvider>
      {children}
      <MobileMenu />
    </NavProvider>
  );
}

export { MobileMenu, NavProvider, useNav };
export default MobileNavigation;