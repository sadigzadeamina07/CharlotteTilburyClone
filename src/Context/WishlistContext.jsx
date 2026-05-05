import React, { createContext, useContext, useState, useEffect } from 'react';
import { useBasket } from './BasketContext';

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('charlotte_wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    const { basket, handleRemoveBasket, handleAddtoBasket } = useBasket();

    useEffect(() => {
        localStorage.setItem('charlotte_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const getProductId = (product) => product.id || product.title;

    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.some(item => getProductId(item) === getProductId(product));
            if (exists) {
                return prev.filter(item => getProductId(item) !== getProductId(product));
            } else {
                return [...prev, product];
            }
        });
    };

    const isInWishlist = (product) => {
        if (!product) return false;
        return wishlist.some(item => getProductId(item) === getProductId(product));
    };

    const moveToWishlist = (product) => {
        // Add to wishlist if not already there
        if (!isInWishlist(product)) {
            setWishlist(prev => [...prev, product]);
        }
        // Remove from basket
        if (handleRemoveBasket) {
            handleRemoveBasket(product);
        }
    };

    const removeFromWishlist = (product) => {
        setWishlist(prev => prev.filter(item => getProductId(item) !== getProductId(product)));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, moveToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
