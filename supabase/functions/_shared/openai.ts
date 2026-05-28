export async function chatCompletion(opts: {
  messages: { role: string; content: string }[];
  max_tokens?: number;
  temperature?: number;
}): Promise<{ content: string } | { error: string }> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    return { error: "OPENAI_API_KEY not configured on server" };
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: opts.messages,
      max_tokens: opts.max_tokens ?? 400,
      temperature: opts.temperature ?? 0.7,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message ?? "OpenAI request failed";
    return { error: msg };
  }

  const content = data.choices?.[0]?.message?.content?.trim() ?? "";
  return { content };
}
