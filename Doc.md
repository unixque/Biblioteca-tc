# Biblioteca TC — Descrição do Produto

**Biblioteca TC** é o portal digital da biblioteca da Escola Secundária Tomás Cabreira. Permite aos alunos explorar o catálogo, requisitar livros e acompanhar empréstimos; aos administradores, gerir o acervo, aprovar pedidos e monitorizar a atividade da biblioteca.

O design segue o sistema **Heritage Scholar**: fundo tipo papel envelhecido, tipografia serifada nos títulos e cor de destaque bordeaux (`#631D1D`).

---

## Público e acesso

| Perfil | Como entra | O que pode fazer |
|--------|------------|------------------|
| **Visitante** | Sem conta | Ver landing, documentação pública, pré-visualizar o catálogo após login |
| **Aluno** | Registo com email `@agr-tc.pt` (ex.: `al12345@agr-tc.pt`) ou Google OAuth (domínio escola) | Catálogo, requisições, empréstimos, avaliações, definições, notificações |
| **Administrador** | Conta com `role: admin` em `profiles` | Tudo o que o aluno tem + consola em `/console` |

---

## Mapa de páginas

### Páginas públicas (sem barra lateral da app)

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | **Landing** ou **Início** | Visitantes veem a landing (hero com vídeo, funcionalidades, secção “Sobre” com slideshow, CTA para registo). Utilizadores autenticados veem o catálogo dentro do layout da app. |
| `/landing` | **Landing** | Versão marketing da página inicial. |
| `/entrar`, `/login` | **Entrar** | Login com email/password ou Google. |
| `/registar`, `/signup` | **Registar** | Criação de conta (email escolar obrigatório). |
| `/recuperar-password` | **Recuperar password** | Fluxo de recuperação Supabase Auth. |
| `/acesso-link` | **Magic link** | Entrada por link mágico de email. |
| `/console/entrar` | **Login admin** | Entrada na consola (requer perfil admin). |

### Área do aluno (layout com barra superior + navegação)

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` ou `/catalogo` | **Catálogo / Início** | Secção **Recomendados** (livros em destaque, scroll horizontal) e **Catálogo** com filtros por categoria, pesquisa (`?q=`), grelha 5×4 no desktop (20 livros por página) e paginação numerada no rodapé. |
| `/livro/:id` | **Detalhe do livro** | Capa, metadados (ISBN, editora, ano), disponibilidade, botão **Requisitar livro**, resumo/descrição (incl. resumo IA opcional), avaliações por estrelas e comentários. |
| `/emprestimos` | **Os meus empréstimos** | Histórico de requisições (pendente, ativo, devolvido, rejeitado), datas de vencimento, aviso de multa, PIN de devolução (4 dígitos derivados do pedido). Requer login. |
| `/definicoes` | **Definições** | Nome, idioma (PT/EN/ES/FR/DE/NL), tema claro/escuro, feedback, terminar sessão. |
| `/notificacoes` | **Notificações** | Lista de avisos in-app (empréstimos, reservas, etc.). |
| `/docs` | **Guia da biblioteca** | Regras oficiais: requisição, janela de 12 h, PIN, 14 dias de empréstimo, multas, IA, feedback. |

### Consola de administração (`/console/*`)

| Rota | Página | Descrição |
|------|--------|-----------|
| `/console` | **Dashboard** | Métricas (total de livros, empréstimos ativos, pendentes, em atraso) e atividade recente. |
| `/console/livros` | **Gerir livros** | Listagem, pesquisa, filtro por categoria, destacar obra, eliminar. |
| `/console/livros/novo` | **Novo livro** | Formulário de criação com upload de capa. |
| `/console/livros/editar/:id` | **Editar livro** | Atualização de metadados e imagem. |
| `/console/categorias` | **Categorias** | CRUD e reordenação (`display_order`) do catálogo. |
| `/console/emprestimos` | **Empréstimos** | Aprovar, rejeitar, marcar devolvido; filtros por estado; lembretes por email; expiração automática de reservas pendentes (>12 h). |
| `/console/utilizadores` | **Utilizadores** | Gestão de perfis e papéis. |
| `/console/feedback` | **Feedback** | Mensagens enviadas pelos alunos nas Definições. |

---

## Fluxos principais (regras de negócio)

### 1. Requisitar um livro

1. O aluno abre o detalhe do livro e clica em **Requisitar livro** (se houver stock e ainda não tiver pedido pendente/ativo para esse livro).
2. O pedido fica **pendente** e o stock disponível desce na hora (função `request_book` no Supabase).
3. O aluno recebe notificação in-app e email: tem **12 horas** para levantar o livro na biblioteca física.
4. Se não for levantado a tempo, a reserva passa a **rejeitada** e o stock é reposto (ver `Summary.md`).

### 2. Aprovação e empréstimo

1. Na consola, o admin **aprova** o pedido → estado **ativo**, `due_date` = hoje + **14 dias**.
2. O aluno é notificado por email e na app.
3. Na devolução, o admin marca **devolvido** → stock reposto; se passou a data limite, aplica-se **multa de 5,00 €** (`fine_amount`).

### 3. PIN de devolução

Associado ao pedido; o aluno consulta os **4 últimos dígitos** do timestamp de criação em **Os meus empréstimos** e entrega-o ao administrador na devolução física.

### 4. Catálogo e descoberta

- Pesquisa por título/autor na barra superior (`?q=`).
- Filtros por categoria (chips).
- Livros **em destaque** na faixa Recomendados.
- Paginação: **20 livros por página** (5 colunas × 4 linhas em ecrãs grandes).

### 5. Avaliações e IA

- Cada aluno pode deixar **uma avaliação** (1–5 estrelas + comentário opcional) por livro.
- Opcionalmente, um resumo **gerado por IA** (OpenAI) pode ser criado a partir do título/autor e guardado no livro.

### 6. Feedback e suporte

Em **Definições**, o aluno envia texto para a tabela `feedback`, visível na consola em **Feedback**.

---

## Idiomas

A interface está disponível em **português**, **inglês**, **espanhol**, **francês**, **alemão** e **neerlandês**. O idioma guarda-se em `localStorage`.

---

## Ligação à documentação técnica

Para base de dados, funções Supabase, emails, cache e variáveis de ambiente, ver **[Summary.md](./Summary.md)**.
