import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetierCombobox } from "@/components/MetierCombobox";
import { Textarea } from "@/components/ui/textarea";
import { HardHat, Building2, ArrowLeft, ArrowRight, Check, Upload, Mail, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type UserType = "interimaire" | "recruteur" | null;

const NousRejoindre = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Interimaire form state
  const [interimaireForm, setInterimaireForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    password: '',
    metier: '',
    experience: '',
    competences: '',
    permis: '',
    deplacement: '',
    mobilite: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  // Recruteur form state
  const [recruteurForm, setRecruteurForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    password: '',
    entreprise: '',
    siret: '',
    ville: '',
    secteur: '',
    effectif: '',
    description: '',
    specialites: '',
  });

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setUserType(null);
    }
  };

  const validateStep1 = () => {
    if (!interimaireForm.prenom.trim()) {
      toast({ title: 'Champ requis', description: 'Veuillez entrer votre prénom', variant: 'destructive' });
      return false;
    }
    if (!interimaireForm.nom.trim()) {
      toast({ title: 'Champ requis', description: 'Veuillez entrer votre nom', variant: 'destructive' });
      return false;
    }
    if (!interimaireForm.email.trim() || !interimaireForm.email.includes('@')) {
      toast({ title: 'Champ requis', description: 'Veuillez entrer un email valide', variant: 'destructive' });
      return false;
    }
    if (!interimaireForm.telephone.trim()) {
      toast({ title: 'Champ requis', description: 'Veuillez entrer votre téléphone', variant: 'destructive' });
      return false;
    }
    if (!interimaireForm.password || interimaireForm.password.length < 6) {
      toast({ title: 'Champ requis', description: 'Le mot de passe doit contenir au moins 6 caractères', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!interimaireForm.metier) {
      toast({ title: 'Champ requis', description: 'Veuillez sélectionner votre métier', variant: 'destructive' });
      return false;
    }
    if (!interimaireForm.experience) {
      toast({ title: 'Champ requis', description: 'Veuillez sélectionner vos années d\'expérience', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!interimaireForm.permis) {
      toast({ title: 'Champ requis', description: 'Veuillez indiquer si vous avez le permis', variant: 'destructive' });
      return false;
    }
    if (!interimaireForm.deplacement) {
      toast({ title: 'Champ requis', description: 'Veuillez indiquer votre disponibilité pour les déplacements', variant: 'destructive' });
      return false;
    }
    if (!interimaireForm.mobilite.trim()) {
      toast({ title: 'Champ requis', description: 'Veuillez indiquer votre zone de mobilité', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (userType === "interimaire" && currentStep < 3) {
      if (currentStep === 1 && !validateStep1()) return;
      if (currentStep === 2 && !validateStep2()) return;
      setCurrentStep(currentStep + 1);
    }
  };

  const handleInterimaireSubmit = async () => {
    // Validate step 3 before submitting
    if (!validateStep3()) return;
    
    setIsLoading(true);
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: interimaireForm.email,
        password: interimaireForm.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            first_name: interimaireForm.prenom,
            last_name: interimaireForm.nom,
          },
        },
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          toast({
            title: 'Compte existant',
            description: 'Un compte existe déjà avec cet email',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Erreur',
            description: authError.message,
            variant: 'destructive',
          });
        }
        setIsLoading(false);
        return;
      }

      // 2. Upload CV if provided
      let cvUrl: string | null = null;
      if (authData.user && cvFile) {
        const fileExt = cvFile.name.split('.').pop();
        const filePath = `${authData.user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('cvs')
          .upload(filePath, cvFile);
        
        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('cvs')
            .getPublicUrl(filePath);
          cvUrl = urlData.publicUrl;
        } else {
          console.error('CV upload error:', uploadError);
        }
      }

      // 3. Update profile with user_type and additional info
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            phone: interimaireForm.telephone,
            user_type: 'interimaire',
            approval_status: 'pending',
            metier: interimaireForm.metier,
            experience: interimaireForm.experience,
            competences: interimaireForm.competences,
            permis: interimaireForm.permis,
            deplacement: interimaireForm.deplacement,
            mobilite: interimaireForm.mobilite,
            cv_url: cvUrl,
          })
          .eq('user_id', authData.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }
      }

      setRegisteredEmail(interimaireForm.email);
      setRegistrationComplete(true);
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecruteurSubmit = async () => {
    setIsLoading(true);
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: recruteurForm.email,
        password: recruteurForm.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            first_name: recruteurForm.prenom,
            last_name: recruteurForm.nom,
          },
        },
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          toast({
            title: 'Compte existant',
            description: 'Un compte existe déjà avec cet email',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Erreur',
            description: authError.message,
            variant: 'destructive',
          });
        }
        setIsLoading(false);
        return;
      }

      // 2. Update profile with company info
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            phone: recruteurForm.telephone,
            company_name: recruteurForm.entreprise,
            siret: recruteurForm.siret,
            city: recruteurForm.ville,
            sector: recruteurForm.secteur,
            employees_count: recruteurForm.effectif,
            description: recruteurForm.description,
            user_type: 'entreprise',
            approval_status: 'approved', // Entreprises are auto-approved
          })
          .eq('user_id', authData.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }
      }

      setRegisteredEmail(recruteurForm.email);
      setRegistrationComplete(true);
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Registration complete screen
  if (registrationComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <Card className="max-w-md w-full shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-4">
                <div className="p-6 bg-primary/10 rounded-lg">
                  <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Vérifiez votre email
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Un email de confirmation a été envoyé à
                  </p>
                  <p className="font-medium text-foreground mt-1">{registeredEmail}</p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg text-left">
                  <h3 className="text-sm font-medium text-foreground mb-2">Prochaines étapes :</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>1. Cliquez sur le lien dans l'email</li>
                    {userType === 'interimaire' && (
                      <>
                        <li>2. Un administrateur vérifiera votre profil</li>
                        <li>3. Une fois validé, vous pourrez accéder à votre espace</li>
                      </>
                    )}
                    {userType === 'recruteur' && (
                      <li>2. Connectez-vous pour accéder à votre espace</li>
                    )}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/auth')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la connexion
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Choix initial
  if (!userType) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Rejoignez-nous
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Que vous soyez à la recherche d'une mission ou d'un talent, nous avons la solution pour vous.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Card Intérimaire */}
              <Card 
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 hover:border-primary"
                onClick={() => setUserType("interimaire")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <HardHat className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Je suis Intérimaire</CardTitle>
                  <CardDescription className="text-base">
                    Trouvez des missions adaptées à vos compétences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Accédez à des missions dans le BTP et l'industrie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Gérez vos contrats et documents en ligne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Accompagnement personnalisé</span>
                  </div>
                </CardContent>
              </Card>

              {/* Card Recruteur */}
              <Card 
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 hover:border-primary"
                onClick={() => setUserType("recruteur")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Je suis Recruteur</CardTitle>
                  <CardDescription className="text-base">
                    Trouvez les talents dont vous avez besoin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Accédez à un vivier de candidats qualifiés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Publiez vos offres rapidement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Gestion simplifiée des contrats</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="text-center mt-8 text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <Link to="/auth" className="text-primary hover:underline font-medium">
                Connectez-vous
              </Link>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Formulaire Intérimaire (multi-étapes)
  if (userType === "interimaire") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="max-w-2xl w-full">
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <Button variant="ghost" size="icon" onClick={handleBack}>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <HardHat className="w-6 h-6 text-primary" />
                      <CardTitle>Inscription Intérimaire</CardTitle>
                    </div>
                    <CardDescription>Étape {currentStep} sur 3</CardDescription>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="flex gap-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-2 flex-1 rounded-full transition-colors ${
                        step <= currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Étape 1: Informations personnelles */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-lg font-semibold">Informations personnelles</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prenom">Prénom *</Label>
                        <Input 
                          id="prenom" 
                          placeholder="Votre prénom"
                          value={interimaireForm.prenom}
                          onChange={(e) => setInterimaireForm({...interimaireForm, prenom: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom *</Label>
                        <Input 
                          id="nom" 
                          placeholder="Votre nom"
                          value={interimaireForm.nom}
                          onChange={(e) => setInterimaireForm({...interimaireForm, nom: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="votre@email.com"
                        value={interimaireForm.email}
                        onChange={(e) => setInterimaireForm({...interimaireForm, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input 
                        id="telephone" 
                        type="tel" 
                        placeholder="06 12 34 56 78"
                        value={interimaireForm.telephone}
                        onChange={(e) => setInterimaireForm({...interimaireForm, telephone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe *</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••"
                        value={interimaireForm.password}
                        onChange={(e) => setInterimaireForm({...interimaireForm, password: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground">Minimum 6 caractères</p>
                    </div>
                  </div>
                )}

                {/* Étape 2: Expérience professionnelle */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-lg font-semibold">Expérience professionnelle</h3>
                    <div className="space-y-2">
                      <Label htmlFor="metier">Métier principal *</Label>
                      <MetierCombobox
                        value={interimaireForm.metier}
                        onValueChange={(value) => setInterimaireForm({...interimaireForm, metier: value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Années d'expérience *</Label>
                      <Select
                        value={interimaireForm.experience}
                        onValueChange={(value) => setInterimaireForm({...interimaireForm, experience: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">Moins d'1 an</SelectItem>
                          <SelectItem value="1-3">1 à 3 ans</SelectItem>
                          <SelectItem value="3-5">3 à 5 ans</SelectItem>
                          <SelectItem value="5-10">5 à 10 ans</SelectItem>
                          <SelectItem value="10+">Plus de 10 ans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="competences">Compétences additionnelles</Label>
                      <Textarea 
                        id="competences" 
                        placeholder="Décrivez vos compétences, certifications, habilitations..."
                        rows={4}
                        value={interimaireForm.competences}
                        onChange={(e) => setInterimaireForm({...interimaireForm, competences: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                {/* Étape 3: Questions et CV */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-lg font-semibold">Questions et documents</h3>
                    <div className="space-y-2">
                      <Label htmlFor="permis">Avez-vous le permis de conduire ? *</Label>
                      <Select
                        value={interimaireForm.permis}
                        onValueChange={(value) => setInterimaireForm({...interimaireForm, permis: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oui">Oui</SelectItem>
                          <SelectItem value="non">Non</SelectItem>
                          <SelectItem value="en-cours">En cours d'obtention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deplacement">Êtes-vous d'accord de partir en déplacement ? *</Label>
                      <Select
                        value={interimaireForm.deplacement}
                        onValueChange={(value) => setInterimaireForm({...interimaireForm, deplacement: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oui">Oui</SelectItem>
                          <SelectItem value="non">Non</SelectItem>
                          <SelectItem value="occasionnel">Occasionnellement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobilite">Zone de mobilité *</Label>
                      <Input 
                        id="mobilite" 
                        placeholder="Ex: Paris et Île-de-France"
                        value={interimaireForm.mobilite}
                        onChange={(e) => setInterimaireForm({...interimaireForm, mobilite: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CV (optionnel)</Label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                toast({
                                  title: 'Fichier trop volumineux',
                                  description: 'Le CV ne doit pas dépasser 5 Mo',
                                  variant: 'destructive',
                                });
                                return;
                              }
                              setCvFile(file);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${cvFile ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary'}`}>
                          {cvFile ? (
                            <>
                              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-2" />
                              <p className="text-foreground font-medium">{cvFile.name}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {(cvFile.size / 1024 / 1024).toFixed(2)} Mo
                              </p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                              <p className="text-muted-foreground">
                                Glissez votre CV ici ou <span className="text-primary">parcourir</span>
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">PDF, DOC ou DOCX (max. 5 Mo)</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Boutons de navigation */}
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  {currentStep < 3 ? (
                    <Button onClick={handleNext}>
                      Suivant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button variant="cta" onClick={handleInterimaireSubmit} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Créer mon compte
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Formulaire Recruteur (complet)
  if (userType === "recruteur") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="max-w-2xl w-full">
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={handleBack}>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-primary" />
                      <CardTitle>Inscription Recruteur</CardTitle>
                    </div>
                    <CardDescription>Créez votre compte entreprise</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informations personnelles */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Vos informations</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prenom-rec">Prénom *</Label>
                      <Input 
                        id="prenom-rec" 
                        placeholder="Votre prénom"
                        value={recruteurForm.prenom}
                        onChange={(e) => setRecruteurForm({...recruteurForm, prenom: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom-rec">Nom *</Label>
                      <Input 
                        id="nom-rec" 
                        placeholder="Votre nom"
                        value={recruteurForm.nom}
                        onChange={(e) => setRecruteurForm({...recruteurForm, nom: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-rec">Email professionnel *</Label>
                    <Input 
                      id="email-rec" 
                      type="email" 
                      placeholder="votre@entreprise.com"
                      value={recruteurForm.email}
                      onChange={(e) => setRecruteurForm({...recruteurForm, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone-rec">Téléphone *</Label>
                    <Input 
                      id="telephone-rec" 
                      type="tel" 
                      placeholder="06 12 34 56 78"
                      value={recruteurForm.telephone}
                      onChange={(e) => setRecruteurForm({...recruteurForm, telephone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-rec">Mot de passe *</Label>
                    <Input 
                      id="password-rec" 
                      type="password" 
                      placeholder="••••••••"
                      value={recruteurForm.password}
                      onChange={(e) => setRecruteurForm({...recruteurForm, password: e.target.value})}
                    />
                    <p className="text-xs text-muted-foreground">Minimum 6 caractères</p>
                  </div>
                </div>

                {/* Informations entreprise */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Votre entreprise</h3>
                  <div className="space-y-2">
                    <Label htmlFor="entreprise">Nom de l'entreprise *</Label>
                    <Input 
                      id="entreprise" 
                      placeholder="Nom de votre société"
                      value={recruteurForm.entreprise}
                      onChange={(e) => setRecruteurForm({...recruteurForm, entreprise: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siret">Numéro SIRET *</Label>
                      <Input 
                        id="siret" 
                        placeholder="XXX XXX XXX XXXXX"
                        value={recruteurForm.siret}
                        onChange={(e) => setRecruteurForm({...recruteurForm, siret: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ville-entreprise">Ville *</Label>
                      <Input 
                        id="ville-entreprise" 
                        placeholder="Ex: Paris, Lyon, Marseille..."
                        value={recruteurForm.ville}
                        onChange={(e) => setRecruteurForm({...recruteurForm, ville: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="secteur">Secteur d'activité *</Label>
                      <Select
                        value={recruteurForm.secteur}
                        onValueChange={(value) => setRecruteurForm({...recruteurForm, secteur: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btp">BTP / Construction</SelectItem>
                          <SelectItem value="energie">Énergie & Électricité</SelectItem>
                          <SelectItem value="travaux-publics">Travaux Publics</SelectItem>
                          <SelectItem value="industrie">Industrie</SelectItem>
                          <SelectItem value="logistique">Logistique</SelectItem>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="geotechnique">Géotechnique</SelectItem>
                          <SelectItem value="services-energetiques">Services énergétiques</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="effectif">Nombre d'employés *</Label>
                      <Select
                        value={recruteurForm.effectif}
                        onValueChange={(value) => setRecruteurForm({...recruteurForm, effectif: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1 à 10 employés</SelectItem>
                          <SelectItem value="11-50">11 à 50 employés</SelectItem>
                          <SelectItem value="51-200">51 à 200 employés</SelectItem>
                          <SelectItem value="201-500">201 à 500 employés</SelectItem>
                          <SelectItem value="500+">Plus de 500 employés</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description-entreprise">Description de l'entreprise</Label>
                    <Textarea 
                      id="description-entreprise" 
                      placeholder="Décrivez votre entreprise en quelques mots..."
                      rows={3}
                      value={recruteurForm.description}
                      onChange={(e) => setRecruteurForm({...recruteurForm, description: e.target.value})}
                    />
                  </div>
                </div>

                {/* Bouton submit */}
                <div className="pt-4">
                  <Button variant="cta" className="w-full" onClick={handleRecruteurSubmit} disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    Créer mon compte entreprise
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  En créant un compte, vous acceptez nos{" "}
                  <Link to="#" className="text-primary hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et notre{" "}
                  <Link to="#" className="text-primary hover:underline">
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
};

export default NousRejoindre;
