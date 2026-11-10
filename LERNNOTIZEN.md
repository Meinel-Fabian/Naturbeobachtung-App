# Lernnotizen

Zum Nachschlagen: Was war neu, was will ich mir merken?
Claude trägt nach jeder Session ein. Neue Einträge kommen oben dazu.

---

## Session 1 – React-Projekt und erste Komponente (10.11.2026)

**Ergebnis:** React-App mit Vite und TypeScript läuft, eigene Komponente
`BeobachtungsEintrag` zeigt zwei Beobachtungen an. Gemergt als PR #5.

### Warum React + TypeScript

- React ist am Markt am gefragtesten, gut fürs Portfolio.
- TypeScript = JavaScript mit Typen, knüpft an C# an.
- App Store später über Capacitor (verpackt die Web-App).

### Projekt anlegen und starten

| Befehl | Was er macht |
| --- | --- |
| `npm create vite@latest .` | Neues Projekt im aktuellen Ordner |
| `npm install` | Bibliotheken laut `package.json` herunterladen |
| `npm run dev` | Dev-Server starten → http://localhost:5173 |
| `Strg+C` | Laufendes Programm im Terminal beenden |

- Der Dev-Server belegt sein Terminal → zweites Terminal mit **Strg+Umschalt+Ö**.
- **Hot Module Replacement:** Speichern → Browser aktualisiert sich ohne Neuladen,
  State bleibt erhalten.

### Wie HTML, CSS und JS zusammenhängen

```
index.html          <div id="root"> + lädt main.tsx
  └─ main.tsx       hängt <App /> in #root (einziges getElementById)
       └─ App.tsx   meine Komponenten
```

### Komponente

```tsx
function Buch({ titel, seiten }: BuchProps) {
  return (
    <article>
      <h2>{titel}</h2>
      <p>{seiten} Seiten</p>
    </article>
  );
}
export default Buch;
```

- Eine Komponente ist eine **Funktion, die JSX zurückgibt**. Name mit Großbuchstabe.
- **JSX:** HTML-ähnlich im Code. `className` statt `class`. Werte in `{ }`.
- Nur **ein** äußerstes Element zurückgeben. Mehrere nebeneinander → Fragment `<>…</>`.
- Dateien mit JSX heißen `.tsx`.

### Props (Daten an eine Komponente übergeben)

```tsx
interface BuchProps {
  titel: string;
  seiten: number;
}

<Buch titel="Momo" seiten={304} />   // Text in "", alles andere in { }
```

- Wie Konstruktor-Parameter in C#.
- **Richtung:** Werte gehen von außen (App) hinein. Ausgepackt wird nur in der Komponente.
- Import: `import Buch from './components/Buch'`

### State

```tsx
const [count, setCount] = useState(0);
setCount((alterWert) => alterWert + 1);
```

- `useState` liefert Wert + Setter. `0` ist nur der Startwert.
- State **nie direkt ändern**, immer über den Setter. Nur so weiß React, dass es
  neu zeichnen muss (wie `INotifyPropertyChanged` in C#).
- Bei jedem Setter-Aufruf läuft die ganze Komponenten-Funktion neu.

### TypeScript / JavaScript-Syntax

| TypeScript | C# |
| --- | --- |
| `const art: string = 'Specht';` | `string art = "Specht";` (Typ steht hinten) |
| `const` / `let` | nicht neu zuweisbar / neu zuweisbar |
| `() => wert + 1` | Lambda `() => wert + 1` |
| `const [a, b] = liste` | Tuple-Dekonstruktion `var (a, b) = …` |
| `const { a, b } = objekt` | Objekt auspacken (Destructuring) |
| `Symbol.iterator` | `IEnumerable` |

### Fehlerbilder, die ich schon hatte

- **`return` allein in der Zeile** → gibt nichts zurück. Klammer `(` direkt dahinter.
- **„must have a [Symbol.iterator]()“** → versucht, etwas mit `[ ]` auszupacken,
  das keine Liste ist.
- **„cannot be a descendant of <p>“** → Block-Elemente (`div`, `h2`, `p`, `article`)
  dürfen nicht in ein `<p>`.
- **„declared but never read“** → Variable wird nirgends benutzt.

### Werkzeuge

- **ESLint:** prüft Code auf Fehler und schlechten Stil (wie Roslyn-Analyzer).
- **F2** in VS Code: überall umbenennen. **F12** im Browser: Konsole mit Fehlern.
- **LF / CRLF:** unterschiedliche Zeilenenden Linux/Windows. Die Warnung bei
  `git add` ist harmlos.

### Git

- Neuer Branch: `git checkout -b name`
- Erster Push eines Branches: `git push -u origin name`, danach reicht `git push`
- Prüfen, ob gepusht: `git status` → „up to date with origin/…“
- `node_modules/` gehört nie ins Git (steht in `.gitignore`).

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
