import React, { useState } from "react"
import { Search as SearchIcon, X } from "lucide-react"
import { useProduct } from "../Context/DataContext"
import { useProductSearch } from "../hooks/useProductSearch"
import ProductCard from "./Home/ProductCard"

function SearchComponent({ onClose }) {
  const { trending, bestSellers } = useProduct()

  const allProducts = [
    ...trending,
    ...bestSellers.filter(
      (b) =>
        !trending.some((t) => t.title === b.title && t.subtitle === b.subtitle),
    ),
  ]

  const { query, setQuery, sortBy, setSortBy, results, hasQuery, hasResults } =
    useProductSearch(allProducts)

  const suggestions = ["Blush", "Concealer", "Bronzer", "Foundation"]

  // Scroll funksiyası
  const scroll = (direction) => {
    const el = document.getElementById("search-best-sellers")
    if (el) el.scrollLeft += direction === "left" ? -300 : 300
  }

  return (
    <div className="fixed inset-0 md:static z-[1000] md:z-auto w-full min-h-screen bg-white/90 md:bg-white backdrop-blur-2xl md:backdrop-blur-none overflow-y-auto md:overflow-visible font-sans text-[#340c0c] pb-10">
      <div className="max-w-[1470px] mx-auto px-4 md:px-8">
        {/* Bağlama düyməsi - yalnız desktop-da görünür */}
        <div className="hidden md:flex justify-end pt-4 relative z-20">
          <button
            onClick={onClose}
            className="text-[#340c0c] hover:text-black flex items-center gap-2 group transition-all"
          >
            <span className="text-[12px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Close
            </span>
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        {/* Axtarış inputu */}
        <div className="sticky top-0 md:top-[120px] z-10 pt-4 md:pt-6 pb-2 bg-white/90 md:bg-white">
          <div className="flex items-center border-b border-[#340c0c] pb-2 md:pb-4">
            <SearchIcon
              size={24}
              strokeWidth={1.5}
              className="mr-3 text-[#340c0c]"
            />
            <input
              type="text"
              placeholder="Search Pillow Talk, Magic Cream..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-[18px] md:text-[24px] font-serif text-[#340c0c] placeholder:text-[#856d6d] outline-none bg-transparent"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="ml-3 text-[#340c0c] text-[14px] hover:text-black"
              >
                Clear
              </button>
            )}
            {/* Ləğv et düyməsi - yalnız mobilə görünür */}
            <button
              onClick={onClose}
              className="ml-4 md:hidden text-[14px] font-bold text-[#340c0c] uppercase tracking-wide"
            >
              Cancel
            </button>
          </div>

          {/* Tövsiyə sözlər */}
          <div className="mt-5 md:mt-6 mb-2">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap px-1 pb-2">
              <span className="text-[12px] md:text-[14px] text-[#856d6d] font-bold uppercase tracking-wider">
                TRENDING SEARCHES:
              </span>
              {suggestions.map((word) => (
                <button
                  key={word}
                  onClick={() => setQuery(word)}
                  className="text-[#340c0c] text-[13px] md:text-[14px] hover:text-black underline underline-offset-4"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Nəticələr */}
        <div className="mt-4">
          {hasQuery && hasResults ? (
            // Axtarış nəticələri
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[13px] text-[#856d6d] tracking-wide uppercase font-bold">
                  {results.length} Results
                </span>
                <div className="relative ml-auto flex items-center">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent text-[13px] text-[#340c0c] font-bold uppercase tracking-wide outline-none cursor-pointer pr-5"
                  >
                    <option value="Recommended">Sort: Recommended</option>
                    <option value="PriceLowToHigh">Price: Low to High</option>
                    <option value="PriceHighToLow">Price: High to Low</option>
                  </select>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#340c0c] pointer-events-none">
                    ▾
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 pb-10">
                {results.map((product, index) => (
                  <ProductCard key={index} item={product} />
                ))}
              </div>
            </div>
          ) : (
            // Nəticə yoxdursa və ya heç nə yazılmayıbsa
            <div className="pb-10">
              {hasQuery && !hasResults && (
                <div className="text-center px-4 mb-10 mt-8 border-b border-[#eae6e6] pb-10">
                  <p className="text-[15px] md:text-[16px] text-[#340c0c] tracking-wide mx-auto max-w-2xl">
                    Sorry Darling! There are no results for "{query}". Try
                    another search or shop best sellers below:
                  </p>
                </div>
              )}

              {/* Ən çox satılanlar */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-[24px] md:text-[28px] text-[#4a0014]">
                    Best Sellers
                  </h2>
                  <div className="hidden md:flex gap-2">
                    <button
                      onClick={() => scroll("left")}
                      className="w-8 h-8 rounded-full border border-[#d6cece] hover:bg-[#f9f8f6]"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => scroll("right")}
                      className="w-8 h-8 rounded-full border border-[#d6cece] hover:bg-[#f9f8f6]"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div
                  id="search-best-sellers"
                  className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-4 md:gap-x-4 md:gap-y-12 md:overflow-visible"
                >
                  {bestSellers.slice(0, 8).map((product, index) => (
                    <div key={index} className="w-[45%] md:w-auto snap-start">
                      <ProductCard item={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchComponent
