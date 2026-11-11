import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Méthodologie', href: '#methodology' },
  { label: 'Secteurs', href: '#industries' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-neutral-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-18 py-3">
        {/* Logo + Group branding */}
        <div className="flex items-center gap-3">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center shadow-md group-hover:shadow-primary-500/40 transition-shadow duration-300">
              <Globe className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-bold text-base tracking-tight transition-colors duration-300 ${scrolled ? 'text-neutral-900' : 'text-white'}`}>
                IT-ROAD
              </span>
              <span className={`text-xs font-medium tracking-wide transition-colors duration-300 ${scrolled ? 'text-primary-600' : 'text-primary-300'}`}>
                Consulting Maroc
              </span>
            </div>
          </a>

          {/* Separator + BY IT ROAD GROUP */}
          <div className={`hidden sm:block w-px h-9 ${scrolled ? 'bg-neutral-200' : 'bg-white/20'}`} />
          <a
            href="https://itroadgroup.com/en/home-en/"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:flex flex-col leading-none pl-1 transition-colors duration-300 ${scrolled ? 'text-neutral-400 hover:text-neutral-700' : 'text-white/40 hover:text-white/80'}`}
          >
            <span className="text-[10px] font-medium tracking-wider uppercase">by</span>
            <span className="text-[11px] font-semibold tracking-wide">IT Road Group</span>
          </a>
        </div>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary-500/10 hover:text-primary-600 ${
                  scrolled ? 'text-neutral-700' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-primary-500/40 hover:scale-[1.02]"
          >
            Démarrer un projet
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/10'}`}
          aria-label="Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="bg-white border-t border-neutral-100 px-6 py-4 space-y-1 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Démarrer un projet
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
