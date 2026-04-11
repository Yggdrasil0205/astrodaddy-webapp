# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server at http://localhost:5173
pnpm build         # Production build → /dist
pnpm vite preview  # Preview production build locally
pnpm add <pkg>     # Add a dependency
```

There is no lint or test script configured.

## Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS v4 + React Router v7

**Entry point flow:** `src/main.tsx` → `App.tsx` (wraps everything in `PasswordProtection`) → `RouterProvider` → `Root.tsx` (stacks `AuthProvider` → `CartProvider` → `CookieProvider` → `Navigation` + `Outlet` + `CookieBanner`) → page components.

**Routing** is defined in `src/app/routes.ts` using `createBrowserRouter`. All pages live under the single `/` layout route handled by `Root.tsx`. Pages: Home, Shop, Community, ProductDetail (`/product/:id`), Checkout, Login, ForgotPassword, Impressum, Datenschutz.

**State management** is entirely React Context — no external state library:
- `CartContext` — cart items, add/remove/update/clear, totalItems, totalPrice
- `AuthContext` — login/logout, isAuthenticated
- `CookieContext` — cookie consent state

**Product data** is static, defined in `src/app/data/products.ts`. Each product has: `id`, `name`, `description`, `price`, `priceFormatted`, `image`, `badge?`, `category?`, `details?`, `ingredients?`, `benefits?`.

**UI components** in `src/app/components/ui/` are shadcn/ui-style wrappers over Radix UI primitives. The custom `button.tsx` uses a glass-effect style. Do not treat these as off-limits — they can be edited.

**Theming** is done entirely through CSS custom properties in `src/styles/theme.css`. Brand colors:
- `--color-violet` / `--primary`: `#8268AB`
- `--color-peach` / `--accent`: `#F9C4B5`
- `--color-lavender` / `--secondary`: `#BFADD5`
- `--color-nature`: `#1b2a23` (dark green)

**Path alias:** `@` resolves to `./src` (configured in `vite.config.ts`).

**Figma origin:** The project was exported from Figma. A custom Vite plugin (`figmaAssetPlugin`) in `vite.config.ts` resolves `figma:asset/` imports to empty strings so the build doesn't break. Actual images use Unsplash URLs or `/public` paths.

**Animations** use the `motion` package (Framer Motion fork). The `AnimatedDNA` component is a decorative DNA helix used on the Home page.

## Adding a new page

1. Create `src/app/pages/MyPage.tsx`
2. Add a route in `src/app/routes.ts`
3. Add a nav link in `src/app/components/Navigation.tsx` if needed
