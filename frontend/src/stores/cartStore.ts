import type { ICart } from "@/types/product.types";
import { defineStore } from "pinia";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart-items") || "[]"),
  }),
  actions: {
    addItemToCart(cartItem: ICart) {
      const existingItem = this.items.find(
        (item: {
          id: string | number;
          size: string;
          mat: string;
          col: string;
        }) =>
          item.id === cartItem.id &&
          item.size === cartItem.size &&
          item.mat === cartItem.mat &&
          item.col === cartItem.col
      );

      if (existingItem) {
        existingItem.qty += cartItem.qty;
      } else {
        this.items.push(cartItem);
      }
      this.saveToLocalStorage();
    },

    removeFromCart(id: any) {
      this.items = this.items.filter((item: { id: any }) => item.id !== id);
      this.saveToLocalStorage();
    },
    updateQuantity(id: any, qty: any) {
      const item = this.items.find((item: { id: any }) => item.id === id);
      if (item) item.qty = qty;

      this.saveToLocalStorage();
    },
    removeItemFromCart(id: any, size: any, mat: any, col: any) {
      const index = this.items.findIndex(
        (item: { id: any; size: any; mat: any; col: any }) =>
          item.id === id &&
          item.size === size &&
          item.mat === mat &&
          item.col === col
      );

      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    updateItemQuantity(id: any, size: any, mat: any, col: any, newQty: number) {
      const item = this.items.find(
        (item: { id: any; size: any; mat: any; col: any }) =>
          item.id === id &&
          item.size === size &&
          item.mat === mat &&
          item.col === col
      );

      if (item) {
        item.qty = newQty;

        if (newQty === 0) {
          this.removeItemFromCart(id, size, mat, col);
        } else {
          this.saveToLocalStorage();
        }
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("cart-items", JSON.stringify(this.items));
    },
  },
  getters: {
    cartItemCount: (state) => state.items.length,
    totalPrice: (state) => {
      return state.items.reduce(
        (total: number, item: { price: number; qty: number }) =>
          total + item.price * item.qty,
        0
      );
    },
    itemsGroupedByProduct: (state) => {
      return state.items.reduce(
        (grouped: { [x: string]: any[] }, item: { id: string | number }) => {
          if (!grouped[item.id]) {
            grouped[item.id] = [];
          }
          grouped[item.id].push(item);
          return grouped;
        },
        {}
      );
    },
    cartItems: (state) => state.items,
    cartItemsByProductId: (state) => (productId: any) =>
      state.items.filter((item: { id: any }) => item.id === productId),
  },
});
