
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Settings as SettingsIcon, Moon } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [debugMode, setDebugMode] = useState(false);
  const [verboseLogging, setVerboseLogging] = useState(false);
  const [devTools, setDevTools] = useState(false);

  const handleDevToolsChange = (checked: boolean) => {
    setDevTools(checked);
    if (checked) {
      toast.success("Developer tools enabled");
    } else {
      toast.info("Developer tools disabled");
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Manage your application preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Appearance</h3>
                    <p className="text-muted-foreground text-sm">
                      Customize the theme of your application
                    </p>
                  </div>
                  <ThemeSwitcher />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="development">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Development Settings
                </CardTitle>
                <CardDescription>
                  Configure development and debugging options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="debug-mode" className="font-medium">Debug Mode</Label>
                    <p className="text-muted-foreground text-sm">
                      Enable additional debugging information
                    </p>
                  </div>
                  <Switch 
                    id="debug-mode" 
                    checked={debugMode} 
                    onCheckedChange={setDebugMode} 
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="verbose-logging" className="font-medium">Verbose Logging</Label>
                    <p className="text-muted-foreground text-sm">
                      Show detailed logs in the console
                    </p>
                  </div>
                  <Switch 
                    id="verbose-logging" 
                    checked={verboseLogging} 
                    onCheckedChange={setVerboseLogging} 
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="dev-tools" className="font-medium">Developer Tools</Label>
                    <p className="text-muted-foreground text-sm">
                      Enable advanced developer features
                    </p>
                  </div>
                  <Switch 
                    id="dev-tools" 
                    checked={devTools} 
                    onCheckedChange={handleDevToolsChange} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
