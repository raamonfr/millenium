import ResumoCard from './ResumoCard';

export default function CardsResumo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mt-6">
      <ResumoCard
        titulo="Produtos Ativos"
        valor="127"
        percentual="+12%"
        corTexto="text-green-500"
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
