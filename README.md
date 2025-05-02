# Artefact_Desafio
Repositório com a solução do desafio do PS da Artefact - Estágio Desenvolvimento Fullstack.

---

# Task Manager App

Aplicação simples de gerenciamento de tarefas desenvolvida como parte de um desafio técnico. Construída com **Next.js 15**, **tRPC**, **React Query** e **Zod**.

## 🚀 Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [React Query (TanStack)](https://tanstack.com/query/latest)
- [Zod](https://zod.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hot Toast](https://react-hot-toast.com/)

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

## 🔧 Funcionalidades

- [x] Criar nova tarefa
- [x] Listar tarefas
- [x] Editar tarefa existente
- [x] Excluir tarefa
- [x] Validações no frontend e backend
- [x] Mensagens de feedback com `react-hot-toast`
- [x] Integração completa via tRPC (API e frontend tipados)
- [x] Estrutura pronta para SSR ou expansão

## 🗂️ Estrutura de Pastas

```
src/
├── app/              # Páginas com roteamento (App Router)
│   ├── tasks/        # Listagem, criação e edição de tarefas
│   └── api/          # Endpoints tRPC (com route.ts)
├── server/           # Routers tRPC e lógica de backend
│   └── api/
├── trpc/             # Cliente tRPC React para frontend
```

## ✍️ Considerações

- A persistência das tarefas é feita **em memória**, como requisitado (sem banco de dados).
- Toda a comunicação entre frontend e backend é feita com tRPC, mantendo **tipagem de ponta a ponta**.
- O foco foi criar um sistema funcional, validado, e fácil de manter/entender.

## ✅ Extras

- O sistema está pronto para receber recursos como:
  - Paginação (infinite scroll)
  - Autenticação
  - SSR com cache e hidratação de dados


