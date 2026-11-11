import { useEffect, useRef } from 'react';
import {
  Search,
  Lightbulb,
  Layers,
  RefreshCw,
  Package,
  Settings,
  TrendingUp,
} from 'lucide-react';

const steps = [
  { icon: Search, title: 'Discovery', desc: "Analyse approfondie de l'existant et identification des opportunités de transformation." },
  { icon: Lightbulb, title: 'Stratégie', desc: 'Définition de la feuille de route et des priorités de votre transformation digitale.' },
  { icon: Layers, title: 'Architecture', desc: 'Conception de l\'architecture cible cloud, data et IA adaptée à vos besoins.' },
  { icon: RefreshCw, title: 'Développement', desc: "Conduite du changement et déploiement des nouvelles solutions technologiques." },
  { icon: Package, title: 'Delivery', desc: 'Industrialisation et livraison continue avec notre digital factory agile.' },
  { icon: Settings, title: 'Opération', desc: 'Exploitation et services managés en mode continu, 24/7.' },
  { icon: TrendingUp, title: 'Optimisation', desc: 'Amélioration continue, mesure de la valeur et optimisation des coûts.' },
];

export default function Methodology() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('[data-anim]').forEach((node, i) => {
            const n = node as HTMLElement;
            n.style.transitionDelay = `${i * 100}ms`;
            n.classList.add('!opacity-100', '!scale-100');
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
      id="methodology"
      ref={ref}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
            Notre approche
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 section-underline-center">
            La méthodologie 360°
          </h2>
          <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
            Une démarche complète et itérative qui couvre l'intégralité du cycle de vie de votre
            transformation, de la découverte initiale à l'optimisation continue.
          </p>
        </div>

        {/* Process timeline - desktop */}
        <div className="hidden lg:block relative">
          {/* Horizontal connecting line */}
          <div className="absolute top-14 left-[7%] right-[7%] h-0.5 bg-gradient-to-r from-primary-300 via-secondary-300 to-primary-300" />

          <div className="grid grid-cols-7 gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                data-anim
                className="opacity-0 scale-90 transition-all duration-600 flex flex-col items-center text-center group"
              >
                {/* Node */}
                <div className="relative w-14 h-14 mb-4 z-10">
                  <div className="absolute inset-0 bg-white rounded-full border-2 border-primary-200 group-hover:border-primary-500 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process - mobile/tablet vertical */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => (
            <div
              key={i}
              data-anim
              className="opacity-0 scale-95 transition-all duration-500 flex gap-4 p-5 bg-neutral-50 rounded-2xl border border-neutral-100"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-xl border-2 border-primary-200 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-neutral-900 mb-1">{step.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
