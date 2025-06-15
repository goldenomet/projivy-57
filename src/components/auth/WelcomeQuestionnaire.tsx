
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useThemeManager } from "@/hooks/use-theme-manager";
import { AppTheme } from "@/types/theme";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeQuestionnaireProps {
  onComplete: () => void;
}

export function WelcomeQuestionnaire({ onComplete }: WelcomeQuestionnaireProps) {
  const { availableThemes, setTheme } = useThemeManager();
  const [selectedTheme, setSelectedTheme] = useState<AppTheme>(availableThemes[0]);

  const handleComplete = () => {
    setTheme(selectedTheme);
    // Store that user has completed questionnaire
    localStorage.setItem('questionnaire-completed', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Projivy! 🎉</CardTitle>
          <CardDescription className="text-base">
            Let's personalize your experience by choosing your preferred theme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose your theme:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableThemes.map((theme) => (
                <div
                  key={theme.id}
                  className={cn(
                    "relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105",
                    selectedTheme.id === theme.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setSelectedTheme(theme)}
                >
                  {selectedTheme.id === theme.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {Object.entries(theme.colors).slice(0, 3).map(([key, color]) => (
                        <div
                          key={key}
                          className="w-4 h-4 rounded-sm"
                          style={{ backgroundColor: `hsl(${color})` }}
                        />
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm">{theme.name}</h4>
                      <p className="text-xs text-muted-foreground">{theme.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => handleComplete()}>
              Skip for now
            </Button>
            <Button onClick={handleComplete}>
              Continue with {selectedTheme.name}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
