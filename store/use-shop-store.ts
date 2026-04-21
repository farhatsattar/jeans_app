"use client";

import { create } from "zustand";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface ShopState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find(
        (cartItem) =>
          cartItem.productId === item.productId && cartItem.size === item.size,
      );

      if (existing) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.productId === item.productId && cartItem.size === item.size
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        };
      }

      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (productId, size) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    })),
  updateQuantity: (productId, size, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));

export const getCartCount = (cart: CartItem[]) =>
  cart.reduce((total, item) => total + item.quantity, 0);

export const getCartTotal = (cart: CartItem[]) =>
  cart.reduce((total, item) => total + item.price * item.quantity, 0);
