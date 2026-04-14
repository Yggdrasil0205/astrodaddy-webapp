import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email } = req.body ?? {};

  if (!email) {
    return res.status(400).json({ error: 'E-Mail fehlt.' });
  }

  try {
    await resend.emails.send({
      from: 'HappyAger Website <noreply@happy-ager.net>',
      to: 'hallo@happy-ager.net',
      subject: `🎉 Neue Community-Anmeldung: ${name || email}`,
      html: `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#f8f5f2;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="500" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;max-width:500px;width:100%;">
        <tr>
          <td style="background:#1b2a23;padding:24px 32px;">
            <h2 style="margin:0;color:#ffffff;font-size:20px;">Neue Community-Registrierung</h2>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f2;border-radius:12px;">
              <tr><td style="padding:20px;">
                <p style="margin:0 0 8px;font-size:13px;color:#8268AB;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Name</p>
                <p style="margin:0 0 20px;font-size:16px;color:#1b2a23;font-weight:bold;">${name || '–'}</p>
                <p style="margin:0 0 8px;font-size:13px;color:#8268AB;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">E-Mail</p>
                <p style="margin:0;font-size:16px;color:#1b2a23;">
                  <a href="mailto:${email}" style="color:#8268AB;">${email}</a>
                </p>
              </td></tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
      `.trim(),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Notify error:', error);
    return res.status(500).json({ error: 'Benachrichtigung fehlgeschlagen.' });
  }
}
