interface ContactPayload {
  fullname: string;
  email: string;
  message: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
}

export async function notifyContactSubmission(
  contact: ContactPayload
): Promise<void> {
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;

  if (!to || !host || !user || !pass || !from) {
    return;
  }

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass },
    });

    const lines = [
      `Name: ${contact.fullname}`,
      `Email: ${contact.email}`,
      contact.projectType ? `Project type: ${contact.projectType}` : "",
      contact.budget ? `Budget: ${contact.budget}` : "",
      contact.timeline ? `Timeline: ${contact.timeline}` : "",
      "",
      contact.message,
    ].filter(Boolean);

    await transporter.sendMail({
      from,
      to,
      replyTo: contact.email,
      subject: `Portfolio contact — ${contact.fullname}`,
      text: lines.join("\n"),
    });
  } catch (error) {
    console.error("Contact notification email failed:", error);
  }
}
