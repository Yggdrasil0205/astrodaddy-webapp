# 📂 HappyAger Website - Vollständige Dateistruktur

## 🗂️ Übersicht

```
happyager-website/
│
├── 📄 index.html                    # HTML Entry Point
├── 📄 package.json                  # Dependencies & Scripts
├── 📄 vite.config.ts               # Vite Konfiguration
├── 📄 postcss.config.mjs           # PostCSS Config
├── 📄 README_EXPORT.md             # Diese Anleitung
├── 📄 QUICK_EDIT_GUIDE.md          # Schnell-Bearbeitungs-Guide
│
├── 📁 src/
│   ├── 📄 main.tsx                 # React Entry Point
│   │
│   ├── 📁 app/
│   │   ├── 📄 App.tsx              # Haupt-App-Komponente
│   │   ├── 📄 Root.tsx             # Layout Wrapper (mit Providers)
│   │   ├── 📄 routes.ts            # Alle Routen/URLs
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── 📄 Navigation.tsx          # Header & Navigation
│   │   │   ├── 📄 CartDropdown.tsx        # Warenkorb Dropdown
│   │   │   ├── 📄 GlassCard.tsx           # Glass-Effekt Karte
│   │   │   ├── 📄 HappyAgerLogo.tsx       # Logo-Komponente
│   │   │   ├── 📄 AnimatedDNA.tsx         # DNA-Animation
│   │   │   │
│   │   │   ├── 📁 ui/                     # UI Basis-Komponenten
│   │   │   │   ├── 📄 button.tsx          # Button (mit Glass Effect)
│   │   │   │   ├── 📄 badge.tsx
│   │   │   │   ├── 📄 card.tsx
│   │   │   │   ├── 📄 input.tsx
│   │   │   │   ├── 📄 dialog.tsx
│   │   │   │   ├── 📄 dropdown-menu.tsx
│   │   │   │   └── ... (30+ weitere UI Komponenten)
│   │   │   │
│   │   │   └── 📁 figma/
│   │   │       └── 📄 ImageWithFallback.tsx  # Bild-Komponente
│   │   │
│   │   ├── 📁 context/
│   │   │   ├── 📄 AuthContext.tsx         # Login/Auth State
│   │   │   └── 📄 CartContext.tsx         # Warenkorb State
│   │   │
│   │   ├── 📁 data/
│   │   │   └── 📄 products.ts             # ALLE Produktdaten
│   │   │
│   │   └── 📁 pages/
│   │       ├── 📄 Home.tsx                # Startseite
│   │       ├── 📄 Shop.tsx                # Shop-Übersicht
│   │       ├── 📄 ProductDetail.tsx       # Einzelprodukt
│   │       ├── 📄 Checkout.tsx            # Checkout/Kasse
│   │       └── 📄 Login.tsx               # Login-Seite
│   │
│   ├── 📁 imports/
│   │   ├── 📄 Ebene1.tsx              # Figma Logo Import
│   │   └── 📄 svg-jk23sxdfzw.ts       # SVG Daten
│   │
│   └── 📁 styles/
│       ├── 📄 index.css               # Haupt-CSS Import
│       ├── 📄 tailwind.css            # Tailwind Import
│       ├── 📄 theme.css               # Design Tokens & Variablen
│       └── 📄 fonts.css               # Font Imports
│
└── 📁 dist/                           # Build Output (nach `pnpm build`)
    └── ... (generierte Dateien)
```

---

## 📋 Datei-Beschreibungen

### 🔧 Konfigurations-Dateien

| Datei | Zweck | Ändern? |
|-------|-------|---------|
| `package.json` | NPM Dependencies & Scripts | ⚠️ Nur für neue Packages |
| `vite.config.ts` | Build Tool Konfiguration | ❌ Nicht nötig |
| `postcss.config.mjs` | CSS Processing | ❌ Nicht nötig |
| `index.html` | HTML Entry Point | ⚠️ Nur für Meta-Tags/Analytics |

### 🎨 Style-Dateien

| Datei | Zweck | Ändern? |
|-------|-------|---------|
| `theme.css` | **Farben, Fonts, Design Tokens** | ✅ JA - Hauptdesign |
| `tailwind.css` | Tailwind Imports | ❌ Nicht ändern |
| `fonts.css` | Google Fonts | ⚠️ Nur für neue Fonts |
| `index.css` | Import aller Styles | ❌ Nicht ändern |

### 📄 Haupt-Seiten

