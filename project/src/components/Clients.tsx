const clients = [
  { name: 'Royal Air Maroc', src: '/logos/Logo_Royal_Air_Maroc.svg.webp' },
  { name: 'Bank of Africa', src: '/logos/Bank-of-Africa-_BMCE_.svg' },
  { name: 'BPI France', src: '/logos/bpifrance.webp' },
  { name: 'Crédit Agricole du Maroc', src: '/logos/Credit_Agricole_du_Maroc.webp' },
  { name: 'GIZ', src: '/logos/GIZ.svg' },
  { name: 'Société Générale', src: '/logos/Societe-Generale-logo.svg' },
  { name: 'Ministère des Affaires Étrangères', src: '/logos/ministere-des-affaires-etrangers-logo.svg' },
  { name: 'ONHYM', src: '/logos/onhym-logo.svg' },
  { name: 'ORMVAG', src: '/logos/ormvag_logo.jpg' },
];

export default function Clients() {
  return (
    <section id="clients" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
            Ils nous font confiance
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 section-underline-center">
            Nos clients de référence
          </h2>
          <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
            Banques, institutions publiques, grandes entreprises : ils ont choisi IT-ROAD Consulting
            pour les accompagner dans leur transformation digitale.
          </p>
        </div>

        <div className="clients-carousel" aria-label="Clients et partenaires">
          <div className="clients-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0"
                style={{ gap: '1rem' }}
                aria-hidden={copy === 1}
              >
                {clients.map((client) => (
                  <div
                    key={`${client.name}-${copy}`}
                    className="group relative flex shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 hover:bg-white hover:shadow-lg hover:border-neutral-300 transition-colors duration-300"
                    style={{ width: '160px', height: '110px', padding: '1.25rem' }}
                  >
                    <img
                      src={client.src}
                      alt={copy === 0 ? client.name : ''}
                      className="object-contain"
                      style={{ maxWidth: '80%', maxHeight: '60%' }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
