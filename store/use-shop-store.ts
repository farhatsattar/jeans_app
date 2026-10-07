"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface ShopState {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;
  addToCart: (
    item: Omit<CartItem, "quantity"> & { quantity?: number },
    options?: { openDrawer?: boolean }
  ) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      cart: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      setCartOpen: (open) => set({ isCartOpen: open }),
      addToCart: (item, options) =>
        set((state) => {
          const quantityToAdd = Math.max(1, item.quantity ?? 1);
          const existing = state.cart.find(
            (cartItem) =>
              cartItem.productId === item.productId &&
              cartItem.size === item.size
          );

          const nextCart = existing
            ? state.cart.map((cartItem) =>
                cartItem.productId === item.productId &&
                cartItem.size === item.size
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + quantityToAdd,
                    }
                  : cartItem
              )
            : [
                ...state.cart,
                {
                  productId: item.productId,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  size: item.size,
                  quantity: quantityToAdd,
                },
              ];

          return {
            cart: nextCart,
            isCartOpen: options?.openDrawer === false ? state.isCartOpen : true,
          };
        }),
      removeFromCart: (productId, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.productId === productId && item.size === size)
          ),
        })),
      updateQuantity: (productId, size, quantity) =>
        set((state) => ({
          cart:
            quantity < 1
              ? state.cart.filter(
                  (item) =>
                    !(item.productId === productId && item.size === size)
                )
              : state.cart.map((item) =>
                  item.productId === productId && item.size === size
                    ? { ...item, quantity }
                    : item
                ),
        })),
      clearCart: () => set({ cart: [], isCartOpen: false }),
    }),
    {
      name: "haameem-cart",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export const getCartCount = (cart: CartItem[]) =>
  cart.reduce((total, item) => total + item.quantity, 0);

export const getCartTotal = (cart: CartItem[]) =>
  cart.reduce((total, item) => total + item.price * item.quantity, 0);
