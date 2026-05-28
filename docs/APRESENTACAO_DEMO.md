# Roteiro de demonstração — Slide 7

**Tempo:** 2–3 minutos · **Antes de apresentar:** testar rede, login e um livro com `available_qty > 0`.

## Pré-requisitos

| Item | Notas |
|------|--------|
| URL | `https://bibliotecatc.com` ou `npm run dev` local |
| Conta aluno | Email `@agr-tc.pt` (ex. `al12345@agr-tc.pt`) |
| Conta admin | Perfil com `role: admin` em `profiles` |
| Livro de demo | Com stock disponível; anotar título para pesquisa |
| Backup | 3–4 screenshots (catálogo, requisição, empréstimos, consola) |

## Passo a passo

### 1. Landing e login aluno (~30 s)
- Abrir `/` ou `/landing`.
- Mencionar: design Heritage Scholar (bordeaux, tipografia serif).
- **Entrar** → email escolar ou Google (`agr-tc.pt`).
- *Dizer:* "Só alunos da escola; o admin tem consola separada."

### 2. Catálogo e pesquisa (~25 s)
- Barra de pesquisa: escrever título do livro de demo.
- Opcional: filtro por categoria, faixa **Recomendados**.
- *Dizer:* "20 livros por página; stock em tempo real."

### 3. Requisitar livro (~40 s)
- Abrir `/livro/:id`.
- Mostrar: capa, disponibilidade, avaliações, resumo IA (se existir).
- Clicar **Requisitar livro**.
- *Dizer:* "Fica pendente; tem **12 horas** para levantar na biblioteca física. Recebe email e notificação."
- Opcional: favoritos na lista de desejos.

### 4. Os meus empréstimos (~25 s)
- Ir a `/emprestimos` (ou separador na mesma página).
- Mostrar estado **pendente** e **PIN** (4 dígitos para devolução).
- *Dizer:* "O PIN confirma a devolução presencial ao bibliotecário."

### 5. Consola admin (~50 s)
- Terminar sessão aluno OU outro browser / anónimo.
- `/console/entrar` → login admin.
- `/console/emprestimos` → localizar o pedido → **Aprovar**.
- *Dizer:* "Passa a ativo; **due_date** = hoje + **15 dias**; aluno recebe email."
- Opcional: mostrar dashboard (`/console`) com métricas.

### 6. Extra rápido (~20 s) — escolher um
- **Definições:** mudar idioma (PT → EN) e tema escuro.
- **Notificações:** `/notificacoes`.
- **Email:** screenshot do template "Lembrete de devolução" no telemóvel.
- **Assistente IA:** botão flutuante — pergunta "recomenda um livro de filosofia".

## Se algo falhar ao vivo

| Problema | Plano B |
|----------|---------|
| Rede lenta | Screenshots em `docs/` ou pasta local |
| Login falha | Vídeo gravado curto (30 s) do fluxo |
| Sem stock | Outro livro já testado de manhã |
| Rate limit email | Explicar: limite Supabase em testes; produção com SMTP/Resend |

## Checklist antes de subir ao palco

- [ ] Login aluno OK
- [ ] Login admin OK
- [ ] Livro com stock confirmado
- [ ] Pedido pendente de teste limpo (ou usar conta fresca)
- [ ] Screenshots na pasta Downloads
- [ ] Separador do browser: aluno | admin

## Frase de transição para o slide 8

*"Estes fluxos foram testados de ponta a ponta — requisição, aprovação, devolução, multa e emails — com algumas limitações em ambiente de teste que já documentámos."*
