-- Create candidatures table
CREATE TABLE public.candidatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    prenom TEXT NOT NULL,
    nom TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT,
    ville TEXT,
    adresse TEXT,
    poste TEXT NOT NULL,
    experience TEXT,
    disponibilite TEXT,
    cv_url TEXT,
    status TEXT NOT NULL DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'valide', 'rejete', 'accepte')),
    validated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    validated_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.candidatures ENABLE ROW LEVEL SECURITY;

-- RLS policies
-- Users can view their own candidatures
CREATE POLICY "Users can view their own candidatures"
ON public.candidatures
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins can view all candidatures
CREATE POLICY "Admins can view all candidatures"
ON public.candidatures
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update candidatures (for validation/rejection)
CREATE POLICY "Admins can update candidatures"
ON public.candidatures
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Authenticated users can insert their own candidatures
CREATE POLICY "Users can insert their own candidatures"
ON public.candidatures
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Admins can insert candidatures
CREATE POLICY "Admins can insert candidatures"
ON public.candidatures
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create documents table for candidature documents
CREATE TABLE public.candidature_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidature_id UUID REFERENCES public.candidatures(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    file_url TEXT,
    document_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on documents
ALTER TABLE public.candidature_documents ENABLE ROW LEVEL SECURITY;

-- Document policies
CREATE POLICY "Users can view their own documents"
ON public.candidature_documents
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.candidatures c 
        WHERE c.id = candidature_id AND c.user_id = auth.uid()
    )
);

CREATE POLICY "Admins can view all documents"
ON public.candidature_documents
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert their own documents"
ON public.candidature_documents
FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.candidatures c 
        WHERE c.id = candidature_id AND c.user_id = auth.uid()
    )
);

CREATE POLICY "Admins can manage documents"
ON public.candidature_documents
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_candidatures_updated_at
    BEFORE UPDATE ON public.candidatures
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some test data
INSERT INTO public.candidatures (prenom, nom, email, telephone, ville, adresse, poste, experience, disponibilite, status) VALUES
('Jean', 'Dupont', 'jean.dupont@email.com', '06 12 34 56 78', 'Paris 75012', '15 rue de la République, 75012 Paris', 'Maçon qualifié', '5 ans', 'Immédiate', 'en_attente'),
('Pierre', 'Martin', 'pierre.martin@email.com', '06 98 76 54 32', 'Lyon 69003', '28 avenue Jean Jaurès, 69003 Lyon', 'Électricien industriel', '8 ans', 'Sous 1 semaine', 'valide'),
('Marc', 'Leroy', 'marc.leroy@email.com', '07 11 22 33 44', 'Marseille 13001', '5 boulevard Longchamp, 13001 Marseille', 'Soudeur TIG/MIG', '3 ans', 'Immédiate', 'en_attente'),
('Lucas', 'Bernard', 'lucas.bernard@email.com', '06 55 44 33 22', 'Bordeaux 33000', '12 rue Sainte-Catherine, 33000 Bordeaux', 'Chef équipe BTP', '10 ans', 'Sous 2 semaines', 'rejete');

-- Insert test documents
INSERT INTO public.candidature_documents (candidature_id, name, document_type) 
SELECT id, 'Carte identité', 'identity' FROM public.candidatures WHERE email = 'jean.dupont@email.com';
INSERT INTO public.candidature_documents (candidature_id, name, document_type) 
SELECT id, 'Permis B', 'license' FROM public.candidatures WHERE email = 'jean.dupont@email.com';
INSERT INTO public.candidature_documents (candidature_id, name, document_type) 
SELECT id, 'CACES', 'certification' FROM public.candidatures WHERE email = 'jean.dupont@email.com';