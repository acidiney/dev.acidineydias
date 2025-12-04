import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await resend.emails.send({
    from: `Contact Form <no-reply@acidineydias.dev>`,
    to: ["hireme@acidineydias.dev"],
    subject: "Contact Form Submission",
    html: `
           <p>From: ${body.name} (${body.email})</p>
           <p>${body.message}</p>
        `,
  });

  return { success: true };
});
