
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
      <div className="min-h-screen relative overflow-hidden">
        {/* Full Background Design covering entire page */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large primary curved shape */}
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full transform rotate-12 opacity-90 animate-pulse-soft"></div>
          
          {/* Medium curved shape on left */}
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400 via-indigo-500 to-blue-500 rounded-full transform -rotate-12 opacity-70 animate-floating"></div>
          
          {/* Large shape covering right side */}
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-bl from-blue-300 via-blue-400 to-blue-500 rounded-full transform -rotate-12 opacity-60 animate-pulse-soft"></div>
          
          {/* Medium shape on top right */}
          <div className="absolute top-1/4 -right-28 w-80 h-80 bg-gradient-to-bl from-indigo-300 via-indigo-400 to-blue-400 rounded-full transform rotate-12 opacity-50 animate-floating"></div>
          
          {/* Bottom flowing shapes */}
          <div className="absolute -bottom-20 -left-24 w-80 h-80 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full transform rotate-6 opacity-60 animate-pulse-soft"></div>
          
          <div className="absolute -bottom-16 -right-20 w-64 h-64 bg-gradient-to-bl from-blue-400 via-blue-500 to-indigo-500 rounded-full transform -rotate-6 opacity-40 animate-pulse-soft"></div>
          
          {/* Center accent shapes */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-sky-400 via-sky-500 to-blue-400 rounded-full opacity-30 animate-bounce-gentle"></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-20 left-1/3 w-12 h-12 bg-white/20 rounded-full animate-bounce-gentle"></div>
          <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-white/30 rounded-full animate-floating"></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-60 animate-pulse-soft"></div>
          <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-white/40 rounded-full animate-bounce-gentle"></div>
          <div className="absolute top-16 right-1/4 w-4 h-4 bg-white/50 rounded-full animate-floating"></div>
        </div>

        <div className="flex items-center justify-center h-screen relative z-10">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Background Design covering entire page */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large primary curved shape */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full transform rotate-12 opacity-90 animate-pulse-soft"></div>
        
        {/* Medium curved shape on left */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400 via-indigo-500 to-blue-500 rounded-full transform -rotate-12 opacity-70 animate-floating"></div>
        
        {/* Large shape covering right side */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-bl from-blue-300 via-blue-400 to-blue-500 rounded-full transform -rotate-12 opacity-60 animate-pulse-soft"></div>
        
        {/* Medium shape on top right */}
        <div className="absolute top-1/4 -right-28 w-80 h-80 bg-gradient-to-bl from-indigo-300 via-indigo-400 to-blue-400 rounded-full transform rotate-12 opacity-50 animate-floating"></div>
        
        {/* Bottom flowing shapes */}
        <div className="absolute -bottom-20 -left-24 w-80 h-80 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full transform rotate-6 opacity-60 animate-pulse-soft"></div>
        
        <div className="absolute -bottom-16 -right-20 w-64 h-64 bg-gradient-to-bl from-blue-400 via-blue-500 to-indigo-500 rounded-full transform -rotate-6 opacity-40 animate-pulse-soft"></div>
        
        {/* Center accent shapes */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-sky-400 via-sky-500 to-blue-400 rounded-full opacity-30 animate-bounce-gentle"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-20 left-1/3 w-12 h-12 bg-white/20 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-white/30 rounded-full animate-floating"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-60 animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-white/40 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-16 right-1/4 w-4 h-4 bg-white/50 rounded-full animate-floating"></div>
      </div>

      <AppLayout>
        <div className="space-y-6 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg">
                Admin Dashboard
              </h1>
              <p className="text-white/90 drop-shadow-md">Manage users, settings, and site content</p>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm border-white/20 text-gray-700 hover:bg-white">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-4 bg-white/90 backdrop-blur-sm">
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
              <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
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
                      className="pl-10 bg-white/90 backdrop-blur-sm"
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
                    <div className="rounded-md border bg-white/90 backdrop-blur-sm">
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
                    <div className="flex justify-center p-8 border rounded-md bg-white/90 backdrop-blur-sm">
                      <p className="text-muted-foreground">No users found matching your search.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure application-wide settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="flex items-center justify-between border p-4 rounded-md bg-white/90 backdrop-blur-sm">
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
                        <Input defaultValue="Projivy" className="bg-white/90 backdrop-blur-sm" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Site Description</label>
                        <Input defaultValue="Project Management Solution" className="bg-white/90 backdrop-blur-sm" />
                      </div>
                      <Button className="w-fit">Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions">
              <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle>User Permissions</CardTitle>
                  <CardDescription>
                    Configure roles and permissions for users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 bg-white/90 backdrop-blur-sm">
                      <h3 className="font-medium mb-2">Admin Role</h3>
                      <p className="text-sm text-muted-foreground mb-4">Users with full system access</p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-500">Full Access</Badge>
                        <Badge className="bg-blue-500">Can Manage Users</Badge>
                        <Badge className="bg-green-500">Can Manage Settings</Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 bg-white/90 backdrop-blur-sm">
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
    </div>
  );
}
