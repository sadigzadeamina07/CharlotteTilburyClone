import { useState } from "react"

export function useProductSearch({ trending = [], bestSellers = [] } = {}) {
  const [query, setQuery] = useState("")
  const [sortBy, setSortBy] = useState("Recommended")

  const products = [
    ...trending,
    ...bestSellers.filter(
      (b) => !trending.some((t) => t.title === b.title && t.subtitle === b.subtitle)
    ),
  ]
  const text = query.toLowerCase()

  let results = []

  if (query) {
    const groupedByProduct = []
    const seenTitles = new Set()

    products.forEach((product) => {
      const title = product.title.toLowerCase()
      const subtitle = (product.subtitle || "").toLowerCase()
      const shades = product.shades || []

      if (seenTitles.has(product.title)) return
      seenTitles.add(product.title)

      const titleMatch = title.includes(text)
      const subtitleMatch = subtitle.includes(text)

      const productCards = []

      if (titleMatch || subtitleMatch) {
        if (shades.length > 0) {
          shades.forEach((shade) => {
            productCards.push({
              ...product,
              images: {
                main: shade.galleryImages?.[0] || product.images?.main,
                hover: shade.hoverImage || product.images?.hover,
              },
              subtitle: shade.name,
              price: shade.price || product.price,
              url: shade.url || product.url,
              selectedShade: shade,
            })
          })
        } else {
          productCards.push(product)
        }
      } else {
        const matchingShades = shades.filter((shade) =>
          (shade.name || "").toLowerCase().includes(text)
        )
        matchingShades.forEach((shade) => {
          productCards.push({
            ...product,
            images: {
              main: shade.galleryImages?.[0] || product.images?.main,
              hover: shade.hoverImage || product.images?.hover,
            },
            subtitle: shade.name,
            price: shade.price || product.price,
            url: shade.url || product.url,
            selectedShade: shade,
          })
        })
      }

      if (productCards.length > 0) {
        groupedByProduct.push(productCards)
      }
    })

    const maxShades = Math.max(...groupedByProduct.map((g) => g.length))
    for (let i = 0; i < maxShades; i++) {
      groupedByProduct.forEach((productCards) => {
        if (productCards[i]) results.push(productCards[i])
      })
    }
  }

  
  const sortFn =
    sortBy === "PriceLowToHigh"
      ? (a, b) => Number(a.price) - Number(b.price)
      : sortBy === "PriceHighToLow"
      ? (a, b) => Number(b.price) - Number(a.price)
      : null

  if (sortFn) {
    results = [...results].sort(sortFn)
  }

  const sortedProducts = sortFn ? [...products].sort(sortFn) : products

  const hasQuery = query.length > 0
  const hasResults = results.length > 0

  return {
    query,
    setQuery,
    sortBy,
    setSortBy,
    results,
    sortedProducts,
    hasQuery,
    hasResults,
  }
}
