import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Mail, Phone, Search, Trash2 } from 'lucide-react';
import { LEAD_STATUSES, type Lead, type LeadStatus } from '@/lib/leads';

const PAGE_SIZE = 10;

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'Nouveau',
  contacted: 'Contacté',
  closed: 'Clôturé',
};

const STATUS_BADGE_CLASSES: Record<LeadStatus, string> = {
  new: 'bg-secondary-50 text-secondary-700 ring-secondary-200',
  contacted: 'bg-accent-100 text-neutral-800 ring-accent-400/40',
  closed: 'bg-neutral-100 text-neutral-700 ring-neutral-200',
};

const FILTERS: { value: LeadStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  ...LEAD_STATUSES.map((status) => ({ value: status, label: STATUS_LABELS[status] })),
];

type LeadsTableProps = {
  leads: Lead[];
  busyId: string | null;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onRequestDelete: (lead: Lead) => void;
};

export default function LeadsTable({ leads, busyId, onStatusChange, onRequestDelete }: LeadsTableProps) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [page, setPage] = useState(1);

  const filteredLeads = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
      if (!needle) return true;
      return [lead.name, lead.email, lead.phone ?? '', lead.message].some((field) =>
        field.toLowerCase().includes(needle)
      );
    });
  }, [leads, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleLeads = filteredLeads.slice(pageStart, pageStart + PAGE_SIZE);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handleFilterChange = (value: LeadStatus | 'all') => {
    setStatusFilter(value);
    setPage(1);
  };

  return (
    <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 border-b border-neutral-200">
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Rechercher un nom, email, message..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <div role="group" aria-label="Filtrer par statut" className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const active = statusFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={active}
                onClick={() => handleFilterChange(filter.value)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="py-20 text-center text-sm text-neutral-600">
          {leads.length === 0
            ? 'Aucune demande pour le moment.'
            : 'Aucun résultat pour ces filtres.'}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-sm">
              <thead className="bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-5 py-3">Nom</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Téléphone</th>
                  <th className="px-5 py-3">Message</th>
                  <th className="px-5 py-3">Statut</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {visibleLeads.map((lead) => {
                  const busy = busyId === lead.id;
                  return (
                    <tr key={lead.id} className="align-top transition-colors hover:bg-neutral-50/70">
                      <td className="px-5 py-4 font-medium text-neutral-900 whitespace-nowrap">{lead.name}</td>
                      <td className="px-5 py-4">
                        <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-primary-700">
                          <Mail className="w-3.5 h-3.5" />
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-neutral-700 whitespace-nowrap">
                        {lead.phone ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5" />
                            {lead.phone}
                          </span>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        <p className="line-clamp-3 text-neutral-600 whitespace-pre-line" title={lead.message}>
                          {lead.message}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-2 items-start">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${STATUS_BADGE_CLASSES[lead.status]}`}>
                            {STATUS_LABELS[lead.status]}
                          </span>
                          <select
                            aria-label={`Statut de ${lead.name}`}
                            value={lead.status}
                            disabled={busy}
                            onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                            className="text-xs rounded-lg border border-neutral-200 bg-white px-2 py-1.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:opacity-60"
                          >
                            {LEAD_STATUSES.map((status) => (
                              <option key={status} value={status}>{STATUS_LABELS[status]}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-neutral-600 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => onRequestDelete(lead)}
                          disabled={busy}
                          aria-label={`Supprimer la demande de ${lead.name}`}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-neutral-500 hover:text-error-500 hover:bg-error-500/10 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-neutral-200 text-sm text-neutral-600">
            <span>
              {pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, filteredLeads.length)} sur {filteredLeads.length}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Page précédente"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 hover:border-primary-300 hover:text-primary-700 transition-colors disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-current"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-medium text-neutral-700">
                Page {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Page suivante"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 hover:border-primary-300 hover:text-primary-700 transition-colors disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-current"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
