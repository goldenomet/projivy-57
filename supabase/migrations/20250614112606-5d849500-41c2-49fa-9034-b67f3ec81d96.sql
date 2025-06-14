
-- First, let's check and fix the RLS policies for chat functionality
-- Update RLS policies for chat_rooms to allow users to view all public rooms and create rooms
DROP POLICY IF EXISTS "Users can view rooms they are members of" ON public.chat_rooms;
DROP POLICY IF EXISTS "Users can create rooms" ON public.chat_rooms;
DROP POLICY IF EXISTS "Room creators can update rooms" ON public.chat_rooms;

-- Allow users to view all chat rooms (for discovery)
CREATE POLICY "Users can view all chat rooms" 
  ON public.chat_rooms 
  FOR SELECT 
  USING (true);

-- Allow authenticated users to create rooms
CREATE POLICY "Authenticated users can create rooms" 
  ON public.chat_rooms 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by AND auth.uid() IS NOT NULL);

-- Allow room creators to update their rooms
CREATE POLICY "Room creators can update their rooms" 
  ON public.chat_rooms 
  FOR UPDATE 
  USING (auth.uid() = created_by);

-- Update RLS policies for chat_room_members
DROP POLICY IF EXISTS "Users can view members of rooms they belong to" ON public.chat_room_members;
DROP POLICY IF EXISTS "Room creators can manage members" ON public.chat_room_members;

-- Allow users to view members of any room
CREATE POLICY "Users can view room members" 
  ON public.chat_room_members 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Allow users to join rooms and room creators to manage members
CREATE POLICY "Users can join rooms and creators can manage" 
  ON public.chat_room_members 
  FOR ALL 
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.chat_rooms 
      WHERE id = chat_room_members.room_id AND created_by = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.chat_rooms 
      WHERE id = chat_room_members.room_id AND created_by = auth.uid()
    )
  );

-- Update RLS policies for chat_messages
DROP POLICY IF EXISTS "Users can view messages in rooms they belong to" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can send messages to rooms they belong to" ON public.chat_messages;

-- Allow users to view messages in rooms they are members of
CREATE POLICY "Users can view messages in their rooms" 
  ON public.chat_messages 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_room_members 
      WHERE room_id = chat_messages.room_id AND user_id = auth.uid() AND is_active = true
    )
  );

-- Allow users to send messages to rooms they belong to
CREATE POLICY "Users can send messages to their rooms" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.chat_room_members 
      WHERE room_id = chat_messages.room_id AND user_id = auth.uid() AND is_active = true
    )
  );

-- Create the chat-files storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('chat-files', 'chat-files', true)
ON CONFLICT (id) DO NOTHING;

-- Update storage policies for chat files
DROP POLICY IF EXISTS "Users can upload chat files" ON storage.objects;
DROP POLICY IF EXISTS "Users can view chat files" ON storage.objects;

-- Allow authenticated users to upload chat files
CREATE POLICY "Authenticated users can upload chat files" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'chat-files' AND 
    auth.uid() IS NOT NULL AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to view chat files
CREATE POLICY "Users can view chat files" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'chat-files');
