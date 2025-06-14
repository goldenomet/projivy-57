import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Shield, Clock } from "lucide-react";
export function StatsSection() {
  const stats = [{
    number: "10K+",
    label: "Active Users",
    icon: Users
  }, {
    number: "50K+",
    label: "Projects Completed",
    icon: CheckCircle
  }, {
    number: "99.9%",
    label: "Uptime",
    icon: Shield
  }, {
    number: "24/7",
    label: "Support",
    icon: Clock
  }];
  return;
}