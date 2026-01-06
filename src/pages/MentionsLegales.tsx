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
                Le site Interim Online Pro-Tech est édité par :
              </p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>Raison sociale :</strong> Interim Online Pro-Tech</li>
                <li><strong>Forme juridique :</strong> SAS</li>
                <li><strong>Capital social :</strong> [À compléter] €</li>
                <li><strong>Siège social :</strong> [Adresse à compléter]</li>
                <li><strong>SIRET :</strong> [À compléter]</li>
                <li><strong>RCS :</strong> [À compléter]</li>
                <li><strong>Numéro de TVA :</strong> [À compléter]</li>
                <li><strong>Téléphone :</strong> 01 40 34 10 45</li>
                <li><strong>Email :</strong> contact@interim-online-protech.fr</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Directeur de la publication</h2>
              <p>
                Le directeur de la publication est : [Nom du directeur à compléter]
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
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Activité réglementée</h2>
              <p>
                Interim Online Pro-Tech exerce une activité d'entreprise de travail temporaire 
                conformément aux dispositions du Code du travail.
              </p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>Déclaration d'activité :</strong> [Numéro à compléter]</li>
                <li><strong>Garantie financière :</strong> [Organisme garant à compléter]</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, logos, vidéos, etc.) est protégé 
                par le droit d'auteur et le droit des marques. Toute reproduction, représentation, 
                modification, publication, transmission, dénaturation, totale ou partielle du site 
                ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, 
                est interdite sans l'autorisation écrite préalable d'Interim Online Pro-Tech.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Données personnelles</h2>
              <p>
                Les informations recueillies sur ce site font l'objet d'un traitement informatique 
                destiné à la gestion des candidatures et des relations avec nos clients et intérimaires. 
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez 
                d'un droit d'accès, de rectification, de suppression et d'opposition aux données vous concernant.
              </p>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : contact@interim-online-protech.fr
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Limitation de responsabilité</h2>
              <p>
                Interim Online Pro-Tech s'efforce d'assurer au mieux l'exactitude et la mise à jour 
                des informations diffusées sur ce site. Toutefois, nous ne pouvons garantir l'exactitude, 
                la précision ou l'exhaustivité des informations mises à disposition sur ce site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Droit applicable</h2>
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
