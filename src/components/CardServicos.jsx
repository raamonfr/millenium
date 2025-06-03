import { motion } from "framer-motion";
import BotaoAzul from "./BotaoAzul";

function CardServicos(props) {
    // Animations
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.03,
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
        }
    };

    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            className="w-full bg-zinc-800/80 backdrop-blur-sm p-4 sm:p-6 flex flex-col md:flex-row justify-between rounded-xl gap-4 sm:gap-6 transition-all border border-zinc-700/50 min-h-[200px]"
        >
            <motion.div 
                variants={itemVariants}
                className="flex justify-center md:justify-start md:w-[250px] overflow-hidden rounded-xl"
            >
                <motion.img
                    src={props.imagem}
                    alt={props.altSEO}
                    className="w-full h-[150px] sm:h-[180px] md:h-[200px] object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                />
            </motion.div>

            <motion.div 
                variants={contentVariants}
                className="flex flex-col justify-between gap-3 h-full text-center md:text-left flex-1"
            >
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-col gap-2"
                >
                    <motion.h2 
                        className="text-2xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.02 }}
                    >
                        {props.titulo}
                    </motion.h2>
                    <motion.p 
                        className="text-zinc-300 text-sm sm:text-base"
                        whileHover={{ scale: 1.01 }}
                    >
                        {props.conteudo}
                    </motion.p>
                </motion.div>
                
                <motion.div 
                    variants={itemVariants}
                    className="flex justify-center md:justify-start"
                >
                    <BotaoAzul textoBotao="Saber mais" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default CardServicos;