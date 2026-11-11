import { supabaseConfig } from '@/lib/supabase';

export const LEAD_STATUSES = ['new', 'contacted', 'closed'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
};

export function isLead(value: unknown): value is Lead {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'string' &&
    typeof row.name === 'string' &&
    typeof row.email === 'string' &&
    (row.phone === null || typeof row.phone === 'string') &&
    typeof row.message === 'string' &&
    typeof row.status === 'string' &&
    (LEAD_STATUSES as readonly string[]).includes(row.status) &&
    typeof row.created_at === 'string'
  );
}

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

export type LeadFormErrors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>;

export const LEAD_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  message: 3000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{6,30}$/;

export function validateLeadInput(input: LeadInput): LeadFormErrors {
  const errors: LeadFormErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (!name) errors.name = 'Veuillez renseigner votre nom.';
  else if (name.length > LEAD_LIMITS.name) errors.name = `Maximum ${LEAD_LIMITS.name} caractères.`;

  if (!email) errors.email = 'Veuillez renseigner votre email.';
  else if (email.length > LEAD_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Adresse email invalide.';
  }

  if (phone && (phone.length > LEAD_LIMITS.phone || !PHONE_PATTERN.test(phone))) {
    errors.phone = 'Numéro de téléphone invalide.';
  }

  if (!message) errors.message = 'Veuillez décrire votre besoin.';
  else if (message.length > LEAD_LIMITS.message) {
    errors.message = `Maximum ${LEAD_LIMITS.message} caractères.`;
  }

  return errors;
}

export async function submitLead(input: LeadInput): Promise<void> {
  const response = await fetch(`${supabaseConfig.url}/functions/v1/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
      apikey: supabaseConfig.anonKey,
    },
    body: JSON.stringify({
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      message: input.message.trim(),
      website: input.website,
    }),
  });

  const body: unknown = await response.json().catch(() => null);
  const isSuccessBody =
    typeof body === 'object' && body !== null && (body as { success?: unknown }).success === true;

  if (!response.ok || !isSuccessBody) {
    const serverError =
      typeof body === 'object' && body !== null && typeof (body as { error?: unknown }).error === 'string'
        ? (body as { error: string }).error
        : null;
    throw new Error(serverError ?? 'Impossible d\'envoyer votre demande. Veuillez réessayer.');
  }
}
