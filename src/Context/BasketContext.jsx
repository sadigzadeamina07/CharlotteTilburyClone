import React, { createContext, useState, useContext, useEffect } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);
  const [basketOpen, setBasketOpen] = useState(false);

  // Lock scroll when basket is open
  useEffect(() => {
    document.body.style.overflow = basketOpen ? "hidden" : "auto";
  }, [basketOpen]);

  const getProductKey = (product) => {
    const title = product.title || "Unknown";
    const shade = product.shade || product.selectedShade?.name || "No Shade";
    return `${title}-${shade}`;
  };

  const handleAddtoBasket = (product) => {
    const key = getProductKey(product);
    const exists = basket.find((item) => getProductKey(item) === key);

    if (exists) {
      setBasket(basket.map((item) =>
        getProductKey(item) === key
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setBasket([...basket, { ...product, quantity: 1 }]);
    }

    setBasketOpen(true);
  };

  const removeFromBasket = (product) => {
    const key = typeof product === "string" ? product : getProductKey(product);
    setBasket(basket.filter((item) =>
      getProductKey(item) !== key && item.title !== key
    ));
  };

  const updateQuantity = (product, newQty) => {
    if (newQty <= 0) {
      removeFromBasket(product);
      return;
    }
    const key = typeof product === "string" ? product : getProductKey(product);
    setBasket(basket.map((item) =>
      getProductKey(item) === key || item.title === key
        ? { ...item, quantity: newQty }
        : item
    ));
  };

  const increaseQuantity = (product) => {
    const key = getProductKey(product);
    setBasket(basket.map((item) =>
      getProductKey(item) === key
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    ));
  };

  const decreaseQuantity = (product) => {
    const key = getProductKey(product);
    const item = basket.find((i) => getProductKey(i) === key);
    if (item && item.quantity <= 1) {
      removeFromBasket(product);
      return;
    }
    setBasket(basket.map((item) =>
      getProductKey(item) === key
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const totalPrice = basket.reduce((sum, item) => {
    const priceStr = item.price ? String(item.price) : "0";
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
    return sum + price * item.quantity;
  }, 0);

  const toggleBasket = () => setBasketOpen(!basketOpen);
  const closeBasket = () => setBasketOpen(false);

  return (
    <BasketContext.Provider value={{
      basket,
      handleAddtoBasket,
      removeFromBasket,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      totalPrice,
      toggleBasket,
      closeBasket,
      setBasketOpen,
      basketOpen,
      // Legacy aliases so existing components don't break
      ToggleBasket: toggleBasket,
      CloseBasket: closeBasket,
      Basketopen: basketOpen,
    }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}
