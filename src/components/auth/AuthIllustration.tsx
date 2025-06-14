
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function AuthIllustration() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 relative overflow-hidden">
      {/* Flowing wave patterns */}
      <div className="absolute inset-0">
        {/* Main flowing waves */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M0,300 Q300,100 600,250 T1200,200 L1200,0 L0,0 Z" fill="rgba(255,255,255,0.1)" />
          <path d="M0,400 Q400,200 800,350 T1200,300 L1200,0 L0,0 Z" fill="rgba(255,255,255,0.05)" />
          <path d="M0,500 Q200,300 600,450 T1200,400 L1200,0 L0,0 Z" fill="rgba(255,255,255,0.08)" />
          <path d="M0,600 Q500,400 1000,550 T1200,500 L1200,0 L0,0 Z" fill="rgba(255,255,255,0.03)" />
        </svg>
        
        {/* Additional flowing elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-l from-white/15 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-lg"></div>
      </div>
      
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
      
      {/* Quote section */}
      <div className="absolute top-8 left-8 z-10">
        <p className="text-white/80 text-sm font-medium tracking-wider uppercase">A WISE QUOTE</p>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center w-full p-12">
        <div className="text-white max-w-md">
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Get<br />
            Everything<br />
            You Want
          </h1>
          <p className="text-lg opacity-90 leading-relaxed">
            You can get everything you want if you work hard, 
            trust the process, and stick to the plan.
          </p>
        </div>
      </div>
    </div>
  );
}
