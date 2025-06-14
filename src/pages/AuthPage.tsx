
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from "lucide-react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { user, isLoading, signIn, signUp } = useAuth();

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

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-white/20 rounded-full animate-floating"></div>
        <div className="absolute top-40 right-32 w-8 h-8 bg-yellow-300/60 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-pink-300/40 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-blue-300/30 rounded-full animate-floating"></div>
        
        {/* Main Illustration Container */}
        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <div className="text-center text-white max-w-md">
            {/* Cartoon Character */}
            <div className="mb-8 relative">
              <div className="w-64 h-64 mx-auto relative">
                {/* Character Base */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-200 rounded-full shadow-2xl transform rotate-3"></div>
                
                {/* Character Face */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full">
                  {/* Eyes */}
                  <div className="absolute top-8 left-6 w-4 h-4 bg-black rounded-full animate-wiggle"></div>
                  <div className="absolute top-8 right-6 w-4 h-4 bg-black rounded-full animate-wiggle"></div>
                  
                  {/* Smile */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 border-black rounded-full"></div>
                </div>
                
                {/* Arms */}
                <div className="absolute top-20 -left-4 w-8 h-16 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full transform -rotate-45"></div>
                <div className="absolute top-20 -right-4 w-8 h-16 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full transform rotate-45"></div>
                
                {/* Laptop */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gray-800 rounded-lg">
                  <div className="w-18 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm m-1"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
              Welcome to Your Workspace
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of productive teams managing their projects with ease and style.
            </p>
            
            {/* Feature Icons */}
            <div className="flex justify-center space-x-8 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="text-sm">Smart</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                  <User className="h-6 w-6" />
                </div>
                <p className="text-sm">Collaborative</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                  <Lock className="h-6 w-6" />
                </div>
                <p className="text-sm">Secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Card className="w-full max-w-md shadow-2xl border-0 backdrop-blur-sm bg-white/80">
          <CardHeader className="space-y-2 text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              {isSignUp 
                ? "Start your journey with us today" 
                : "Sign in to continue to your workspace"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={isSignUp ? "signup" : "signin"} onValueChange={(value) => setIsSignUp(value === "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1">
                <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required={isSignUp}
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    isSignUp ? "Create Account" : "Sign In"
                  )}
                </Button>
              </form>
              
              {!isSignUp && (
                <div className="text-center mt-6">
                  <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                    Forgot your password?
                  </button>
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
