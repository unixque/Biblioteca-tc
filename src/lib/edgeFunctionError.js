/** Extract a user-facing message from a Supabase Edge Function invoke result. */
export async function getEdgeFunctionErrorMessage(error, data) {
  if (data?.error && typeof data.error === 'string') return data.error

  const ctx = error?.context
  if (ctx && typeof ctx.json === 'function') {
    try {
      const body = await ctx.json()
      if (body?.error && typeof body.error === 'string') return body.error
      if (body?.message && typeof body.message === 'string') return body.message
    } catch {
      /* ignore parse errors */
    }
  }

  if (error?.message) return error.message
  return null
}

export function isOpenAiConfigError(message) {
  if (!message) return false
  const lower = message.toLowerCase()
  return lower.includes('openai_api_key') || lower.includes('not configured on server')
}
