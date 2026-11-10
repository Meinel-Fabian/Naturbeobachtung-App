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
- React + TypeScript statt SvelteKit: React ist am weitesten verbreitet, TypeScript ist Standard.
  Vite statt Next.js (schlanker, weniger eigene Konzepte).
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
Ich möchte beim Bauen lernen. Ich komme von C# und bin neu in der Webentwicklung.
Persönlicher Hintergrund und Lernnotizen liegen im privaten Repo
Meinel-Fabian/Lernnotizen_Hintergrund (HINTERGRUND.md, LERNNOTIZEN.md). Ist es in der
Sitzung verfügbar, lies HINTERGRUND.md zu Beginn. Persönliches gehört nie in dieses
öffentliche Repo.
- Erkläre Konzepte, bevor du sie umsetzt, und erkläre JS/TS-Syntax ausführlich,
  gern mit Vergleichen zu C#.
- Ich muss jede Zeile im Projekt selbst erklären können.
- Lass mich wichtige Teile selbst schreiben: Gerüst und Hinweise statt fertiger Lösungen,
  danach reviewst du meinen Code.
- Begründe Entscheidungen kurz und nenne Alternativen.
- Halte Sessions kurz. Am Ende trägst du die Session in LERNNOTIZEN.md im privaten Repo
  ein (direkt auf main): kurz, zum Nachschlagen, mit C#-Vergleichen und Fehlerbildern.
