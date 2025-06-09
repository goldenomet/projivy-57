
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const Index = () => {
  const { user, isLoading } = useAuth();
  
  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If user is logged in, go to dashboard, otherwise go to landing page
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/landing" replace />;
};

export default Index;
