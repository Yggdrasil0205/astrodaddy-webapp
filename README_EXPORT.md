# HappyAger Website - Lokales Setup Guide

## 📦 Voraussetzungen

Installiere auf deinem Computer:
- **Node.js** (Version 18 oder höher) - [Download](https://nodejs.org/)
- **pnpm** (Package Manager) - Nach Node.js Installation ausführen:
  ```bash
  npm install -g pnpm
  ```

## 🚀 Schritt-für-Schritt Installation

### 1. Projekt-Ordner erstellen
```bash
mkdir happyager-website
cd happyager-website
```

### 2. Alle Dateien kopieren
Kopiere **alle** Dateien aus Figma Make in diesen Ordner. Die Struktur sollte so aussehen:

```
happyager-website/
├── package.json
├── vite.config.ts
├── postcss.config.mjs
├── index.html
├── src/
│   ├── main.tsx
│   ├── app/
│   ├── imports/
│   └── styles/
```

### 3. Fehlende Dateien erstellen

**A) index.html** (im Root-Verzeichnis):
```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HappyAger - Markus Miersbe</title>
    <meta name="description" content="HappyAger mit Markus Miersbe - Glücklich und gesund altern" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**B) src/main.tsx**:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 4. Dependencies installieren
```bash
pnpm install
```

Das installiert alle notwendigen Pakete (React, Tailwind, Motion, etc.)

### 5. Development Server starten
```bash
pnpm dev
```

Die Website läuft jetzt auf: **http://localhost:5173**

### 6. Production Build erstellen
```bash
pnpm build
```

Erstellt optimierte Dateien im `/dist` Ordner für Deployment.

## 📁 Wichtige Dateien zum Bearbeiten

### Design & Styling
- `/src/styles/theme.css` - Farben und Design-Tokens
- `/src/styles/tailwind.css` - Tailwind-Konfiguration
- `/src/app/components/ui/button.tsx` - Button-Styles (Glass Effect)

### Komponenten
- `/src/app/components/Navigation.tsx` - Header & Navigation
- `/src/app/components/CartDropdown.tsx` - Warenkorb
- `/src/app/components/AnimatedDNA.tsx` - DNA-Animation

### Seiten
- `/src/app/pages/Home.tsx` - Startseite
- `/src/app/pages/Shop.tsx` - Shop-Übersicht
- `/src/app/pages/ProductDetail.tsx` - Produktdetails
- `/src/app/pages/Checkout.tsx` - Checkout
- `/src/app/pages/Login.tsx` - Login

### Daten
- `/src/app/data/products.ts` - Alle Produkte (Preise, Beschreibungen, etc.)
- `/src/app/context/CartContext.tsx` - Warenkorb-Logic
- `/src/app/context/AuthContext.tsx` - Login-Logic

### Routing
- `/src/app/routes.ts` - Alle URLs/Routen

## 🎨 Anpassungen vornehmen

### Logo-Farben ändern
In `/src/app/components/HappyAgerLogo.tsx`:
```tsx
// Aktuelle Farben:
// Pfirsich: #F9C4B5
// Violett: #8268AB
// Lavendel: #BFADD5
```

### Produkte hinzufügen/bearbeiten
In `/src/app/data/products.ts`:
```typescript
export const products: Product[] = [
  {
    id: 7, // Neue ID
    name: 'Neues Produkt',
    description: 'Beschreibung...',
    price: 39.90,
    priceFormatted: '39,90€',
    // ...
  }
];
```

### Buttons anpassen
In `/src/app/components/ui/button.tsx` die `buttonVariants` bearbeiten.

## 🌐 Deployment

### Option 1: Vercel (Empfohlen)
1. GitHub Repository erstellen
2. Projekt hochladen
3. Bei [Vercel](https://vercel.com) anmelden
4. Repository verknüpfen
5. Automatisches Deployment bei jedem Git Push

### Option 2: Netlify
1. Build erstellen: `pnpm build`
2. Bei [Netlify](https://netlify.com) anmelden
3. `/dist` Ordner hochziehen (Drag & Drop)

### Option 3: Eigener Server
1. Build erstellen: `pnpm build`
2. `/dist` Ordner auf Server hochladen
3. Als statische Website hosten

## 🔧 Troubleshooting

**Problem: Bilder werden nicht angezeigt**
- Prüfe ob Unsplash-URLs noch funktionieren
- Ersetze ggf. mit lokalen Bildern im `/public` Ordner

**Problem: Module not found**
```bash
pnpm install
# oder alles neu installieren:
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Problem: Port bereits belegt**
```bash
pnpm dev --port 3000
```

## 📚 Technologie-Stack

- **React 18.3** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animationen
- **React Router 7** - Navigation
- **Lucide React** - Icons
- **Radix UI** - UI Primitives

## 💡 Tipps

1. **VS Code Extensions:**
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - Prettier

2. **Code formatieren:**
   ```bash
   pnpm add -D prettier
   pnpm prettier --write "src/**/*.{ts,tsx}"
   ```

3. **TypeScript Errors beheben:**
   ```bash
   pnpm tsc --noEmit
   ```

## 📞 Support

Bei Fragen zur Bearbeitung:
1. Prüfe die offizielle [React Docs](https://react.dev)
2. [Tailwind CSS Docs](https://tailwindcss.com)
3. [Motion Docs](https://motion.dev)

Viel Erfolg mit deiner HappyAger Website! 🎉
