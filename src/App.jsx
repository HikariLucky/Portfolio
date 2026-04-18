import { useState, useEffect } from 'react'
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp, FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa'
import { FaDartLang } from 'react-icons/fa6'
import emailjs from '@emailjs/browser'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

function App() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    
    // Parallax scroll effect
    const { scrollY } = useScroll()
    const backgroundY = useTransform(scrollY, [0, 1000], [0, 300])
    const textY = useTransform(scrollY, [0, 500], [0, 100])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Smooth scroll function
    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: '', message: '' })

        // Validação dos campos
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: 'Preencha todos os campos' })
            setLoading(false)
            return
        }

        try {
            // EmailJS - envio de email via frontend
            await emailjs.send(
                'service_hbobe6h',      // Service ID
                'template_fpo4bad',     // Template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_email: 'vx.hikari_yt16@hotmail.com'
                },
                'Z5xB_a1BUaZhmNxAV'    // Public Key
            )

            setStatus({ type: 'success', message: 'Mensagem enviada com sucesso!' })
            setFormData({ name: '', email: '', message: '' })
        } catch (error) {
            console.error('Erro ao enviar:', error)
            setStatus({ type: 'error', message: 'Erro ao enviar mensagem. Tente novamente.' })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    }

    const slideInLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    }

    const slideInRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    }

    const scaleOnHover = {
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        transition: { duration: 0.4, ease: 'easeOut' }
    }

    // Skill Bar Component com barras de progresso animadas
    const SkillBar = ({ icon, title, percentage, color }) => {
        return (
            <motion.div 
                className="bg-gray-700 p-6 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="flex items-center gap-3 mb-3">
                    {icon}
                    <h4 className="text-lg font-semibold">{title}</h4>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden">
                    <motion.div 
                        className={`h-full rounded-full ${color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                    />
                </div>
                <p className="text-right text-sm text-gray-400 mt-1">{percentage}%</p>
            </motion.div>
        )
    }

    // Project Card com hover scale + sombra
    const ProjectCard = ({ icon, title, description, href }) => {
        return (
            <motion.div 
                className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer"
                whileHover={scaleOnHover}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="text-blue-400 text-4xl mb-2">{icon}</div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-gray-300 text-sm mb-4">{description}</p>
                <a href={href} className="text-blue-400 hover:underline text-sm">Ver projeto →</a>
            </motion.div>
        )
    }

    // Animated Input com focus suave
    const AnimatedInput = ({ type, name, placeholder, value, onChange, isTextarea = false }) => {
        const baseClasses = "w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        
        const props = {
            type: isTextarea ? undefined : type,
            name,
            value,
            onChange,
            placeholder,
            required: true,
            className: baseClasses
        }

        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {isTextarea ? (
                    <textarea {...props} rows="4" />
                ) : (
                    <input {...props} type={type} />
                )}
            </motion.div>
        )
    }

    // Animated Floating Bubble Component
    const Bubble = ({ size, color, top, left, right, delay, duration }) => {
        const randomX = Math.random() * 100 - 50
        const randomY = Math.random() * 100 - 50
        
        return (
            <motion.div
                className={`absolute rounded-full ${color} opacity-60 blur-sm`}
                style={{ 
                    width: size, 
                    height: size, 
                    top, 
                    left, 
                    right,
                    filter: 'blur(2px)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: 0.6, 
                    scale: 1,
                    x: [0, randomX, 0, -randomX, 0],
                    y: [0, -randomY, 0, randomY, 0],
                }}
                transition={{ 
                    opacity: { duration: 0.5, delay },
                    scale: { duration: 0.5, delay },
                    x: { duration, repeat: Infinity, ease: "easeInOut", delay },
                    y: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay },
                }}
            />
        )
    }

    // NavLink com underline animado
    const NavLink = ({ href, children }) => (
        <motion.a 
            href={href}
            onClick={(e) => {
                e.preventDefault()
                scrollToSection(href.replace('#', ''))
            }}
            className="relative pb-1 text-white hover:text-blue-400 transition-colors"
            whileHover="hover"
            initial="initial"
        >
            {children}
            <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-blue-400"
                initial={{ width: 0 }}
                variants={{
                    initial: { width: 0 },
                    hover: { width: '100%' }
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            />
        </motion.a>
    )

    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500 ${
                    scrolled 
                        ? 'bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-white/10' 
                        : 'bg-gray-900/40 backdrop-blur-lg'
                }`}
            >
                <nav className="max-w-7xl mx-auto px-4 flex justify-center items-center">
                    <ul className="flex space-x-8 text-lg">
                        <li><NavLink href="#home">Home</NavLink></li>
                        <li><NavLink href="#about">About</NavLink></li>
                        <li><NavLink href="#skills">Skills</NavLink></li>
                        <li><NavLink href="#projects">Projects</NavLink></li>
                        <li><NavLink href="#contact">Contact</NavLink></li>
                    </ul>
                </nav>
            </motion.header>

            <main>
                <section id="home" className="min-h-screen w-full bg-gray-900 flex items-left justify-start relative overflow-hidden">
                    {/* Animated Floating Bubbles */}
                    <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
                        <Bubble size={64} color="bg-blue-500" top="10%" left="10%" delay={0} duration={8} />
                        <Bubble size={32} color="bg-purple-500" top="20%" left="30%" delay={1} duration={10} />
                        <Bubble size={96} color="bg-cyan-400" top="60%" left="15%" delay={2} duration={12} />
                        <Bubble size={48} color="bg-pink-500" top="40%" left="70%" delay={0.5} duration={9} />
                        <Bubble size={80} color="bg-green-400" top="70%" right="15%" delay={1.5} duration={11} />
                        <Bubble size={24} color="bg-yellow-400" top="25%" right="35%" delay={2.5} duration={7} />
                        <Bubble size={56} color="bg-red-500" top="55%" left="40%" delay={0.8} duration={13} />
                        <Bubble size={40} color="bg-indigo-500" top="5%" right="20%" delay={1.2} duration={8} />
                        <Bubble size={72} color="bg-orange-400" top="65%" right="40%" delay={3} duration={10} />
                        <Bubble size={16} color="bg-teal-400" top="45%" left="5%" delay={0.3} duration={6} />
                        <Bubble size={48} color="bg-purple-400" top="80%" left="60%" delay={1.8} duration={9} />
                        <Bubble size={36} color="bg-blue-400" top="15%" right="50%" delay={2.2} duration={11} />
                    </motion.div>

                    {/* Hero Content com Fade In + Slide Up */}
                    <div className="flex flex-col md:flex-row items-center gap-8 z-10">
                        <motion.img 
                            src="/profile.jpeg" 
                            alt="Profile" 
                            className="w-96 h-96 rounded-full object-cover border-4 border-blue-400 shadow-lg ml-40"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        />
                        <motion.div 
                            className="text-center md:text-left md:pl-24 mt-3"
                            style={{ y: textY }}
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                        >
                            <motion.p 
                                className="text-3xl mb-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                Olá, meu nome é
                            </motion.p>
                            <motion.h1 
                                className="text-8xl md:text-6xl font-bold text-blue-400"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                            >
                                Kauã Oliveira
                            </motion.h1>
                            <motion.p 
                                className="text-2xl mt-4 text-gray-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.1 }}
                            >
                                Desenvolvedor Full Stack
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* About Section - Revelação progressiva ao scroll */}
                <section id="about" className="min-h-screen w-full bg-gray-100 text-gray-900">
                    <motion.div 
                        className="max-w-7xl mx-auto px-4 py-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                    >
                        <motion.h1 
                            className="text-6xl font-bold mb-4 flex justify-center items-center"
                            variants={fadeInUp}
                        >
                            About
                        </motion.h1>
                        <motion.div 
                            className="w-32 h-1 bg-blue-500 mx-auto mb-8 rounded-full"
                            variants={fadeInUp}
                        ></motion.div>
                        <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-gray-700">
                            <motion.p variants={fadeInUp}>
                                Sou estudante de desenvolvimento de sistemas, apaixonado por tecnologia e por transformar ideias em projetos reais. Gosto de explorar soluções inteligentes, criar coisas do zero e pensar em projetos escaláveis que realmente façam diferença.
                            </motion.p>
                            <motion.p variants={fadeInUp}>
                                No meu dia a dia, busco evolução constante — tanto física quanto mental. Também valorizo momentos de reflexão, lendo filosofia, matemática e histórias que expandem minha visão de mundo, especialmente narrativas que exploram identidade e sentimentos.
                            </motion.p>
                            <motion.p variants={fadeInUp}>
                                Tenho um lado criativo forte: gosto de imaginar novos projetos, desenvolver ideias fora do comum e questionar padrões. Ao mesmo tempo, busco organização e consistência para transformar planos em realidade.
                            </motion.p>
                            <motion.p variants={fadeInUp}>
                                Sou vegetariano e me preocupo com meu estilo de vida, buscando equilíbrio entre saúde, bem-estar e meus objetivos pessoais.
                            </motion.p>
                            <motion.p variants={fadeInUp}>
                                Acredito que crescer não é só evoluir tecnicamente, mas também entender a si mesmo. E é exatamente isso que estou construindo, um passo de cada vez.
                            </motion.p>
                        </div>
                    </motion.div>
                </section>

                {/* Projects Section - Cards com hover scale + sombra */}
                <section id="projects" className="min-h-screen w-full bg-gray-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-20">
                        <motion.h1 
                            className="text-6xl font-bold mb-4 flex justify-center items-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            Projects
                        </motion.h1>
                        <motion.div 
                            className="w-32 h-1 bg-blue-500 mx-auto mb-8 rounded-full"
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        ></motion.div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <ProjectCard 
                                icon={<FaReact />} 
                                title="Projeto React" 
                                description="Descrição do projeto aqui"
                                href="#"
                            />
                            <ProjectCard 
                                icon={<FaNodeJs />} 
                                title="Projeto Node.js" 
                                description="API de estoque de produtos desenvolvida como atividade prática avaliativa, aplicando conceitos de desenvolvimento backend e boas práticas de API REST."
                                href="https://github.com/HikariLucky/API-de-estoque-de-produtos"
                            />
                            <ProjectCard 
                                icon={<FaDartLang />} 
                                title="Outro Projeto" 
                                description="A simple and elegant coffee product card UI built with Flutter, focusing on clean design and modern layout."
                                href="https://github.com/HikariLucky/Coffee_Card"
                            />
                            <ProjectCard 
                                icon={<FaGithub />} 
                                title="Em Breve!" 
                                description="Descrição do projeto aqui"
                                href="#"
                            />
                        </div>
                    </div>
                </section>

                {/* Skills Section - Barras de progresso animadas */}
                <section id="skills" className="min-h-screen w-full bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-20">
                        <motion.h1 
                            className="text-6xl font-bold mb-4 flex justify-center items-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            Skills
                        </motion.h1>
                        <motion.div 
                            className="w-32 h-1 bg-blue-500 mx-auto mb-8 rounded-full"
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        ></motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SkillBar 
                                icon={<FaReact className='text-blue-400 text-2xl'/>} 
                                title="React + JavaScript" 
                                percentage={85}
                                color="bg-blue-500"
                            />
                            <SkillBar 
                                icon={<FaPython className='text-yellow-400 text-2xl'/>} 
                                title="Python" 
                                percentage={75}
                                color="bg-yellow-500"
                            />
                            <SkillBar 
                                icon={<FaNodeJs className='text-green-400 text-2xl'/>} 
                                title="Node.js" 
                                percentage={80}
                                color="bg-green-500"
                            />
                            <SkillBar 
                                icon={<FaDatabase className='text-red-400 text-2xl'/>} 
                                title="MySQL" 
                                percentage={70}
                                color="bg-red-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Section - Input focus com transição suave */}
                <section id="contact" className="min-h-screen w-full bg-gray-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-20">
                        <motion.h1 
                            className="text-6xl font-bold mb-4 flex justify-center items-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            Contact
                        </motion.h1>
                        <motion.div 
                            className="w-32 h-1 bg-blue-500 mx-auto mb-8 rounded-full"
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        ></motion.div>

                        <div className="max-w-2xl mx-auto">
                            <motion.p 
                                className="text-xl text-center mb-10 text-gray-300"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Tem um projeto em mente? Vamos conversar!
                            </motion.p>

                            <div className="grid md:grid-cols-2 gap-6 mb-10">
                                <motion.div 
                                    className="bg-gray-700 p-6 rounded-lg text-center"
                                    whileHover={scaleOnHover}
                                >
                                    <div className="text-blue-400 text-2xl mb-2 flex justify-center"><FaEnvelope /></div>
                                    <h3 className="font-semibold mb-1">Email</h3>
                                    <p className="text-gray-300">vxhikari_yt16@hotmail.com</p>
                                </motion.div>
                                <motion.div 
                                    className="bg-gray-700 p-6 rounded-lg text-center"
                                    whileHover={scaleOnHover}
                                >
                                    <div className="text-blue-400 text-2xl mb-2 flex justify-center"><FaLinkedin /></div>
                                    <h3 className="font-semibold mb-1">LinkedIn</h3>
                                    <p className="text-gray-300">in/kauã-oliveira</p>
                                </motion.div>
                                <motion.div 
                                    className="bg-gray-700 p-6 rounded-lg text-center"
                                    whileHover={scaleOnHover}
                                >
                                    <div className="text-blue-400 text-2xl mb-2 flex justify-center"><FaGithub /></div>
                                    <h3 className="font-semibold mb-1">GitHub</h3>
                                    <p className="text-gray-300">@HikariLucky</p>
                                </motion.div>
                                <motion.div 
                                    className="bg-gray-700 p-6 rounded-lg text-center"
                                    whileHover={scaleOnHover}
                                >
                                    <div className="text-blue-400 text-2xl mb-2 flex justify-center"><FaWhatsapp /></div>
                                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                                    <p className="text-gray-300">(41) 98777-7497</p>
                                </motion.div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <AnimatedInput
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Seu nome"
                                />
                                <AnimatedInput
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Seu email"
                                />
                                <AnimatedInput
                                    isTextarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Sua mensagem"
                                />
                                
                                <AnimatePresence>
                                    {status.message && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className={`p-4 rounded-lg text-center ${status.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
                                        >
                                            {status.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
                                    whileHover={!loading ? { scale: 1.02 } : {}}
                                    whileTap={!loading ? { scale: 0.98 } : {}}
                                    transition={{ duration: 0.2 }}
                                >
                                    {loading ? 'Enviando...' : 'Enviar mensagem'}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
