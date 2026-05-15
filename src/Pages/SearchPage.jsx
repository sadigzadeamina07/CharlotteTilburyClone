import React, { useEffect, useRef, useCallback } from 'react';
import { X, Heart, Sparkles, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useProduct } from '../Context/DataContext';
import { useBasket } from '../Context/BasketContext';
import { useWishlist } from '../Context/WishlistContext';
import useSearch from '../hooks/useSearch';

export default function SearchPage() {
  const { trending } = useProduct();
  const { handleAddtoBasket } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const {
    query, setQuery, debouncedQuery, sortBy, setSortBy,
    searchResults, dynamicSuggestions,
    clearSearch,
  } = useSearch(trending);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') navigate('/home'); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  const handleClose = useCallback(() => {
    clearSearch();
    navigate('/home');
  }, [clearSearch, navigate]);

  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value);
  }, [setQuery]);

  const hasQuery = debouncedQuery.trim().length > 0;
  const hasResults = searchResults.length > 0;

  // Pagination Logic
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;
  const currentItems = hasQuery ? searchResults : (trending || []);
  
  // Make sure we have at least 5 pages for demonstration if the items array is very small
  const realTotalPages = Math.ceil(currentItems.length / itemsPerPage) || 1;
  const totalPages = Math.max(5, realTotalPages); 

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // If we are artificially extending pages, we loop the items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = Array.from({ length: itemsPerPage }).map((_, i) => {
    const itemIndex = (startIndex + i) % (currentItems.length || 1);
    return currentItems[itemIndex];
  }).filter(Boolean);

  return (
    <div className="bg-white min-h-[calc(100vh-100px)] font-sans">
      <div className="max-w-[calc(71.375rem+1.5rem)] mx-auto px-4 md:px-8 flex flex-col relative pt-4">

        {/* ── Search Bar ── */}
        <div className="sticky top-[115px] md:top-[160px] bg-white z-[50] pt-4 pb-4">
          <div className="relative flex items-center border border-[#340c0c] hover:border-[#a06464] focus-within:border-[#340c0c] rounded-full px-5 py-2.5 bg-white transition-all duration-300">
            <button onClick={handleClose} className="mr-3 shrink-0 text-[#856d6d] hover:text-[#340c0c] transition-colors">
              <X size={20} strokeWidth={1.5} />
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search product, shade, colour"
              value={query}
              onChange={handleInputChange}
              className="flex-grow w-full text-[14px] md:text-[15px] text-[#340c0c] placeholder:text-[#a39696] focus:outline-none bg-transparent"
              autoComplete="off"
            />
          </div>
        </div>

        {/* ── Suggestions (Not Sticky) ── */}
        <div className="mt-1 flex flex-wrap items-center gap-3 pb-4 px-1">
          <span className="text-[13px] font-sans text-[#340c0c] font-bold">Suggestions:</span>
          <div className="flex items-center gap-4">
            {dynamicSuggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(sug)}
                className="text-[13px] text-[#856d6d] font-sans hover:text-[#340c0c] underline underline-offset-4 decoration-transparent hover:decoration-[#340c0c] transition-all capitalize"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results Header & Sort ── */}
        <div className="flex flex-row justify-between items-center mt-4 mb-6 pb-2 gap-4 px-1">
          <div className="text-[13px] text-[#856d6d] font-sans">
            {hasQuery ? searchResults.length : trending?.length || 0} results
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[13px] text-[#340c0c] font-sans">Sort:</span>
            <div className="relative cursor-pointer">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-[13px] text-[#340c0c] font-sans focus:outline-none cursor-pointer pr-4"
              >
                <option value="Recommended">Recommended</option>
                <option value="PriceLowToHigh">Price Low - High</option>
                <option value="PriceHighToLow">Price High - Low</option>
              </select>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {/* ── Results Grid ── */}
        <div className="pb-20 flex-grow">
          {hasQuery && !hasResults ? (
            <div className="text-center py-20">
              <Sparkles size={32} className="text-[#d6cece] mx-auto mb-4" />
              <p className="text-[15px] text-[#856d6d] mb-6">Sorry Darling! We couldn't find a match for "{debouncedQuery}".</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                {paginatedItems.map((product, idx) => (
                  <ProductCard
                    key={`${product.id || product.title}-${idx}`}
                    product={product}
                    handleAddtoBasket={handleAddtoBasket}
                    toggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist}
                    onNavigate={handleClose}
                  />
                ))}
              </div>
              
              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 mt-16 border-t border-[#eae6e6] pt-8">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${currentPage === 1 ? 'text-[#d6cece] cursor-not-allowed' : 'text-[#856d6d] hover:bg-[#f9f8f6]'}`}
                  >
                    <ChevronRight size={16} className="rotate-180" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 flex items-center justify-center text-[13px] font-bold rounded transition-colors ${page === currentPage ? 'bg-[#f4f4f4] text-[#340c0c]' : 'text-[#856d6d] hover:bg-[#f9f8f6]'}`}
                    >
                      {page}
                    </button>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${currentPage === totalPages ? 'text-[#d6cece] cursor-not-allowed' : 'text-[#856d6d] hover:bg-[#f9f8f6]'}`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const ProductCard = React.memo(function ProductCard({ product, handleAddtoBasket, toggleWishlist, isInWishlist, onNavigate }) {
  const title = product.title || '';
  const isAwardWinning = title.toLowerCase().includes('bronzer') || title.toLowerCase().includes('flawless');
  const isSave = title.toLowerCase().includes('secrets') || title.toLowerCase().includes('kit') || title.toLowerCase().includes('duo');
  const isNew = title.toLowerCase().includes('glow') || title.toLowerCase().includes('tint') || title.toLowerCase().includes('mascara') || title.toLowerCase().includes('vanish');

  return (
    <div className="group flex flex-col relative w-full h-full bg-white transition-all duration-300">
      
      {/* Image Container */}
      <Link to="/product" state={{ product }} onClick={onNavigate} className="relative bg-[#f4f4f4] w-full aspect-[4/5] flex items-center justify-center overflow-hidden">
        
        {/* Top Left Dots (Color Swatches) */}
        <div className="absolute top-3 left-3 flex gap-1 z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#340c0c]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#d6cece]" />
        </div>

        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          {/* Main Image */}
          <img
            src={product.images?.main || product.cardImages?.main || product.image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-500"
            loading="lazy"
          />
          {/* Hover Image (Model / Packshot Open) */}
          <img
            src={product.images?.hover || product.cardImages?.hover || product.selectedShade?.gallery?.[0] || product.gallery?.[0] || product.images?.main || product.cardImages?.main || product.image}
            alt={`${title} with model`}
            title={`${title} with model`}
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label="Wishlist"
        >
          <Heart 
            size={18} 
            fill={isInWishlist?.(product) ? "#a06464" : "transparent"} 
            color={isInWishlist?.(product) ? "#a06464" : "#340c0c"} 
            strokeWidth={1.2} 
          />
        </button>

        {/* Badge - INSIDE image container at bottom left */}
        {(isAwardWinning || isSave || isNew) && (
          <div className="absolute bottom-0 left-0 bg-[#fde2d8] text-[#340c0c] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
            {isAwardWinning ? 'AWARD WINNING' : isSave ? 'AS SEEN ON TV!' : 'NEW!'}
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-grow pt-4 px-1">
        <Link to="/product" state={{ product }} onClick={onNavigate} className="group-hover:text-[#a06464] transition-colors duration-200">
          <h3 className="font-sans uppercase text-[11px] md:text-[12px] font-bold text-[#340c0c] tracking-widest line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>
        <p className="text-[#340c0c] font-sans text-[12px] tracking-wide mt-1 mb-3 line-clamp-1">
          {product.selectedShade?.name || product.shade || product.subtitle || product.subTitle || 'Standard Size'}
        </p>

        <div className="mt-auto mb-4 flex items-center gap-2">
          {isSave ? (
            <>
              <span className="text-[#856d6d] font-sans text-[12px] line-through decoration-1">{product.price}</span>
              <span className="text-[#a06464] font-sans text-[12px] font-bold">
                ${(parseFloat(product.price?.replace(/[^0-9.]/g, '') || 0) * 0.8).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-[#340c0c] font-sans text-[12px] font-bold">{product.price || '$45.00'}</span>
          )}
        </div>

        <button
          onClick={() => handleAddtoBasket(product)}
          className="w-full bg-white border border-[#340c0c] text-[#340c0c] py-2.5 font-sans uppercase tracking-widest text-[11px] font-bold hover:bg-[#340c0c] hover:text-white transition-all duration-300 min-h-[44px]"
        >
          {title.toLowerCase().includes('kit') || title.toLowerCase().includes('duo') ? 'CHOOSE SHADES' : 'ADD TO BASKET'}
        </button>
      </div>
    </div>
  );
});

const ChevronDownIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#340c0c]">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
