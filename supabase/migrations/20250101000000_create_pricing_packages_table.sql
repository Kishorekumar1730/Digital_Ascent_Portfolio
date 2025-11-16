-- Create pricing_packages table for dynamic pricing management
CREATE TABLE public.pricing_packages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  popular BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on pricing_packages
ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;

-- Pricing packages are viewable by everyone (public pricing page)
CREATE POLICY "Anyone can view pricing packages"
ON public.pricing_packages
FOR SELECT
USING (true);

-- Only admins can insert pricing packages
CREATE POLICY "Admins can insert pricing packages"
ON public.pricing_packages
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update pricing packages
CREATE POLICY "Admins can update pricing packages"
ON public.pricing_packages
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete pricing packages
CREATE POLICY "Admins can delete pricing packages"
ON public.pricing_packages
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_pricing_packages_updated_at
BEFORE UPDATE ON public.pricing_packages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
