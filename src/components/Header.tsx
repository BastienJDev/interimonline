import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user profile to determine user type
  useEffect(() => {
    const fetchUserType = async () => {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("user_id", user.id)
          .single();
        if (data) {
          setUserType(data.user_type);
        }
      } else {
        setUserType(null);
      }
    };
    fetchUserType();
  }, [user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleEspaceClick = () => {
    if (!user) {
      navigate("/auth");
    }
  };

  const getDashboardLink = () => {
    if (userType === "interimaire") return "/dashboard-interimaire";
    if (userType === "recruteur") return "/dashboard-entreprise";
    return "/auth";
  };

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
              
              {!user ? (
                <>
                  {/* Non connecté - Afficher Nous rejoindre et Connexion */}
                  <Link to="/nous-rejoindre">
                    <Button variant="outline" size="sm">
                      Nous rejoindre
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="cta" size="sm">
                      Connexion
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  {/* Connecté - Afficher Mon Espace avec dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="cta" size="sm" className="flex items-center gap-1">
                        Mon Espace
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card">
                      <DropdownMenuItem asChild>
                        <Link to={getDashboardLink()} className="w-full cursor-pointer">
                          Tableau de bord
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                        <LogOut className="w-4 h-4 mr-2" />
                        Déconnexion
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
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

              {/* Section authentification mobile */}
              <div className="border-t border-border pt-4 flex flex-col gap-2">
                {!user ? (
                  <>
                    <Link
                      to="/nous-rejoindre"
                      className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Nous rejoindre
                    </Link>
                    <Link
                      to="/auth"
                      className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Connexion
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={getDashboardLink()}
                      className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Mon Espace
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-destructive font-medium py-2 hover:text-destructive/80 transition-colors text-left flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
