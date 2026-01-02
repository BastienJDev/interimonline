-- Ajouter le statut de mission au profil
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS mission_status text DEFAULT 'disponible';