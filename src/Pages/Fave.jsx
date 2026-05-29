import React, { useEffect } from "react"
import { Link } from "react-router"
import { useWishlist } from "../Context/WishlistContext"
import { useProduct } from "../Context/DataContext"
import ProductCard from "../Component/Home/ProductCard"
import { X } from "lucide-react"

function Fave() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])
  const { wishlist, removeFromWishlist } = useWishlist()
  const { formatPrice, selectedCountry } = useProduct()

  return (
    <main className="bg-white py-12 px-4 md:px-5">
      <div className="max-w-[1024px] mx-auto px-4">
        {/* Empty wishlist state */}
        {wishlist.length === 0 ? (
          <section className="flex flex-col items-center justify-center py-16 text-center">
            <h1 className="text-[24px] md:text-[28px] text-[#340c0c] uppercase mb-2">
              YOUR WISHLIST IS EMPTY
            </h1>
            <p className="text-[#340c0c] max-w-[500px] mb-6 leading-relaxed text-[15px] font-light">
              Adding items to your wishlist by clicking the heart icon as you
              shop.
            </p>
            <Link
              to="/home"
              className="border border-[#340c0c] text-[#340c0c] px-16 py-3 hover:bg-[#340c0c] hover:text-white     duration-300 uppercase   text-[13px] font-bold"
            >
              BEST SELLERS
            </Link>
          </section>
        ) : (
          <>
            <h1 className="text-[28px] text-[#340c0c] uppercase mb-2">
              WISHLIST
            </h1>
            <p className="text-[#340c0c] max-w-[500px] mb-4">
              Keep a list of all the gorgeous Charlotte Tilbury beauty products
              you love, or are dying to try next! You can log in on any device
              to see your saved wishlist.
            </p>

            {/* Product grid: 2 cols on mobile, 3-4 on desktop */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
              {wishlist.map((item, index) => (
                <div key={`${item.title}-${index}`} className="relative">
                  <ProductCard item={item} className="w-full" />
                  <button
                    onClick={() => removeFromWishlist(item)}
                    className="absolute top-2 left-2 z-20 w-6 h-6 flex items-center justify-center bg-white/90 rounded-full shadow-sm text-[#340c0c] hover:bg-[#340c0c] hover:text-white     duration-200"
                    aria-label="Remove from wishlist"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  )
}

export default Fave
