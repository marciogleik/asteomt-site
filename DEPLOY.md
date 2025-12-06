# Deploy ASTEO-MT - Hostinger + Railway

## Resumo

| Componente | Onde hospedar | URL |
|------------|---------------|-----|
| Frontend (React) | Hostinger (public_html) | https://asteomt.com.br |
| API (NestJS) | Railway (gratuito) | https://asteomt-api.up.railway.app |
| Banco de dados | Supabase (já configurado) | - |

---

## PASSO 1: Deploy da API no Railway

### 1.1 Criar conta no Railway
1. Acesse https://railway.app
2. Clique em "Start a New Project"
3. Faça login com GitHub

### 1.2 Criar novo projeto
1. Clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. Autorize o Railway a acessar seus repositórios
4. Selecione o repositório do ASTEOMT

### 1.3 Configurar o serviço
1. Após conectar, clique no serviço criado
2. Vá em "Settings" → "Root Directory"
3. Digite: `asteomt-api`
4. Clique em "Apply"

### 1.4 Configurar variáveis de ambiente
Vá em "Variables" e adicione:

```
DATABASE_URL=postgresql://postgres.xxxx:senha@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
JWT_SECRET=sua-chave-secreta-muito-segura-aqui
FRONTEND_URL=https://asteomt.com.br
PORT=3000
```

### 1.5 Deploy
- O Railway fará o deploy automaticamente
- Aguarde o build terminar (2-3 minutos)
- Copie a URL gerada (ex: `https://asteomt-api-production.up.railway.app`)

---

## PASSO 2: Atualizar Frontend com URL da API

### 2.1 Editar configuração
Edite o arquivo `asteomt-web/.env.production`:

```env
VITE_API_URL=https://SUA-URL-DO-RAILWAY.up.railway.app
```

### 2.2 Refazer o build
```bash
cd asteomt-web
npm run build
cp public/.htaccess dist/
```

---

## PASSO 3: Upload do Frontend na Hostinger

### 3.1 Acessar Gerenciador de Arquivos
1. Entre no hPanel da Hostinger
2. Vá em "Gerenciador de Arquivos"
3. Navegue até `public_html`

### 3.2 Limpar pasta
- Delete todo o conteúdo existente em `public_html`

### 3.3 Fazer upload
1. Clique em "Upload"
2. Selecione **todos os arquivos** da pasta `asteomt-web/dist/`:
   - `.htaccess`
   - `index.html`
   - `vite.svg`
   - Pasta `assets/` (com todos os arquivos dentro)

### 3.4 Verificar estrutura
```
public_html/
├── .htaccess
├── index.html
├── vite.svg
└── assets/
    ├── index-xxxxx.css
    ├── index-xxxxx.js
    ├── vendor-xxxxx.js
    ├── logo-asteomt-xxxxx.png
    ├── leonardo-ribeiro-xxxxx.jpg
    └── audiencia-x-xxxxx.jpg
```

---

## PASSO 4: Configurar SSL na Hostinger

1. No hPanel, vá em "SSL"
2. Ative o SSL gratuito para seu domínio
3. Aguarde a propagação (pode levar alguns minutos)

---

## PASSO 5: Testar

1. Acesse https://asteomt.com.br
2. Verifique se a página carrega
3. Teste o login com um usuário
4. Verifique o console (F12) para erros

---

## Solução de Problemas

### Erro de CORS
- Verifique se `FRONTEND_URL` no Railway está correto
- Deve ser exatamente `https://asteomt.com.br` (sem barra no final)

### Página em branco
- Verifique se o `.htaccess` foi enviado
- Limpe o cache do navegador

### Erro 404 ao navegar
- O `.htaccess` não está funcionando
- Verifique se o mod_rewrite está ativo na Hostinger

### Erro de login
- Verifique os logs no Railway (aba "Logs")
- Confirme que `DATABASE_URL` está correta

---

## Variáveis de Ambiente - Resumo

### Railway (API)
```
DATABASE_URL=postgresql://...
JWT_SECRET=chave-secreta
FRONTEND_URL=https://asteomt.com.br
PORT=3000
```

### Frontend (.env.production)
```
VITE_API_URL=https://sua-api.up.railway.app
```
