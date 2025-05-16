
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const Index = () => {
  const { user } = useAuth();
  
  // If user is logged in, go to dashboard, otherwise go to landing page
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />;
};

export default Index;
