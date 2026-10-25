import urllib.request, json, os

token = os.environ.get('SUPABASE_ACCESS_TOKEN', '')
ref = 'cqjaqbujrhgqcqygbyow'
url = f'https://api.supabase.com/v1/projects/{ref}/database/query'

sql = """
CREATE TABLE IF NOT EXISTS practice_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month_year TEXT NOT NULL UNIQUE,
  total_revenue NUMERIC DEFAULT 0,
  active_clients INTEGER DEFAULT 0,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE practice_earnings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow full access to practice_earnings" ON practice_earnings;
CREATE POLICY "Allow full access to practice_earnings" ON practice_earnings FOR ALL USING (true);

INSERT INTO practice_earnings (month_year, total_revenue, active_clients, notes)
VALUES ('October 2026', 4800, 2, '2 active quarterly retainers')
ON CONFLICT (month_year) DO NOTHING;
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
print('Earnings Table Creation Status:', res.getcode())
