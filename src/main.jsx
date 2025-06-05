import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ErrorPage from './pages/ErroPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'; // 🛡️ Importa o PrivateRoute
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CadastroONG from './pages/CadastroONG.jsx';
import TelaEscolhaCadastro from './pages/TelaEscolhaCadastro.jsx';
import CadastroEmpresa from './pages/CadastroEmpresa.jsx';
import LoginPage from "./pages/cadastro/LoginPage.jsx"
import CadastroPage from "./pages/cadastro/CadastroPage.jsx"
import Vendas from './pages/Vendas.jsx';
import Doacoes from './pages/Doacoes.jsx';
import DoacoesOng from "./pages/DoacoesOng.jsx";
import Compras from "./pages/Compras";
import MeusProdutos from './pages/Dashboard/MeusProdutos.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx'
import PagiInicial from './pages/Dashboard/PagInicial.jsx'
import LoginLayout from './layouts/LoginLayout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: (<LoginLayout />
    ),
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: "cadastro",
        element: <CadastroPage />
      }
    ]
  },
  {
    path: "/vendas",
    element: <Vendas />
  },
  {
    path: "/doacoes-ong",
    element: <DoacoesOng />
  },
  {
    path: "/compras",
    element: <Compras />
  },
  {
    path: "/estoque",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // /paginainicial
        element: <PagiInicial />,
      },
      {
        path: "meusprodutos", // /estoque/meusprodutos
        element: <MeusProdutos />,
      },
      {
        path: "doacoes",
        element: <Doacoes />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);