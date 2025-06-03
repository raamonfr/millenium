import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidade: "",
    marca: "",
    categoria: "",
  });

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await fetch(`http://localhost/backend/listar_produtos_empresa.php?id=${id}`);
        const data = await response.json();
        if (data.erro) {
          alert(data.erro);
        } else {
          setForm(data);
        }
      } catch (error) {
        alert("Erro ao carregar os dados do produto.");
        console.error(error);
      }
    };

    fetchProduto();
  }, [id]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/backend/editar_produto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id }),
      });

      const data = await response.json();
      if (data.erro) {
        alert(data.erro);
      } else {
        alert(data.mensagem);
        navigate("/estoque");
      }
    } catch (error) {
      alert("Erro ao editar o produto. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Produto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(form).map((field) => (
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
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Salvar Alterações
          </button>
          <button
            type="button"
            onClick={() => navigate("/estoque")}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-200 mt-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarProduto;