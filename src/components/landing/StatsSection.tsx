
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Shield, Clock } from "lucide-react";

export function StatsSection() {
  const stats = [{
    number: "10K+",
    label: "Active Users",
    icon: Users
  }, {
    number: "50K+",
    label: "Projects Completed",
    icon: CheckCircle
  }, {
    number: "99.9%",
    label: "Uptime",
    icon: Shield
  }, {
    number: "24/7",
    label: "Support",
    icon: Clock
  }];

  return (
    <section className="w-full py-20 animate-fade-in">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="pt-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
