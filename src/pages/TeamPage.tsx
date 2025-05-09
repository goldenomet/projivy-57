
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
import { Users, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
                <CardDescription>
                  Manage your team members and their roles
                </CardDescription>
              </div>
              <Badge variant="outline">{teamMembers.length} Members</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {filteredMembers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
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
            ) : (
              <div className="py-12 flex items-center justify-center border rounded-lg bg-muted/30 text-muted-foreground">
                {teamMembers.length > 0 ? "No members match your search" : "Loading team members..."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
