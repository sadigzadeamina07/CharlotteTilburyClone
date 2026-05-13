import React, { createContext, useContext, useState, useCallback, useLayoutEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   UIContext — The Humanist State Manager
   
   Centralized global UI state:
   • isSearchOpen / isCartOpen / isMobileMenuOpen
   • searchQuery (shared across Header pill + SearchOverlay)
   • Automatic scroll-lock with scrollbar-width compensation
   • Zero prop drilling — components just call useUI()
   ═══════════════════════════════════════════════════════════════ */

const UIContext = createContext(null);

/* ── Scroll Lock Engine ──────────────────────────────────────
   - Tracks active lock count (search + cart + menu can overlap)
   - Measures scrollbar width → applies padding-right to prevent layout jump
   - Handles iOS Safari touch-action bounce
   ──────────────────────────────────────────────────────────── */
let activeLocks = 0;
let savedStyles = {};

function lockScroll() {
  activeLocks++;
  if (activeLocks === 1) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    savedStyles = {
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
      bodyPaddingRight: document.body.style.paddingRight,
      bodyTouchAction: document.body.style.touchAction,
      bodyPosition: document.body.style.position,
    };

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
}

function unlockScroll() {
  activeLocks--;
  if (activeLocks <= 0) {
    activeLocks = 0;
    document.body.style.overflow = savedStyles.bodyOverflow || '';
    document.documentElement.style.overflow = savedStyles.htmlOverflow || '';
    document.body.style.paddingRight = savedStyles.bodyPaddingRight || '';
    document.body.style.touchAction = savedStyles.bodyTouchAction || '';
  }
}

/* ── Provider ─────────────────────────────────────────────── */
export function UIProvider({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ── Toggle functions (stable refs via useCallback) ──
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, []);
  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => {
      if (prev) setSearchQuery('');
      return !prev;
    });
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);

  // ── Automatic scroll lock whenever ANY overlay is open ──
  useLayoutEffect(() => {
    if (isSearchOpen) lockScroll();
    return () => { if (isSearchOpen) unlockScroll(); };
  }, [isSearchOpen]);

  useLayoutEffect(() => {
    if (isCartOpen) lockScroll();
    return () => { if (isCartOpen) unlockScroll(); };
  }, [isCartOpen]);

  useLayoutEffect(() => {
    if (isMobileMenuOpen) lockScroll();
    return () => { if (isMobileMenuOpen) unlockScroll(); };
  }, [isMobileMenuOpen]);

  const value = {
    // Search
    isSearchOpen,
    openSearch,
    closeSearch,
    toggleSearch,
    searchQuery,
    setSearchQuery,

    // Cart
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,

    // Mobile Menu
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

/* ── Consumer Hook ─────────────────────────────────────────
   Usage:  const { isSearchOpen, openSearch } = useUI();
   ────────────────────────────────────────────────────────── */
export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a <UIProvider>');
  }
  return context;
}

export default UIContext;
