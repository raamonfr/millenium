import consultoriaDigital from "../assets/consultoria-digital.jpg"
import marketingDigital from "../assets/marketing-digital.jpg"
import desenvolvimentoWeb from "../assets/desenvolvimento-web.jpg"
import { Link } from "react-router-dom"

function NossosServicos() {
    return (
        <div className="w-full bg-white text-black px-40 py-20">
            <h1 className="text-center mb-20 font-bold">Nossos Serviços</h1>

            <div id="cards" className="flex justify-center items-center gap-20">
                <div className="w-[400px] p-8 rounded-xl flex flex-col items-center gap-4 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-4 transition">
                    <img className="w-[380px] rounded-xl" src={consultoriaDigital} alt="Consultoria Digital" />

                    <h2 className="text-blue-500 text-3xl text-center">Consultoria Digital</h2>

                    <p className="text-zinc-400 max-w-[300px] text-center">Estratégias personalizadas para sua presença digital.</p>

                    <Link className="w-full justify-center flex gap-4  border-2 border-transparent bg-zinc-800 text-white p-3 rounded-lg transition duration-500 ease-in-out  hover:border-current hover:text-blue-500">Saber mais</Link>
                </div>

                <div className="w-[400px] p-8 rounded-xl flex flex-col items-center gap-4 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-4 transition">
                    <img className="w-[380px] rounded-xl" src={marketingDigital} alt="Marketing Digital" />

                    <h2 className="text-blue-500 text-3xl text-center">Merketing Digital</h2>

                    <p className="text-zinc-400 max-w-[300px] text-center">Campanhas eficazes para atrair mais clientes.</p>

                    <Link className="w-full justify-center flex gap-4  border-2 border-transparent bg-zinc-800 text-white p-3 rounded-lg transition duration-500 ease-in-out  hover:border-current hover:text-blue-500">Saber mais</Link>
                </div>

                <div className="w-[400px] p-8 rounded-xl flex flex-col items-center gap-4 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-4 transition">
                    <img className="w-[380px] rounded-xl" src={desenvolvimentoWeb} alt="Desenvolvimento Web" />

                    <h2 className="text-blue-500 text-3xl text-center">Desenvolvimento Web</h2>

                    <p className="text-zinc-400 max-w-[300px] text-center">Sites modernos e responsivos para seu negócio.</p>

                    <Link className="w-full justify-center flex gap-4  border-2 border-transparent bg-zinc-800 text-white p-3 rounded-lg transition duration-500 ease-in-out  hover:border-current hover:text-blue-500">Saber mais</Link>
                </div>
            </div>
        </div>
    )
}

export default NossosServicos