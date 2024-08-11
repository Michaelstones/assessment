<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import type { IProduct } from "@/types/product.types";

const products = ref<IProduct[]>([]);
const isModalOpen = ref(false);
const selectedProduct = ref<IProduct | any>(null);
const authToken = ref("");

// get token
onMounted(() => {
  const data = localStorage.getItem("auth");
  if (data) {
    const { token } = JSON.parse(data);
    authToken.value = token;
  }
});
const fetchProducts = async () => {
  try {
    const response = await axios.get<IProduct[]>(
      "http://localhost:4000/api/products"
    );
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
};

const deleteProduct = async (id: string) => {
  try {
    await axios.delete(`http://localhost:4000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
    products.value = products.value.filter((product) => product._id !== id);
  } catch (error) {
    console.error("Failed to delete product", error);
  }
};

const openEditModal = (product: IProduct) => {
  selectedProduct.value = { ...product };
  isModalOpen.value = true;
};

const updateProduct = async () => {
  if (!selectedProduct.value) return;
  try {
    await axios.put(
      `http://localhost:4000/api/products/${selectedProduct.value._id}`,
      selectedProduct.value,
      {
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
      }
    );
    const index = products.value.findIndex(
      (product) => product._id === selectedProduct.value!._id
    );
    if (index !== -1) {
      products.value[index] = { ...selectedProduct.value };
    }
    isModalOpen.value = false;
  } catch (error) {
    console.error("Failed to update product", error);
  }
};

onMounted(fetchProducts);
</script>

<template>
  <div class="px-20 mx-auto py-10">
    <h1 class="text-2xl font-bold mb-6">Product List</h1>

    <div v-if="products.length" class="grid grid-cols-1 gap-4">
      <div
        v-for="product in products"
        :key="product._id"
        class="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:shadow-lg transition"
      >
        <div @click="openEditModal(product)" class="cursor-pointer">
          <h2 class="text-lg font-semibold">{{ product.name }}</h2>
          <p class="text-sm text-gray-600">{{ product.description }}</p>
          <p class="text-sm text-gray-600">Price: ${{ product.price }}</p>
        </div>
        <button
          @click="deleteProduct(product._id)"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-500">No products available.</p>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 class="text-xl font-semibold mb-4">Edit Product</h2>
        <label class="block mb-2 text-sm">Name</label>
        <input
          v-model="selectedProduct.name"
          type="text"
          class="block w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />

        <label class="block mb-2 text-sm">Description</label>
        <textarea
          v-model="selectedProduct.description"
          class="block w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />

        <label class="block mb-2 text-sm">Price</label>
        <input
          v-model="selectedProduct.price"
          type="number"
          class="block w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />

        <div class="flex justify-end gap-x-2">
          <button
            @click="isModalOpen = false"
            class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            @click="updateProduct"
            class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
