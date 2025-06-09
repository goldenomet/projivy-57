
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SubscriptionPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  
  const pricingPlans = [
    {
      name: "Free",
      description: "Basic project management for individuals",
      price: { monthly: 0, yearly: 0 },
      features: [
        "Up to 5 projects",
        "Basic task management",
        "Team collaboration"
      ]
    },
    {
      name: "Pro",
      description: "Enhanced features for professionals",
      price: { monthly: 9.99, yearly: 99.99 },
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Project templates",
        "File management",
        "Email notifications",
      ],
      popular: true
    },
    {
      name: "Team",
      description: "Complete solution for teams",
      price: { monthly: 19.99, yearly: 199.99 },
      features: [
        "Everything in Pro",
        "Team performance metrics",
        "Time tracking",
        "Meeting integration",
        "Advanced collaboration",
        "Priority support"
      ]
    }
  ];
  
  const premiumFeatures = [
    {
      title: "Analytics Dashboard",
      description: "Visualize project progress and team performance with interactive charts and graphs."
    },
    {
      title: "Project Templates",
      description: "Save time by using pre-built project templates or create your own for repeated use."
    },
    {
      title: "Advanced Task Management",
      description: "Prioritize tasks with AI assistance, set dependencies, and track time spent."
    },
    {
      title: "Team Collaboration",
      description: "Comments, @mentions, and discussions on tasks and projects to keep everyone in sync."
    },
    {
      title: "File Management",
      description: "Upload, organize and share files directly within projects and tasks."
    },
    {
      title: "Export/Import",
      description: "Export your project data in various formats or import existing projects."
    }
  ];
  
  const discount = billingPeriod === "yearly" ? 16.67 : 0; // ~2 months free for yearly
  
  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-2 animate-slide-in">
          <h1 className="text-3xl font-bold tracking-tight">Upgrade Your Experience</h1>
          <p className="text-muted-foreground">Choose the plan that's right for you and your team</p>
        </div>
        
        <div className="flex justify-center animate-scale-in animate-stagger-1">
          <Tabs 
            value={billingPeriod}
            onValueChange={(value) => setBillingPeriod(value as "monthly" | "yearly")} 
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-2 w-full transition-all duration-300">
              <TabsTrigger value="monthly" className="transition-all duration-200 hover:scale-105">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="transition-all duration-200 hover:scale-105">
                Yearly
                <span className="ml-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 animate-pulse-soft">
                  Save {discount}%
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col interactive-card hover-glow animate-slide-in ${
                plan.popular 
                  ? 'border-primary shadow-md dark:shadow-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5' 
                  : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl transition-colors duration-200 hover:text-primary">{plan.name}</CardTitle>
                    <CardDescription className="mt-1">{plan.description}</CardDescription>
                  </div>
                  {plan.popular && (
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full animate-bounce-gentle">
                      Popular
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <span className="text-3xl font-bold hover:text-primary transition-colors duration-200">
                    ${plan.price[billingPeriod].toFixed(2)}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {billingPeriod === "monthly" ? "/month" : "/year"}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={feature} 
                      className="flex items-start animate-fade-in"
                      style={{ animationDelay: `${(index * 0.1) + (featureIndex * 0.05)}s` }}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0 transition-transform duration-200 hover:scale-110" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                    plan.name !== "Free" 
                      ? "bg-primary hover:bg-primary/90 hover:shadow-lg" 
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  variant={plan.name === "Free" ? "outline" : "default"}
                >
                  {plan.name === "Free" ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="my-12 space-y-4 animate-slide-in animate-stagger-3">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Premium Features</h2>
            <p className="text-muted-foreground">Everything you need to boost productivity</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {premiumFeatures.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="bg-card/50 backdrop-blur-sm interactive-card hover-glow animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg transition-colors duration-200 hover:text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center animate-slide-in animate-stagger-4">
          <Button size="lg" className="bg-primary btn-gradient text-white font-semibold px-8">
            Upgrade Now
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Cancel anytime. All plans include a 14-day free trial.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
