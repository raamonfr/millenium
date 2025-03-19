import { Link } from "react-router-dom"
import error404 from "../assets/error404.svg"

const ErrorPage = () => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">

            <img src={error404} alt="Error 404" />

            <p className="font-bold">Ops! A pagina não foi encontrada 😢</p>

            <p className="max-w-[760px] text-center mt-3 font-light text-zinc-400">Infelizmente a página que estás procurando não foi encontrada por algum motivo. Sugerimos que volte a página inicial e tente novamente, se o problema persistir, contate uma ajuda técnica.</p>

            <Link to="/" className="mt-10 w-[350px] max-w-[350px] flex gap-4 justify-center font-bold border-2 border-transparent bg-blue-500 text-white p-3 rounded-lg transition duration-500 ease-in-out hover:border-current hover:text-white">Voltar para o início</Link>

            <Link to="#" className="text-blue-500 underline hover:text-blue-500 hover:opacity-35 mt-5">Contatar ajuda técnica</Link>
        </div>
    )
}

export default ErrorPage