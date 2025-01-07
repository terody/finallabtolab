/*
  # Add Analytics Tables
  
  1. New Tables
    - page_views
      - id (uuid, primary key)
      - path (text)
      - timestamp (timestamptz)
    - lab_clicks  
      - id (uuid, primary key)
      - lab_id (integer)
      - timestamp (timestamptz)
      
  2. Security
    - Enable RLS
    - Add policies for inserting analytics data
    - Add policies for reading analytics data (admin only)
*/

-- Create analytics tables
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lab_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_id INTEGER NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users"
ON public.page_views FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users"
ON public.lab_clicks FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable read for admins only"
ON public.page_views FOR SELECT
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles 
    WHERE role = 'admin'
  )
);

CREATE POLICY "Enable read for admins only"
ON public.lab_clicks FOR SELECT
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles 
    WHERE role = 'admin'
  )
);