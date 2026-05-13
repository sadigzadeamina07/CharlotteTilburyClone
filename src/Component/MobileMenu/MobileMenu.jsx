import React, { useEffect } from "react";
import { NavProvider, useNav } from "../../Context/NavContext";
import MenuRenderer from "./MenuRenderer";

export function MobileMenu() {
  const { state, handleMenuState } = useNav(); // changing toggle to handleMenuState logically in the context later, or it's closeMenu. Wait, the request said: Naming: Komponentlərdə və funksiyalarda 'humanist' adlandırma tətbiq et (məsələn: toggle yerinə handleMenuState). I will check NavContext and others.
  
  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          state.isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => handleMenuState(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-full sm:w-[400px] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          state.isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MenuRenderer />
      </div>
    </>
  );
}

export { NavProvider, useNav };

export default function MobileNavigation({ children }) {
  return (
    <NavProvider>
      {children}
      <MobileMenu />
    </NavProvider>
  );
}
