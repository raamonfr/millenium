import ModalAdicionarProduto from "./ModalAdicionarProduto";
import { useState } from "react";

export default function HeaderProdutos(props) {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meus Produtos</h1>
        <p className="text-sm text-gray-500">
          Gerencie seus produtos para venda e doação
        </p>
      </div>
      <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow" onClick={() => setModalAberto(true)}>
        + Adicionar Produto
      </button>

      <ModalAdicionarProduto
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onSalvar={() => {
          // lógica de salvar
          alert('Produto adicionado!');
          setModalAberto(false);
        }}
      />
    </div>
  );
}
