import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 120, suffix: '+', label: 'Collaborateurs' },
  { value: 150, suffix: '+', label: 'Clients satisfaits' },
  { value: 400, suffix: '+', label: 'Projets réalisés' },
  { value: 4000, suffix: '', label: 'Jours prod. / mois', format: true },
  { value: 10, suffix: '+', label: "Ans d'expertise" },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  format,
  start,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  format?: boolean;
  start: boolean;
  delay: number;
}) {
  const count = useCountUp(value, 1800, start);
  const display = format ? count.toLocaleString('fr-FR') : count;

  return (
    <div
      data-anim
      className="opacity-0 translate-y-6 transition-all duration-700 flex flex-col items-center text-center"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
        {display}
        {suffix}
      </span>
      <span className="text-sm text-neutral-500 mt-2 font-medium">{label}</span>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          el.querySelectorAll('[data-anim]').forEach((node) => {
            node.classList.add('!opacity-100', '!translate-y-0');
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
            En chiffres
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 section-underline-center">
            IT-ROAD Consulting en chiffres
          </h2>
          <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
            Une expertise reconnue, au service de votre transformation digitale au Maroc et en Afrique.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              format={stat.format}
              start={started}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
