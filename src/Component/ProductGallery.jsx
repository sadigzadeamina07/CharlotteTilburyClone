import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Charlotte Tilbury — ProductGallery
 *
 * Drop‑in replacement for any flat galleryImages array.
 * Accepts either the OLD flat string array OR the NEW typed media array.
 * Internally normalises everything to the typed format.
 *
 * NEW typed format (preferred):
 *   { type: "image" | "video", url: string, poster?: string }
 *
 * OLD flat format (backward‑compat, auto‑detected):
 *   ["https://...", "https://..."]
 *
 * A `data:image/svg+xml` entry (the pause icon CT uses as a video
 * placeholder) is automatically converted to a placeholder video item.
 */

// ─── helpers ────────────────────────────────────────────────────────────────

const SVG_DATA_PREFIX = "data:image/svg+xml";

/** Normalise any supported input into MediaItem[] */
function normaliseGallery(raw = []) {
  return raw.map((item, i) => {
    // Already typed
    if (item && typeof item === "object" && item.type) return item;

    // Flat string
    const url = String(item);

    // CT uses a base64 SVG pause icon as a video slot placeholder.
    // Detect it and convert to a typed video placeholder.
    if (url.startsWith(SVG_DATA_PREFIX)) {
      return {
        type: "video",
        url: null, // real URL to be filled in
        poster: null,
        placeholder: true,
        id: `video-placeholder-${i}`,
      };
    }

    return { type: "image", url, id: `img-${i}` };
  });
}

// ─── sub‑components ─────────────────────────────────────────────────────────

/** Play triangle icon rendered as inline SVG (no external deps) */
function PlayIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="rgba(255,255,255,0.88)" />
      <polygon points="8,6 15,10 8,14" fill="#340c0c" />
    </svg>
  );
}

/** Single thumbnail button */
function Thumbnail({ item, index, isActive, onClick }) {
  const isVideo = item.type === "video";
  const isPlaceholder = item.placeholder;

  return (
    <button
      onClick={() => onClick(index)}
      aria-label={`View ${isVideo ? "video" : "image"} ${index + 1}`}
      aria-pressed={isActive}
      style={{
        position: "relative",
        width: 72,
        height: 72,
        flexShrink: 0,
        padding: 0,
        border: isActive
          ? "2px solid #340c0c"
          : "1.5px solid transparent",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        background: "#f5f0ee",
        transition: "border-color 0.2s",
        outline: "none",
      }}
    >
      {isPlaceholder ? (
        /* Video placeholder: render a muted colour swatch + play icon */
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#ede8e3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlayIcon size={28} />
        </div>
      ) : isVideo ? (
        <>
          {item.poster ? (
            <img
              src={item.poster}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <video
              src={item.url}
              muted
              preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.12)",
            }}
          >
            <PlayIcon size={22} />
          </span>
        </>
      ) : (
        <img
          src={item.url}
          alt=""
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </button>
  );
}

/** Main media display — image or video */
function MainMedia({ item }) {
  const videoRef = useRef(null);

  // When item changes, force the video to reload & play
  useEffect(() => {
    if (item.type === "video" && videoRef.current && item.url) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {/* autoplay policy: ignored */});
    }
  }, [item]);

  if (item.placeholder) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          color: "#9c8a82",
          fontSize: 13,
          letterSpacing: "0.04em",
          fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
          textTransform: "uppercase",
          background: "#f0ece8",
        }}
      >
        <PlayIcon size={48} />
        <span>Video coming soon</span>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <video
        ref={videoRef}
        key={item.url}
        autoPlay
        muted
        loop
        playsInline
        poster={item.poster}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        aria-label="Product application video"
      >
        <source src={item.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <img
      key={item.url}
      src={item.url}
      alt="Product image"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
        background: "#f5f0ee",
        transition: "opacity 0.25s ease",
      }}
    />
  );
}

// ─── main component ──────────────────────────────────────────────────────────

/**
 * @param {object}   props
 * @param {Array}    props.galleryImages   Raw flat or typed media array from JSON
 * @param {string}   [props.productName]  For aria labels
 */
export default function ProductGallery({ galleryImages = [], productName = "Product" }) {
  const media = normaliseGallery(galleryImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef(null);

  const activeItem = media[activeIndex] ?? { type: "image", url: "" };

  // Scroll active thumb into view
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const thumb = container.children[activeIndex];
    if (thumb) {
      thumb.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    }
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  }, [media.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((i) => (i === media.length - 1 ? 0 : i + 1));
  }, [media.length]);

  // Keyboard arrow navigation on the gallery
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    },
    [handlePrev, handleNext]
  );

  return (
    <div
      className="flex flex-col gap-3 select-none w-full max-w-[800px] mx-auto xl:max-w-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${productName} gallery`}
    >
      {/* ── Main display ─────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          background: "#f5f0ee",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <MainMedia item={activeItem} />

        {/* Prev / Next arrows */}
        {media.length > 1 && (
          <>
            <NavArrow direction="left" onClick={handlePrev} />
            <NavArrow direction="right" onClick={handleNext} />
          </>
        )}

        {/* Video badge */}
        {activeItem.type === "video" && !activeItem.placeholder && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "rgba(52,12,12,0.78)",
              color: "#fff",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: 2,
              fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
            }}
          >
            Video
          </span>
        )}
      </div>

      {/* ── Thumbnails ───────────────────────────────────── */}
      <div
        ref={thumbsRef}
        role="list"
        aria-label="Gallery thumbnails"
        className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {media.map((item, i) => (
          <div key={item.id ?? i} role="listitem">
            <Thumbnail
              item={item}
              index={i}
              isActive={i === activeIndex}
              onClick={setActiveIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Left / right chevron arrow */
function NavArrow({ direction, onClick }) {
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? "Previous media" : "Next media"}
      style={{
        position: "absolute",
        top: "50%",
        [isLeft ? "left" : "right"]: 10,
        transform: "translateY(-50%)",
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "none",
        background: "rgba(255,255,255,0.85)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,1)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.85)")}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={isLeft ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
          stroke="#340c0c"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
