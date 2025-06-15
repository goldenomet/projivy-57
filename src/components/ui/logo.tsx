
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = false }: LogoProps) {
  const sizes = {
    sm: "h-10 w-10",
    md: "h-14 w-14", 
    lg: "h-16 w-16"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src="/lovable-uploads/91e719aa-0b75-4c1e-a8de-ce6ccbed860b.png" 
        alt="Projivy Logo" 
        className={cn("object-contain", sizes[size])}
      />
      {showText && (
        <h2 className={cn(
          size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl", 
          "font-semibold text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text tracking-tight"
        )}>
          Projivy
        </h2>
      )}
    </div>
  );
}
