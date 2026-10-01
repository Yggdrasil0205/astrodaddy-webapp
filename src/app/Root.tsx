import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { Navigation } from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import { CookieProvider } from './context/CookieContext';
import { CartProvider } from './context/CartContext';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

// Per-page browser titles (one title for every page hurts search results and tabs).
const SITE = 'Robert Wagner Astrologie';
const TITLES: Record<string, string> = {
  '/': `${SITE} – Entdecke Dein Universum`,
  '/angebote': `Angebote – ${SITE}`,
  '/readings-workbooks': `Readings & Workbooks – ${SITE}`,
  '/astroversity': `Astroversity Academy – ${SITE}`,
  '/community': `Community – ${SITE}`,
  '/login': `Login – ${SITE}`,
  '/forgot-password': `Passwort vergessen – ${SITE}`,
  '/reset-password': `Neues Passwort – ${SITE}`,
  '/checkout': `Kasse – ${SITE}`,
  '/checkout/success': `Bestellung – ${SITE}`,
  '/links': `Links – ${SITE}`,
  '/mitglieder': `Mein Konto – ${SITE}`,
  '/impressum': `Impressum – ${SITE}`,
  '/datenschutz': `Datenschutz – ${SITE}`,
  '/agb': `AGB – ${SITE}`,
  '/widerruf': `Widerrufsbelehrung – ${SITE}`,
  '/robertlogin': `Admin – ${SITE}`,
};

export default function Root() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/';
    document.title = TITLES[path] ?? (path.startsWith('/angebote/') ? TITLES['/angebote'] : TITLES['/']);
  }, [pathname]);

  return (
    <AuthProvider>
      <CartProvider>
        <CookieProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <div className="flex-1">
              <Outlet />
            </div>
            <Footer />
            <CookieBanner />
            <Analytics
              beforeSend={(event) => {
                const url = new URL(event.url);
                // Admin visits are not website traffic.
                if (url.pathname.startsWith('/robertlogin')) return null;
                // Never send tokens (password reset, payment return) to analytics.
                url.hash = '';
                url.search = '';
                return { ...event, url: url.toString() };
              }}
            />
          </div>
        </CookieProvider>
      </CartProvider>
    </AuthProvider>
  );
}
