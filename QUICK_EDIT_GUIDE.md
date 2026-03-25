# 🎨 HappyAger - Quick Edit Cheat Sheet

## ⚡ Schnellbearbeitung - Die wichtigsten Änderungen

### 🎨 FARBEN ÄNDERN
**Datei:** `/src/styles/theme.css`
```css
:root {
  --color-peach: #F9C4B5;     /* Pfirsich */
  --color-violet: #8268AB;    /* Violett */
  --color-lavender: #BFADD5;  /* Lavendel */
  --color-nature: #2D5953;    /* Grün */
}
```

### 🛍️ PRODUKTE BEARBEITEN
**Datei:** `/src/app/data/products.ts`
```typescript
{
  id: 1,
  name: 'Produktname',
  description: 'Kurzbeschreibung',
  price: 49.90,
  priceFormatted: '49,90€',
  image: 'https://...',
  category: 'Nahrungsergänzung',
  details: 'Lange Beschreibung...',
  ingredients: ['Zutat 1', 'Zutat 2'],
  benefits: ['Vorteil 1', 'Vorteil 2']
}
```

### 📝 TEXTE ÄNDERN

**Startseite Überschrift:**
`/src/app/pages/Home.tsx` - Zeile ~86
```tsx
<h1>Deine neue Überschrift</h1>
```

**Navigation Links:**
`/src/app/components/Navigation.tsx` - Zeile ~22
```tsx
<div className="text-2xl font-bold">
  HappyAger
</div>
```

**Footer/Newsletter:**
`/src/app/pages/Home.tsx` - Zeile ~415
```tsx
<h2>Newsletter Überschrift</h2>
<p>Newsletter Text</p>
```

### 🖼️ BILDER ERSETZEN

**Logo:**
`/src/app/components/HappyAgerLogo.tsx`
- Komplette SVG-Komponente

**Produkt-Bilder:**
`/src/app/data/products.ts`
```typescript
image: 'https://images.unsplash.com/...'
// oder lokales Bild:
image: '/images/mein-produkt.jpg'
```

**Hero Background:**
`/src/app/pages/Home.tsx` - Suche nach "background"

### 🔘 BUTTONS STYLEN

**Datei:** `/src/app/components/ui/button.tsx`

**Glass-Effekt stärker/schwächer:**
```tsx
backdrop-blur-xl    // Aktuell
backdrop-blur-2xl   // Stärker
backdrop-blur-lg    // Schwächer
```

**Button-Farben:**
```tsx
className="bg-[#2D5953]/80"  // Grün mit 80% Opazität
className="bg-[#8268AB]/80"  // Violett
className="bg-[#F9C4B5]/80"  // Pfirsich
```

### 🧭 NAVIGATION / ROUTEN

**Neue Seite hinzufügen:**

1. **Seite erstellen:** `/src/app/pages/MeineSeite.tsx`
```tsx
export default function MeineSeite() {
  return <div>Inhalt</div>;
}
```

2. **Route hinzufügen:** `/src/app/routes.ts`
```typescript
{ path: "meine-seite", Component: MeineSeite }
```

3. **Link einfügen:** Irgendwo in einer Komponente
```tsx
<Link to="/meine-seite">Meine Seite</Link>
```

### 💳 PREISE ÄNDERN

**Produkte:**
`/src/app/data/products.ts`
```typescript
price: 49.90,
priceFormatted: '49,90€',
```

**Versandkosten:**
`/src/app/pages/Checkout.tsx` - Zeile ~126
```typescript
const shippingCost = 4.90;
```

### 📱 SOCIAL MEDIA LINKS

**Footer bearbeiten:**
`/src/app/pages/Home.tsx` - am Ende der Datei hinzufügen

```tsx
<div className="flex gap-4">
  <a href="https://instagram.com/..." target="_blank">
    <Button variant="ghost">
      <Instagram /> Instagram
    </Button>
  </a>
</div>
```

### ✨ ANIMATIONEN

**Geschwindigkeit ändern:**
`/src/app/components/AnimatedDNA.tsx`
```tsx
transition={{ duration: 20 }}  // Langsamer
transition={{ duration: 5 }}   // Schneller
```

**Ein/Aus-Animationen:**
```tsx
initial={{ opacity: 0, y: 20 }}    // Start
animate={{ opacity: 1, y: 0 }}     // Ende
transition={{ duration: 0.6 }}     // Dauer
```

### 🔧 HÄUFIGE ANPASSUNGEN

**1. E-Mail Newsletter-Funktion einbauen:**
`/src/app/pages/Home.tsx` - Zeile ~425
```tsx
<form onSubmit={(e) => {
  e.preventDefault();
  const email = e.target.email.value;
  // Hier API-Call zu deinem Newsletter-Service
  console.log('Newsletter:', email);
}}>
  <input name="email" type="email" />
  <Button type="submit">Anmelden</Button>
</form>
```

**2. Kontaktformular hinzufügen:**
Neue Seite: `/src/app/pages/Contact.tsx`

**3. Google Analytics einbinden:**
`/index.html` - vor `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 📦 DEPLOYMENT COMMANDS

```bash
# Development
pnpm dev           # Lokaler Server auf Port 5173

# Build für Production
pnpm build         # Erstellt /dist Ordner

# Preview Production Build
pnpm preview       # Test Production Build lokal

# Dependencies neu installieren
pnpm install       # Alle Pakete installieren

# Paket hinzufügen
pnpm add <paket>   # z.B. pnpm add axios
```

### 🐛 DEBUGGING TIPPS

**Console Logs einfügen:**
```tsx
console.log('Debug:', variable);
```

**TypeScript Fehler ignorieren (NICHT empfohlen):**
```tsx
// @ts-ignore
```

**Browser DevTools öffnen:**
- Chrome/Edge: F12 oder Strg+Shift+I
- Firefox: F12

### 📋 BACKUP ERSTELLEN

**Vor größeren Änderungen:**
```bash
# Gesamten Ordner kopieren
cp -r happyager-website happyager-website-backup

# Oder mit Git
git init
git add .
git commit -m "Backup vor Änderungen"
```

### 🔗 WICHTIGE LINKS

- React Docs: https://react.dev
- Tailwind: https://tailwindcss.com
- Motion: https://motion.dev
- Lucide Icons: https://lucide.dev
- Unsplash: https://unsplash.com

---

## 💡 Pro-Tipps

1. **Ändere immer nur eine Sache** und teste sofort
2. **Speichere häufig** (Strg+S)
3. **Browser-Cache leeren** wenn Änderungen nicht sichtbar sind (Strg+Shift+R)
4. **Nutze VS Code** mit Prettier Extension für Auto-Formatting
5. **Kommentiere deinen Code** für spätere Änderungen

---

Bei Fragen: Dokumentation lesen oder ChatGPT fragen! 🚀
