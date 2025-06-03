import { useState, useEffect } from "react";

function Vendas() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidade: "",
    marca: "",
    categoria: ""
  });
  const [produtos, setProdutos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const empresaId = localStorage.getItem("empresaId");

  useEffect(() => {
    listarProdutos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editandoId
      ? "http://localhost/backend/editar_venda.php"
      : "http://localhost/backend/cadastrar_venda.php";

    const payload = {
      ...form,
      empresaId,
    };

    if (editandoId) {
      payload.id = editandoId;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      alert(result.mensagem || result.erro);
      setEditandoId(null);
      listarProdutos();
      setForm({
        nome: "",
        descricao: "",
        preco: "",
        quantidade: "",
        marca: "",
        categoria: "",
      });
    } catch (error) {
      alert("Erro ao enviar produto para venda.");
    }
  };

  const listarProdutos = async () => {
    try {
      const res = await fetch(`http://localhost/backend/listar_vendas.php?empresaId=${empresaId}`);
      const data = await res.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
    }
  };

  const excluirProduto = async (id) => {
    const confirmacao = confirm("Tem certeza que deseja excluir?");
    if (!confirmacao) return;
    try {
      const res = await fetch(`http://localhost/backend/excluir_venda.php?id=${id}&empresaId=${empresaId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.mensagem || data.erro);
      listarProdutos();
    } catch (error) {
      alert("Erro ao excluir o produto.");
    }
  };

  const editarProduto = (produto) => {
    setForm({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      quantidade: produto.quantidade,
      marca: produto.marca,
      categoria: produto.categoria,
    });
    setEditandoId(produto.id);
  };

  return (
    <div className="p-6 bg-zinc-900 text-white rounded-xl max-w-2xl mx-auto mt-10 shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Produto para Venda</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          onChange={handleChange}
          value={form.nome}
          className="w-full p-2 rounded bg-zinc-800"
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          onChange={handleChange}
          value={form.descricao}
          className="w-full p-2 rounded bg-zinc-800"
          required
        />
        <input
          type="number"
          step="0.01"
          name="preco"
          placeholder="Preço"
          onChange={handleChange}
          value={form.preco}
          className="w-full p-2 rounded bg-zinc-800"
          required
        />
        <input
          type="number"
          name="quantidade"
          placeholder="Quantidade"
          onChange={handleChange}
          value={form.quantidade}
          className="w-full p-2 rounded bg-zinc-800"
          required
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          onChange={handleChange}
          value={form.marca}
          className="w-full p-2 rounded bg-zinc-800"
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoria"
          onChange={handleChange}
          value={form.categoria}
          className="w-full p-2 rounded bg-zinc-800"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded"
        >
          {editandoId ? "Atualizar Produto" : "Cadastrar Produto"}
        </button>
      </form>

      <div className="mt-6 space-x-2">
        <button
          onClick={listarProdutos}
          className="bg-blue-500 hover:bg-blue-600 p-2 rounded"
        >
          Listar Meus Produtos
        </button>
      </div>

      <div className="mt-4">
  <button
    onClick={() => window.location.href = "/compras"}
    className="bg-purple-600 hover:bg-purple-700 p-2 rounded"
  >
    Ir para Compras
  </button>
</div>


      {produtos.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Meus Produtos à Venda</h2>
          <ul className="space-y-2">
            {produtos.map((p) => (
              <li key={p.id} className="bg-zinc-800 p-3 rounded">
                <p>
                  <strong>{p.nome}</strong> - {p.descricao}
                </p>
                <p>
                  Preço: R$ {Number(p.preco).toFixed(2)} | Qtd: {p.quantidade} | Marca: {p.marca} | Categoria: {p.categoria}
                </p>
                <button
                  onClick={() => editarProduto(p)}
                  className="text-yellow-400 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirProduto(p.id)}
                  className="text-red-500"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Vendas;
