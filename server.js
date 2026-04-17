import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// IMPORTANTE: Use SENHA DE APP do Gmail, não sua senha normal!
// 1. Ative autenticação de 2 fatores: https://myaccount.google.com/signinoptions/two-step-verification
// 2. Gere senha de app: https://myaccount.google.com/apppasswords
// 3. Substitua abaixo pela senha de app (16 caracteres)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'kauaojulio10@gmail.com',
        pass: process.env.EMAIL_PASS || 'nqij amro jhlr kakg'
    }
})

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    try {
        await transporter.sendMail({
            from: email,
            to: 'vx.hikari_yt16@hotmail.com',
            subject: `Nova mensagem de ${name}`,
            text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
            html: `
                <h2>Nova mensagem do portfolio</h2>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${message}</p>
            `
        })

        res.json({ success: true, message: 'Mensagem enviada com sucesso!' })
    } catch (error) {
        console.error('Erro ao enviar email:', error)
        res.status(500).json({ error: 'Erro ao enviar mensagem' })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

export default app
