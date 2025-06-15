
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Star, ArrowRight, Play, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full py-12 relative overflow-hidden min-h-screen flex flex-col">
      {/* Bouncing dots background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* First row of dots */}
        <div className="absolute top-16 left-8 w-3 h-3 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
        <div className="absolute top-32 left-24 w-2 h-2 bg-purple-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.5s' }}></div>
        <div className="absolute top-48 left-16 w-2.5 h-2.5 bg-blue-500/45 rounded-full animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '1.8s' }}></div>
        <div className="absolute top-64 left-32 w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '2.2s' }}></div>
        <div className="absolute top-80 left-12 w-2 h-2 bg-yellow-500/55 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}></div>
        
        {/* Second row of dots */}
        <div className="absolute top-20 right-16 w-2.5 h-2.5 bg-pink-500/45 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.3s' }}></div>
        <div className="absolute top-36 right-32 w-2 h-2 bg-indigo-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.9s', animationDuration: '2.7s' }}></div>
        <div className="absolute top-52 right-20 w-3 h-3 bg-teal-500/40 rounded-full animate-bounce" style={{ animationDelay: '1.3s', animationDuration: '2.1s' }}></div>
        <div className="absolute top-68 right-40 w-1.5 h-1.5 bg-orange-500/55 rounded-full animate-bounce" style={{ animationDelay: '1.7s', animationDuration: '2.6s' }}></div>
        <div className="absolute top-84 right-24 w-2 h-2 bg-red-500/45 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '1.9s' }}></div>
        
        {/* Center scattered dots */}
        <div className="absolute top-28 left-1/3 w-2 h-2 bg-cyan-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2.4s' }}></div>
        <div className="absolute top-44 left-1/2 w-1.5 h-1.5 bg-violet-500/55 rounded-full animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '2.9s' }}></div>
        <div className="absolute top-60 left-2/3 w-2.5 h-2.5 bg-emerald-500/45 rounded-full animate-bounce" style={{ animationDelay: '1.1s', animationDuration: '2.0s' }}></div>
        <div className="absolute top-76 left-1/4 w-2 h-2 bg-lime-500/50 rounded-full animate-bounce" style={{ animationDelay: '1.4s', animationDuration: '2.5s' }}></div>
        <div className="absolute top-92 left-3/4 w-1.5 h-1.5 bg-rose-500/55 rounded-full animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '2.3s' }}></div>
        
        {/* Bottom scattered dots */}
        <div className="absolute bottom-20 left-20 w-2.5 h-2.5 bg-sky-500/45 rounded-full animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2.7s' }}></div>
        <div className="absolute bottom-36 left-40 w-2 h-2 bg-fuchsia-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.9s', animationDuration: '2.1s' }}></div>
        <div className="absolute bottom-52 left-60 w-1.5 h-1.5 bg-amber-500/55 rounded-full animate-bounce" style={{ animationDelay: '1.3s', animationDuration: '2.8s' }}></div>
        <div className="absolute bottom-24 right-28 w-2 h-2 bg-slate-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2.2s' }}></div>
        <div className="absolute bottom-40 right-48 w-2.5 h-2.5 bg-zinc-500/45 rounded-full animate-bounce" style={{ animationDelay: '1.0s', animationDuration: '2.6s' }}></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
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
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group relative overflow-hidden">
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

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </section>
  );
}
