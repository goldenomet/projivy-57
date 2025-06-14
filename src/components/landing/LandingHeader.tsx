
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function LandingHeader() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/91e719aa-0b75-4c1e-a8de-ce6ccbed860b.png" 
            alt="Projivy Logo" 
            className="h-12 w-12 object-contain"
          />
        </div>
        <div className="space-x-2">
          <Link to="/auth">
            <Button variant="ghost" className="hover:bg-primary/10">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
