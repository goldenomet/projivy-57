
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
    <div className="min-h-screen flex">
      {/* Left Side - Clean Gradient */}
      <AuthIllustration />

      {/* Right Side - Clean Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white relative">
        {/* Back to Home Button for Mobile */}
        <div className="absolute top-6 left-6 lg:hidden z-10">
          <Link to="/landing">
            <Button variant="outline" size="sm" className="border-gray-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Main Content Container */}
        <div className="w-full max-w-md">
          <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        </div>
      </div>
    </div>
  );
}
