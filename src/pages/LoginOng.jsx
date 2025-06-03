import { useState, useEffect } from "react";
import imagemComplementar3 from "../assets/ONG.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

function LoginOng() {
  const [formData, setFormData] = useState({
    cnpjONG: "",
    senhaONG: "",
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

    try {
      const response = await fetch("http://localhost/backend/login_ong.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
if (response.ok && result.mensagem) {
  alert(result.mensagem);
  localStorage.setItem("logado", "true");
  localStorage.setItem("ongId", result.ongId);
  navigate("/doacoes-ong"); // agora sim, redirecionando pra tela da ONG
}
 else {
  alert(result.erro || "Erro ao realizar login");
}

    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

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

      <div className="w-1/2 h-full overflow-y-auto">
        <motion.div
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col gap-8 items-center justify-center min-h-full text-white py-10 px-4"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent"
          >
            Entrar na sua ONG
          </motion.h2>

          <motion.form
            variants={containerVariants}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-md bg-zinc-900/50 p-8 rounded-xl backdrop-blur-sm border border-zinc-700/50 shadow-2xl"
          >
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-zinc-300">
                CNPJ:
                <input
                  type="text"
                  name="cnpjONG"
                  value={formData.cnpjONG}
                  onChange={handleChange}
                  className="w-full p-3 border-b-2 border-zinc-700 bg-zinc-900/50 text-white mt-1 focus:outline-none focus:border-blue-500 focus:bg-zinc-800 transition-all duration-300"
                  required
                  autoComplete="username"
                />
              </label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-zinc-300">
                Senha:
                <input
                  type="password"
                  name="senhaONG"
                  value={formData.senhaONG}
                  onChange={handleChange}
                  className="w-full p-3 border-b-2 border-zinc-700 bg-zinc-900/50 text-white mt-1 focus:outline-none focus:border-blue-500 focus:bg-zinc-800 transition-all duration-300"
                  required
                  autoComplete="current-password"
                />
              </label>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-center items-center gap-6 mt-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-8 py-3 font-bold border-2 border-transparent bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/30 w-full"
              >
                Entrar
              </motion.button>

              <motion.p
                className="text-center text-zinc-400"
                whileHover={{ scale: 1.02 }}
              >
                Ainda não cadastrou sua empresa/ONG?{" "}
                <Link
                  to="/cadastro"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Cadastre-se agora
                </Link>
              </motion.p>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 h-full rounded-tl-3xl rounded-bl-3xl shadow-2xl bg-cover bg-center fixed right-0"
        style={{
          backgroundImage: `url(${imagemComplementar3})`,
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)"
        }}
      ></motion.div>
    </div>
  );
}

export default LoginOng;