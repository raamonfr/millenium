import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TabelaMeusProdutos() {
  const [modalAberto, setModalAberto] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/backend/buscar_todos_produtos.php")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
        setCarregando(false);
      });
  }, []);

  const handleProdutoAdicionado = () => {
    fetch("http://localhost/backend/buscar_todos_produtos.php")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
    setModalAberto(false);
  };

  const produtosVisiveis = produtos.length >= 4 ? produtos.slice(0, 3) : produtos;

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6 mx-6">
      <h2 className="text-lg text-zinc-700 font-semibold mb-4">Meus Produtos</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4">Produto</th>
              <th className="py-2 px-4">Categoria</th>
              <th className="py-2 px-4">Preço</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosVisiveis.map((produto) => (
              <tr key={produto.id} className="border-b hover:bg-gray-50 text-zinc-700">
                <td className="py-2 px-4 gap-3">{produto.nome}</td>
                <td className="py-2 px-4">{produto.categoria}</td>
                <td className="py-2 px-4">{produto.preco}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${produto.status === 'Ativo'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {produto.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button className="text-white bg-blue-500 hover:underline text-sm">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}