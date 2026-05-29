import React, { useState, useEffect } from 'react';

function CustomScrollbar({ elementId }) {
  const [thumbWidth, setThumbWidth] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = document.getElementById(elementId);
    if (!el) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setThumbWidth((clientWidth / scrollWidth) * 100);
      const maxScrollLeft = scrollWidth - clientWidth;
      setScrollLeftPos(maxScrollLeft > 0 ? (scrollLeft / scrollWidth) * 100 : 0);
    };

    el.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
    updateScrollState();

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [elementId]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const el = document.getElementById(elementId);
      const track = document.getElementById(elementId + '-track');
      if (!el || !track) return;

      const { left, width } = track.getBoundingClientRect();
      el.scrollLeft = ((e.clientX - left) / width) * (el.scrollWidth - el.clientWidth);
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, elementId]);

  if (thumbWidth >= 100) return null;

  return (
    <div
      id={elementId + '-track'}
      className={`w-[190px] mx-auto py-3 mt-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
    >
      <div className="w-full h-[2px] bg-[#E5E5E5] relative rounded-sm overflow-hidden">
        <div
          className="absolute top-0 h-full bg-[#3a080a] rounded-sm"
          style={{
            width: thumbWidth + '%',
            left: scrollLeftPos + '%',
          }}
        />
      </div>
    </div>
  );
}

export default CustomScrollbar;