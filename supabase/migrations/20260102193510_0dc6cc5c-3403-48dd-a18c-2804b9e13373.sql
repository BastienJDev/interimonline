-- Add approval status to profiles
ALTER TABLE public.profiles 
ADD COLUMN approval_status text DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
ADD COLUMN approval_date timestamp with time zone,
ADD COLUMN approved_by uuid,
ADD COLUMN rejection_reason text,
ADD COLUMN user_type text CHECK (user_type IN ('interimaire', 'entreprise', 'admin'));

-- Update existing profiles to approved (so existing users aren't blocked)
UPDATE public.profiles SET approval_status = 'approved' WHERE approval_status IS NULL OR approval_status = 'pending';

-- Allow admins to update all profiles for approval
CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));