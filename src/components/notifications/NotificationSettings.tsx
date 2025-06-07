
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNotificationPreferences } from "@/hooks/use-notification-preferences";
import { Bell, Mail, AlertCircle } from "lucide-react";

export function NotificationSettings() {
  const { preferences, updatePreferences, loading } = useNotificationPreferences();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Loading notification preferences...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!preferences) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Error Loading Preferences
          </CardTitle>
          <CardDescription>Unable to load notification preferences</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const notificationTypes = [
    {
      key: 'project_created' as const,
      label: 'Project Created',
      description: 'Get notified when new projects are created'
    },
    {
      key: 'project_status_changed' as const,
      label: 'Project Status Changes',
      description: 'Get notified when project status is updated'
    },
    {
      key: 'task_created' as const,
      label: 'New Tasks',
      description: 'Get notified when new tasks are created'
    },
    {
      key: 'task_completed' as const,
      label: 'Task Completions',
      description: 'Get notified when tasks are completed'
    },
    {
      key: 'task_assigned' as const,
      label: 'Task Assignments',
      description: 'Get notified when you are assigned to tasks'
    },
    {
      key: 'deadline_approaching' as const,
      label: 'Deadline Reminders',
      description: 'Get notified when deadlines are approaching'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Configure your email notification preferences for project events
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <Label htmlFor="email-enabled" className="font-medium">
              Email Notifications
            </Label>
            {preferences.email_enabled && (
              <Badge variant="default" className="text-xs">
                Enabled
              </Badge>
            )}
          </div>
          <Switch
            id="email-enabled"
            checked={preferences.email_enabled}
            onCheckedChange={(checked) => updatePreferences({ email_enabled: checked })}
          />
        </div>

        {preferences.email_enabled && (
          <div className="space-y-4 pl-6 border-l-2 border-muted">
            {notificationTypes.map((type) => (
              <div key={type.key} className="flex items-start justify-between space-x-2">
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor={type.key}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {type.description}
                  </p>
                </div>
                <Switch
                  id={type.key}
                  checked={preferences[type.key]}
                  onCheckedChange={(checked) => updatePreferences({ [type.key]: checked })}
                />
              </div>
            ))}
          </div>
        )}

        {!preferences.email_enabled && (
          <div className="text-sm text-muted-foreground border border-muted rounded-md p-3">
            Email notifications are disabled. Enable them above to configure specific notification types.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
