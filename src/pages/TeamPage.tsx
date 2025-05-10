
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { users } from "@/data/mockData";
import { User } from "@/types/project";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, ChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setTeamMembers(users);
    }, 300);
  }, []);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <Link to="/">
            <Button variant="ghost" size="sm" className="-ml-2 hover:scale-105 transition-transform">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">Team</h1>
        </div>

        <Card className="border bg-gradient-to-br from-card to-card/90 shadow-md animate-slide-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Team Members</span>
                </CardTitle>
                <CardDescription>
                  Manage your team members and their roles
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-gradient-to-r from-secondary/20 to-secondary/10 border-secondary/30">{teamMembers.length} Members</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-10 bg-gradient-to-br from-card to-background border-input focus:ring-2 focus:ring-primary/30 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {filteredMembers.length > 0 ? (
              <div className="bg-gradient-to-br from-card to-card/95 rounded-lg border overflow-hidden animate-slide-in" style={{ animationDelay: "0.3s" }}>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/60 hover:to-muted/40">
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member, index) => (
                      <TableRow 
                        key={member.id} 
                        className="animate-fade-in hover:bg-gradient-to-r hover:from-accent/30 hover:to-accent/10 transition-colors"
                        style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-r from-primary/20 to-purple-500/20 hover:scale-110 transition-transform">
                              <img
                                src={member.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`}
                                alt={member.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{member.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell className="text-muted-foreground">{member.id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-12 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 animate-pulse">
                <p className="text-muted-foreground">
                  {teamMembers.length > 0 ? "No members match your search" : "Loading team members..."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
