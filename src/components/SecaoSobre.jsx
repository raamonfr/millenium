import { motion } from "framer-motion";

function SecaoSobre(props) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    };

    const textVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className={`flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-14 lg:${props.posicao}`}
        >
            <motion.div 
                variants={textVariants}
                className='max-w-[600px] space-y-6'
            >
                <motion.h1 
                    className='font-bold text-3xl md:text-4xl text-center lg:text-left bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'
                    whileHover={{ scale: 1.02 }}
                >
                    {props.titulo}
                </motion.h1>
                <motion.p 
                    className='text-zinc-600 text-lg leading-relaxed'
                    whileHover={{ scale: 1.01 }}
                >
                    {props.conteudo}
                </motion.p>
            </motion.div>

            <motion.img 
                variants={imageVariants}
                className='max-w-full h-auto w-full lg:w-[580px] rounded-xl transition-shadow duration-300'
                src={props.imagem} 
                alt={props.altSEO}
                whileHover={{ scale: 1.03 }}
            />
        </motion.div>
    );
}

export default SecaoSobre;