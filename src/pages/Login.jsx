import { useState } from "react";
import imagemComplementar2 from "../assets/wallpaper2.jpg"
import { Link } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({
    cnpj: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log(formData);
  };

  return (
    <div className="flex w-screen bg-zinc-900">
      <Link to="/" className="absolute top-3 left-10 mt-10 flex gap-4 justify-center font-bold border-2 border-transparent bg-blue-500 text-white p-3 rounded-lg transition duration-500 ease-in-out hover:border-current hover:text-white"> <ArrowLeftIcon/> Página Inicial</Link>

      <div className="w-1/2 flex flex-col gap-10 items-center justify-center min-h-screen text-white">
        <h2 className="text-3xl font-bold p-6">Entrar na sua conta</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <label className="block mb-2">
            CNPJ:
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              className="w-full p-2 border-b-4 border-zinc-800 bg-transparent text-white mt-1"
              required
            />
          </label>
          
          <label className="block mb-2">
            Senha:
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="w-full p-2 border-b-4 border-zinc-800 bg-transparent text-white mt-1"
              required
            />
          </label>
        
          <div className="flex flex-col justify-center items-center gap-4">
            <button
              type="submit"
              className="px-6 py-2 font-bold border-2 border-transparent bg-blue-500 text-white p-3 rounded-lg transition duration-500 ease-in-out hover:border-current hover:text-white"
            >
              Entrar
            </button>

            <p>Ainda não cadstrou sua empresa? <Link to="/cadastro" className="text-blue-500 hover:text-blue-500 hover:opacity-35 mt-5">Cadastre-se agora</Link></p>
          </div>
        </form>
      </div>

      <div className="w-1/2 rounded-tl-3xl rounded-bl-3xl shadow-2xl bg-cover bg-center" style={{ backgroundImage: `url(${imagemComplementar2})` }}></div>
    </div>
  );
}

export default Login;
