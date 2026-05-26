// src/Context/DataContext.jsx
// Data faylları artıq src/Data/ folderindədir — Context yalnız state idarə edir.

import React, { useState, createContext, useContext } from 'react';

import trendingData    from '../Data/CharlotteTilbury_TrendingNow_Full.json';
import bestSellersData from '../Data/CharlotteTilbury_BestSellers_Full.json';

import { countriesList, exchangeRates } from '../Data/countriesData';
import { menuData, mobileMenuData }     from '../Data/menuData';
import { footerLinks, topCards }        from '../Data/footerData';
import { allAccordionSections }         from '../Data/accordionData';
import { staticProductDetail }          from '../Data/staticProductDetail';

export { countriesList, menuData, mobileMenuData,
         footerLinks, topCards, allAccordionSections, staticProductDetail };

export const ProductContext = createContext();

// ─── Qiymət formatı ──────────────────────────────────────────────────────────

export const formatPrice = (basePrice, selectedCountry) => {
  if (basePrice === undefined || basePrice === null) return '';
  if (typeof basePrice === 'string' && basePrice.toUpperCase() === 'FREE') return 'FREE';

  const numPrice       = Number(basePrice) || 0;
  const currencySymbol = selectedCountry?.currency?.split(' ')[1] || '£';
  const currencyCode   = selectedCountry?.currency || 'GBP £';
  const rate           = exchangeRates[currencyCode] || 1.00;

  return `${currencySymbol}${(numPrice * rate).toFixed(2)}`;
};

// ─── Provider ────────────────────────────────────────────────────────────────

export const DataProvider = ({ children }) => {
  const [trending,         setTrending]         = useState(
    trendingData.map((p) => ({ ...p, category: p.category || 'trending' }))
  );
  const [bestSellers,      setBestSellers]      = useState(
    bestSellersData.map((p) => ({ ...p, category: p.category || 'best-sellers' }))
  );
  const [selectedCountry,  setSelectedCountry]  = useState(countriesList['AMERICAS'][0]);

  return (
    <ProductContext.Provider value={{
      trending,
      bestSellers,
      setTrending,
      setBestSellers,
      selectedCountry,
      setSelectedCountry,
      // Data
      countries:          countriesList,
      menuData,
      mobileMenuData,
      footerLinks,
      topCards,
      allAccordionSections,
      staticProductDetail,
      // Utility
      formatPrice,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
