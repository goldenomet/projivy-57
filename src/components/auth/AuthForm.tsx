import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AuthFormProps {
  isSignUp: boolean;
  setIsSignUp: (value: boolean) => void;
}

export function AuthForm({ isSignUp, setIsSignUp }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        if (!fullName) {
          toast.error("Full name is required");
          return;
        }
        await signUp(email, password, fullName);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      // Error handling is done in the auth hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        toast.error('Failed to sign in with Google');
        console.error('Google sign in error:', error);
      }
    } catch (error) {
      toast.error('Failed to sign in with Google');
      console.error('Google sign in error:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-0">
      {/* Form Container with glass effect */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/20">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            {isSignUp ? "Create account" : "Sign in"}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            {isSignUp 
              ? "Get started with your free account" 
              : "Welcome back! Please enter your details"
            }
          </p>
        </div>
        
        {/* Google Sign In Button */}
        <Button 
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          className="w-full h-10 sm:h-11 lg:h-12 border-gray-200 hover:bg-gray-50 text-sm sm:text-base rounded-lg bg-white mb-4 sm:mb-6"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-xs sm:text-sm lg:text-base">Continue with Google</span>
        </Button>

        <div className="relative my-4 sm:my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="bg-white px-3 sm:px-4 text-gray-500">or</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
          {isSignUp && (
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={isSignUp}
                className="h-10 sm:h-11 lg:h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base bg-white"
              />
            </div>
          )}
          
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 sm:h-11 lg:h-12 pl-8 sm:pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base bg-white"
              />
              <Mail className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10 sm:h-11 lg:h-12 pl-8 sm:pl-10 pr-8 sm:pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base bg-white"
              />
              <Lock className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
              </button>
            </div>
          </div>
          
          {!isSignUp && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="remember" className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <button 
                type="button"
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Forgot password?
              </button>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-10 sm:h-11 lg:h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base rounded-lg" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white/30 border-t-white mr-2"></div>
                <span className="text-xs sm:text-sm">
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </span>
              </div>
            ) : (
              <span className="text-sm sm:text-base">
                {isSignUp ? "Create Account" : "Sign In"}
              </span>
            )}
          </Button>
        </form>
        
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
