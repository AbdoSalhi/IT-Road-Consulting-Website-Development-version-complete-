import { Globe, MapPin, Phone, Mail, Share2, MessageCircle, Send, ArrowUp } from 'lucide-react';

const footerLinks = {
  Services: [
    'Transformation Digitale',
    'Artificial Intelligence',
    'Cloud Consulting',
    'Data & Analytics',
    'Automation',
    'Cybersecurity & Compliance',
  ],
  Secteurs: [
    'Finance',
    'Public Sector',
    'Manufacturing',
    'Telecom',
    'Healthcare',
    'Retail',
  ],
  Société: ['À propos', 'Méthodologie 360°', 'Nos clients', 'Témoignages', 'Contact', 'Mentions légales'],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 10% 0%, #27a05a 0%, transparent 40%), radial-gradient(circle at 90% 0%, #1d4ed8 0%, transparent 40%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center shadow-md">
                <Globe className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base">IT-ROAD</span>
                <span className="text-xs text-primary-400">Consulting Maroc</span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-sm">
              Cabinet de conseil en transformation digitale, IA et cloud, filiale du groupe
              ITRoad. Basés à Casablanca, au service du Maroc et de l'Afrique.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Building Optima Business Center, Sidi Maarouf, Casablanca</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="tel:+212702074046" className="hover:text-white transition-colors">+212 (0) 7 02 07 40 46</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="mailto:contact@itroad.ma" className="hover:text-white transition-colors">contact@itroad.ma</a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-sm mb-4 text-white">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/60 hover:text-primary-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span>© {new Date().getFullYear()} IT-ROAD Consulting Maroc. Tous droits réservés.</span>
          </div>

          <div className="flex items-center gap-3">
            {[Share2, MessageCircle, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-500 flex items-center justify-center transition-colors duration-200"
                aria-label="Réseau social"
              >
                <Icon className="w-4 h-4 text-white/70" />
              </a>
            ))}
            <a
              href="#hero"
              className="ml-2 w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-500 flex items-center justify-center transition-colors duration-200"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-4 h-4 text-white/70" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
