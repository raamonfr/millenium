import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#22d3ee', '#a3e635',
  '#6366f1', '#14b8a6', '#fb923c', '#e11d48'
];

export default function GraficoProdutosPorCategoria() {
  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resposta = await fetch('http://localhost/backend/buscar_todos_produtos.php');
        const produtos = await resposta.json();

        // Agrupamento por categoria
        const categoriasContadas = {};
        produtos.forEach(produto => {
          const categoria = produto.categoria || 'Sem Categoria';
          categoriasContadas[categoria] = (categoriasContadas[categoria] || 0) + 1;
        });

        // Total geral
        const total = Object.values(categoriasContadas).reduce((acc, val) => acc + val, 0);

        // Dados com % para o gráfico
        const dados = Object.entries(categoriasContadas).map(([categoria, quantidade]) => ({
          name: categoria,
          value: quantidade,
          percentual: ((quantidade / total) * 100).toFixed(1) + '%'
        }));

        setDadosGrafico(dados);
      } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
      }
    };

    carregarDados();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full h-80">
      <h2 className="text-xl font-semibold text-zinc-800 mb-4">Distribuição de Produtos por Categoria</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dadosGrafico}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {dadosGrafico.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} produtos`, name]} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}