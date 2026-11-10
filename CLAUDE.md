# Naturbeobachtungs-App

Private PWA für Naturfotografen: Beobachtungen mit Foto, Standort und Notiz erfassen
und daraus Projekte mit Kalender, Ereignissen und Zielen planen.
Konzept und Roadmap: siehe docs/KONZEPT.md.
Der alte Prototyp (HTML/CSS/JS + Leaflet) liegt in prototyp/ und dient nur als Referenz.

## Stack
React + TypeScript mit Vite, Leaflet (react-leaflet) + OpenStreetMap, PWA mit Service Worker,
Supabase (Auth, PostgreSQL + PostGIS, Storage, Row Level Security), Region Frankfurt.
Hosting statisch (Vercel oder Netlify). Später App Store per Capacitor.

## Aktuelle Etappe
Etappe 1: Fundament – Projekt aufsetzen, Supabase anbinden, Login,
Beobachtung mit Foto/Standort/Notiz, Karte und Liste.
Erst wenn eine Etappe läuft, beginnt die nächste.
Filter nach Art und Zeitraum kommen erst nach Etappe 1.

## Entscheidungen
- React + TypeScript statt SvelteKit: Projekt dient auch als Portfolio für den Berufseinstieg,
  React ist am gefragtesten, TypeScript knüpft an C# an. Vite statt Next.js (schlanker).
- Standort von Anfang an mit PostGIS (geography Point). Speichern als `POINT(laenge breite)`
  (Länge zuerst!), Lesen als Zahlen über `ST_Y` (Breite) und `ST_X` (Länge).

## Regeln
- Alle Daten sind privat: jede Tabelle hat user_id und eine RLS-Regel.
- Ereignisse haben ein Feld typ (für spätere Brutzeit-Vorlagen).
- Mobile first.
- Speichern muss auch ohne GPS gehen; Ort per Klick auf die Karte wählbar.
- Nutzereingaben nie per innerHTML ausgeben.
- Kleine Schritte: pro Session eine Funktion – planen, bauen, testen, committen.
- Kommunikation auf Deutsch.

## Lernmodus
Ich möchte beim Bauen lernen. Hintergrund: Umschulung zum Anwendungsentwickler (C#),
danach 2 Jahre Trainer. HTML und CSS mittel, JavaScript gering, keine Web-Erfahrung;
Frameworks, Datenbanken und Git nur Grundlagen. Ich habe wenig und unregelmäßig Zeit.
Ziel: Berufseinstieg als Entwickler, das Projekt soll auf GitHub vorzeigbar sein.
Schwerpunkt: das Zusammenspiel von HTML, CSS und JS sowie die JS/TS-Syntax.
- Erkläre Konzepte, bevor du sie umsetzt, und erkläre JS/TS-Syntax ausführlich,
  gern mit Vergleichen zu C#.
- Ich muss jede Zeile im Projekt selbst erklären können.
- Lass mich wichtige Teile selbst schreiben: Gerüst und Hinweise statt fertiger Lösungen,
  danach reviewst du meinen Code.
- Begründe Entscheidungen kurz und nenne Alternativen.
- Halte Sessions kurz und fasse am Ende zusammen, was neu war (für LERNNOTIZEN.md).
