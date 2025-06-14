
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AuthIllustration } from "@/components/auth/AuthIllustration";
import { AuthForm } from "@/components/auth/AuthForm";

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
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Abstract Illustration - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:flex lg:w-3/5 xl:w-2/3 bg-white relative overflow-hidden">
        <AuthIllustration />
      </div>

      {/* Right Side - Form Area - Full width on mobile, partial on desktop */}
      <div className="flex-1 lg:w-2/5 xl:w-1/3 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-gray-50 relative min-h-screen overflow-hidden">
        {/* Background Design - Responsive sizing */}
        <div className="absolute inset-0 overflow-hidden opacity-20 sm:opacity-25 lg:opacity-30">
          {/* Large primary curved shape - Responsive sizes */}
          <div className="absolute -top-10 sm:-top-16 lg:-top-20 -right-10 sm:-right-16 lg:-right-20 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] bg-gradient-to-bl from-blue-300 via-blue-400 to-blue-500 rounded-full transform -rotate-12 opacity-60 animate-pulse-soft"></div>
          
          {/* Medium curved shape - Responsive positioning */}
          <div className="absolute top-1/4 -right-20 sm:-right-28 lg:-right-32 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-gradient-to-bl from-indigo-300 via-indigo-400 to-blue-400 rounded-full transform rotate-12 opacity-50 animate-floating"></div>
          
          {/* Small accent shape - Responsive sizing */}
          <div className="absolute top-1/2 right-6 sm:right-8 lg:right-12 w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 bg-gradient-to-bl from-sky-300 via-sky-400 to-blue-300 rounded-full transform -rotate-45 opacity-60 animate-bounce-gentle"></div>
          
          {/* Bottom flowing shape - Responsive positioning */}
          <div className="absolute -bottom-10 sm:-bottom-16 lg:-bottom-20 -right-10 sm:-right-16 lg:-right-20 w-40 sm:w-52 lg:w-64 h-40 sm:h-52 lg:h-64 bg-gradient-to-bl from-blue-400 via-blue-500 to-indigo-500 rounded-full transform -rotate-6 opacity-40 animate-pulse-soft"></div>
          
          {/* Left side accent - Responsive height */}
          <div className="absolute top-32 sm:top-40 left-0 w-16 sm:w-24 lg:w-32 h-48 sm:h-64 lg:h-80 bg-gradient-to-r from-blue-200 via-blue-300 to-transparent rounded-r-full opacity-30"></div>
          
          {/* Additional small floating elements - Responsive sizes */}
          <div className="absolute top-12 sm:top-16 right-1/3 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 bg-white/40 rounded-full animate-bounce-gentle"></div>
          <div className="absolute bottom-20 sm:bottom-28 right-1/4 w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6 bg-white/50 rounded-full animate-floating"></div>
          <div className="absolute top-1/3 left-8 sm:left-12 lg:left-16 w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 bg-gradient-to-bl from-purple-300 to-blue-300 rounded-full opacity-40 animate-pulse-soft"></div>
        </div>

        {/* Back to Home Button for Mobile - Responsive positioning */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 lg:hidden z-10">
          <Link to="/landing">
            <Button variant="outline" size="sm" className="border-gray-300 text-xs sm:text-sm">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Back to Home</span>
              <span className="xs:hidden">Back</span>
            </Button>
          </Link>
        </div>

        {/* Main Content Container - Responsive width and spacing */}
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md relative z-10 mt-16 sm:mt-12 lg:mt-0">
          <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        </div>
      </div>
    </div>
  );
}
