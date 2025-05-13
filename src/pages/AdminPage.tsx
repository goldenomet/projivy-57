
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/project";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Users, Settings, Lock, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AdminPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if current user is admin (simplified for demo - replace with proper admin check)
  useEffect(() => {
    // For demo purposes, check if the email includes "admin"
    if (user?.email?.includes("admin")) {
      setIsAdmin(true);
    } else {
      // This is where you'd check admin status from your database
      // For now we'll just set a test admin
      setIsAdmin(true);
    }
  }, [user]);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*');
        
        if (error) {
          toast.error('Failed to fetch user profiles');
          console.error(error);
        } else {
          setProfiles(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (isAdmin) {
      fetchProfiles();
    }
  }, [isAdmin]);

  const filteredProfiles = profiles.filter(profile => 
    profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isAdmin) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-red-500">Access Denied</CardTitle>
              <CardDescription className="text-center">
                You do not have permission to access the admin dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link to="/dashboard">
                <Button>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Return to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage users, settings, and site content</p>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
            <TabsTrigger value="users" className="flex gap-2 items-center">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex gap-2 items-center">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex gap-2 items-center">
              <Lock className="h-4 w-4" />
              Permissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  User Management
                </CardTitle>
                <CardDescription>
                  View and manage all registered users in your application
                </CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-pulse">Loading user data...</div>
                  </div>
                ) : filteredProfiles.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProfiles.map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  {profile.avatar_url ? (
                                    <AvatarImage src={profile.avatar_url} />
                                  ) : (
                                    <AvatarFallback>{getInitials(profile.full_name)}</AvatarFallback>
                                  )}
                                </Avatar>
                                <div>
                                  <div className="font-medium">{profile.full_name || "No Name"}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{profile.id}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-300">
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500">
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex justify-center p-8 border rounded-md">
                    <p className="text-muted-foreground">No users found matching your search.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure application-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div>
                      <p>Welcome Email</p>
                      <p className="text-sm text-muted-foreground">
                        Send welcome emails to new users
                      </p>
                    </div>
                    <div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Site Information</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Site Name</label>
                      <Input defaultValue="Projivy" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Site Description</label>
                      <Input defaultValue="Project Management Solution" />
                    </div>
                    <Button className="w-fit">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>User Permissions</CardTitle>
                <CardDescription>
                  Configure roles and permissions for users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Admin Role</h3>
                    <p className="text-sm text-muted-foreground mb-4">Users with full system access</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500">Full Access</Badge>
                      <Badge className="bg-blue-500">Can Manage Users</Badge>
                      <Badge className="bg-green-500">Can Manage Settings</Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">User Role</h3>
                    <p className="text-sm text-muted-foreground mb-4">Regular application users</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500">Can Create Projects</Badge>
                      <Badge className="bg-green-500">Can Manage Own Data</Badge>
                    </div>
                  </div>
                  
                  <Button className="mt-4">Manage Role Assignments</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
