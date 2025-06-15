
import { Card } from "@/components/ui/card";
import { Shield, Globe, Zap, Award, TrendingUp, Users } from "lucide-react";

export function AdditionalFeaturesSection() {
  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern animate-slide-in"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 animate-slide-in">
            <h3 className="text-3xl font-bold">
              Built for the
              <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text hover:from-purple-600 hover:to-primary transition-all duration-500 animate-shimmer"> modern workplace</span>
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
                  className="flex items-start gap-3 group hover:bg-primary/5 p-3 rounded-lg transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-gradient-to-br from-primary to-purple-600 p-2 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-semibold group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 animate-scale-in animate-stagger-1">
            {[
              { icon: TrendingUp, title: "98%", subtitle: "Client Satisfaction", color: "from-green-500 to-emerald-500" },
              { icon: Users, title: "500+", subtitle: "Team Members", color: "from-blue-500 to-cyan-500" },
              { icon: Globe, title: "50+", subtitle: "Countries", color: "from-purple-500 to-pink-500" },
              { icon: Award, title: "#1", subtitle: "PM Tool 2024", color: "from-orange-500 to-red-500" }
            ].map((metric, index) => (
              <Card 
                key={index} 
                className="text-center p-6 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-2 group cursor-pointer relative overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${metric.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl relative`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">{metric.title}</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{metric.subtitle}</div>
                
                {/* Floating particles */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-floating transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-floating transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
