import { useState, useEffect } from "react";

function Doacoes() {
    const [ongs, setOngs] = useState([]);
    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        quantidade: "",
        categoria: "",
        ong: ""
    });
    const [produtos, setProdutos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const empresaId = localStorage.getItem("empresaId");

    useEffect(() => {
        fetch("http://localhost/backend/listar_ongs.php")
            .then(res => res.json())
            .then(data => setOngs(data))
            .catch(err => console.error("Erro ao carregar ONGs:", err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editandoId
            ? "http://localhost/backend/editar_doacao.php"
            : "http://localhost/backend/doar.php";

        const payload = {
            ...form,
            empresaId,
        };

        if (editandoId) {
            payload.id = editandoId;
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            alert(result.mensagem || result.erro);
            setEditandoId(null);
            listarProdutos();
            setForm({
                nome: "",
                descricao: "",
                quantidade: "",
                categoria: "",
                ong: ""
            });
        } catch (error) {
            alert("Erro ao enviar doação.");
        }
    };

    const listarProdutos = async () => {
        const res = await fetch(`http://localhost/backend/listar_doacoes.php?empresaId=${empresaId}`);
        const data = await res.json();
        setProdutos(data);
    };

    const excluirProduto = async (id) => {
        const confirmacao = confirm("Tem certeza que deseja excluir?");
        if (!confirmacao) return;
        const res = await fetch(`http://localhost/backend/excluir_doacao.php?id=${id}&empresaId=${empresaId}`, {
            method: "DELETE"
        });
        const data = await res.json();
        alert(data.mensagem || data.erro);
        listarProdutos();
    };

    const editarProduto = (produto) => {
        setForm({
            nome: produto.nome,
            descricao: produto.descricao,
            quantidade: produto.quantidade,
            categoria: produto.categoria,
            ong: produto.ong_nome
        });
        setEditandoId(produto.id);
    };

    return (
        <div className="p-6 bg-zinc-900 text-white rounded-xl max-w-2xl mx-auto mt-10 shadow-xl">
            <h1 className="text-2xl font-bold mb-4">Cadastrar Doação</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="nome" placeholder="Nome do produto" onChange={handleChange} value={form.nome} className="w-full p-2 rounded bg-zinc-800" required />
                <textarea name="descricao" placeholder="Descrição" onChange={handleChange} value={form.descricao} className="w-full p-2 rounded bg-zinc-800" required />
                <input type="number" name="quantidade" placeholder="Quantidade" onChange={handleChange} value={form.quantidade} className="w-full p-2 rounded bg-zinc-800" required />
                <input type="text" name="categoria" placeholder="Categoria" onChange={handleChange} value={form.categoria} className="w-full p-2 rounded bg-zinc-800" />
                <select name="ong" onChange={handleChange} value={form.ong} className="w-full p-2 rounded bg-zinc-800" required>
                    <option value="">Selecione uma ONG</option>
                    {ongs.map((ong, index) => (
                        <option key={index} value={ong.nome}>{ong.nome}</option>
                    ))}
                </select>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-2 rounded">
                    {editandoId ? "Atualizar Doação" : "Enviar Doação"}
                </button>
            </form>

            <div className="mt-6 space-x-2">
                <button onClick={listarProdutos} className="bg-blue-500 hover:bg-blue-600 p-2 rounded">Listar Minhas Doações</button>
            </div>

            {produtos.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Minhas Doações</h2>
                    <ul className="space-y-2">
                        {produtos.map((p) => (
                            <li key={p.id} className="bg-zinc-800 p-3 rounded">
                                <p><strong>{p.nome}</strong> - {p.descricao}</p>
                                <p>Qtd: {p.quantidade} | Categoria: {p.categoria}</p>
                                <button onClick={() => editarProduto(p)} className="text-yellow-400 mr-2">Editar</button>
                                <button onClick={() => excluirProduto(p.id)} className="text-red-500">Excluir</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Doacoes;
