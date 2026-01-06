import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-lg">
              Dernière mise à jour : Janvier 2026
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Introduction</h2>
              <p>
                Interim Online Pro-Tech s'engage à protéger la vie privée des utilisateurs de son site. 
                Cette politique de confidentialité explique comment nous collectons, utilisons, 
                stockons et protégeons vos données personnelles conformément au Règlement Général 
                sur la Protection des Données (RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données personnelles est :
              </p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>Société :</strong> Interim Online Pro-Tech</li>
                <li><strong>Adresse :</strong> [Adresse à compléter]</li>
                <li><strong>Email :</strong> dpo@interim-online-protech.fr</li>
                <li><strong>Téléphone :</strong> 01 40 34 10 45</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Données collectées</h2>
              
              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.1 Données d'identification</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.2 Données professionnelles (candidats)</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>CV et lettre de motivation</li>
                <li>Expériences professionnelles</li>
                <li>Formations et diplômes</li>
                <li>Compétences et certifications</li>
                <li>Disponibilités et mobilité géographique</li>
                <li>Permis de conduire</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.3 Données entreprises</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Raison sociale et forme juridique</li>
                <li>Numéro SIRET</li>
                <li>Secteur d'activité</li>
                <li>Effectif</li>
                <li>Coordonnées du contact</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.4 Données de connexion</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Adresse IP</li>
                <li>Date et heure de connexion</li>
                <li>Type de navigateur</li>
                <li>Pages consultées</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Finalités du traitement</h2>
              <p>Vos données sont collectées pour :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Gérer votre inscription et votre compte utilisateur</li>
                <li>Mettre en relation candidats et entreprises</li>
                <li>Gérer les missions d'intérim et les candidatures</li>
                <li>Communiquer sur nos services et offres d'emploi</li>
                <li>Améliorer nos services et notre site</li>
                <li>Respecter nos obligations légales et réglementaires</li>
                <li>Prévenir la fraude et assurer la sécurité du site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Base légale du traitement</h2>
              <p>Le traitement de vos données repose sur :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>L'exécution d'un contrat</strong> : pour la gestion de votre compte et des missions</li>
                <li><strong>Le consentement</strong> : pour l'envoi de communications commerciales</li>
                <li><strong>L'intérêt légitime</strong> : pour l'amélioration de nos services</li>
                <li><strong>L'obligation légale</strong> : pour respecter la réglementation du travail temporaire</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Destinataires des données</h2>
              <p>Vos données peuvent être transmises à :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Nos équipes internes (recrutement, commercial, administratif)</li>
                <li>Les entreprises clientes (pour les candidatures)</li>
                <li>Nos sous-traitants techniques (hébergement, maintenance)</li>
                <li>Les organismes sociaux et administrations compétentes</li>
              </ul>
              <p className="mt-4">
                Nous ne vendons jamais vos données personnelles à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Durée de conservation</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Données des candidats actifs</strong> : pendant la durée de la relation + 3 ans</li>
                <li><strong>Données des candidats inactifs</strong> : 3 ans après le dernier contact</li>
                <li><strong>Données des entreprises</strong> : pendant la durée de la relation + 5 ans</li>
                <li><strong>Données de connexion</strong> : 1 an</li>
                <li><strong>Documents comptables</strong> : 10 ans</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Vos droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
                <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
                <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                <li><strong>Droit de retirer votre consentement</strong> : à tout moment</li>
              </ul>
              <p className="mt-4">
                Pour exercer vos droits, contactez-nous à : dpo@interim-online-protech.fr
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données contre tout accès non autorisé, modification, 
                divulgation ou destruction :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Chiffrement des données sensibles</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Authentification sécurisée</li>
                <li>Sauvegardes régulières</li>
                <li>Surveillance des systèmes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. Transferts internationaux</h2>
              <p>
                Vos données sont principalement traitées au sein de l'Union Européenne. 
                En cas de transfert vers un pays tiers, nous nous assurons que des garanties 
                appropriées sont mises en place (clauses contractuelles types, etc.).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">11. Réclamation</h2>
              <p>
                Si vous estimez que le traitement de vos données ne respecte pas la réglementation, 
                vous pouvez introduire une réclamation auprès de la CNIL :
              </p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>CNIL</strong> - Commission Nationale de l'Informatique et des Libertés</li>
                <li>3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</li>
                <li>www.cnil.fr</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">12. Modification de la politique</h2>
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                La date de dernière mise à jour sera indiquée en haut de cette page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">13. Contact</h2>
              <p>
                Pour toute question concernant cette politique de confidentialité :
              </p>
              <ul className="list-none mt-2 space-y-1">
                <li>Email : dpo@interim-online-protech.fr</li>
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

export default PolitiqueConfidentialite;
