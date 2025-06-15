
import { Card } from "@/components/ui/card";
import { Shield, Globe, Zap, Award, TrendingUp, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function AdditionalFeaturesSection() {
  const { elementRef: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { elementRef: rightRef, isVisible: rightVisible } = useScrollAnimation();

  return (
    <section className="w-full py-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            ref={leftRef}
            className={`space-y-6 transition-all duration-1000 ease-out ${
              leftVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <h3 className="text-3xl font-bold">
              Built for the
              <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text"> modern workplace</span>
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Projivy adapts to your team's unique workflow with flexible features and integrations.
            </p>
            <div className="space-y-4">
              {[
                { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption and security" },
                { icon: Globe, title: "Global Access", desc: "Work from anywhere, anytime" },
                { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed and performance" },
                { icon: Award, title: "Award Winning", desc: "Recognized by industry leaders" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 group hover:bg-primary/5 p-3 rounded-lg transition-all duration-300 ${
                    leftVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-8'
                  }`}
                  style={{
                    transitionDelay: leftVisible ? `${(index + 2) * 150}ms` : '0ms'
                  }}
                >
                  <item.icon className="h-6 w-6 text-primary mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            ref={rightRef}
            className={`grid grid-cols-2 gap-4 transition-all duration-1000 ease-out ${
              rightVisible 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-12 scale-90'
            }`}
          >
            {[
              { icon: TrendingUp, title: "98%", subtitle: "Client Satisfaction", color: "from-green-500 to-emerald-500" },
              { icon: Users, title: "500+", subtitle: "Team Members", color: "from-blue-500 to-cyan-500" },
              { icon: Globe, title: "50+", subtitle: "Countries", color: "from-purple-500 to-pink-500" },
              { icon: Award, title: "#1", subtitle: "PM Tool 2024", color: "from-orange-500 to-red-500" }
            ].map((metric, index) => (
              <Card 
                key={index} 
                className={`text-center p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group ${
                  rightVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-90'
                }`}
                style={{
                  transitionDelay: rightVisible ? `${index * 150}ms` : '0ms'
                }}
              >
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${metric.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{metric.title}</div>
                <div className="text-sm text-muted-foreground">{metric.subtitle}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
