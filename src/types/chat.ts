
export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ChatRoomMember {
  id: string;
  room_id: string;
  user_id: string;
  joined_at: string;
  is_active: boolean;
}

export interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content?: string;
  message_type: 'text' | 'file' | 'voice' | 'system';
  file_url?: string;
  file_name?: string;
  file_size?: number;
  voice_duration?: number;
  created_at: string;
  updated_at: string;
}

export interface ChatUser {
  id: string;
  full_name?: string;
  avatar_url?: string;
}
