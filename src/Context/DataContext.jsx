import React, { useState, createContext, useContext, useEffect } from "react"
import trendingData from "../Data/CharlotteTilbury_TrendingNow_Full.json"
import bestSellersData from "../Data/CharlotteTilbury_BestSellers_Full.json"

import { countriesList, exchangeRates } from "../Data/countriesData"
import { menuData, mobileMenuData } from "../Data/menuData"
import { footerLinks, topCards } from "../Data/footerData"
import { allAccordionSections } from "../Data/accordionData"
export {
  countriesList,
  menuData,
  mobileMenuData,
  footerLinks,
  topCards,
  allAccordionSections,
}
export const ProductContext = createContext()
export const DataProvider = ({ children }) => {
  const formatPrice = (basePrice, selectedCountry) => {
    const numPrice = parseFloat(String(basePrice).replace(/[^0-9.]/g, ""))
    if (isNaN(numPrice)) return ""
    const currencySymbol = selectedCountry.currency.split(" ")[1]
    const rate = exchangeRates[selectedCountry.currency]
    return `${currencySymbol}${(numPrice * rate).toFixed(2)}`
  }
  const [trending, setTrending] = useState(
    trendingData.map((p) => ({ ...p, category: p.category || "trending" })),
  )
  const [bestSellers, setBestSellers] = useState(
    bestSellersData.map((p) => ({
      ...p,
      category: p.category || "best-sellers",
    })),
  )
  const [selectedCountry, setSelectedCountry] = useState(
    countriesList["AMERICAS"][0],
  )
  const convertPrice = (gbpPrice, country) => {
    const rate = exchangeRates[(country || selectedCountry).currency]
    return gbpPrice * rate
  }
  return (
    <ProductContext.Provider
      value={{
        trending,
        bestSellers,
        setTrending,
        setBestSellers,
        selectedCountry,
        setSelectedCountry,
        countries: countriesList,
        menuData,
        mobileMenuData,
        footerLinks,
        topCards,
        allAccordionSections,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)
