
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function AuthCallback() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data.session) {
          // Check if user wanted to be remembered
          const rememberMe = localStorage.getItem('rememberMe') === 'true';
          
          if (rememberMe) {
            const authData = {
              refreshToken: data.session.refresh_token,
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
            };
            localStorage.setItem('persistedAuth', JSON.stringify(authData));
          }
          
          // Clear the temporary flag
          localStorage.removeItem('rememberMe');
          
          toast.success('Successfully signed in with Google!');
        }
      } catch (error: any) {
        console.error('Error in auth callback:', error);
        setError(error.message);
        toast.error(`Authentication error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Completing authentication...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-destructive">
          <h1 className="text-xl font-bold">Authentication Error</h1>
          <p>{error}</p>
          <a href="/auth" className="text-primary hover:underline mt-4 block">
            Return to login
          </a>
        </div>
      </div>
    );
  }

  // Redirect to dashboard if successful
  return <Navigate to="/dashboard" replace />;
}
