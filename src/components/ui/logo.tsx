
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = false }: LogoProps) {
  const sizes = {
    sm: "h-12 w-12",
    md: "h-16 w-16", 
    lg: "h-20 w-20"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/lovable-uploads/91e719aa-0b75-4c1e-a8de-ce6ccbed860b.png" 
        alt="Projivy Logo" 
        className={cn("object-contain", sizes[size])}
      />
    </div>
  );
}
