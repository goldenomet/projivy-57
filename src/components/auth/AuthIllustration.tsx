
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function AuthIllustration() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 relative">
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
      
      {/* Main content */}
      <div className="flex items-center justify-center w-full p-12">
        <div className="text-white text-center max-w-md">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Cogie
          </h1>
          <p className="text-xl opacity-90">
            Sign in to your account to continue
          </p>
        </div>
      </div>
    </div>
  );
}
