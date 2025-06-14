
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
    return data;
  }

  static async getChatRooms(): Promise<ChatRoom[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get rooms where user is a member
    const { data, error } = await supabase
      .from('chat_rooms')
      .select(`
        *,
        chat_room_members!inner(user_id)
      `)
      .eq('chat_room_members.user_id', user.id)
      .eq('chat_room_members.is_active', true)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching user rooms:', error);
      // Return empty array instead of throwing to gracefully handle the error
      return [];
    }
    
    return data || [];
  }

  static async joinChatRoom(roomId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('chat_room_members')
      .upsert([
        {
          room_id: roomId,
          user_id: user.id,
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
      .select(`
        *,
        profiles(full_name, avatar_url)
      `)
      .eq('room_id', roomId)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching room members:', error);
      return [];
    }
    return data || [];
  }

  static async getAllPublicRooms(): Promise<ChatRoom[]> {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching public rooms:', error);
      return [];
    }
    return data || [];
  }

  static async searchRooms(query: string): Promise<ChatRoom[]> {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error searching rooms:', error);
      return [];
    }
    return data || [];
  }
}
