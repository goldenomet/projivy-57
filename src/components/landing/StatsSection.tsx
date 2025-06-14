
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Shield, Clock } from "lucide-react";

export function StatsSection() {
  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "50K+", label: "Projects Completed", icon: CheckCircle },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "Support", icon: Clock }
  ];

  return (
    <section className="w-full py-16 animate-fade-in">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
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
