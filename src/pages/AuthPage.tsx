
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-white animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* Full Background Design covering entire page */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large primary curved shape */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full transform rotate-12 opacity-90 animate-pulse-soft"></div>
        
        {/* Medium curved shape on left */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400 via-indigo-500 to-blue-500 rounded-full transform -rotate-12 opacity-70 animate-floating"></div>
        
        {/* Large shape covering right side */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-bl from-blue-300 via-blue-400 to-blue-500 rounded-full transform -rotate-12 opacity-60 animate-pulse-soft"></div>
        
        {/* Medium shape on top right */}
        <div className="absolute top-1/4 -right-28 w-80 h-80 bg-gradient-to-bl from-indigo-300 via-indigo-400 to-blue-400 rounded-full transform rotate-12 opacity-50 animate-floating"></div>
        
        {/* Bottom flowing shapes */}
        <div className="absolute -bottom-20 -left-24 w-80 h-80 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full transform rotate-6 opacity-60 animate-pulse-soft"></div>
        
        <div className="absolute -bottom-16 -right-20 w-64 h-64 bg-gradient-to-bl from-blue-400 via-blue-500 to-indigo-500 rounded-full transform -rotate-6 opacity-40 animate-pulse-soft"></div>
        
        {/* Center accent shapes */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-sky-400 via-sky-500 to-blue-400 rounded-full opacity-30 animate-bounce-gentle"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-20 left-1/3 w-12 h-12 bg-white/20 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-white/30 rounded-full animate-floating"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-60 animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-white/40 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-16 right-1/4 w-4 h-4 bg-white/50 rounded-full animate-floating"></div>
      </div>

      {/* Left Side - Logo and Welcome Text - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:flex lg:w-3/5 xl:w-2/3 relative z-10">
        {/* Back to Home Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link to="/landing">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/90 border-white/20 text-gray-700 hover:bg-white backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        {/* Centered Content */}
        <div className="flex items-center justify-center w-full h-full p-12">
          <div className="text-center max-w-lg">
            {/* Logo/Icon */}
            <div className="mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-white via-white to-blue-100 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl animate-bounce-gentle">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-inner"></div>
              </div>
            </div>
            
            {/* Typography */}
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Welcome back
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
              Sign in to your account to continue your journey with us and unlock all the amazing features.
            </p>
            
            {/* Decorative elements */}
            <div className="mt-12 flex justify-center space-x-4">
              <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce-gentle"></div>
              <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Area - Full width on mobile, partial on desktop */}
      <div className="flex-1 lg:w-2/5 xl:w-1/3 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative z-10 min-h-screen">
        {/* Semi-transparent overlay for form area */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm lg:bg-white/20"></div>
        
        {/* Back to Home Button for Mobile */}
        <div className="absolute top-6 left-6 lg:hidden z-20">
          <Link to="/landing">
            <Button variant="outline" size="sm" className="bg-white/90 border-white/20 text-gray-700 hover:bg-white backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Main Content Container */}
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md relative z-20 mt-16 sm:mt-12 lg:mt-0">
          <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        </div>
      </div>
    </div>
  );
}
