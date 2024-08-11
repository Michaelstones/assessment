<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/userStore"; // Import the auth store
import { useRouter } from "vue-router";

const isOpen = ref(false);
const cartStore = useCartStore();
const authStore = useAuthStore(); // Initialize the auth store
const router = useRouter();

// Access the cart length using the getter
const cartLength = computed(() => cartStore.cartItemCount);
const authtoken = ref(null);

onMounted(() => {
  const data = localStorage.getItem("auth");
  if (data) {
    const { isAdmin, user, token } = JSON.parse(data);
    authtoken.value = token;
  }
});

// Toggle dropdown visibility
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Navigate to the sign-in/sign-up view
const navigateToAuth = () => {
  router.push("/signin");
};

// Sign out the user
const signOut = () => {
  authStore.signOut();
  isOpen.value = false; // Close the dropdown after sign-out
};
</script>

<template>
  <div class="px-20">
    <header class="flex justify-around py-4 items-center">
      <RouterLink to="/">
        <img
          alt="Vue logo"
          class="w-20 h-20"
          src="@/assets/logo.svg"
          width="125"
          height="125"
        />
      </RouterLink>

      <nav class="flex items-center gap-x-3">
        <div
          class="relative inline-block"
          @mouseover="isOpen = true"
          @mouseleave="isOpen = false"
          @click="toggleDropdown"
        >
          <p class="cursor-pointer w-5 h-5">
            <i class="pi pi-user"></i>
          </p>

          <ul
            v-if="authtoken && isOpen"
            class="absolute left-0 right-0 top-2 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
            @mouseover="isOpen = true"
            @mouseleave="isOpen = false"
            @click="toggleDropdown"
          >
            <li
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <RouterLink to="/add-product"> Create Product </RouterLink>
            </li>
            <li
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <RouterLink to="inventory"> Inventory</RouterLink>
            </li>
            <li
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              @click="signOut"
            >
              Logout
            </li>
          </ul>

          <ul
            v-else-if="!authStore.user && isOpen"
            class="absolute left-0 right-0 top-2 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
            @mouseover="isOpen = true"
            @mouseleave="isOpen = false"
          >
            <li
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              @click="navigateToAuth"
            >
              Sign In / Sign Up
            </li>
          </ul>
        </div>

        <RouterLink to="/cart">
          <p class="cursor-pointer w-5 h-5 relative">
            <i class="pi pi-shopping-cart w-full"></i>
            <span
              class="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-black rounded-full"
              >{{ cartLength }}</span
            >
          </p>
        </RouterLink>
      </nav>
    </header>
  </div>
</template>
