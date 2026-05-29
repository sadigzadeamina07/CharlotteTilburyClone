import React, { useState, useEffect } from 'react';

function CustomScrollbar({ elementId, thumbWidth, scrollLeftPos, isDragging, setIsDragging }) {
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
          style={{ width: thumbWidth + '%', left: scrollLeftPos + '%' }}
        />
      </div>
    </div>
  );
}

export default CustomScrollbar;