import React, { useEffect, useRef, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useProduct } from "../Context/DataContext";
import { useBasket } from "../Context/BasketContext";
import { useWishlist } from "../Context/WishlistContext";
import ProductCard from "./Home/ProductCard";

function SearchComponent({ onClose }) {
  const { trending } = useProduct();
  const { handleAddtoBasket } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");

  const carouselRef = useRef(null);

  const defaultSuggestions = ["Blush", "Concealer", "Bronzer", "Foundation"];

  // Input yazılanda 300ms gözləyir, sonra search işə düşür
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Təkrar məhsulları listdən çıxarır
  const products = [];
  const names = [];

  trending.forEach((product) => {
    const subtitle = product.subtitle || product.subTitle || "";
    const name = `${product.title}-${subtitle}`.toLowerCase();

    if (product.title && !names.includes(name)) {
      names.push(name);
      products.push(product);
    }
  });

  let suggestions = defaultSuggestions;

  if (debouncedQuery) {
    const foundSuggestions = products
      .filter((product) => {
        return product.title
          ?.toLowerCase()
          .includes(debouncedQuery.toLowerCase());
      })
      .slice(0, 4)
      .map((product) => product.title);

    if (foundSuggestions.length > 0) {
      suggestions = foundSuggestions;
    }
  }

  let results = [];

  if (debouncedQuery) {
    results = products.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const subtitle = product.subtitle?.toLowerCase() || "";
      const text = debouncedQuery.toLowerCase();

      return title.includes(text) || subtitle.includes(text);
    });
  }

  const getPrice = (product) => {
    const price = product.price || "0";
    const number = String(price).match(/[\d.]+/);

    return number ? Number(number[0]) : 0;
  };

  if (sortBy === "PriceLowToHigh") {
    results = [...results].sort((a, b) => getPrice(a) - getPrice(b));
  }

  if (sortBy === "PriceHighToLow") {
    results = [...results].sort((a, b) => getPrice(b) - getPrice(a));
  }

  const hasQuery = debouncedQuery.length > 0;
  const hasResults = results.length > 0;

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed inset-0 md:static z-[1000] md:z-auto w-full min-h-screen bg-white/90 md:bg-white backdrop-blur-2xl md:backdrop-blur-none overflow-y-auto md:overflow-visible font-sans text-[#340c0c] pb-10 transition-all duration-500 animate-in fade-in">
      <div className="max-w-[1470px] mx-auto px-4 md:px-8">
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

        {/* Search input yuxarıda qalır */}
        <div className="sticky top-0 md:top-[120px] z-10 pt-4 md:pt-6 pb-2 bg-white/90 md:bg-white backdrop-blur-xl md:backdrop-blur-none">
          <div className="flex items-center border-b border-[#340c0c] pb-2 md:pb-4 transition-all duration-300">
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
                className="ml-3 text-[#340c0c] text-[14px] hover:text-black transition-colors"
              >
                Clear
              </button>
            )}

            <button
              onClick={onClose}
              className="ml-4 md:hidden text-[14px] font-bold text-[#340c0c] uppercase tracking-wide"
            >
              Cancel
            </button>
          </div>

          {/* Suggestion düymələri */}
          <div className="mt-5 md:mt-6 mb-2">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap px-1 pb-2">
              <span className="text-[12px] md:text-[14px] text-[#856d6d] font-bold uppercase tracking-wider">
                TRENDING SEARCHES:
              </span>

              {suggestions.map((word) => (
                <button
                  key={word}
                  onClick={() => setQuery(word)}
                  className="text-[#340c0c] text-[13px] md:text-[14px] hover:text-black underline underline-offset-4 decoration-[1px] decoration-[#d6cece] hover:decoration-[#340c0c] transition-colors"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          {hasQuery && hasResults ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[13px] text-[#856d6d] tracking-wide uppercase font-bold">
                  {results.length} Results
                </span>

                <div className="relative ml-auto flex items-center">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent text-[13px] text-[#340c0c] font-bold uppercase tracking-wide outline-none cursor-pointer pr-5 hover:text-black transition-colors"
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

              {/* Mobildə 2 sütun, PC-də 4 sütun */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 pb-10">
                {results.map((product, index) => (
                  <ProductCard
                    key={`${product.title}-${index}`}
                    item={product}
                    handleAddtoBasket={handleAddtoBasket}
                    toggleWishlist={toggleWishlist}
                    isLiked={isInWishlist(product)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500 pb-10">
              {hasQuery && !hasResults && (
                <div className="text-center px-4 mb-10 mt-8 border-b border-[#eae6e6] pb-10">
                  <p className="text-[15px] md:text-[16px] text-[#340c0c] tracking-wide mx-auto max-w-2xl">
                    Sorry Darling! There are no results for "{debouncedQuery}".
                    Try another search or shop best sellers below:
                  </p>
                </div>
              )}

              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-[24px] md:text-[28px] text-[#4a0014]">
                    Best Sellers
                  </h2>

                  <div className="hidden md:flex gap-2">
                    <button
                      onClick={scrollLeft}
                      className="w-8 h-8 rounded-full border border-[#d6cece] hover:bg-[#f9f8f6] transition-colors"
                    >
                      ‹
                    </button>

                    <button
                      onClick={scrollRight}
                      className="w-8 h-8 rounded-full border border-[#d6cece] hover:bg-[#f9f8f6] transition-colors"
                    >
                      ›
                    </button>
                  </div>
                </div>

                {/* Mobildə horizontal scroll, PC-də grid */}
                <div
                  ref={carouselRef}
                  className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-4 md:gap-x-4 md:gap-y-12 md:overflow-visible"
                >
                  {products.slice(0, 8).map((product, index) => (
                    <div
                      key={`${product.title}-${index}`}
                      className="w-[45%] md:w-auto snap-start"
                    >
                      <ProductCard
                        item={product}
                        handleAddtoBasket={handleAddtoBasket}
                        toggleWishlist={toggleWishlist}
                        isLiked={isInWishlist(product)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;