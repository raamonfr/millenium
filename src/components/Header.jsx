import { UserPlusIcon } from "lucide-react"
import { Link } from "react-router-dom"


function Header() {
    return (
        <div className="fixed left-0 w-screen flex justify-between items-center px-40 py-4 bg-zinc-900 transition duration-700 ease-in-out">
            <h1 className="cursor-pointer text-3xl font-extrabold select-none">MILLE<span className="text-blue-500">NIUM</span></h1>

            <nav className="flex items-center gap-10">
                <a href="#sobreNos" className="text-white transition duration-500 ease-in-out hover:text-zinc-500">Sobre nós</a>
                <a href="#nossoContato" className="text-white transition duration-500 ease-in-out hover:text-zinc-500">Contato</a>
                <Link to="/login" className="text-blue-500 transition duration-500 ease-in-out hover:text-blue-800">Login</Link>
                <Link to="/cadastro" className="flex gap-4 items-center border-2 border-transparent bg-zinc-800 text-white p-3 rounded-lg transition duration-500 ease-in-out  hover:border-current hover:text-blue-500"> <UserPlusIcon/> Cadastre-se </Link>
            </nav>
        </div>
    )
}

export default Header