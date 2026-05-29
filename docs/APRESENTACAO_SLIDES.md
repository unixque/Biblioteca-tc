# Biblioteca TC — Conteúdo para slides

**Para Gamma AI:** usa o outline em [`APRESENTACAO_GAMMA_OUTLINE.md`](./APRESENTACAO_GAMMA_OUTLINE.md) (copiar e colar no Gamma → Generate from outline).

Copiar cada secção para um slide no PowerPoint ou Google Slides.  
**Duração sugerida:** 12–15 min + perguntas · **URL:** bibliotecatc.com

---

## Slide 1 — Introdução

### Texto no slide
- **Biblioteca TC**
- Portal digital da biblioteca da **Escola Secundária Tomás Cabreira**
- Catálogo online · requisições · empréstimos · consola administrativa
- *[O teu nome / turma / disciplina]*

### O que dizer (~40 s)
- Apresentação pessoal e do projeto.
- *"Digitalizámos a biblioteca da escola: os alunos gerem empréstimos no telemóvel; a biblioteca deixa de depender só de papel e filas."*

---

## Slide 2 — Problema identificado

### Texto no slide
- Catálogo difícil de consultar **fora** da biblioteca
- Reservas e prazos **pouco claros** para o aluno
- Gestão **manual**: stock, aprovações, multas, lembretes
- **Sem avisos** automáticos (email / app)

### O que dizer (~45 s)
- Situação **antes**: filas, cadernos, "há exemplares?" sem resposta imediata.
- Impacto: tempo perdido, reservas expiradas, multas mal comunicadas.

---

## Slide 3 — Objetivos do projeto

### Texto no slide
- Catálogo e disponibilidade em **tempo real**
- Requisição online: **12 h** para levantar · **15 dias** de empréstimo
- **Painel admin**: aprovar, devolver, multas, acervo, utilizadores
- **Notificações + emails** automáticos
- **6 idiomas** · tema claro/escuro · mobile-friendly

### O que dizer (~30 s)
- Menos erros de stock, aluno sempre informado, staff com visão única.

---

## Slide 4 — Solução proposta

### Texto no slide
- **App web** para alunos + **consola** `/console` para staff
- Fluxo: pesquisar → requisitar → levantar na biblioteca → devolver com **PIN**
- Automação: reservas expiram às **12 h** · lembretes por email
- Multa **5 €** se devolver após a data limite

### Diagrama (opcional no slide)
`Requisitar → Pendente (12h) → Ativo (15 dias) → Devolvido / Multa`

### O que dizer (~45 s)
- A app **complementa** a biblioteca física — não a substitui.
- Quatro passos do fluxo do aluno até à devolução.

---

## Slide 5 — Tecnologias utilizadas

### Texto no slide

| Camada | Tecnologia |
|--------|------------|
| Frontend | React 19, Vite, React Router, Tailwind v4 |
| Backend | Supabase (PostgreSQL, Auth, Storage, RLS) |
| Serverless | Edge Functions (Deno) |
| Email | Resend · templates HTML Heritage Scholar |
| IA | OpenAI gpt-4o-mini (resumos + assistente) |
| Deploy | Site estático + funções no Supabase |

### O que dizer (~45 s)
- Supabase: auth + base de dados + segurança (RLS) num só sítio.
- Resend: emails profissionais (`noreply@bibliotecatc.com`).
- IA ajuda a descobrir livros — não substitui o bibliotecário.

---

## Slide 6 — Arquitetura do sistema

### Texto no slide
- **Browser (React)** ↔ **Supabase** (Auth, DB, Storage)
- **Edge Functions** → Resend (emails) · **pg_cron** (lembretes, newsletter)
- **RPC `request_book`**: reserva atómica (stock correto)
- **RLS**: cada aluno acede só aos seus dados sensíveis
- Chaves secretas **só no servidor** (nunca no frontend)

### O que dizer (~1 min)
- Separar cliente vs servidor.
- Emails de eventos (`send-email`) + cron diário + hook de autenticação.

---

## Slide 7 — Funcionalidades / Demonstração

### Texto no slide — Aluno
- Catálogo: pesquisa, categorias, destaques, 20 livros/página
- Livro: requisitar, avaliações, resumo IA, favoritos
- Empréstimos + lista de desejos · PIN de devolução
- Notificações · definições (idioma, tema) · guia `/docs`
- Login `@agr-tc.pt` ou Google (domínio escola)

### Texto no slide — Admin (`/console`)
- Dashboard · livros · categorias · empréstimos
- Utilizadores · feedback · logs de atividade

### O que dizer (2–3 min)
- Seguir o roteiro em [`APRESENTACAO_DEMO.md`](./APRESENTACAO_DEMO.md).
- Ter screenshots de backup se a rede falhar.

---

## Slide 8 — Testes e resultados

### Texto no slide
- Fluxos testados: requisição → aprovação → devolução · expiração 12 h · multa 5 €
- Emails: templates branded · modo teste com um só destinatário
- Auth: recuperação de password · magic link
- **Resultado:** stock consistente (RPC) · app em produção
- **Limitação:** rate limit de emails Supabase em testes intensivos

### O que dizer (~45 s)
- Cenários reais testados; feedback da biblioteca/colegas se tiveres.
- Aprendizagem: testar cron só com `testEmail`, nunca `{}` em manual.

---

## Slide 9 — Modelo de negócio (opcional)

### Texto no slide
- Projeto **escolar** / serviço interno (sem fins lucrativos)
- Custos: Supabase · Resend · domínio · OpenAI (uso moderado)
- Valor: menos tempo do staff · melhor uso do acervo
- Hipótese futura: licença por escola + formação

### O que dizer (~30 s)
- Ferramenta da escola, não startup.
- Escala possível para outras escolas com o mesmo modelo.

---

## Slide 10 — Futuro e expansão

### Texto no slide
- PWA / app móvel nativa
- QR ou código de barras na devolução
- Horários de levantamento na app
- Estatísticas para a direção
- Testes automatizados (E2E)

### O que dizer (~30 s)
- Escolher 2–3 ideias relevantes para a Tomás Cabreira.

---

## Slide 11 — Conclusão

### Texto no slide
- Problema real → **solução web completa**
- Stack moderna e segura (Supabase + React)
- Regras da escola: **12 h · 15 dias · 5 € · PIN**
- Pronto para a comunidade escolar

### O que dizer (~30 s)
- *"A Biblioteca TC junta o acervo físico da escola à experiência digital que os alunos já esperam."*
- Agradecer professores, colegas e biblioteca.

---

## Slide 12 — Perguntas

### Texto no slide
- **Obrigado**
- Perguntas?
- *[email / contacto opcional]*

### O que dizer
- Ver respostas preparadas em [`APRESENTACAO_QA.md`](./APRESENTACAO_QA.md).

---

## Dicas rápidas
1. Um slide = uma ideia; não ler bullets palavra por palavra.
2. Demo curta > muitos slides técnicos.
3. Contas de teste: aluno + admin + livro com stock.
