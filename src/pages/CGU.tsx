import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CGU = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Conditions Générales d'Utilisation
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-lg">
              Dernière mise à jour : Janvier 2026
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Objet</h2>
              <p>
                Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir 
                les modalités et conditions d'utilisation du site Interim Online Pro-Tech, 
                ainsi que les droits et obligations des utilisateurs.
              </p>
              <p className="mt-4">
                L'utilisation du site implique l'acceptation pleine et entière des présentes CGU.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Services proposés</h2>
              <p>
                Interim Online Pro-Tech propose une plateforme de mise en relation entre :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Les entreprises</strong> du secteur BTP et industrie recherchant du personnel intérimaire</li>
                <li><strong>Les candidats</strong> recherchant des missions d'intérim dans ces secteurs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Inscription et compte utilisateur</h2>
              
              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.1 Création de compte</h3>
              <p>
                L'accès à certaines fonctionnalités du site nécessite la création d'un compte utilisateur. 
                L'utilisateur s'engage à fournir des informations exactes, complètes et à jour.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.2 Confidentialité des identifiants</h3>
              <p>
                L'utilisateur est responsable de la confidentialité de ses identifiants de connexion. 
                Toute utilisation du compte est réputée être effectuée par l'utilisateur lui-même.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.3 Validation des comptes</h3>
              <p>
                Interim Online Pro-Tech se réserve le droit de valider les inscriptions 
                et de refuser l'accès à tout utilisateur ne respectant pas les présentes CGU.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Obligations des utilisateurs</h2>
              <p>Les utilisateurs s'engagent à :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Utiliser le site de manière loyale et conformément à sa destination</li>
                <li>Ne pas publier de contenu illicite, diffamatoire ou contraire aux bonnes mœurs</li>
                <li>Ne pas usurper l'identité d'un tiers</li>
                <li>Ne pas perturber le fonctionnement du site</li>
                <li>Respecter les droits de propriété intellectuelle</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Obligations spécifiques aux candidats</h2>
              <p>Les candidats s'engagent à :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Fournir des informations véridiques concernant leurs compétences et expériences</li>
                <li>Transmettre des documents authentiques (CV, diplômes, certifications)</li>
                <li>Informer Interim Online Pro-Tech de tout changement de situation</li>
                <li>Se présenter aux missions acceptées dans les conditions convenues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Obligations spécifiques aux entreprises</h2>
              <p>Les entreprises s'engagent à :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Fournir des informations exactes sur leur société et leurs besoins en recrutement</li>
                <li>Respecter la législation du travail temporaire</li>
                <li>Assurer la sécurité des intérimaires sur le lieu de travail</li>
                <li>Ne pas contacter directement les candidats en dehors de la plateforme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Propriété intellectuelle</h2>
              <p>
                L'ensemble des éléments du site (textes, images, logos, base de données, etc.) 
                est la propriété exclusive d'Interim Online Pro-Tech. Toute reproduction 
                ou représentation, totale ou partielle, est interdite sans autorisation préalable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Protection des données personnelles</h2>
              <p>
                Les données personnelles collectées sont traitées conformément à notre 
                Politique de Confidentialité et au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Limitation de responsabilité</h2>
              <p>
                Interim Online Pro-Tech ne peut être tenu responsable des dommages directs 
                ou indirects résultant de l'utilisation du site ou de l'impossibilité d'y accéder.
              </p>
              <p className="mt-4">
                Interim Online Pro-Tech n'est pas partie au contrat de travail temporaire 
                qui pourrait être conclu suite à une mise en relation via le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. Modification des CGU</h2>
              <p>
                Interim Online Pro-Tech se réserve le droit de modifier les présentes CGU à tout moment. 
                Les utilisateurs seront informés de toute modification substantielle.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">11. Droit applicable et juridiction</h2>
              <p>
                Les présentes CGU sont régies par le droit français. 
                Tout litige relatif à l'interprétation ou l'exécution des présentes sera soumis 
                aux tribunaux compétents du ressort du siège social d'Interim Online Pro-Tech.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">12. Contact</h2>
              <p>
                Pour toute question concernant les présentes CGU :
              </p>
              <ul className="list-none mt-2 space-y-1">
                <li>Email : contact@interim-online-protech.fr</li>
                <li>Téléphone : 01 40 34 10 45</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGU;
