import { create } from "zustand";
import { AuthState, User } from "./auth.types";

export const useAuthStore = create<AuthState>(set => ({
    user: null,
    token: null,

    login: async ({ email, password }) => {
        if (email === "admin@erp.com" && password === "123456") {
            const user: User = {
                id: 1,
                name: "Administrador",
                user_type: "ADMIN"
            };

            localStorage.setItem("token", "mock-token");
            localStorage.setItem("user", JSON.stringify(user));

            set({ user, token: "mock-token" });
            return;
        }

        throw new Error("Credenciais inválidas");
    },

    logout: () => {
        localStorage.clear();
        set({ user: null, token: null });
    }
}));
