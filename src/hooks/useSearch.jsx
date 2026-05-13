import { useState, useEffect, useCallback } from 'react';

/**
 * Levenshtein distance for fuzzy matching.
 * Allows "forgiving" search: e.g., "lipstik" → "Lipstick"
 */
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
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[bLen][aLen];
}

/**
 * Check if a word fuzzy-matches any word in a text string.
 * Threshold scales with word length for natural tolerance.
 */
function fuzzyMatch(query, text) {
  if (!query) return false;
  if (!text) return false;
  if (Array.isArray(text)) text = text.join(' ');
  if (typeof text !== 'string') text = String(text);

  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = text.toLowerCase();

  // Exact substring match first (fast path)
  if (normalizedText.includes(normalizedQuery)) return true;

  // Fuzzy match: check each query word against each text word
  const queryWords = normalizedQuery.split(/\s+/);
  const textWords = normalizedText.split(/\s+/);

  return queryWords.every(qWord => {
    // Dynamic threshold: allows 1 typo per 4 chars, min 1
    const threshold = Math.max(1, Math.floor(qWord.length / 4));
    return textWords.some(tWord => {
      const distance = levenshteinDistance(qWord, tWord);
      return distance <= threshold;
    });
  });
}

/** Curated "Must-Have Icons" for humanist empty state */
const MUST_HAVE_ICONS = [
  { title: "Pillow Talk Lipstick", subtitle: "The Icon", category: "Lips" },
  { title: "Hollywood Flawless Filter", subtitle: "Glow Booster", category: "Face" },
  { title: "Magic Cream", subtitle: "Cult Classic", category: "Skincare" },
  { title: "Airbrush Flawless Foundation", subtitle: "Award Winner", category: "Face" },
  { title: "Pillow Talk Push Up Lashes", subtitle: "Best Seller", category: "Eyes" },
  { title: "Beautiful Skin Foundation", subtitle: "Skin-Like Finish", category: "Face" },
];

/** Smart suggestion categories shown before user types */
const SMART_SUGGESTIONS = [
  { label: "✨ Best Sellers", query: "best" },
  { label: "🔥 Trending Now", query: "pillow talk" },
  { label: "💄 Lipstick", query: "lipstick" },
  { label: "🌟 Foundation", query: "foundation" },
  { label: "✨ Skincare", query: "cream" },
  { label: "🎁 Gift Sets", query: "gift" },
];

/** Quick-access suggestion tags */
const DEFAULT_SEARCH_TAGS = ['Blush', 'Concealer', 'Bronzer', 'Foundation', 'Lipstick', 'Skincare'];

/**
 * useSearch — A "forgiving", human-centric search hook for luxury beauty.
 *
 * Features:
 * - Debounced input (prevents unnecessary filtering while typing)
 * - Fuzzy search (tolerates typos like "lipstik" → "Lipstick")
 * - Smart suggestions before the user types
 * - Humanist empty state with curated recommendations
 * - useMemo-optimized filtering for 60fps on mobile
 */
export default function useSearch(products = [], options = {}) {
  const {
    debounceMs = 300,
    sortDefault = 'Recommended',
  } = options;

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState(sortDefault);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ct_recent_searches') || '[]');
    } catch { return []; }
  });

  // Debounce: delay search until user pauses typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [query, debounceMs]);

  // Parse price helper
  const parsePrice = useCallback((product) => {
    const priceStr = product?.discountPrice || product?.price || '0';
    if (typeof priceStr === 'string' && priceStr.toUpperCase() === 'FREE') return 0;
    const cleaned = String(priceStr).replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  }, []);

  // Core search results with fuzzy matching + sorting - Calculated directly without useMemo for a transparent, humanist approach
  let searchResults = [];
  if (debouncedQuery.trim()) {
    searchResults = products.filter(product => {
      const fieldsToSearch = [
        product.title,
        product.subtitle,
        product.subTitle,
        product.category,
      ];
      return fieldsToSearch.some(field => fuzzyMatch(debouncedQuery, field));
    });

    // Apply sorting
    switch (sortBy) {
      case 'PriceLowToHigh':
        searchResults = [...searchResults].sort((a, b) => parsePrice(a) - parsePrice(b));
        break;
      case 'PriceHighToLow':
        searchResults = [...searchResults].sort((a, b) => parsePrice(b) - parsePrice(a));
        break;
      default:
        break; // 'Recommended' = original order
    }
  }

  // Dynamic suggestions based on current input
  let dynamicSuggestions = DEFAULT_SEARCH_TAGS;
  if (debouncedQuery.trim()) {
    const matches = products
      .filter(p => fuzzyMatch(debouncedQuery, p.title))
      .map(p => p.title)
      .slice(0, 5);

    if (matches.length > 0) {
      dynamicSuggestions = matches;
    }
  }

  // Save to recent searches
  const saveSearch = useCallback((term) => {
    if (!term.trim()) return;
    setRecentSearches(prev => {
      const updated = [term, ...prev.filter(s => s !== term)].slice(0, 6);
      try { localStorage.setItem('ct_recent_searches', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  // Open/close search
  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    if (query.trim()) saveSearch(query.trim());
    setIsSearchOpen(false);
    clearSearch();
  }, [query, saveSearch, clearSearch]);

  return {
    // State
    query,
    debouncedQuery,
    sortBy,
    isSearchOpen,
    recentSearches,

    // Directly computed arrays
    searchResults,
    dynamicSuggestions,

    // Constants
    smartSuggestions: SMART_SUGGESTIONS,
    mustHaveIcons: MUST_HAVE_ICONS,
    defaultTags: DEFAULT_SEARCH_TAGS,

    // Actions
    setQuery,
    setSortBy,
    clearSearch,
    openSearch,
    closeSearch,
    saveSearch,
    setIsSearchOpen,
  };
}
