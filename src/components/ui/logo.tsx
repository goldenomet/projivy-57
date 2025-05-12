
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  
  useEffect(() => {
    // Create a periodic animation effect
    const interval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 700);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  };
  
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-sm transition-all duration-500",
        sparkleAnimation ? "scale-110 rotate-12" : "",
        sizes[size]
      )}>
        <Sparkles 
          className={cn(
            "text-primary-foreground transition-all duration-500",
            sparkleAnimation ? "scale-125 opacity-90" : "",
            size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6"
          )} 
        />
      </div>
      {showText && (
        <h2 className={cn(
          textSizes[size], 
          "font-semibold text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text tracking-tight",
          sparkleAnimation ? "tracking-wide" : "tracking-tight",
          "transition-all duration-500"
        )}>
          Projivy
        </h2>
      )}
    </div>
  );
}
