import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PolitiqueCookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Politique Cookies
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p>
              La Société Interim Online Pro-Tech utilise des cookies sur son site internet : 
              <a href="https://interim-online.fr" className="text-primary hover:underline"> https://interim-online.fr</a> (ci-après le « Site Interim Online »).
            </p>

            <p>
              Il est rappelé que la société Interim Online Pro-Tech, société par actions simplifiée et au capital de 80.000 euros, 
              dont le siège social est situé au 52 rue de Dunkerque 75009 Paris, France, inscrite au Registre du Commerce et des 
              Sociétés de Paris sous le numéro 880 965 439 (ci-après la « Société Interim Online »), est responsable et éditeur du Site Interim Online.
            </p>

            <p>
              Pour une information complète concernant le traitement de vos données personnelles et les droits dont vous disposez, 
              la Société Interim Online vous invite à consulter sa <a href="/politique-confidentialite" className="text-primary hover:underline">Politique de Confidentialité</a>.
            </p>

            <p>
              Pour toute question, vous pouvez contacter la Société Interim Online :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>par téléphone au : 01 40 34 10 45</li>
              <li>par email à : contact@interim-online.fr</li>
            </ul>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Qu{"'"}est-ce qu{"'"}un cookie ?</h2>
              <p>
                Un Cookie, et tous les fichiers de suivi similaires (ci-après "cookies") sont des fichiers de suivi 
                qui peuvent être enregistrés sur votre appareil (ordinateur, tablette, smartphone) quand vous utilisez 
                le Site Interim Online à l{"'"}aide d{"'"}un logiciel de navigation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Qui dépose les cookies ?</h2>
              <p>
                Des Cookies sont déposés par la Société Interim Online et par ses fournisseurs de services techniques ou de cookies :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Facebook</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>Google</li>
                <li>ShareThis</li>
              </ul>
              <p className="mt-4">
                Pour plus d{"'"}information sur les destinataires de vos données personnelles, vous pouvez consulter 
                la rubrique « Qui sont les destinataires de mes données personnelles ? » de la <a href="/politique-confidentialite" className="text-primary hover:underline">Politique de Confidentialité</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Pourquoi des cookies sont utilisés sur le Site Interim Online et comment ?</h2>
              
              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Cookies de navigation (non soumis à consentement)</h3>
              <p>
                Ces Cookies sont nécessaires pour vous permettre de naviguer correctement sur le Site Interim Online et notamment :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Adapter la présentation du Site Interim Online aux préférences d{"'"}affichage de votre appareil (langage utilisé, résolution d{"'"}image, système d{"'"}exploitation utilisé, etc.) ;</li>
                <li>Mémoriser vos informations de connexion ;</li>
                <li>Vous offrir un accès à votre compte ou à tout autre espace réservé par le biais de vos informations de connexion ;</li>
                <li>Mettre en place des mesures de sécurité, par exemple lorsque vous êtes invité à vous reconnecter à un élément de contenu du Site Interim Online après qu{"'"}une certaine période.</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Cookies de mesure d{"'"}audience (soumis à consentement)</h3>
              <p>
                Les Cookies statistiques de mesure d{"'"}audience aident la Société Interim Online à établir des statistiques 
                chiffrées sur la visite et l{"'"}utilisation des différentes parties constitutives du Site Interim Online 
                (sections et contenus visités, chemin suivi), permettant à la Société Interim Online, notamment, de rendre 
                les Services plus intéressants et plus faciles à utiliser.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Cookies de réseaux sociaux (soumis à consentement)</h3>
              <p>
                Les Cookies de réseaux sociaux permettent de publier directement du contenu sur ces réseaux sociaux ou 
                d{"'"}accéder à la page de la Société Interim Online sur ces réseaux. Ils permettent également de simplifier 
                l{"'"}inscription au Site Interim Online en se connectant via son compte Facebook, LinkedIn, Google ou Google+. 
                Ils entraînent le transfert d{"'"}informations concernant votre navigation sur le Site Interim Online, et le 
                transfert d{"'"}informations concernant votre identification auprès des différents réseaux sociaux. Ces Cookies 
                permettent de lier votre activité aux données personnelles précédemment détenues par le réseau social concerné. 
                La Société Interim Online vous invite à lire les politiques de confidentialité des différents réseaux sociaux concernés.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Cookies de publicité personnalisée (soumis à consentement)</h3>
              <p>
                Les Cookies de publicité permettent d{"'"}afficher de la publicité personnalisée sur le Site Interim Online 
                fonction de votre navigation et de votre profil. La personnalisation de la publicité englobe différentes opérations techniques :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>la sélection d{"'"}une publicité en fonction du profil ;</li>
                <li>le plafonnement de l{"'"}affichage ;</li>
                <li>la lutte contre la fraude au clic ;</li>
                <li>la facturation de la prestation d{"'"}affichage ;</li>
                <li>la mesure des cibles ayant le plus d{"'"}appétences à la publicité.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Quelles sont les conséquences en cas de refus des cookies ?</h2>
              <p>
                La désactivation des Cookies techniques vous empêchera d{"'"}utiliser le Site Interim Online dans des conditions 
                normales et de bénéficier des services.
              </p>
              <p className="mt-4">
                La désactivation des Cookies de mesure de l{"'"}audience, des Cookies de publicité et des Cookies de réseaux sociaux 
                n{"'"}aura aucune conséquence sur votre utilisation du Site Interim Online.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Comment paramétrer les cookies ?</h2>
              <p>
                <strong>Vos choix concernant les cookies :</strong> Lorsque vous visitez le Site Interim Online pour la première fois, 
                et que la Société Interim Online envisage de placer des cookies soumis à consentement sur son terminal, vous en êtes 
                informé au moyen d{"'"}une bannière d{"'"}information.
              </p>
              <p className="mt-4">
                En paramétrant vos choix concernant les cookies ou en cliquant sur « Tout accepter » dans le bandeau, vous acceptez 
                l{"'"}utilisation de cookies soumis à consentement par la Société Interim Online.
              </p>
              <p className="mt-4">
                Votre choix concernant les cookies est conservé pour une durée de 6 mois. Vous pouvez changer d{"'"}avis à tout moment 
                en cliquant sur l{"'"}icône « gérer les cookies » en bas à gauche de chaque page du site.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Le paramétrage du navigateur</h3>
              <p>
                S{"'"}agissant de la gestion des cookies, chaque logiciel de navigation propose des modalités de configuration différentes. 
                Elles sont décrites dans le menu d{"'"}aide de chaque navigateur :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Chrome™</strong> : <a href="https://support.google.com/accounts/answer/61416?hl=fr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.google.com/accounts/answer/61416?hl=fr</a></li>
                <li><strong>Firefox™</strong> : <a href="https://support.mozilla.org/fr/kb/effacer-les-cookies-pour-supprimer-les-information" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/fr/kb/effacer-les-cookies</a></li>
                <li><strong>Safari™</strong> : <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.apple.com/fr-fr/guide/safari/sfri11471/mac</a></li>
                <li><strong>Microsoft Edge™</strong> : <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/microsoft-edge</a></li>
                <li><strong>Opera™</strong> : <a href="http://www.opera.com/help/tutorials/security/cookies/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">http://www.opera.com/help/tutorials/security/cookies/</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Durée de conservation des cookies</h2>
              <p>
                Conformément à la réglementation applicable, la Société Interim Online conserve vos choix (tant votre consentement 
                que votre refus aux cookies) pendant une durée de six (6) mois.
              </p>
              <p className="mt-4">
                La Société Interim Online conserve les données personnelles issues du dépôt de cookies pour une durée maximale de deux (2) ans.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueCookies;
