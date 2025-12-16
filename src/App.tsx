import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeManagerProvider } from "@/hooks/use-theme-manager";
import { AuthProvider } from "./hooks/use-auth";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import NewProject from "./pages/NewProject";
import EditProject from "./pages/EditProject";
import TeamPage from "./pages/TeamPage";
import TeamMetricsPage from "./pages/TeamMetricsPage";
import TimeTrackingPage from "./pages/TimeTrackingPage";
import CalendarPage from "./pages/CalendarPage";
import MeetingsPage from "./pages/MeetingsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import AdminPage from "./pages/AdminPage";
import ProjectDetailPage from "./pages/project-detail/ProjectDetailPage";
import DataManagementPage from "./pages/DataManagementPage";
import TaskOverviewPage from "./pages/TaskOverviewPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import ChatPage from "@/pages/ChatPage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import DocumentationPage from "./pages/DocumentationPage";
import StatusPage from "./pages/StatusPage";
import PrivacyPage from "./pages/PrivacyPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ThemeManagerProvider>
          <TooltipProvider>
            <SidebarProvider>
              <Toaster />
              <BrowserRouter>
                <AuthProvider>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/projects" element={
                      <ProtectedRoute>
                        <ProjectsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/tasks" element={
                      <ProtectedRoute>
                        <TaskOverviewPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/projects/new" element={
                      <ProtectedRoute>
                        <NewProject />
                      </ProtectedRoute>
                    } />
                    <Route path="/projects/:id/edit" element={
                      <ProtectedRoute>
                        <EditProject />
                      </ProtectedRoute>
                    } />
                    <Route path="/projects/:id" element={
                      <ProtectedRoute>
                        <ProjectDetailPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/team" element={
                      <ProtectedRoute>
                        <TeamPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/team/metrics" element={
                      <ProtectedRoute>
                        <TeamMetricsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/time-tracking" element={
                      <ProtectedRoute>
                        <TimeTrackingPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/calendar" element={
                      <ProtectedRoute>
                        <CalendarPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/meetings" element={
                      <ProtectedRoute>
                        <MeetingsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                    <Route path="/subscription" element={
                      <ProtectedRoute>
                        <SubscriptionPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                      <ProtectedRoute>
                        <AdminPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/data-management" element={
                      <ProtectedRoute>
                        <DataManagementPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/documentation" element={<DocumentationPage />} />
                    <Route path="/status" element={<StatusPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                  </Routes>
                </AuthProvider>
              </BrowserRouter>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeManagerProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
