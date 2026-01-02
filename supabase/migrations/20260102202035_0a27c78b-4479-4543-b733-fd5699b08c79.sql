-- Table pour les candidatures sur les offres (candidatures spontanées ou propositions admin)
CREATE TABLE public.offre_candidatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offre_id UUID NOT NULL REFERENCES public.offres(id) ON DELETE CASCADE,
  candidat_id UUID NOT NULL REFERENCES public.candidatures(id) ON DELETE CASCADE,
  
  -- Type: 'candidature' (spontanée) ou 'proposition' (par admin)
  type TEXT NOT NULL DEFAULT 'proposition',
  
  -- Statuts de validation
  admin_status TEXT NOT NULL DEFAULT 'en_attente', -- en_attente, valide, refuse
  admin_validated_at TIMESTAMP WITH TIME ZONE,
  admin_validated_by UUID,
  admin_rejection_reason TEXT,
  
  -- Statuts entreprise (visible seulement si admin_status = 'valide')
  entreprise_status TEXT NOT NULL DEFAULT 'en_attente', -- en_attente, accepte, refuse
  entreprise_response_at TIMESTAMP WITH TIME ZONE,
  entreprise_rejection_reason TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(offre_id, candidat_id)
);

-- Enable RLS
ALTER TABLE public.offre_candidatures ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage offre_candidatures"
ON public.offre_candidatures FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Entreprises can view validated candidatures for their offers
CREATE POLICY "Entreprises can view validated candidatures"
ON public.offre_candidatures FOR SELECT
USING (
  admin_status = 'valide' AND
  EXISTS (
    SELECT 1 FROM offres o
    WHERE o.id = offre_candidatures.offre_id
    AND o.created_by = auth.uid()
  )
);

-- Entreprises can update entreprise_status for their offers
CREATE POLICY "Entreprises can respond to candidatures"
ON public.offre_candidatures FOR UPDATE
USING (
  admin_status = 'valide' AND
  EXISTS (
    SELECT 1 FROM offres o
    WHERE o.id = offre_candidatures.offre_id
    AND o.created_by = auth.uid()
  )
);

-- Candidats can view their own candidatures
CREATE POLICY "Candidats can view their candidatures"
ON public.offre_candidatures FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM candidatures c
    WHERE c.id = offre_candidatures.candidat_id
    AND c.user_id = auth.uid()
  )
);

-- Trigger for updated_at
CREATE TRIGGER update_offre_candidatures_updated_at
BEFORE UPDATE ON public.offre_candidatures
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();