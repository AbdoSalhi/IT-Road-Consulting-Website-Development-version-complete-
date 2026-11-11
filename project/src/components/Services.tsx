import { useEffect, useRef } from 'react';
import {
  Briefcase,
  Database,
  Rocket,
  BrainCircuit,
  Globe2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    icon: Briefcase,
    title: 'Transformation Digitale',
    short: "Une digital factory qui accompagne votre transformation numérique, de la vision stratégique jusqu'à des roadmaps validés et priorisés, déployés sur le terrain.",
    points: ['Stratégie digitale', 'Conduite du changement', 'Digital Factory', 'Plateformes digitales'],
  },
  {
    icon: BrainCircuit,
    title: 'Artificial Intelligence',
    short: "De la donnée brute à l'intelligence réelle — des solutions d'IA qui accélèrent la prise de décision et génèrent des résultats plus intelligents pour vos métiers.",
    points: ['GenAI & LLM', 'Vision & NLP', 'MLOps', 'IA responsable'],
  },
  {
    icon: Globe2,
    title: 'Cloud Consulting',
    short: "Architecture, migration et optimisation cloud sur Microsoft Azure et AWS, avec une sécurité intégrée par conception à chaque étape.",
    points: ['Architecture cloud', 'Migration cloud', 'Microsoft Azure', 'AWS'],
  },
  {
    icon: Database,
    title: 'Data & Analytics',
    short: "Ingénierie data, machine learning et analytics qui transforment l'information en décisions — des décisions plus rapides, des résultats plus intelligents.",
    points: ['Data engineering', 'Machine learning', 'Analytics & BI', 'Data governance'],
  },
  {
    icon: Rocket,
    title: 'Automation',
    short: "Simplification et automatisation de vos processus métier pour gagner en efficacité et en agilité opérationnelle, à chaque niveau de l'organisation.",
    points: ['Automatisation des processus', 'RPA', 'Workflows intelligents', 'Optimisation continue'],
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity & Compliance',
    short: "Sécurité intégrée par conception — conformité réglementaire et protection proactive de vos actifs numériques, sur le cloud comme sur l'edge.",
    points: ['Audit de sécurité', 'Conformité', 'Sécurité cloud', 'Protection des données'],
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('[data-anim]').forEach((node, i) => {
            const n = node as HTMLElement;
            n.style.transitionDelay = `${(i % 3) * 120}ms`;
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
    <section id="services" ref={ref} className="py-24 lg:py-32 bg-neutral-50 relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
            Nos expertises
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 section-underline-center">
            Six expertises pour couvrir tout votre cycle de transformation
          </h2>
          <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
            De la stratégie à la mise en œuvre, nous proposons une offre intégrée qui couvre l'ensemble
            des besoins de votre transformation digitale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <article
              key={i}
              data-anim
              className="opacity-0 translate-y-6 transition-all duration-700 group relative bg-white rounded-2xl p-7 border border-neutral-200 card-hover overflow-hidden"
            >
              {/* Hover gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon */}
              <div className="relative w-14 h-14 mb-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl opacity-90 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <s.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                </div>
              </div>

              <h3 className="font-bold text-lg text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-5">{s.short}</p>

              <ul className="space-y-2 mb-6">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-xs text-neutral-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    {pt}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 group/link"
              >
                En savoir plus
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
