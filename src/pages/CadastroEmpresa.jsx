import { useState, useEffect } from "react";
import imagemComplementar1 from "../assets/wallpaper1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

function CadastroEmpresa() {
   const [formData, setFormData] = useState({
    nome_empresa: "",
    cnpj: "",
    email: "",
    telefone: "",
    cep: "",
    senha: "",
    confirmarSenha: ""
});


    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const response = await fetch("http://localhost/backend/cadastrar_empresa.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.mensagem) {
                alert(result.mensagem);
                navigate("/login");
            } else {
                alert(result.erro || "Erro ao cadastrar ONG");
            }
        } catch (error) {
            console.error("Erro ao conectar com o backend:", error);
            alert("Erro de conexão com o servidor.");
        }
    };

    // animação quando entra ta ligero?
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="flex w-screen h-screen bg-zinc-900 overflow-hidden">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-3 left-10 mt-10 z-10"
            >
                <Link
                    to="/"
                    className="absolute top-8 left-8 z-10"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-300 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Voltar</span>
                    </motion.div>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-1/2 h-full rounded-tr-3xl rounded-br-3xl shadow-2xl bg-cover bg-center fixed left-0"
                style={{
                    backgroundImage: `url(${imagemComplementar1})`,
                    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)"
                }}
            ></motion.div>

            <div className="w-1/2 h-full overflow-y-auto ml-auto">
                <motion.div
                    initial="hidden"
                    animate={loaded ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="flex flex-col gap-6 items-center justify-center min-h-full text-white py-10 px-4"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold p-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent"
                    >
                        Cadastro de Empresas
                    </motion.h2>

                    <motion.form
                        variants={containerVariants}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6 w-full max-w-md bg-zinc-900/50 p-8 rounded-xl backdrop-blur-sm border border-zinc-700/50 shadow-2xl"
                    >
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-zinc-300">
                                Nome da Empresa:
                                <input
                                    type="text"
                                     name="nome_empresa"
                                     value={formData.nome_empresa}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-zinc-700 bg-zinc-900/50 text-white mt-1 focus:outline-none focus:border-blue-500 transition-all duration-300"
                                    required
                                />
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-zinc-300">
                                CNPJ:
                                <input
                                    type="text"
                                    name="cnpj"
                                    value={formData.cnpj}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-zinc-700 bg-zinc-900/50 text-white mt-1 focus:outline-none focus:border-blue-500 focus:bg-zinc-800 transition-all duration-300"
                                    required
                                />
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-zinc-300">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-zinc-700 bg-zinc-900/50 text-white mt-1 focus:outline-none focus:border-blue-500 focus:bg-zinc-800 transition-all duration-300"
                                    required
                                />
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-zinc-300">
                                Telefone:
                                <input
                                    type="tel"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-zinc-700 bg-zinc-900/50 text-white mt-1 focus:outline-none focus:border-blue-500 focus:bg-zinc-800 transition-all duration-300"
                                    required
                                />
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-zinc-300">
                                Endereço:
                                <input
                                    type="text"
                                    name="cep"
                                    value={formData.cep}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-zinc-700 bg-zinc-900/50 text-white mt-1 focus:outline-none focus:border-blue-500 focus:bg-zinc-800 transition-all duration-300"
                                    required
                                />
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-zinc-300">
                                Senha:
                                <input
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-zinc-700 bg-zinc-900/50 text-white mt-1 focus:outline-none focus:border-blue-500 focus:bg-zinc-800 transition-all duration-300"
                                    required
                                />
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-zinc-300">
                                Confirmar Senha:
                                <input
                                    type="password"
                                    name="confirmarSenha"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-zinc-700 bg-zinc-900/50 text-white mt-1 focus:outline-none focus:border-blue-500 focus:bg-zinc-800 transition-all duration-300"
                                    required
                                />
                            </label>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col justify-center items-center gap-6 mt-6"
                        >
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="px-8 py-3 font-bold border-2 border-transparent bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/30 w-full"
                            >
                                Cadastrar
                            </motion.button>

                            <motion.p
                                className="text-center text-zinc-400"
                                whileHover={{ scale: 1.02 }}
                            >
                                Já possui cadastro?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                                >
                                    Faça login
                                </Link>
                            </motion.p>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    );
}

export default CadastroEmpresa;