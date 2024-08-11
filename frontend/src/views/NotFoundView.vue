<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <main class="px-20 my-4">
    <div class="mx-auto flex flex-col items-center">
      <h1 class="text-4xl">Not Found</h1>
      <RouterLink to="/"
        ><button
          class="px-4 py-2 border rounded-sm mt-9 hover:bg-black hover:text-white"
        >
          Go Home
        </button></RouterLink
      >
    </div>
  </main>
</template>
