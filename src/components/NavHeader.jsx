import { UserPlusIcon, MenuIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NavHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const mobileMenuVariants = {
        hidden: { 
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const mobileItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div 
            id='Header'
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed left-0 w-full flex justify-between items-center px-6 md:px-20 lg:px-40 py-4 bg-zinc-900/95 backdrop-blur-sm z-50 border-b border-zinc-800"
        >
            <motion.h1 
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer text-2xl sm:text-3xl font-extrabold select-none"
            >
                MILLE<span className="text-blue-500">NIUM</span>
            </motion.h1>

            <motion.button
                whileTap={{ scale: 0.9 }}
                className="md:hidden text-white p-2 rounded-lg hover:bg-zinc-800 transition-all"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <XIcon /> : <MenuIcon />}
            </motion.button>

            <motion.nav 
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.3
                        }
                    }
                }}
                className="hidden md:flex items-center gap-6 lg:gap-10"
            >
                <motion.a 
                    variants={navItemVariants}
                    href="#nossosServicos" 
                    className="text-white transition hover:text-blue-400 hover:scale-105"
                >
                    Nossos Serviços
                </motion.a>
                <motion.a 
                    variants={navItemVariants}
                    href="#sobreNos" 
                    className="text-white transition hover:text-blue-400 hover:scale-105"
                >
                    Sobre nós
                </motion.a>
                <motion.a 
                    variants={navItemVariants}
                    href="#nossoContato" 
                    className="text-white transition hover:text-blue-400 hover:scale-105"
                >
                    Contato
                </motion.a>
                <motion.div variants={navItemVariants}>
                    <Link 
                        to="/login" 
                        className="text-blue-400 transition hover:text-blue-300 hover:scale-105"
                    >
                        Login
                    </Link>
                </motion.div>
                <motion.div variants={navItemVariants}>
                    <Link 
                        to="/cadastro" 
                        className="flex gap-2 items-center border-2 border-transparent bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
                    >
                        <UserPlusIcon size={18} /> Cadastre-se
                    </Link>
                </motion.div>
            </motion.nav>

                {/* navegação mobile aaaa */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={mobileMenuVariants}
                        className="absolute top-full left-0 w-full bg-zinc-900/95 backdrop-blur-sm flex flex-col items-center gap-4 py-4 md:hidden shadow-lg border-t border-zinc-800 overflow-hidden"
                    >
                        <motion.a 
                            variants={mobileItemVariants}
                            href="#nossosServicos" 
                            className="text-white transition hover:text-blue-400 px-4 py-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            Nossos Serviços
                        </motion.a>
                        <motion.a 
                            variants={mobileItemVariants}
                            href="#sobreNos" 
                            className="text-white transition hover:text-blue-400 px-4 py-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sobre nós
                        </motion.a>
                        <motion.a 
                            variants={mobileItemVariants}
                            href="#nossoContato" 
                            className="text-white transition hover:text-blue-400 px-4 py-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contato
                        </motion.a>
                        <motion.div variants={mobileItemVariants}>
                            <Link 
                                to="/login" 
                                className="text-blue-400 transition hover:text-blue-300 px-4 py-2 block"
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </motion.div>
                        <motion.div variants={mobileItemVariants}>
                            <Link 
                                to="/cadastro" 
                                className="flex gap-2 items-center border-2 border-transparent bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/20"
                                onClick={() => setMenuOpen(false)}
                            >
                                <UserPlusIcon size={18} /> Cadastre-se
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default NavHeader;