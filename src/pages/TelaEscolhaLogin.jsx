import { motion } from "framer-motion";
import BotaoAzul from "../components/BotaoAzul";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function TelaEscolhaLogin() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-screen h-screen flex flex-col justify-center items-center gap-16 bg-gradient-to-br from-zinc-900 to-zinc-800 relative overflow-hidden"
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

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-blue-600 opacity-10 blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-blue-400 opacity-10 blur-xl"></div>
      </div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center z-10"
      >
        <motion.h1 
          className="text-4xl font-bold text-white mb-2 text-center"
          whileHover={{ scale: 1.02 }}
        >
          Entre no sistema
        </motion.h1>
        <motion.p 
          className="text-zinc-400 text-lg mb-8 text-center"
          whileHover={{ scale: 1.01 }}
        >
          Escolha como deseja entrar
        </motion.p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex flex-col gap-8 z-10"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <BotaoAzul 
            rota="/loginEmpresa" 
            textoBotao="Sou uma Empresa"
            className="px-12 py-4 text-lg"
          />
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <BotaoAzul 
            rota="/loginOng" 
            textoBotao="Sou uma ONG"
            className="px-12 py-4 text-lg"
            largura="w-full"
          />
        </motion.div>
      </motion.div>


      <motion.div 
        variants={itemVariants}
        className="absolute bottom-8 text-zinc-500 text-sm z-10"
      >
        Não possui conta? <Link to="/cadastro" className="text-blue-500 hover:underline">Se cadastre</Link>
      </motion.div>
    </motion.div>
  );
}

export default TelaEscolhaLogin;