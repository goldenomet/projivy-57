
import { supabase } from "@/integrations/supabase/client";
import { ChatRoom, ChatMessage, ChatRoomMember } from "@/types/chat";

export class ChatService {
  // Chat Rooms
  static async createChatRoom(name: string, description?: string): Promise<ChatRoom> {
    const { data, error } = await supabase
      .from('chat_rooms')
      .insert([
        {
          name,
          description,
          created_by: (await supabase.auth.getUser()).data.user?.id
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getChatRooms(): Promise<ChatRoom[]> {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async joinChatRoom(roomId: string): Promise<void> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('chat_room_members')
      .insert([
        {
          room_id: roomId,
          user_id: user.id
        }
      ]);

    if (error && !error.message.includes('duplicate')) throw error;
  }

  // Messages
  static async sendMessage(roomId: string, content: string, messageType: 'text' | 'system' = 'text'): Promise<ChatMessage> {
    const user = (await supabase.auth.getUser()).data.user;
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

    if (error) throw error;
    return data;
  }

  static async sendFileMessage(roomId: string, file: File): Promise<ChatMessage> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    // Upload file to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('chat-files')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

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
          message_type: 'file',
          file_url: publicUrl,
          file_name: file.name,
          file_size: file.size
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getMessages(roomId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
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

    if (error) throw error;
    return data || [];
  }
}
