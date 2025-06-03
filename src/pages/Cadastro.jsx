import { useState } from "react";
import imagemComplementar from "../assets/wallpaper1.jpg"
import { Link } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; // adicionado aqui

function Cadastro() {
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    email: "",
    telefone: "",
    cnpj: "",
    cep: "",
    senha: "",
    confirmarSenha: "",
  });

  const navigate = useNavigate(); // adicionado aqui

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("http://localhost/backend/cadastrar_empresa.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_empresa: formData.nomeEmpresa,
          email: formData.email,
          telefone: formData.telefone,
          cnpj: formData.cnpj,
          cep: formData.cep,
          senha: formData.senha,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.mensagem || "Cadastro realizado com sucesso!");
        setFormData({
          nomeEmpresa: "",
          email: "",
          telefone: "",
          cnpj: "",
          cep: "",
          senha: "",
          confirmarSenha: "",
        });
        navigate("/login"); // redireciona pra tela de login
      } else {
        alert(result.erro || "Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex w-screen bg-zinc-900">
      <Link to="/" className="absolute top-3 left-10 mt-10 flex gap-4 justify-center font-bold border-2 border-transparent bg-blue-500 text-white p-3 rounded-lg transition duration-500 ease-in-out hover:border-current hover:text-white"> <ArrowLeftIcon /> Página Inicial</Link>

      <img className="w-1/2 rounded-tr-3xl rounded-br-3xl shadow-2xl" src={imagemComplementar} alt="Imagem Complementar" />

      <div className="w-1/2 flex flex-col items-center justify-center min-h-screen text-white">
        <h2 className="text-3xl font-bold p-6">Cadastro de Empresas</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <label className="block mb-2">
            Nome da Empresa:
            <input
              type="text"
              name="nomeEmpresa"
              value={formData.nomeEmpresa}
              onChange={handleChange}
              className="w-full p-2 border-b-4 border-zinc-800 bg-transparent text-white mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border-b-4 border-zinc-800 bg-transparent text-white mt-1"
              required
            />
          </label>
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
            CEP:
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              className="w-full p-2 border-b-4 border-zinc-800 bg-transparent text-white mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Telefone:
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
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
          <label className="block mb-4">
            Confirmar Senha:
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
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
              Cadastrar
            </button>

            <p>Já tem uma conta? <Link to="/login" className="text-blue-500 hover:text-blue-500 hover:opacity-35 mt-5">Faça login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
