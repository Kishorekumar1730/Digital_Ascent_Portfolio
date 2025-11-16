-- Create team_members table for dynamic team management
CREATE TABLE public.team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Team members are viewable by everyone (public team page)
CREATE POLICY "Anyone can view team members"
ON public.team_members
FOR SELECT
USING (true);

-- Only admins can insert team members
CREATE POLICY "Admins can insert team members"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update team members
CREATE POLICY "Admins can update team members"
ON public.team_members
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete team members
CREATE POLICY "Admins can delete team members"
ON public.team_members
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
