import React, { createContext, useContext, useState } from "react";
import { useBasket } from "./BasketContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { handleRemoveBasket } = useBasket();

  const getProductId = (product) => {
    const title = product.title || "Unknown";
    const shade = product.selectedShade?.name || product.shade || product.subtitle || "Standard Size";
    return `${title}-${shade}`;
  };

  const toggleWishlist = (product) => {
    const id = getProductId(product);
    setWishlist((prev) => {
      const exists = prev.find((item) => getProductId(item) === id);
      if (exists) {
        return prev.filter((item) => getProductId(item) !== id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (product) => {
    if (!product) return false;
    const id = getProductId(product);
    return wishlist.some((item) => getProductId(item) === id);
  };

  const moveToWishlist = (product) => {
    const id = getProductId(product);
    setWishlist((prev) => {
      const exists = prev.find((item) => getProductId(item) === id);
      if (!exists) return [...prev, product];
      return prev;
    });
    if (handleRemoveBasket) {
      handleRemoveBasket(product);
    }
  };

  const removeFromWishlist = (product) => {
    const id = getProductId(product);
    setWishlist((prev) => prev.filter((item) => getProductId(item) !== id));
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
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
