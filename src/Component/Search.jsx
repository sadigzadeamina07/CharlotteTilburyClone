import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search as SearchIcon, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProduct } from '../Context/DataContext';
import { useBasket } from '../Context/BasketContext';
import { useWishlist } from '../Context/WishlistContext';
import { Link } from 'react-router';
import ProductCard from './Home/ProductCard';

export default function SearchComponent({ onClose }) {
  const { trending } = useProduct(); 
  const { handleAddtoBasket } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState('Recommended');

  const carouselRef = useRef(null);

  const uniqueTrending = useMemo(() => {
    const seen = new Set();
    return trending.filter(p => {
      const sub = p.subtitle || p.subTitle || '';
      const id = `${p.title?.trim().toLowerCase()}-${sub.trim().toLowerCase()}`; 
      if (!p.title || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [trending]);

  // Debouncing for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); 
    return () => clearTimeout(handler);
  }, [query]);

  // Suggestions logic
  const defaultSuggestions = ['Blush', 'Concealer', 'Bronzer', 'Foundation'];
  const [suggestions, setSuggestions] = useState(defaultSuggestions);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      const dynamic = uniqueTrending
        .filter(p => p.title?.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .map(p => p.title)
        .slice(0, 4);
      setSuggestions(dynamic.length > 0 ? dynamic : defaultSuggestions);
    } else {
      setSuggestions(defaultSuggestions);
    }
  }, [debouncedQuery, uniqueTrending]);

  // Case-insensitive filtering + sorting
  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return [];
    let results = uniqueTrending.filter(product => 
      product.title?.toLowerCase().includes(debouncedQuery.toLowerCase()) || 
      (product.subtitle && product.subtitle.toLowerCase().includes(debouncedQuery.toLowerCase()))
    );

    // Parse price string to number for sorting
    const parsePrice = (p) => {
      const match = p?.price?.match(/[\d.]+/);
      return match ? parseFloat(match[0]) : 0;
    };

    if (sortBy === 'PriceLowToHigh') {
      results = [...results].sort((a, b) => parsePrice(a) - parsePrice(b));
    } else if (sortBy === 'PriceHighToLow') {
      results = [...results].sort((a, b) => parsePrice(b) - parsePrice(a));
    }

    return results;
  }, [debouncedQuery, uniqueTrending, sortBy]);

  const hasQuery = debouncedQuery.length > 0;
  const hasResults = filteredProducts.length > 0;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 md:static md:inset-auto z-[1000] md:z-auto w-full min-h-screen font-sans text-[#340c0c] pb-10 bg-white/90 md:bg-white backdrop-blur-2xl md:backdrop-blur-none overflow-y-auto md:overflow-visible transition-all duration-500 animate-in fade-in">

      <div className="max-w-[1470px] mx-auto px-4 md:px-8">
        
        {/* Desktop Close Button */}
        <div className="hidden md:flex justify-end pt-4 mb-[-1rem] relative z-20">
          <button onClick={onClose} className="text-[#340c0c] hover:text-black flex items-center gap-2 group transition-all">
            <span className="font-sans text-[12px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        {/* Search Header - Sticky */}
        <div className="sticky top-0 md:top-[120px] z-10 pt-4 md:pt-6 pb-2 bg-white/90 md:bg-white backdrop-blur-xl md:backdrop-blur-none">
          <div className="relative flex items-center border-b border-[#340c0c] pb-2 md:pb-4 transition-all duration-300">
            <SearchIcon size={24} strokeWidth={1.5} className="mr-3 text-[#340c0c]" />
            
            <input 
              type="text" 
              placeholder="Search Pillow Talk, Magic Cream..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow w-full text-[18px] md:text-[24px] font-serif text-[#340c0c] placeholder:text-[#856d6d] focus:outline-none bg-transparent"
              autoFocus
            />
            
            {query.length > 0 && (
              <button 
                onClick={() => setQuery('')} 
                className="ml-3 text-[#340c0c] font-sans text-[14px] hover:text-black transition-colors"
              >
                Clear
              </button>
            )}

            <button onClick={onClose} className="ml-4 md:hidden text-[14px] font-sans font-bold text-[#340c0c] uppercase tracking-wide">
               Cancel
            </button>
          </div>

          {/* Quick Links / Suggestions */}
          <div className="mt-5 md:mt-6 mb-2">
            <div className="flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap px-1 pb-2">
              <span className="text-[12px] md:text-[14px] font-sans text-[#856d6d] font-bold shrink-0 uppercase tracking-wider">TRENDING SEARCHES:</span>
              {suggestions.map((sug, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setQuery(sug)}
                  className="text-[#340c0c] text-[13px] md:text-[14px] font-sans hover:text-black underline underline-offset-4 decoration-[1px] decoration-[#d6cece] hover:decoration-[#340c0c] transition-colors shrink-0"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="mt-4">
          {hasQuery && hasResults ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-6">
                <span className="font-sans text-[13px] text-[#856d6d] tracking-wide uppercase font-bold">{filteredProducts.length} Results</span>
                
                <div className="relative group ml-auto flex items-center">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent font-sans text-[13px] text-[#340c0c] font-bold uppercase tracking-wide focus:outline-none cursor-pointer pr-5 hover:text-black transition-colors"
                  >
                    <option value="Recommended">Sort: Recommended</option>
                    <option value="PriceLowToHigh">Price: Low to High</option>
                    <option value="PriceHighToLow">Price: High to Low</option>
                  </select>
                  <ChevronDownIcon />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 pb-10">
                {filteredProducts.map((product, idx) => (
                  <ProductCard 
                    key={idx} 
                    item={product} 
                    handleAddtoBasket={handleAddtoBasket} 
                    toggleWishlist={toggleWishlist} 
                    isLiked={isInWishlist(product)} 
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Empty State Logic or Initial State */
            <div className="animate-in fade-in duration-500 pb-10">
              {hasQuery && !hasResults && (
                <div className="text-center px-4 mb-10 mt-8 border-b border-[#eae6e6] pb-10">
                  <p className="font-sans text-[15px] md:text-[16px] text-[#340c0c] tracking-wide mx-auto max-w-2xl">
                    Sorry Darling! There are no results for "{debouncedQuery}". Try another search or shop best sellers below:
                  </p>
                </div>
              )}

              <div className="mt-8">
                <h2 className="font-serif text-[24px] md:text-[28px] text-[#4a0014] mb-6 text-left">Best Sellers</h2>
                <div className="relative group">
                  {/* Horizontal Carousel for Best Sellers on Mobile / Grid on Desktop */}
                  <div 
                    ref={carouselRef}
                    className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-4 md:gap-x-4 md:gap-y-12 md:overflow-visible md:snap-none"
                  >
                    {uniqueTrending.slice(0, 8).map((product, idx) => (
                      <div key={idx} className="w-[45%] md:w-auto shrink-0 snap-start flex">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ChevronDownIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#340c0c]">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


