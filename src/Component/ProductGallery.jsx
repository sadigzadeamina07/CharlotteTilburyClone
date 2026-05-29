import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

function ProductGallery({ galleryImages = [], productName = "Product" }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = galleryImages.map((img) => img.url || img)

  if (images.length === 0) return null

  const prevImage = () => {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }

  const nextImage = () => {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  // Hər dəfə aktiv şəkil dəyişəndə (activeIndex), həmin kiçik şəkli skrol edirik
  useEffect(() => {
    // Kiçik şəklin (thumbnail) elementini unikal ID-si ilə tapırıq
    const activeThumbnail = document.getElementById(`thumb-${activeIndex}`)

    // Əgər belə bir element tapılarsa, onu görünüş sahəsinə sürüşdürürük
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }, [activeIndex]) // Bu effekt yalnız activeIndex dəyişəndə işləyir

  return (
    <div className="w-full max-w-[800px] mx-auto xl:max-w-none">
      {/* Böyük Şəkil Bölməsi */}
      <div className="relative w-full aspect-square bg-[#f5f0ee] overflow-hidden rounded-sm flex items-center justify-center">
        <img
          src={images[activeIndex]}
          alt={productName}
          className="w-full h-full object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center     cursor-pointer border-none"
            >
              <ChevronLeft size={20} className="text-[#340c0c]" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center     cursor-pointer border-none"
            >
              <ChevronRight size={20} className="text-[#340c0c]" />
            </button>
          </>
        )}
      </div>

      {/* Aşağıdakı Kiçik Şəkillər (Thumbnails) Bölməsi */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mt-3">
          {images.map((img, index) => (
            <button
              key={index}
              // Hər düyməyə fərqli və unikal bir ID veririk (Məsələn: "thumb-0", "thumb-1")
              id={`thumb-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 w-[88px] h-[88px] border-2 ${
                index === activeIndex
                  ? "border-[#340c0c]"
                  : "border-transparent"
              } bg-[#f5f0ee] rounded overflow-hidden cursor-pointer`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGallery
