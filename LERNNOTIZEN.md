# Lernnotizen

Nach jeder Session eintragen: Was war neu? Was will ich mir merken?
Neue Einträge kommen oben dazu.

---

## Session 0 – Werkzeuge prüfen (10.11.2026)

**Ergebnis:** Alle Werkzeuge für Etappe 1 sind installiert.

| Werkzeug | Version | Wofür |
| --- | --- | --- |
| Node.js | 24.11.1 | Lässt JavaScript außerhalb des Browsers laufen |
| npm | 11.6.2 | Paketmanager, lädt Bibliotheken ins Projekt |
| Git | 2.50.1 | Versionsverwaltung |
| VS Code | 1.106.2 | Editor |

**Neu gelernt**

- **Node.js:** JavaScript lief ursprünglich nur im Browser. Node lässt es auch direkt
  auf dem Computer laufen. Die App selbst läuft später im Browser, aber die Werkzeuge
  drumherum (Dev-Server, Build) sind in JavaScript geschrieben und brauchen Node.
- **npm:** kommt mit Node mit. Lädt Bibliotheken wie Svelte, Leaflet oder Supabase herunter.
- **`<befehl> --version`:** prüft, ob ein Programm installiert ist und im Terminal gefunden wird.
- **Ordnernamen ohne Leerzeichen** wählen, manche Werkzeuge kommen damit nicht klar.

**Git-Ablauf mit Pull Request**

1. Änderungen auf einem eigenen **Branch** machen (nicht direkt auf `master`).
2. Branch pushen und einen **Pull Request** öffnen.
3. Unter „Files changed“ prüfen, was sich ändert (grün = neu, rot = entfernt).
4. **Merge pull request** → Änderungen landen in `master`. Danach Branch löschen.
5. Lokal holen: `git checkout master` und `git pull`.
