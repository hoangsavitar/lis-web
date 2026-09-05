"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string; // Composite key: `${productId}_${color}_${size}`
  productId: string;
  slug: string;
  title: string;
  price: number;
  comparePrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  getTotalItems: () => number;
  getSubtotal: () => number;
  getFreeshipRemaining: () => number;
  getFreeshipProgress: () => number;
}

export const FREESHIP_THRESHOLD = 1000000; // 1.000.000đ

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const compositeId = `${newItem.productId}_${newItem.color}_${newItem.size}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === compositeId);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += newItem.quantity || 1;
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [
              ...currentItems,
              {
                ...newItem,
                id: compositeId,
                quantity: newItem.quantity || 1,
              },
            ],
            isOpen: true, // Auto slide-open drawer when adding item
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getFreeshipRemaining: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, FREESHIP_THRESHOLD - subtotal);
      },

      getFreeshipProgress: () => {
        const subtotal = get().getSubtotal();
        return Math.min(100, Math.round((subtotal / FREESHIP_THRESHOLD) * 100));
      },
    }),
    {
      name: "lis_luxury_cart",
      storage: createJSONStorage(() => localStorage),
      // Only persist items, isOpen is ephemeral UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
