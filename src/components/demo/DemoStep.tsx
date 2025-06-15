
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="secondary">
            Step {stepNumber} of {totalSteps}
          </Badge>
          <h3 className="text-xl font-semibold">{step.title}</h3>
        </div>
        <p className="text-muted-foreground">{step.subtitle}</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Screenshot/Image */}
        <div className="relative">
          <img
            src={step.image}
            alt={step.title}
            className="w-full rounded-lg border shadow-lg animate-fade-in"
          />
          {/* Overlay highlights */}
          <div className="absolute inset-0 pointer-events-none">
            {step.highlights.map((highlight, index) => (
              <div
                key={index}
                className="absolute bg-primary/20 border-2 border-primary rounded-lg animate-pulse"
                style={{
                  // These would be positioned based on the feature locations
                  top: `${20 + index * 15}%`,
                  left: `${10 + index * 20}%`,
                  width: "120px",
                  height: "40px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What you're seeing</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base leading-relaxed mb-4">
              {step.description}
            </CardDescription>
            
            {/* Key Features */}
            <div>
              <h4 className="font-medium mb-3">Key Features:</h4>
              <ul className="space-y-2">
                {step.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
