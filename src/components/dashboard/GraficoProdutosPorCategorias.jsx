import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { categoria: 'Alimentos', valor: 400 },
  { categoria: 'Vestuário', valor: 300 },
  { categoria: 'Eletrônicos', valor: 300 },
  { categoria: 'Outros', valor: 200 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function GraficoProdutosPorCategoria() {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full h-72">
      <h2 className="text-lg text-zinc-700 font-semibold mb-4">Produtos por Categoria</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="valor"
            nameKey="categoria"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
