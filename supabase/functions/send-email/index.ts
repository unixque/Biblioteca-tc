import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { sendResendEmail } from "../_shared/resend.ts";
import { renderNamedTemplate, TemplateData } from "../_shared/emailTemplates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();

    // Backwards-compatible mode: direct subject/html
    if (payload.subject && payload.html) {
      const direct = await sendResendEmail({
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      });
      if (!direct.ok) {
        return new Response(JSON.stringify({ error: direct.error }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
      return new Response(JSON.stringify({ ok: true, data: direct.data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // New mode: template + data
    if (!payload.template || !payload.data) {
      return new Response(
        JSON.stringify({
          error:
            "Expected either { to, subject, html } or { to, template, data }",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { template, data } = payload as {
      template: string;
      data: TemplateData;
    };

    const rendered = renderNamedTemplate(template as any, data);
    const result = await sendResendEmail({
      to: payload.to,
      subject: rendered.subject,
      html: rendered.html,
    });

    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    return new Response(JSON.stringify({ ok: true, data: result.data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
