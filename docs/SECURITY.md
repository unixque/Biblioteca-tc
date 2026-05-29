# Segurança de chaves API

## O que pode ir no frontend (Vercel)

| Variável | Motivo |
|----------|--------|
| `VITE_SUPABASE_URL` | URL pública do projeto |
| `VITE_SUPABASE_ANON_KEY` | Chave **anon/publishable** — pensada para o browser, protegida por RLS |

## O que NUNCA deve ir no Vercel / `.env` do Vite

| Segredo | Onde configurar |
|---------|-----------------|
| `OPENAI_API_KEY` | Supabase → Edge Functions → Secrets |
| `RESEND_API_KEY` | Supabase secrets |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secrets (auto-injetada nas funções) |
| `SEND_EMAIL_HOOK_SECRET` | Supabase secrets |
| `GOOGLE_CLIENT_SECRET` | Supabase Auth (Google provider), não no React |

## Funções protegidas

- **`ai-chat`** — requer utilizador autenticado (JWT).
- **`book-summary`** — requer utilizador autenticado (JWT); grava `books.ai_summary` via service role.
- **`send-email`** — requer JWT; só pode enviar para o próprio email, exceto admins.

Deploy **com verificação JWT** (sem `--no-verify-jwt`), exceto `auth-send-email`.

## Conta administrador

Não existe password hardcoded no código. Admin = utilizador com `role = 'admin'` em `profiles`.

Ver [ADMIN_SETUP.md](./ADMIN_SETUP.md).

## Se expuseste chaves no Git ou no browser

1. Remover `VITE_OPENAI_API_KEY` do Vercel e do `.env` local.
2. **Revogar e criar nova** chave OpenAI em platform.openai.com.
3. Confirmar que `.env` está no `.gitignore` (já está).
