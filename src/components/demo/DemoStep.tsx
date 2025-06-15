
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface DemoStepProps {
  step: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    features: string[];
    highlights: string[];
  };
  stepNumber: number;
  totalSteps: number;
}

export function DemoStep({ step, stepNumber, totalSteps }: DemoStepProps) {
  return (
    <div className="h-full flex flex-col p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="secondary" className="px-3 py-1">
            Step {stepNumber} of {totalSteps}
          </Badge>
          <h3 className="text-xl sm:text-2xl font-bold">{step.title}</h3>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">{step.subtitle}</p>
      </div>

      {/* Content Grid */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6 overflow-auto">
        {/* Screenshot */}
        <div className="order-2 xl:order-1">
          <div className="relative group">
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-auto rounded-xl border shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Description and Features */}
        <div className="order-1 xl:order-2 space-y-4">
          <Card className="border-0 shadow-none bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl">What you're seeing</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm sm:text-base leading-relaxed mb-4 text-foreground/80">
                {step.description}
              </CardDescription>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="border-0 shadow-none bg-background/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid gap-3">
                {step.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
