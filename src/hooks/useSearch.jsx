import { useState, useEffect, useCallback } from "react";

// Levenshtein distance for fuzzy matching
function levenshteinDistance(a, b) {
  const matrix = [];
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  for (let i = 0; i <= bLen; i++) matrix[i] = [i];
  for (let j = 0; j <= aLen; j++) matrix[0][j] = j;

  for (let i = 1; i <= bLen; i++) {
    for (let j = 1; j <= aLen; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[bLen][aLen];
}

function fuzzyMatch(query, text) {
  if (!query || !text) return false;
  if (Array.isArray(text)) text = text.join(" ");
  if (typeof text !== "string") text = String(text);

  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = text.toLowerCase();

  if (normalizedText.includes(normalizedQuery)) return true;

  const queryWords = normalizedQuery.split(" ").filter(Boolean);
  const textWords = normalizedText.split(" ").filter(Boolean);

  return queryWords.every((qWord) => {
    const threshold = Math.max(1, Math.floor(qWord.length / 4));
    return textWords.some((tWord) => levenshteinDistance(qWord, tWord) <= threshold);
  });
}

const DEFAULT_SEARCH_TAGS = ["Blush", "Concealer", "Bronzer", "Foundation", "Lipstick", "Skincare"];

export default function useSearch(products = [], options = {}) {
  const { debounceMs = 300, sortDefault = "Recommended" } = options;

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortBy, setSortBy] = useState(sortDefault);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), debounceMs);
    return () => clearTimeout(handler);
  }, [query, debounceMs]);

  const parsePrice = useCallback((product) => {
    const priceStr = product?.discountPrice || product?.price || "0";
    if (typeof priceStr === "string" && priceStr.toUpperCase() === "FREE") return 0;
    const cleaned = String(priceStr).replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  }, []);

  // Expand products by shades so users can search by shade name
  const allProductsExpanded = [];
  products.forEach((product) => {
    const shades = product.shades || product.detailPageData?.shades || [];
    if (shades.length > 0) {
      shades.forEach((shade) => {
        allProductsExpanded.push({
          ...product,
          selectedShade: shade,
          searchId: `${product.id || product.title}-${shade.name}`,
        });
      });
    } else {
      allProductsExpanded.push({
        ...product,
        searchId: product.id || product.title,
      });
    }
  });

  // Filter and sort search results
  let searchResults = [];
  if (debouncedQuery.trim()) {
    searchResults = allProductsExpanded.filter((product) => {
      const fieldsToSearch = [
        product.title,
        product.subtitle,
        product.subTitle,
        product.category,
        product.selectedShade?.name,
      ];
      return fieldsToSearch.some((field) => fuzzyMatch(debouncedQuery, field));
    });

    if (sortBy === "PriceLowToHigh") {
      searchResults = [...searchResults].sort((a, b) => parsePrice(a) - parsePrice(b));
    } else if (sortBy === "PriceHighToLow") {
      searchResults = [...searchResults].sort((a, b) => parsePrice(b) - parsePrice(a));
    }
  }

  // Dynamic suggestions based on query
  let dynamicSuggestions = DEFAULT_SEARCH_TAGS;
  if (debouncedQuery.trim()) {
    const matches = products
      .filter((p) => fuzzyMatch(debouncedQuery, p.title))
      .map((p) => p.title)
      .slice(0, 5);
    if (matches.length > 0) {
      dynamicSuggestions = [...new Set(matches)];
    }
  }

  const saveSearch = useCallback((term) => {
    if (!term.trim()) return;
    setRecentSearches((prev) =>
      [term, ...prev.filter((s) => s !== term)].slice(0, 6)
    );
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
  }, []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => {
    if (query.trim()) saveSearch(query.trim());
    setIsSearchOpen(false);
    clearSearch();
  }, [query, saveSearch, clearSearch]);

  return {
    query,
    debouncedQuery,
    sortBy,
    isSearchOpen,
    recentSearches,
    searchResults,
    expandedProducts: allProductsExpanded,
    dynamicSuggestions,
    defaultTags: DEFAULT_SEARCH_TAGS,
    setQuery,
    setSortBy,
    clearSearch,
    openSearch,
    closeSearch,
    saveSearch,
    setIsSearchOpen,
  };
}
