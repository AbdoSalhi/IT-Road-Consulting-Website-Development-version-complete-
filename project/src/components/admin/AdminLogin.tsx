import { useState } from 'react';
import { ArrowLeft, LoaderCircle, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm bg-white';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (signInError) {
      setError('Connexion impossible. Vérifiez votre email et votre mot de passe.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Espace administration</h1>
          <p className="text-sm text-neutral-600 mb-8">Connectez-vous pour consulter les demandes de contact.</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-neutral-700 mb-2">
                Mot de passe
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-error-500 font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>

        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au site
        </a>
      </div>
    </div>
  );
}
