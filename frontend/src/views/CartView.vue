<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import type { ICart } from "@/types/product.types";
import { computed } from "vue";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);
const totalItems = computed(() => cartStore.cartItemCount);

const incrementQuantity = (item: ICart) => {
  cartStore.updateQuantity(item.id, item.qty + 1);
};

const decrementQuantity = (item: ICart) => {
  if (item.qty > 1) {
    cartStore.updateQuantity(item.id, item.qty - 1);
  }
};

const removeItem = (id: any) => {
  cartStore.removeFromCart(id);
};
const formatPrice = (price: number) => {
  return price.toFixed(2);
};
</script>

<template>
  <main class="mx-auto my-6 px-10">
    <div class="flex flex-col justify-center gap-y-4">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="CARTID flex items-center justify-between w-full"
        style="margin-bottom: 32px"
      >
        <div class="flex items-center justify-center mr-5">
          <img
            :src="item.img"
            :alt="item.title"
            width="150px"
            class="object-cover"
          />
        </div>
        <div
          class="flex flex-col sm:flex-row sm:justify-between w-full items-center sm:items-end"
        >
          <div class="target flex items-start flex-col w-full">
            <p>{{ item.title }}</p>
            <p id="cart-price">NGN{{ item.price }}</p>
            <p>
              Size: <span>{{ item.size }}</span>
            </p>
            <p>
              Color: <span>{{ item.col }}</span>
            </p>
            <p>
              Material: <span>{{ item.mat }}</span>
            </p>
          </div>
          <div class="flex items-center">
            <div
              class="w-[130px] border border-gray-400 px-6 py-3 flex items-center justify-between mr-3"
            >
              <p
                @click="decrementQuantity(item)"
                class="incre-btn cursor-pointer"
              >
                -
              </p>
              <p class="qty cursor-pointer">{{ item.qty }}</p>
              <p
                @click="incrementQuantity(item)"
                class="incre-btn cursor-pointer"
              >
                +
              </p>
            </div>
            <div @click="removeItem(item.id)" class="delete-btn cursor-pointer">
              <!-- SVG icon here -->
            </div>
          </div>
          <p id="priceTotal" class="priceTotal ml-10">
            NGN{{ formatPrice(item.qty * item.price) }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-4">
      <p>Total Price: NGN{{ formatPrice(totalPrice) }}</p>
      <p>Total Items: {{ totalItems }}</p>
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
