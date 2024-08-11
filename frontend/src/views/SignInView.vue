<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/userStore";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();

const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const isSignIn = ref(true);

const handleSubmit = async () => {
  try {
    if (isSignIn.value) {
      const response = await authStore.signIn(username.value, password.value);
      if (!response) {
        toast("an error occured", {
          autoClose: 1000,
        });
        return;
      }
      toast("you signed in successfully!", {
        autoClose: 1000,
      });
      router.push("/");
    } else {
      const response = await authStore.signUp(username.value, password.value);
      if (!response) {
        toast("an error occured", {
          autoClose: 1000,
        });
        return;
      }
      toast("you signed up successfully! now sign in", {
        autoClose: 1000,
      });
      router.push("/signin");
    }
  } catch (error) {
    console.error("Authentication failed:", error);
  }
};
const toggleAuthMode = () => {
  isSignIn.value = !isSignIn.value;
};
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-semibold text-center">
        {{ isSignIn ? "Sign In" : "Sign Up" }}
      </h2>
      <p v-if="authStore.error" class="text-red-500">{{ authStore.error }}</p>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          type="text"
          v-model="username"
          placeholder="username"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {{ isSignIn ? "Sign In" : "Sign Up" }}
        </button>
      </form>
      <p class="text-center">
        <span v-if="isSignIn">Don't have an account? </span>
        <span v-else>Already have an account? </span>
        <a @click="toggleAuthMode" class="text-blue-500 cursor-pointer">
          {{ isSignIn ? "Sign Up" : "Sign In" }}
        </a>
      </p>
    </div>
  </div>
</template>
