
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
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
      <div className={cn("rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-sm", sizes[size])}>
        <Sparkles className={cn("text-primary-foreground", size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6")} />
      </div>
      {showText && (
        <h2 className={cn(
          textSizes[size], 
          "font-semibold text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text tracking-tight"
        )}>
          Projivy
        </h2>
      )}
    </div>
  );
}
