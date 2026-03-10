import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login/Login";
import { useAuthStore } from "../features/auth/auth.store";

export default function AppRoutes() {
    const token = useAuthStore((state) => state.token);
    const isAuthenticated = Boolean(token);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/"
                element={
                    isAuthenticated ? (
                        <div>Logado</div>
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
