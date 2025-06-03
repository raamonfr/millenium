import Header from '../../components/dashboard/Header'
import CardsResumo from '../../components/dashboard/CardsResumo'
import GraficoVendasMensais from '../../components/dashboard/GraficoVendasMensais'
import GraficoProdutosPorCategoria from '../../components/dashboard/GraficoProdutosPorCategorias'
import TabelaMeusProdutos from '../../components/dashboard/TabelaMeusProdutos'

export default function PagInicial() {
    return (
        <div className=''>
            <CardsResumo />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 mt-6">
                <GraficoVendasMensais />
                <GraficoProdutosPorCategoria />
            </div>

            <TabelaMeusProdutos />
        </div>
    )
}