
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function AuthIllustration() {
  return (
    <>
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/landing">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/90 border-gray-200 text-gray-700 hover:bg-white backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      {/* Enhanced Abstract Blue Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large primary curved shape from top-left */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full transform rotate-12 opacity-90 animate-pulse-soft"></div>
        
        {/* Medium curved shape - center left */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400 via-indigo-500 to-blue-500 rounded-full transform -rotate-12 opacity-70 animate-floating"></div>
        
        {/* Small accent shape - center */}
        <div className="absolute top-1/2 left-16 w-64 h-64 bg-gradient-to-br from-sky-400 via-sky-500 to-blue-400 rounded-full transform rotate-45 opacity-80 animate-bounce-gentle"></div>
        
        {/* Bottom flowing shape */}
        <div className="absolute -bottom-20 -left-24 w-80 h-80 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full transform rotate-6 opacity-60 animate-pulse-soft"></div>
        
        {/* Right side accent - vertical */}
        <div className="absolute top-40 right-0 w-48 h-96 bg-gradient-to-l from-blue-300 via-blue-400 to-transparent rounded-l-full opacity-50"></div>
        
        {/* Additional small floating elements */}
        <div className="absolute top-20 left-1/3 w-12 h-12 bg-white/20 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-white/30 rounded-full animate-floating"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-60 animate-pulse-soft"></div>
      </div>

      {/* Centered Content overlay with better positioning */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-12">
        <div className="text-center max-w-lg">
          {/* Enhanced Logo/Icon */}
          <div className="mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl animate-bounce-gentle">
              <div className="w-10 h-10 bg-white rounded-xl shadow-inner"></div>
            </div>
          </div>
          
          {/* Enhanced Typography */}
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome back
          </h1>
          <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
            Sign in to your account to continue your journey with us and unlock all the amazing features.
          </p>
          
          {/* Additional visual elements */}
          <div className="mt-12 flex justify-center space-x-4">
            <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce-gentle"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
