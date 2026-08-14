import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// TEMPORARY diagnostic endpoint — remove after debugging SMTP.
// Sends one test mail to the configured mailbox itself (no arbitrary recipients).
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const info = {
    hasUser: !!process.env.SMTP_USER,
    hasPass: !!process.env.SMTP_PASS,
    host: process.env.SMTP_HOST ?? 'smtp.ionos.de',
    port: process.env.SMTP_PORT ?? '587',
    user: process.env.SMTP_USER ?? null,
    from: process.env.SMTP_FROM ?? null,
  };

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.ionos.de',
      port: parseInt(process.env.SMTP_PORT ?? '587'),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transport.verify();

    const result = await transport.sendMail({
      from: process.env.SMTP_FROM ?? `Astroversity Academy <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER!,
      subject: 'SMTP-Test astroversity.academy',
      text: 'Wenn diese Mail ankommt, funktioniert der SMTP-Versand.',
    });

    return res.status(200).json({ ok: true, info, messageId: result.messageId, response: result.response });
  } catch (err: any) {
    return res.status(200).json({
      ok: false,
      info,
      error: err?.message ?? String(err),
      code: err?.code,
      command: err?.command,
      responseCode: err?.responseCode,
    });
  }
}
