
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function AuthIllustration() {
  return (
    <>
      {/* Back to Home Button - Responsive positioning */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
        <Link to="/landing">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/90 border-gray-200 text-gray-700 hover:bg-white backdrop-blur-sm text-xs sm:text-sm"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>
      </div>
      
      {/* Enhanced Abstract Blue Shapes - Responsive sizing */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large primary curved shape - Responsive sizes */}
        <div className="absolute -top-16 sm:-top-20 -left-16 sm:-left-20 w-[350px] sm:w-[450px] lg:w-[500px] h-[350px] sm:h-[450px] lg:h-[500px] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full transform rotate-12 opacity-90 animate-pulse-soft"></div>
        
        {/* Medium curved shape - Responsive positioning */}
        <div className="absolute top-1/4 -left-32 sm:-left-40 w-72 sm:w-80 lg:w-96 h-72 sm:h-80 lg:h-96 bg-gradient-to-br from-indigo-400 via-indigo-500 to-blue-500 rounded-full transform -rotate-12 opacity-70 animate-floating"></div>
        
        {/* Small accent shape - Responsive sizing */}
        <div className="absolute top-1/2 left-8 sm:left-12 lg:left-16 w-48 sm:w-56 lg:w-64 h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-sky-400 via-sky-500 to-blue-400 rounded-full transform rotate-45 opacity-80 animate-bounce-gentle"></div>
        
        {/* Bottom flowing shape - Responsive positioning */}
        <div className="absolute -bottom-16 sm:-bottom-20 -left-20 sm:-left-24 w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full transform rotate-6 opacity-60 animate-pulse-soft"></div>
        
        {/* Right side accent - Responsive dimensions */}
        <div className="absolute top-32 sm:top-40 right-0 w-32 sm:w-40 lg:w-48 h-72 sm:h-80 lg:h-96 bg-gradient-to-l from-blue-300 via-blue-400 to-transparent rounded-l-full opacity-50"></div>
        
        {/* Additional small floating elements - Responsive sizes */}
        <div className="absolute top-16 sm:top-20 left-1/3 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-white/20 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-24 sm:bottom-32 left-1/4 w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 bg-white/30 rounded-full animate-floating"></div>
        <div className="absolute top-1/3 right-16 sm:right-20 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-60 animate-pulse-soft"></div>
      </div>

      {/* Centered Content overlay - Responsive text and spacing */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-6 sm:p-8 lg:p-12">
        <div className="text-center max-w-xs sm:max-w-md lg:max-w-lg">
          {/* Enhanced Logo/Icon - Responsive sizing */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl mx-auto mb-6 sm:mb-8 flex items-center justify-center shadow-2xl animate-bounce-gentle">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white rounded-lg sm:rounded-xl shadow-inner"></div>
            </div>
          </div>
          
          {/* Enhanced Typography - Responsive text sizes */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 lg:mb-6 drop-shadow-lg">
            Welcome back
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed drop-shadow-md px-2 sm:px-0">
            Sign in to your account to continue your journey with us and unlock all the amazing features.
          </p>
          
          {/* Additional visual elements - Responsive spacing */}
          <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center space-x-3 sm:space-x-4">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/40 rounded-full animate-bounce-gentle"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
