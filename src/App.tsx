
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/hooks/use-auth";
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
import Index from "./pages/Index";

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="app-theme">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
