<script lang="ts" setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import ProductDialog from "./ProductDialog.vue";
import type { IProduct } from "@/types/product.types";

const productArray = ref<IProduct[]>([
  {
    name: "shoes1",
    imgUrl:
      "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
    _id: " 1",
    color: [
      {
        name: "black",
        imgUrl:
          "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
      },
      {
        name: "blue",
        imgUrl:
          "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
      },
    ],
    description: "good nike shoes",
    price: 200,
    material: ["nylon", "teflon", "cotton"],
    size: [
      { name: "M", qty: 20 },
      { name: "L", qty: 20 },
      { name: "XL", qty: 20 },
    ],
    category: "shoes",
  },
  {
    name: "shoes2",
    imgUrl:
      "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
    _id: "2",
    color: [
      {
        name: "black",
        imgUrl:
          "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
      },
      {
        name: "blue",
        imgUrl:
          "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
      },
    ],
    description: "good nike shoes",
    price: 200,
    material: ["nylon", "teflon", "cotton"],
    category: "shoes",
    size: [
      { name: "M", qty: 20 },
      { name: "L", qty: 20 },
      { name: "XL", qty: 20 },
    ],
  },
  {
    name: "shoes3",
    imgUrl:
      "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
    _id: "1",

    color: [
      {
        name: "black",
        imgUrl:
          "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
      },
      {
        name: "blue",
        imgUrl:
          "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
      },
    ],
    description: "good nike shoes",
    price: 200,
    material: ["nylon", "teflon", "cotton"],
    size: [
      { name: "M", qty: 20 },
      { name: "L", qty: 20 },
      { name: "XL", qty: 20 },
    ],
    category: "shoes",
  },
  {
    name: "shoes4",
    imgUrl:
      "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
    _id: "4",

    color: [
      {
        name: "black",
        imgUrl:
          "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
      },
      {
        name: "blue",
        imgUrl:
          "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg",
      },
    ],
    description: "good nike shoes",
    price: 200,
    material: ["nylon", "teflon", "cotton"],
    size: [
      { name: "M", qty: 20 },
      { name: "L", qty: 20 },
      { name: "XL", qty: 20 },
    ],
    category: "shoes",
  },
]);
const isModalOpen = ref(false);
const selectedProduct = ref(null);

const openModal = (product: any) => {
  selectedProduct.value = product;
  isModalOpen.value = true;
};
</script>
<template>
  <main class="mx-auto my-6 px-10">
    <h1 class="text-4xl sm:text-6xl my-4">Featured Products</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <section
        v-for="product in productArray"
        :key="product._id"
        class="w-[90%] mx-auto my-6"
      >
        <div class="group image-card">
          <!-- image -->
          <div
            :data-img="product.color[1]?.imgUrl"
            id="hoverDiv"
            class="image-container"
          >
            <img
              class="object-contain"
              :alt="'image of ${product.name}'"
              loading="lazy"
              :src="product.imgUrl"
            />
          </div>
          <!-- text and price -->
          <div class="product-info">
            <p class="group-hover:underline">{{ product.name }}</p>

            <p>NGN{{ product.price }}</p>
          </div>
          <div
            :data-id="product._id"
            id="product_btn"
            class="cursor-pointer border border-gray-400 px-6 py-2 w-full text-center all-btn"
          >
            <p @click="openModal(product)">Choose options</p>
          </div>
        </div>
        <ProductDialog
          v-if="selectedProduct"
          :product="selectedProduct"
          :isOpen="isModalOpen"
          @close="isModalOpen = false"
        />
      </section>
    </div>
    <div class="flex justify-center w-full">
      <RouterLink
        to="/products"
        class="border border-black p-2 hover:bg-black hover:text-white rounded-sm"
        aria-label="View all products in the Products collection"
      >
        View all
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.image-card {
  width: 400px;
  max-width: 100%;
  margin-bottom: 20px;
}

.image-card img {
  width: 100%;
  height: 450px; /* Set a fixed height */
  object-fit: cover; /* Ensure the image covers the area without stretching */
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Hide overflow to ensure consistent height */
  height: 450px; /* Set a fixed height */
}

.product-info {
  padding: 10px;
  text-align: left;
}
</style>
