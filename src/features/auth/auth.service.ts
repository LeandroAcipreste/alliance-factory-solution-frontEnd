import { api } from "../../service/api";
import { LoginDTO, User } from "./auth.types";

interface LoginResponse {
    token: string;
    user: User;
};

export async function loginService(data: LoginDTO): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/login", data);
    return response.data
}