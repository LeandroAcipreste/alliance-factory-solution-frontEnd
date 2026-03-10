export type UserRole = "admin" | "financeiro" | "vendedor_fabrica" | "producao" | "representante" | "distribuidor";

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole | string; // mantém flexível caso venha algo novo do backend
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    login: (data: LoginDTO) => Promise<void>;
    logout: () => void;
}