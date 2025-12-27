import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Users, Heart, Target, Clock, Handshake } from "lucide-react";

const APropos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              À propos de nous
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90">
              Notre histoire et nos valeurs
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 bg-background">
        {/* Introduction */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  <span className="font-semibold text-foreground">INTERIM ONLINE PRO TECH</span> est une entreprise de travail temporaire spécialisée dans le bâtiment et l'industrie, fondée en 2020 sur la conviction que découvrir le bon talent signifie aller au-delà d'une description de poste et d'un CV.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Basé à <span className="font-semibold text-foreground">Paris</span>, nous fournissons des services de recrutement et de placement professionnel de premier ordre dans toute la région parisienne et à l'échelle nationale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Highlight */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                    <Clock className="w-10 h-10 text-primary" />
                  </div>
                  <div className="text-6xl md:text-7xl font-bold text-primary mb-2">25</div>
                  <div className="text-xl font-semibold text-foreground">ans d'expérience</div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Avec nos <span className="font-semibold text-foreground">25 ans d'expérience</span> dans le milieu de l'intérim sur des missions en bâtiment et dans l'industrie, nous bénéficions d'une expertise métier en recrutement et intérim sur les postes techniques de ce secteur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Une approche humaine</h2>
              </div>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Nous avons voulu mettre à profit cette expertise en créant une <span className="font-semibold text-foreground">agence intérim à taille humaine</span>, orientée sur l'accompagnement aussi bien de l'entreprise que de l'intérimaire, car quel que soit le côté où l'on se trouve <span className="font-semibold text-foreground">l'Humain est omniprésent</span> dans le recrutement.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Entreprises</span>, vous recherchez un professionnel dans les secteurs du BTP ou de l'industrie pour un contrat de travail temporaire, nous sommes là.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools & Services */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Nos outils à votre service</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Avec l'ensemble de nos collaborateurs, nous mettons à disposition des entreprises et des demandeurs d'emploi des <span className="font-semibold text-foreground">outils adaptés</span> afin de leur faciliter la recherche de profils ou de missions selon leurs critères propres, et répondre à toutes les questions soulevées.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre ambition est de proposer sur notre site spécialiste une <span className="font-semibold text-foreground">expérience personnalisée</span> adaptée aux besoins de chacun, afin que chaque recherche soit plus simple et plus efficace.
              </p>
            </div>
          </div>
        </section>

        {/* Unique Value */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-primary/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Handshake className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Notre différence</h2>
                </div>
                <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                  INTERIM ONLINE PRO TECH est la parfaite combinaison d'un <span className="text-primary">cabinet de recrutement</span> et d'un <span className="text-accent">jobboard</span>,
                </p>
                <p className="text-xl md:text-2xl text-primary font-bold mt-4">
                  ce n'est pas une plateforme déshumanisée.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Nos valeurs</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-xl p-6 shadow-sm border border-border text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Proximité</h3>
                  <p className="text-muted-foreground">Une relation de confiance avec chaque candidat et entreprise</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-sm border border-border text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Expertise</h3>
                  <p className="text-muted-foreground">25 ans d'expérience dans le BTP et l'industrie</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-sm border border-border text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Humanité</h3>
                  <p className="text-muted-foreground">L'humain au cœur de chaque recrutement</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default APropos;
