import { defineStore } from "pinia";
import axios from "axios";
import type { User, AuthResponse, AuthError } from "../types/auth.type";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAdmin: false,
    token: null as string | null,
    error: null as string | null,
  }),

  actions: {
    async signIn(username: string, password: string): Promise<boolean> {
      try {
        const response = await axios.post<AuthResponse>(
          "http://localhost:4000/api/auth/login",
          {
            username,
            password,
          }
        );
        if (response.status !== 200) {
          return false;
        }
        this.user = response.data.user;
        this.isAdmin = response.data.user.isAdmin;
        this.token = response.data.token;
        this.error = null;
        this.saveToLocalStorage();

        return true;
      } catch (err) {
        const authError = (err as { response?: { data: AuthError } }).response
          ?.data;
        this.error = authError?.message || "Sign-in failed";
        return false;
      }
    },

    async signUp(username: string, password: string): Promise<boolean> {
      try {
        const response = await axios.post<AuthResponse>(
          "http://localhost:4000/api/auth/register",
          {
            username,
            password,
          }
        );

        if (response.status == 201) {
          this.user = response.data.user;
          this.isAdmin = response.data.user.isAdmin;
          this.token = null;
          this.error = null;
          this.saveToLocalStorage();
          return true;
        }

        return false;
      } catch (err) {
        const authError = (err as { response?: { data: AuthError } }).response
          ?.data;
        this.error = authError?.message || "Sign-up failed";
        return false;
      }
    },

    signOut(): void {
      this.user = null;
      this.isAdmin = false;
      this.token = null;
      this.error = null;
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: this.user,
          isAdmin: this.isAdmin,
          token: this.token,
        })
      );
    },

    loadFromLocalStorage() {
      const storedData = localStorage.getItem("auth");
      if (storedData) {
        const { user, isAdmin, token } = JSON.parse(storedData);
        this.user = user;
        this.isAdmin = isAdmin;
        this.token = token;
      }
    },
  },

  getters: {
    isAuthenticated: (state) => state.user !== null,
    getUserName: (state) => state.user?.username ?? "",
  },
});

// // In your main.js or main.ts
// const authStore = useAuthStore();
// authStore.loadFromLocalStorage();
