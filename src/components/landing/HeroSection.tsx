
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { DemoTourButton } from "@/components/demo/DemoTourButton";

export function HeroSection() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={elementRef}
      className="w-full min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl animate-floating"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-2xl animate-bounce-gentle"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <div className={`space-y-8 transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-x-0 scale-100' 
            : 'opacity-0 -translate-x-12 scale-95'
        }`}>
          <div className="space-y-6">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Transform Your 
              <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text"> Project Management</span>
            </h1>
            
            <p className={`text-xl text-muted-foreground leading-relaxed max-w-lg transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Streamline your workflow, boost team productivity, and deliver projects on time with Projivy's intelligent project management platform.
            </p>
          </div>

          {/* Feature highlights */}
          <div className={`space-y-3 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {["Real-time collaboration", "Advanced analytics", "Automated workflows"].map((feature, index) => (
              <div 
                key={feature} 
                className={`flex items-center gap-3 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
              >
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <DemoTourButton 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
            />
          </div>

          <p className={`text-sm text-muted-foreground transition-all duration-1000 delay-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            ✨ Start your 14-day free trial • No credit card required
          </p>
        </div>

        {/* Right side - Hero image */}
        <div className={`flex justify-center lg:justify-end transition-all duration-1000 ease-out delay-300 ${
          isVisible 
            ? 'opacity-100 translate-x-0 scale-100' 
            : 'opacity-0 translate-x-12 scale-90'
        }`}>
          <div className="relative">
            <img 
              src="/lovable-uploads/8cc9898e-b955-410e-a1d2-822ce8f2886e.png" 
              alt="Project management dashboard interface showing analytics, tasks, and team collaboration" 
              className="w-full max-w-2xl h-auto drop-shadow-2xl animate-floating"
            />
            {/* Floating elements around the image */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-bounce-gentle"></div>
            <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-purple-600/20 rounded-full animate-pulse-soft"></div>
            <div className="absolute top-1/2 -left-6 w-6 h-6 bg-blue-500/30 rounded-full animate-floating"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
