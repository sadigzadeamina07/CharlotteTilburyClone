import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

function getMediaList(images = []) {
  // Gələn şəkilləri vahid formata salır: image və ya video
  return images.map((item, index) => {
    if (item?.type) {
      return item;
    }

    const url = String(item);

    if (url.startsWith("data:image/svg+xml")) {
      return {
        type: "video",
        placeholder: true,
        id: `video-${index}`,
      };
    }

    return {
      type: "image",
      url,
      id: `image-${index}`,
    };
  });
}

function ProductGallery({ galleryImages = [], productName = "Product" }) {
  const media = getMediaList(galleryImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);

  const activeItem = media[activeIndex] || media[0];

  // Video seçiləndə yenidən başladır
  useEffect(() => {
    if (activeItem?.type === "video" && videoRef.current && activeItem.url) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeItem]);

  const prevImage = () => {
    if (activeIndex === 0) {
      setActiveIndex(media.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const nextImage = () => {
    if (activeIndex === media.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  if (!activeItem) {
    return null;
  }

  return (
    <div className="w-full max-w-[800px] mx-auto xl:max-w-none">
      <div className="relative w-full aspect-square bg-[#f5f0ee] overflow-hidden rounded-sm">
        {activeItem.placeholder ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#f0ece8] text-[#9c8a82] uppercase text-[13px] tracking-wide">
            <Play size={46} />
            <span>Video coming soon</span>
          </div>
        ) : activeItem.type === "video" ? (
          <video
            ref={videoRef}
            key={activeItem.url}
            autoPlay
            muted
            loop
            playsInline
            poster={activeItem.poster}
            className="w-full h-full object-cover"
          >
            <source src={activeItem.url} type="video/mp4" />
          </video>
        ) : (
          <img
            src={activeItem.url}
            alt={productName}
            className="w-full h-full object-contain bg-[#f5f0ee] transition-opacity duration-300"
          />
        )}

        {/* Qalereyada birdən çox şəkil varsa oxlar görünür */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} className="text-[#340c0c]" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} className="text-[#340c0c]" />
            </button>
          </>
        )}

        {activeItem.type === "video" && !activeItem.placeholder && (
          <span className="absolute top-3 left-3 bg-[#340c0c]/80 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm">
            Video
          </span>
        )}
      </div>

      {/* Thumbnail-lar: mobildə yana scroll olur, hər thumbnail 88×88 */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mt-3 snap-x snap-mandatory">
        {media.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id || index}
              onClick={() => setActiveIndex(index)}
              className={
                isActive
                  ? "relative shrink-0 w-[88px] h-[88px] border-2 border-[#340c0c] rounded overflow-hidden bg-[#f5f0ee] snap-start"
                  : "relative shrink-0 w-[88px] h-[88px] border border-transparent rounded overflow-hidden bg-[#f5f0ee] hover:border-[#340c0c] transition-colors snap-start"
              }
            >
              {item.placeholder ? (
                <div className="w-full h-full bg-[#ede8e3] flex items-center justify-center">
                  <Play size={26} className="text-[#340c0c]" />
                </div>
              ) : item.type === "video" ? (
                <>
                  {item.poster ? (
                    <img
                      src={item.poster}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.url}
                      muted
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  )}

                  <span className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <Play size={22} className="text-[#340c0c]" />
                  </span>
                </>
              ) : (
                <img
                  src={item.url}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductGallery;