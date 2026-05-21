import React, { useState, useEffect, useCallback } from 'react';

const CustomScrollbar = ({ elementId }) => {
    const [thumbWidth, setThumbWidth] = useState(0);
    const [scrollLeftPos, setScrollLeftPos] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    
    const updateScrollState = useCallback(() => {
        const el = document.getElementById(elementId);
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        
        const ratio = clientWidth / scrollWidth;
        setThumbWidth(ratio * 100);

        const maxScrollLeft = scrollWidth - clientWidth;
        const leftPercent = maxScrollLeft > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
        setScrollLeftPos(leftPercent);
    }, [elementId]);

    useEffect(() => {
        const el = document.getElementById(elementId);
        if (el) {
            el.addEventListener('scroll', updateScrollState);
            setTimeout(updateScrollState, 100);
            window.addEventListener('resize', updateScrollState);
        }

        return () => {
            if (el) {
                el.removeEventListener('scroll', updateScrollState);
            }
            window.removeEventListener('resize', updateScrollState);
        };
    }, [elementId, updateScrollState]);

    const handlePointerDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handlePointerMove = useCallback((e) => {
        const el = document.getElementById(elementId);
        const track = document.getElementById(`${elementId}-track`);
        if (!isDragging || !track || !el) return;
        
        const trackRect = track.getBoundingClientRect();
        const { scrollWidth, clientWidth } = el;
        
        let pointerX = e.clientX - trackRect.left;
        pointerX = Math.max(0, Math.min(pointerX, trackRect.width));
        
        const thumbPixelWidth = (thumbWidth / 100) * trackRect.width;
        let newThumbLeft = pointerX - (thumbPixelWidth / 2);
        
        const maxThumbLeft = trackRect.width - thumbPixelWidth;
        newThumbLeft = Math.max(0, Math.min(newThumbLeft, maxThumbLeft));
        
        const scrollPercentage = newThumbLeft / maxThumbLeft;
        const maxScrollLeft = scrollWidth - clientWidth;
        el.scrollLeft = scrollPercentage * maxScrollLeft;
    }, [isDragging, elementId, thumbWidth]);

    const handlePointerUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        } else {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        }
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging, handlePointerMove, handlePointerUp]);

    if (thumbWidth >= 100) return null;

    return (
        <div 
            id={`${elementId}-track`}
            className={`w-[190px] mx-auto py-3 mt-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={handlePointerDown}
        >
            <div className="w-full h-[2px] bg-[#E5E5E5] relative rounded-sm overflow-hidden">
                <div 
                    className="absolute top-0 h-full bg-[#3a080a] transition-none rounded-sm"
                    style={{ 
                        width: `${thumbWidth}%`,
                        left: `${scrollLeftPos}%`,
                        transition: isDragging ? 'none' : 'left 0.3s ease-out'
                    }}
                />
            </div>
        </div>
    );
};

export default CustomScrollbar;
