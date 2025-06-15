
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [{
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    content: "Projivy transformed how our team collaborates. The intuitive interface and powerful features made project management effortless.",
    rating: 5,
    avatar: "SC"
  }, {
    name: "Marcus Rodriguez",
    role: "Startup Founder",
    company: "InnovateLab",
    content: "From idea to execution, Projivy keeps everything organized. It's the perfect tool for growing teams.",
    rating: 5,
    avatar: "MR"
  }, {
    name: "Emily Watson",
    role: "Team Lead",
    company: "DesignStudio",
    content: "The time tracking and analytics features gave us insights we never had before. Game changer for productivity.",
    rating: 5,
    avatar: "EW"
  }];

  return (
    <section className="w-full py-20 bg-muted/30">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of teams who trust Projivy to manage their projects efficiently
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
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
