# Perguntas frequentes — Slide 12

Respostas curtas (20–40 s cada). Adapta com o teu nome e contexto da escola.

---

## Porque Supabase e não Firebase?

- Precisávamos de **PostgreSQL relacional** (livros, empréstimos, FKs, transações).
- **RLS** no Postgres controla quem vê o quê por linha.
- Supabase junta Auth, API, Storage e funções — menos peças soltas.
- Firebase/Firestore seria reescrever o modelo e as regras; o investimento já está no Supabase.

---

## É seguro?

- **Supabase Auth** com JWT; rotas protegidas no React.
- **RLS** na base de dados: alunos não acedem a dados de outros.
- Operações críticas de stock na RPC **`request_book`** (atómica no servidor).
- Chaves **Resend** e **OpenAI** sensíveis só em **Edge Functions**, não no `.env` público do Vite.
- Emails de autenticação via **hook** assinado (webhook secret).

---

## Funciona offline?

- **Não.** É uma aplicação web; precisa de internet para catálogo, auth e empréstimos.
- O catálogo usa cache no browser (sessionStorage, ~5 min) para navegação mais rápida, mas não substitui o servidor.

---

## Quantos utilizadores aguenta?

- Para uma escola secundária (**centenas** de alunos), o plano Supabase é suficiente.
- A arquitetura escala no cloud; o gargalo típico seria uso abusivo de IA ou emails, não o catálogo em si.

---

## Quanto custa manter?

- **Supabase:** free tier ou Pro conforme tráfego.
- **Resend:** free tier para volumes escolares; domínio `bibliotecatc.com` verificado.
- **OpenAI:** pay-per-use; resumos e chat com modelo pequeno (`gpt-4o-mini`).
- **Domínio + hosting** do site estático (ex. Vercel/Netlify, muitas vezes grátis).
- Projeto **sem fins lucrativos** para a escola — custo operacional baixo.

---

## Porque emails com rate limit em testes?

- O **Supabase Auth** limita emails de teste (password reset, magic link) no free tier.
- Em produção: **Resend** + hook/SMTP e limites ajustados no dashboard.
- Os cron jobs de newsletter têm modo **`testEmail`** para não enviar a todos os alunos por engano.

---

## A IA substitui o bibliotecário?

- **Não.** Resumos e chat **recomendam** obras do catálogo; aprovação e devolução são **humanas** (admin).
- A IA é opcional; a app funciona sem `OPENAI_API_KEY`.

---

## Como garantem que dois alunos não requisitam o último exemplar?

- A função **`request_book`** no Postgres decrementa stock e cria o empréstimo na **mesma transação**.
- O frontend não altera `available_qty` diretamente — evita race conditions.

---

## Podem usar noutra escola?

- Sim, em teoria: novo projeto Supabase, mesmo código, regras e branding adaptados.
- Modelo hipotético: licença + formação por escola (slide modelo de negócio).

---

## O que acontece se o aluno não levantar o livro em 12 horas?

- O pedido passa a **rejeitado** e o stock **volta** ao catálogo (lógica na consola / cron).
- O aluno é informado na app.

---

## Multa de 5 € — como funciona?

- Na **devolução**, se `returned_at` > `due_date`, o sistema regista **`fine_amount = 5`**.
- O pagamento é **presencial** na biblioteca; a app regista e notifica.

---

## Frases de fecho se não houver perguntas

- *"Estou disponível para mostrar a consola ou o código depois da apresentação."*
- *"A documentação técnica está no repositório: Doc.md e Summary.md."*
