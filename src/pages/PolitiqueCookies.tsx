import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PolitiqueCookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Politique de Cookies
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-lg">
              Dernière mise à jour : Janvier 2026
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) 
                lors de la visite d'un site web. Il permet au site de mémoriser des informations sur votre visite, 
                comme votre langue préférée et d'autres paramètres, afin de faciliter votre prochaine visite et 
                rendre le site plus utile pour vous.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Les cookies que nous utilisons</h2>
              
              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Cookies strictement nécessaires</h3>
              <p>
                Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés. 
                Ils sont généralement établis en réponse à des actions que vous effectuez et qui constituent 
                une demande de services (connexion, remplissage de formulaires, etc.).
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>cookie-consent</strong> : Mémorise votre choix concernant les cookies (1 an)</li>
                <li><strong>session</strong> : Maintient votre session de connexion (durée de la session)</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Cookies de performance et d'analyse</h3>
              <p>
                Ces cookies nous permettent de compter les visites et les sources de trafic afin de mesurer 
                et d'améliorer les performances de notre site.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Cookies fonctionnels</h3>
              <p>
                Ces cookies permettent d'améliorer les fonctionnalités et la personnalisation du site, 
                comme la mémorisation de vos préférences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Durée de conservation</h2>
              <p>
                Les cookies que nous utilisons ont une durée de vie maximale de 13 mois conformément 
                aux recommandations de la CNIL. Au-delà de cette période, votre consentement sera à nouveau requis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Comment gérer vos cookies ?</h2>
              <p>
                Vous pouvez à tout moment modifier vos préférences en matière de cookies. 
                Vous pouvez également configurer votre navigateur pour accepter ou refuser les cookies :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Chrome</strong> : Paramètres → Confidentialité et sécurité → Cookies</li>
                <li><strong>Firefox</strong> : Options → Vie privée et sécurité → Cookies</li>
                <li><strong>Safari</strong> : Préférences → Confidentialité → Cookies</li>
                <li><strong>Edge</strong> : Paramètres → Cookies et autorisations de site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Cookies tiers</h2>
              <p>
                Notre site peut contenir des liens vers d'autres sites web ou intégrer des contenus 
                provenant de tiers. Ces sites tiers peuvent déposer leurs propres cookies. 
                Nous n'avons aucun contrôle sur ces cookies et vous invitons à consulter 
                les politiques de confidentialité de ces sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Contact</h2>
              <p>
                Pour toute question concernant notre politique de cookies, vous pouvez nous contacter :
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

export default PolitiqueCookies;
