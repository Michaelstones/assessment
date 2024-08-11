import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CartView from "../views/CartView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ProductView from "@/views/ProductView.vue";
import SignInView from "@/views/SignInView.vue";
import CreateProductView from "@/views/CreateProductView.vue";
import InventoryView from "@/views/InventoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductView,
    },
    {
      path: "/add-product",
      name: "add-product",
      component: CreateProductView,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignInView,
    },
    {
      path: "/inventory",
      name: "inventory",
      component: InventoryView,
    },
    {
      path: "/:pathMatch(.*)*", // The catch-all route
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

export default router;
