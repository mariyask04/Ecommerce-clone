//context/CartContext.jsx:
"use client";
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userModified = useRef(false);
  const saveTimeout = useRef(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    setInitialized(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (email && initialized) {
      fetchCart();
    }
  }, [email, initialized]);

  const fetchCart = useCallback(async () => {
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/cart?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setCartItems(
        (data.cartItems || []).map(item => ({
          name: item.name,
          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
          quantity: item.quantity,
          totalPrice: item.quantity * (typeof item.price === 'string' ? parseFloat(item.price) : item.price)
        }))
      );
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setError(error.message);

      const localCart = localStorage.getItem(`pendingCart_${email}`);
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      }
    } finally {
      setLoading(false);
    }
  }, [email]);

  const saveCart = useCallback(async (retryCount = 0) => {
    if (!email || !initialized || !userModified.current) return;

    try {
      const response = await fetch("/api/saveCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          cartItems: cartItems.map(({ name, price, quantity }) => ({
            name,
            price,
            quantity,
            totalPrice: price * quantity
          }))
        })
      });
      ;

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save cart");
      }

      localStorage.removeItem(`pendingCart_${email}`);
      userModified.current = false;
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message);

      localStorage.setItem(`pendingCart_${email}`, JSON.stringify(cartItems));

      if (retryCount < 3) {
        setTimeout(() => saveCart(retryCount + 1), 2000 * (retryCount + 1));
      }
    }
  }, [email, initialized, cartItems]);

  useEffect(() => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    if (userModified.current) {
      saveTimeout.current = setTimeout(() => {
        saveCart();
      }, 500);
    }

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [cartItems, saveCart]);

  const addItem = useCallback((product, quantity = 1) => {
    if (!product?.id) {
      console.error("Product must have an id to be added to cart.");
      return;
    }

    userModified.current = true;
    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + quantity,
              totalPrice: (item.quantity + quantity) * price
            }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price,
          quantity,
          totalPrice: quantity * price
        }
      ];
    });
  }, []);


  const removeItem = useCallback((id) => {
    userModified.current = true;
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const getTotalQuantity = useCallback(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const getSubtotal = useCallback(
    () => cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
    [cartItems]
  );

  const setUserEmail = useCallback((newEmail) => {
    localStorage.setItem("userEmail", newEmail);
    setEmail(newEmail);
    userModified.current = false;
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        setCartItems,
        cartItems,
        addItem,
        removeItem,
        getTotalQuantity,
        getSubtotal,
        email,
        setEmail: setUserEmail,
        initialized,
        loading,
        error,
        refreshCart: fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};