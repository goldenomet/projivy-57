
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full py-20 text-center animate-fade-in relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 text-primary/20 animate-floating">
          <Sparkles className="h-8 w-8" />
        </div>
        <div className="absolute top-20 right-20 text-purple-500/20 animate-floating" style={{ animationDelay: '1s' }}>
          <Star className="h-6 w-6" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-pink-500/20 animate-floating" style={{ animationDelay: '2s' }}>
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <Card className="max-w-4xl mx-auto border-primary/20 bg-gradient-to-r from-primary/5 via-background to-purple-600/5 relative overflow-hidden group hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 animate-pulse-soft opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
          
          {/* Animated particles */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-primary/60 rounded-full animate-floating opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-500/60 rounded-full animate-floating opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-500/60 rounded-full animate-floating opacity-60" style={{ animationDelay: '2s' }}></div>

          <CardHeader className="relative animate-slide-in">
            <CardTitle className="text-3xl mb-4 group-hover:scale-105 transition-transform duration-300">
              Ready to transform your workflow?
            </CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed group-hover:text-foreground transition-colors duration-300">
              Join thousands of teams already using Projivy to deliver amazing results. 
              Start your free trial today and experience the difference.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-6 animate-scale-in animate-stagger-1">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group/btn relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-all duration-300 relative z-10" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:-translate-y-1 group/btn2">
                <Sparkles className="mr-2 h-5 w-5 group-hover/btn2:rotate-180 group-hover/btn2:scale-110 transition-all duration-500" />
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground animate-fade-in animate-stagger-2 hover:text-foreground transition-colors duration-300">
              No setup fees • Cancel anytime • 24/7 support included
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
