import React, { createContext, useState, useContext, useEffect } from 'react';
const BasketContext = createContext()

// Helper: unique key for a basket item (title + shade)
const getItemKey = (item) => {
  const base = item.title || 'default_title';
  const shade = item.shade || item.selectedShade?.name || 'default_shade';
  const cat = item.category || 'default_category';
  return `${base}::${shade}::${cat}`;
};

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(() => {
    try {
      const saved = localStorage.getItem('charlotte_basket');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [Basketopen, setBasketOpen] = useState(false)
  useEffect(() => {
    if (Basketopen) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'auto'
    }
  }, [Basketopen])

  useEffect(() => {
    localStorage.setItem('charlotte_basket', JSON.stringify(basket));
  }, [basket]);

  const handleAddtoBasket = (product) => {
    const productKey = getItemKey(product);
    console.log('[BASKET] Adding product key:', productKey);
    setBasket((prevBasket) => {
      console.log('[BASKET] Existing keys:', prevBasket.map(i => getItemKey(i)));
      const isExist = prevBasket.find((item) => getItemKey(item) === productKey)
      if (isExist) {
        console.log('[BASKET] MATCH FOUND — increasing quantity');
        return prevBasket.map((item) => getItemKey(item) === productKey ? { ...item, quantity: item.quantity + 1 } : item)
      }
      console.log('[BASKET] NO MATCH — adding new item');
      return [...prevBasket, { ...product, quantity: 1 }]
    })
    setBasketOpen(true)
  }

  const removeFromBasket = (product) => {
    // Support both string (legacy) and object
    if (typeof product === 'string') {
      setBasket((prev) => prev.filter((item) => item.title !== product));
    } else {
      const key = getItemKey(product);
      setBasket((prev) => prev.filter((item) => getItemKey(item) !== key));
    }
  }

  const updateQuantity = (product, newQty) => {
    if (newQty <= 0) {
      removeFromBasket(product);
      return;
    }
    // Support both string (legacy title) and object
    if (typeof product === 'string') {
      setBasket((prev) =>
        prev.map((item) =>
          item.title === product ? { ...item, quantity: newQty } : item
        )
      );
    } else {
      const key = getItemKey(product);
      setBasket((prev) =>
        prev.map((item) =>
          getItemKey(item) === key ? { ...item, quantity: newQty } : item
        )
      );
    }
  }

  const increaseQuantity = (product) => {
    const key = getItemKey(product);
    setBasket((prev) =>
      prev.map((item) =>
        getItemKey(item) === key ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  }

  const decreaseQuantity = (product) => {
    const key = getItemKey(product);
    setBasket((prev) => {
      const item = prev.find((i) => getItemKey(i) === key);
      if (item && item.quantity <= 1) {
        return prev.filter((i) => getItemKey(i) !== key);
      }
      return prev.map((i) =>
        getItemKey(i) === key ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }

  const totalPrice = basket.reduce((acc, item) => {
    const price = parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || 0);
    return acc + price * item.quantity;
  }, 0);

  const ToggleBasket = () => {
    setBasketOpen(!Basketopen)
  }
  const CloseBasket = () => {
    setBasketOpen(false)
  }
  return (
    <BasketContext.Provider value={{ basket, handleAddtoBasket, removeFromBasket, updateQuantity, increaseQuantity, decreaseQuantity, totalPrice, ToggleBasket, CloseBasket, setBasketOpen, Basketopen }}>
      {children}
    </BasketContext.Provider>
  )
}

export const useBasket = () => { return useContext(BasketContext); };

