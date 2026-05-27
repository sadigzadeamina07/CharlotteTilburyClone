import { useState } from "react";

export function useProductSearch(products) {

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");

  const text = query.toLowerCase();

  let results = [];

  if (query) {

    const groupedByProduct = [];

    // Eyni məhsulu iki dəfə emal etməmək üçün işlənmiş title-ları saxlayırıq
    const seenTitles = new Set();

    products.forEach((product) => {
      const title = (product.title).toLowerCase();
      const subtitle = (product.subtitle || "").toLowerCase();
      const shades = product.shades || [];

      // Bu məhsul artıq işləniblsə keç
      if (seenTitles.has(product.title)) return;
      seenTitles.add(product.title);

      const titleMatch = title.includes(text);
      const subtitleMatch = subtitle.includes(text);

      const productCards = [];

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
            });
          });
        } else {
          productCards.push(product);
        }
      } else {
        const matchingShades = shades.filter((shade) =>
          (shade.name || "").toLowerCase().includes(text)
        );
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
          });
        });
      }

      if (productCards.length > 0) {
        groupedByProduct.push(productCards);
      }
    });

    // Növbə ilə götür: əvvəl hər məhsulun 1-cisi, sonra 2-cisi...
    const maxShades = Math.max(...groupedByProduct.map((g) => g.length));

    for (let i = 0; i < maxShades; i++) {
      groupedByProduct.forEach((productCards) => {
        if (productCards[i]) {
          results.push(productCards[i]);
        }
      });
    }
  }

  if (sortBy === "PriceLowToHigh") {
    results = [...results].sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sortBy === "PriceHighToLow") {
    results = [...results].sort((a, b) => Number(b.price) - Number(a.price));
  }

  const hasQuery = query.length > 0;
  const hasResults = results.length > 0;

  return {
    query,
    setQuery,
    sortBy,
    setSortBy,
    results,
    hasQuery,
    hasResults,
  };
}
