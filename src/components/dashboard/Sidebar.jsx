import {
  Home,
  Package,
  Heart,
  ShoppingCart,
  FileText,
  ClipboardList,
  User
} from 'lucide-react';
import logo from '../../assets/Logo Millenium.svg';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'inicio', icon: <Home size={18} />, label: 'Início', path: '/estoque' },
  { id: 'meusprodutos', icon: <Package size={18} />, label: 'Meus Produtos', path: '/estoque/meusprodutos' },
  { id: 'vendas', icon: <ShoppingCart size={18} />, label: 'Vendas', path: '/estoque/vendas' },
  { id: 'relatorios', icon: <FileText size={18} />, label: 'Relatórios', path: '/estoque/relatorios' },
  { id: 'pedidos', icon: <ClipboardList size={18} />, label: 'Pedidos', path: '/estoque/pedidos' },
  { id: 'perfil', icon: <User size={18} />, label: 'Perfil', path: '/estoque/perfil' }
];


export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('inicio');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const current = menuItems.find(item => location.pathname === item.path);
    if (current) setActiveItem(current.id);
  }, [location.pathname]);


  const handleClick = (id, path) => {
    setActiveItem(id);
    if (path) navigate(path);
  };

  return (
    <aside className="w-64 flex flex-col items-center h-screen bg-white border-r shadow-sm">
      <img src={logo} alt="Logo Millenium" className='w-16 py-8' />
      <nav className="space-y-2 w-full p-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id, item.path)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium w-full transition-colors duration-150 ${activeItem === item.id
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 bg-white hover:text-gray-700 hover:bg-gray-200'
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
