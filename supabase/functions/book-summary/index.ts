import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getAuthUser, isAdmin } from "../_shared/auth.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { chatCompletion } from "../_shared/openai.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const auth = await getAuthUser(req);
  if (!auth) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  const admin = await isAdmin(auth.supabase, auth.user.id);
  if (!admin) {
    return jsonResponse({ error: "Admin only" }, 403);
  }

  try {
    const { bookId, title, author } = await req.json();
    if (!bookId || !title) {
      return jsonResponse({ error: "bookId and title required" }, 400);
    }

    const result = await chatCompletion({
      messages: [
        {
          role: "user",
          content:
            `Escreve um resumo curto e cativante em português (3-4 frases) do livro "${title}" de ${author || "autor desconhecido"}. Foca-te no tema central. Sem aspas nem markdown.`,
        },
      ],
      max_tokens: 200,
    });

    if ("error" in result) {
      return jsonResponse({ error: result.error }, 502);
    }

    const service = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { error: updateError } = await service
      .from("books")
      .update({ ai_summary: result.content })
      .eq("id", bookId);

    if (updateError) {
      return jsonResponse({ error: updateError.message }, 500);
    }

    return jsonResponse({ summary: result.content });
  } catch (e) {
    return jsonResponse({ error: String(e) }, 400);
  }
});
