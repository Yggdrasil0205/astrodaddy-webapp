import React from 'react';
import { Outlet } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { Navigation } from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import { CookieProvider } from './context/CookieContext';
import { CartProvider } from './context/CartContext';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

export default function Root() {
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
