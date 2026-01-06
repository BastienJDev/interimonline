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
              Dernière mise à jour : 21/10/2021
            </p>

            <p>
              Le présent document est la Politique de confidentialité du site internet Interim Online, disponible via l{"'"}URL suivante : 
              <a href="https://interim-online.fr/" className="text-primary hover:underline"> https://interim-online.fr/</a> (ci-après le « Site »).
            </p>

            <p>
              Le Site est un outil de recherche d{"'"}emploi en ligne mettant en relation les candidats et les entreprises, 
              qui permet à des entreprises de publier des offres d{"'"}emploi, à des candidats d{"'"}y postuler et aux entreprises 
              et candidats d{"'"}entrer en contact (ci-après les « Services »).
            </p>

            <p>
              Pour en savoir plus sur les Services, vous pouvez consulter les Conditions Générales d{"'"}Utilisation pour les candidats 
              ou les Conditions Générales d{"'"}Utilisation pour les entreprises du Site.
            </p>

            <p>
              Pour en savoir plus sur les cookies, vous pouvez consulter la <a href="/politique-cookies" className="text-primary hover:underline">Politique Cookies</a>.
            </p>

            <nav className="bg-muted/50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-foreground mb-4">Sommaire</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li><a href="#section1" className="text-primary hover:underline">Qui est responsable des traitements de données effectués via le Site ?</a></li>
                <li><a href="#section2" className="text-primary hover:underline">Quelles catégories de données personnelles sont traitées via le Site ?</a></li>
                <li><a href="#section3" className="text-primary hover:underline">Sur quelles bases légales et pour quelles finalités sont traitées vos données personnelles ?</a></li>
                <li><a href="#section4" className="text-primary hover:underline">Qui sont les destinataires de vos données personnelles collectées via le Site ?</a></li>
                <li><a href="#section5" className="text-primary hover:underline">Transferts de vos données personnelles en dehors de l{"'"}EEE : pourquoi et comment ?</a></li>
                <li><a href="#section6" className="text-primary hover:underline">Quels sont vos droits sur vos données personnelles ?</a></li>
                <li><a href="#section7" className="text-primary hover:underline">Pendant quelle durée vos données sont-elles conservées ?</a></li>
                <li><a href="#section8" className="text-primary hover:underline">Comment nous contacter pour toutes questions ?</a></li>
                <li><a href="#section9" className="text-primary hover:underline">Comment cette Politique peut-elle être modifiée ?</a></li>
              </ol>
            </nav>

            <section id="section1">
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1) Qui est responsable des traitements de données effectués via le Site ?</h2>
              <p>
                Le Site est édité par la société Interim Online Pro-Tech, société par actions simplifiée à associé unique et au capital 
                de 80.000 euros, dont le siège social est situé au 52 rue de Dunkerque 75009 Paris, France, inscrite au Registre du Commerce 
                et des Sociétés de Paris sous le numéro 880 965 439, (ci-après la « Société Interim Online ») qui a la qualité de 
                « responsable du traitement » au sens de la législation applicable en matière de protection des données personnelles.
              </p>
              <p className="mt-4">
                La Société Interim Online s{"'"}engage à respecter votre vie privée et à protéger vos données personnelles.
              </p>
            </section>

            <section id="section2">
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2) Quelles catégories de données personnelles sont traitées via le Site ?</h2>
              <p>
                La Société Interim Online collecte directement les informations suivantes auprès de vous lorsque vous utilisez le Site :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Vos <strong>données d{"'"}identification et de contact</strong> (par exemple, vos nom et prénom, adresse e-mail, numéro de téléphone, votre profession, votre CV) nécessaires à votre inscription et connexion à votre compte et pour répondre à vos demandes ;</li>
                <li>Vos <strong>données permettant votre recherche d{"'"}emploi</strong> (par exemple, votre profession, vos spécialités techniques, votre photographie, votre périmètre de recherche, vos informations se trouvant dans votre CV, la détention du permis de conduire) lorsque vous êtes un candidat ;</li>
                <li>Vos <strong>données permettant votre recherche de candidats</strong> (par exemple : identification précise de l{"'"}entreprise, votre fonction au sein de cette entreprise, ensemble des informations relatives à votre recherche : mots-clés, titre métiers, lieu, domaine d{"'"}activité, type de contrat, type de salaire, date, etc.) lorsque vous êtes une entreprise ;</li>
                <li>Vos <strong>données relatives au suivi de votre compte</strong> (par exemple, votre identifiant, l{"'"}historique de vos candidatures/des candidatures reçues).</li>
              </ul>
              <p className="mt-4">
                Les données personnelles indispensables à Interim Online pour remplir les finalités décrites ci-dessous sont signalées au 
                moment de leur collecte. Si vous ne renseignez pas ces champs obligatoires, Interim Online ne pourra pas répondre à vos 
                demandes et/ou vous fournir les Services d{"'"}Interim Online. Les autres informations ont un caractère facultatif et 
                permettent d{"'"}améliorer les services d{"'"}Interim Online à votre égard.
              </p>
              <p className="mt-4">
                D{"'"}autres données sont collectées automatiquement lorsque vous naviguez sur le Site. Il s{"'"}agit de <strong>données de connexion 
                et de navigation</strong> (terminal utilisé, votre adresse IP, votre type de navigateur et des informations de navigation). 
                Ces données sont collectées pour permettre le bon fonctionnement du Site, mais également pour mesurer l{"'"}audience, ou pour 
                vous proposer des fonctionnalités en lien avec les réseaux sociaux et de la publicité en fonction des choix effectués pour 
                le dépôt de cookies.
              </p>
            </section>

            <section id="section3">
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3) Sur quelles bases légales et pour quelles finalités sont traitées vos données personnelles ?</h2>
              
              <p><strong>La Société Interim Online collecte et traite des données personnelles vous concernant sur la base de votre consentement pour :</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Vous adresser des informations sur les nouvelles offres d{"'"}emploi/les nouveaux candidats en recherche d{"'"}emploi ;</li>
                <li>Améliorer le fonctionnement et la pertinence du Site en réalisant des statistiques d{"'"}audience ;</li>
                <li>Vous fournir des fonctionnalités en lien avec les réseaux sociaux ;</li>
                <li>Vous afficher de la publicité sur le Site, y compris de la publicité personnalisée en fonction de votre profil et de votre navigation.</li>
              </ul>
              <p className="mt-2">
                Pour plus de détails sur ces trois derniers points, vous pouvez consulter la <a href="/politique-cookies" className="text-primary hover:underline">Politique Cookies</a>.
              </p>

              <p className="mt-4"><strong>La Société Interim Online collecte et traite des données personnelles vous concernant sur la base de l{"'"}exécution des Conditions Générales d{"'"}Utilisation que vous avez acceptées :</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Vous permettre de créer un compte et d{"'"}y accéder ;</li>
                <li>Vous permettre de publier votre CV, de rechercher des offres d{"'"}emploi et d{"'"}y postuler lorsque vous êtes candidat ;</li>
                <li>Vous permettre de publier des offres d{"'"}emploi et de rechercher des candidats lorsque vous êtes une entreprise ;</li>
                <li>Vous mettre en relation entre candidats et entreprises afin de vous faciliter vos recherches.</li>
              </ul>

              <p className="mt-4"><strong>La Société Interim Online collecte et traite des données personnelles vous concernant sur la base de son intérêt légitime :</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Assurer le bon fonctionnement du Site de manière sécurisée sur la base de son intérêt à gérer son Site ;</li>
                <li>Répondre à vos questions et demandes lorsque vous la contactez via la rubrique « Formulaire contact » sur la base de son intérêt à assurer une réponse à ses internautes.</li>
              </ul>
            </section>

            <section id="section4">
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4) Qui sont les destinataires de vos données personnelles collectées via le Site ?</h2>
              
              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Gestion du Site et de la relation avec vous</h3>
              <p>
                Le personnel autorisé de la Société Interim Online a accès aux données personnelles collectées auprès de vous, 
                afin de permettre le bon fonctionnement du Site et de corriger les éventuels incidents techniques et de gérer 
                la relation avec vous en tant qu{"'"}utilisateur du Site et des Services.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Mise en relation candidat/emploi</h3>
              <p>
                Lorsque vous êtes candidat et que vous déposez votre CV ou candidatez à une offre d{"'"}emploi, les informations 
                relatives à votre recherche d{"'"}emploi (y compris identité, contact, CV) seront transmises aux entreprises en 
                recherche d{"'"}un profil correspondant au vôtre et à l{"'"}entreprise de l{"'"}offre d{"'"}emploi. Lorsque vous êtes une 
                entreprise, les informations relatives à votre recherche de candidats (y compris identité et contact) seront 
                transmises aux potentiels candidats.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Cookies : Mesures d{"'"}audience / Réseaux Sociaux / Publicité</h3>
              <p>
                Vos données personnelles sont transmises aux tiers déposant des cookies sur le Site, en fonction des choix 
                effectués par l{"'"}Utilisateur via la bannière cookies, sous réserve de votre consentement, dans les conditions 
                prévues dans la <a href="/politique-cookies" className="text-primary hover:underline">Politique Cookies</a>.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Prestataires ou fournisseurs tiers</h3>
              <p>
                Vos données personnelles sont également communiquées par la Société Interim Online à des sous-traitants ou des 
                fournisseurs de services, qui interviennent à titre purement technique ou logistique (les fournisseurs de services 
                d{"'"}hébergement et de maintenance sur le Site) ou pour les cookies.
              </p>
              <p className="mt-2">
                L{"'"}hébergeur du Site est la société Hostinger, dont le siège social est situé au 61 Lordou Vironos Street, 6023 Larnaca, Chypre.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Protection et défense des droits</h3>
              <p>
                Vos données personnelles pourront être communiquées à des tiers lorsqu{"'"}une telle communication sera requise par 
                la loi, une disposition réglementaire ou une décision judiciaire, ou si cette communication est nécessaire en cas de litige.
              </p>
            </section>

            <section id="section5">
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5) Transferts de vos données personnelles en dehors de l{"'"}EEE : pourquoi et comment ?</h2>
              <p>
                Vos données personnelles sont transférées hors de l{"'"}Espace Economique Européen, notamment en raison du recours 
                à des prestataires situés hors de l{"'"}EEE et à des tiers déposant des cookies sur le Site.
              </p>
              <p className="mt-4">
                Dans ce cas, ces transferts sont effectués moyennant des garanties appropriées permettant d{"'"}assurer un niveau 
                de protection suffisant de la vie privée et des droits fondamentaux, notamment la signature de clauses contractuelles types.
              </p>
            </section>

            <section id="section6">
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6) Quels sont vos droits sur vos données personnelles ?</h2>
              
              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Accès et rectification</h3>
              <p>
                Vous avez le droit d{"'"}accéder à vos données personnelles et de demander la rectification de toutes données qui 
                s{"'"}avèreraient inexactes. Si vous disposez d{"'"}un compte, vous pouvez accéder directement aux données contenues 
                dans votre compte en ligne, les rectifier/supprimer.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Autres droits</h3>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Effacement.</strong> Vous pouvez également demander l{"'"}effacement de vos données personnelles à condition qu{"'"}il ne soit plus nécessaire pour la Société Interim Online de les conserver.</li>
                <li><strong>Opposition et limitation du traitement.</strong> Vous pouvez également vous opposer au traitement de vos données personnelles ou demander une restriction de ce traitement, à moins que celui-ci ne soit nécessaire pour la gestion des Services que vous demandez.</li>
                <li><strong>Retrait du consentement.</strong> Lorsque le traitement de vos données personnelles est basé sur votre consentement, vous pouvez alors le retirer à tout moment. Le retrait de votre consentement ne remettra pas en cause la légalité des traitements d{"'"}ores et déjà effectués.</li>
                <li><strong>Portabilité.</strong> En outre, vous pouvez exercer votre droit à la portabilité, c{"'"}est-à-dire obtenir, sous une forme structurée et lisible par machine, les données personnelles que vous avez fournies, directement sur la base de son consentement ou sur la base des Conditions Générales d{"'"}Utilisation, à condition que ce traitement soit automatisé.</li>
                <li><strong>Directives.</strong> Vous pouvez également donner vos directives concernant la conservation, l{"'"}effacement et la divulgation de vos données personnelles après votre décès, et modifier vos directives à tout moment.</li>
              </ul>

              <p className="mt-4">
                Vous pouvez faire une réclamation auprès de la CNIL, suivant le processus décrit sur son site 
                <a href="https://www.cnil.fr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer"> https://www.cnil.fr</a> ou auprès de l{"'"}autorité de protection des données du pays dans lequel vous résidez ou travaillez habituellement, selon le droit applicable.
              </p>

              <p className="mt-4">
                Ces droits peuvent être exercés à tout moment en contactant la Société Interim Online via la section « Nous contacter » 
                sur le Site ou en envoyant un e-mail à <a href="mailto:contact@interim-online.fr" className="text-primary hover:underline">contact@interim-online.fr</a> ou 
                par courrier adressé à son siège social au 52, rue de Dunkerque, 75009 Paris, France.
              </p>
            </section>

            <section id="section7">
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7) Pendant quelle durée vos données sont-elles conservées ?</h2>
              <p>
                Vos données personnelles sont conservées pour le temps nécessaire à l{"'"}accomplissement des finalités décrites 
                énoncées dans la présente Politique, conformément aux règlementations et législations applicables sur la protection 
                des données personnelles.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Réclamations</h3>
              <p>
                Vos informations relatives à toute demande et requête collectées et traitées dans le cadre de contact avec les 
                personnels sont conservées le temps de répondre à la demande en base active et pendant 3 ans à compter du dernier 
                contact avec vous en archive intermédiaire.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Données de compte</h3>
              <p>
                Votre compte sur le Site restera actif tant que vous n{"'"}aurez pas décidé de le clôturer. En l{"'"}absence d{"'"}activité 
                de votre part, vos données de compte seront conservées en archive intermédiaire pendant trois (3) ans. En cas 
                d{"'"}inactivité prolongée de votre part pendant une période de 3 ans, ce compte sera désactivé et vos données afférentes seront supprimées.
              </p>
              <p className="mt-2">
                Dans tous les cas, vous disposez de la faculté à tout moment de clôturer votre compte, en cliquant sur « Supprimer mon compte » sur le Site.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Données de CV</h3>
              <p>
                Vos données de CV sont conservées pendant une durée de 2 ans à compter de leur recueil/publication en base active. 
                À l{"'"}issue de ce délai et en l{"'"}absence de mise à jour de votre part, ces données seront supprimées.
              </p>
              <p className="mt-2">
                Dans tous les cas, vous pouvez supprimer votre recherche d{"'"}emploi et votre CV à tout moment via votre compte sur le Site.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Cookies</h3>
              <p>
                S{"'"}agissant de la durée de conservation en matière de cookies, voir la <a href="/politique-cookies" className="text-primary hover:underline">Politique Cookies</a>.
              </p>

              <p className="mt-4">
                Vos données personnelles seront supprimées à l{"'"}expiration des délais mentionnés dans cet article.
              </p>
            </section>

            <section id="section8">
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8) Comment nous contacter pour toutes questions ?</h2>
              <p>
                En cas de questions sur la politique de confidentialité et les pratiques de la Société Interim Online en matière 
                de protection des données personnelles, vous pouvez contacter la Société Interim Online :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-1">
                <li>sur le Site via la rubrique « Nous contacter »</li>
                <li>par courrier électronique à <a href="mailto:contact@interim-online.fr" className="text-primary hover:underline">contact@interim-online.fr</a></li>
                <li>ou par courrier adressé à son siège social au 52, rue de Dunkerque, 75009 Paris, France.</li>
              </ul>
              <p className="mt-4">
                En cas de contestation concernant la manière dont la Société Interim Online collecte et traite vos données personnelles, 
                vous pouvez introduire une réclamation auprès de la CNIL via le lien suivant : 
                <a href="https://www.cnil.fr/fr/plaintes/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer"> https://www.cnil.fr/fr/plaintes/</a>.
              </p>
            </section>

            <section id="section9">
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9) Comment cette Politique peut-elle être modifiée ?</h2>
              <p>
                La Politique de confidentialité peut être modifiée et mise à jour pour refléter les changements dans les pratiques 
                de la Société Interim Online, ou pour assurer le respect de la réglementation en cas de modification de celle-ci.
              </p>
              <p className="mt-4">
                Dans ce cas, la Politique de confidentialité révisée sera mise en ligne sur le Site, avec mention de la dernière 
                date de mise à jour et vous en serez informé par une bannière affichée sur le Site vous invitant à consulter la 
                Politique de confidentialité mise à jour.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
