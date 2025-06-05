import { useState } from "react";
import { Link } from "react-router-dom";

export default function FormularioLogin() {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("CNPJ:", cnpj, "Senha:", senha);
    // Aqui você pode integrar com sua API de autenticação
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-blue-500 text-center">
        Entrar na Conta
      </h2>

      <p className="text-zinc-500 text-center">Preencha os dados para entrar da sua conta</p>

      {/* CNPJ */}
      <div className="flex flex-col">
        <label htmlFor="cnpj" className="text-sm font-medium text-gray-700 mb-1">
          CNPJ
        </label>
        <input
          id="cnpj"
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="00.000.000/0000-00"
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Senha */}
      <div className="flex flex-col">
        <label htmlFor="senha" className="text-sm font-medium text-gray-700 mb-1">
          Senha
        </label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Botão de login */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Entrar
      </button>

      <Link to="/login/cadastro">Cadastre-se</Link>
    </form>
  );
}
