
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  userId: string;
  type: string;
  projectId?: string;
  taskId?: string;
  data: {
    title: string;
    message: string;
    userEmail: string;
    userName?: string;
    projectName?: string;
    taskTitle?: string;
  };
}

const getEmailTemplate = (type: string, data: any) => {
  const baseStyle = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #6366f1; margin: 0; font-size: 24px;">Projivy</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Project Management Made Simple</p>
        </div>
  `;

  const footer = `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #9ca3af; font-size: 14px; text-align: center; margin: 0;">
          You received this email because you have notifications enabled in your Projivy settings.
        </p>
      </div>
    </div>
  `;

  switch (type) {
    case 'project_created':
      return baseStyle + `
        <h2 style="color: #059669; margin-bottom: 20px;">New Project Created</h2>
        <p style="color: #374151; font-size: 16px; line-height: 1.5;">
          Hello ${data.userName || 'there'},<br><br>
          A new project "<strong>${data.projectName}</strong>" has been created and you've been added to it.
        </p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            Start collaborating with your team and track your project progress.
          </p>
        </div>
      ` + footer;

    case 'project_status_changed':
      return baseStyle + `
        <h2 style="color: #2563eb; margin-bottom: 20px;">Project Status Updated</h2>
        <p style="color: #374151; font-size: 16px; line-height: 1.5;">
          Hello ${data.userName || 'there'},<br><br>
          The status of project "<strong>${data.projectName}</strong>" has been updated.
        </p>
        <div style="background-color: #eff6ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0; color: #2563eb; font-size: 14px;">
            ${data.message}
          </p>
        </div>
      ` + footer;

    case 'task_created':
      return baseStyle + `
        <h2 style="color: #7c3aed; margin-bottom: 20px;">New Task Created</h2>
        <p style="color: #374151; font-size: 16px; line-height: 1.5;">
          Hello ${data.userName || 'there'},<br><br>
          A new task "<strong>${data.taskTitle}</strong>" has been created in project "<strong>${data.projectName}</strong>".
        </p>
      ` + footer;

    case 'task_completed':
      return baseStyle + `
        <h2 style="color: #059669; margin-bottom: 20px;">Task Completed</h2>
        <p style="color: #374151; font-size: 16px; line-height: 1.5;">
          Hello ${data.userName || 'there'},<br><br>
          The task "<strong>${data.taskTitle}</strong>" in project "<strong>${data.projectName}</strong>" has been completed! 🎉
        </p>
      ` + footer;

    case 'task_assigned':
      return baseStyle + `
        <h2 style="color: #ea580c; margin-bottom: 20px;">Task Assigned</h2>
        <p style="color: #374151; font-size: 16px; line-height: 1.5;">
          Hello ${data.userName || 'there'},<br><br>
          You have been assigned to the task "<strong>${data.taskTitle}</strong>" in project "<strong>${data.projectName}</strong>".
        </p>
        <div style="background-color: #fff7ed; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0; color: #ea580c; font-size: 14px;">
            Don't forget to check the task details and update your progress.
          </p>
        </div>
      ` + footer;

    case 'deadline_approaching':
      return baseStyle + `
        <h2 style="color: #dc2626; margin-bottom: 20px;">⚠️ Deadline Approaching</h2>
        <p style="color: #374151; font-size: 16px; line-height: 1.5;">
          Hello ${data.userName || 'there'},<br><br>
          The deadline for "<strong>${data.taskTitle || data.projectName}</strong>" is approaching soon.
        </p>
        <div style="background-color: #fef2f2; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <p style="margin: 0; color: #dc2626; font-size: 14px; font-weight: 600;">
            ${data.message}
          </p>
        </div>
      ` + footer;

    default:
      return baseStyle + `
        <h2 style="color: #374151; margin-bottom: 20px;">${data.title}</h2>
        <p style="color: #374151; font-size: 16px; line-height: 1.5;">
          Hello ${data.userName || 'there'},<br><br>
          ${data.message}
        </p>
      ` + footer;
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, type, projectId, taskId, data }: NotificationRequest = await req.json();

    console.log("Processing notification:", { userId, type, projectId, taskId });

    // Check user's notification preferences
    const { data: preferences, error: prefsError } = await supabase
      .rpc('get_or_create_notification_preferences', { user_uuid: userId });

    if (prefsError) {
      console.error("Error fetching preferences:", prefsError);
      throw prefsError;
    }

    // Check if this type of notification is enabled
    const typeMapping: { [key: string]: keyof typeof preferences } = {
      'project_created': 'project_created',
      'project_status_changed': 'project_status_changed',
      'task_created': 'task_created',
      'task_completed': 'task_completed',
      'task_assigned': 'task_assigned',
      'deadline_approaching': 'deadline_approaching'
    };

    const prefKey = typeMapping[type];
    if (!preferences.email_enabled || !preferences[prefKey]) {
      console.log("Notification disabled for user:", userId, type);
      return new Response(JSON.stringify({ message: "Notification disabled for user" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send email
    const emailHtml = getEmailTemplate(type, data);
    const subject = data.title;

    const emailResponse = await resend.emails.send({
      from: "Projivy <notifications@resend.dev>",
      to: [data.userEmail],
      subject: subject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    // Log the notification
    const { error: logError } = await supabase
      .from('notification_logs')
      .insert({
        user_id: userId,
        project_id: projectId,
        task_id: taskId,
        notification_type: type,
        email_sent: true,
        sent_at: new Date().toISOString()
      });

    if (logError) {
      console.error("Error logging notification:", logError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
