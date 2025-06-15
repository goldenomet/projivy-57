import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Clock, BarChart3 } from "lucide-react";
export function FeaturesSection() {
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
  return <section className="w-full py-20 animate-slide-in relative">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Top left illustration */}
        <div className="absolute left-2 top-8 sm:left-4 sm:top-12 lg:left-8 lg:top-16">
          <img alt="Project management workflow illustration with document and task organization" className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain animate-floating opacity-80" src="/lovable-uploads/385559a7-9e1c-4611-ae4d-bcfc73bdb7f3.png" />
        </div>

        {/* Right side illustration */}
        <div className="absolute right-2 bottom-8 sm:right-4 sm:bottom-12 lg:right-8 lg:bottom-16">
          <img alt="Team collaboration illustration with people working together on analytics" className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 opacity-80 object-cover" src="/lovable-uploads/6a108e84-6201-4318-98bd-8b6dd7131802.png" />
        </div>

        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">
            Everything you need to 
            <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text"> succeed</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your workflow and boost team productivity
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-start">
          {features.map((feature, index) => <Card key={index} className="border-border/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <CardHeader className="relative">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
}
