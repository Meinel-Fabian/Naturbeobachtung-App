# Naturbeobachtungs-App

Private PWA für Naturfotografen: Beobachtungen mit Foto, Standort und Notiz erfassen
und daraus Projekte mit Kalender, Ereignissen und Zielen planen.
Konzept und Roadmap: siehe docs/KONZEPT.md.
Der alte Prototyp (HTML/CSS/JS + Leaflet) liegt in prototyp/ und dient nur als Referenz.

## Stack
SvelteKit, Leaflet + OpenStreetMap, PWA mit Service Worker,
Supabase (Auth, PostgreSQL + PostGIS, Storage, Row Level Security), Region Frankfurt.
Hosting statisch (Vercel oder Netlify).

## Aktuelle Etappe
Etappe 1: Fundament – Projekt aufsetzen, Supabase anbinden, Login,
Beobachtung mit Foto/Standort/Notiz, Karte und Liste.
Erst wenn eine Etappe läuft, beginnt die nächste.

## Regeln
- Alle Daten sind privat: jede Tabelle hat user_id und eine RLS-Regel.
- Ereignisse haben ein Feld typ (für spätere Brutzeit-Vorlagen).
- Mobile first.
- Speichern muss auch ohne GPS gehen; Ort per Klick auf die Karte wählbar.
- Nutzereingaben nie per innerHTML ausgeben.
- Kleine Schritte: pro Session eine Funktion – planen, bauen, testen, committen.
- Kommunikation auf Deutsch.

## Lernmodus
Ich möchte beim Bauen lernen. Hintergrund: HTML und CSS mittel, JavaScript gering;
Frameworks, Datenbanken und Git nur Grundlagen. Ich habe wenig und unregelmäßig Zeit.
Schwerpunkt: das Zusammenspiel von HTML, CSS und JS sowie die JS-Syntax.
- Erkläre Konzepte, bevor du sie umsetzt, und erkläre JS-Syntax ausführlich.
- Lass mich wichtige Teile selbst schreiben: Gerüst und Hinweise statt fertiger Lösungen,
  danach reviewst du meinen Code.
- Begründe Entscheidungen kurz und nenne Alternativen.
- Halte Sessions kurz und fasse am Ende zusammen, was neu war (für LERNNOTIZEN.md).
