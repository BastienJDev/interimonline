import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "Recrutement BTP", href: "#" },
      { label: "Intérim Industrie", href: "#" },
      { label: "CDI Intérimaire", href: "#" },
      { label: "Formation", href: "#" },
    ],
    company: [
      { label: "À propos", href: "#" },
      { label: "Notre équipe", href: "#" },
      { label: "Nos agences", href: "#" },
      { label: "Carrières", href: "#" },
    ],
    resources: [
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Guides métiers", href: "#" },
      { label: "Actualités BTP", href: "#" },
    ],
    legal: [
      { label: "Mentions légales", href: "#" },
      { label: "Politique de confidentialité", href: "#" },
      { label: "CGU", href: "#" },
    ],
  };

  return (
    <footer id="contact" className="bg-background text-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <p className="text-muted-foreground mb-6 max-w-sm">
              Votre partenaire de confiance pour le recrutement dans le bâtiment et l'industrie.
            </p>
            <div className="space-y-3">
              <a href="tel:+33140341045" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                01 40 34 10 45
              </a>
              <a href="mailto:contact@interim-online.fr" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                contact@interim-online.fr
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                82 rue Dunkerque, 75009 Paris
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Interim online Pro-Tech 82. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <a key={link.label} href={link.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
