import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search as SearchIcon, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProduct } from '../Context/DataContext';
import { useBasket } from '../Context/BasketContext';
import { useWishlist } from '../Context/WishlistContext';
import { Link } from 'react-router';

export default function SearchComponent({ onClose }) {
  const { trending } = useProduct(); 
  const { handleAddtoBasket } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState('Recommended');

  const carouselRef = useRef(null);

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
      const dynamic = trending
        .filter(p => p.title?.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .map(p => p.title)
        .slice(0, 4);
      setSuggestions(dynamic.length > 0 ? dynamic : defaultSuggestions);
    } else {
      setSuggestions(defaultSuggestions);
    }
  }, [debouncedQuery, trending]);

  // Case-insensitive filtering + sorting
  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return [];
    let results = trending.filter(product => 
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
  }, [debouncedQuery, trending, sortBy]);

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
    <div className="fixed inset-0 z-[1000] w-full min-h-screen font-sans text-[#340c0c] pb-10 bg-white/70 backdrop-blur-2xl overflow-y-auto transition-all duration-500 animate-in fade-in">

      <div className="max-w-[1470px] mx-auto px-4 md:px-8">
        
        {/* Desktop Close Button */}
        <div className="hidden md:flex justify-end pt-4 mb-[-1rem] relative z-20">
          <button onClick={onClose} className="text-[#340c0c] hover:text-black flex items-center gap-2 group transition-all">
            <span className="font-sans text-[12px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        {/* Search Header - Sticky */}
        <div className="sticky top-0 z-10 pt-4 md:pt-6 pb-2">
          <div className="relative flex items-center bg-white/50 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-2xl md:rounded-full px-4 py-3 md:py-4 transition-all duration-300">
            <SearchIcon size={24} strokeWidth={1.5} className="mr-3 text-[#340c0c]/70" />
            
            <input 
              type="text" 
              placeholder="Search Pillow Talk, Magic Cream..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow w-full text-[16px] md:text-[18px] font-sans text-[#340c0c] placeholder:text-[#340c0c]/50 focus:outline-none bg-transparent"
              autoFocus
            />
            
            {query.length > 0 && (
              <button 
                onClick={() => setQuery('')} 
                className="ml-3 text-[#340c0c] hover:text-black transition-colors"
                title="Clear"
              >
                <X size={20} strokeWidth={1.5} />
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
                    product={product} 
                    handleAddtoBasket={handleAddtoBasket} 
                    toggleWishlist={toggleWishlist} 
                    isInWishlist={isInWishlist} 
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Empty State Logic or Initial State */
            <div className="animate-in fade-in duration-500 pb-10">
              {hasQuery && !hasResults && (
                <div className="text-center px-4 mb-10 mt-8 border-b border-[#eae6e6] pb-10">
                  <h3 className="font-serif text-[24px] md:text-[28px] text-[#340c0c] mb-2">0 results for "{debouncedQuery}"</h3>
                  <p className="font-sans text-[15px] md:text-[16px] text-[#856d6d] tracking-wide leading-relaxed mx-auto max-w-2xl">
                    Sorry Darling! We couldn't find any matches. Try another search or shop our best sellers below:
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
                    {trending.slice(0, 8).map((product, idx) => (
                      <div key={idx} className="w-[45%] md:w-auto shrink-0 snap-start">
                        <ProductCard 
                          product={product} 
                          handleAddtoBasket={handleAddtoBasket} 
                          toggleWishlist={toggleWishlist} 
                          isInWishlist={isInWishlist} 
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

const ProductCard = ({ product, handleAddtoBasket, toggleWishlist, isInWishlist }) => {
  // Simulate badges based on title (or standard if missing)
  const isAwardWinning = product.title?.toLowerCase().includes('bronzer') || product.title?.toLowerCase().includes('flawless');
  const isSave = product.title?.toLowerCase().includes('secrets') || product.title?.toLowerCase().includes('kit');

  return (
    <div className="flex flex-col group relative w-full h-full">
      {/* Product Image Box */}
      <Link to='/product' state={{ product }} className="relative bg-[#f5f5f5] w-full aspect-square block overflow-hidden">
        <div className="w-full h-full p-4">
          <img 
            src={product.images?.main || product.cardImages?.main || product.image} 
            alt={product.title} 
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Wishlist Heart Icon (Empty outline by default) */}
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className="absolute top-2 right-2 z-10 text-black p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
        >
          {isInWishlist?.(product) ? <Heart size={18} fill="#4a0014" color="#4a0014" strokeWidth={1} /> : <Heart size={18} strokeWidth={1} color="#340c0c" />}
        </button>
      </Link>

      {/* Badges (Positioned exactly below the image, full width) */}
      {isAwardWinning && (
        <div className="bg-[#fce3e1] text-[#8a2b3b] text-[10px] font-sans tracking-widest font-bold uppercase px-3 py-1.5 text-left">
          AWARD WINNING
        </div>
      )}
      {isSave && !isAwardWinning && (
        <div className="bg-[#fce3e1] text-[#8a2b3b] text-[10px] font-sans tracking-widest font-bold uppercase px-3 py-1.5 text-left">
          SAVE 20%
        </div>
      )}
      {!isAwardWinning && !isSave && (
        <div className="h-[26px]"></div> // Spacer to keep height consistent
      )}
      
      {/* Product Details (Left aligned) */}
      <div className="flex flex-col flex-grow text-left pt-3 px-1">
        <Link to='/product' state={{ product }} className="group-hover:text-gray-600 transition-colors">
          <h3 className="font-sans uppercase text-[12px] md:text-[14px] font-bold text-[#340c0c] tracking-widest line-clamp-2 min-h-[2.5rem] mb-1 leading-tight">
            {product.title}
          </h3>
        </Link>
        <div className="mt-auto flex flex-col h-full justify-end">
          <p className="text-[#856d6d] font-sans text-[13px] tracking-wide mb-2 line-clamp-1">
            {product.subtitle || product.subTitle || "Standard Size"}
          </p>
          <p className="text-[#340c0c] font-sans text-[14px] tracking-wide mb-4 font-bold">{product.price}</p>
          
          <button 
            onClick={() => handleAddtoBasket(product)}
            className="w-full bg-black text-white py-3 font-sans uppercase tracking-widest text-[12px] font-bold transition-colors duration-300 rounded-none hover:bg-[#333]"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};
