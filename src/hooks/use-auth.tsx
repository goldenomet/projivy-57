
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User, Provider } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signInWithGoogle: (rememberMe: boolean) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Check for persisted auth on app start
const loadPersistedSession = () => {
  try {
    const persistedSession = localStorage.getItem('persistedAuth');
    return persistedSession ? JSON.parse(persistedSession) : null;
  } catch (error) {
    console.error('Error loading persisted auth:', error);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (event === 'SIGNED_IN') {
        setTimeout(() => {
          toast.success('Signed in successfully');
          navigate('/dashboard');
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        // Clear persisted auth on sign out
        localStorage.removeItem('persistedAuth');
        setTimeout(() => {
          toast.info('Signed out successfully');
          navigate('/auth');
        }, 0);
      }
    });

    // THEN check for existing session
    const initializeAuth = async () => {
      // First try to load from Supabase's session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setSession(session);
        setUser(session.user);
      } else {
        // If no active session, try to load from persisted auth if exists
        const persistedSession = loadPersistedSession();
        if (persistedSession && persistedSession.refreshToken) {
          try {
            // Try to refresh the session using the persisted refresh token
            const { data, error } = await supabase.auth.refreshSession({
              refresh_token: persistedSession.refreshToken,
            });
            
            if (error) throw error;
            setSession(data.session);
            setUser(data.user);
          } catch (error) {
            console.error('Error refreshing session:', error);
            localStorage.removeItem('persistedAuth');
          }
        }
      }
      
      setLoading(false);
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const persistSession = (session: Session | null, rememberMe: boolean) => {
    if (rememberMe && session) {
      const authData = {
        refreshToken: session.refresh_token,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      };
      localStorage.setItem('persistedAuth', JSON.stringify(authData));
    }
  };

  const signIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Store auth data in localStorage if rememberMe is true
      persistSession(data.session, rememberMe);
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signInWithGoogle = async (rememberMe: boolean) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
      
      // For OAuth we can't immediately persist since we're redirecting
      // A separate handling is needed in the callback route
      localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;
      toast.success('Registration successful! Please check your email for verification.');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signInWithGoogle, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
