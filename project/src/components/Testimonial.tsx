import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

export default function Testimonial() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('[data-anim]').forEach((node) => {
            (node as HTMLElement).classList.add('!opacity-100', '!translate-y-0');
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
    <section ref={ref} className="py-24 lg:py-32 bg-neutral-900 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 15% 30%, #27a05a33 0%, transparent 45%), radial-gradient(circle at 85% 70%, #1d4ed833 0%, transparent 45%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div data-anim className="opacity-0 translate-y-6 transition-all duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-8 mx-auto">
            <Quote className="w-8 h-8 text-white" />
          </div>

          <blockquote className="text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-10">
            « Nous sommes IT-ROAD Consulting — façonnons l'avenir, une solution à la fois. Un
            partenaire technologique fondé sur l'expertise, l'agilité et une véritable passion pour
            la transformation des entreprises. »
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-lg">
              IR
            </div>
            <div className="text-left">
              <div className="font-semibold text-white">IT-ROAD Consulting</div>
              <div className="text-sm text-primary-400">Casablanca, Maroc</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
