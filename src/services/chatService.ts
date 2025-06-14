
import { supabase } from "@/integrations/supabase/client";
import { ChatRoom, ChatMessage, ChatRoomMember } from "@/types/chat";

export class ChatService {
  // Chat Rooms
  static async createChatRoom(name: string, description?: string): Promise<ChatRoom> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('chat_rooms')
      .insert([
        {
          name,
          description,
          created_by: user.id
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating chat room:', error);
      throw error;
    }

    // Automatically add creator as admin member
    await this.joinChatRoom(data.id, 'admin');
    
    return data;
  }

  static async getChatRooms(): Promise<ChatRoom[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get rooms where user is a member (now properly restricted by RLS)
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching user rooms:', error);
      return [];
    }
    
    return data || [];
  }

  static async joinChatRoom(roomId: string, role: 'admin' | 'moderator' | 'member' = 'member'): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('chat_room_members')
      .upsert([
        {
          room_id: roomId,
          user_id: user.id,
          role: role,
          is_active: true
        }
      ], {
        onConflict: 'room_id,user_id'
      });

    if (error) {
      console.error('Error joining chat room:', error);
      throw error;
    }
  }

  static async inviteMember(roomId: string, userId: string, role: 'member' | 'moderator' = 'member'): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Check if current user is admin or room creator
    const { data: currentMember } = await supabase
      .from('chat_room_members')
      .select('role')
      .eq('room_id', roomId)
      .eq('user_id', user.id)
      .single();

    const { data: room } = await supabase
      .from('chat_rooms')
      .select('created_by')
      .eq('id', roomId)
      .single();

    if (!currentMember || (currentMember.role !== 'admin' && room?.created_by !== user.id)) {
      throw new Error('Only admins and room creators can invite members');
    }

    const { error } = await supabase
      .from('chat_room_members')
      .upsert([
        {
          room_id: roomId,
          user_id: userId,
          role: role,
          is_active: true
        }
      ], {
        onConflict: 'room_id,user_id'
      });

    if (error) {
      console.error('Error inviting member:', error);
      throw error;
    }
  }

  static async removeMember(roomId: string, userId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('chat_room_members')
      .update({ is_active: false })
      .eq('room_id', roomId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error removing member:', error);
      throw error;
    }
  }

  static async updateMemberRole(roomId: string, userId: string, newRole: 'admin' | 'moderator' | 'member'): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('chat_room_members')
      .update({ role: newRole })
      .eq('room_id', roomId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating member role:', error);
      throw error;
    }
  }

  // Messages
  static async sendMessage(roomId: string, content: string, messageType: 'text' | 'system' = 'text'): Promise<ChatMessage> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('chat_messages')
      .insert([
        {
          room_id: roomId,
          sender_id: user.id,
          content,
          message_type: messageType
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }
    return data as ChatMessage;
  }

  static async sendFileMessage(roomId: string, file: File): Promise<ChatMessage> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Upload file to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('chat-files')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('chat-files')
      .getPublicUrl(fileName);

    // Send message with file info
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([
        {
          room_id: roomId,
          sender_id: user.id,
          message_type: 'file' as const,
          file_url: publicUrl,
          file_name: file.name,
          file_size: file.size
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error sending file message:', error);
      throw error;
    }
    return data as ChatMessage;
  }

  static async getMessages(roomId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
    return (data || []) as ChatMessage[];
  }

  // Real-time subscriptions
  static subscribeToMessages(roomId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel(`chat_messages:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => callback(payload.new as ChatMessage)
      )
      .subscribe();
  }

  static async getRoomMembers(roomId: string): Promise<ChatRoomMember[]> {
    const { data, error } = await supabase
      .from('chat_room_members')
      .select('*')
      .eq('room_id', roomId)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching room members:', error);
      return [];
    }
    return data || [];
  }

  static async searchUsers(query: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name')
      .ilike('full_name', `%${query}%`)
      .limit(10);

    if (error) {
      console.error('Error searching users:', error);
      return [];
    }
    return data || [];
  }

  // Remove public rooms functionality since rooms are now private by default
  static async getAllPublicRooms(): Promise<ChatRoom[]> {
    // Return empty array since we now use private rooms only
    return [];
  }

  static async searchRooms(query: string): Promise<ChatRoom[]> {
    // Return empty array since we now use private rooms only
    return [];
  }
}
