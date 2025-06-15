
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

  const handleOpenTour = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Opening demo tour - button clicked");
    setIsOpen(true);
  };

  const handleCloseTour = () => {
    console.log("Closing demo tour");
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleOpenTour}
        type="button"
      >
        <Play className="mr-2 h-4 w-4" />
        Watch Demo
      </Button>
      {isOpen && <DemoTour isOpen={isOpen} onClose={handleCloseTour} />}
    </>
  );
}
