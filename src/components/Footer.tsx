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
    <footer id="contact" className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg gradient-cta flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">B</span>
              </div>
              <span className="font-bold text-xl text-secondary-foreground">
                BTP<span className="text-primary">Intérim</span>
              </span>
            </div>
            <p className="text-secondary-foreground/70 mb-6 max-w-sm">
              Votre partenaire de confiance pour le recrutement dans le bâtiment et l'industrie depuis 2010.
            </p>
            <div className="space-y-3">
              <a href="tel:+33100000000" className="flex items-center gap-3 text-secondary-foreground/80 hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                01 00 00 00 00
              </a>
              <a href="mailto:contact@btpinterim.fr" className="flex items-center gap-3 text-secondary-foreground/80 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                contact@btpinterim.fr
              </a>
              <div className="flex items-center gap-3 text-secondary-foreground/80">
                <MapPin className="w-5 h-5" />
                Paris, Lyon, Marseille, Bordeaux
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-secondary-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-secondary-foreground mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-secondary-foreground mb-4">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/60 text-sm">
              © {currentYear} BTPIntérim. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <a key={link.label} href={link.href} className="text-secondary-foreground/60 text-sm hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
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
