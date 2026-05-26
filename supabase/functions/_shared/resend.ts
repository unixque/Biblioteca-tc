/** Verified Resend sender — override via Edge Function secret RESEND_FROM */
export const RESEND_FROM =
  Deno.env.get("RESEND_FROM") ?? "BibliotecaTC <noreply@bibliotecatc.com>";

export const APP_BASE_URL =
  Deno.env.get("APP_BASE_URL") ?? "https://bibliotecatc.com";

export async function sendResendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; data?: unknown; error?: unknown }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY not set" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    }),
  });

  const data = await res.json();
  if (!res.ok) return { ok: false, error: data };
  return { ok: true, data };
}
