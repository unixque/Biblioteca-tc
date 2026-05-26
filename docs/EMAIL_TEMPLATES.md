# BibliotecaTC Email Templates

All emails (app events, cron, and Supabase Auth) share the same Heritage Scholar HTML layout, rendered by:

- `supabase/functions/_shared/emailTemplate.ts`
- `supabase/functions/_shared/emailTemplates.ts`

## Layout

- Background: `#F5F0E8`
- Card: white, border `#D1CDC7`, soft shadow
- Header: burgundy bar `#631D1D` with circular logo (`LOGO_URL`)
- Typography: serif title, sans-serif body
- CTA button: burgundy with white text, pill-shaped

## Template keys

| Key | Purpose |
|-----|---------|
| `book_request_pending` | Student requested a book |
| `loan_approved` | Loan approved by admin |
| `loan_rejected` | Loan rejected |
| `loan_returned` | Loan returned (optional fine) |
| `due_reminder` | Reminder: due tomorrow |
| `newsletter` | Daily fun fact |
| `weekly_pick` | Weekly book recommendation |
| `auth_recovery` | Password reset (Supabase Auth hook) |
| `auth_magic_link` | Magic link login (Supabase Auth hook) |

Most copy is currently in Portuguese (PT) and lives directly in `emailTemplates.ts`. Frontend i18n (`locales/*.js`) still controls in-app messages.

## Auth Send Email Hook

- Edge Function: `supabase/functions/auth-send-email/index.ts`
- Maps Supabase Auth actions to templates:
  - `recovery` → `auth_recovery` (uses `confirmation_url` / `redirect_to`)
  - `magiclink` → `auth_magic_link`
- Configure in Supabase Dashboard:
  1. Authentication → Auth Hooks → **Send Email** → **HTTPS**
  2. URL: `https://YOUR_REF.supabase.co/functions/v1/auth-send-email`
  3. **Generate secret** → Edge secret `SEND_EMAIL_HOOK_SECRET` (full `v1,whsec_…` string)
  4. **Authorization token:** **service_role** key (Project Settings → API)
  5. Deploy with `--no-verify-jwt`
  6. Redirect URLs: `/redefinir-password` and `/`

## Transactional flows

### Reservation pending

- Trigger: student clicks “Requisitar livro”
- Code: `notifyUser({ template: 'book_request_pending', templateData: { bookTitle } })` in `BookDetails.jsx`

### Loan approved / rejected / returned

- Trigger: admin changes status in `/console/emprestimos`
- Code: `notifyUser({ template: 'loan_approved' | 'loan_rejected' | 'loan_returned', templateData: { bookTitle, fineAmount } })`

### Automatic reminders & newsletters

- `send-due-reminders` → `due_reminder`
- `send-newsletter` → `newsletter`
- `send-weekly-picks` → `weekly_pick`

These functions do not need to construct HTML manually; they just pass data into `renderNamedTemplate` and send via Resend.

