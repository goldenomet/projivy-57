
import { supabase } from '@/integrations/supabase/client';

export interface NotificationData {
  userId: string;
  type: 'project_created' | 'project_status_changed' | 'task_created' | 'task_completed' | 'task_assigned' | 'deadline_approaching';
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

export const sendNotification = async (notificationData: NotificationData) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-notification', {
      body: notificationData
    });

    if (error) {
      console.error('Error sending notification:', error);
      throw error;
    }

    console.log('Notification sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to send notification:', error);
    throw error;
  }
};

// Helper functions for common notification types
export const notifyProjectCreated = async (userId: string, userEmail: string, userName: string, projectName: string, projectId: string) => {
  return sendNotification({
    userId,
    type: 'project_created',
    projectId,
    data: {
      title: 'New Project Created',
      message: `Project "${projectName}" has been created`,
      userEmail,
      userName,
      projectName
    }
  });
};

export const notifyProjectStatusChanged = async (userId: string, userEmail: string, userName: string, projectName: string, projectId: string, newStatus: string) => {
  return sendNotification({
    userId,
    type: 'project_status_changed',
    projectId,
    data: {
      title: 'Project Status Updated',
      message: `Project status changed to: ${newStatus}`,
      userEmail,
      userName,
      projectName
    }
  });
};

export const notifyTaskCreated = async (userId: string, userEmail: string, userName: string, taskTitle: string, projectName: string, taskId: string, projectId: string) => {
  return sendNotification({
    userId,
    type: 'task_created',
    projectId,
    taskId,
    data: {
      title: 'New Task Created',
      message: `New task "${taskTitle}" created in project "${projectName}"`,
      userEmail,
      userName,
      projectName,
      taskTitle
    }
  });
};

export const notifyTaskCompleted = async (userId: string, userEmail: string, userName: string, taskTitle: string, projectName: string, taskId: string, projectId: string) => {
  return sendNotification({
    userId,
    type: 'task_completed',
    projectId,
    taskId,
    data: {
      title: 'Task Completed',
      message: `Task "${taskTitle}" has been completed`,
      userEmail,
      userName,
      projectName,
      taskTitle
    }
  });
};

export const notifyTaskAssigned = async (userId: string, userEmail: string, userName: string, taskTitle: string, projectName: string, taskId: string, projectId: string) => {
  return sendNotification({
    userId,
    type: 'task_assigned',
    projectId,
    taskId,
    data: {
      title: 'Task Assigned',
      message: `You have been assigned to task "${taskTitle}"`,
      userEmail,
      userName,
      projectName,
      taskTitle
    }
  });
};

export const notifyDeadlineApproaching = async (userId: string, userEmail: string, userName: string, itemTitle: string, itemType: 'project' | 'task', daysLeft: number, itemId: string, projectId?: string) => {
  return sendNotification({
    userId,
    type: 'deadline_approaching',
    projectId,
    taskId: itemType === 'task' ? itemId : undefined,
    data: {
      title: 'Deadline Approaching',
      message: `${itemType === 'task' ? 'Task' : 'Project'} "${itemTitle}" deadline is in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
      userEmail,
      userName,
      [itemType === 'task' ? 'taskTitle' : 'projectName']: itemTitle
    }
  });
};
