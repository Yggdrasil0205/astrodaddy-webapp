import React from 'react';
import { Cookie } from 'lucide-react';
import { Button } from './ui/button';
import { useCookies } from '../context/CookieContext';

export function CookieSettingsButton() {
  const { openSettings } = useCookies();

  return (
    <Button
      onClick={openSettings}
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-foreground"
    >
      <Cookie className="w-4 h-4 mr-2" />
      Cookie-Einstellungen
    </Button>
  );
}
