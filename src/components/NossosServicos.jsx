import consultoriaDigital from "../assets/consultoria-digital.jpg"
import marketingDigital from "../assets/marketing-digital.jpg"
import desenvolvimentoWeb from "../assets/desenvolvimento-web.jpg"
import { Link } from "react-router-dom"

function NossosServicos() {
    return (
        <div id="nossosServicos" className="bg-white text-black px-40 py-32">
            <h1 className="text-center mb-20 font-bold">Nossos Serviços</h1>

            <section id="cards-grid" className="flex gap-8 justify-center">
                <div id="cards" className="flex flex-col gap-8">
                    <div id="card" className="w-fit p-8 flex rounded-xl gap-8 border-4 border-dashed transform hover:scale-105 hover:-translate-y-4 hover:shadow-2xl transition">
                        <img src={consultoriaDigital} alt="Consultoria Digital" className="max-w-[300px] rounded-xl" />
                        <div className="flex flex-col gap-4 justify-between">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-blue-500 text-3xl">Consultoria Digital</h2>
                                <p className="text-zinc-400 max-w-[300px] mb-8">Estratégias personalizadas para sua presença digital.</p>
                            </div>
                            <Link className="w-full justify-center flex gap-4  border-2 border-transparent bg-zinc-800 text-white p-3 rounded-lg transition duration-500 ease-in-out  hover:border-current hover:text-blue-500">Saber mais</Link>
                        </div>
                    </div>

                    <div id="card" className="w-fit p-8 flex rounded-xl gap-8 border-4 border-dashed transform hover:scale-105 hover:-translate-y-4 hover:shadow-2xl transition">
                        <img src={marketingDigital} alt="Marketing Digital" className="max-w-[300px] rounded-xl" />
                        <div className="flex flex-col gap-4 justify-between">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-blue-500 text-3xl">Marketing Digital</h2>
                                <p className="text-zinc-400 max-w-[300px] mb-8">Campanhas eficazes para atrair mais clientes.</p>
                            </div>
                            <Link className="w-full justify-center flex gap-4  border-2 border-transparent bg-zinc-800 text-white p-3 rounded-lg transition duration-500 ease-in-out  hover:border-current hover:text-blue-500">Saber mais</Link>
                        </div>
                    </div>
                </div>

                <div id="card" className="w-fit p-8 flex flex-col rounded-xl gap-8 border-4 border-dashed text-center items-center justify-center transform hover:scale-105 hover:-translate-y-4 hover:shadow-2xl transition">
                    <img src={desenvolvimentoWeb} alt="Desenvolvimento Web" className="max-w-[300px] rounded-xl" />
                    <h2 className="text-blue-500 text-3xl">Desenvolvimento Web</h2>
                    <p className="text-zinc-400 max-w-[300px] mb-8">Sites modernos, responsivos e otimizados para seu negócio, com design intuitivo e SEO eficiente.</p>
                    <Link className="w-full justify-center flex gap-4  border-2 border-transparent bg-zinc-800 text-white p-3 rounded-lg transition duration-500 ease-in-out  hover:border-current hover:text-blue-500">Saber mais</Link>
                </div>
            </section>
        </div>
    )
}

export default NossosServicos