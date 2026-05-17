import React, { useState, createContext, useContext } from 'react';
import trendingData from '../Data/CharlotteTilbury_TrendingNow_Full.json';
import bestSellersData from '../Data/CharlotteTilbury_BestSellers_Full.json';

const ProductContext = createContext();

export const DataProvider = ({ children }) => {
    const defaultTrending = Array.isArray(trendingData) ? trendingData : (trendingData?.default || []);
    const defaultBestSellers = Array.isArray(bestSellersData) ? bestSellersData : (bestSellersData?.default || []);
    
    const [trending, setTrending] = useState(defaultTrending);
    const [bestSellers, setBestSellers] = useState(defaultBestSellers);

    return (
        <ProductContext.Provider value={{ trending, bestSellers, setTrending, setBestSellers }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    return useContext(ProductContext);
};