
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const navigate = useNavigate();

  const handlePlanSelection = (planName: string, price: string) => {
    console.log(`Selected plan: ${planName} - ${price}`);
    
    if (planName === "Starter") {
      // Navigate to auth for free plan
      navigate("/auth");
    } else if (planName === "Professional") {
      // Navigate to auth for trial
      navigate("/auth");
    } else if (planName === "Enterprise") {
      // For enterprise, we could navigate to a contact form or external link
      window.open("mailto:sales@projivy.com?subject=Enterprise Plan Inquiry", "_blank");
    }
  };

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 3 team members",
        "3 projects",
        "Basic task management",
        "Email support",
        "100MB storage"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "$12",
      period: "/month",
      description: "Ideal for growing teams",
      features: [
        "Up to 15 team members",
        "Unlimited projects",
        "Advanced task management",
        "Time tracking & reporting",
        "Team collaboration tools",
        "Real-time chat",
        "Calendar integration",
        "File management (5GB storage)",
        "Priority support",
        "Data export capabilities"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "$24",
      period: "/month",
      description: "For large organizations",
      features: [
        "Unlimited team members",
        "Advanced team metrics",
        "Custom project templates",
        "Advanced analytics & insights",
        "Meeting scheduling",
        "Productivity tracking",
        "Admin controls",
        "Unlimited storage",
        "Custom integrations support",
        "Dedicated support",
        "White-label options"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/landing">
            <Button variant="ghost" className="hover:bg-primary/10 transition-all duration-300 hover:scale-105">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose the plan that fits your team's needs. All plans include our core features with no hidden fees.
          </p>
          <div className="mt-6 flex justify-center">
            <Badge className="bg-green-100 text-green-700 px-4 py-2">
              7-day free trial • No credit card required
            </Badge>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12 sm:mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-primary shadow-xl scale-105 lg:scale-110 ring-2 ring-primary/20' 
                  : 'hover:border-primary/30'
              } animate-scale-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-2 text-sm font-medium shadow-lg">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-xl sm:text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-lg">{plan.period}</span>
                </div>
                <CardDescription className="text-sm sm:text-base">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => handlePlanSelection(plan.name, plan.price)}
                  className={`w-full transition-all duration-300 hover:scale-105 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg' 
                      : 'hover:bg-primary/90'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center bg-muted/30 rounded-2xl p-8 sm:p-12 animate-slide-in">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
              <p className="text-muted-foreground text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-muted-foreground text-sm">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a setup fee?</h4>
              <p className="text-muted-foreground text-sm">No setup fees. Pay only for what you use, when you use it.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do you offer discounts for nonprofits?</h4>
              <p className="text-muted-foreground text-sm">Yes! We offer special pricing for nonprofits and educational institutions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
