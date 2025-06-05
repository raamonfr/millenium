import { Mail, Lock, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [tipoCadastro, setTipoCadastro] = useState("empresa");
  const [areaAtuacao, setAreaAtuacao] = useState("");

  // Estados para inputs comuns
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const navigate = useNavigate("");


  // Para mensagem simples
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setMsg("As senhas não conferem!");
      return;
    }

    // Monta o objeto para enviar ao backend
    let dados = {};

    if (tipoCadastro === "empresa") {
      dados = {
        nome_empresa: nome,
        cnpj,
        cep,
        telefone,
        email,
        senha,
      };
    } else {
      // ONG
      dados = {
        nomeONG: nome,
        cnpjONG: cnpj,
        enderecoONG: cep,
        telefoneONG: telefone,
        emailONG: email,
        senhaONG: senha,
        areaAtuacaoONG: areaAtuacao,
      };
    }

    try {
      // Ajuste a URL abaixo para o caminho correto do seu PHP no XAMPP
      const response = await fetch("http://localhost/backend/cadastro_empresa_e_ong.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();

      if (data.sucesso) {
        setMsg(data.mensagem || "Cadastro realizado com sucesso!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMsg(data.erro || "Erro no cadastro.");
      }
    } catch (error) {
      setMsg("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
      <h2 className="text-xl font-bold text-center text-blue-600 mb-1">
        Cadastro de {tipoCadastro === "empresa" ? "Empresa" : "ONG"}
      </h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Preencha os dados para criar sua conta
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-700">Como deseja se cadastrar? *</label>
          <select
            value={tipoCadastro}
            onChange={(e) => setTipoCadastro(e.target.value)}
            className="border bg-white text-zinc-400 rounded-lg px-4 py-2"
          >
            <option value="empresa">Como Empresa</option>
            <option value="ong">Como ONG</option>
          </select>
        </div>

        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-4 w-full">
            <label className="text-zinc-700">
              Nome da {tipoCadastro === "empresa" ? "empresa" : "ONG"} *
            </label>
            <input
              type="text"
              placeholder={`Nome da ${tipoCadastro === "empresa" ? "empresa" : "ONG"
                }`}
              className="bg-white text-zinc-700 border rounded-lg px-4 py-2 w-full"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <label className="text-zinc-700">CNPJ *</label>
            <input
              type="text"
              placeholder="00.000.000/0000-00"
              className="bg-white text-zinc-700 border rounded-lg px-4 py-2 w-full"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
            />
          </div>
        </div>

        {tipoCadastro === "ong" && (
          <div className="flex flex-col gap-2">
            <label className="text-zinc-700">Área de Atuação *</label>
            <select
              value={areaAtuacao}
              onChange={(e) => setAreaAtuacao(e.target.value)}
              className="border text-zinc-400 bg-white  rounded-lg px-4 py-2"
              required
            >
              <option className="text-zinc-700" value="">
                Selecione uma opção
              </option>
              <option className="text-zinc-700" value="Meio Ambiente">
                Meio Ambiente
              </option>
              <option className="text-zinc-700" value="Educação">
                Educação
              </option>
              <option className="text-zinc-700" value="Saúde">
                Saúde
              </option>
              <option className="text-zinc-700" value="Direitos Humanos">
                Direitos Humanos
              </option>
              <option className="text-zinc-700" value="Assistência Social">
                Assistência Social
              </option>
              <option className="text-zinc-700" value="Cultura">
                Cultura
              </option>
              <option className="text-zinc-700" value="Outros">
                Outros
              </option>
            </select>
          </div>
        )}

        <div className="flex w-full gap-4">
          <div className="relative flex flex-col gap-4 w-full">
            <label className="text-zinc-700">CEP *</label>
            <MapPin className="absolute left-3 top-1/2 translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
            <input
              type="text"
              placeholder="00000-000"
              className="bg-white text-zinc-700 pl-10 border rounded-lg px-4 py-2 w-full"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              required
            />
          </div>

          <div className="relative flex flex-col gap-4 w-full">
            <label className="text-zinc-700">Telefone *</label>
            <Phone className="absolute left-3 top-1/2 translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
            <input
              type="text"
              placeholder="(11) 99999-9999"
              className="bg-white text-zinc-700 pl-10 border rounded-lg px-4 py-2 w-full"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="relative flex flex-col gap-4">
          <label className="text-zinc-700">Email *</label>
          <Mail className="absolute left-3 top-1/2 translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
          <input
            type="email"
            placeholder="conta@exemplo.com"
            className="bg-white text-zinc-700 pl-10 border rounded-lg px-4 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex w-full gap-4">
          <div className="relative w-full flex flex-col gap-4">
            <label className="text-zinc-700">Senha *</label>
            <Lock className="absolute left-3 top-1/2 translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
            <input
              type="password"
              placeholder="Senha *"
              className="bg-white text-zinc-700 pl-10 border rounded-lg px-4 py-2 w-full"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="relative w-full flex flex-col gap-4">
            <label className="text-zinc-700">Confirmar senha *</label>
            <Lock className="absolute left-3 top-1/2 translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
            <input
              type="password"
              placeholder="Confirmar senha *"
              className="bg-white text-zinc-700 pl-10 border rounded-lg px-4 py-2 w-full"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 mt-4 rounded-lg font-semibold transition"
        >
          Cadastrar {tipoCadastro === "empresa" ? "empresa" : "ONG"}
        </button>

        {msg && (
          <p className="mt-4 text-center font-semibold text-red-600">{msg}</p>
        )}

        <p className="text-center text-sm text-gray-500 mt-2">
          Já possui cadastro?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline hover:text-blue-600 hover:opacity-50"
          >
            Faça login
          </a>
        </p>
      </form>
    </div>
  );
}
