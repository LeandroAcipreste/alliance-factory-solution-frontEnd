import { create } from "zustand";
import { AuthState, LoginDTO } from "./auth.types";
import { loginService } from "./auth.service";

export const useAuthStore = create<AuthState>((set) => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),

    login: async (data: LoginDTO) => {
        const result = await loginService(data);

        if (!result?.token || !result?.user) {
            throw new Error("Resposta de login inválida.");
        }

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        set({
            token: result.token,
            user: result.user,
        });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({
            user: null,
            token: null,
        });
    },
}));