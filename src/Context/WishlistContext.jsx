import React, { createContext, useContext, useState } from "react";
import { useBasket } from "./BasketContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { removeFromBasket } = useBasket();

const isSame = (a, b) =>
  a.title === b.title &&
  (a.selectedShade?.name || a.shade || "") === (b.selectedShade?.name || b.shade || "");

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((item) => isSame(item, product))
        ? prev.filter((item) => !isSame(item, product))
        : [...prev, product]
    );
  };
const isInWishlist = (product) => product && wishlist.some((item) => isSame(item, product));

  const moveToWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((item) => isSame(item, product)) ? prev : [...prev, product]
    );
    removeFromBasket(product);
  };

  const removeFromWishlist = (product) => {
    setWishlist((prev) => prev.filter((item) => !isSame(item, product)));
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider value={{
      wishlist,
      wishlistCount,
      toggleWishlist,
      isInWishlist,
      moveToWishlist,
      removeFromWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}