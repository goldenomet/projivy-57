import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Clock, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function FeaturesSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation({ threshold: 0.3 });
  const { ref: featuresRef, isInView: featuresInView } = useScrollAnimation({ threshold: 0.2 });

  const features = [{
    icon: CheckCircle,
    title: "Task Management",
    description: "Organize and track your tasks with powerful project management tools.",
    gradient: "from-blue-500 to-cyan-500"
  }, {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with your team members and stakeholders.",
    gradient: "from-purple-500 to-pink-500"
  }, {
    icon: Clock,
    title: "Time Tracking",
    description: "Monitor time spent on projects and improve productivity insights.",
    gradient: "from-green-500 to-emerald-500"
  }, {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Get detailed insights into your project progress and team performance.",
    gradient: "from-orange-500 to-red-500"
  }];

  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-purple-500/20 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-pink-500/20 rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Right side illustration */}
        <div className="absolute right-2 top-10 sm:right-4 lg:right-8 lg:top-16 opacity-20 sm:opacity-30 lg:opacity-50 pointer-events-none">
          <img 
            alt="Team collaboration illustration with people working together on analytics" 
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-80 lg:h-80 object-cover animate-floating" 
            src="/lovable-uploads/6a108e84-6201-4318-98bd-8b6dd7131802.png" 
          />
        </div>

        <div 
          ref={headerRef}
          className={`text-center mb-16 relative z-20 transition-all duration-1000 ${
            headerInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h3 className="text-4xl font-bold mb-4">
            Everything you need to 
            <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text hover:from-purple-600 hover:to-primary transition-all duration-500"> succeed</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your workflow and boost team productivity
          </p>
        </div>
        
        <div ref={featuresRef} className="flex justify-start relative z-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`border-border/50 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 cursor-pointer group overflow-hidden relative bg-card/95 backdrop-blur-sm hover:rotate-1 ${
                  featuresInView 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{ 
                  transitionDelay: featuresInView ? `${index * 150}ms` : '0ms',
                  transitionDuration: '800ms'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-15 transition-all duration-500`}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <CardHeader className="relative">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary group-hover:scale-105 transition-all duration-300 origin-left">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-floating transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-floating transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
