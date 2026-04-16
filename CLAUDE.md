# CLAUDE.md – AstroDaddy Webapp

## Commands
```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server at http://localhost:5173
pnpm build         # Production build → /dist
pnpm vite preview  # Preview production build locally
```

## Stack
React 18 + TypeScript + Vite + Tailwind CSS v4 + React Router v7

## Architecture
Same structure as HappyAger template. Entry: `src/main.tsx` → `App.tsx` → `RouterProvider` → `Root.tsx` (`AuthProvider` → `CookieProvider` → `Navigation` + `Outlet` + `CookieBanner`).

## Routes
- `/` → Home
- `/angebote` → Angebote (Shop)
- `/angebote/:id` → AngebotDetail (ProductDetail)
- `/ausbildung` → Ausbildung (Webinar)
- `/community` → Community
- `/login` → Login
- `/mitglieder` → MemberDashboard (protected)
- `/forgot-password`, `/impressum`, `/datenschutz`

## Test User
Login without Supabase: **test@astrodaddy.de / test1234**
This works via hardcoded fallback in AuthContext.tsx.

## Theme colors (src/styles/theme.css)
- `--color-violet` / `--primary`: `#5C3D8F`
- `--color-gold` / `--accent`: `#C9A84C`
- `--color-lavender` / `--secondary`: `#8B6EC5`
- `--color-midnight`: `#1a0d2e`

## Auth
AuthContext uses Supabase + hardcoded test user fallback.
Supabase env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## Content source
Based on astrodaddy.de – Robert Wagner, Astrologe & spiritueller Lebensberater (@astrodaddy.official)
