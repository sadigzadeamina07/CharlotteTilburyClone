import React, { createContext, useContext, useState } from "react";
import { useBasket } from "./BasketContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { removeFromBasket } = useBasket();

  // Hər iki tərəfdə shade varsa shade ilə də müqayisə et,
  // biri shade-siz gəlirsə (məs. ProductCard-dan) yalnız title kifayətdir
  const isSame = (a, b) => {
    if (a.title !== b.title) return false;
    const shadeA = a.selectedShade?.name || "";
    const shadeB = b.selectedShade?.name || "";
    if (!shadeA || !shadeB) return true;
    return shadeA === shadeB;
  };

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
