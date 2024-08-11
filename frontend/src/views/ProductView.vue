<script lang="ts" setup>
import type { IProduct } from "@/types/product.types";
import ProductDialog from "../components/ProductDialog.vue";
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const products = ref<IProduct[]>([]);

const isModalOpen = ref(false);
const selectedProduct = ref<IProduct | null>(null);

const fetchProducts = async () => {
  try {
    const response = await axios.get<IProduct[]>(
      "http://localhost:4000/api/products"
    );
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const openModal = (product: any) => {
  selectedProduct.value = product;
  isModalOpen.value = true;
};

const searchQuery = ref<string>("");

// search func
// Computed property for filtered products
const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products.value;
  }
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(fetchProducts);
</script>

<template>
  <main class="mx-auto my-6 px-10">
    <div>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-l-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="Search"
        />
        <span
          class="absolute inset-y-0 right-0 flex items-center px-3 rounded-r-md"
        >
          <i class="pi pi-search"></i>
        </span>
      </div>
    </div>
    <h1 class="text-4xl sm:text-6xl my-4">Featured Products</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <section
        v-for="product in filteredProducts"
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
