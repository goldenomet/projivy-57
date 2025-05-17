
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sparkles } from "lucide-react";

export function PremiumBadge() {
  return (
    <div className="flex items-center space-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 cursor-pointer">
            <Sparkles className="h-3 w-3 mr-1" /> Free Trial
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="w-[200px] text-xs">
            You're currently using the free version. Upgrade to Premium for advanced features!
          </p>
        </TooltipContent>
      </Tooltip>
      <Button variant="outline" size="sm" className="border-amber-400 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20">
        Upgrade
      </Button>
    </div>
  );
}
