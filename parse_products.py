import os, zipfile, xml.etree.ElementTree as ET, json

os.makedirs('src/data', exist_ok=True)
with zipfile.ZipFile('Amazon_Affiliate_Product_Grid_6.docx', 'r') as z:
    xml_content = z.read('word/document.xml')
    tree = ET.fromstring(xml_content)
    tables = tree.findall('.//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tbl')
    
    lines = [
        {'id': 'books', 'title': 'Essential Books', 'category': 'Neuroplasticity & Literature', 'desc': 'Personally read, vetted, and applied by Vera in her clinical practice and personal health recovery.', 'table_idx': 1},
        {'id': 'supplements', 'title': 'Supplements & Herbs', 'category': 'Metabolic Cellular Health', 'desc': 'Active botanicals and cellular nutrients used by Vera for nearly thirty years to sustain clean energy.', 'table_idx': 3},
        {'id': 'nutrition', 'title': 'Clean Nutrition & Fuel', 'category': 'Anti-Inflammatory Food', 'desc': 'Whole organic proteins, mushrooms, greens, and mineral hydration that form the basis of the cellular protocol.', 'table_idx': 5},
        {'id': 'fitness', 'title': 'Fitness & Neuromuscular', 'category': 'Movement & Balance Tools', 'desc': 'Specialized bands, weights, balance platforms, and red light recovery tested for daily capability.', 'table_idx': 7},
        {'id': 'adjuncts', 'title': 'Recovery & Gadgets', 'category': 'Clinical Recovery & Safety', 'desc': 'Targeted TENS electro-stimulation, skin hygiene, and waterproof fall detection gear.', 'table_idx': 9},
        {'id': 'lifestyle', 'title': 'Everyday Vitality & Apparel', 'category': 'Skin Health & Travel Gear', 'desc': 'Clean dermatological skincare and versatile travel wear tested in Vera’s active lifestyle.', 'table_idx': 11},
    ]

    result = []
    for l in lines:
        tbl = tables[l['table_idx']]
        rows = tbl.findall('.//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tr')
        products = []
        for r in rows:
            cells = r.findall('.//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc')
            texts = [''.join([t.text for t in c.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]).strip() for c in cells]
            if len(texts) >= 4:
                num, name, link, reason = texts[0], texts[1], texts[2], texts[3]
                if name and 'PRODUCT' not in name.upper() and ('http' in link or 'amzn' in link):
                    links = [w for w in link.split() if 'http' in w]
                    clean_link = links[0] if links else link
                    products.append({
                        'name': name.strip().title(),
                        'link': clean_link.strip(),
                        'reason': reason.strip()
                    })
            elif len(texts) == 3:
                num, name, link = texts[0], texts[1], texts[2]
                if 'http' in link:
                    links = [w for w in link.split() if 'http' in w]
                    clean_link = links[0] if links else link
                    products.append({
                        'name': name.strip().title(),
                        'link': clean_link.strip(),
                        'reason': ''
                    })
        l['products'] = products
        result.append(l)

    with open('src/data/products_raw.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    for res in result:
        print(f"{res['title']}: {len(res['products'])} items")
