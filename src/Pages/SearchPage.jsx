import React, { useEffect, useRef, useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useProduct } from "../Context/DataContext";
import { useBasket } from "../Context/BasketContext";
import { useWishlist } from "../Context/WishlistContext";
import useSearch from "../hooks/useSearch";

function SearchPage() {
  const { trending } = useProduct();
  const { handleAddtoBasket } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const {
    query,
    setQuery,
    debouncedQuery,
    sortBy,
    setSortBy,
    searchResults,
    dynamicSuggestions,
    clearSearch,
  } = useSearch(trending);

  const [currentPage, setCurrentPage] = useState(1);

  // Page açılan kimi input-a focus verir
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  // Escape basanda search səhifəsini bağlayır
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        closeSearch();
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  // Search bağlananda input təmizlənir və home səhifəsinə gedir
  const closeSearch = () => {
    clearSearch();
    navigate("/home");
  };

  const getPrice = (product) => {
    const price = product.discountPrice || product.price || "0";
    if (String(price).toUpperCase() === "FREE") return 0;
    return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
  };

  const hasSearch = debouncedQuery.trim().length > 0;
  const hasResults = searchResults.length > 0;

  // Search varsa nəticələri göstərir, yoxdursa trending məhsulları göstərir
  let products = hasSearch ? searchResults : trending || [];

  // Sort yalnız search boş olanda trending list üçün işləyir
  if (!hasSearch && sortBy === "PriceLowToHigh") {
    products = [...products].sort((a, b) => getPrice(a) - getPrice(b));
  }

  if (!hasSearch && sortBy === "PriceHighToLow") {
    products = [...products].sort((a, b) => getPrice(b) - getPrice(a));
  }

  // Search və sort dəyişəndə pagination birinci səhifəyə qayıdır
  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortBy]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
  const start = (currentPage - 1) * itemsPerPage;
  const shownProducts = products.slice(start, start + itemsPerPage);

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-[1160px] mx-auto px-4 md:px-8 pt-4">
        {/* Search input yuxarıda sticky qalır */}
        <div className="sticky top-0 md:top-[160px] bg-white z-50 pt-4 pb-4">
          <div className="flex items-center border border-[#340c0c] hover:border-[#a06464] focus-within:border-[#340c0c] rounded-full px-5 py-2.5 bg-white transition-all duration-300">
            <button
              onClick={closeSearch}
              className="cursor-pointer mr-3 text-[#856d6d] hover:text-[#340c0c] transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <input
              ref={inputRef}
              type="text"
              placeholder="Search product, shade, colour"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-[14px] md:text-[15px] text-[#340c0c] placeholder:text-[#a39696] outline-none bg-transparent"
              autoComplete="off"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="cursor-pointer ml-3 text-[#856d6d] hover:text-[#340c0c] transition-colors text-[14px]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Suggestion-lar input-un altında tek sırada, yana scroll olur */}
        <div className="mt-1 flex items-center gap-3 overflow-x-auto hide-scrollbar whitespace-nowrap pb-4 px-1">
          <span className="text-[13px] text-[#340c0c] font-bold shrink-0">
            Suggestions:
          </span>

          {dynamicSuggestions.map((word) => (
            <button
              key={word}
              onClick={() => setQuery(word)}
              className="cursor-pointer shrink-0 text-[13px] text-[#856d6d] hover:text-[#340c0c] underline underline-offset-4 decoration-transparent hover:decoration-[#340c0c] transition-all capitalize"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Result sayı və sort */}
        <div className="flex justify-between items-center mt-4 mb-6 pb-2 gap-4 px-1">
          <div className="text-[13px] text-[#856d6d]">
            {products.length} results
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[13px] text-[#340c0c]">Sort:</span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-[13px] text-[#340c0c] outline-none cursor-pointer pr-5"
              >
                <option value="Recommended">Recommended</option>
                <option value="PriceLowToHigh">Price Low - High</option>
                <option value="PriceHighToLow">Price High - Low</option>
              </select>

              <ChevronRight
                size={12}
                className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none text-[#340c0c]"
              />
            </div>
          </div>
        </div>

        <div className="pb-20">
          {hasSearch && !hasResults ? (
            <div className="text-center py-20">
              <p className="text-[15px] text-[#340c0c] mb-6">
                Sorry Darling! There are no results for "{debouncedQuery}". Try
                another search or shop best sellers below:
              </p>
            </div>
          ) : (
            <>
              {/* Mobildə 2 sütun, PC-də 4 sütun */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 sm:gap-x-4 gap-y-8 sm:gap-y-10 px-1 sm:px-0">
                {shownProducts.map((product, index) => (
                  <ProductCard
                    key={`${product.id || product.title}-${index}`}
                    product={product}
                    addToBasket={handleAddtoBasket}
                    toggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist}
                    closeSearch={closeSearch}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 mt-16 border-t border-[#eae6e6] pt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={
                      currentPage === 1
                        ? "w-9 h-9 flex items-center justify-center rounded text-[#d6cece] cursor-not-allowed"
                        : "w-9 h-9 flex items-center justify-center rounded cursor-pointer text-[#856d6d] hover:bg-[#f9f8f6] transition-colors"
                    }
                  >
                    <ChevronRight size={16} className="rotate-180" />
                  </button>

                  {pages.map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={
                        page === currentPage
                          ? "w-9 h-9 flex items-center justify-center text-[13px] font-bold rounded bg-[#f4f4f4] text-[#340c0c]"
                          : "w-9 h-9 flex items-center justify-center text-[13px] font-bold rounded cursor-pointer text-[#856d6d] hover:bg-[#f9f8f6] transition-colors"
                      }
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? "w-9 h-9 flex items-center justify-center rounded text-[#d6cece] cursor-not-allowed"
                        : "w-9 h-9 flex items-center justify-center rounded cursor-pointer text-[#856d6d] hover:bg-[#f9f8f6] transition-colors"
                    }
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

function ProductCard({
  product,
  addToBasket,
  toggleWishlist,
  isInWishlist,
  closeSearch,
}) {
  const title = product.title || "";
  const lowerTitle = title.toLowerCase();

  const mainImage = product.images?.main || product.cardImages?.main || product.image;

  const hoverImage =
    product.images?.hover ||
    product.cardImages?.hover ||
    product.selectedShade?.gallery?.[0] ||
    product.gallery?.[0] ||
    mainImage;

  const shade =
    product.selectedShade?.name ||
    product.shade ||
    product.subtitle ||
    product.subTitle ||
    "Standard Size";

  const liked = isInWishlist?.(product);
  const isSave = lowerTitle.includes("secrets") || lowerTitle.includes("kit") || lowerTitle.includes("duo");
  const isNew = lowerTitle.includes("glow") || lowerTitle.includes("tint") || lowerTitle.includes("mascara") || lowerTitle.includes("vanish");
  const isAward = lowerTitle.includes("bronzer") || lowerTitle.includes("flawless");

  let badge = "";

  if (isAward) {
    badge = "AWARD WINNING";
  } else if (isSave) {
    badge = "AS SEEN ON TV!";
  } else if (isNew) {
    badge = "NEW!";
  }

  let salePrice = "";

  if (isSave) {
    const price = Number(String(product.price || "0").replace(/[^0-9.]/g, ""));
    salePrice = `$${(price * 0.8).toFixed(2)}`;
  }

  const buttonText =
    lowerTitle.includes("kit") || lowerTitle.includes("duo")
      ? "CHOOSE SHADES"
      : "ADD TO BASKET";

  return (
    <div className="group flex flex-col w-full h-full bg-white transition-all duration-300">
      <Link
        to="/product"
        state={{ product }}
        onClick={closeSearch}
        className="relative bg-[#f4f4f4] w-full aspect-[4/5] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#340c0c]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#d6cece]" />
        </div>

        {/* Hover zamanı əsas şəkil gizlənir, ikinci şəkil görünür */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <img
            src={mainImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-500"
            loading="lazy"
          />

          <img
            src={hoverImage}
            alt={`${title} with model`}
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="cursor-pointer absolute top-2 sm:top-3 right-2 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label="Wishlist"
        >
          {liked ? (
            <FaHeart size={16} className="text-[#a06464] sm:text-[18px]" />
          ) : (
            <FaRegHeart size={16} className="text-[#340c0c] sm:text-[18px]" />
          )}
        </button>

        {badge && (
          <div className="absolute bottom-0 left-0 bg-[#fde2d8] text-[#340c0c] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5">
            {badge}
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 pt-3 sm:pt-4 px-1">
        <Link
          to="/product"
          state={{ product }}
          onClick={closeSearch}
          className="group-hover:text-[#a06464] transition-colors duration-200"
        >
          <h3 className="uppercase text-[10px] sm:text-[11px] md:text-[12px] font-bold text-[#340c0c] tracking-widest line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>

        <p className="text-[#340c0c] text-[11px] sm:text-[12px] tracking-wide mt-1 mb-2 sm:mb-3 line-clamp-1">
          {shade}
        </p>

        <div className="mt-auto mb-3 sm:mb-4 flex items-center gap-2">
          {isSave ? (
            <>
              <span className="text-[#856d6d] text-[11px] sm:text-[12px] line-through decoration-1">
                {product.price}
              </span>
              <span className="text-[#a06464] text-[11px] sm:text-[12px] font-bold">
                {salePrice}
              </span>
            </>
          ) : (
            <span className="text-[#340c0c] text-[11px] sm:text-[12px] font-bold">
              {product.price || "$45.00"}
            </span>
          )}
        </div>

        <button
          onClick={() => addToBasket(product)}
          className="cursor-pointer w-full bg-white border border-[#340c0c] text-[#340c0c] py-2 sm:py-2.5 uppercase tracking-widest text-[10px] sm:text-[11px] font-bold hover:bg-[#340c0c] hover:text-white transition-all duration-300 min-h-[40px] sm:min-h-[44px]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default SearchPage;