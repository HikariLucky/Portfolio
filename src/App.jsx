import { useState } from 'react'
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp, FaReact, FaNodeJs } from 'react-icons/fa'
import { FaDartLang } from 'react-icons/fa6'

function App() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: '', message: '' })

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                setStatus({ type: 'success', message: 'Mensagem enviada com sucesso!' })
                setFormData({ name: '', email: '', message: '' })
            } else {
                setStatus({ type: 'error', message: data.error || 'Erro ao enviar mensagem' })
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Erro de conexão com o servidor' })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="w-full py-4">
                <nav className="max-w-7xl mx-auto px-4 flex justify-center items-center">
                    <ul className="flex space-x-8 text-lg">
                        <li>
                            <a href="#home" className="relative pb-1 hover:text-blue-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="relative pb-1 hover:text-blue-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#projects" className="relative pb-1 hover:text-blue-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">
                                Projects
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="relative pb-1 hover:text-blue-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="home" className="min-h-screen w-full bg-gray-900 flex items-left justify-start relative overflow-hidden">
                    <div className="absolute top-20 left-20 w-16 h-16 bg-blue-500 rounded-full opacity-60"></div>
                    <div className="absolute top-40 left-60 w-8 h-8 bg-purple-500 rounded-full opacity-50"></div>
                    <div className="absolute bottom-32 left-32 w-24 h-24 bg-cyan-400 rounded-full opacity-40"></div>
                    <div className="absolute top-60 right-40 w-12 h-12 bg-pink-500 rounded-full opacity-50"></div>
                    <div className="absolute bottom-20 right-20 w-20 h-20 bg-green-400 rounded-full opacity-40"></div>
                    <div className="absolute top-32 right-60 w-6 h-6 bg-yellow-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-50 left-80 w-14 h-14 bg-red-500 rounded-full opacity-50"></div>
                    <div className="absolute top-10 right-10 w-10 h-10 bg-indigo-500 rounded-full opacity-45"></div>
                    <div className="absolute bottom-40 right-80 w-18 h-18 bg-orange-400 rounded-full opacity-40"></div>
                    <div className="absolute top-72 left-10 w-4 h-4 bg-teal-400 rounded-full opacity-70"></div>

                    <div className="flex flex-col md:flex-row items-center gap-8 z-10">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80" alt="Profile" className="w-96 h-96 rounded-full object-cover border-4 border-blue-400 shadow-lg ml-40" />
                        <div className="text-center md:text-left md:pl-24 mt-3">
                            <p className="text-3xl mb-2">Olá, meu nome é</p>
                            <h1 className="text-8xl md:text-6xl font-bold text-blue-400">Kauã Oliveira</h1>
                            <p className="text-2xl mt-4 text-gray-300">Desenvolvedor Full Stack</p>
                        </div>
                    </div>
                </section>

                <section id="about" className="min-h-screen w-full bg-gray-100 text-gray-900">
                    <div className="max-w-7xl mx-auto px-4 py-20">
                        <h1 className="text-6xl font-bold mb-4 flex justify-center items-center">About</h1>
                        <div className="w-32 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
                        <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-gray-700">
                            <p>
                                Sou estudante de desenvolvimento de sistemas, apaixonado por tecnologia e por transformar ideias em projetos reais. Gosto de explorar soluções inteligentes, criar coisas do zero e pensar em projetos escaláveis que realmente façam diferença.
                            </p>
                            <p>
                                No meu dia a dia, busco evolução constante — tanto física quanto mental. Também valorizo momentos de reflexão, lendo filosofia, matemática e histórias que expandem minha visão de mundo, especialmente narrativas que exploram identidade e sentimentos.
                            </p>
                            <p>
                                Tenho um lado criativo forte: gosto de imaginar novos projetos, desenvolver ideias fora do comum e questionar padrões. Ao mesmo tempo, busco organização e consistência para transformar planos em realidade.
                            </p>
                            <p>
                                Sou vegetariano e me preocupo com meu estilo de vida, buscando equilíbrio entre saúde, bem-estar e meus objetivos pessoais.
                            </p>
                            <p>
                                Acredito que crescer não é só evoluir tecnicamente, mas também entender a si mesmo. E é exatamente isso que estou construindo, um passo de cada vez.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="projects" className="min-h-screen w-full bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-20">
                        <h1 className="text-6xl font-bold mb-4 flex justify-center items-center">Projects</h1>
                        <div className="w-32 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
                        <div className="grid md:grid-cols-3 gap-8">

                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <div className="text-blue-400 text-4xl mb-2"><FaReact /></div>
                                <h3 className="font-semibold mb-2">Projeto React</h3>
                                <p className="text-gray-300 text-sm mb-4">Descrição do projeto aqui</p>
                                <a href="#" className="text-blue-400 hover:underline text-sm">Ver projeto →</a>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <div className="text-green-400 text-4xl mb-2"><FaNodeJs /></div>
                                <h3 className="font-semibold mb-2">Projeto Node.js</h3>
                                <p className="text-gray-300 text-sm mb-4">API de estoque de produtos desenvolvida como atividade prática avaliativa, aplicando conceitos de desenvolvimento backend e boas práticas de API REST.</p>
                                <a href="https://github.com/HikariLucky/API-de-estoque-de-produtos" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">Ver projeto →</a>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <div className="text-cyan-400 text-4xl mb-2"><FaDartLang /></div>
                                <h3 className="font-semibold mb-2">Outro Projeto</h3>
                                <p className="text-gray-300 text-sm mb-4">A simple and elegant coffee product card UI built with Flutter, focusing on clean design and modern layout.</p>
                                <a href="https://github.com/HikariLucky/Coffee_Card" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">Ver projeto →</a>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg ">
                                <div className="text-cyan-400 text-4xl mb-2"><FaGithub /></div>
                                <h3 className="font-semibold mb-2">Em Breve!</h3>
                                <p className="text-gray-300 text-sm mb-4">Descrição do projeto aqui</p>
                                <a href="#" className="text-blue-400 hover:underline text-sm">Ver projeto →</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="min-h-screen w-full bg-gray-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-20">
                        <h1 className="text-6xl font-bold mb-4 flex justify-center items-center">Contact</h1>
                        <div className="w-32 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>

                        <div className="max-w-2xl mx-auto">
                            <p className="text-xl text-center mb-10 text-gray-300">
                                Tem um projeto em mente? Vamos conversar!
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mb-10">
                                <div className="bg-gray-700 p-6 rounded-lg text-center">
                                    <div className="text-blue-400 text-2xl mb-2 flex justify-center"><FaEnvelope /></div>
                                    <h3 className="font-semibold mb-1">Email</h3>
                                    <p className="text-gray-300">vxhikari_yt16@hotmail.com</p>
                                </div>
                                <div className="bg-gray-700 p-6 rounded-lg text-center">
                                    <div className="text-blue-400 text-2xl mb-2 flex justify-center"><FaLinkedin /></div>
                                    <h3 className="font-semibold mb-1">LinkedIn</h3>
                                    <p className="text-gray-300">in/kauã-oliveira</p>
                                </div>
                                <div className="bg-gray-700 p-6 rounded-lg text-center">
                                    <div className="text-blue-400 text-2xl mb-2 flex justify-center"><FaGithub /></div>
                                    <h3 className="font-semibold mb-1">GitHub</h3>
                                    <p className="text-gray-300">@HikariLucky</p>
                                </div>
                                <div className="bg-gray-700 p-6 rounded-lg text-center">
                                    <div className="text-blue-400 text-2xl mb-2 flex justify-center"><FaWhatsapp /></div>
                                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                                    <p className="text-gray-300">(41) 98777-7497</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Seu nome"
                                    required
                                    className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Seu email"
                                    required
                                    className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Sua mensagem"
                                    required
                                    className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                                {status.message && (
                                    <div className={`p-4 rounded-lg text-center ${status.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                                        {status.message}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
                                >
                                    {loading ? 'Enviando...' : 'Enviar mensagem'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
