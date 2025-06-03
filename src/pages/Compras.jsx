import { useEffect, useState } from "react";

function Compras() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [parcelas, setParcelas] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    listarProdutos();
    // Pega o email do localStorage (depois do login)
    const emailSalvo = localStorage.getItem("emailUsuario") || "";
    setEmail(emailSalvo);
  }, []);

  const listarProdutos = async () => {
    try {
      const res = await fetch("http://localhost/backend/buscar_todos_produtos.php");
      const data = await res.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
    }
  };

  function abrirModal(produto) {
    setProdutoSelecionado(produto);
    setParcelas(1);
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
    setProdutoSelecionado(null);
  }

  const comprarProduto = async () => {
    if (!email) {
      alert("Email do usuário não encontrado. Faça login novamente.");
      return;
    }

    try {
      const res = await fetch("http://localhost/backend/comprar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produtoId: produtoSelecionado.id,
          parcelas,
          email,
        }),
      });
      const data = await res.json();

      if (data.sucesso) {
        alert("Boleto gerado e enviado para seu email!");
        fecharModal();
      } else {
        alert("Erro ao gerar boleto: " + data.mensagem);
      }
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  };

  return (
    <div className="p-6 bg-zinc-900 text-white rounded-xl max-w-4xl mx-auto mt-10 shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Produtos Disponíveis para Compra</h1>
      {produtos.length === 0 ? (
        <p className="text-center">Nenhum produto encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {produtos.map((p) => (
            <li key={p.id} className="bg-zinc-800 p-4 rounded shadow relative">
              <h2 className="text-xl font-semibold">{p.nome}</h2>
              <p>{p.descricao}</p>
              <p>💰 Preço: R$ {Number(p.preco).toFixed(2)}</p>
              <p>📦 Quantidade: {p.quantidade}</p>
              <p>🏷 Marca: {p.marca || "Não informado"} | Categoria: {p.categoria || "Não informada"}</p>
              <button
                className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => abrirModal(p)}
              >
                Comprar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {mostrarModal && produtoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg max-w-md w-full shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-white text-xl font-bold"
              onClick={fecharModal}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">{produtoSelecionado.nome}</h2>
            <p className="mb-2">{produtoSelecionado.descricao}</p>
            <p className="mb-2">Preço: R$ {Number(produtoSelecionado.preco).toFixed(2)}</p>
            <p className="mb-4">Quantidade disponível: {produtoSelecionado.quantidade}</p>

            <label className="block mb-2">
              Parcelas (1 a 6):
              <select
                className="ml-2 bg-zinc-700 rounded px-2 py-1"
                value={parcelas}
                onChange={(e) => setParcelas(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}x
                  </option>
                ))}
              </select>
            </label>

            <button
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mt-4 w-full"
              onClick={comprarProduto}
            >
              Gerar Boleto e Enviar por Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compras;
