
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, User, Lock } from "lucide-react";

export function AuthIllustration() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/landing">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
      
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
  );
}
