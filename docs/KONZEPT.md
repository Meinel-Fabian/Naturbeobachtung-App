# Naturbeobachtungs-App – Konzept & Roadmap

Nov 10, 2026 · @Fabi

## Vision

Eine private App für Naturfotografen, Beobachter und Hobby-Naturkundler: Beobachtungen unterwegs mit Foto, Standort und Notiz festhalten und daraus Projekte planen, damit kein wichtiger Moment verpasst wird.

Bestehende Apps wie iNaturalist oder Observation.org sind aufs Melden und Teilen ausgelegt. Diese App ist aufs **Planen und Dranbleiben** ausgelegt.

**Grundsätze**

- **Privat:** Jeder sieht nur seine eigenen Daten. Es gibt kein Teilen und keine öffentlichen Standorte.
- **Für unterwegs:** Gebaut fürs Handy, Erfassen in wenigen Sekunden.
- **Geräteübergreifend:** Was am Handy erfasst wird, ist am PC sofort da.

## Beispiel: das Buntspecht-Nest

So soll sich die App im Alltag anfühlen:

1. **Entdecken:** Ein Fotograf findet im März eine Bruthöhle, an der ein Buntspecht gerade baut.
2. **Erfassen:** Er macht in der App ein Foto. Standort und Zeitpunkt werden automatisch gespeichert. Er tippt „Buntspecht“ als Art und notiert „Höhle ca. 4 m hoch, Eiche am Waldrand“.
3. **Umwandeln:** Mit einem Klick wird daraus das Projekt „Buntspecht-Nest Waldrand“.
4. **Planen:** Er trägt Ereignisse ein: voraussichtliche Eiablage, Schlupf, Ausfliegen. Dazu ein Ziel: „Fütterungsfoto Anfang Juni“.
5. **Erinnert werden:** Die App meldet sich rechtzeitig vor jedem Termin.
6. **Dokumentieren:** Bei jedem Besuch hängt er neue Beobachtungen ans Projekt. So entsteht eine Chronik der Brut.

## Funktionsumfang

| Bereich | Was es kann |
| --- | --- |
| Konto | Registrieren, Einloggen, Passwort zurücksetzen. Daten auf allen Geräten synchron. |
| Beobachtungen | Foto aufnehmen oder hochladen, Standort automatisch (manuell korrigierbar per Klick auf die Karte), Art, Datum, Notizen. |
| Karte und Liste | Alle Beobachtungen auf einer Karte und als Liste, filterbar nach Art und Zeitraum. |
| Projekte | Beobachtung in ein Projekt umwandeln, weitere Beobachtungen anhängen, Chronik als Zeitleiste. |
| Kalender | Ereignisse pro Projekt (mit Typ wie Eiablage, Schlupf, Ausfliegen, Eigenes), Gesamtkalender über alle Projekte. |
| Ziele | Ziele pro Projekt setzen und abhaken, z. B. ein bestimmtes Foto. |
| Erinnerungen | Push-Benachrichtigung vor Ereignissen und Zielen. |
| Offline | Erfassen ohne Netz, Synchronisierung sobald wieder online. |

**Bewusst nicht enthalten:** Teilen mit anderen, öffentliche Profile, Artbestimmung per KI.

**Später möglich:** Brutzeit-Vorlagen pro Art, die Ereignisse automatisch vorschlagen. Dafür haben Ereignisse von Anfang an ein Feld `typ`.

## Technische Architektur

Die App wird eine **PWA** (Progressive Web App) mit **Supabase** als Backend. Login, Datenbank, Foto-Speicher und Sync kommen fertig von Supabase, eigener Code entsteht vor allem im Frontend.

| Baustein | Technik | Wofür |
| --- | --- | --- |
| Frontend | React + TypeScript mit Vite | Oberfläche, Formulare, Kalender |
| Karte | Leaflet (über react-leaflet) + OpenStreetMap | Wie im Prototyp, Wissen wird übernommen |
| App-Verhalten | PWA mit Service Worker | Installierbar aufs Handy, offline nutzbar, Push |
| Login | Supabase Auth | E-Mail und Passwort, Sitzungen, Passwort-Reset |
| Datenbank | Supabase PostgreSQL (+ PostGIS für Geodaten) | Beobachtungen, Projekte, Ereignisse |
| Rechte | Row Level Security | Jeder Nutzer sieht nur Zeilen mit seiner `user_id` |
| Fotos | Supabase Storage | Bilder, verkleinert beim Hochladen |
| Hosting | Statisches Hosting (z. B. Vercel oder Netlify) | Frontend ausliefern, HTTPS inklusive |
| App Store (später) | Capacitor | Web-App als iOS- und Android-App verpacken, beim Prototyp schon erprobt |

