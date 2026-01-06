import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Mentions Légales
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Éditeur du site</h2>
              <p>
                Le site Interim Online est édité par :
              </p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>Raison sociale :</strong> Interim Online Pro-Tech</li>
                <li><strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS) à associé unique</li>
                <li><strong>Capital social :</strong> 80 000 €</li>
                <li><strong>Siège social :</strong> 52 rue de Dunkerque, 75009 Paris, France</li>
                <li><strong>RCS Paris :</strong> 880 965 439</li>
                <li><strong>Téléphone :</strong> 01 40 34 10 45</li>
                <li><strong>Email :</strong> contact@interim-online.fr</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Directeur de la publication</h2>
              <p>
                Le directeur de la publication est le représentant légal de la société Interim Online Pro-Tech.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Hébergeur</h2>
              <p>
                Le site est hébergé par :
              </p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>Société :</strong> Hostinger</li>
                <li><strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Activité</h2>
              <p>
                Interim Online Pro-Tech est un outil de recherche d{"'"}emploi en ligne mettant en relation les candidats 
                et les entreprises, qui permet à des entreprises de publier des offres d{"'"}emploi, à des candidats d{"'"}y 
                postuler et aux entreprises et candidats d{"'"}entrer en contact.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Propriété intellectuelle</h2>
              <p>
                L{"'"}ensemble du contenu de ce site (textes, images, logos, vidéos, etc.) est protégé 
                par le droit d{"'"}auteur et le droit des marques. Toute reproduction, représentation, 
                modification, publication, transmission, dénaturation, totale ou partielle du site 
                ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, 
                est interdite sans l{"'"}autorisation écrite préalable d{"'"}Interim Online Pro-Tech.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Données personnelles</h2>
              <p>
                La Société Interim Online Pro-Tech s{"'"}engage à respecter votre vie privée et à protéger vos données personnelles.
              </p>
              <p className="mt-4">
                Les informations recueillies sur ce site font l{"'"}objet d{"'"}un traitement informatique 
                destiné à la gestion des candidatures et des relations avec nos clients et intérimaires. 
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez 
                d{"'"}un droit d{"'"}accès, de rectification, de suppression et d{"'"}opposition aux données vous concernant.
              </p>
              <p className="mt-4">
                Pour plus d{"'"}informations, consultez notre <a href="/politique-confidentialite" className="text-primary hover:underline">Politique de Confidentialité</a>.
              </p>
              <p className="mt-4">
                Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@interim-online.fr" className="text-primary hover:underline">contact@interim-online.fr</a> 
                ou par courrier à notre siège social : 52, rue de Dunkerque, 75009 Paris, France.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Cookies</h2>
              <p>
                Le Site utilise des cookies. Pour en savoir plus sur les cookies et la manière dont nous les utilisons, 
                consultez notre <a href="/politique-cookies" className="text-primary hover:underline">Politique Cookies</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Limitation de responsabilité</h2>
              <p>
                Interim Online Pro-Tech s{"'"}efforce d{"'"}assurer au mieux l{"'"}exactitude et la mise à jour 
                des informations diffusées sur ce site. Toutefois, nous ne pouvons garantir l{"'"}exactitude, 
                la précision ou l{"'"}exhaustivité des informations mises à disposition sur ce site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Droit applicable</h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. 
                En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
