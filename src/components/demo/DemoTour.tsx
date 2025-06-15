
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { DemoStep } from "./DemoStep";
import { tourSteps } from "./tourSteps";

interface DemoTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoTour({ isOpen, onClose }: DemoTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-7xl h-[95vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b bg-background">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Play className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Projivy Demo Tour</h2>
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {tourSteps.length}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Main Demo Area */}
          <div className="flex-1 overflow-auto">
            <DemoStep 
              step={tourSteps[currentStep]} 
              stepNumber={currentStep + 1}
              totalSteps={tourSteps.length}
            />
          </div>

          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block w-80 border-l bg-muted/20 overflow-auto">
            <div className="p-6">
              <h3 className="font-semibold mb-4 text-lg">Demo Steps</h3>
              <div className="space-y-2">
                {tourSteps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      index === currentStep
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-muted hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        index === currentStep
                          ? "bg-primary-foreground text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{step.title}</div>
                        <div className="text-xs opacity-70 truncate">{step.subtitle}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-t bg-background">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {/* Mobile step indicators */}
          <div className="flex items-center gap-2 lg:hidden">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentStep ? "bg-primary w-6" : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          {/* Desktop step indicators */}
          <div className="hidden lg:flex items-center gap-2">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentStep ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={currentStep === tourSteps.length - 1}
            className="flex items-center gap-2"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
