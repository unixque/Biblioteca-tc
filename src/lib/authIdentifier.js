/** Auth email for the shared guest (demo) account. */
export const GUEST_AUTH_EMAIL = 'convidado@bibliotecatc.com'

/** Map short login "convidado" to a valid Supabase auth email. */
export function normalizeAuthEmail(identifier) {
  const value = String(identifier ?? '').trim()
  if (!value) return value
  if (value.toLowerCase() === 'convidado') return GUEST_AUTH_EMAIL
  return value
}
