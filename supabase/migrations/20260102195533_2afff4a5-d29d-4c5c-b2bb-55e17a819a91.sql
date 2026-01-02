-- Ajouter le champ cv_url au profil
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cv_url text;

-- Créer le bucket pour les CVs
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', false)
ON CONFLICT (id) DO NOTHING;

-- Politique pour permettre aux utilisateurs authentifiés d'uploader leur CV
CREATE POLICY "Users can upload their own CV"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'cvs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Politique pour permettre aux utilisateurs de voir leur propre CV
CREATE POLICY "Users can view their own CV"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'cvs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Politique pour permettre aux admins de voir tous les CVs
CREATE POLICY "Admins can view all CVs"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'cvs' AND public.has_role(auth.uid(), 'admin'::app_role));