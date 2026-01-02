import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Mail, ArrowLeft, XCircle, CheckCircle2, Loader2 } from 'lucide-react';
import logo from '@/assets/logo.png';

type ApprovalStatus = 'pending' | 'approved' | 'rejected' | null;

const PendingApproval = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<ApprovalStatus>(null);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchApprovalStatus = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('approval_status, rejection_reason, user_type')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching approval status:', error);
        setLoading(false);
        return;
      }

      // If user is an entreprise or already approved, redirect
      if (data?.user_type === 'entreprise' || data?.approval_status === 'approved') {
        navigate('/dashboard-entreprise');
        return;
      }

      setStatus(data?.approval_status as ApprovalStatus);
      setRejectionReason(data?.rejection_reason || null);
      setLoading(false);
    };

    fetchApprovalStatus();

    // Set up realtime subscription to detect approval
    const channel = supabase
      .channel('approval-status')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newStatus = payload.new.approval_status as ApprovalStatus;
          setStatus(newStatus);
          setRejectionReason(payload.new.rejection_reason || null);
          
          if (newStatus === 'approved') {
            navigate('/dashboard-interimaire');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === 'rejected') {
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
                <h2 className="text-xl font-bold text-foreground mb-2">Inscription refusée</h2>
                <p className="text-muted-foreground text-sm">
                  Malheureusement, votre demande d'inscription n'a pas été acceptée.
                </p>
                {rejectionReason && (
                  <div className="mt-4 p-3 bg-background rounded-lg text-left">
                    <p className="text-sm font-medium text-foreground">Motif :</p>
                    <p className="text-sm text-muted-foreground">{rejectionReason}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4">
                <p className="text-xs text-muted-foreground">
                  Si vous pensez qu'il s'agit d'une erreur, vous pouvez nous contacter par email.
                </p>
                
                <Button variant="outline" className="w-full" onClick={handleSignOut}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <Clock className="w-16 h-16 text-primary" />
                <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Inscription en attente</h2>
              <p className="text-muted-foreground text-sm">
                Votre compte a bien été créé ! Un administrateur va examiner votre demande.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm py-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>En attente de validation...</span>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg text-left">
                <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Prochaines étapes
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Un admin va vérifier vos informations</li>
                  <li>• Vous recevrez un email une fois validé</li>
                  <li>• Vous pourrez alors accéder à votre espace</li>
                </ul>
              </div>
              
              <Button variant="outline" className="w-full" onClick={handleSignOut}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
