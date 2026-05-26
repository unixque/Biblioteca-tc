import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";
import { renderNamedTemplate } from "../_shared/emailTemplates.ts";
import { sendResendEmail } from "../_shared/resend.ts";

type EmailActionType =
  | "signup"
  | "invite"
  | "magiclink"
  | "recovery"
  | "email_change"
  | "email_change_new"
  | "reauthentication";

interface HookUser {
  email: string;
  user_metadata?: Record<string, unknown>;
}

interface HookEmailData {
  token?: string;
  token_hash: string;
  redirect_to: string;
  email_action_type: EmailActionType;
  site_url?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, webhook-id, webhook-timestamp, webhook-signature",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const hookSecret = Deno.env.get("SEND_EMAIL_HOOK_SECRET");
  if (!hookSecret) {
    return hookError("SEND_EMAIL_HOOK_SECRET not configured", 500);
  }

  try {
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);
    const base64Secret = hookSecret.replace(/^v1,whsec_/, "");
    const wh = new Webhook(base64Secret);
    const { user, email_data } = wh.verify(payload, headers) as {
      user: HookUser;
      email_data: HookEmailData;
    };

    const confirmationUrl = buildConfirmationUrl(email_data);
    const to = user.email;
    if (!to) {
      return hookError("Missing recipient email", 400);
    }

    const { template, templateData } = mapActionToTemplate(
      email_data.email_action_type,
      confirmationUrl,
    );

    const rendered = renderNamedTemplate(template, templateData);
    const result = await sendResendEmail({
      to,
      subject: rendered.subject,
      html: rendered.html,
    });

    if (!result.ok) {
      console.error("Resend error:", result.error);
      return hookError("Failed to send email", 500);
    }

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("auth-send-email:", error);
    const message = error instanceof Error ? error.message : String(error);
    return hookError(message, 401);
  }
});

function getProjectRef(): string {
  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const match = url.match(/https:\/\/([^.]+)\.supabase\.co/);
  return match?.[1] ?? "";
}

function buildConfirmationUrl(email_data: HookEmailData): string {
  const ref = getProjectRef();
  if (!ref) {
    throw new Error("SUPABASE_URL not set on Edge Function");
  }
  const params = new URLSearchParams({
    token: email_data.token_hash,
    type: email_data.email_action_type,
    redirect_to: email_data.redirect_to || "",
  });
  return `https://${ref}.supabase.co/auth/v1/verify?${params.toString()}`;
}

function mapActionToTemplate(
  action: EmailActionType,
  confirmationUrl: string,
): {
  template: "auth_recovery" | "auth_magic_link";
  templateData: { recoveryUrl?: string; magicLinkUrl?: string };
} {
  switch (action) {
    case "recovery":
      return {
        template: "auth_recovery",
        templateData: { recoveryUrl: confirmationUrl },
      };
    case "magiclink":
    case "signup":
    case "invite":
    case "email_change":
    case "email_change_new":
      return {
        template: "auth_magic_link",
        templateData: { magicLinkUrl: confirmationUrl },
      };
    case "reauthentication":
      return {
        template: "auth_magic_link",
        templateData: { magicLinkUrl: confirmationUrl },
      };
    default:
      return {
        template: "auth_magic_link",
        templateData: { magicLinkUrl: confirmationUrl },
      };
  }
}

function hookError(message: string, http_code: number): Response {
  return new Response(
    JSON.stringify({
      error: { http_code, message },
    }),
    {
      status: http_code >= 400 && http_code < 500 ? http_code : 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    },
  );
}
