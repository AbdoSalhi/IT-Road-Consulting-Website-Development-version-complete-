import { useEffect, useRef } from 'react';
import {
  Landmark,
  Newspaper,
  Factory,
  HardHat,
  Building2,
  Zap,
} from 'lucide-react';

const industries = [
  { icon: Landmark, name: 'Banking & Finance', color: 'from-blue-500 to-blue-700' },
  { icon: Newspaper, name: 'Retail', color: 'from-rose-500 to-rose-700' },
  { icon: Factory, name: 'Manufacturing', color: 'from-amber-500 to-orange-600' },
  { icon: HardHat, name: 'Healthcare', color: 'from-stone-500 to-stone-700' },
  { icon: Building2, name: 'Public Sector', color: 'from-emerald-500 to-emerald-700' },
  { icon: Zap, name: 'Telecom', color: 'from-yellow-500 to-amber-600' },
];

export default function Industries() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('[data-anim]').forEach((node, i) => {
            const n = node as HTMLElement;
            n.style.transitionDelay = `${(i % 4) * 100}ms`;
            n.classList.add('!opacity-100', '!translate-y-0');
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="industries"
      ref={ref}
      className="py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
            Secteurs d'activité
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 section-underline-center">
            Une expertise multi-sectorielle
          </h2>
          <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
Nous accompagnons les organisations les plus exigeantes dans des secteurs variés,
            avec une connaissance fine de leurs enjeux métier.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {industries.map((ind, i) => (
            <div
              key={i}
              data-anim
              className="opacity-0 translate-y-6 transition-all duration-600 group relative overflow-hidden rounded-2xl bg-white border border-neutral-200 p-7 card-hover cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${ind.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ind.color} flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-300`}>
                  <ind.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-white transition-colors duration-300">
                  {ind.name}
                </h3>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div
            data-anim
            className="opacity-0 translate-y-6 transition-all duration-600 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-700 p-7 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <div className="text-white">
              <p className="font-semibold mb-2">Votre secteur n'est pas listé ?</p>
              <p className="text-sm text-white/80 mb-4">Contactez-nous pour échanger sur vos enjeux.</p>
              <a href="#contact" className="inline-block px-4 py-2 bg-white text-primary-700 text-sm font-semibold rounded-lg hover:bg-primary-50 transition-colors">
                Parlons-en
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
