import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { getAuthUser, isAdmin } from "../_shared/auth.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { sendResendEmail } from "../_shared/resend.ts";
import { renderNamedTemplate, TemplateData } from "../_shared/emailTemplates.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const auth = await getAuthUser(req);
  if (!auth) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  try {
    const payload = await req.json();
    const to = payload.to as string | undefined;
    if (!to) {
      return jsonResponse({ error: "to required" }, 400);
    }

    const userEmail = auth.user.email?.toLowerCase();
    const targetEmail = to.toLowerCase();
    const admin = await isAdmin(auth.supabase, auth.user.id);

    if (targetEmail !== userEmail && !admin) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    if (payload.subject && payload.html) {
      const direct = await sendResendEmail({
        to,
        subject: payload.subject,
        html: payload.html,
      });
      if (!direct.ok) {
        return jsonResponse({ error: direct.error }, 400);
      }
      return jsonResponse({ ok: true, data: direct.data });
    }

    if (!payload.template || !payload.data) {
      return jsonResponse({
        error: "Expected { to, template, data } or { to, subject, html }",
      }, 400);
    }

    const { template, data } = payload as {
      template: string;
      data: TemplateData;
    };

    const rendered = renderNamedTemplate(template as never, data);
    const result = await sendResendEmail({
      to,
      subject: rendered.subject,
      html: rendered.html,
    });

    if (!result.ok) {
      return jsonResponse({ error: result.error }, 400);
    }

    return jsonResponse({ ok: true, data: result.data });
  } catch (error) {
    return jsonResponse({ error: String(error) }, 400);
  }
});
