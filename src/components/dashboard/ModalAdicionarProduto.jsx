import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ModalAdicionarProduto({ aberto, onFechar, onSalvar }) {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [marca, setMarca] = useState("");
  const [tipo, setTipo] = useState("venda");
  const [isSale, setIsSale] = useState(false);

  useEffect(() => {
    if (tipo === "doacao") {
      setPreco(""); // limpa o valor quando muda para doação
    }
  }, [tipo]);

  if (!aberto) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isSale = tipo === "venda" ? true : false;

    // Crie o objeto com os dados para enviar
    const data = {
      nome,
      categoria,
      descricao,
      preco: parseFloat(preco) || 0,
      quantidade: parseInt(quantidade) || 0,
      marca,
      tipo,
      isSale,
      empresa_id: 1, // Ajuste conforme seu contexto
    };

    try {
      const response = await fetch("http://localhost/backend/adicionar_produto.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      if (json.mensagem) {
        alert(json.mensagem);
        onFechar();
        window.location.reload();
      } else if (json.erro) {
        alert("Erro: " + json.erro);
      }
    } catch (error) {
      alert("Erro ao enviar dados: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={onFechar}
          className="absolute bg-white top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-zinc-200"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-zinc-700">
          Adicionar Novo Produto
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border bg-white text-zinc-700 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Nome do produto"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Categoria *</label>
            <select
              required
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Selecione a categoria</option>
              <option value="alimentos">Alimentos</option>
              <option value="roupas">Roupas</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="limpeza">Limpeza</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Descrição *</label>
            <textarea
              required
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="border bg-white text-zinc-700 border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Descrição detalhada do produto"
            ></textarea>
          </div>

          {tipo === "venda" && (
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="border bg-white text-zinc-700 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0,00"
                required
              />
            </div>
          )}


          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Quantidade</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="border bg-white text-zinc-700 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Marca</label>
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="border bg-white text-zinc-700 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Marca do produto"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Tipo *</label>
            <select
              required
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="border border-gray-300 rounded-md text-gray-700 px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="venda">Para Venda</option>
              <option value="doacao">Para Doação</option>
            </select>
          </div>
        </form>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onFechar}
            className="px-4 bg-white py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Adicionar Produto
          </button>
        </div>
      </div>
    </div>
  );
}
