import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z.string().trim().email("Adresse email invalide").max(255, "L'email ne peut pas dépasser 255 caractères"),
  phone: z.string().optional(),
  subject: z.string().trim().min(3, "Le sujet doit contenir au moins 3 caractères").max(200, "Le sujet ne peut pas dépasser 200 caractères"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000, "Le message ne peut pas dépasser 2000 caractères"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error sending contact email:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | Interim Online - Agence d'intérim BTP</title>
        <meta name="description" content="Contactez Interim Online, votre agence d'intérim spécialisée dans le BTP. Nous sommes à votre écoute pour vos besoins en recrutement." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Contactez-nous
                </h1>
                <p className="text-lg text-muted-foreground">
                  Une question ? Un besoin en recrutement ? Notre équipe est à votre disposition pour vous accompagner.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Content */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Form */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Jean Dupont"
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jean@exemple.fr"
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="06 12 34 56 78"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Sujet *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Besoin en recrutement"
                            className={errors.subject ? "border-destructive" : ""}
                          />
                          {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Décrivez votre besoin..."
                          rows={6}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                      </div>

                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">Nos coordonnées</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Email</h3>
                          <a href="mailto:contact@interim-online.fr" className="text-muted-foreground hover:text-primary transition-colors">
                            contact@interim-online.fr
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Téléphone</h3>
                          <a href="tel:+33140341045" className="text-muted-foreground hover:text-primary transition-colors">
                            01 40 34 10 45
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Adresse</h3>
                          <p className="text-muted-foreground">
                            82 rue Dunkerque<br />
                            75009 Paris
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Horaires</h3>
                          <p className="text-muted-foreground">
                            Lundi - Vendredi : 8h00 - 18h00<br />
                            Samedi - Dimanche : Fermé
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info Card */}
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3">Besoin urgent ?</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Pour toute demande urgente de personnel, n'hésitez pas à nous appeler directement. 
                        Notre équipe réactive vous proposera des candidats qualifiés dans les plus brefs délais.
                      </p>
                      <Button variant="outline" asChild>
                        <a href="tel:+33140341045">
                          <Phone className="w-4 h-4 mr-2" />
                          Appeler maintenant
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
