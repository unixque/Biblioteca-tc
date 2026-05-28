import { APP_BASE_URL } from "./resend.ts";
import {
  EmailTemplateProps,
  escapeHtml,
  renderEmailTemplate,
} from "./emailTemplate.ts";

type TemplateKey =
  | "book_request_pending"
  | "loan_approved"
  | "loan_rejected"
  | "loan_returned"
  | "due_reminder"
  | "newsletter"
  | "weekly_pick"
  | "auth_recovery"
  | "auth_magic_link";

interface BaseData {
  name?: string | null;
}

export type TemplateData = BaseData & {
  bookTitle?: string;
  dueDate?: string;
  fineAmount?: number;
  fact?: string;
  pickTitle?: string;
  pickAuthor?: string;
  magicLinkUrl?: string;
  recoveryUrl?: string;
};

export function renderNamedTemplate(key: TemplateKey, data: TemplateData) {
  const props = mapTemplate(key, data);
  return renderEmailTemplate(props);
}

function mapTemplate(key: TemplateKey, data: TemplateData): EmailTemplateProps {
  const loansUrl = `${APP_BASE_URL}/emprestimos`;
  const settingsUrl = `${APP_BASE_URL}/definicoes`;
  const book = escapeHtml(data.bookTitle ?? "");
  const pickTitle = escapeHtml(data.pickTitle ?? "");
  const pickAuthor = data.pickAuthor ? escapeHtml(data.pickAuthor) : "";

  switch (key) {
    case "book_request_pending":
      return {
        subject: `Reserva registada — ${data.bookTitle ?? "BibliotecaTC"}`,
        title: "Reserva registada",
        lead: "O seu pedido foi recebido e aguarda aprovação.",
        body: `Terá 12 horas para levantar o livro na biblioteca. Pode acompanhar o estado em <strong>A Minha Biblioteca</strong>.`,
        cta: { label: "Ver os meus empréstimos", url: loansUrl },
      };

    case "loan_approved":
      return {
        subject: `Empréstimo aprovado — ${data.bookTitle ?? ""}`.trim(),
        title: "O seu empréstimo foi aprovado",
        lead: `O livro <strong>${book}</strong> está pronto para levantamento.`,
        body: "Obrigado por utilizar a BibliotecaTC. Entregue o livro até à data limite indicada na sua área de empréstimos.",
        cta: { label: "Ver empréstimo", url: loansUrl },
      };

    case "loan_rejected":
      return {
        subject: `Empréstimo rejeitado — ${data.bookTitle ?? ""}`.trim(),
        title: "O seu pedido não pôde ser aprovado",
        lead: `O pedido para o livro <strong>${book}</strong> foi rejeitado.`,
        body: "Pode tentar novamente mais tarde ou escolher outro título do catálogo.",
        cta: { label: "A Minha Biblioteca", url: loansUrl },
      };

    case "loan_returned":
      return {
        subject: `Livro devolvido — ${data.bookTitle ?? ""}`.trim(),
        title: "Devolução registada",
        lead: `Confirmámos a devolução do livro <strong>${book}</strong>.`,
        body:
          data.fineAmount && data.fineAmount > 0
            ? `Existe uma multa associada de <strong>${data.fineAmount.toFixed(
                2,
              )}€</strong>. Por favor, regularize na biblioteca.`
            : "Esperamos que a leitura tenha sido útil. Obrigado por utilizar a BibliotecaTC.",
        cta: { label: "Ver histórico", url: loansUrl },
      };

    case "due_reminder":
      return {
        subject: `Devolução amanhã — ${data.bookTitle ?? ""}`.trim(),
        title: "Lembrete de devolução",
        badge: { kind: "warning", text: "Prazo a terminar" },
        lead: `O livro <strong>${book}</strong> deve ser devolvido amanhã.`,
        body:
          "Evite multas entregando o livro dentro do prazo. Pode consultar o PIN e a data limite em A Minha Biblioteca.",
        details: data.dueDate
          ? [{ label: "Data limite", value: data.dueDate }]
          : undefined,
        cta: { label: "A Minha Biblioteca", url: loansUrl },
      };

    case "newsletter":
      return {
        subject: "Curiosidade do dia — BibliotecaTC",
        title: "Curiosidade do dia",
        lead: escapeHtml(data.fact ?? ""),
        footerHint:
          "Gerir subscrição em Definições → Newsletter, na aplicação BibliotecaTC.",
        cta: { label: "Gerir preferências", url: settingsUrl },
      };

    case "weekly_pick":
      return {
        subject: "Recomendação da semana — BibliotecaTC",
        title: "Recomendação da semana",
        lead: `<strong>${pickTitle}</strong>${
          pickAuthor ? ` — ${pickAuthor}` : ""
        }`,
        body:
          "Descubra este título recomendado pela BibliotecaTC. Verifique a disponibilidade e faça a sua reserva.",
        cta: {
          label: "Ver no catálogo",
          url: `${APP_BASE_URL}/livro/${encodeURIComponent(
            data.bookTitle ?? "",
          )}`,
        },
      };

    case "auth_recovery":
      return {
        subject: "Redefinir a sua password — BibliotecaTC",
        title: "Redefinir password",
        lead:
          "Recebemos um pedido para redefinir a password da sua conta BibliotecaTC.",
        body:
          "Se não foi você a fazer este pedido, pode ignorar este email. Caso contrário, clique no botão abaixo para criar uma nova password.",
        cta: data.recoveryUrl
          ? { label: "Redefinir password", url: data.recoveryUrl }
          : undefined,
        footerHint: "Por motivos de segurança, este link expira ao fim de algum tempo.",
      };

    case "auth_magic_link":
      return {
        subject: "Aceder à BibliotecaTC — link mágico",
        title: "O seu link de acesso",
        lead:
          "Clique no botão abaixo para entrar diretamente na plataforma, sem precisar de password.",
        body:
          "Se não reconhece este pedido, pode ignorar o email. O link é temporário e expira ao fim de alguns minutos.",
        cta: data.magicLinkUrl
          ? { label: "Entrar na Biblioteca", url: data.magicLinkUrl }
          : undefined,
      };
  }
}

