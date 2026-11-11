/*
# Create leads table for contact form submissions

1. New Tables
- `leads`
  - `id` (uuid, primary key, generated automatically)
  - `name` (text, required)
  - `email` (text, required)
  - `phone` (text, optional)
  - `message` (text, required)
  - `status` (text, defaults to 'new', one of: new / contacted / closed)
  - `created_at` (timestamptz, defaults to now())

2. Security
- Row level security enabled on `leads`.
- Public visitors (anon) can only INSERT a lead, with status 'new' and bounded field lengths.
- Signed-in users (admin) can SELECT, UPDATE and DELETE leads.
- Grants limited to the verbs and roles above; service_role granted INSERT for the server endpoint.

3. Notes
- Status values are enforced by a check constraint.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT leads_status_check CHECK (status IN ('new', 'contacted', 'closed'))
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON leads TO anon;
GRANT SELECT, UPDATE, DELETE ON leads TO authenticated;
GRANT INSERT, SELECT ON leads TO service_role;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT
  TO anon
  WITH CHECK (
    status = 'new'
    AND char_length(name) BETWEEN 1 AND 100
    AND char_length(email) BETWEEN 3 AND 254
    AND char_length(message) BETWEEN 1 AND 3000
    AND (phone IS NULL OR char_length(phone) <= 30)
  );

DROP POLICY IF EXISTS "authenticated_select_leads" ON leads;
CREATE POLICY "authenticated_select_leads" ON leads FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "authenticated_update_leads" ON leads;
CREATE POLICY "authenticated_update_leads" ON leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (status IN ('new', 'contacted', 'closed'));

DROP POLICY IF EXISTS "authenticated_delete_leads" ON leads;
CREATE POLICY "authenticated_delete_leads" ON leads FOR DELETE
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "service_insert_leads" ON leads;
CREATE POLICY "service_insert_leads" ON leads FOR INSERT
  TO service_role
  WITH CHECK (true);
