/**
 * 🔒 ENTWICKLUNGS-KONFIGURATION
 * 
 * Hier kannst du den Passwort-Schutz für die gesamte Website aktivieren/deaktivieren
 */

export const DEV_CONFIG = {
  // ⚡ PASSWORT-SCHUTZ EIN/AUS SCHALTEN
  PASSWORD_PROTECTION: true, // ← Auf 'false' setzen um Passwort-Schutz zu deaktivieren
  
  // 🔑 Das Passwort für den Zugang (kann hier geändert werden)
  PASSWORD: 'happyager2026', // ← Ändere das Passwort hier
  
  // ⏰ Wie lange soll die Session gültig sein? (in Tagen)
  SESSION_DURATION_DAYS: 1,
};
