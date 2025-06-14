
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AuthIllustration } from "@/components/auth/AuthIllustration";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthBackground } from "@/components/auth/AuthBackground";
import { AuthFeatureHighlights } from "@/components/auth/AuthFeatureHighlights";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  
  const { user, isLoading } = useAuth();

  // Redirect if already authenticated
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <AuthIllustration />

      {/* Right Side - Auth Form with Background */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <AuthBackground />

        {/* Back to Home Button for Mobile */}
        <div className="absolute top-6 left-6 lg:hidden z-10">
          <Link to="/landing">
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-md">
          <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />

          {/* Feature Highlights */}
          <AuthFeatureHighlights />

          {/* Terms and Privacy */}
          <div className="mt-8 text-center text-gray-500 text-xs max-w-sm mx-auto">
            <p>By continuing, you agree to our <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
