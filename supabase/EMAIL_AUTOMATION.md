# How automatic emails work

## Two paths

### A) App events → `send-email`

```
User/Admin action → notifyUser() → notifications table + invoke send-email → Resend
```

Triggered when:
- Student requests a book
- Admin approves, rejects, or marks returned

### B) Scheduled → cron Edge Functions

```
pg_cron (SQL) → net.http_post → Edge Function → Supabase DB + Resend
```

| Function | Cron (UTC) | Behavior |
|----------|------------|----------|
| `send-due-reminders` | `0 8 * * *` | Active loans with `due_date` tomorrow → email + `notifications` row |
| `send-newsletter` | `20 8 * * 1-5` | All `profiles` with `role = aluno`, respects `newsletter_preferences` |
| `send-weekly-picks` | `0 9 * * 1` | Random featured available book → email all alunos |

Sender for all: **`BibliotecaTC <noreply@bibliotecatc.com>`** (see `_shared/resend.ts`).

## Your next steps

1. **Confirm Resend** — domain `bibliotecatc.com` verified; `RESEND_API_KEY` in Supabase secrets.
2. **Test manually** — Dashboard → Edge Functions → Invoke with body `{ "testEmail": "your@email.com" }` (see below). **Never use `{}` for a manual test** — that emails every student.

### Safe manual test body

```json
{ "testEmail": "you@agr-tc.pt" }
```

Use the email on your `profiles` row (`role = aluno`). `send-due-reminders` sends a sample email if you have no loan due tomorrow.

For a single arbitrary template, use `send-email` instead:

```json
{ "to": "you@agr-tc.pt", "template": "weekly_pick", "data": { "pickTitle": "Test", "pickAuthor": "Autor" } }
```
3. **Enable cron** — run [`setup_email_cron.sql`](./setup_email_cron.sql) after replacing `YOUR_SERVICE_ROLE_KEY`.
4. **Verify cron** — `SELECT jobname, schedule FROM cron.job WHERE jobname LIKE 'biblioteca-%';`

## Deployed (project `ylcoynhihpvzttnuyaft`)

- `send-email` (no JWT verify — called from browser)
- `send-due-reminders`
- `send-newsletter`
- `send-weekly-picks`

Functions dashboard: https://supabase.com/dashboard/project/ylcoynhihpvzttnuyaft/functions
