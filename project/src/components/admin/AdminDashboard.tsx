import { useCallback, useEffect, useState } from 'react';
import { Archive, Building2, CircleAlert, ExternalLink, Inbox, LoaderCircle, LogOut, RefreshCw, UserCheck, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { isLead, type Lead, type LeadStatus } from '@/lib/leads';
import LeadsTable from '@/components/admin/LeadsTable';
import DeleteLeadDialog from '@/components/admin/DeleteLeadDialog';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [actionError, setActionError] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    const { data, error } = await supabase
      .from('leads')
      .select('id, name, email, phone, message, status, created_at')
      .order('created_at', { ascending: false });

    if (error || !Array.isArray(data) || !data.every(isLead)) {
      setLoadError(true);
    } else {
      setLeads(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    setBusyId(id);
    setActionError('');
    const { data, error } = await supabase.from('leads').update({ status }).eq('id', id).select('id');
    setBusyId(null);

    if (error || !data || data.length === 0) {
      setActionError('La mise à jour du statut a échoué. Veuillez réessayer.');
      return;
    }
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
  };

  const handleDelete = async (lead: Lead) => {
    setBusyId(lead.id);
    setActionError('');
    const { data, error } = await supabase.from('leads').delete().eq('id', lead.id).select('id');
    setBusyId(null);
    setLeadToDelete(null);

    if (error || !data || data.length === 0) {
      setActionError('La suppression a échoué. Veuillez réessayer.');
      return;
    }
    setLeads((prev) => prev.filter((item) => item.id !== lead.id));
  };

  const handleSignOut = () => {
    void supabase.auth.signOut();
  };

  const counts = {
    total: leads.length,
    new: leads.filter((lead) => lead.status === 'new').length,
    contacted: leads.filter((lead) => lead.status === 'contacted').length,
    closed: leads.filter((lead) => lead.status === 'closed').length,
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-500 text-white flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-neutral-900 leading-tight">IT-ROAD Consulting</div>
              <div className="text-xs text-neutral-500 leading-tight">Administration</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Voir le site
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-error-500 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">Demandes de contact</h1>
            <p className="text-sm text-neutral-600 mt-2">Toutes les demandes reçues depuis le formulaire du site.</p>
          </div>
          <button
            type="button"
            onClick={() => void loadLeads()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 hover:border-primary-300 hover:text-primary-700 rounded-xl transition-colors disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total" value={counts.total} icon={Users} tone="neutral" />
          <StatCard label="Nouveaux" value={counts.new} icon={Inbox} tone="secondary" />
          <StatCard label="Contactés" value={counts.contacted} icon={UserCheck} tone="accent" />
          <StatCard label="Clôturés" value={counts.closed} icon={Archive} tone="primary" />
        </div>

        {actionError && (
          <div role="alert" className="mb-6 flex items-center gap-3 rounded-xl border border-error-500/30 bg-white px-4 py-3 text-sm text-error-500">
            <CircleAlert className="w-4 h-4 flex-shrink-0" />
            {actionError}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-24 text-neutral-600 bg-white rounded-2xl border border-neutral-200">
            <LoaderCircle className="w-5 h-5 animate-spin text-primary-600" />
            Chargement des demandes...
          </div>
        ) : loadError ? (
          <div role="alert" className="flex flex-col items-center gap-4 py-20 text-center bg-white rounded-2xl border border-neutral-200">
            <CircleAlert className="w-8 h-8 text-error-500" />
            <p className="text-sm text-neutral-700 font-medium">Impossible de charger les demandes.</p>
            <button
              type="button"
              onClick={() => void loadLeads()}
              className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <LeadsTable
            leads={leads}
            busyId={busyId}
            onStatusChange={(id, status) => void handleStatusChange(id, status)}
            onRequestDelete={setLeadToDelete}
          />
        )}
      </main>

      <DeleteLeadDialog
        lead={leadToDelete}
        busy={leadToDelete !== null && busyId === leadToDelete.id}
        onCancel={() => setLeadToDelete(null)}
        onConfirm={(lead) => void handleDelete(lead)}
      />
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  icon: typeof Users;
  tone: 'neutral' | 'secondary' | 'accent' | 'primary';
};

const TONE_CLASSES: Record<StatCardProps['tone'], string> = {
  neutral: 'bg-neutral-100 text-neutral-700',
  secondary: 'bg-secondary-50 text-secondary-700',
  accent: 'bg-accent-100 text-neutral-800',
  primary: 'bg-primary-50 text-primary-700',
};

function StatCard({ label, value, icon: Icon, tone }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-neutral-600">{label}</span>
        <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${TONE_CLASSES[tone]}`}>
          <Icon className="w-4 h-4" />
        </span>
      </div>
      <div className="text-3xl font-bold text-neutral-900">{value}</div>
    </div>
  );
}
