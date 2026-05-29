import React, { useEffect, useState } from "react"
import { X, ChevronRight } from "lucide-react"
import { Link } from "react-router"
import { useProduct } from "../Context/DataContext"
import { useProductSearch } from "../hooks/useProductSearch"
import ProductCard from "../Component/Home/ProductCard"

function SearchPage() {
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

  const [currentPage, setCurrentPage] = useState(1)

  // Escape düyməsinə basanda ana səhifəyə qayıt
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        window.location.href = "/home"
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  // Query varsa axtarış nəticələrini, yoxdursa bütün trending məhsulları göstər
  const products = hasQuery ? results : trending || []

  // Query və ya sort dəyişəndə səhifəni 1-ə sıfırla
  useEffect(() => {
    setCurrentPage(1)
  }, [query, sortBy])

  // Pagination hesabı
  const itemsPerPage = 12
  const totalPages = Math.ceil(products.length / itemsPerPage) || 1
  const start = (currentPage - 1) * itemsPerPage
  const shownProducts = products.slice(start, start + itemsPerPage)

  const suggestions = ["Blush", "Concealer", "Bronzer", "Foundation"]

  // Pagination üçün səhifə nömrələri array-i
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-[1160px] mx-auto px-4 md:px-8 pt-4">
        {/* Axtarış inputu - yuxarıda sabit qalır */}
        <div className="sticky top-0 md:top-[160px] bg-white z-50 pt-4 pb-4">
          <div className="flex items-center border border-[#340c0c] hover:border-[#a06464] focus-within:border-[#340c0c] rounded-full px-5 py-2.5 bg-white transition-all duration-300">
            <Link
              to="/home"
              onClick={() => setQuery("")}
              className="cursor-pointer mr-3 text-[#856d6d] hover:text-[#340c0c]    "
            >
              <X size={20} strokeWidth={1.5} />
            </Link>
            <input
              autoFocus
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
                className="cursor-pointer ml-3 text-[#856d6d] hover:text-[#340c0c]     text-[14px]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tövsiyə sözlər */}
        <div className="mt-1 flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-3 pb-4 px-1">
          <span className="text-[13px] text-[#340c0c] font-bold shrink-0">
            Suggestions:
          </span>
          {suggestions.map((word) => (
            <button
              key={word}
              onClick={() => setQuery(word)}
              className="cursor-pointer shrink-0 text-[13px] text-[#856d6d] hover:text-[#340c0c] underline underline-offset-4    hover:decoration-[#340c0c] transition-all capitalize"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Nəticə sayı + sıralama */}
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
          {/* Axtarış var amma nəticə yoxdur */}
          {hasQuery && !hasResults ? (
            <div className="text-center py-20">
              <p className="text-[15px] text-[#340c0c] mb-6">
                Sorry Darling! There are no results for "{query}". Try another
                search or shop best sellers below:
              </p>
            </div>
          ) : (
            <>
              {/* Məhsul grid: mobilə 2 sütun, desktop 4 sütun */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 sm:gap-x-4 gap-y-8 sm:gap-y-10 px-1 sm:px-0">
                {shownProducts.map((product, index) => (
                  <ProductCard
                    key={`${product.id || product.title}-${index}`}
                    item={product}
                    className="w-full"
                    onClick={() => setQuery("")}
                  />
                ))}
              </div>

              {/* Pagination - birdən çox səhifə varsa göstər */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 mt-16 border-t border-[#eae6e6] pt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={
                      currentPage === 1
                        ? "w-9 h-9 flex items-center justify-center rounded text-[#d6cece] cursor-not-allowed"
                        : "w-9 h-9 flex items-center justify-center rounded cursor-pointer text-[#856d6d] hover:bg-[#f9f8f6]    "
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
                          : "w-9 h-9 flex items-center justify-center text-[13px] font-bold rounded cursor-pointer text-[#856d6d] hover:bg-[#f9f8f6]    "
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
                        : "w-9 h-9 flex items-center justify-center rounded cursor-pointer text-[#856d6d] hover:bg-[#f9f8f6]    "
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
  )
}

export default SearchPage
