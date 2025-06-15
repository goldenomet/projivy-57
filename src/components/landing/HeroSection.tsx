
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Star, ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full py-20 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="flex justify-center lg:justify-start animate-fade-in animate-stagger-1">
              <img 
                src="/lovable-uploads/91e719aa-0b75-4c1e-a8de-ce6ccbed860b.png" 
                alt="Logo" 
                className="h-32 w-32 object-contain hover:scale-110 transition-transform duration-500"
              />
            </div>

            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-slide-in animate-stagger-2">
              Project Management
              <span className="text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text animate-shimmer inline-block"> Made Simple</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-in animate-stagger-3">
              Stop juggling tools. Start getting things done. The intuitive platform that keeps your team organized and projects on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-scale-in animate-stagger-4">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground animate-fade-in animate-stagger-5">
              <div className="flex items-center gap-1 hover:text-green-500 transition-colors duration-300">
                <CheckCircle className="h-4 w-4 text-green-500 animate-bounce-gentle" />
                7-day free trial
              </div>
              <div className="flex items-center gap-1 hover:text-green-500 transition-colors duration-300">
                <CheckCircle className="h-4 w-4 text-green-500 animate-bounce-gentle" style={{ animationDelay: '0.2s' }} />
                No credit card required
              </div>
              <div className="flex items-center gap-1 hover:text-green-500 transition-colors duration-300">
                <CheckCircle className="h-4 w-4 text-green-500 animate-bounce-gentle" style={{ animationDelay: '0.4s' }} />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="flex justify-center lg:justify-end animate-scale-in animate-stagger-6">
            <img 
              src="/lovable-uploads/2fdc24f0-651a-49b6-9a2c-0fb781bf042c.png" 
              alt="Professional woman working at desk with laptop" 
              className="w-[500px] h-auto hover:scale-105 hover:-translate-y-2 transition-all duration-700" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
