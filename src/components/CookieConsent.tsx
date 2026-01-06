import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

const COOKIE_CONSENT_KEY = "cookie-consent";

type ConsentType = "accepted" | "rejected" | null;

const CookieConsent = () => {
  const [consent, setConsent] = useState<ConsentType>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setConsent(savedConsent as ConsentType);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setConsent("accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setConsent("rejected");
    setIsVisible(false);
  };

  if (!isVisible || consent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-up">
      <div className="container mx-auto">
        <div className="bg-card border border-border rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Nous respectons votre vie privée
              </h3>
              <p className="text-sm text-muted-foreground">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site, 
                analyser le trafic et personnaliser le contenu. En cliquant sur "Accepter", 
                vous consentez à l'utilisation de tous les cookies.{" "}
                <Link to="/politique-cookies" className="text-primary hover:underline">
                  En savoir plus
                </Link>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="flex-1 md:flex-none"
            >
              Refuser
            </Button>
            <Button
              variant="cta"
              size="sm"
              onClick={handleAccept}
              className="flex-1 md:flex-none"
            >
              Accepter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
