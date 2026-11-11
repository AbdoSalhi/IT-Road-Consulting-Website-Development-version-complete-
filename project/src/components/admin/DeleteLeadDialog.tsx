import { useEffect, useId } from 'react';
import { LoaderCircle, TriangleAlert } from 'lucide-react';
import type { Lead } from '@/lib/leads';

type DeleteLeadDialogProps = {
  lead: Lead | null;
  busy: boolean;
  onCancel: () => void;
  onConfirm: (lead: Lead) => void;
};

export default function DeleteLeadDialog({ lead, busy, onCancel, onConfirm }: DeleteLeadDialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!lead) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lead, busy, onCancel]);

  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 px-6 animate-fade-in-up">
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
        <div className="w-11 h-11 rounded-xl bg-error-500/10 text-error-500 flex items-center justify-center mb-5">
          <TriangleAlert className="w-5 h-5" />
        </div>
        <h2 id={titleId} className="text-lg font-bold text-neutral-900 mb-2">
          Supprimer cette demande ?
        </h2>
        <p className="text-sm text-neutral-600 mb-7">
          La demande de <span className="font-semibold text-neutral-800">{lead.name}</span> sera supprimée
          définitivement. Cette action est irréversible.
        </p>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-700 border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-60"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={() => onConfirm(lead)}
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-error-500 hover:brightness-95 transition-all disabled:opacity-70"
          >
            {busy && <LoaderCircle className="w-4 h-4 animate-spin" />}
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
