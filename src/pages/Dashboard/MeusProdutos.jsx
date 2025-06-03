import BuscaProdutos from "../../components/dashboard/BuscaProdutos";
import FiltroPorTipo from "../../components/dashboard/FiltroPorTipo";
import HeaderProdutos from "../../components/dashboard/HeaderProdutos";
import TabelaProdutos from "../../components/dashboard/TabelaProdutos";

export default function MeusProdutos() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <HeaderProdutos />

            <div className="flex justify-between bg-[#F9FAFB] border-gray-200 border rounded-lg p-4 shadow-sm">
                <BuscaProdutos />
                <FiltroPorTipo />
            </div>

            <TabelaProdutos />
        </div>
    );
}