
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Star, ArrowRight, Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function HeroSection() {
  const { elementRef: textRef, isVisible: textVisible } = useScrollAnimation();
  const { elementRef: imageRef, isVisible: imageVisible } = useScrollAnimation();

  return (
    <section className="w-full py-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div 
            ref={textRef}
            className={`text-center lg:text-left space-y-8 transition-all duration-1000 ease-out ${
              textVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="flex justify-center lg:justify-start">
              <img 
                src="/lovable-uploads/91e719aa-0b75-4c1e-a8de-ce6ccbed860b.png" 
                alt="Logo" 
                className={`h-32 w-32 object-contain transition-all duration-1000 delay-200 ${
                  textVisible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
                }`}
              />
            </div>
            
            <h2 className={`text-5xl md:text-7xl font-bold tracking-tight leading-tight transition-all duration-1000 delay-300 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Manage Projects with
              <span className="text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text animate-pulse-soft"> Confidence</span>
            </h2>
            
            <p className={`text-xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-1000 delay-500 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              The ultimate project management platform that helps teams collaborate, 
              track progress, and deliver results efficiently. Transform your workflow today.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-700 ${
              textVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}>
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
            
            <div className={`flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground transition-all duration-1000 delay-900 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free 7-day trial
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </div>
          
          {/* Right side - Illustration */}
          <div 
            ref={imageRef}
            className={`flex justify-center lg:justify-end transition-all duration-1000 ease-out ${
              imageVisible 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-12 scale-90'
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-3xl blur-2xl animate-pulse-soft"></div>
              <img 
                src="/lovable-uploads/2fdc24f0-651a-49b6-9a2c-0fb781bf042c.png" 
                alt="Professional woman working at desk with laptop" 
                className="relative w-[500px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
