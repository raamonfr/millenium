export default function BuscaProdutos({ value, onChange }) {
    return (
        <div className="relative w-full max-w-md">
            <label htmlFor="pesquisa" className="text-zinc-700">
                Buscar Produtos
            </label>

            <input
                id='pesquisa'
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Buscar por nome ou categoria..."
                className="w-full bg-white px-2 py-2 border border-gray-300 rounded-lg shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
            </input>
        </div>
    );
}
