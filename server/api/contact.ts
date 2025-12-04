import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const noReplyEmail = process.env.NO_REPLY_EMAIL!;
const contactRecipientEmail = process.env.CONTACT_RECIPIENT_EMAIL!;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await resend.emails.send({
    from: `Contact Form <${noReplyEmail}>`,
    to: [contactRecipientEmail],
    subject: "Contact Form Submission",
    html: `
           <p>From: ${body.name} (${body.email})</p>
           <p>${body.message}</p>
        `,
  });

  return { success: true };
});
