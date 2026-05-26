import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { renderNamedTemplate } from "../_shared/emailTemplates.ts";
import { sendResendEmail } from "../_shared/resend.ts";
import { getTestEmail, matchesTestEmail } from "../_shared/testEmail.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CATEGORY_PROMPTS: Record<string, string> = {
  books: "um facto curioso sobre literatura ou livros famosos",
  history: "um facto histórico surpreendente e educativo",
  philosophy: "uma reflexão filosófica breve ligada a pensadores clássicos",
  world: "um facto sobre culturas ou curiosidades do mundo",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const testEmail = await getTestEmail(req);

  const now = new Date();
  const day = now.getDay();
  if (!testEmail && (day === 0 || day === 6)) {
    return new Response(JSON.stringify({ skipped: "weekend" }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: prefs } = await supabase
    .from("newsletter_preferences")
    .select("user_id, enabled, categories");

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("role", "aluno");

  const prefMap = new Map(
    (prefs || []).map((p: { user_id: string }) => [p.user_id, p])
  );

  let sent = 0;
  const errors: unknown[] = [];

  const recipients = (profiles || []).filter((profile) =>
    testEmail ? matchesTestEmail(profile.email, testEmail) : true
  );

  if (testEmail && recipients.length === 0) {
    return new Response(
      JSON.stringify({
        sent: 0,
        testEmail,
        error: "no_profile_with_that_email",
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }

  for (const profile of recipients) {
    const pref = prefMap.get(profile.id) as
      | { enabled?: boolean; categories?: string[] }
      | undefined;

    if (pref?.enabled === false) continue;

    const categories = pref?.categories || [
      "books",
      "history",
      "philosophy",
      "world",
    ];
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const prompt = CATEGORY_PROMPTS[cat] || CATEGORY_PROMPTS.books;

    let fact =
      "Sabia que a Biblioteca de Alexandria foi um dos maiores centros de conhecimento do mundo antigo?";

    if (OPENAI_API_KEY) {
      try {
        const ai = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: `Escreve em português de Portugal, 2-3 frases, ${prompt}. Tom leve e educativo para alunos do secundário.`,
              },
            ],
            max_tokens: 150,
          }),
        });
        const json = await ai.json();
        fact = json.choices?.[0]?.message?.content || fact;
      } catch {
        /* use fallback fact */
      }
    }

    if (!profile.email) continue;

    const rendered = renderNamedTemplate("newsletter", {
      fact,
    });

    const result = await sendResendEmail({
      to: profile.email,
      subject: rendered.subject,
      html: rendered.html,
    });

    if (!result.ok) {
      errors.push(result.error);
      continue;
    }
    sent++;
  }

  return new Response(JSON.stringify({ sent, errors, testEmail: testEmail ?? undefined }), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
});
