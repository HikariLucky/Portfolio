# Portfolio - Kauã Oliveira

Portfolio pessoal desenvolvido com React, Tailwind CSS e Node.js. Apresenta projetos, habilidades e um formulário de contato funcional.

## Tecnologias

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Ícones**: React Icons (Fa, Fa6)
- **Backend**: Node.js + Express
- **Email**: Nodemailer (Gmail SMTP)

## Estrutura

```
Portfolio/
├── src/
│   └── App.jsx          # Componente principal com todas as sections
├── server.js            # API para envio de emails
├── package.json
└── README.md
```

## Sections

- **Home** - Apresentação com imagem de perfil e bolinhas decorativas
- **About** - Sobre mim com divisor e texto formatado
- **Projects** - Cards de projetos com ícones e links para GitHub
- **Contact** - Cards de contato + formulário com envio de email

## Como Rodar

### Frontend
```bash
npm install
npm run dev
```
Acesse: http://localhost:5173

### Backend (Envio de Emails)
```bash
npm install
node server.js
```
Servidor roda na porta 3001

### Configuração do Email

No `server.js`, configure suas credenciais Gmail:

```javascript
auth: {
    user: 'seu-email@gmail.com',
    pass: 'SUA_SENHA_DE_APP_16_CARACTERES'
}
```

**Importante**: Use uma [Senha de App](https://myaccount.google.com/apppasswords) do Gmail (requer 2FA ativado).

## Scripts

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build para produção
- `npm run preview` - Preview da build

## Contato

- Email: vx.hikari_yt16@hotmail.com
- LinkedIn: [in/kauã-oliveira](https://linkedin.com/in/kauã-oliveira)
- GitHub: [@HikariLucky](https://github.com/HikariLucky)
- WhatsApp: (41) 98777-7497
