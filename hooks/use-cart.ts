"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CartItem,
  generateCartItemId,
  canAddToCart,
  validateCartItemQuantity,
  getTotalCartItems,
  getCartSubtotal,
  createCartItemFromProduct,
} from "@/lib/cart-utils";
import { Farmer, Product } from "@/lib/cart-utils";

const CART_STORAGE_KEY = "melody-cart";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsedItems = JSON.parse(stored) as CartItem[];
        // Validate quantities against available stock on load
        const validatedItems = parsedItems.map(validateCartItemQuantity);
        setCartItems(validatedItems);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cartItems, isLoaded]);

  // Add item to cart
  const addToCart = useCallback(
    (farmer: Farmer, product: Product, quantity: number = 1) => {
      const cartItemId = generateCartItemId(
        farmer.id,
        product.type,
        product.breed
      );
      const existingItem = cartItems.find((item) => item.id === cartItemId);

      if (existingItem) {
        // Item already in cart, increase quantity if possible
        if (
          canAddToCart(existingItem.quantity, existingItem.available, quantity)
        ) {
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item.id === cartItemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          );
          return true;
        } else {
          // Cannot add more due to stock limit
          return false;
        }
      } else {
        // New item, add to cart
        if (quantity <= product.available) {
          const newCartItem = createCartItemFromProduct(
            farmer,
            product,
            quantity
          );
          setCartItems((prevItems) => [...prevItems, newCartItem]);
          return true;
        } else {
          return false;
        }
      }
    },
    [cartItems]
  );

  // Remove item from cart
  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== cartItemId)
    );
  }, []);

  // Update item quantity
  const updateQuantity = useCallback(
    (cartItemId: string, newQuantity: number) => {
      if (newQuantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }

      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === cartItemId) {
            const validatedQuantity = Math.min(newQuantity, item.available);
            return { ...item, quantity: validatedQuantity };
          }
          return item;
        })
      );
    },
    [removeFromCart]
  );

  // Increase quantity by 1
  const increaseQuantity = useCallback(
    (cartItemId: string) => {
      const item = cartItems.find((item) => item.id === cartItemId);
      if (item && item.quantity < item.available) {
        updateQuantity(cartItemId, item.quantity + 1);
      }
    },
    [cartItems, updateQuantity]
  );

  // Decrease quantity by 1
  const decreaseQuantity = useCallback(
    (cartItemId: string) => {
      const item = cartItems.find((item) => item.id === cartItemId);
      if (item && item.quantity > 1) {
        updateQuantity(cartItemId, item.quantity - 1);
      } else if (item && item.quantity === 1) {
        removeFromCart(cartItemId);
      }
    },
    [cartItems, updateQuantity, removeFromCart]
  );

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Get item quantity in cart
  const getItemQuantity = useCallback(
    (farmerId: number, productType: string, breed: string) => {
      const cartItemId = generateCartItemId(farmerId, productType, breed);
      const item = cartItems.find((item) => item.id === cartItemId);
      return item?.quantity || 0;
    },
    [cartItems]
  );

  // Check if item can be added to cart
  const canAddItem = useCallback(
    (
      farmerId: number,
      productType: string,
      breed: string,
      available: number,
      addQuantity: number = 1
    ) => {
      const currentQuantity = getItemQuantity(farmerId, productType, breed);
      return canAddToCart(currentQuantity, available, addQuantity);
    },
    [getItemQuantity]
  );

  // Get cart summary
  const cartSummary = {
    totalItems: getTotalCartItems(cartItems),
    subtotal: getCartSubtotal(cartItems),
    itemCount: cartItems.length,
  };

  return {
    cartItems,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getItemQuantity,
    canAddItem,
    cartSummary,
  };
};
