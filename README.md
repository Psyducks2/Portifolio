# Portfólio - Luis Roberto

Portfólio profissional desenvolvido com React, HTML e CSS puro.

## 🚀 Tecnologias

- React 18
- Vite
- CSS Puro
- EmailJS (para envio de emails)
- Responsive Design

## 📦 Instalação

```bash
npm install
```

## 🔧 Configuração do EmailJS

Para que o formulário de contato funcione, é necessário configurar o EmailJS:

1. **Crie uma conta no EmailJS:**
   - Acesse https://www.emailjs.com/
   - Crie uma conta gratuita (200 emails/mês)

2. **Configure o Email Service:**
   - Vá em "Email Services"
   - Adicione um serviço (Gmail, Outlook, etc.)
   - Siga as instruções para conectar sua conta de email

3. **Crie um Email Template:**
   - Vá em "Email Templates"
   - Crie um novo template
   - Configure os campos:
     - `{{from_name}}` - Nome do remetente
     - `{{from_email}}` - Email do remetente
     - `{{message}}` - Mensagem
   - **To Email:** linsroberto2016@gmail.com
   - **From Name:** {{from_name}}
   - **Reply To:** {{from_email}}
   - **Subject:** Nova mensagem do portfólio
   - **Content:** 
     ```
     Nome: {{from_name}}
     Email: {{from_email}}
     
     Mensagem:
     {{message}}
     ```

4. **Obtenha suas credenciais:**
   - **Service ID:** Encontrado em "Email Services"
   - **Template ID:** Encontrado em "Email Templates"
   - **Public Key:** Encontrado em "Account" > "General" > "API Keys"

5. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env`
   - Preencha com suas credenciais do EmailJS:
   ```env
   VITE_EMAILJS_SERVICE_ID=seu_service_id
   VITE_EMAILJS_TEMPLATE_ID=seu_template_id
   VITE_EMAILJS_PUBLIC_KEY=sua_public_key
   ```

## 🛠️ Desenvolvimento

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📄 Licença

Este projeto foi desenvolvido por Luis Roberto.
