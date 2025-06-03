import { ChevronRightIcon } from 'lucide-react'
import ImagemHome from "../assets/organizing-data.svg"
import { Link } from 'react-router-dom';

function BodyHomeInit() {
  return (
    <div className="w-full flex justify-between mt-56 mb-20 px-40">
      <div className="w-1/2 max-w-[700px] space-y-5">
        <h1 className="text-8xl font-bold text-zinc-300">
          Bem-vindo ao Millenium
        </h1>

        <p className="font-light text-zinc-400">
          Uma plataforma segura, eficiente e escalável, desenvolvida com
          tecnologia de ponta para garantir a melhor experiência. 🚀
        </p>

        <p>Ainda não faz parte dessa equipe?</p>

        <Link to="/cadastro" className="text-white max-w-[270px] rounded-lg border-2 border-transparent flex gap-4 justify-center items-center text-2xl bg-blue-500 font-bold p-3 rounded-lg transition duration-500 ease-in-out  hover:border-current hover:text-white">
          Cadastre-se <ChevronRightIcon />
        </Link>
      </div>

      <img
        src={ImagemHome}
        alt="Imagem aleatoria"
        className="w-1/2 max-w-[500px]"
      />
    </div>
  );
}

export default BodyHomeInit;
