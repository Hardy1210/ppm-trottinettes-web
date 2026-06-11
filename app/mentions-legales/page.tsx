//import Footer from '../sections/footer/Footer'

import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Mentions légales — Piles Power Mobilité | Dijon',
  description: 'Mentions légales, CGV et CGS de Piles Power Mobilité, atelier de réparation de trottinettes électriques à Dijon (21000).',
  alternates: {
    canonical: 'https://pilespowermobilite.fr/mentions-legales',
  },
  openGraph: {
    title: 'Mentions légales — Piles Power Mobilité',
    description: 'Informations légales, conditions de vente et de service de Piles Power Mobilité à Dijon.',
    url: 'https://pilespowermobilite.fr/mentions-legales',
    images: [{ url: '/images/bannierr.jpg', width: 1200, height: 630, alt: 'Mentions légales Piles Power Mobilité Dijon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentions légales — Piles Power Mobilité',
    description: 'Informations légales, conditions de vente et de service de Piles Power Mobilité à Dijon.',
    images: ['/images/bannierr.jpg'],
  },
}

const MentionsLegales = () => {
  return (
    <div className="bg-ppmBg text-white">
      <header className="border-b border-white/10 px-[clamp(1rem,3vw,1.4rem)] pt-32 pb-10 md:pt-40">
        <div className="mx-auto max-w-container">
          <p className="mb-4 font-body text-sm uppercase tracking-[0.22em] text-ppmYellow/80">
            Informations légales
          </p>
          <h1 className="max-w-5xl font-title text-[clamp(2.8rem,8vw,7rem)] leading-[0.95]">
            Mentions légales
          </h1>
          <p className="mt-6 max-w-reading font-body text-base leading-relaxed text-white/70 md:text-lg">
            Retrouvez ici les informations légales relatives au site de Piles
            Power Mobilité, ainsi que les principales conditions applicables aux
            ventes de produits et aux prestations de réparation de trottinettes
            électriques.
          </p>
        </div>
      </header>

      <main className="px-[clamp(1rem,3vw,1.4rem)] py-12 md:py-16">
        <div className="mx-auto flex max-w-container flex-col gap-8">
          {/* Bloc société */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="border-b border-white/10 pb-4 font-title text-[clamp(1.4rem,3vw,2.2rem)] leading-tight">
              Éditeur du site
            </h2>

            <div className="mt-6 grid gap-4 text-sm leading-relaxed text-white/75 md:grid-cols-2 md:text-base">
              <div>
                <span className="block text-white">Dénomination sociale</span>
                Piles Power Mobilité
              </div>

              <div>
                <span className="block text-white">Forme juridique</span>
                Micro-entreprise
              </div>

              <div>
                <span className="block text-white">
                  Adresse du siège social
                </span>
                40 rue d’Alembert, 21000 Dijon, France
              </div>

              <div>
                <span className="block text-white">SIRET</span>
                991 304 783 00012
              </div>

              <div>
                <span className="block text-white">
                  Directeur de la publication
                </span>
                Christophe Barbarin
              </div>

              <div>
                <span className="block text-white">TVA intracommunautaire</span>
                TVA non communiquée / non applicable à ce jour
              </div>

              <div>
                <span className="block text-white">
                  RCS et ville d’immatriculation
                </span>
                À compléter
              </div>

              <div>
                <span className="block text-white">Contact</span>{' '}
                rrepartrot@gmail.com
              </div>
            </div>
          </section>

          {/* Bloc hébergeur */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="border-b border-white/10 pb-4 font-title text-[clamp(1.4rem,3vw,2.2rem)] leading-tight">
              Hébergement
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-white/75 md:text-base">
              Le site est hébergé par :{' '}
              <span className="text-white">Vercel Inc.</span>
              <br />
              Adresse :{' '}
              <span className="text-white">
                440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
              </span>
              <br />
              Site web : <span className="text-white">https://vercel.com</span>
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="border-b border-white/10 pb-4 font-title text-[clamp(1.4rem,3vw,2.2rem)] leading-tight">
              Propriété intellectuelle
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-white/75 md:text-base">
              L’ensemble des éléments présents sur ce site, notamment les
              textes, images, graphismes, logo, photographies, vidéos, éléments
              visuels, structure, code source et contenus techniques, est
              protégé par le droit de la propriété intellectuelle. Toute
              reproduction, représentation, adaptation, diffusion ou
              exploitation, totale ou partielle, sans autorisation écrite
              préalable de Piles Power Mobilité est interdite.
            </p>
          </section>

          {/* CGV */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="border-b border-white/10 pb-4 font-title text-[clamp(1.4rem,3vw,2.2rem)] leading-tight">
              Conditions Générales de Vente (CGV)
            </h2>

            <div className="mt-6 space-y-6 text-sm leading-relaxed text-white/75 md:text-base">
              <div>
                <h3 className="mb-2 text-white">1. Modalités de commande</h3>
                <p>
                  Les commandes peuvent être passées en ligne via le site ou
                  directement en atelier. Toute commande est considérée comme
                  ferme après validation du paiement ou signature d’un devis.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">
                  2. Prix, devis et moyens de paiement
                </h3>
                <p>
                  Les prix sont indiqués en euros TTC sur le site ou en magasin.
                  Un devis détaillé est remis pour les interventions techniques
                  complexes ou la vente de pièces spécifiques. Les moyens de
                  paiement acceptés sont : carte bancaire, espèces, virement, ou
                  tout autre mode précisé en magasin.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">3. Délais de livraison</h3>
                <p>
                  Les livraisons de produits s’effectuent sous 2 à 7 jours
                  ouvrés, selon le stock et la destination. Le délai exact est
                  confirmé lors de la commande.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">
                  4. Garanties légales et commerciales
                </h3>
                <p>
                  Les produits bénéficient de la garantie légale de conformité
                  de 2 ans et de la garantie contre les vices cachés. Certaines
                  pièces détachées ou certains produits peuvent bénéficier d’une
                  garantie commerciale complémentaire précisée sur la facture ou
                  sur le site. Les pièces d’usure, notamment les pneus, chambres
                  à air, plaquettes et éléments soumis à une usure normale, ne
                  sont pas couvertes par la garantie.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">
                  5. Conditions de retour, remboursement et SAV
                </h3>
                <p>
                  Le client dispose de 14 jours après la livraison pour exercer
                  son droit de rétractation, hors produits personnalisés, les
                  frais de retour restant à sa charge. Après vérification, le
                  remboursement ou l’échange est effectué sous 7 jours. Les
                  produits retournés doivent être complets, non utilisés et dans
                  leur emballage d’origine. Toute demande de service après-vente
                  doit être effectuée via le formulaire de contact du site ou
                  directement en magasin.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">6. Responsabilité</h3>
                <p>
                  Piles Power Mobilité ne saurait être tenue responsable en cas
                  de mauvaise utilisation, de modification non autorisée ou
                  d’intervention sur le produit par des tiers. Le client doit
                  respecter les conditions d’utilisation et d’entretien
                  communiquées par le fabricant.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">7. Traitement des litiges</h3>
                <p>
                  En cas de litige, le client s’engage à rechercher d’abord une
                  solution amiable avec le service client. À défaut d’accord,
                  les tribunaux du ressort du siège social de l’entreprise
                  seront compétents.
                </p>
              </div>
            </div>
          </section>

          {/* CGS */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="border-b border-white/10 pb-4 font-title text-[clamp(1.4rem,3vw,2.2rem)] leading-tight">
              Conditions Générales de Service (CGS)
            </h2>

            <div className="mt-6 space-y-6 text-sm leading-relaxed text-white/75 md:text-base">
              <div>
                <h3 className="mb-2 text-white">1. Modalités de commande</h3>
                <p>
                  Les interventions sont demandées en atelier ou en ligne, sur
                  rendez-vous. Un devis préalable est systématiquement proposé
                  avant toute réparation. L’acceptation du devis vaut bon de
                  commande.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">
                  2. Prix, devis et moyens de paiement
                </h3>
                <p>
                  Les tarifs sont affichés en atelier et/ou sur le site. Toute
                  réparation fait l’objet d’un devis écrit. Le paiement
                  s’effectue au comptant lors de la récupération de la
                  trottinette ou selon les modalités définies sur le devis :
                  carte bancaire, espèces, virement.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">3. Délais d’intervention</h3>
                <p>
                  Le délai d’intervention est généralement de 1 à 5 jours ouvrés
                  après validation du devis, selon la disponibilité des pièces
                  et la charge de l’atelier. En cas de délai supérieur, le
                  client en est informé.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">
                  4. Garanties sur les réparations
                </h3>
                <p>
                  Les réparations bénéficient d’une garantie pièces et
                  main-d’œuvre de 1 à 3 mois, sauf pièces d’usure ou usage
                  inapproprié constaté. Toute prestation complémentaire requise
                  au cours de l’intervention fait l’objet d’une information
                  préalable au client et d’un devis actualisé.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">
                  5. Conditions de retour, remboursement et SAV
                </h3>
                <p>
                  Le client peut demander la restitution des pièces remplacées
                  au moment de la récupération du véhicule. Si une panne
                  réapparaît sous garantie, une réparation ou un remplacement
                  gratuit est effectué, sauf en cas d’usure normale ou de
                  non-respect des consignes d’utilisation.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">6. Responsabilité</h3>
                <p>
                  La société décline toute responsabilité en cas d’utilisation
                  non conforme, de modifications effectuées par le client, ou de
                  refus d’une prestation complémentaire indispensable à la
                  sécurité du véhicule.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-white">7. Traitement des litiges</h3>
                <p>
                  En cas de désaccord sur une intervention ou une facture, une
                  solution amiable est recherchée en priorité. Si nécessaire, le
                  litige sera porté devant les juridictions compétentes du siège
                  social de l’entreprise.
                </p>
              </div>
            </div>
          </section>

          {/* Données personnelles */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="border-b border-white/10 pb-4 font-title text-[clamp(1.4rem,3vw,2.2rem)] leading-tight">
              Données personnelles
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-white/75 md:text-base">
              Les informations éventuellement recueillies via les formulaires du
              site sont destinées exclusivement à Piles Power Mobilité dans le
              cadre du traitement des demandes de contact, de devis, de service
              après-vente ou de commande. Conformément au Règlement Général sur
              la Protection des Données (RGPD) et à la loi Informatique et
              Libertés, toute personne dispose d’un droit d’accès, de
              rectification, d’effacement, d’opposition, de limitation du
              traitement et de portabilité de ses données, dans les limites
              prévues par la réglementation. Ces droits peuvent être exercés en
              contactant l’éditeur du site à l’adresse communiquée sur cette
              page.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MentionsLegales;
