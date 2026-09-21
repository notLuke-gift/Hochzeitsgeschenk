# Hochzeitsgeschenk-Website 💍

Eine kleine, edle Website, die euer Hochzeitsgeschenk vorstellt: zwei
Restaurantbesuche zur Auswahl aus vier vorgestellten Restaurants.

Die Seite ist reines HTML/CSS/JavaScript – **kein Build-Prozess, keine
Installation nötig**. Einfach Dateien öffnen bzw. bearbeiten.

## Seitenstruktur

```
index.html                     ← Landingpage (Geschenk-Story + 4 Restaurant-Karten)
restaurants/
  restaurant-1.html            ← Detailseite Restaurant 1 (Fotos + Speisekarte)
  restaurant-2.html
  restaurant-3.html
  restaurant-4.html
assets/
  css/styles.css                ← gesamtes Design (Farben, Schrift, Layout)
  js/main.js                    ← Mobile-Menü, Scroll-Animation, Foto-Lightbox
  images/
    hero/hero.jpg                ← großes Titelbild auf der Landingpage
    restaurant-1/ ... -4/        ← Fotos je Restaurant (siehe unten)
```

## 1. Texte anpassen

Öffnet `index.html` und die vier Dateien in `restaurants/` mit einem
Texteditor (z. B. VS Code, Notepad++ oder sogar Windows-Editor) und
ersetzt die Platzhalter:

- `[Name]` / `[Eure Namen]` → eure echten Namen
- "Restaurant Eins/Zwei/Drei/Vier" → echte Restaurantnamen
- "Name des Restaurants", Adresse, Küche, Website-Link → echte Angaben
- Beschreibungstexte (in `<p>`-Tags) → eigene Texte

## 2. Fotos hinzufügen

Für jedes Restaurant liegt ein Ordner unter `assets/images/restaurant-1`
bis `restaurant-4` bereit. Legt dort eure Fotos **exakt mit diesen
Dateinamen** ab (JPG oder PNG, aber dann Endung in den HTML-Dateien
entsprechend anpassen falls .png):

| Datei      | Verwendung                                    |
|------------|------------------------------------------------|
| `hero.jpg` | großes Banner-Bild oben auf der Restaurantseite |
| `1.jpg` … `6.jpg` | Bilder in der Galerie (6 Stück vorgesehen) |
| `teaser.jpg` | kleines Vorschaubild auf der Landingpage-Karte |

Zusätzlich: `assets/images/hero/hero.jpg` ist das große Titelbild der
Landingpage.

**Mehr oder weniger als 6 Fotos?** Kopiert in der jeweiligen
`restaurant-X.html` im Abschnitt `<!-- GALERIE -->` einfach einen
`<div class="gallery-item ...">`-Block und passt die Nummer/den Dateinamen
an, oder löscht überflüssige Blöcke.

**Fehlt ein Bild noch?** Kein Problem – die Seite zeigt automatisch einen
dezenten Platzhalter ("Bild folgt") statt eines kaputten Bild-Symbols.
Sobald die Datei mit passendem Namen im Ordner liegt, erscheint das Foto
automatisch beim nächsten Neuladen der Seite.

## 3. Speisekarte anpassen

Die Speisekarte ist als Textliste direkt im HTML jeder Restaurantseite im
Abschnitt `<!-- SPEISEKARTE -->` hinterlegt (keine Bilder/PDFs nötig).

Aufbau pro Gericht:

```html
<div class="menu-item">
  <div class="menu-item-info">
    <h4>Gerichtname</h4>
    <p>Kurze Beschreibung (optional, kann auch weggelassen werden)</p>
  </div>
  <span class="menu-item-price">12,50 €</span>
</div>
```

- Kategorien (`<div class="menu-category">`) z. B. Vorspeisen,
  Hauptgerichte, Desserts, Getränke – könnt ihr beliebig umbenennen,
  hinzufügen oder entfernen.
- Zum Hinzufügen eines Gerichts: einen bestehenden `.menu-item`-Block
  kopieren, Text/Preis anpassen.
- Zum Entfernen: den ganzen `.menu-item`-Block löschen.
- Die Zeile `<p class="menu-note">Alle Preise inkl. MwSt. ...</p>` am Ende
  könnt ihr anpassen oder löschen.

## 4. Website lokal ansehen

Am einfachsten öffnet ihr `index.html` per Doppelklick im Browser.

Für die beste Erfahrung (falls z. B. Bilder nicht laden sollten) empfiehlt
sich ein lokaler Server. Mit installiertem Python:

```bash
cd Melina
python -m http.server 8080
```

Dann im Browser `http://localhost:8080` öffnen.

Alternativ mit Node.js:

```bash
npx serve .
```

## 5. Design anpassen (optional)

Die komplette Farbwelt lässt sich zentral in
`assets/css/styles.css` oben im Abschnitt `:root { ... }` ändern, z. B.:

```css
--color-gold: #c9a227;   /* Akzentfarbe */
--color-bg: #faf6ef;     /* Haupt-Hintergrund */
```

## 6. Online veröffentlichen (optional)

Die fertige Seite lässt sich kostenlos hosten, z. B. über:

- **Netlify** (Ordner per Drag & Drop hochladen auf app.netlify.com/drop)
- **GitHub Pages** (Repository erstellen, Dateien hochladen, Pages aktivieren)

Bei Bedarf einfach Bescheid geben – das lässt sich leicht einrichten.
