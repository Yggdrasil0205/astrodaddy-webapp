# Supabase Auth – E-Mails für Kundenkonten

Bestätigungs-, Passwort-Reset- und Login-Mails werden **nicht** von Supabase selbst verschickt,
sondern über den **Send Email Hook** an `api/auth-email.ts` übergeben und von dort über denselben
IONOS-SMTP-Zugang wie alle Shop-Mails versendet (Texte/Design: `sendAuthEmail` in `src/lib/mailer.ts`).

Einrichtung (Supabase → Authentication → Hooks → **Send Email**):
- Typ **HTTPS**, URL `https://astroversity.academy/api/auth-email`
- „Generate secret" → den Wert (`v1,whsec_…`) in Vercel als `SEND_EMAIL_HOOK_SECRET` eintragen, dann redeployen.

Außerdem (Authentication):
- **Sign In / Providers → Email → Confirm email**: aktiv.
- **URL Configuration**: Site URL `https://astroversity.academy`,
  Redirect URLs `https://astroversity.academy/**`.

Die HTML-Dateien in diesem Ordner sind nur noch Fallback-Vorlagen, falls der Hook deaktiviert wird
und Supabase wieder selbst per Custom SMTP versendet.
