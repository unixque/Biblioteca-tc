/** Maps Supabase Auth errors to user-friendly copy. */
export function formatAuthError(error, t) {
  if (!error) return null
  const code = error.code ?? ''
  const msg = (error.message ?? '').toLowerCase()

  if (
    code === 'over_email_send_rate_limit' ||
    msg.includes('email rate limit')
  ) {
    return t('auth.emailRateLimit')
  }

  return error.message
}
