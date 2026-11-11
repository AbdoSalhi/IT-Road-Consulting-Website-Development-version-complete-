/*
# Restrict leads table privileges to the minimum needed

1. Modified Tables
- `leads`: removes default privileges that Supabase granted to the public roles.

2. Security
- anon: INSERT only (public contact form).
- authenticated: SELECT, UPDATE, DELETE only (admin dashboard).
- Row level security policies remain the row-level gate.

3. Notes
- No data is changed by this migration.
*/

REVOKE ALL ON leads FROM anon, authenticated;
GRANT INSERT ON leads TO anon;
GRANT SELECT, UPDATE, DELETE ON leads TO authenticated;
