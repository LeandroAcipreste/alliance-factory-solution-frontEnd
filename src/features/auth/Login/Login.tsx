
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth.store"; // ajuste o caminho se necessário
import "./login.css";

export default function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Preencha email e senha.");
            return;
        }

        try {
            setLoading(true);

            // login real via store -> service -> API /login
            await login({ email, password });

            // se chegou aqui, autenticou com sucesso
            navigate("/");
        } catch (err: any) {
            const message =
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.message ||
                "Erro ao realizar login.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen backGround 
                        lg:grid lg:grid-cols-12">
            {/* BLOCO ESQUERDO (TÍTULO) */}
            <div className="
                    flex flex-col
                    justify-start
                    px-6 pt-16
                    text-white
                    lg:col-span-7
                    lg:px-16
                    lg:pt-32
                "
            >
                <p className="text-sm lg:text-base text-white/90 mb-2">
                    Plataforma Integrada de Operações
                </p>
                <h1 className="text-4xl lg:text-5xl font-light">
                    Richelly Metais
                </h1>
            </div>

            {/* FORMULÁRIO */}
            <div className="
                flex items-center justify-center
                px-6 pb-16 pt-10
                lg:pb-0 lg:pt-0
                lg:col-span-5
                lg:pr-16
                "
            >
                <form
                    onSubmit={handleSubmit}
                    className="
                    w-full max-w-sm
                    p-8
                    rounded-2xl
                    bg-slate-200/30
                    backdrop-blur-lg
                    border border-white/20
                    shadow-2xl
                    space-y-5
                    "
                >
                    <div className="flex justify-center mb-6">
                        <img
                            src="/images/logo.png"
                            alt="Richelly Metais"
                            className="w-[200px] h-auto"
                        />
                    </div>

                    <h2 className="text-xl font-medium text-blue-100 text-center mb-6">
                        Entre com seu e-mail e senha:
                    </h2>

                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {error}
                        </p>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="
                            w-full h-12 px-4 text-base rounded-lg
                            bg-white/90 border border-slate-300
                            placeholder:text-slate-500
                            focus:outline-none focus:ring-2 focus:ring-sky-500
                            transition
                        "
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="
                        w-full h-12 px-4 text-base rounded-lg
                        bg-white/90 border border-slate-300
                        placeholder:text-slate-500
                        focus:outline-none focus:ring-2 focus:ring-sky-500
                        transition
                    "
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                        w-full h-12 text-base font-medium rounded-lg
                        bg-sky-600 text-white
                        hover:bg-sky-700
                        active:scale-95
                        transition-all
                        disabled:opacity-60 disabled:cursor-not-allowed
                    "
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
};
