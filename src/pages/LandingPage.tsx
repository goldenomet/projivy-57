
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { AdditionalFeaturesSection } from "@/components/landing/AdditionalFeaturesSection";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  const { user, isLoading } = useAuth();

  // Redirect to dashboard if authenticated
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-secondary/10">
      <LandingHeader />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AdditionalFeaturesSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
