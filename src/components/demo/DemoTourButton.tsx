
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { DemoTour } from "./DemoTour";

interface DemoTourButtonProps {
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function DemoTourButton({ variant = "outline", size = "lg", className }: DemoTourButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsOpen(true)}
      >
        <Play className="mr-2 h-4 w-4" />
        Watch Demo
      </Button>
      <DemoTour isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
