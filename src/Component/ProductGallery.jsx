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

  
  useEffect(() => {
    
    const activeThumbnail = document.getElementById(`thumb-${activeIndex}`)

    
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }, [activeIndex]) 

  return (
    <div className="w-full max-w-[800px] mx-auto xl:max-w-none">
      
      <div className="relative w-full  bg-[#f5f0ee] overflow-hidden rounded-sm flex items-center justify-center" style={{ aspectRatio: '1 / 1' }}>
        <img
          src={images[activeIndex]}
          alt={productName}
          className="w-full h-full object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center     cursor-pointer  "
            >
              <ChevronLeft size={20} className="text-[#340c0c]" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center     cursor-pointer  "
            >
              <ChevronRight size={20} className="text-[#340c0c]" />
            </button>
          </>
        )}
      </div>

      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mt-3">
          {images.map((img, index) => (
            <button
              key={index}
              
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
