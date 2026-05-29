import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export type CatalogBook = {
  id: string;
  title: string;
  author: string | null;
  available_qty: number;
  category: string;
};

export async function fetchCatalogBooks(
  supabase: SupabaseClient,
): Promise<CatalogBook[]> {
  const { data, error } = await supabase
    .from("books")
    .select("id, title, author, available_qty, categories(name)")
    .order("title");

  if (error || !data) return [];

  return data.map((b) => ({
    id: String(b.id),
    title: String(b.title ?? "").trim(),
    author: b.author ? String(b.author) : null,
    available_qty: Number(b.available_qty) || 0,
    category: (b.categories as { name?: string } | null)?.name ?? "",
  }));
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ");
}

/** Query tokens (min 3 chars); skip very common words. */
export function tokenizeQuery(query: string): string[] {
  const stop = new Set([
    "the", "and", "for", "que", "uma", "uns", "umas", "por", "com", "sem",
    "dos", "das", "livro", "livros", "book", "books", "recomenda", "recommend",
  ]);
  return [...new Set(
    normalizeText(query)
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !stop.has(w)),
  )];
}

function stemMatch(word: string, hay: string): boolean {
  if (word.length < 4) return hay.includes(word);
  const stem = word.slice(0, Math.min(5, word.length));
  return hay.split(/\s+/).some((w) =>
    w.startsWith(stem) || stem.startsWith(w.slice(0, Math.min(5, w.length)))
  );
}

/** Score how well a book matches a topic query (not exact title lookup). */
export function scoreBookRelevance(book: CatalogBook, tokens: string[]): number {
  if (!tokens.length) return 0;
  const hay = normalizeText(`${book.title} ${book.author ?? ""} ${book.category}`);
  let score = 0;
  for (const token of tokens) {
    if (hay.includes(token)) score += 4;
    else if (stemMatch(token, hay)) score += 3;
  }
  if (book.available_qty > 0) score += 0.5;
  return score;
}

/** Books most related to the user's topic, for a focused catalog in the prompt. */
export function rankCatalogForQuery(
  books: CatalogBook[],
  query: string,
  limit = 35,
): CatalogBook[] {
  const tokens = tokenizeQuery(query);
  if (!tokens.length) return books.slice(0, limit);

  const scored = books
    .map((book) => ({ book, score: scoreBookRelevance(book, tokens) }))
    .sort((a, b) => b.score - a.score);

  const relevant = scored.filter((s) => s.score > 0).map((s) => s.book);
  if (relevant.length >= 3) return relevant.slice(0, limit);

  // Weak match: still send full catalog so the model can reason
  return books.slice(0, limit);
}

export function buildCatalogSnippet(books: CatalogBook[]): string {
  if (!books.length) return "(catálogo vazio)";
  return books
    .map((b) => {
      const avail = b.available_qty > 0 ? "disponível" : "indisponível";
      const cat = b.category ? ` | ${b.category}` : "";
      return `- "${b.title}" | ${b.author || "autor desconhecido"} | id:${b.id} | ${avail}${cat}`;
    })
    .join("\n");
}

export function findBooksMentionedInText(
  text: string,
  books: CatalogBook[],
): CatalogBook[] {
  const lower = normalizeText(text);
  const found: CatalogBook[] = [];
  const seen = new Set<string>();

  for (const b of books) {
    const title = b.title.trim();
    if (title.length < 3) continue;
    const titleNorm = normalizeText(title);
    if (lower.includes(titleNorm)) {
      if (!seen.has(b.id)) {
        seen.add(b.id);
        found.push(b);
      }
      continue;
    }
    // Partial: significant words from title appear in reply
    const titleWords = titleNorm.split(/\s+/).filter((w) => w.length >= 5);
    if (titleWords.length > 0 && titleWords.every((w) => lower.includes(w))) {
      if (!seen.has(b.id)) {
        seen.add(b.id);
        found.push(b);
      }
    }
  }
  return found;
}
