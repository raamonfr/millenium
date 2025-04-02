import { MenuIcon, UserPlusIcon } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import { useState } from "react";
import { Link } from "react-router-dom"
import { motion } from "framer-motion";

function Header() {
    const [showNav, setShowNav] = useState(false);

    return (
        <>

            <div className="w-screen flex justify-center">
                <motion.div initial={{ y: "-100%" }} animate={{ y: "0%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="max-w-[500px] w-full m-5 flex items-center justify-between p-4 rounded-full bg-zinc-900 border-solid border-2 border-blue-500 relative lg:hidden">
                    <a href="/" className="text-white cursor-pointer text-3xl font-extrabold select-none hover:text-white"> M<span className="text-blue-500">L</span></a>
                    <MenuIcon onClick={() => setShowNav(!showNav)} className="size-9 cursor-pointer text-white hover:text-blue-500 transition-colors duration-300" aria-label="Abrir menu" />
                </motion.div>
            </div >


            <div className="fixed left-0 w-screen flex justify-between items-center px-16 py-4 bg-zinc-900 transition duration-700 ease-in-out z-10 max-lg:hidden">
                <a href="/" className="text-white cursor-pointer text-3xl font-extrabold select-none hover:text-white">MILLE<span className="text-blue-500">NIUM</span></a>

                <nav className="flex items-center gap-10">
                    <a href="#nossosServicos" className="text-white transition duration-500 ease-in-out hover:text-zinc-500">Nossos Serviços</a>
                    <a href="#sobreNos" className="text-white transition duration-500 ease-in-out hover:text-zinc-500">Sobre nós</a>
                    <a href="#nossoContato" className="text-white transition duration-500 ease-in-out hover:text-zinc-500">Contato</a>
                    <Link to="/login" className="text-blue-500 transition duration-500 ease-in-out hover:text-blue-800">Login</Link>
                    <Link to="/cadastro" className="flex gap-4 items-center border-2 border-transparent bg-zinc-800 text-white p-3 rounded-lg transition duration-500 ease-in-out  hover:border-current hover:text-blue-500"> <UserPlusIcon /> Cadastre-se </Link>
                </nav>
            </div>

            {/* Overlay escuro de fundo */}
            {
                showNav && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-5"
                        onClick={() => setShowNav(false)}
                    />
                )
            }

            {/* Sidebar fixo para cobrir a tela toda */}
            <Sidebar show={showNav} />
        </>
    );
}

export default Header;
