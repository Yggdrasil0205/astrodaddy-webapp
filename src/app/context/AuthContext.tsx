import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

// ─── Test user – local development only (never shipped in production builds) ─
const TEST_USER_ENABLED = import.meta.env.DEV;
const TEST_CREDENTIALS = { email: 'test@astroversity.academy', password: 'test1234' };
const TEST_USER = {
  id: 'test-user-id',
  email: TEST_CREDENTIALS.email,
  user_metadata: { full_name: 'Test Benutzer' },
} as unknown as User;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore test-user session from localStorage
    const saved = localStorage.getItem('astroversity_test_user');
    if (TEST_USER_ENABLED && saved === 'true') {
      setUser(TEST_USER);
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // Test user fallback (works without Supabase)
    if (TEST_USER_ENABLED && email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
      localStorage.setItem('astroversity_test_user', 'true');
      setUser(TEST_USER);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  // Registration and password reset go through our API (api/account.ts), which
  // e-mails the links via our own SMTP instead of Supabase's mailer.
  const accountRequest = async (action: 'register' | 'reset', body: Record<string, string>) => {
    const res = await fetch(`/api/account?action=${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error ?? 'Ein Fehler ist aufgetreten.');
  };

  const register = async (email: string, password: string, name: string) => {
    await accountRequest('register', { email, password, name });
  };

  const logout = async () => {
    localStorage.removeItem('astroversity_test_user');
    setUser(null);
    setSession(null);
    await supabase.auth.signOut().catch(() => {});
  };

  const resetPassword = async (email: string) => {
    await accountRequest('reset', { email });
  };

  return (
    <AuthContext.Provider value={{ user, session, isAuthenticated: !!user, isLoading, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
