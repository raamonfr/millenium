import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Jan', vendas: 4000 },
  { mes: 'Fev', vendas: 3000 },
  { mes: 'Mar', vendas: 5000 },
  { mes: 'Abr', vendas: 2500 },
  { mes: 'Mai', vendas: 4200 },
  { mes: 'Jun', vendas: 3800 },
];

export default function GraficoVendasMensais() {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full h-80">
      <h2 className="text-lg text-zinc-700 font-semibold mb-4">Vendas Mensais</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
