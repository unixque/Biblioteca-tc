import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { getAuthUser } from "../_shared/auth.ts";
import {
  buildCatalogSnippet,
  fetchCatalogBooks,
  findBooksMentionedInText,
  rankCatalogForQuery,
} from "../_shared/catalog.ts";
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
    const { message, history = [], language = "pt" } = await req.json();

    if (!message || typeof message !== "string") {
      return jsonResponse({ error: "message required" }, 400);
    }

    const lang = LANG_NAMES[language] ?? LANG_NAMES.pt;
    const historyMsgs = (history as { role: string; content: string }[])
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-10);

    const allBooks = await fetchCatalogBooks(auth.supabase);
    const focusedBooks = rankCatalogForQuery(allBooks, message, 40);
    const catalogSnippet = buildCatalogSnippet(
      focusedBooks.length ? focusedBooks : allBooks.slice(0, 40),
    );

    const result = await chatCompletion({
      messages: [
        {
          role: "system",
          content: `You are the BibliotecaTC school library assistant. Always reply in ${lang}.

Your job is to understand what the user wants to read about (topic, subject, theme, author, mood, keywords) and recommend real books from the catalog below. The user is NOT looking up an exact title — they describe interests in free text (e.g. "sistema operativa", "filosofia", "violência").

RULES:
- Recommend ONLY books from the CATALOG (use exact titles from the list).
- NEVER invent titles or authors.
- Match by meaning: related words, same field, category, or subject (e.g. "sistema operativa" → books about operating systems, digital systems, informatics).
- Prefer available copies (disponível) when several fit.
- Give 1–3 suggestions with a short reason each. Use exact catalog titles.
- If the catalog truly has nothing related, say so politely and suggest a broader topic — do not claim a specific famous book exists unless it is in the catalog.

CATALOG (${allBooks.length} books total; most relevant shown first):
${catalogSnippet}`,
        },
        ...historyMsgs,
        { role: "user", content: message },
      ],
      max_tokens: 450,
      temperature: 0.45,
    });

    if ("error" in result) {
      return jsonResponse({ error: result.error }, 502);
    }

    const reply = result.content;
    const mentioned = findBooksMentionedInText(reply, allBooks);
    const bookIds = mentioned.length > 0
      ? mentioned.map((b) => b.id)
      : rankCatalogForQuery(allBooks, message, 3).map((b) => b.id);

    return jsonResponse({
      reply,
      bookIds: bookIds.slice(0, 3),
    });
  } catch (e) {
    return jsonResponse({ error: String(e) }, 400);
  }
});
