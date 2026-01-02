-- Ajouter les champs d'inscription intérimaire au profil
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS metier text,
ADD COLUMN IF NOT EXISTS experience text,
ADD COLUMN IF NOT EXISTS competences text,
ADD COLUMN IF NOT EXISTS permis text,
ADD COLUMN IF NOT EXISTS deplacement text,
ADD COLUMN IF NOT EXISTS mobilite text;