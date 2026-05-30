import { useState, useEffect } from "react"

export function useScrollCarousel(elementId, dependency) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  
  const [thumbWidth, setThumbWidth] = useState(0)
  const [scrollLeftPos, setScrollLeftPos] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const el = document.getElementById(elementId)
    if (!el) return

    const updateAll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el

      
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1)

      
      setThumbWidth((clientWidth / scrollWidth) * 100)
      const maxScrollLeft = scrollWidth - clientWidth
      setScrollLeftPos(maxScrollLeft > 0 ? (scrollLeft / scrollWidth) * 100 : 0)
    }

    updateAll()
    el.addEventListener("scroll", updateAll)
    window.addEventListener("resize", updateAll)

    const resizeObserver = new ResizeObserver(updateAll)
    resizeObserver.observe(el)

    return () => {
      el.removeEventListener("scroll", updateAll)
      window.removeEventListener("resize", updateAll)
      resizeObserver.disconnect()
    }
  }, [elementId, dependency])

  
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      const el = document.getElementById(elementId)
      const track = document.getElementById(elementId + "-track")
      if (!el || !track) return
      const { left, width } = track.getBoundingClientRect()
      el.scrollLeft =
        ((e.clientX - left) / width) * (el.scrollWidth - el.clientWidth)
    }

    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, elementId])

  const scrollLeft = () => {
    const el = document.getElementById(elementId)
    if (el) el.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = () => {
    const el = document.getElementById(elementId)
    if (el) el.scrollBy({ left: 300, behavior: "smooth" })
  }

  return {
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    
    thumbWidth,
    scrollLeftPos,
    isDragging,
    setIsDragging,
  }
}
