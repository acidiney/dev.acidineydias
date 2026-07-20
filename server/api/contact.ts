import { defineEventHandler, readBody } from "h3";
import { Resend } from "resend";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export function validateContactBody(body: unknown): ContactBody {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body");
  }

  const { name, email, message } = body as Partial<ContactBody>;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new Error("name is required");
  }

  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    throw new Error("valid email is required");
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    throw new Error("message is required and must be at least 10 characters");
  }

  if (message.trim().length > 5000) {
    throw new Error("message must be at most 5000 characters");
  }

  return {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

export default defineEventHandler(async (event) => {
  const rawBody = await readBody(event);
  const body = validateContactBody(rawBody);

  const noReplyEmail = process.env.NO_REPLY_EMAIL;
  const contactRecipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

  if (!noReplyEmail || !contactRecipientEmail) {
    throw new Error("Email configuration is missing");
  }

  await getResend().emails.send({
    from: `Contact Form <${noReplyEmail}>`,
    to: [contactRecipientEmail],
    subject: "Contact Form Submission",
    html: `
           <p>From: ${escapeHtml(body.name)} (${escapeHtml(body.email)})</p>
           <p>${escapeHtml(body.message)}</p>
        `,
  });

  return { success: true };
});
