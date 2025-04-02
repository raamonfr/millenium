import { ChevronRightIcon } from 'lucide-react'
import ImagemHome from "../assets/organizing-data.svg"
import { Link } from 'react-router-dom';

function BodyHomeInit() {
  return (
    <div id='bodyHomeInit' className="w-screen flex justify-center items-center">
      <div id='contentTextBodyInit' className="flex flex-col gap-6 max-lg:items-center max-lg:text-center m-5 max-sm:my-20 md:p-40 lg:p-20 xl:p-40 lg:w-1/2 lg:my-20">
        <h1 className='font-bold text-zinc-300'>Bem-vindo ao Millenium</h1>

        <p className="font-light text-zinc-400">
          Impulsione seu negócio com tecnologia inovadora! Nossa plataforma segura, eficiente e escalável foi desenvolvida com o que há de mais avançado para oferecer a melhor experiência. 🚀
        </p>

        <p>Ainda não faz parte dessa equipe?</p>

        <Link to="/cadastro" className="text-white max-w-[270px] rounded-lg border-2 border-transparent flex gap-4 justify-center items-center text-2xl bg-blue-500 font-bold p-3 rounded-lg transition duration-500 ease-in-out  hover:border-current hover:text-white">
          Cadastre-se <ChevronRightIcon />
        </Link>
      </div>

      
      <figure className='w-1/2 flex justify-center m-5 p-20 items-center max-lg:w-full max-lg:hidden'>
        <img 
          id='contentImageBodyInit' 
          src={ImagemHome} 
          alt="Imagem aleatória" 
          className="w-full h-auto xl:w-[500px]"
        />
      </figure>
    </div>
  );
}

export default BodyHomeInit;
