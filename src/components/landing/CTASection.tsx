
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { DemoTourButton } from "@/components/demo/DemoTourButton";

export function CTASection() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="w-full py-20 text-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Card 
          ref={elementRef}
          className={`max-w-4xl mx-auto border-primary/20 bg-gradient-to-r from-primary/5 via-background to-purple-600/5 relative overflow-hidden transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 animate-pulse-soft"></div>
          <CardHeader className="relative">
            <CardTitle className={`text-3xl mb-4 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Ready to transform your workflow?
            </CardTitle>
            <CardDescription className={`text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Join thousands of teams already using Projivy to deliver amazing results. 
              Start your free trial today and experience the difference.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-6">
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}>
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <DemoTourButton 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
              />
            </div>
            <p className={`text-sm text-muted-foreground transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              No setup fees • Cancel anytime • 24/7 support included
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
