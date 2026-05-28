# Auth Send Email Hook — "Hook requires authorization token"

When you reset password or use magic link, Supabase Auth calls your **`auth-send-email`** Edge Function. If that call fails with **401**, Auth shows:

> **Hook requires authorization token**

This message is **misleading** — it often means the hook call failed, not that you forgot a field in the app.

---

## Fix checklist (do all 5)

### 1. Hook type: HTTPS (not Postgres)

**Authentication** → **Auth Hooks** → **Send Email**

| Field | Value |
|-------|--------|
| Type | **HTTPS** |
| URL | `https://ylcoynhihpvzttnuyaft.supabase.co/functions/v1/auth-send-email` |

### 2. Authorization token (required in Dashboard)

In the same hook form, paste your **service_role** key:

1. **Project Settings** → **API** → **service_role** → Reveal / copy  
2. Paste into **Authorization token** (only the JWT, no `Bearer ` prefix)

Supabase sends this as `Authorization: Bearer …` when calling your function.

### 3. Hook secret → Edge secret (must match exactly)

1. In the hook UI, click **Generate secret** (format `v1,whsec_…`)  
2. Copy the **full** string  
3. Supabase CLI:

```bash
npx supabase secrets set SEND_EMAIL_HOOK_SECRET="v1,whsec_PASTE_FULL_SECRET_HERE"
```

4. **Redeploy** the function after changing secrets:

```bash
npx supabase functions deploy auth-send-email --no-verify-jwt
```

`--no-verify-jwt` is required — Auth does not send a user JWT.

### 4. Other Edge secrets

- `RESEND_API_KEY`
- `SUPABASE_URL` (usually auto)

### 5. Redirect URLs

**Authentication** → **URL Configuration** → add:

- `https://bibliotecatc.com/redefinir-password`
- `http://localhost:5173/redefinir-password` (dev)

---

## Verify it works

1. **Edge Functions** → `auth-send-email` → **Logs**  
2. Trigger **Recuperar password** in the app  
3. You should see a **200** log line; check Resend for the email  

If logs show **401**: almost always **webhook secret mismatch** — regenerate secret in Dashboard, update `SEND_EMAIL_HOOK_SECRET`, redeploy.

---

## Quick workaround (no custom HTML)

Disable the hook and use Resend SMTP:

1. **Authentication** → **Auth Hooks** → disable **Send Email**  
2. **Authentication** → **SMTP** → enable Resend (`smtp.resend.com`, user `resend`, password = Resend API key)  
3. Sender: `BibliotecaTC <noreply@bibliotecatc.com>`

Password reset works; emails use Supabase default templates (not Heritage Scholar layout).

---

## Still on email rate limit?

See [supabase/SECRETS.md](../supabase/SECRETS.md) — wait or raise **Authentication** → **Rate Limits**.
