import urllib.request
import json
import os

token = os.environ.get('SUPABASE_ACCESS_TOKEN', '')
ref = 'cqjaqbujrhgqcqygbyow'
url = f'https://api.supabase.com/v1/projects/{ref}/database/query'

sql = """
CREATE TABLE IF NOT EXISTS practice_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  retainer_program TEXT NOT NULL DEFAULT 'Signature Advisory Retainer',
  monthly_fee NUMERIC NOT NULL DEFAULT 2400,
  status TEXT NOT NULL DEFAULT 'active',
  start_date DATE DEFAULT CURRENT_DATE,
  primary_focus TEXT,
  delivery_mode TEXT DEFAULT 'virtual',
  clinical_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE practice_clients ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow full access to practice_clients" ON practice_clients;
CREATE POLICY "Allow full access to practice_clients" ON practice_clients FOR ALL USING (true);
"""

req = urllib.request.Request(
    url,
    data=json.dumps({'query': sql}).encode('utf-8'),
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
)

res = urllib.request.urlopen(req)
print('practice_clients table creation status:', res.getcode())
