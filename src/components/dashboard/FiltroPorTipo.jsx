export default function FiltroPorTipo({ value, onChange }) {
  return (
    <div className="w-full max-w-[160px]">
      <label htmlFor="tipo" className="text-zinc-700">
        Filtrar por Tipo
      </label>
      <select
        id="tipo"
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-gray-300 text-sm text-gray-700 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="todos">Todos</option>
        <option value="venda">Para Venda</option>
        <option value="doacao">Para Doação</option>
      </select>
    </div>
  );
}
