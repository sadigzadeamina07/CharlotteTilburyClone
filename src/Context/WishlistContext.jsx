import React, { createContext, useContext, useState } from 'react';
import { useBasket } from './BasketContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const { handleRemoveBasket } = useBasket();
    
    const getProductId = (product) => {
        const title = product.title || 'Mehsul';
        const shade = product.selectedShade?.name || product.shade || product.subtitle || "Standard Size";
        return title + "-" + shade;
    };

    const toggleWishlist = (product) => {
        const productId = getProductId(product);

        setWishlist((prev) => {
            const exists = prev.find((item) => getProductId(item) === productId);
            if (exists) {
                // Əgər varsa sil
                return prev.filter((item) => getProductId(item) !== productId);
            } else {
                // Əgər yoxdursa əlavə et
                return [...prev, product];
            }
        });
    };

    const isInWishlist = (product) => {
        if (!product) return false;
        const productId = getProductId(product);
        return wishlist.some((item) => getProductId(item) === productId);
    };

    const moveToWishlist = (product) => {
        const productId = getProductId(product);

        // Əgər wishlist-də yoxdursa əlavə edirik
        setWishlist((prev) => {
            const exists = prev.find((item) => getProductId(item) === productId);
            if (!exists) {
                return [...prev, product];
            }
            return prev;
        });

        // Və basket-dən silirik
        if (handleRemoveBasket) {
            handleRemoveBasket(product);
        }
    };

    const removeFromWishlist = (product) => {
        const productId = getProductId(product);
        setWishlist((prev) => prev.filter((item) => getProductId(item) !== productId));
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            toggleWishlist,
            isInWishlist,
            moveToWishlist,
            removeFromWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(WishlistContext);
};
