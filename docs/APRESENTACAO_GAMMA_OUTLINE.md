# Biblioteca TC
Portal digital da biblioteca · Escola Secundária Tomás Cabreira · bibliotecatc.com

# Introdução
- Biblioteca TC
- Portal digital da biblioteca da Escola Secundária Tomás Cabreira
- Catálogo online, requisições, empréstimos e consola administrativa
- [Nome / turma / disciplina]

# O problema
- Catálogo difícil de consultar fora da biblioteca
- Reservas e prazos pouco claros para o aluno
- Gestão manual: stock, aprovações, multas e lembretes
- Sem avisos automáticos por email ou na aplicação

# Objetivos
- Catálogo e disponibilidade em tempo real
- Requisição online: 12 h para levantar · 15 dias de empréstimo
- Painel admin: aprovar, devolver, multas, acervo e utilizadores
- Notificações e emails automáticos
- 6 idiomas, tema claro/escuro, adaptada a telemóvel

# A solução
- App web para alunos + consola `/console` para staff
- Pesquisar → requisitar → levantar na biblioteca → devolver com PIN
- Reservas expiram ao fim de 12 horas
- Lembretes de devolução por email
- Multa de 5 € após a data limite

# Tecnologias
- Frontend: React 19, Vite, React Router, Tailwind v4
- Backend: Supabase (PostgreSQL, Auth, Storage, RLS)
- Serverless: Edge Functions (Deno)
- Email: Resend
- IA: OpenAI gpt-4o-mini
- Deploy: site estático + Supabase

# Arquitetura
- Browser (React) ↔ Supabase (Auth, DB, Storage)
- Edge Functions → Resend
- pg_cron: lembretes, newsletter, recomendações
- RPC `request_book`: reserva atómica
- RLS por utilizador
- Segredos só no servidor

# Funcionalidades
- Catálogo: pesquisa, categorias, destaques
- Livro: requisitar, avaliações, resumo IA, favoritos
- Empréstimos, lista de desejos, PIN de devolução
- Notificações, definições, guia da biblioteca
- Login `@agr-tc.pt` ou Google
- Admin: dashboard, livros, categorias, empréstimos, utilizadores, feedback, logs

# Testes e resultados
- Fluxos: requisição → aprovação → devolução
- Regras: 12 h, multa 5 €, PIN
- Emails com marca BibliotecaTC
- Stock consistente (RPC)
- App em produção

# Modelo de negócio
- Projeto escolar, sem fins lucrativos
- Custos: Supabase, Resend, domínio, OpenAI
- Poupança de tempo e melhor uso do acervo
- Possível licença por escola no futuro

# Futuro
- App móvel (PWA ou nativa)
- QR code na devolução
- Horários de levantamento na app
- Estatísticas para a direção
- Testes automatizados (E2E)

# Conclusão
- Problema real → solução web completa
- React + Supabase
- Regras: 12 h · 15 dias · 5 € · PIN
- Pronto para a comunidade escolar

# Perguntas
- Obrigado
- Perguntas?
