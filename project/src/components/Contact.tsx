import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, Send, Building2, Clock, LoaderCircle, CircleCheck, CircleAlert } from 'lucide-react';
import { LEAD_LIMITS, submitLead, validateLeadInput, type LeadFormErrors, type LeadInput } from '@/lib/leads';

const SERVICES = [
  'Transformation Digitale',
  'Artificial Intelligence',
  'Cloud Consulting',
  'Data & Analytics',
  'Automation',
  'Cybersecurity & Compliance',
  'Autre demande',
];

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm';

const EMPTY_FORM: LeadInput & { company: string; service: string } = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  website: '',
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateField = (field: keyof typeof EMPTY_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status !== 'loading') setStatus('idle');
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;

    const leadErrors = validateLeadInput(form);
    setErrors(leadErrors);
    if (Object.keys(leadErrors).length > 0) return;

    const messageLines = [
      form.company.trim() && `Entreprise : ${form.company.trim()}`,
      form.service && `Service demandé : ${form.service}`,
      form.message.trim(),
    ].filter(Boolean);

    setStatus('loading');
    setErrorMessage('');
    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: messageLines.join('\n'),
        website: form.website,
      });
      setForm(EMPTY_FORM);
      setErrors({});
      setStatus('success');
    } catch (err) {
      setErrorMessage(
        err instanceof Error && err.message !== 'Failed to fetch'
          ? err.message
          : 'Connexion impossible. Vérifiez votre réseau et réessayez.'
      );
      setStatus('error');
    }
  };

  const isLoading = status === 'loading';

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
            Contact
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 section-underline-center">
            Démarrons votre projet ensemble
          </h2>
          <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
            Notre équipe vous répond sous 48h. Parlons de vos enjeux et de la façon dont nous pouvons
            vous accompagner.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div data-anim className="opacity-0 translate-y-6 transition-all duration-700 lg:col-span-2 space-y-5">
            <div className="bg-gradient-to-br from-primary-600 to-secondary-700 rounded-2xl p-8 text-white">
              <h3 className="font-bold text-lg mb-6">IT-ROAD Consulting</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Adresse</div>
                    <div className="text-sm font-medium">Building Optima Business Center</div>
                    <div className="text-sm font-medium">Sidi Maarouf, Casablanca</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Téléphone</div>
                    <a href="tel:+212702074046" className="text-sm font-medium hover:text-primary-200 transition-colors">
                      +212 (0) 7 02 07 40 46
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Email</div>
                    <a href="mailto:contact@itroad.ma" className="text-sm font-medium hover:text-primary-200 transition-colors">
                      contact@itroad.ma
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Horaires</div>
                    <div className="text-sm font-medium">Lun – Ven : 9h00 – 18h00</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map embed */}
            <div className="rounded-2xl overflow-hidden h-48 border border-neutral-200 bg-white relative">
              <iframe
                title="IT-ROAD Consulting — Casablanca"
                src="https://www.google.com/maps?q=Optima+Business+Center+Sidi+Maarouf+Casablanca&output=embed"
                className="w-full h-full"
                style={{ border: 0, minHeight: '100%' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div data-anim className="opacity-0 translate-y-6 transition-all duration-700 lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm space-y-5"
            >
              {/* Honeypot: hidden from people, filled in only by bots */}
              <div aria-hidden="true" className="hidden">
                <label>
                  Site web
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => updateField('website', e.target.value)}
                  />
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    name="name"
                    maxLength={LEAD_LIMITS.name}
                    placeholder="Votre nom"
                    value={form.name}
                    disabled={isLoading}
                    aria-invalid={Boolean(errors.name)}
                    onChange={(e) => updateField('name', e.target.value)}
                    className={INPUT_CLASS}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-error-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="lead-company" className="block text-sm font-medium text-neutral-700 mb-2">
                    Entreprise
                  </label>
                  <input
                    id="lead-company"
                    type="text"
                    name="company"
                    maxLength={100}
                    placeholder="Votre entreprise"
                    value={form.company}
                    disabled={isLoading}
                    onChange={(e) => updateField('company', e.target.value)}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    name="email"
                    maxLength={LEAD_LIMITS.email}
                    placeholder="vous@entreprise.com"
                    value={form.email}
                    disabled={isLoading}
                    aria-invalid={Boolean(errors.email)}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={INPUT_CLASS}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-error-500">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="lead-phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    name="phone"
                    maxLength={LEAD_LIMITS.phone}
                    placeholder="+212 ..."
                    value={form.phone}
                    disabled={isLoading}
                    aria-invalid={Boolean(errors.phone)}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={INPUT_CLASS}
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-error-500">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="lead-service" className="block text-sm font-medium text-neutral-700 mb-2">
                  Votre projet
                </label>
                <select
                  id="lead-service"
                  name="service"
                  value={form.service}
                  disabled={isLoading}
                  onChange={(e) => updateField('service', e.target.value)}
                  className={`${INPUT_CLASS} bg-white`}
                >
                  <option value="" disabled>Sélectionnez un service</option>
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="lead-message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={4}
                  maxLength={LEAD_LIMITS.message}
                  placeholder="Décrivez votre besoin..."
                  value={form.message}
                  disabled={isLoading}
                  aria-invalid={Boolean(errors.message)}
                  onChange={(e) => updateField('message', e.target.value)}
                  className={`${INPUT_CLASS} resize-none`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-error-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-primary-500/40 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer ma demande
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <p role="status" className="flex items-center justify-center gap-2 text-sm text-primary-700 font-medium">
                  <CircleCheck className="w-4 h-4" />
                  Merci ! Notre équipe vous recontactera sous 48h.
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="flex items-center justify-center gap-2 text-sm text-error-500 font-medium">
                  <CircleAlert className="w-4 h-4" />
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
