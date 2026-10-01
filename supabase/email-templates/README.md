# Kunden-Konten – E-Mails

Registrierung und „Passwort vergessen" laufen über `api/account.ts`, **nicht** über Supabase's Mailer:

1. Supabase erzeugt nur den Einmal-Link (`auth.admin.generateLink`, verschickt nichts).
2. Wir versenden ihn über denselben IONOS-SMTP-Zugang wie alle Shop-Mails (`sendAuthEmail` in `src/lib/mailer.ts`).
3. Der Link führt auf `/auth/confirm` (`src/app/pages/AuthConfirm.tsx`), das ihn mit `verifyOtp` einlöst.

Dadurch spielen die SMTP-Einstellungen, Site URL und Redirect-Allowlist in Supabase keine Rolle.
Die HTML-Dateien hier sind nur Fallback-Vorlagen, falls wieder Supabase selbst versenden soll.
