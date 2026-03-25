import React, { createContext, useContext, useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieContextType {
  preferences: CookiePreferences | null;
  showBanner: boolean;
  acceptAll: () => void;
  acceptSelected: (prefs: CookiePreferences) => void;
  rejectAll: () => void;
  openSettings: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = 'happyager_cookie_consent';

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedPreferences = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
      setShowBanner(false);
    } else {
      // Show banner after a small delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    setPreferences(prefs);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setShowBanner(false);
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    });
  };

  const acceptSelected = (prefs: CookiePreferences) => {
    savePreferences({
      ...prefs,
      necessary: true // Necessary cookies are always enabled
    });
  };

  const rejectAll = () => {
    savePreferences({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    });
  };

  const openSettings = () => {
    setShowBanner(true);
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        showBanner,
        acceptAll,
        acceptSelected,
        rejectAll,
        openSettings
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
}
