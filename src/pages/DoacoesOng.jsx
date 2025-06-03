import { useEffect, useState } from "react";

export default function DoacoesOng() {
  const [doacoes, setDoacoes] = useState([]);
  const ongId = localStorage.getItem("ongId");

  useEffect(() => {
    const buscarDoacoes = async () => {
      try {
        const response = await fetch(`http://localhost/backend/lista_doacoes_ong.php?ong_id=${ongId}`);
        const data = await response.json();
        setDoacoes(data);
      } catch (error) {
        console.error("Erro ao buscar doações:", error);
      }
    };

    buscarDoacoes();
  }, [ongId]);

  return (
    <div className="p-8 text-white bg-zinc-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Minhas Doações Recebidas</h1>
      {doacoes.length === 0 ? (
        <p>Não há doações ainda para sua ONG.</p>
      ) : (
        <ul className="grid gap-4">
          {doacoes.map((item) => (
            <li key={item.id} className="bg-zinc-800 p-4 rounded-lg shadow-md">
              <p><strong>Produto:</strong> {item.nome}</p>
              <p><strong>Quantidade:</strong> {item.quantidade}</p>
              <p><strong>Descrição:</strong> {item.descricao}</p>
              <p><strong>Data da Doação:</strong> {item.data_doacao}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


