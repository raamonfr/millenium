import { useEffect, useState } from 'react';
import ModalAdicionarProduto from './ModalAdicionarProduto';

export default function TabelaProdutos() {
    const [modalAberto, setModalAberto] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);

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

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            {carregando ? (
                <p className="text-gray-500">Carregando produtos...</p>
            ) : produtos.length === 0 ? (
                <>
                    <div className="text-gray-400 mb-4 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 14.25v4.5a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-4.5m16.5-6V9a2.25 2.25 0 00-2.25-2.25h-12A2.25 2.25 0 002.25 9v-.75m18 0H3.75m16.5 0l-1.5 9a2.25 2.25 0 01-2.25 1.875H7.5A2.25 2.25 0 015.25 18l-1.5-9"
                            />
                        </svg>

                        <h2 className="text-lg font-semibold text-gray-700">Nenhum produto encontrado</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Você ainda não cadastrou nenhum produto.
                        </p>
                    </div>

                </>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="bg-gray-100 text-center text-gray-700 text-sm font-semibold">
                                <th className="px-4 py-2">Produto</th>
                                <th className="px-4 py-2">Categoria</th>
                                <th className="px-4 py-2">Preço</th>
                                <th className="px-4 py-2">Quantidade</th>
                                <th className="px-4 py-2">Tipo</th>
                                <th className="px-4 py-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id} className="bg- border text-center text-zinc-700 border-gray-200 rounded-md shadow-sm">
                                    <td className="px-4 py-3">{produto.nome}</td>
                                    <td className="px-4 py-3">{produto.categoria}</td>
                                    <td className="px-4 py-3">R$ {Number(produto.preco).toFixed(2)}</td>
                                    <td className="px-4 py-3">{Number(produto.quantidade)}</td>
                                    <td className={"px-4 py-3"}>{produto.isSale === '1' ? 'Para Vendas' : 'Para Doação'}</td>
                                    <td className="px-4 py-3">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md">
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                </div>
    )
}

<ModalAdicionarProduto
    aberto={modalAberto}
    onFechar={() => setModalAberto(false)}
    onSalvar={handleProdutoAdicionado}
/>
        </div >
    );
}
