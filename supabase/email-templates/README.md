# Supabase Auth – E-Mail-Vorlagen

Bestätigungs- und Passwort-Mails für Kundenkonten verschickt **Supabase Auth**, nicht unser Code.
Diese Vorlagen werden im Supabase-Dashboard eingefügt (Authentication → Emails → Templates):

| Supabase-Vorlage | Betreff | Datei |
|---|---|---|
| Confirm signup | Bitte bestätige deine E-Mail-Adresse | `confirm-signup.html` |
| Reset password | Dein neues Passwort für Astroversity Academy | `reset-password.html` |

Voraussetzungen (Authentication):
- **SMTP Settings → Custom SMTP**: Host `smtp.ionos.de`, Port `587`, User/Passwort = `SMTP_USER`/`SMTP_PASS` aus Vercel,
  Absender `info@astroversity.academy`, Name `Astroversity Academy`. Ohne eigenes SMTP stellt Supabase nur an Team-Mitglieder zu.
- **Sign In / Providers → Email → Confirm email**: aktiv.
- **URL Configuration**: Site URL `https://astroversity.academy`, Redirect URL `https://astroversity.academy/reset-password`.
