
-- Create offres table
CREATE TABLE public.offres (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT,
  lieu TEXT NOT NULL,
  type_contrat TEXT NOT NULL DEFAULT 'mission',
  salaire_min NUMERIC,
  salaire_max NUMERIC,
  experience_requise TEXT,
  horaires TEXT,
  avantages TEXT,
  date_debut DATE,
  date_fin DATE,
  status TEXT NOT NULL DEFAULT 'active',
  candidat_place_id UUID REFERENCES public.candidatures(id),
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.offres ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can view all offres" 
ON public.offres 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert offres" 
ON public.offres 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update offres" 
ON public.offres 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete offres" 
ON public.offres 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Public can view active offres
CREATE POLICY "Public can view active offres" 
ON public.offres 
FOR SELECT 
USING (status = 'active');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_offres_updated_at
BEFORE UPDATE ON public.offres
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
