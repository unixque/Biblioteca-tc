import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { getAuthUser } from "../_shared/auth.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { chatCompletion } from "../_shared/openai.ts";

const LANG_NAMES: Record<string, string> = {
  pt: "português",
  en: "english",
  es: "español",
  fr: "français",
  de: "deutsch",
  nl: "nederlands",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const auth = await getAuthUser(req);
  if (!auth) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  try {
    const { message, history = [], catalogSnippet = "", language = "pt" } =
      await req.json();

    if (!message || typeof message !== "string") {
      return jsonResponse({ error: "message required" }, 400);
    }

    const lang = LANG_NAMES[language] ?? LANG_NAMES.pt;
    const historyMsgs = (history as { role: string; content: string }[])
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-10);

    const result = await chatCompletion({
      messages: [
        {
          role: "system",
          content:
            `You are BibliotecaTC assistant for a school library. Reply in ${lang}. Recommend books from this catalog only. When recommending, include book title.\nCatalog:\n${catalogSnippet}`,
        },
        ...historyMsgs,
        { role: "user", content: message },
      ],
      max_tokens: 400,
    });

    if ("error" in result) {
      return jsonResponse({ error: result.error }, 502);
    }

    return jsonResponse({ reply: result.content });
  } catch (e) {
    return jsonResponse({ error: String(e) }, 400);
  }
});
