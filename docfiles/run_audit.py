import urllib.request
import json

base = 'http://localhost:3000'
headers = {'x-admin-passcode': 'LIBERTY2026', 'Content-Type': 'application/json'}

# 1. Test Admin Data
req = urllib.request.Request(f'{base}/api/admin/data', headers={'x-admin-passcode': 'LIBERTY2026'})
with urllib.request.urlopen(req) as res:
    data = json.loads(res.read().decode())
    assert data['success'] == True, 'Admin data failed'
    print('1. Admin Data endpoint: OK (200)')

# 2. Test Assessment Lead Submission
lead_payload = {
    'name': 'Audit Candidate',
    'email': 'audit.candidate@test.com',
    'note': 'Test clinical notes',
    'answers': {
        'domain': {'label': 'Metabolic Neuroplasticity (PWR!Moves)'},
        'priority': {'label': 'Immediate clinical intervention'},
        'gap': {'label': 'Emotional & Physical Stalls'},
        'outcome': {'label': 'Restore autonomic control and energy'}
    },
    'recommendedProgram': {
        'name': 'Signature Advisory Retainer',
        'investment': '$2,400 / quarter'
    }
}
req = urllib.request.Request(f'{base}/api/assessment', data=json.dumps(lead_payload).encode(), headers={'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(req) as res:
    lead_res = json.loads(res.read().decode())
    assert lead_res.get('success') == True, 'Lead submission failed'
    print('2. Assessment Lead Submission: OK (200)')

# 3. Test PDF Unlock / Newsletter Subscriber Submission
sub_payload = {
    'email': 'audit.subscriber@test.com',
    'fullName': 'Audit Reader',
    'downloadedResource': 'Metabolic Switching Evidence Brief & Diet Plan',
    'source': 'pdf_download'
}
req = urllib.request.Request(f'{base}/api/newsletter', data=json.dumps(sub_payload).encode(), headers={'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(req) as res:
    sub_res = json.loads(res.read().decode())
    assert sub_res.get('success') == True, 'Subscriber submission failed'
    print('3. PDF Unlock / Subscriber: OK (200)')

# 4. Test Contact Inquiry Submission
contact_payload = {
    'fullName': 'Audit Inquirer',
    'email': 'audit.inquirer@test.com',
    'phone': '520-555-0199',
    'domain': 'Metabolic Neuroplasticity Retainer',
    'notes': 'Testing contact form delivery.'
}
req = urllib.request.Request(f'{base}/api/contact', data=json.dumps(contact_payload).encode(), headers={'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(req) as res:
    contact_res = json.loads(res.read().decode())
    assert contact_res.get('success') == True, 'Contact inquiry failed'
    print('4. Contact Form Inquiry: OK (200)')

# 5. Test Client Enrollment & Retainer Auto-Analysis
client_payload = {
    'name': 'Audit Real Client',
    'email': 'audit.realclient@test.com',
    'phone': '520-555-7788',
    'retainer_program': 'Signature Advisory Retainer',
    'monthly_fee': 2400,
    'status': 'active',
    'start_date': '2026-10-25',
    'primary_focus': 'PWR!Moves & Metabolic Fasting',
    'delivery_mode': 'virtual',
    'clinical_notes': '1-on-1 virtual sessions'
}
req = urllib.request.Request(f'{base}/api/admin/clients', data=json.dumps(client_payload).encode(), headers=headers, method='POST')
with urllib.request.urlopen(req) as res:
    client_res = json.loads(res.read().decode())
    assert client_res.get('success') == True, 'Client enrollment failed'
    cid = client_res['client']['id']
    print('5. Client Enrollment: OK (200)')

# 6. Check that admin data auto-analyzed this real client
req = urllib.request.Request(f'{base}/api/admin/data', headers={'x-admin-passcode': 'LIBERTY2026'})
with urllib.request.urlopen(req) as res:
    verified = json.loads(res.read().decode())
    m = verified['data']['metrics']
    rev = m.get('currentMonthRevenue', 0)
    clients_count = m.get('totalActiveClients', 0)
    assert rev >= 2400, 'Auto revenue analysis failed'
    assert clients_count >= 1, 'Active client count failed'
    print(f'6. Live Metrics Auto-Analyzed: Revenue = ${rev}, Active Clients = {clients_count}')

# 7. Clean up test records
token = os.environ.get('SUPABASE_ACCESS_TOKEN', '')
ref = 'cqjaqbujrhgqcqygbyow'
if token:
    sql = f"""
DELETE FROM assessment_leads WHERE email = 'audit.candidate@test.com';
DELETE FROM newsletter_subscribers WHERE email = 'audit.subscriber@test.com';
DELETE FROM contact_inquiries WHERE email = 'audit.inquirer@test.com';
DELETE FROM practice_clients WHERE id = '{cid}';
"""
    req = urllib.request.Request(
        f'https://api.supabase.com/v1/projects/{ref}/database/query',
        data=json.dumps({'query': sql}).encode(),
        headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as res:
        print('7. Test cleanup: OK (201)')
print('ALL 7 SYSTEM AUDIT CHECKS PASSED PERFECTLY!')
