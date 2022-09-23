## Codeorganisation

Es gibt die folgenden Ordner

- node_module - darin befinden sich benötigte Bibliotheken. Diesen Ordner müssen Sie sonst nicht weiter beachten
- public - darin befinden sich die html-Dokumente und die Bundle-Dateien, wenn sie erzeugt werden. Sie müssen nur die index.html anpassen. Nach dem Bundeln sind hier auch .js und .css Dateien, diese sollten Sie nicht ändern, da diese automatisch erzeugt werden
- src - darin befinden sich die JavaScript und CSS Dateien, die Sie bearbeiten können. Sie können neue Module zufügen, müssen diese aber dann importieren. Sehen Sie sich die app.js als Beispiel an, dass ist der Einstiegspunkt.

Es gibt auf oberster Ebene noch die weitere Dateien:

- .gitignore - darin wird festgelegt, welche Dateien nicht eingecheckt werden sollen, z.B. weil Sie automatisch erzeugt werden.
- package.json - die Konfigurationsdatei für npm
- package-lock.json - eine weiter Date von npm, in der die genauen Versionen der Abhängigkeiten festgehalten werden
- LICENSE - diese Datei können Sie ignorieren
- README.md - die Datei die Sie gerade lesen

## Nutzung von npm

Wie immer müssen sie am Anfang einmal die Abhängigkeiten installieren:

`npm install`

In der package.json sehen Sie die definierten Skripte:

- `npm run build`
- `npm run start`
- `npm run watch`
- `npm run server

Mit build können Sie das Projekt so bauen, dass alles im public Ordner auf einen Webserver geladen werden kann; das nennt man deploy.
Mit watch können Sie das Projekt automatisch neu bauen lassen, wenn Sie die Dateien ändern. Dazu brauchen Sie einen separaten Webserver - z.B. können Sie das VSCode-Plugin "Live Server" installieren.

Am einfachsten ist es, Sie starten beim Entwickeln den Server von esbuild mit `npm run start`. Dann können Sie die Seite unter http://127.0.0.1:800x/ erreichen und wenn Sie die Seite neu laden, werden die Änderungen an den Dateien übernommen.

### Server für Aufgaben mit Frontend-Router

Für Aufgaben mit Router ist es auch möglich `npm run server` zu nutzen. Der Server ist dann unter http://127.0.0.1:3000/ erreichbar und funktioniert im Prinzip wie bei `npm run start`, allerdings werden nur Datein mit den Endungen .js, .mjs und .css, sowie Dateien aus dem Ordner templates (wenn angelegt) ausgeliefert. Alle anderen Routen liefern die index.html aus; so kann ein Router im Frontend ungestört arbeiten, auch wenn nicht der Root-Pfad aufgerufen wird.

### Git

Bitte einen eigenen Branch erstellen. z.B. "pascal" oder "tim". Das macht die Übersicht leichter!