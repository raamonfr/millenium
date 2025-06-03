import { Link } from "react-router-dom";

function BotaoAzul(props) {
    return (
        <Link
            to={props.rota}
            className={`inline-flex items-center justify-center gap-4 text-white text-lg md:text-xl bg-blue-500 font-bold px-6 py-3 rounded-lg border-2 border-transparent transition duration-500 ease-in-out hover:border-current hover:text-white ${props.largura}`} 
        >
            {props.textoBotao}
        </Link>
    );
}

export default BotaoAzul;
