import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { renderNamedTemplate } from "../_shared/emailTemplates.ts";
import { sendResendEmail } from "../_shared/resend.ts";
import { getTestEmail, matchesTestEmail } from "../_shared/testEmail.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const { data: loans, error } = await supabase
    .from("loans")
    .select(
      "id, user_id, due_date, books!fk_loans_book(title), profiles!fk_loans_user(email)"
    )
    .eq("status", "active")
    .gte("due_date", `${tomorrowStr}T00:00:00`)
    .lte("due_date", `${tomorrowStr}T23:59:59`);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  let sent = 0;
  const errors: unknown[] = [];

  let loanList = loans || [];
  if (testEmail) {
    loanList = loanList.filter((loan) =>
      matchesTestEmail(
        (loan as { profiles?: { email?: string } }).profiles?.email,
        testEmail,
      )
    );
  }

  if (testEmail && loanList.length === 0) {
    const rendered = renderNamedTemplate("due_reminder", {
      bookTitle: "[TESTE] Livro de exemplo",
      dueDate: tomorrow.toLocaleDateString("pt-PT"),
    });
    const result = await sendResendEmail({
      to: testEmail,
      subject: rendered.subject,
      html: rendered.html,
    });
    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error, testEmail }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    return new Response(
      JSON.stringify({
        sent: 1,
        testEmail,
        testMode: true,
        note: "sample_email_no_loan_due_tomorrow",
      }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }

  for (const loan of loanList) {
    const email = (loan as { profiles?: { email?: string } }).profiles?.email;
    const title =
      (loan as { books?: { title?: string } }).books?.title || "livro";
    const dueDate = (loan as { due_date?: string }).due_date;
    if (!email) continue;

    const rendered = renderNamedTemplate("due_reminder", {
      bookTitle: title,
      dueDate: dueDate ? new Date(dueDate).toLocaleDateString("pt-PT") : undefined,
    });

    const result = await sendResendEmail({
      to: email,
      subject: rendered.subject,
      html: rendered.html,
    });

    if (!result.ok) {
      errors.push(result.error);
      continue;
    }

    await supabase.from("notifications").insert({
      user_id: loan.user_id,
      title: "Devolução amanhã",
      message: `O livro "${title}" deve ser devolvido amanhã.`,
      type: "warning",
    });
    sent++;
  }

  return new Response(
    JSON.stringify({
      sent,
      total: loanList.length,
      errors,
      testEmail: testEmail ?? undefined,
    }),
    { headers: { "Content-Type": "application/json", ...corsHeaders } }
  );
});
