import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ← Aqui está a correção!
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from 'react-router-dom';


export default function Estoque() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidade: "",
    marca: "",
    categoria: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("meusProdutos");

  const empresaId = localStorage.getItem("empresaId");

  const [empresaNome, setEmpresaNome] = useState("");

  // Estado para editar produto
  const [editPopup, setEditPopup] = useState({ open: false, produto: null });

  useEffect(() => {
    listarEmpresas();
    listarMeusProdutos();
  }, []);

  useEffect(() => {
    const fetchEmpresaLogada = async () => {
      try {
        const response = await fetch("http://localhost/backend/listar_empresas_com_produtos.php");
        const data = await response.json();
        setEmpresas(data);

        const empresaLogada = data.find((e) => e.id === empresaId);
        if (empresaLogada) {
          setEmpresaNome(empresaLogada.nome);
        }
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      }
    };

    fetchEmpresaLogada();
  }, [empresaId]);


  const handleLogout = () => {
    localStorage.removeItem("logado");
    localStorage.removeItem("empresaId");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleAddProductClick = () => {
    setPendingProduct({ ...form, empresa_id: empresaId });
    setShowPopup(true);
  };

  const confirmAddProduct = async () => {
    setShowPopup(false);
    if (!pendingProduct) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost/backend/adicionar_produto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pendingProduct),
      });

      const data = await response.json();
      if (data.erro) {
        alert(data.erro);
      } else {
        alert(data.mensagem);
        setForm({
          nome: "",
          descricao: "",
          preco: "",
          quantidade: "",
          marca: "",
          categoria: "",
        });
        if (activeTab === "meusProdutos") {
          listarMeusProdutos();
        } else if (activeTab === "todosProdutos") {
          listarTodosProdutos();
        } else if (activeTab === "filtrados") {
          filtrarProdutosPorEmpresa();
        }
      }
    } catch (error) {
      alert("Erro ao adicionar produto. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAddProduct = () => {
    setShowPopup(false);
    setPendingProduct(null);
  };

  const listarMeusProdutos = async () => {
    if (!empresaId) {
      alert("ID da empresa não encontrado.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost/backend/listar_produtos_empresa.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empresa_id: empresaId }),
      });

      const data = await response.json();
      if (data.erro) {
        alert(data.erro);
      } else {
        setProdutos(data);
        setActiveTab("meusProdutos");
      }
    } catch (error) {
      alert("Erro ao carregar os produtos da empresa.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const listarTodosProdutos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost/backend/listar_todos_produtos.php");
      const data = await response.json();
      setProdutos(data);
      setActiveTab("todosProdutos");
    } catch (error) {
      alert("Erro ao carregar todos os produtos.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const listarEmpresas = async () => {
    try {
      const response = await fetch("http://localhost/backend/listar_empresas_com_produtos.php");
      const data = await response.json();
      setEmpresas(data);
    } catch (error) {
      alert("Erro ao carregar empresas.");
      console.error(error);
    }
  };

  const filtrarProdutosPorEmpresa = async () => {
    if (!selectedEmpresa) {
      alert("Selecione uma empresa para filtrar.");
      return;
    }

    const empresa = empresas.find((e) => e.nome === selectedEmpresa);
    if (!empresa) {
      alert("Empresa selecionada não encontrada.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost/backend/filtrar_produtos_por_empresa.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empresa_id: empresa.id }),
      });

      const data = await response.json();
      if (data.erro) {
        alert(data.erro);
      } else {
        setProdutos(data);
        setActiveTab("filtrados");
      }
    } catch (error) {
      alert("Erro ao filtrar produtos.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para abrir popup de edição
  const handleEditarProduto = (produto) => {
    setEditPopup({ open: true, produto });
  };

  // Função para fechar popup de edição
  const closeEditPopup = () => {
    setEditPopup({ open: false, produto: null });
  };

  // Função para atualizar campos do produto em edição
  const handleEditInputChange = (e) => {
    setEditPopup((prev) => ({
      ...prev,
      produto: { ...prev.produto, [e.target.name]: e.target.value },
    }));
  };

  // Função para salvar edição
  const handleSalvarEdicao = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost/backend/editar_produto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editPopup.produto, id: editPopup.produto.id }),
      });
      const data = await response.json();
      if (data.erro) {
        alert(data.erro);
      } else {
        alert(data.mensagem);
        closeEditPopup();
        listarMeusProdutos();
      }
    } catch (error) {
      alert("Erro ao editar produto.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para excluir produto
  // [COPILOT] Função adicionada para permitir exclusão de produtos via backend e atualizar a lista
  const handleExcluirProduto = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost/backend/excluir_produto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.erro) {
        alert(data.erro);
      } else {
        alert(data.mensagem);
        listarMeusProdutos();
      }
    } catch (error) {
      alert("Erro ao excluir produto.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <Sidebar />

      <main className="">
        <Outlet />
      </main>
    </div>


    /* <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex justify-center items-center gap-4">
            <img src={logo} alt="" className="w-10" />
            <h1 className="text-2xl font-bold">MILLE<span className="font-bold bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent">NIUM</span></h1>
          </div>

          <div className="flex gap-8 ">
            <Link to="/vendas" className="text-zinc-300 hover:text-zinc-100 hover:opacity-10">Vendas</Link>
            <Link to="/doacoes" className="text-zinc-300 hover:text-zinc-100 hover:opacity-10">Doações</Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden md:inline-block text-gray-300">
              Empresa: {empresaNome}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                <h2 className="text-xl font-bold text-white">Adicionar Produto</h2>
              </div>
              <div className="p-6 space-y-4">
                {["nome", "descricao", "preco", "quantidade", "marca", "categoria"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      name={field}
                      value={form[field]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                  </div>
                ))}
                <button
                  onClick={handleAddProductClick}
                  disabled={isLoading}
                  className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  Adicionar Produto
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                <h2 className="text-xl font-bold text-white">Filtrar Produtos</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Selecione a Empresa
                  </label>
                  <select
                    value={selectedEmpresa}
                    onChange={(e) => setSelectedEmpresa(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  >
                    <option value="">Todas as Empresas</option>
                    {empresas.map((empresa) => (
                      <option key={empresa.id} value={empresa.nome}>
                        {empresa.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={filtrarProdutosPorEmpresa}
                    disabled={!selectedEmpresa || isLoading}
                    className={`py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center ${!selectedEmpresa
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                  >
                    Filtrar
                  </button>
                  <button
                    onClick={listarTodosProdutos}
                    disabled={isLoading}
                    className={`py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center ${activeTab === "todosProdutos"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                      }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={listarMeusProdutos}
                    disabled={isLoading}
                    className={`py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center ${activeTab === "meusProdutos"
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                      }`}
                  >
                    Meus
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">
                    {activeTab === "meusProdutos"
                      ? "Meus Produtos"
                      : activeTab === "todosProdutos"
                        ? "Todos os Produtos"
                        : `Produtos de ${selectedEmpresa}`}
                  </h2>
                  <span className="bg-indigo-500 text-white text-sm px-3 py-1 rounded-full">
                    {produtos.length} itens
                  </span>
                </div>
              </div>
              <div className="p-4">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : produtos.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-300">
                      Nenhum produto encontrado
                    </h3>
                    <p className="mt-1 text-gray-500">
                      {activeTab === "meusProdutos"
                        ? "Você ainda não cadastrou nenhum produto."
                        : "Nenhum produto corresponde aos filtros selecionados."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {produtos.map((produto) => (
                      <div
                        key={produto.id}
                        className="bg-gray-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-200"
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-white truncate">
                              {produto.nome}
                            </h3>
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              {produto.categoria}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-300 text-sm line-clamp-2">
                            {produto.descricao}
                          </p>
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-xs text-gray-400">Preço</span>
                              <p className="text-green-400 font-bold">
                                R$ {parseFloat(produto.preco).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-400">Estoque</span>
                              <p
                                className={`font-bold ${produto.quantidade > 0 ? "text-white" : "text-red-400"}`}
                              >
                                {produto.quantidade} un
                              </p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-400">Marca</span>
                              <p className="text-white text-sm">{produto.marca || "-"}</p>
                            </div>
                            {produto.nome_empresa && (
                              <div>
                                <span className="text-xs text-gray-400">Empresa</span>
                                <p className="text-white text-sm truncate">
                                  {produto.nome_empresa}
                                </p>
                              </div>
                            )}
                          </div>
                          {/* Botões de ação para MEUS PRODUTOS */
    /* {activeTab === "meusProdutos" && (
      <div className="flex gap-2 mt-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          onClick={() => handleEditarProduto(produto)}
        >
          Editar
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          onClick={() => handleExcluirProduto(produto.id)}
        >
          Excluir
        </button>
      </div>
    )}
  </div>
</div>
))}
</div>
)}
</div>
</div>
</div>
</div>
</div>

{showPopup && (
<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
<div className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
<div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
<h2 className="text-xl font-bold text-white">Confirmar Adição</h2>
</div>
<div className="p-6">
<p className="text-gray-300 mb-6">
Tem certeza que deseja adicionar o produto <strong>{pendingProduct?.nome}</strong> ao
estoque?
</p>
<div className="flex justify-end space-x-3">
<button
onClick={cancelAddProduct}
className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition duration-200"
>
Cancelar
</button>
<button
onClick={confirmAddProduct}
className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
>
Confirmar
</button>
</div>
</div>
</div>
</div>
)}

{editPopup.open && (
<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
<div className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-fade-in">
<div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
<h2 className="text-xl font-bold text-white">Editar Produto</h2>
</div>
<form className="p-6 space-y-4" onSubmit={e => { e.preventDefault(); handleSalvarEdicao(); }}>
{["nome", "descricao", "preco", "quantidade", "marca", "categoria"].map((field) => (
<div key={field}>
<label className="block text-sm font-medium text-blue-300 mb-1">
{field.charAt(0).toUpperCase() + field.slice(1)}
</label>
<input
name={field}
value={editPopup.produto[field] || ""}
onChange={handleEditInputChange}
className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-200 transition duration-200"
required
type={field === "preco" ? "number" : field === "quantidade" ? "number" : "text"}
min={field === "preco" || field === "quantidade" ? 0 : undefined}
step={field === "preco" ? "0.01" : undefined}
/>
</div>
))}
<div className="flex justify-end gap-2 mt-4">
<button
type="button"
className="px-4 py-2 rounded-lg border border-blue-600 text-blue-300 hover:bg-blue-700 transition duration-200"
onClick={closeEditPopup}
disabled={isLoading}
>
Cancelar
</button>
<button
type="submit"
className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
disabled={isLoading}
>
Salvar
</button>
</div>
</form>
</div>
</div>
)}
</div> */

  );
}