| Datei | Beschreibung | Hauptinhalte |
|-------|--------------|--------------|
| `Home.tsx` | **Startseite** | Hero, Features, Bestseller, Testimonials |
| `Shop.tsx` | **Shop-Übersicht** | Produktgrid, Filter, Suche |
| `ProductDetail.tsx` | **Produktdetailseite** | Beschreibung, Bilder, In Warenkorb |
| `Checkout.tsx` | **Checkout/Kasse** | Formular, Bestellübersicht, Zahlung |
| `Login.tsx` | **Login-Seite** | Login-Formular |

### 🧩 Wichtige Komponenten

| Datei | Beschreibung | Verwendung |
|-------|--------------|------------|
| `Navigation.tsx` | Header & Menü | Alle Seiten |
| `CartDropdown.tsx` | Warenkorb-Dropdown | Navigation |
| `GlassCard.tsx` | Glass-Effekt Container | Überall |
| `HappyAgerLogo.tsx` | Logo-Komponente | Navigation |
| `AnimatedDNA.tsx` | DNA-Helix Animation | Home (HappyAger Reise) |

### 🔄 State Management

| Datei | Beschreibung | Funktionen |
|-------|--------------|------------|
| `CartContext.tsx` | **Warenkorb-Logic** | addToCart, removeFromCart, updateQuantity |
| `AuthContext.tsx` | **Login-Logic** | login, logout, isAuthenticated |

### 📊 Daten

| Datei | Beschreibung | Struktur |
|-------|--------------|----------|
| `products.ts` | **Alle Produkte** | id, name, price, image, description, category, etc. |

### 🎯 Routing

| Datei | Beschreibung | Routes |
|-------|--------------|--------|
| `routes.ts` | **Alle URL-Pfade** | /, /shop, /product/:id, /checkout, /login |

---

## 📝 Welche Dateien MUSST du bearbeiten?

### ✅ HÄUFIG BEARBEITEN:

1. **`/src/app/data/products.ts`** 
   - Produkte hinzufügen/ändern/löschen

2. **`/src/app/pages/Home.tsx`** 
   - Startseiten-Texte & Inhalte

3. **`/src/styles/theme.css`** 
   - Farben & Design-Tokens

4. **`/src/app/components/Navigation.tsx`** 
   - Menü-Links ändern

### ⚠️ MANCHMAL BEARBEITEN:

5. **`/src/app/pages/Shop.tsx`** 
   - Shop-Layout anpassen

6. **`/src/app/pages/ProductDetail.tsx`** 
   - Produktseiten-Layout

7. **`/src/app/routes.ts`** 
   - Neue Seiten hinzufügen

8. **`/index.html`** 
   - Meta-Tags, Analytics

### ❌ NICHT BEARBEITEN:

- `/src/main.tsx` - Entry Point
- `/vite.config.ts` - Build Config
- `/src/styles/tailwind.css` - Tailwind Import
- UI Komponenten in `/src/app/components/ui/` (außer button.tsx)

---

## 🎯 Workflow für Änderungen

### 1️⃣ TEXTE ÄNDERN
→ Gehe zur entsprechenden Page-Datei (Home.tsx, Shop.tsx, etc.)

### 2️⃣ FARBEN ÄNDERN
→ Bearbeite `/src/styles/theme.css`

### 3️⃣ PRODUKTE ÄNDERN
→ Bearbeite `/src/app/data/products.ts`

### 4️⃣ NEUE SEITE ERSTELLEN
1. Erstelle `/src/app/pages/NeueSeite.tsx`
2. Füge Route in `/src/app/routes.ts` hinzu
3. Füge Link in `/src/app/components/Navigation.tsx` hinzu

### 5️⃣ BILDER ÄNDERN
- Produkte: `/src/app/data/products.ts`
- Logo: `/src/app/components/HappyAgerLogo.tsx`
- Background: Direkt in den Page-Dateien

---

## 🚀 Schnellstart nach Export

```bash
# 1. In Projekt-Ordner wechseln
cd happyager-website

# 2. Dependencies installieren
pnpm install

# 3. Development Server starten
pnpm dev

# 4. Im Browser öffnen
# http://localhost:5173

# 5. Änderungen vornehmen und speichern (Strg+S)
# → Browser aktualisiert automatisch!

# 6. Production Build erstellen
pnpm build
```

---

## 💡 Tipps

- **VS Code** empfohlen als Editor
- **Browser DevTools** (F12) zum Debuggen
- **Speichere oft** (Strg+S)
- **Teste jeden Change** sofort im Browser
- **Erstelle Backups** vor großen Änderungen

---

Viel Erfolg! 🎉
