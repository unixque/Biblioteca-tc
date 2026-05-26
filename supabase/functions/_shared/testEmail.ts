/** When set, cron-style functions only email this address (safe manual testing). */
export async function getTestEmail(req: Request): Promise<string | null> {
  try {
    const text = await req.text();
    if (!text.trim()) return null;
    const body = JSON.parse(text) as { testEmail?: string; test_email?: string };
    const email = body.testEmail ?? body.test_email;
    if (typeof email === "string" && email.includes("@")) {
      return email.trim().toLowerCase();
    }
  } catch {
    /* empty or invalid JSON body */
  }
  return null;
}

export function matchesTestEmail(
  profileEmail: string | null | undefined,
  testEmail: string,
): boolean {
  return (profileEmail ?? "").trim().toLowerCase() === testEmail;
}
