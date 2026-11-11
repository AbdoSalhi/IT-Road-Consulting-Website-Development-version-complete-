import { useEffect, useRef } from 'react';
import { CheckCircle2, TrendingUp, Shield, Users } from 'lucide-react';

const pillars = [
  {
    icon: TrendingUp,
    title: 'Expertise & agilité',
    desc: "Une équipe technologique bâtie sur l'expertise, l'agilité et une réelle passion pour la transformation des entreprises.",
  },
  {
    icon: Shield,
    title: 'Sécurité intégrée',
    desc: "La sécurité est intégrée par conception dans chaque solution, pour protéger vos systèmes et vos données.",
  },
  {
    icon: Users,
    title: 'Proximité & réactivité',
    desc: "Basés à Casablanca, nous accompagnons les organisations au Maroc et en Afrique avec une collaboration fluide et réactive.",
  },
];

export default function About() {
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
            n.classList.add('!opacity-100', '!translate-y-0', '!translate-x-0');
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div
              data-anim
              className="opacity-0 translate-x-[-24px] transition-all duration-700"
            >
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
                Qui sommes-nous
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight mb-6 section-underline">
                IT-ROAD Consulting,<br />
                <span className="text-primary-600">votre partenaire de transformation digitale</span>
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                IT-ROAD Consulting est un cabinet de conseil en transformation digitale, filiale
                du groupe ITRoad, spécialisé dans l'IA, le cloud et la data. Basés à Casablanca, nous
                accompagnons les organisations au Maroc et en Afrique dans leur modernisation
                technologique.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Notre équipe d'experts couvre tout le spectre de la transformation digitale : de la
                stratégie à la mise en production, en passant par la data, l'IA, l'automatisation et
                la cybersécurité.
              </p>
              <ul className="space-y-3">
                {[
                  'Cabinet de conseil basé à Casablanca, Maroc',
                  'Expertise multi-sectorielle (Finance, Santé, Public)',
                  'Filiale du groupe ITRoad',
                  'Partenaire cloud Microsoft & AWS',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {pillars.map((p, i) => (
              <div
                key={i}
                data-anim
                className="opacity-0 translate-x-[24px] transition-all duration-700 flex gap-5 p-6 bg-neutral-50 rounded-2xl hover:bg-primary-50 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 flex-shrink-0 bg-primary-100 group-hover:bg-primary-500 rounded-xl flex items-center justify-center transition-colors duration-300">
                  <p.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-1">{p.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}

            {/* Image */}
            <div
              data-anim
              className="opacity-0 translate-x-[24px] transition-all duration-700 relative rounded-2xl overflow-hidden h-52"
            >
              <img
                src="https://images.pexels.com/photos/7693705/pexels-photo-7693705.jpeg?auto=compress&cs=tinysrgb&h=400&w=700"
                alt="Équipe IT-ROAD Consulting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-white font-semibold text-sm">Équipe IT-ROAD Consulting</p>
                <p className="text-white/70 text-xs">Casablanca, Maroc</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
