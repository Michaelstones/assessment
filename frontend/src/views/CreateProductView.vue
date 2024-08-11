<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import type { IProduct, TColor, TSize } from "@/types/product.types";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const productName = ref("");
const description = ref("");
const price = ref<number | null>(null);
const imgUrl = ref("");
const category = ref("");
const material = ref<string[]>([]);
const sizes = ref<TSize[]>([]);
const colors = ref<TColor[]>([]);
const authToken = ref("");
onMounted(() => {
  const data = localStorage.getItem("auth");
  if (data) {
    const { token } = JSON.parse(data);
    authToken.value = token;
  }
});

const imgI =
  "https://res.cloudinary.com/knesset-groups/image/upload/v1654893439/cld-sample-5.jpg";

const newSize = ref({ name: "", qty: 0 });
const newColor = ref({ name: "", imgUrl: imgI });

const addSize = () => {
  sizes.value.push({ ...newSize.value });
  newSize.value = { name: "", qty: 0 };
};

const addColor = () => {
  colors.value.push({ ...newColor.value });
  newColor.value = { name: "", imgUrl: "" };
};

type TProd = Omit<IProduct, "id">;
const submitProduct = async () => {
  const newProduct: TProd = {
    name: productName.value,
    description: description.value,
    price: price.value || 0,
    imgUrl: imgI || imgUrl.value,
    category: category.value,
    material: material.value,
    size: sizes.value,
    color: colors.value,
  };

  try {
    console.log("newProduct:", newProduct);
    const response = await axios.post(
      "http://localhost:4000/api/products",
      newProduct,
      {
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
      }
    );

    if (response.status === 201) {
      toast("Product added successfully!", {
        autoClose: 1000,
      });
      // Reset the form
      productName.value = "";
      description.value = "";
      price.value = null;
      imgUrl.value = "";
      category.value = "";
      material.value = [];
      sizes.value = [];
      colors.value = [];
    }
  } catch (error) {
    toast("Failed to add product.", {
      autoClose: 1000,
    });
  }
};
</script>

<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Add New Product</h2>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Product Name</label
      >
      <input
        v-model="productName"
        class="w-full px-3 py-2 border rounded"
        type="text"
        placeholder="Product Name"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Description</label
      >
      <textarea
        v-model="description"
        class="w-full px-3 py-2 border rounded"
        placeholder="Description"
      ></textarea>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
      <input
        v-model="price"
        class="w-full px-3 py-2 border rounded"
        type="number"
        placeholder="Price"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Image URL</label
      >
      <input
        v-model="imgUrl"
        class="w-full px-3 py-2 border rounded"
        type="text"
        placeholder="Image URL"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Category</label
      >
      <input
        v-model="category"
        class="w-full px-3 py-2 border rounded"
        type="text"
        placeholder="Category"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Material</label
      >
      <input
        v-model="material"
        class="w-full px-3 py-2 border rounded"
        type="text"
        placeholder="Material"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
      <div class="flex items-center gap-2">
        <input
          v-model="newSize.name"
          class="w-1/2 px-3 py-2 border rounded"
          type="text"
          placeholder="Size Name"
        />
        <input
          v-model="newSize.qty"
          class="w-1/2 px-3 py-2 border rounded"
          type="number"
          placeholder="Quantity"
        />
        <button
          @click="addSize"
          class="px-3 py-2 bg-blue-500 text-white rounded"
        >
          Add Size
        </button>
      </div>
      <ul class="mt-2">
        <li v-for="size in sizes" :key="size.name" class="text-gray-600">
          {{ size.name }} (Qty: {{ size.qty }})
        </li>
      </ul>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Colors</label>
      <div class="flex items-center gap-2">
        <input
          v-model="newColor.name"
          class="w-1/2 px-3 py-2 border rounded"
          type="text"
          placeholder="Color Name"
        />
        <input
          v-model="newColor.imgUrl"
          class="w-1/2 px-3 py-2 border rounded"
          type="text"
          placeholder="Image URL"
        />
        <button
          @click="addColor"
          class="px-3 py-2 bg-blue-500 text-white rounded"
        >
          Add Color
        </button>
      </div>
      <ul class="mt-2">
        <li v-for="color in colors" :key="color.name" class="text-gray-600">
          {{ color.name }}
        </li>
      </ul>
    </div>

    <button
      @click="submitProduct"
      class="w-full px-3 py-2 bg-green-500 text-white rounded"
    >
      Add Product
    </button>
  </div>
</template>

<style scoped>
/* Additional styling if needed */
</style>
