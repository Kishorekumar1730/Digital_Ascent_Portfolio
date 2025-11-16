-- Create partnerships table for dynamic partnership logos
CREATE TABLE public.partnerships (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on partnerships
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;

-- Partnerships are viewable by everyone (public partnerships page)
CREATE POLICY "Anyone can view partnerships"
ON public.partnerships
FOR SELECT
USING (true);

-- Only admins can insert partnerships
CREATE POLICY "Admins can insert partnerships"
ON public.partnerships
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update partnerships
CREATE POLICY "Admins can update partnerships"
ON public.partnerships
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete partnerships
CREATE POLICY "Admins can delete partnerships"
ON public.partnerships
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_partnerships_updated_at
BEFORE UPDATE ON public.partnerships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
