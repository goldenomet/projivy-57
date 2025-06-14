
-- Create chat rooms table (without project reference for now)
CREATE TABLE public.chat_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat room members table
CREATE TABLE public.chat_room_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(room_id, user_id)
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) NOT NULL,
  content TEXT,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'voice', 'system')),
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  voice_duration INTEGER, -- in seconds for voice messages
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for chat files
INSERT INTO storage.buckets (id, name, public) VALUES ('chat-files', 'chat-files', true);

-- Enable RLS on all tables
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat_rooms
CREATE POLICY "Users can view rooms they are members of" 
  ON public.chat_rooms 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_room_members 
      WHERE room_id = chat_rooms.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create rooms" 
  ON public.chat_rooms 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Room creators can update rooms" 
  ON public.chat_rooms 
  FOR UPDATE 
  USING (auth.uid() = created_by);

-- RLS policies for chat_room_members
CREATE POLICY "Users can view members of rooms they belong to" 
  ON public.chat_room_members 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_room_members crm 
      WHERE crm.room_id = chat_room_members.room_id AND crm.user_id = auth.uid()
    )
  );

CREATE POLICY "Room creators can manage members" 
  ON public.chat_room_members 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_rooms 
      WHERE id = chat_room_members.room_id AND created_by = auth.uid()
    )
  );

-- RLS policies for chat_messages
CREATE POLICY "Users can view messages in rooms they belong to" 
  ON public.chat_messages 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_room_members 
      WHERE room_id = chat_messages.room_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages to rooms they belong to" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.chat_room_members 
      WHERE room_id = chat_messages.room_id AND user_id = auth.uid()
    )
  );

-- Storage policies for chat files
CREATE POLICY "Users can upload chat files" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'chat-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view chat files" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'chat-files');

-- Enable realtime for chat messages
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
