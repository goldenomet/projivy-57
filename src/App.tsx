
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import CalendarPage from "./pages/CalendarPage";
import TeamPage from "./pages/TeamPage";
import NewProject from "./pages/NewProject";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import AuthCallback from "./components/auth/AuthCallback";

// Create an AuthRoute component to handle route protection and redirects
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/auth" replace />;
};

// Create a separate IndexRoute component
const IndexRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />;
};

// Root component
const Root = () => {
  // Only use useAuth inside the AuthProvider
  return (
    <Routes>
      <Route path="/" element={<IndexRoute />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
      <Route path="/projects" element={<AuthRoute><ProjectsPage /></AuthRoute>} />
      <Route path="/projects/new" element={<AuthRoute><NewProject /></AuthRoute>} />
      <Route path="/projects/:id" element={<AuthRoute><ProjectDetail /></AuthRoute>} />
      <Route path="/calendar" element={<AuthRoute><CalendarPage /></AuthRoute>} />
      <Route path="/team" element={<AuthRoute><TeamPage /></AuthRoute>} />
      <Route path="/profile" element={<AuthRoute><ProfilePage /></AuthRoute>} />
      <Route path="/settings" element={<AuthRoute><SettingsPage /></AuthRoute>} />
      <Route path="/admin" element={<AuthRoute><AdminPage /></AuthRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="app-theme">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
