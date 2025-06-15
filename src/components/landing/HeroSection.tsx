import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Star, ArrowRight, Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function HeroSection() {
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation({ threshold: 0.2 });
  const { ref: textRef, isInView: textInView } = useScrollAnimation({ threshold: 0.3 });
  const { ref: imageRef, isInView: imageInView } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={heroRef} className="w-full py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-full blur-3xl animate-floating"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-floating" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div 
            ref={textRef}
            className={`text-center lg:text-left space-y-8 transition-all duration-1000 ${
              textInView 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            <div className={`flex justify-center lg:justify-start transition-all duration-700 ${
              textInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <img 
                src="/lovable-uploads/91e719aa-0b75-4c1e-a8de-ce6ccbed860b.png" 
                alt="Logo" 
                className="h-32 w-32 object-contain hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <h2 className={`text-5xl md:text-7xl font-bold tracking-tight leading-tight transition-all duration-1000 delay-200 ${
              textInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              Manage Projects with
              <span className="text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text animate-shimmer inline-block"> Confidence</span>
            </h2>
            
            <p className={`text-xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-1000 delay-300 ${
              textInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              The ultimate project management platform that helps teams collaborate, 
              track progress, and deliver results efficiently. Transform your workflow today.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-500 ${
              textInView 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
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
            
            <div className={`flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground transition-all duration-1000 delay-700 ${
              textInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center gap-1 hover:text-green-500 transition-colors duration-300">
                <CheckCircle className="h-4 w-4 text-green-500 animate-bounce-gentle" />
                Free 7-day trial
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
          <div 
            ref={imageRef}
            className={`flex justify-center lg:justify-end transition-all duration-1200 delay-300 ${
              imageInView 
                ? 'opacity-100 translate-x-0 scale-100 rotate-0' 
                : 'opacity-0 translate-x-12 scale-90 rotate-3'
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-soft"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-3xl blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
              <img 
                src="/lovable-uploads/2fdc24f0-651a-49b6-9a2c-0fb781bf042c.png" 
                alt="Professional woman working at desk with laptop" 
                className="relative w-[500px] h-auto drop-shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-700 hover:rotate-1 hover:drop-shadow-3xl" 
              />
              {/* Floating elements around the image */}
              <div className="absolute top-10 -left-10 w-4 h-4 bg-primary rounded-full animate-floating opacity-60"></div>
              <div className="absolute bottom-20 -right-8 w-6 h-6 bg-purple-500 rounded-full animate-floating opacity-60" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/2 -right-12 w-3 h-3 bg-pink-500 rounded-full animate-floating opacity-60" style={{ animationDelay: '0.7s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
