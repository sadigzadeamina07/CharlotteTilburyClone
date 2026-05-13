import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useProduct } from '../Context/DataContext';
import { useBasket } from '../Context/BasketContext';
import { useWishlist } from '../Context/WishlistContext';
import { useUI } from '../Context/UIContext';
import useSearch from '../hooks/useSearch';

/* ═══════════════════════════════════════════════════════
   SearchOverlay — Vanilla Humanist Architecture
   
   • Consumes useUI() — zero prop drilling
   • Rendered via React Portal (clean DOM, accessibility-friendly)
   • Pure CSS transitions (cubic-bezier luxury timing)
   • Zero animation libraries — no Framer Motion
   • Scroll lock handled automatically by UIContext
   ═══════════════════════════════════════════════════════ */
export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI();
  const { trending } = useProduct();
  const { handleAddtoBasket } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inputRef = useRef(null);

  const {
    query, setQuery, debouncedQuery, sortBy, setSortBy,
    searchResults, dynamicSuggestions, mustHaveIcons,
    clearSearch,
  } = useSearch(trending);

  // Auto-focus when overlay opens; clear when it closes
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    } else {
      clearSearch();
    }
  }, [isSearchOpen, clearSearch]);

  // Escape key
  useEffect(() => {
    if (!isSearchOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSearchOpen]);

  const handleClose = useCallback(() => {
    clearSearch();
    closeSearch();
  }, [clearSearch, closeSearch]);

  // Stable handler — no re-renders when typing
  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value);
  }, [setQuery]);

  const hasQuery   = debouncedQuery.trim().length > 0;
  const hasResults = searchResults.length > 0;
  const isTyping   = query !== debouncedQuery && query.length > 0;

  return createPortal(
    <>
      {/* ── Backdrop ── */}
      <div
        className={`fixed inset-0 z-[500] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ── Panel ── */}
      <div
        className={`fixed inset-x-0 top-0 z-[501] bg-white md:max-h-[85vh] overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#d6cece] [&::-webkit-scrollbar-thumb]:rounded-md shadow-2xl transition-all duration-300 ease-out ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
      >
        <div className="max-w-[1470px] mx-auto px-4 md:px-8">

          {/* ── Search Input ── */}
          <div className="pt-6 md:pt-10 pb-2">
            <div className="relative flex items-center border border-[#340c0c] rounded-full px-4 py-2.5 md:py-3 bg-white transition-shadow duration-300 ease-out focus-within:shadow-md">
              <button
                onClick={handleClose}
                className="mr-3 text-[#340c0c] hover:text-black flex items-center justify-center min-w-[24px] min-h-[24px] transition-transform duration-200 hover:scale-110"
                aria-label="Close search"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <input
                ref={inputRef}
                type="text"
                placeholder="Search product, shade, colour"
                value={query}
                onChange={handleInputChange}
                className="flex-grow w-full text-[15px] md:text-[16px] font-sans text-[#340c0c] placeholder:text-gray-400 focus:outline-none bg-transparent"
                aria-label="Search products"
                autoComplete="off"
              />

              <button
                onClick={clearSearch}
                className={`ml-3 text-[12px] font-sans text-[#856d6d] hover:text-[#340c0c] uppercase font-bold tracking-wider transition-all duration-200 ease-out ${query.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
              >
                Clear
              </button>
            </div>

            {/* ── Suggestions ── */}
            <div className="mt-5 mb-3">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 px-1">
                <span className="text-[13px] font-sans text-[#340c0c] font-bold shrink-0">
                  Suggestions:
                </span>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {dynamicSuggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(sug)}
                      className="text-[#856d6d] text-[13px] font-sans hover:text-[#340c0c] underline underline-offset-4 decoration-[1px] decoration-transparent hover:decoration-[#340c0c] transition-colors duration-200"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Typing indicator ── */}
            <div className={`h-[2px] bg-gradient-to-r from-[#b76e79] via-[#6e1e2d] to-[#b76e79] rounded-full transition-all duration-500 ease-out origin-left ${isTyping ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
          </div>

          {/* ═══ Results ═══ */}
          <div className="mt-4 pb-10">

            {/* ── Results grid ── */}
            <div className={`transition-opacity duration-300 ease-out ${hasQuery && hasResults ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="flex justify-between items-center mb-6">
                <span className="font-sans text-[13px] text-[#856d6d] tracking-wide">
                  {searchResults.length} results
                </span>
                <div className="relative ml-auto flex items-center">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent font-sans text-[13px] text-[#340c0c] font-bold uppercase tracking-wide focus:outline-none cursor-pointer pr-5 hover:text-black transition-colors duration-200"
                    aria-label="Sort results"
                  >
                    <option value="Recommended">Sort: Recommended</option>
                    <option value="PriceLowToHigh">Price: Low to High</option>
                    <option value="PriceHighToLow">Price: High to Low</option>
                  </select>
                  <ChevronDownIcon />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
                {searchResults.slice(0, 8).map((product, idx) => (
                  <div key={`${product.id || product.title}-${product.category || 'cat'}-${idx}`}>
                    <ProductCard
                      product={product}
                      handleAddtoBasket={handleAddtoBasket}
                      toggleWishlist={toggleWishlist}
                      isInWishlist={isInWishlist}
                      onNavigate={handleClose}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ── No results (humanist) ── */}
            {hasQuery && !hasResults && query === debouncedQuery && (
              <div className="text-center px-4 mb-10 mt-8 border-b border-[#eae6e6] pb-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#fef5f2] to-[#fce3e1] mb-4">
                  <Sparkles size={24} className="text-[#b76e79]" />
                </div>
                <p className="font-sans text-[15px] md:text-[16px] text-[#856d6d] tracking-wide leading-relaxed mx-auto max-w-2xl">
                  Sorry Darling! We couldn't find a match for "{debouncedQuery}".
                  Here are some magical best-sellers instead...
                </p>

                <div className="mt-8 text-left max-w-2xl mx-auto">
                  <h4 className="font-sans text-[13px] text-[#856d6d] uppercase tracking-widest font-bold mb-3">Must-Have Icons</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {mustHaveIcons.slice(0, 4).map((icon, idx) => (
                      <button
                        key={idx}
                        className="flex items-center gap-2 p-3 rounded-lg border border-[#eae6e6] hover:border-[#b76e79] hover:bg-[#fff9f7] transition-all duration-200 text-left min-h-[44px] active:scale-[0.97]"
                        onClick={() => setQuery(icon.title)}
                      >
                        <Sparkles size={14} className="text-[#b76e79] shrink-0" />
                        <span className="font-sans text-[13px] text-[#340c0c]">{icon.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 max-w-md mx-auto flex items-center gap-3 bg-[#fef5f2] border border-[#e8d5d5] rounded-xl p-4">
                  <MessageCircle size={20} className="text-[#6e1e2d] shrink-0" />
                  <div className="text-left flex-grow">
                    <p className="font-sans text-[13px] font-bold text-[#340c0c]">Talk to a Beauty Expert</p>
                    <p className="font-sans text-[11px] text-[#856d6d]">Get personalized recommendations</p>
                  </div>
                  <button className="px-3 py-2 bg-[#340c0c] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded-full hover:brightness-125 transition-all duration-200 min-h-[44px]">
                    Chat
                  </button>
                </div>
              </div>
            )}

            {/* ── Best Sellers (initial + fallback) ── */}
            {(!hasQuery || (hasQuery && !hasResults && query === debouncedQuery)) && (
              <div className="mt-4">
                <h2 className="font-serif text-[24px] md:text-[28px] text-[#4a0014] mb-6 text-left">Best Sellers</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
                  {(trending || []).slice(0, 8).map((product, idx) => (
                    <div key={`${product.id || product.title}-${product.category || 'cat'}-${idx}`}>
                      <ProductCard
                        product={product}
                        handleAddtoBasket={handleAddtoBasket}
                        toggleWishlist={toggleWishlist}
                        isInWishlist={isInWishlist}
                        onNavigate={handleClose}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>,
    document.body
  );
}


/* ═══════════════════════════════════════════════════════
   ProductCard — React.memo for 0ms typing lag
   
   Wrapped in memo so typing in SearchOverlay doesn't
   cause 50 product cards to needlessly re-render.
   Solid background on ADD TO BAG button.
   ═══════════════════════════════════════════════════════ */
const ProductCard = React.memo(function ProductCard({ product, handleAddtoBasket, toggleWishlist, isInWishlist, onNavigate }) {
  const title = product.title || '';
  const isAwardWinning = title.toLowerCase().includes('bronzer') || title.toLowerCase().includes('flawless');
  const isSave = title.toLowerCase().includes('secrets') || title.toLowerCase().includes('kit');

  return (
    <div className="flex flex-col group relative w-full h-full">
      {/* Image */}
      <Link to="/product" state={{ product }} onClick={onNavigate} className="relative bg-[#f4f4f4] w-full aspect-square block overflow-hidden">
        <div className="w-full h-full p-4">
          <img
            src={product.images?.main || product.cardImages?.main || product.image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label={isInWishlist?.(product) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist?.(product)
            ? <Heart size={18} fill="#4a0014" color="#4a0014" strokeWidth={1} />
            : <Heart size={18} strokeWidth={1} color="#340c0c" />
          }
        </button>

        <div className="absolute top-3 left-3 flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#340c0c]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#d6cece]" />
        </div>
      </Link>

      {/* Badge */}
      <div className="bg-[#fde2d8] text-[#8a2b3b] text-[10px] font-sans tracking-widest font-bold uppercase px-2 py-1.5 text-left w-full">
        {isAwardWinning ? 'AWARD WINNING' : isSave ? 'SAVE 20%' : 'NEW!'}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow text-left pt-3 px-1">
        <Link to="/product" state={{ product }} onClick={onNavigate} className="group-hover:text-gray-600 transition-colors duration-200">
          <h3 className="font-sans uppercase text-[12px] md:text-[13px] font-bold text-[#340c0c] tracking-widest line-clamp-2 min-h-[2.5rem] mb-1 leading-tight">
            {title}
          </h3>
        </Link>

        <p className="text-[#340c0c] font-sans text-[13px] tracking-wide mb-2 line-clamp-1">
          {product.subtitle || product.subTitle || 'Standard Size'}
        </p>

        <div className="mt-auto mb-4">
          {isSave ? (
            <div className="flex items-center gap-2">
              <span className="text-[#856d6d] font-sans text-[13px] line-through decoration-1">{product.price}</span>
              <span className="text-[#d82a36] font-sans text-[13px] font-bold">
                {(parseFloat(product.price?.replace(/[^0-9.]/g, '') || 0) * 0.8).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-[#340c0c] font-sans text-[13px] font-bold">{product.price}</span>
          )}
        </div>

        {/* Solid ADD TO BAG — high-contrast, subtle brightness hover */}
        <button
          onClick={() => handleAddtoBasket(product)}
          className="w-full bg-[#340c0c] text-white py-2.5 font-sans uppercase tracking-widest text-[11px] font-bold hover:brightness-125 active:scale-[0.98] transition-all duration-200 rounded-none min-h-[44px]"
        >
          {title.toLowerCase().includes('kit') || title.toLowerCase().includes('duo')
            ? 'CHOOSE SHADES'
            : 'ADD TO BAG'}
        </button>
      </div>
    </div>
  );
});


/* ── Tiny SVG icon ── */
const ChevronDownIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#340c0c]">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
