<script setup lang="ts">
import { RouterView } from "vue-router";
import "primeicons/primeicons.css";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>
