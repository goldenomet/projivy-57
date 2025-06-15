
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Shield, Clock, TrendingDown, TrendingUp } from "lucide-react";

export function StatsSection() {
  const stats = [{
    number: "40%",
    label: "Cost Reduction",
    description: "Average savings on project overhead",
    icon: TrendingDown
  }, {
    number: "3x",
    label: "Productivity Boost",
    description: "Faster project completion",
    icon: TrendingUp
  }, {
    number: "99.9%",
    label: "Uptime",
    description: "Reliable performance",
    icon: Shield
  }, {
    number: "24/7",
    label: "Support",
    description: "Always here to help",
    icon: Clock
  }];

  return (
    <section className="w-full py-20 animate-fade-in relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          animation: 'slide-in 20s linear infinite'
        }}></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-slide-in">
          <h3 className="text-3xl font-bold mb-4">
            Save costs while
            <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text animate-shimmer"> boosting productivity</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Projivy helps teams reduce project costs and deliver faster results through intelligent automation and streamlined workflows
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image with enhanced animations */}
          <div className="flex justify-center lg:justify-start animate-slide-in animate-stagger-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-soft"></div>
              <img 
                alt="Productivity and cost-saving illustration with charts, coins, and project management elements" 
                className="relative w-full max-w-lg h-auto hover:scale-105 hover:-translate-y-2 transition-all duration-700 drop-shadow-2xl" 
                src="/lovable-uploads/cd041f82-636a-46be-aece-a4c4ad2b38bd.png" 
              />
              {/* Animated success indicators */}
              <div className="absolute top-10 -right-4 bg-green-500 text-white p-2 rounded-full animate-bounce-gentle opacity-80">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div className="absolute bottom-20 -left-4 bg-blue-500 text-white p-2 rounded-full animate-bounce-gentle opacity-80" style={{ animationDelay: '1s' }}>
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Right side - Stats with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="text-center p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 group cursor-pointer border-2 hover:border-primary/20 animate-scale-in relative overflow-hidden"
                style={{ animationDelay: `${(index + 2) * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <CardContent className="pt-6 relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 mx-auto mb-4 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                  <div className="text-sm font-medium mb-1 group-hover:text-primary transition-colors duration-300">{stat.label}</div>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">{stat.description}</div>
                </CardContent>
                
                {/* Floating particles */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-floating transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-floating transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
