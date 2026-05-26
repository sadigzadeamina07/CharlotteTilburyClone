import React, { createContext, useContext, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };
  const toggleSearch = () => {
    if (isSearchOpen) setSearchQuery("");
    setIsSearchOpen(!isSearchOpen);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <UIContext.Provider value={{
      isSearchOpen, openSearch, closeSearch, toggleSearch,
      searchQuery, setSearchQuery,
      isCartOpen, openCart, closeCart, toggleCart,
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}

export default UIContext;