
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Shield, Clock, TrendingDown, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function StatsSection() {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation();

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
    <section className="w-full py-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            headerVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <h3 className="text-3xl font-bold mb-4">
            Save costs while
            <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text"> boosting productivity</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Projivy helps teams reduce project costs and deliver faster results through intelligent automation and streamlined workflows
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div 
            ref={imageRef}
            className={`flex justify-center lg:justify-start transition-all duration-1000 ease-out ${
              imageVisible 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 -translate-x-12 scale-90'
            }`}
          >
            <img 
              alt="Productivity and cost-saving illustration with charts, coins, and project management elements" 
              className="w-full max-w-lg h-auto" 
              src="/lovable-uploads/cd041f82-636a-46be-aece-a4c4ad2b38bd.png" 
            />
          </div>
          
          {/* Right side - Stats */}
          <div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className={`text-center p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                  statsVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-90'
                }`}
                style={{
                  transitionDelay: statsVisible ? `${index * 200}ms` : '0ms'
                }}
              >
                <CardContent className="pt-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
