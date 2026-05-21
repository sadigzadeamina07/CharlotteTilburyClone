import React, { createContext, useState, useContext, useEffect } from 'react';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  // LocalStorage istifade etmirik, sadəcə sadə state
  const [basket, setBasket] = useState([]);
  const [Basketopen, setBasketOpen] = useState(false);

  useEffect(() => {
    if (Basketopen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [Basketopen]);

  // Sadə ID yaradılması
  const getProductKey = (product) => {
    const title = product.title || 'Mehsul';
    const shade = product.shade || product.selectedShade?.name || 'Rengsiz';
    return title + "-" + shade;
  };

  const handleAddtoBasket = (product) => {
    const productKey = getProductKey(product);
    
    // Məhsulun səbətdə olub-olmadığını yoxlayırıq
    const exists = basket.find((item) => getProductKey(item) === productKey);

    if (exists) {
      // Varsa sayını 1 artırırıq
      const newBasket = basket.map((item) => {
        if (getProductKey(item) === productKey) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setBasket(newBasket);
    } else {
      // Yoxdursa yeni əlavə edirik və sayını 1 edirik
      setBasket([...basket, { ...product, quantity: 1 }]);
    }
    
    setBasketOpen(true);
  };

  const removeFromBasket = (product) => {
    const productKey = typeof product === 'string' ? product : getProductKey(product);
    const newBasket = basket.filter((item) => {
      return getProductKey(item) !== productKey && item.title !== productKey;
    });
    setBasket(newBasket);
  };

  const updateQuantity = (product, newQty) => {
    if (newQty <= 0) {
      removeFromBasket(product);
      return;
    }
    
    const productKey = typeof product === 'string' ? product : getProductKey(product);
    const newBasket = basket.map((item) => {
      if (getProductKey(item) === productKey || item.title === productKey) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setBasket(newBasket);
  };

  const increaseQuantity = (product) => {
    const productKey = getProductKey(product);
    const newBasket = basket.map((item) => {
      if (getProductKey(item) === productKey) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    setBasket(newBasket);
  };

  const decreaseQuantity = (product) => {
    const productKey = getProductKey(product);
    
    const item = basket.find((i) => getProductKey(i) === productKey);
    if (item && item.quantity <= 1) {
      removeFromBasket(product);
      return;
    }
    
    const newBasket = basket.map((item) => {
      if (getProductKey(item) === productKey) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setBasket(newBasket);
  };

  // Ümumi qiyməti hesablamaq
  const totalPrice = basket.reduce((toplam, item) => {
    const priceStr = item.price ? String(item.price) : "0";
    const qiymet = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    return toplam + (qiymet * item.quantity);
  }, 0);

  const ToggleBasket = () => {
    setBasketOpen(!Basketopen);
  };

  const CloseBasket = () => {
    setBasketOpen(false);
  };

  return (
    <BasketContext.Provider value={{ 
      basket, 
      handleAddtoBasket, 
      removeFromBasket, 
      updateQuantity, 
      increaseQuantity, 
      decreaseQuantity, 
      totalPrice, 
      ToggleBasket, 
      CloseBasket, 
      setBasketOpen, 
      Basketopen 
    }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  return useContext(BasketContext);
};

