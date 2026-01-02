-- Rendre user_id nullable pour permettre les profils de test
ALTER TABLE public.profiles ALTER COLUMN user_id DROP NOT NULL;

-- Supprimer la contrainte de clé étrangère si elle existe
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;