**Warum so:** Login und Passwort-Sicherheit selbst zu bauen ist fehleranfällig. Supabase nimmt das ab, und du lernst trotzdem echtes SQL, Datenbankdesign und Rechte-Regeln. Ein eigener Server bleibt später möglich, weil die Datenbank ganz normales PostgreSQL ist.

**Warum React + TypeScript:** Das Projekt soll auch als Portfolio für den Berufseinstieg dienen. React ist am Markt am gefragtesten, TypeScript ist in neuen Projekten Standard und knüpft an C# an (statische Typen, gleicher Erfinder). Vite statt Next.js, weil es schlanker ist und weniger eigene Konzepte mitbringt. Svelte wäre zum Lernen etwas einfacher gewesen, ist aber weniger verbreitet.

**Datenschutz:** Supabase-Projekt in der Region Frankfurt anlegen, damit die Daten in der EU liegen. Für eine öffentlich erreichbare App braucht es ein Impressum und eine Datenschutzerklärung.

## Datenmodell

Fünf Tabellen reichen für alle Etappen. Jede Tabelle hat eine `user_id`, über die die Rechte-Regeln greifen. Benutzer selbst verwaltet Supabase Auth.

| Tabelle | Wichtige Felder | Gehört zu |
| --- | --- | --- |
| `beobachtungen` | id, user_id, art, notiz, beobachtet_am, standort (Koordinaten), projekt_id (optional) | Nutzer, optional ein Projekt |
| `fotos` | id, user_id, beobachtung_id, speicherpfad, aufgenommen_am | eine Beobachtung |
| `projekte` | id, user_id, titel, beschreibung, status (aktiv / abgeschlossen), erstellt_aus_beobachtung_id | Nutzer |
| `ereignisse` | id, user_id, projekt_id, typ (eiablage, schlupf, ausfliegen, eigenes …), titel, datum, erinnerung_am, notiz | ein Projekt |
| `ziele` | id, user_id, projekt_id, titel, zieldatum, erledigt | ein Projekt |

**Beziehungen:** Ein Projekt hat viele Beobachtungen, Ereignisse und Ziele. Eine Beobachtung hat beliebig viele Fotos. Eine Beobachtung ohne `projekt_id` ist eine lose Einzelbeobachtung.

Das Schema ist ein Startpunkt. Feldnamen und Details werden beim Bauen in Etappe 1 festgezurrt.

## Roadmap

Sechs Etappen, jede endet mit etwas, das im Alltag nutzbar ist. Erst wenn eine Etappe läuft, beginnt die nächste.

| Etappe | Inhalt | Ergebnis | Was du dabei lernst |
| --- | --- | --- | --- |
| 1. Fundament | Projekt aufsetzen, Supabase anbinden, Login, Beobachtung mit Foto, Standort und Notiz, Karte und Liste | Die heutige App, aber gespeichert und auf allen Geräten | Framework-Grundlagen, SQL-Tabellen, Auth, Row Level Security, Datei-Upload |
| 2. Projekte | Beobachtung in Projekt umwandeln, Beobachtungen anhängen, Chronik | Ein Nest lässt sich über Wochen begleiten | Beziehungen zwischen Tabellen, Routing, Detailseiten |
| 3. Kalender und Ziele | Ereignisse und Ziele pro Projekt, Gesamtkalender | Alle Termine auf einen Blick | Datumslogik, Kalender-Komponenten, Formulare mit Validierung |
| 4. Erinnerungen | Push-Benachrichtigungen vor Ereignissen | Die App meldet sich von selbst | Service Worker, Web Push, geplante Aufgaben auf dem Server |
| 5. Offline und Feinschliff | Offline erfassen, Sync, Handy-Layout, Export als CSV | Im Wald ohne Netz nutzbar | Lokale Datenbank im Browser, Konfliktbehandlung, responsives Design |
| 6. Später | Brutzeit-Vorlagen pro Art, App-Store-Version per Capacitor | Termine werden vorgeschlagen, App im Store | Datenpflege, Vorschlagslogik, App-Veröffentlichung |

**Faustregel für jede Etappe:** planen, in kleinen Schritten bauen, testen, committen. Lieber eine kleine Funktion fertig als drei halb.

## Ausgangslage: der Prototyp

