export type UserType = "ADMIN" | "FINANCIAL" | "VENDOR" | "PRODUCTION";

export interface User {
    id: number;
    name: string;
    user_type: UserType;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    login: (data: LoginDTO) => Promise<void>;
    logout: () => void;
}

export interface LoginDTO {
    email: string;
    password: string;
}
