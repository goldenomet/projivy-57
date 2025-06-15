import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
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
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-white animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600">
      {/* Enhanced Full Background Design covering entire viewport */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Large primary curved shape */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-full transform rotate-12 opacity-80 animate-pulse-soft"></div>
        
        {/* Medium curved shape on left */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-300 via-indigo-400 to-blue-400 rounded-full transform -rotate-12 opacity-60 animate-floating"></div>
        
        {/* Large shape covering right side - Extended to cover full right */}
        <div className="absolute -top-32 -right-32 w-[800px] h-[800px] bg-gradient-to-bl from-blue-200 via-blue-300 to-blue-400 rounded-full transform -rotate-12 opacity-50 animate-pulse-soft"></div>
        
        {/* Additional right coverage */}
        <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-blue-300 via-blue-400 to-transparent opacity-40"></div>
        
        {/* Medium shape on top right */}
        <div className="absolute top-1/4 -right-28 w-80 h-80 bg-gradient-to-bl from-indigo-200 via-indigo-300 to-blue-300 rounded-full transform rotate-12 opacity-40 animate-floating"></div>
        
        {/* Bottom flowing shapes */}
        <div className="absolute -bottom-20 -left-24 w-80 h-80 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 rounded-full transform rotate-6 opacity-50 animate-pulse-soft"></div>
        
        <div className="absolute -bottom-16 -right-20 w-64 h-64 bg-gradient-to-bl from-blue-300 via-blue-400 to-indigo-400 rounded-full transform -rotate-6 opacity-30 animate-pulse-soft"></div>
        
        {/* Center accent shapes */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-sky-300 via-sky-400 to-blue-300 rounded-full opacity-20 animate-bounce-gentle"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-20 left-1/3 w-12 h-12 bg-white/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-white/20 rounded-full animate-floating"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full opacity-40 animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-white/30 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-16 right-1/4 w-4 h-4 bg-white/40 rounded-full animate-floating"></div>
        
        {/* Additional background coverage shapes */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-30 animate-floating"></div>
        <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-gradient-to-bl from-sky-200 to-blue-200 rounded-full opacity-25 animate-pulse-soft"></div>
        <div className="absolute top-3/4 left-0 w-24 h-24 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-35 animate-bounce-gentle"></div>
        
        {/* Right edge coverage to prevent any gaps */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-blue-400 to-transparent opacity-30"></div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row relative z-10 min-h-screen w-full">
        {/* Left Side - Logo and Welcome Text - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex lg:w-3/5 xl:w-2/3 relative">
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
              {/* Illustration Image */}
              <div className="mb-8">
                <img 
                  src="/lovable-uploads/2fdc24f0-651a-49b6-9a2c-0fb781bf042c.png" 
                  alt="Professional woman working at desk with laptop"
                  className="w-[500px] h-auto mx-auto drop-shadow-2xl animate-floating"
                />
              </div>
              
              {/* Logo */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl p-3 mx-auto mb-6 inline-flex items-center justify-center shadow-2xl animate-bounce-gentle">
                  <img 
                    src="/lovable-uploads/91e719aa-0b75-4c1e-a8de-ce6ccbed860b.png" 
                    alt="Logo" 
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
              
              {/* Typography */}
              <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Welcome back
              </h1>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md">
                Sign in to your account to continue your journey with us and unlock all the amazing features.
              </p>
              
              {/* Decorative elements */}
              <div className="mt-8 flex justify-center space-x-4">
                <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce-gentle"></div>
                <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Area - Full width on mobile, partial on desktop */}
        <div className="flex-1 lg:w-2/5 xl:w-1/3 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative min-h-screen">
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
    </div>
  );
}