Der Prototyp ([GitHub](https://github.com/Meinel-Fabian/Naturbeobachtung-App), Stand August 2025) ist reines HTML, CSS und JavaScript mit Leaflet, rund 230 Zeilen in drei Dateien. Die neue App wird neu aufgesetzt, der Prototyp bleibt als Referenz.

**Wird übernommen:** die Idee, das Formular (Art, Beschreibung, Ort, Datum), die Leaflet-Karte und das automatische Ermitteln des Standorts. Außerdem die Erfahrung mit Capacitor: Der Prototyp lief damit schon als App auf einem Testhandy.

**Lehren aus dem Prototyp, die in der neuen App gelöst sein sollen:**

- Daten waren nach einem Neuladen weg → Speicherung in der Datenbank.
- Ohne Standortfreigabe passierte beim Speichern nichts → Speichern muss auch ohne GPS gehen.
- Der Marker landete immer an der aktuellen Position → Ort per Klick auf die Karte wählbar.
- Nutzereingaben gingen ungefiltert in `innerHTML` → das Framework übernimmt das sichere Darstellen.
- Die Karte war breiter als die Seite → von Anfang an fürs Handy gestalten.

**Vorschlag:** neues Repository anlegen oder den Prototyp in einen Ordner `prototyp/` verschieben und im selben Repository neu beginnen.

## Arbeitsweise mit Claude Code und Lernfokus

Ziel ist nicht nur eine fertige App, sondern dabei möglichst viel zu lernen. Claude soll deshalb erklären, anleiten und dich selbst schreiben lassen, statt alles allein zu bauen.

**Mein Hintergrund**

- Ausbildung: Umschulung zum Anwendungsentwickler, Schwerpunkt C#. Danach 2 Jahre Trainer beim Umschulungsunternehmen.
- Erfahrung mit HTML, CSS, JavaScript: HTML mittel, CSS mittel, JavaScript gering. Keine Erfahrung in Webentwicklung.
- Erfahrung mit Frameworks, Datenbanken, Git: nur Grundlagen.
- Was ich besonders lernen möchte: die Verbindung von HTML, CSS und JS sowie die JS/TS-Syntax.
- Ziel: Berufseinstieg als Entwickler. Das Projekt soll auf GitHub vorzeigbar sein.
- Wie viel Zeit ich pro Woche habe: relativ wenig und sporadisch.

**So arbeitest du lernorientiert**

- **Erst erklären lassen, dann bauen:** „Erklär mir, wie Row Level Security funktioniert, bevor wir die Regeln schreiben.“
- **Selbst schreiben, Claude prüft:** „Gib mir nur das Gerüst und Hinweise, die Funktion schreibe ich selbst. Danach reviewst du.“
- **Nach dem Warum fragen:** Bei jeder Entscheidung kurz begründen lassen, und Alternativen nennen lassen.
- **Lernstil einstellen:** In Claude Code gibt es Ausgabestile (`/output-style`), darunter einen Lernmodus, in dem Claude Stellen offen lässt, die du selbst programmierst.
- **Kleine Schritte:** Pro Session eine Funktion. Plan Mode nutzen, dann umsetzen, testen, committen.
- **Lernnotizen führen:** Eine Datei `LERNNOTIZEN.md`, in die du nach jeder Session einträgst, was neu war.

**Start für die `CLAUDE.md`** (ins neue Projekt kopieren und ergänzen)

```markdown
# Naturbeobachtungs-App

Private PWA für Naturfotografen: Beobachtungen mit Foto, Standort und Notiz erfassen
und daraus Projekte mit Kalender, Ereignissen und Zielen planen.
Konzept und Roadmap: siehe docs/KONZEPT.md.

## Stack
React + TypeScript (Vite), Leaflet, Supabase (Auth, PostgreSQL + PostGIS, Storage, RLS), Region Frankfurt.

## Aktuelle Etappe
Etappe 1: Fundament (Login, Beobachtung mit Foto/Standort/Notiz, Karte und Liste)

## Regeln
- Alle Daten sind privat: jede Tabelle hat user_id und eine RLS-Regel.
- Ereignisse haben ein Feld typ (für spätere Brutzeit-Vorlagen).
- Mobile first.

## Lernmodus
Ich möchte beim Bauen lernen. Hintergrund: siehe docs/KONZEPT.md, Abschnitt „Mein Hintergrund“.
- Erkläre Konzepte, bevor du sie umsetzt.
- Lass mich wichtige Teile selbst schreiben und gib Hinweise statt fertiger Lösungen.
- Begründe Entscheidungen kurz und nenne Alternativen.
```

**Erster Auftrag in Claude Code**, sobald der Hintergrund eingetragen ist:

> „Lies die CLAUDE.md. Lass uns Etappe 1 im Plan Mode planen: Welche Schritte, in welcher Reihenfolge, und was lerne ich bei jedem? Noch keinen Code schreiben.“
