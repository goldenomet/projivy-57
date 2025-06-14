
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
      
      {/* Abstract Blue Shapes */}
      <div className="absolute inset-0">
        {/* Large curved shape from top */}
        <div className="absolute -top-40 -left-20 w-96 h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full transform rotate-12 opacity-80"></div>
        
        {/* Medium curved shape */}
        <div className="absolute top-32 -left-32 w-80 h-80 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full transform -rotate-12 opacity-60"></div>
        
        {/* Small accent shape */}
        <div className="absolute top-80 left-20 w-48 h-48 bg-gradient-to-br from-sky-400 to-blue-400 rounded-full transform rotate-45 opacity-70"></div>
        
        {/* Bottom flowing shape */}
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full transform rotate-6 opacity-50"></div>
        
        {/* Right side accent */}
        <div className="absolute top-60 right-0 w-40 h-80 bg-gradient-to-l from-blue-300 to-transparent rounded-l-full opacity-40"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center w-full p-12">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome back
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Sign in to your account to continue your journey with us.
          </p>
        </div>
      </div>
    </>
  );
}
