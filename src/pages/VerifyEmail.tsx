import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle, XCircle, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('Token de vérification manquant');
        setIsVerifying(false);
        return;
      }

      try {
        const { data, error: invokeError } = await supabase.functions.invoke('verify-email', {
          body: { token },
        });

        if (invokeError || data?.error) {
          setError(data?.error || invokeError?.message || 'Erreur lors de la vérification');
        } else {
          setIsSuccess(true);
          toast({
            title: 'Email confirmé',
            description: 'Votre adresse email a été vérifiée avec succès.',
          });
        }
      } catch (err) {
        console.error('Email verification error:', err);
        setError('Une erreur est survenue lors de la vérification');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [token, toast]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-card p-8">
            <div className="flex justify-center mb-8">
              <img src={logo} alt="Logo" className="h-16" />
            </div>
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
              <h2 className="text-xl font-bold text-foreground">Vérification en cours...</h2>
              <p className="text-muted-foreground text-sm">
                Nous vérifions votre adresse email, veuillez patienter.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-card p-8">
            <div className="flex justify-center mb-8">
              <img src={logo} alt="Logo" className="h-16" />
            </div>
            <div className="text-center space-y-4">
              <div className="p-6 bg-destructive/10 rounded-lg">
                <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-2">Échec de la vérification</h2>
                <p className="text-muted-foreground text-sm">{error}</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Le lien a peut-être expiré ou a déjà été utilisé.
                </p>
                <Button onClick={() => navigate('/auth')} className="w-full">
                  Retour à la connexion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-card p-8">
            <div className="flex justify-center mb-8">
              <img src={logo} alt="Logo" className="h-16" />
            </div>
            <div className="text-center space-y-4">
              <div className="p-6 bg-primary/10 rounded-lg">
                <div className="relative mx-auto w-16 h-16 mb-4">
                  <Mail className="w-16 h-16 text-primary" />
                  <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Email confirmé !</h2>
                <p className="text-muted-foreground text-sm">
                  Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant vous connecter à votre compte.
                </p>
              </div>
              <Button onClick={() => navigate('/auth')} className="w-full">
                Se connecter
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
