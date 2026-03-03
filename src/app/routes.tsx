import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login/Login";

export default function AppRoutes() {
    const isAuthenticated = Boolean(localStorage.getItem("token"));

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
