import { useState, useEffect, useCallback } from 'react';

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
  if (!query) return false;
  if (!text) return false;
  if (Array.isArray(text)) text = text.join(' ');
  if (typeof text !== 'string') text = String(text);

  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = text.toLowerCase();

  if (normalizedText.includes(normalizedQuery)) return true;

  const queryWords = normalizedQuery.split(/\s+/);
  const textWords = normalizedText.split(/\s+/);

  return queryWords.every(qWord => {
    const threshold = Math.max(1, Math.floor(qWord.length / 4));
    return textWords.some(tWord => {
      const distance = levenshteinDistance(qWord, tWord);
      return distance <= threshold;
    });
  });
}

const MUST_HAVE_ICONS = [
  { title: "Pillow Talk Lipstick", subtitle: "The Icon", category: "Lips" },
  { title: "Hollywood Flawless Filter", subtitle: "Glow Booster", category: "Face" },
  { title: "Magic Cream", subtitle: "Cult Classic", category: "Skincare" },
  { title: "Airbrush Flawless Foundation", subtitle: "Award Winner", category: "Face" },
  { title: "Pillow Talk Push Up Lashes", subtitle: "Best Seller", category: "Eyes" },
  { title: "Beautiful Skin Foundation", subtitle: "Skin-Like Finish", category: "Face" },
];

const SMART_SUGGESTIONS = [
  { label: "✨ Best Sellers", query: "best" },
  { label: "🔥 Trending Now", query: "pillow talk" },
  { label: "💄 Lipstick", query: "lipstick" },
  { label: "🌟 Foundation", query: "foundation" },
  { label: "✨ Skincare", query: "cream" },
  { label: "🎁 Gift Sets", query: "gift" },
];

const DEFAULT_SEARCH_TAGS = ['Blush', 'Concealer', 'Bronzer', 'Foundation', 'Lipstick', 'Skincare'];

export default function useSearch(products = [], options = {}) {
  const { debounceMs = 300, sortDefault = 'Recommended' } = options;

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState(sortDefault);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ct_recent_searches') || '[]');
    } catch { return []; }
  });

  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedQuery(query); }, debounceMs);
    return () => clearTimeout(handler);
  }, [query, debounceMs]);

  const parsePrice = useCallback((product) => {
    const priceStr = product?.discountPrice || product?.price || '0';
    if (typeof priceStr === 'string' && priceStr.toUpperCase() === 'FREE') return 0;
    const cleaned = String(priceStr).replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  }, []);

  // 1. DƏYİŞİKLİK: Məhsulları Shade-lərinə görə çoxaldırıq
  let allProductsExpanded = [];
  products.forEach(product => {
    const shades = product.shades || product.detailPageData?.shades || [];
    
    if (shades.length > 0) {
      shades.forEach(shade => {
        allProductsExpanded.push({
          ...product,
          selectedShade: shade,
          searchId: `${product.id || product.title}-${shade.name}` // Unique Key
        });
      });
    } else {
      allProductsExpanded.push({
        ...product,
        searchId: product.id || product.title
      });
    }
  });

  let searchResults = [];
  if (debouncedQuery.trim()) {
    searchResults = allProductsExpanded.filter(product => {
      const fieldsToSearch = [
        product.title,
        product.subtitle,
        product.subTitle,
        product.category,
        product.selectedShade?.name // Artıq shade adına görə axtarış edə bilər (məs: "2 Fair")
      ];
      return fieldsToSearch.some(field => fuzzyMatch(debouncedQuery, field));
    });

    switch (sortBy) {
      case 'PriceLowToHigh':
        searchResults = [...searchResults].sort((a, b) => parsePrice(a) - parsePrice(b));
        break;
      case 'PriceHighToLow':
        searchResults = [...searchResults].sort((a, b) => parsePrice(b) - parsePrice(a));
        break;
      default:
        break;
    }
  }

  let dynamicSuggestions = DEFAULT_SEARCH_TAGS;
  if (debouncedQuery.trim()) {
    const matches = products
      .filter(p => fuzzyMatch(debouncedQuery, p.title))
      .map(p => p.title)
      .slice(0, 5);

    if (matches.length > 0) {
      dynamicSuggestions = [...new Set(matches)]; // Duplicate-lərin qarşısını alırıq
    }
  }

  const saveSearch = useCallback((term) => {
    if (!term.trim()) return;
    setRecentSearches(prev => {
      const updated = [term, ...prev.filter(s => s !== term)].slice(0, 6);
      try { localStorage.setItem('ct_recent_searches', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  const openSearch = useCallback(() => { setIsSearchOpen(true); }, []);
  const closeSearch = useCallback(() => {
    if (query.trim()) saveSearch(query.trim());
    setIsSearchOpen(false);
    clearSearch();
  }, [query, saveSearch, clearSearch]);

  return {
    query, debouncedQuery, sortBy, isSearchOpen, recentSearches,
    searchResults,
    expandedProducts: allProductsExpanded, // Genişləndirilmiş datanı geri qaytarırıq
    dynamicSuggestions,
    smartSuggestions: SMART_SUGGESTIONS, mustHaveIcons: MUST_HAVE_ICONS, defaultTags: DEFAULT_SEARCH_TAGS,
    setQuery, setSortBy, clearSearch, openSearch, closeSearch, saveSearch, setIsSearchOpen,
  };
}
