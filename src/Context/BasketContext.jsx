import React, { createContext, useState, useContext, useEffect } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
 const [basket, setBasket] = useState([]);
  const [basketOpen, setBasketOpen] = useState(false);
  //  (Skrol kilidi)
  useEffect(() => {
    document.body.style.overflow = basketOpen ? "hidden" : "auto";
  }, [basketOpen]);

  const updateQuantity = (product, newQty) => {
    if (newQty <= 0) return removeFromBasket(product);
    setBasket(
      basket.map((item) =>
        item.title === product.title ? { ...item, quantity: newQty } : item
      )
    );
  };

  const addToBasket = (product) => {
    const exists = basket.find((item) => item.title === product.title);

    if (exists) {
      updateQuantity(product, exists.quantity + 1);
    } else {
      setBasket([...basket, { ...product, quantity: 1 }]);
    }
    setBasketOpen(true);
  };

  const removeFromBasket = (product) => {
    setBasket(basket.filter((item) => item.title !== product.title));
  };

const totalPrice = basket.reduce((sum, item) => sum + (Number(item.price)) * item.quantity, 0);
  return (
    <BasketContext.Provider value={{
   basket,
        basketOpen,
        setBasketOpen, 
        addToBasket,
        removeFromBasket,
        updateQuantity,
        totalPrice,
    }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}
