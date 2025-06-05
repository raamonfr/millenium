import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import ImagemHome from "./assets/organizing-data.svg"
import SecaoSobre from './components/SecaoSobre';
import Footer from './components/Footer';
import NossoContato from './components/NossoContato';
import NavHeader from './components/NavHeader';
import BotaoAzul from './components/BotaoAzul';

import peopleWork1 from './assets/people-work.jpg'
import random from './assets/random.jpg'
import CardServicos from './components/CardServicos';
import marketPlace from "./assets/marketplace.jpg"
import rastreamento from "./assets/rastreamento.jpg"
import doacoes from "./assets/doacoes.jpg"
import relatorioESG from "./assets/relatorioESG.jpg"
import peopleWork22 from './assets/peopleWorking22.jpg'

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // animações insanas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  return (
    <>
      <NavHeader />

      <motion.div 
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-screen flex flex-col md:flex-row justify-between mt-40 md:mt-56 mb-10 md:mb-20 px-6 sm:px-12 lg:px-24 xl:px-40"
      >
        <div className="w-full md:w-1/2 max-w-[700px] space-y-5">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-zinc-300"
          >
            Bem-vindo ao <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Millenium</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="font-light text-zinc-400"
          >
            Uma plataforma segura, eficiente e escalável, desenvolvida com
            tecnologia de ponta para garantir a melhor experiência. 🚀
          </motion.p>

          <motion.p variants={itemVariants}>
            Ainda não faz parte dessa equipe?
          </motion.p>

          <motion.div variants={itemVariants}>
            <BotaoAzul rota="/login" textoBotao="Entrar" />
          </motion.div>
        </div>

        <motion.img
          variants={{
            hidden: { x: 100, opacity: 0 },
            visible: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
          src={ImagemHome}
          alt="Imagem ilustrativa da plataforma Millenium"
          className="hidden md:block w-1/2 max-w-[500px] mt-10 md:mt-0"
        />
      </motion.div>


      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className='flex flex-col gap-8 justify-center my-12 md:my-24 px-4 sm:px-6 lg:px-8'
      >
        <motion.h1 
          variants={itemVariants}
          className="text-center mb-8 md:mb-12 text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-300"
        >
          Nossos <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Serviços</span>
        </motion.h1>

        <div id="nossosServicos" className='grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto'>
          <motion.div variants={cardVariants}>
            <CardServicos
              imagem={marketPlace}
              altSEO="Marketplace- Card"
              titulo="Marketplace"
              conteudo="Plataforma para vender, trocar ou doar excedentes com outras empresas."
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <CardServicos
              imagem={rastreamento}
              altSEO="Rastreamento - Card"
              titulo="Rastro Blockchain"
              conteudo="Transações seguras e rastreáveis com tecnologia blockchain."
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <CardServicos
              imagem={doacoes}
              altSEO="Doações ONG - Card"
              titulo="Doação Facilitada"
              conteudo="Conecte-se com ONGs e doe itens em poucos cliques."
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <CardServicos
              imagem={relatorioESG}
              altSEO="Relatorios ESG - Card"
              titulo="Relatórios ESG"
              conteudo="Gere relatórios do impacto ambiental e social da sua empresa."
            />
          </motion.div>
        </div>
      </motion.section>

      <section id='sobreNos' className="w-full px-6 lg:px-40 py-20 lg:py-32 space-y-20 lg:space-y-72 bg-white text-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SecaoSobre 
            titulo="Nossa Missão" 
            conteudo="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cupiditate atque, voluptate dolores, amet iure tempore culpa similique porro omnis quis et magnam quasi reiciendis? Aut earum ab fugit numquam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas neque iste, debitis reiciendis ex sequi alias, mollitia, dolorem suscipit magni odit minima facilis. Eveniet consectetur nam nostrum iusto necessitatibus voluptate!" 
            imagem={peopleWork1} 
            altSEO="Nossa Missão" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SecaoSobre 
            className="flex-row-reverse" 
            titulo="Nossa História" 
            conteudo="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cupiditate atque, voluptate dolores, amet iure tempore culpa similique porro omnis quis et magnam quasi reiciendis? Aut earum ab fugit numquam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas neque iste, debitis reiciendis ex sequi alias, mollitia, dolorem suscipit magni odit minima facilis. Eveniet consectetur nam nostrum iusto necessitatibus voluptate! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate distinctio porro nemo ex voluptate blanditiis repellat quos soluta id vero! Nisi provident rerum ut odit, ullam velit reiciendis fugit pariatur. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim officiis iusto beatae veritatis animi eos similique, tenetur commodi! Iste cumque molestias hic debitis architecto, provident quod! Odit iusto deleniti dolorem." 
            imagem={peopleWork22} 
            altSEO="Nossa História" 
            posicao="flex-row-reverse"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SecaoSobre 
            titulo="Millenium Avante!" 
            conteudo="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cupiditate atque, voluptate dolores, amet iure tempore culpa similique porro omnis quis et magnam quasi reiciendis? Aut earum ab fugit numquam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas neque iste, debitis reiciendis ex sequi alias, mollitia, dolorem suscipit magni odit minima facilis. Eveniet consectetur nam nostrum iusto necessitatibus voluptate!" 
            imagem={random} 
            altSEO="Millenium Avante" 
          />
        </motion.div>
      </section>

      <NossoContato />

      <Footer />
    </>
  );
}

export default App;