/*
# Remove redundant service_role policy on leads

1. Modified Tables
- `leads`: drops the `service_insert_leads` policy.

2. Notes
- The service_role key bypasses row level security, so this policy had no effect.
- The INSERT grant to service_role is kept so the server endpoint can write leads.
*/

DROP POLICY IF EXISTS "service_insert_leads" ON leads;
REVOKE SELECT ON leads FROM service_role;
