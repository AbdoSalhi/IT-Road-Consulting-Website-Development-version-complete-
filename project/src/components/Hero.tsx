import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('[data-anim]').forEach((node) => {
            (node as HTMLElement).style.animationPlayState = 'running';
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
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/5257206/pexels-photo-5257206.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
          alt="Consultants IT-ROAD collaborant en bureau moderne"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 hero-overlay" />
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating decorative shapes */}
      <div className="absolute top-1/4 right-12 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl animate-float z-0" />
      <div className="absolute bottom-1/4 left-8 w-56 h-56 rounded-full bg-secondary-500/10 blur-3xl animate-float z-0" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            data-anim
            className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-400/40 bg-primary-500/10 backdrop-blur-sm mb-8"
            style={{ animationPlayState: 'paused' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-primary-300 text-sm font-medium tracking-wide">
Votre partenaire de transformation digitale au Maroc
            </span>
          </div>

          {/* Title */}
          <h1
            data-anim
            className="opacity-0 animate-fade-in-up delay-200 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight mb-6"
            style={{ animationPlayState: 'paused' }}
          >
            Façonnons l'avenir{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              une solution à la fois
            </span>
          </h1>

          {/* Subtitle */}
          <p
            data-anim
            className="opacity-0 animate-fade-in-up delay-300 text-lg text-white/75 leading-relaxed mb-10 max-w-2xl"
            style={{ animationPlayState: 'paused' }}
          >
De la stratégie à la mise en œuvre, IT-ROAD Consulting est votre partenaire de confiance pour
            transformer votre entreprise grâce au cloud, à l'IA et à l'automatisation, au Maroc
            et en Afrique.
          </p>

          {/* CTAs */}
          <div
            data-anim
            className="opacity-0 animate-fade-in-up delay-400 flex flex-wrap gap-4"
            style={{ animationPlayState: 'paused' }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-primary-500 hover:bg-primary-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-[1.02]"
            >
              Démarrer un projet
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-200"
            >
              <Play className="w-4 h-4 fill-white" />
              Découvrir nos services
            </a>
          </div>
        </div>


      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
