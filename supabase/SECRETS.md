# Supabase Edge Function Secrets

Set in **Supabase Dashboard → Project Settings → Edge Functions → Secrets** (or CLI: `npx supabase secrets set KEY=value`).

| Secret | Required by | Description |
|--------|-------------|-------------|
| `RESEND_API_KEY` | All email functions | Resend API key (`re_...`) |
| `RESEND_FROM` | All email functions | Optional; default `BibliotecaTC <noreply@bibliotecatc.com>` |
| `SUPABASE_URL` | Cron functions | `https://YOUR_REF.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Cron functions | service_role key (never put in frontend `.env`) |
| `OPENAI_API_KEY` | `send-newsletter` | Optional; AI-generated fun facts |
| `APP_BASE_URL` | Templates | Base URL for CTA links (default `https://bibliotecatc.com`) |
| `LOGO_URL` | Templates | Header logo URL (HTTPS) |
| `SEND_EMAIL_HOOK_SECRET` | `auth-send-email` | From Auth Hook → **Generate secret** (`v1,whsec_...`) |

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are often auto-injected for Edge Functions; set them explicitly if invokes fail.

## Send Email Hook (Dashboard)

1. **Authentication** → **Auth Hooks** → **Send Email** → type **HTTPS**
2. **URL:** `https://YOUR_REF.supabase.co/functions/v1/auth-send-email`
3. **Hook secret:** click **Generate secret**, copy the full value → Edge secret `SEND_EMAIL_HOOK_SECRET`
4. **Authorization token (required):** paste your **service_role** key from **Project Settings** → **API** → `service_role` (secret). Supabase sends it as `Authorization: Bearer …` when calling the function.
5. Deploy: `npx supabase functions deploy auth-send-email --no-verify-jwt`

## “Email rate limit exceeded” (429)

This comes from **Supabase Auth**, not Resend. It appears after many password-reset / magic-link tests.

**Right now:** wait ~1 hour, or use a different email address for testing.

**For production / more testing:**

1. **Authentication** → **Rate Limits** → increase **Emails sent** (and password-reset cooldown if shown).
2. On the **Free** plan, the default cap is very low (~2 auth emails/hour project-wide) unless you use **custom SMTP**.
3. Optional: enable **Resend SMTP** under **Authentication** → **SMTP** (`smtp.resend.com`, user `resend`, password = Resend API key). That unlocks higher customizable email limits. If you use the **Send Email hook**, keep the hook enabled; SMTP mainly raises Auth rate limits.

## Deploy commands

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF

npx supabase secrets set RESEND_API_KEY=re_xxxxx
npx supabase secrets set RESEND_FROM="BibliotecaTC <noreply@bibliotecatc.com>"

npx supabase functions deploy send-email --no-verify-jwt
npx supabase functions deploy send-due-reminders
npx supabase functions deploy send-newsletter
npx supabase functions deploy send-weekly-picks
npx supabase functions deploy auth-send-email --no-verify-jwt
```

## Manual test (Dashboard → Edge Functions → Invoke)

**send-email**
```json
{ "to": "you@agr-tc.pt", "subject": "Test", "html": "<p>OK</p>" }
```

**send-due-reminders / send-newsletter / send-weekly-picks** — for manual tests, **always** pass your email (otherwise every student receives mail):

```json
{ "testEmail": "you@your-email.com" }
```

Production cron uses `{}` (all opted-in students). Your profile must use the same email in `profiles.email`.

**send-email** (single message, safe for one recipient):

```json
{ "to": "you@your-email.com", "template": "newsletter", "data": { "fact": "Teste." } }
```

Check function **Logs** and Resend **Emails** dashboard.
