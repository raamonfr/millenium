import ResumoCard from './ResumoCard';
import { useEffect, useState } from "react";

export default function CardsResumo() {
  const [produtos, setProdutos] = useState([]);
  const [percentual, setPercentual] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("http://localhost/backend/buscar_todos_produtos.php");
        const data = await response.json();

        setProdutos(data);

        const totalAtual = data.length;
        const totalAnterior = 100; // valor simulado anterior

        setTotal(totalAtual);

        if (totalAnterior > 0) {
          const variacao = ((totalAtual - totalAnterior) / totalAnterior) * 100;
          setPercentual(variacao.toFixed(1)); // com uma casa decimalF
        } else {
          setPercentual(0);
        }

      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mt-6">
      <ResumoCard
        titulo="Produtos Cadastrados"
        valor={total}
        percentual={`${percentual > 0 ? "+" : ""}${percentual}%`}
        corTexto={percentual >= 0 ? "text-green-500" : "text-red-500"}
      />
      <ResumoCard
        titulo="Doações Realizadas"
        valor="89"
        percentual="+8%"
        corTexto="text-green-500"
      />
      <ResumoCard
        titulo="Vendas do Mês"
        valor="R$ 45.230"
        percentual="+15%"
        corTexto="text-green-500"
      />
      <ResumoCard
        titulo="Pedidos Pendentes"
        valor="23"
        percentual="-5%"
        corTexto="text-red-500"
      />
    </div>
  );
}