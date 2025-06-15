
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Settings, Key, Database, Lock, Globe, Bell } from "lucide-react";
import { toast } from "sonner";

interface AdminSettings {
  userRegistration: boolean;
  twoFactorRequired: boolean;
  dataRetention: number;
  auditLogging: boolean;
  ipRestrictions: boolean;
  ssoEnabled: boolean;
  backupEnabled: boolean;
  notifications: boolean;
}

export default function AdminControlsPage() {
  const [settings, setSettings] = useState<AdminSettings>({
    userRegistration: true,
    twoFactorRequired: false,
    dataRetention: 365,
    auditLogging: true,
    ipRestrictions: false,
    ssoEnabled: false,
    backupEnabled: true,
    notifications: true
  });

  const [activeUsers] = useState(247);
  const [totalProjects] = useState(89);
  const [storageUsed] = useState(85.3);

  const updateSetting = (key: keyof AdminSettings, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success("Setting updated successfully");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Admin Controls</h1>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Enterprise
          </Badge>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeUsers}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">+5 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storageUsed}%</div>
              <p className="text-xs text-muted-foreground">of unlimited storage</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="security" className="space-y-4">
          <TabsList>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  <CardTitle>Security Settings</CardTitle>
                </div>
                <CardDescription>
                  Configure security policies and access controls for your organization.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication Required</Label>
                    <p className="text-sm text-muted-foreground">
                      Require all users to enable 2FA for account access
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorRequired}
                    onCheckedChange={(checked) => updateSetting('twoFactorRequired', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Address Restrictions</Label>
                    <p className="text-sm text-muted-foreground">
                      Limit access to specific IP addresses or ranges
                    </p>
                  </div>
                  <Switch
                    checked={settings.ipRestrictions}
                    onCheckedChange={(checked) => updateSetting('ipRestrictions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Track all user actions and system events
                    </p>
                  </div>
                  <Switch
                    checked={settings.auditLogging}
                    onCheckedChange={(checked) => updateSetting('auditLogging', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <CardTitle>User Management</CardTitle>
                </div>
                <CardDescription>
                  Control user registration, permissions, and access levels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Permit new users to register for accounts
                    </p>
                  </div>
                  <Switch
                    checked={settings.userRegistration}
                    onCheckedChange={(checked) => updateSetting('userRegistration', checked)}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Quick Actions</h4>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      Bulk User Import
                    </Button>
                    <Button variant="outline" size="sm">
                      Export User List
                    </Button>
                    <Button variant="outline" size="sm">
                      Reset Passwords
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <CardTitle>System Configuration</CardTitle>
                </div>
                <CardDescription>
                  Configure system-wide settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable daily automated backups of all data
                    </p>
                  </div>
                  <Switch
                    checked={settings.backupEnabled}
                    onCheckedChange={(checked) => updateSetting('backupEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about system updates and maintenance
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => updateSetting('notifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <CardTitle>Integration Settings</CardTitle>
                </div>
                <CardDescription>
                  Manage third-party integrations and SSO configurations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Single Sign-On (SSO)</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable SSO integration with your identity provider
                    </p>
                  </div>
                  <Switch
                    checked={settings.ssoEnabled}
                    onCheckedChange={(checked) => updateSetting('ssoEnabled', checked)}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Available Integrations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Slack</h5>
                          <p className="text-sm text-muted-foreground">Team communication</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Microsoft Teams</h5>
                          <p className="text-sm text-muted-foreground">Collaboration platform</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
