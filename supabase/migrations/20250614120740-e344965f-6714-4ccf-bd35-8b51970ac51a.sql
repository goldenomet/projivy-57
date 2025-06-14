
-- Update RLS policies to properly control chat room visibility and member management

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all chat rooms" ON public.chat_rooms;
DROP POLICY IF EXISTS "Authenticated users can create rooms" ON public.chat_rooms;
DROP POLICY IF EXISTS "Room creators can update their rooms" ON public.chat_rooms;
DROP POLICY IF EXISTS "Users can view room members" ON public.chat_room_members;
DROP POLICY IF EXISTS "Users can join rooms and creators can manage" ON public.chat_room_members;

-- Chat rooms: Users can only see rooms they are members of
CREATE POLICY "Users can view rooms they are members of" 
  ON public.chat_rooms 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_room_members 
      WHERE room_id = chat_rooms.id 
      AND user_id = auth.uid() 
      AND is_active = true
    )
  );

-- Chat rooms: Authenticated users can create rooms
CREATE POLICY "Authenticated users can create rooms" 
  ON public.chat_rooms 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by AND auth.uid() IS NOT NULL);

-- Chat rooms: Room creators can update their rooms
CREATE POLICY "Room creators can update their rooms" 
  ON public.chat_rooms 
  FOR UPDATE 
  USING (auth.uid() = created_by);

-- Chat room members: Users can view members of rooms they belong to
CREATE POLICY "Users can view members of their rooms" 
  ON public.chat_room_members 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_room_members crm 
      WHERE crm.room_id = chat_room_members.room_id 
      AND crm.user_id = auth.uid() 
      AND crm.is_active = true
    )
  );

-- Chat room members: Users can join rooms, room creators can manage all members
CREATE POLICY "Users can join rooms and creators can manage members" 
  ON public.chat_room_members 
  FOR ALL 
  USING (
    -- User can manage their own membership OR user is the room creator
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.chat_rooms 
      WHERE id = chat_room_members.room_id AND created_by = auth.uid()
    )
  )
  WITH CHECK (
    -- Same conditions for insert/update
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.chat_rooms 
      WHERE id = chat_room_members.room_id AND created_by = auth.uid()
    )
  );

-- Add a role column to chat_room_members for better member management
ALTER TABLE public.chat_room_members 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'member' 
CHECK (role IN ('admin', 'moderator', 'member'));

-- Update existing members to have appropriate roles
UPDATE public.chat_room_members 
SET role = 'admin' 
WHERE user_id IN (
  SELECT created_by FROM public.chat_rooms 
  WHERE id = chat_room_members.room_id
);
