import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.jsx';
import Cadastro from './pages/CadastroEmpresa.jsx';
import Login from './pages/LoginEmpresa.jsx';
import Estoque from './pages/Estoque.jsx';
import ErrorPage from './pages/ErroPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'; // 🛡️ Importa o PrivateRoute

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CadastroONG from './pages/CadastroONG.jsx';
import TelaEscolhaLogin from './pages/TelaEscolhaLogin.jsx';
import TelaEscolhaCadastro from './pages/TelaEscolhaCadastro.jsx';
import CadastroEmpresa from './pages/CadastroEmpresa.jsx';
import LoginEmpresa from './pages/LoginEmpresa.jsx';
import LoginOng from './pages/LoginOng.jsx';
import Vendas from './pages/Vendas.jsx';
import Doacoes from './pages/Doacoes.jsx';
import DoacoesOng from "./pages/DoacoesOng.jsx";
import Compras from "./pages/Compras"; // ✅ certo
import MeusProdutos from './pages/Dashboard/MeusProdutos.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx'
import PagiInicial from './pages/Dashboard/PagInicial.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/cadastro",
    element: <TelaEscolhaCadastro />,
  },
  {
    path: "/login",
    element: <TelaEscolhaLogin />
  },
  {
    path: "/cadastroOng",
    element: <CadastroONG />
  },
  {
    path: "/cadastroEmpresa",
    element: <CadastroEmpresa />
  },
  {
    path: "/loginEmpresa",
    element: <LoginEmpresa />
  },
  {
    path: "loginOng",
    element: <LoginOng />
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
      // você pode adicionar mais páginas do dashboard aqui
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);