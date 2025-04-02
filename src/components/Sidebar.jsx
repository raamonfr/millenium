import { UserPlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar({ show }) {
    return (
        <div 
            className={`fixed top-0 right-0 h-screen w-[340px] bg-zinc-900 z-20 px-8 transition-transform duration-500 ease-in-out 
                ${show ? "translate-x-0" : "translate-x-full"}`}
        >
            <ul className="text-center">
                <li>
                    <a href="#nossosServicos" className="block mt-7 px-4 py-3 rounded-md text-white transition duration-500 ease-in-out hover:text-zinc-500">
                        Nossos Serviços
                    </a>
                </li>
                <li>
                    <a href="#sobreNos" className="block mt-7 px-4 py-3 rounded-md text-white transition duration-500 ease-in-out hover:text-zinc-500">
                        Sobre nós
                    </a>
                </li>
                <li>
                    <a href="#nossoContato" className="block mt-7 px-4 py-3 rounded-md text-white transition duration-500 ease-in-out hover:text-zinc-500">
                        Contato
                    </a>
                </li>
                <li>
                    <Link to="/login" className="block mt-7 px-4 py-3 rounded-md text-blue-500 transition duration-500 ease-in-out hover:text-blue-800">
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/cadastro" className="block mt-7 px-4 py-3 flex gap-4 items-center justify-center border-2 border-transparent bg-zinc-800 text-white rounded-lg transition duration-500 ease-in-out hover:border-current hover:text-blue-500">
                        <UserPlusIcon /> Cadastre-se
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
