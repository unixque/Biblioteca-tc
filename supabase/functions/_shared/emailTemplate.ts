// Heritage Scholar HTML email renderer for BibliotecaTC
// Usage: renderEmailTemplate({ template, subject, title, lead, body, cta, badge, details, footer })

type BadgeKind = "info" | "success" | "warning" | "error";

export interface EmailCTA {
  label: string;
  url: string;
}

export interface EmailDetailRow {
  label: string;
  value: string;
}

export interface EmailTemplateProps {
  subject: string;
  title: string;
  lead?: string;
  body?: string;
  badge?: { kind: BadgeKind; text: string };
  cta?: EmailCTA;
  details?: EmailDetailRow[];
  footerHint?: string;
}

const LOGO_URL =
  Deno.env.get("LOGO_URL") ??
  "https://ylcoynhihpvzttnuyaft.supabase.co/storage/v1/object/public/logo/logo.png";

export function renderEmailTemplate(props: EmailTemplateProps): {
  subject: string;
  html: string;
} {
  const {
    subject,
    title,
    lead,
    body,
    badge,
    cta,
    details,
    footerHint,
  } = props;

  const badgeColor =
    badge?.kind === "success"
      ? "#166534"
      : badge?.kind === "warning"
      ? "#92400E"
      : badge?.kind === "error"
      ? "#B91C1C"
      : "#1D4ED8";

  const badgeBg =
    badge?.kind === "success"
      ? "#DCFCE7"
      : badge?.kind === "warning"
      ? "#FEF3C7"
      : badge?.kind === "error"
      ? "#FEE2E2"
      : "#DBEAFE";

  const detailsRows =
    details && details.length
      ? details
          .map(
            (row) => `
        <tr>
          <td style="padding:4px 0;font-size:13px;color:#6b7280;">${escapeHtml(row.label)}</td>
          <td style="padding:4px 0;font-size:13px;color:#111827;font-weight:500;text-align:right;">${escapeHtml(row.value)}</td>
        </tr>`
          )
          .join("")
      : "";

  const html = `<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f0e8;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f5f0e8;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:16px;border:1px solid #d1cdc7;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
            <tr>
              <td style="background-color:#631d1d;padding:18px 24px;text-align:left;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" style="vertical-align:middle;">
                      <img src="${LOGO_URL}" width="40" height="40" alt="BibliotecaTC" style="display:block;border-radius:999px;border:2px solid rgba(255,255,255,0.4);" />
                    </td>
                    <td align="right" style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#fef2f2;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:600;">
                      Biblioteca Digital
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 6px 24px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;">
                ${
                  badge
                    ? `<div style="display:inline-block;padding:4px 10px;border-radius:999px;background-color:${badgeBg};color:${badgeColor};font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:10px;">
                      ${escapeHtml(badge.text)}
                    </div>`
                    : ""
                }
                <h1 style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.2;color:#111827;">
                  ${escapeHtml(title)}
                </h1>
                ${
                  lead
                    ? `<p style="margin:0 0 12px 0;font-size:14px;line-height:1.5;color:#4b5563;">
                        ${lead}
                      </p>`
                    : ""
                }
                ${
                  body
                    ? `<p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#374151;">
                        ${body}
                      </p>`
                    : ""
                }
              </td>
            </tr>
            ${
              detailsRows
                ? `<tr>
                    <td style="padding:0 24px 12px 24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        ${detailsRows}
                      </table>
                    </td>
                  </tr>`
                : ""
            }
            ${
              cta
                ? `<tr>
                    <td align="center" style="padding:8px 24px 20px 24px;">
                      <a href="${cta.url}" style="display:inline-block;background-color:#631d1d;color:#ffffff !important;text-decoration:none;font-weight:600;font-size:14px;padding:10px 22px;border-radius:999px;">
                        ${escapeHtml(cta.label)}
                      </a>
                    </td>
                  </tr>`
                : ""
            }
            <tr>
              <td style="padding:16px 24px 20px 24px;border-top:1px solid #e5e7eb;background-color:#faf7f1;">
                <p style="margin:0 0 4px 0;font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:11px;color:#6b7280;">
                  BibliotecaTC — Escola Secundária Tomás Cabreira
                </p>
                ${
                  footerHint
                    ? `<p style="margin:0;font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:11px;color:#9ca3af;">
                        ${escapeHtml(footerHint)}
                      </p>`
                    : ""
                }
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html };
}

/** Escape user-provided text; wrap with <strong> in templates after escaping. */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

