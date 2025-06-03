import { Bell, Search } from 'lucide-react';
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const empresaId = localStorage.getItem("empresaId");
    const navigate = useNavigate();

    function logout() {
        localStorage.getItem("logado") === "false";
        localStorage.removeItem("empresaId");
        navigate("/login");
    }

    // Fecha o modal ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <header className="flex items-center text-zinc-700 justify-between px-6 py-4 border-b bg-white shadow-sm">
            {/* Título */}
            <h1 className="text-xl font-bold">Dashboard</h1>

            {/* Área da direita */}
            <div className="flex items-center gap-4">
                {/* Campo de busca */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="pl-10 pr-4 bg-white py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>

                {/* Ícone de notificação com badge */}
                <div className="relative cursor-pointer hover:bg-zinc-500 p-4 rounded-lg">
                    <Bell className="w-5 h-5 text-gray-600" />
                </div>

                <div className="relative inline-block text-left" ref={menuRef}>
                    {/* Avatar do usuário */}
                    <div
                        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        U
                    </div>

                    {/* Modal pequeno */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg z-50">
                            <button
                                className="w-full text-left px-4 py-2 bg-white hover:bg-gray-200 text-sm"
                                onClick={() => {
                                    console.log("Sobre o perfil");
                                    setOpen(false);
                                }}
                            >
                                Sobre o perfil
                            </button>
                            <button
                                className="w-full text-left px-4 py-2 bg-white hover:bg-gray-200 text-sm text-red-600"
                                onClick={() => {
                                    logout()
                                    setOpen(false);

                                }}
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
