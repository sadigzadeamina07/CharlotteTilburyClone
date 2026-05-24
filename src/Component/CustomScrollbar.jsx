import React, { useState, useEffect } from 'react'; // useCallback silindi

function CustomScrollbar({ elementId }) {
  const [thumbWidth, setThumbWidth] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // JUNIOR YANAŞMASI: Mürəkkəb useCallback silindi, sadə funksiya yazıldı
  const updateScrollState = () => {
    const el = document.getElementById(elementId);
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;

    const ratio = clientWidth / scrollWidth;
    setThumbWidth(ratio * 100);

    const maxScrollLeft = scrollWidth - clientWidth;
    
    let leftPercent = 0;
    if (maxScrollLeft > 0) {
      leftPercent = (scrollLeft / scrollWidth) * 100;
    }
    setScrollLeftPos(leftPercent);
  };

  useEffect(() => {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
    
    setTimeout(() => {
      updateScrollState();
    }, 100);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [elementId]);

  // JUNIOR YANAŞMASI: Qəliz pointer eventləri əvəzinə hamının bildiyi mousemove yazıldı
  const handleMouseMove = (e) => {
    const el = document.getElementById(elementId);
    const track = document.getElementById(`${elementId}-track`);
    if (!isDragging || !track || !el) return;

    const rect = track.getBoundingClientRect();
    const trackWidth = rect.width;
    const clickX = e.clientX - rect.left;

    const scrollPercentage = clickX / trackWidth;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    el.scrollLeft = scrollPercentage * maxScrollLeft;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (thumbWidth >= 100) return null;

  return (
    <div
      id={`${elementId}-track`}
      className={`w-[190px] mx-auto py-3 mt-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }} // onPointerDown -> onMouseDown edildi
    >
      <div className="w-full h-[2px] bg-[#E5E5E5] relative rounded-sm overflow-hidden">
        <div
          className="absolute top-0 h-full bg-[#3a080a] rounded-sm"
          style={{
            width: thumbWidth + "%", // şablon yazı (template literal) yerinə bəsit string toplama
            left: scrollLeftPos + "%"
          }}
        />
      </div>
    </div>
  );
}

export default CustomScrollbar;