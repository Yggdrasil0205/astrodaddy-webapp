import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Webinar-Link hier eintragen, sobald bekannt:
const WEBINAR_LINK = process.env.WEBINAR_LINK ?? 'https://happyager.com/webinar-live';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email } = req.body ?? {};

  if (!name || typeof name !== 'string' || !email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Name und E-Mail sind erforderlich.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
  }

  try {
    // 1. Bestätigungsmail an Teilnehmer
    await resend.emails.send({
      from: 'Markus von HappyAger <noreply@happy-ager.net>',
      to: email,
      subject: '✅ Deine Webinar-Anmeldung ist bestätigt!',
      html: `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f8f5f2;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f5f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:24px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1b2a23,#8268AB);padding:40px 40px 32px;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;color:#BFADD5;letter-spacing:2px;text-transform:uppercase;">HappyAger</p>
            <h1 style="margin:0;font-size:28px;color:#ffffff;font-weight:bold;line-height:1.3;">
              Du bist dabei! 🎉
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 16px;font-size:16px;color:#1b2a23;line-height:1.6;">
              Hallo ${name},
            </p>
            <p style="margin:0 0 16px;font-size:16px;color:#4a4a4a;line-height:1.6;">
              vielen Dank für deine Anmeldung zum kostenlosen <strong>HappyAger Longevity-Webinar</strong>.
              Wir freuen uns sehr, dich dabei zu haben!
            </p>
            <p style="margin:0 0 32px;font-size:16px;color:#4a4a4a;line-height:1.6;">
              In diesem Webinar zeigt dir Markus, wie du mit den 4 Säulen der Longevity
              länger gesund, aktiv und glücklich leben kannst – wissenschaftlich fundiert
              und alltagstauglich.
            </p>

            <!-- CTA Button -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center" style="padding:0 0 32px;">
                <a href="${WEBINAR_LINK}"
                   style="display:inline-block;background:linear-gradient(135deg,#8268AB,#1b2a23);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:16px;font-weight:bold;letter-spacing:0.5px;">
                  → Jetzt zum Webinar
                </a>
              </td></tr>
            </table>

            <!-- Info Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f5f2;border-radius:16px;margin-bottom:32px;">
              <tr><td style="padding:24px;">
                <p style="margin:0 0 12px;font-size:14px;font-weight:bold;color:#8268AB;text-transform:uppercase;letter-spacing:1px;">Was dich erwartet</p>
                <p style="margin:0 0 8px;font-size:14px;color:#4a4a4a;line-height:1.6;">✦ &nbsp;Die 4 wichtigsten Longevity-Hebel, die du sofort umsetzen kannst</p>
                <p style="margin:0 0 8px;font-size:14px;color:#4a4a4a;line-height:1.6;">✦ &nbsp;Warum Inflammaging dein größter Feind ist – und wie du ihn stoppst</p>
                <p style="margin:0 0 8px;font-size:14px;color:#4a4a4a;line-height:1.6;">✦ &nbsp;Kraft & Bewegung: Der wichtigste Hebel in jedem Alter</p>
                <p style="margin:0;font-size:14px;color:#4a4a4a;line-height:1.6;">✦ &nbsp;Live Q&A mit Markus Miersbe</p>
              </td></tr>
            </table>

            <p style="margin:0 0 8px;font-size:14px;color:#6b6b6b;line-height:1.6;">
              Bitte speichere dir den Webinar-Link. Falls du Fragen hast, schreibe uns jederzeit an
              <a href="mailto:hallo@happy-ager.net" style="color:#8268AB;text-decoration:none;">hallo@happy-ager.net</a>.
            </p>
            <p style="margin:0;font-size:16px;color:#1b2a23;line-height:1.6;">
              Bis bald,<br><strong>Markus & das HappyAger-Team</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#1b2a23;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#BFADD5;line-height:1.6;">
              HappyAger · <a href="https://happyager.com" style="color:#F9C4B5;text-decoration:none;">happyager.com</a><br>
              Du erhältst diese E-Mail, weil du dich für unser kostenloses Webinar angemeldet hast.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `.trim(),
    });

    // 2. Benachrichtigung an hallo@happy-ager.net
    await resend.emails.send({
      from: 'HappyAger Website <noreply@happy-ager.net>',
      to: 'hallo@happy-ager.net',
      subject: `📩 Neue Webinar-Anmeldung: ${name}`,
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
            <h2 style="margin:0;color:#ffffff;font-size:20px;">Neue Webinar-Anmeldung</h2>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f2;border-radius:12px;">
              <tr><td style="padding:20px;">
                <p style="margin:0 0 8px;font-size:13px;color:#8268AB;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Name</p>
                <p style="margin:0 0 20px;font-size:16px;color:#1b2a23;font-weight:bold;">${name}</p>
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
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden. Bitte versuche es später erneut.' });
  }
}
