import React from 'react';
import { Outlet } from 'react-router';
import { Navigation } from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import { CookieProvider } from './context/CookieContext';
import { CartProvider } from './context/CartContext';
import { CookieBanner } from './components/CookieBanner';

export default function Root() {
  return (
    <AuthProvider>
      <CartProvider>
        <CookieProvider>
          <div className="min-h-screen">
            <Navigation />
            <Outlet />
            <CookieBanner />
          </div>
        </CookieProvider>
      </CartProvider>
    </AuthProvider>
  );
}
