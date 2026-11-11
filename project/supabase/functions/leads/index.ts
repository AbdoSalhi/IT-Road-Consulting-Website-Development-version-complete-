import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const LIMITS = {
  nameMax: 100,
  emailMax: 254,
  phoneMax: 30,
  messageMax: 3000,
  bodyMax: 20000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{6,30}$/;

type LeadInput = {
  name: string;
  email: string;
  phone: string | null;
  message: string;
};

type ValidationResult =
  | { ok: true; lead: LeadInput; isSpam: boolean }
  | { ok: false; error: string };

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validateLead(payload: unknown): ValidationResult {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return { ok: false, error: "Requête invalide." };
  }
  const data = payload as Record<string, unknown>;

  const isSpam = readString(data.website).length > 0;

  const name = readString(data.name);
  const email = readString(data.email);
  const phone = readString(data.phone);
  const message = readString(data.message);

  if (!name) return { ok: false, error: "Le nom est obligatoire." };
  if (name.length > LIMITS.nameMax) {
    return { ok: false, error: `Le nom ne doit pas dépasser ${LIMITS.nameMax} caractères.` };
  }
  if (!email) return { ok: false, error: "L'email est obligatoire." };
  if (email.length > LIMITS.emailMax || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "L'adresse email est invalide." };
  }
  if (phone && (phone.length > LIMITS.phoneMax || !PHONE_PATTERN.test(phone))) {
    return { ok: false, error: "Le numéro de téléphone est invalide." };
  }
  if (!message) return { ok: false, error: "Le message est obligatoire." };
  if (message.length > LIMITS.messageMax) {
    return { ok: false, error: `Le message ne doit pas dépasser ${LIMITS.messageMax} caractères.` };
  }

  return {
    ok: true,
    isSpam,
    lead: { name, email, phone: phone || null, message },
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return jsonResponse({ success: false, error: "Méthode non autorisée." }, 405);
    }

    const rawBody = await req.text();
    if (rawBody.length > LIMITS.bodyMax) {
      return jsonResponse({ success: false, error: "Requête trop volumineuse." }, 400);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return jsonResponse({ success: false, error: "Requête invalide." }, 400);
    }

    const result = validateLead(payload);
    if (!result.ok) {
      return jsonResponse({ success: false, error: result.error }, 400);
    }

    if (result.isSpam) {
      return jsonResponse({ success: true }, 201);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Configuration serveur manquante.");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.from("leads").insert({
      ...result.lead,
      status: "new",
    });
    if (error) {
      throw new Error(error.message);
    }

    return jsonResponse({ success: true }, 201);
  } catch (err) {
    console.error("leads endpoint error:", err);
    return jsonResponse(
      { success: false, error: "Une erreur est survenue. Veuillez réessayer." },
      500,
    );
  }
});
