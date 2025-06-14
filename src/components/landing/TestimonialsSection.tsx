
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "Projivy transformed how our team collaborates. The intuitive interface and powerful features made project management effortless.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder", 
      company: "InnovateLab",
      content: "From idea to execution, Projivy keeps everything organized. It's the perfect tool for growing teams.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Team Lead",
      company: "DesignStudio",
      content: "The time tracking and analytics features gave us insights we never had before. Game changer for productivity.",
      rating: 5,
      avatar: "EW"
    }
  ];

  return (
    <section className="w-full py-20 animate-fade-in">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">
            Loved by teams
            <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text"> worldwide</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about transforming their project management
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
