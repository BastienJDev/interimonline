import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainLinks = [
    { label: "Accueil", href: "/", isRoute: true },
    { label: "Nos Services", href: "/nos-services", isRoute: true },
  ];

  const discoverLinks = [
    { label: "Nos Intérimaires", href: "/nos-interimaires", isRoute: true },
    { label: "Nos Clients", href: "/nos-clients", isRoute: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-card shadow-card ${
        isScrolled ? "backdrop-blur-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Interim Online Pro-Tech" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium transition-colors hover:text-primary text-foreground"
              >
                {link.label}
              </Link>
            ))}

            {/* Dropdown Découvrir */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-foreground outline-none">
                Découvrir
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-card">
                {discoverLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link
                      to={link.href}
                      className="w-full cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="/#contact"
              className="text-sm font-medium transition-colors hover:text-primary text-foreground"
            >
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+33140341045" className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Phone className="w-4 h-4" />
              01 40 34 10 45
            </a>
            <Link to="/dashboard-interimaire">
              <Button variant="outline" size="lg">
                Espace Intérimaire
              </Button>
            </Link>
            <Link to="/dashboard-entreprise">
              <Button variant="cta" size="lg">
                Espace Recruteur
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card rounded-lg shadow-card p-6 mb-4 animate-scale-in">
            <nav className="flex flex-col gap-4">
              {mainLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Section Découvrir en mobile */}
              <div className="border-t border-border pt-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Découvrir</span>
                {discoverLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-foreground font-medium py-2 hover:text-primary transition-colors block pl-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <a
                href="/#contact"
                className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>

              <Link to="/dashboard-interimaire" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="lg" className="w-full">
                  Espace Intérimaire
                </Button>
              </Link>
              <Link to="/dashboard-entreprise" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="cta" size="lg" className="w-full mt-2">
                  Espace Recruteur
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
