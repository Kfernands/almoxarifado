# Sistema de Almoxarifado — Backend + Frontend

Projeto já integrado com **FastAPI (backend)** e **React + Vite + TypeScript + Tailwind (frontend)**.

## 🐍 Backend (FastAPI)

### 1. Entrar na pasta

```bash
cd backend
```

### 2. Criar e ativar venv (opcional, mas recomendado)

**Windows (PowerShell):**

```bash
rm -r venv
python -m venv venv
.\venv\Scripts\activate
pip install --upgrade pip
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

### 4. Rodar o servidor

```bash
uvicorn app.main:app --reload
```

O backend vai subir em: `http://127.0.0.1:8000`

Rotas principais:

- `GET /produtos`
- `POST /produtos`
- `PUT /produtos/{id}`
- `DELETE /produtos/{id}`

- `GET /movimentacoes`
- `POST /movimentacoes`
- `PUT /movimentacoes/{id}`
- `DELETE /movimentacoes/{id}`

- `GET /requisicoes`
- `POST /requisicoes`
- `PUT /requisicoes/{id}`
- `DELETE /requisicoes/{id}`

---

## ⚛️ Frontend (React + Vite + TS + Tailwind)

### 1. Entrar na pasta

```bash
cd frontend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar o frontend

```bash
npm run dev
```

O frontend vai subir em: `http://127.0.0.1:5173`

> O frontend já está configurado para consumir diretamente a API em `http://127.0.0.1:8000` usando o arquivo `src/api/apiClient.ts`.

---

## ✅ Fluxo para usar sempre

1. Abrir dois terminais no VS Code.
2. No primeiro terminal:

```bash
cd backend
uvicorn app.main:app --reload
```

3. No segundo terminal:

```bash
cd frontend
npm run dev
```

Pronto: sistema de almoxarifado rodando, com dashboard, produtos, movimentações e requisições.
