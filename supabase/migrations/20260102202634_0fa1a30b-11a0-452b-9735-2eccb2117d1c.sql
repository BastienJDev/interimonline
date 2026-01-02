-- Ajouter le champ rating à mission_history
ALTER TABLE public.mission_history 
ADD COLUMN rating INTEGER CHECK (rating >= 0 AND rating <= 5),
ADD COLUMN rated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN rated_by UUID;

-- Permettre aux entreprises de mettre à jour le rating de leurs missions
CREATE POLICY "Entreprises can rate missions"
ON public.mission_history FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM offres o
    WHERE o.id = mission_history.offre_id
    AND o.created_by = auth.uid()
  )
);