export default function ResumoCard({ titulo, valor, percentual, corTexto = 'text-green-500' }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 w-full">
      <p className="text-sm text-gray-500">{titulo}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xl text-zinc-700 font-bold">{valor}</span>
        <span className={`text-sm font-medium ${corTexto}`}>
          {percentual}
        </span>
      </div>
    </div>
  );
}
