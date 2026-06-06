import requests
from bs4 import BeautifulSoup
import re
import base64

url = "https://m16tool.xyz/Game/DRR/UserLog/LogResult?nicName=goodwin"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

r = requests.get(url, headers=headers)
if r.status_code == 200:
    soup = BeautifulSoup(r.text, 'html.parser')
    tbody = soup.find('tbody')
    rows = tbody.find_all('tr')
    
    print(f"Total rows found: {len(rows)}")
    for row_idx, row in enumerate(rows):
        cols = row.find_all('td')
        data_html = "".join([str(c) for c in cols[1].contents])
        text = re.sub(r"<br\s*/?>", "\n", data_html).strip()
        date_str = cols[-1].text.strip()
        
        pairs = re.findall(r'"([^"]+)"\s*:\s*(?:"([^"]*)"|([0-9\.\-]+))', text)
        data = {}
        for p in pairs:
            key = p[0]
            val = p[1] if p[1] else p[2]
            if p[2]:
                try:
                    if "." in val: val = float(val)
                    else: val = int(val)
                except: pass
            data[key] = val
            
        print(f"\nRow {row_idx} ({date_str}):")
        # Check if 3230 or 4429 are in keys/values
        for k, v in data.items():
            if v == 3230 or v == 4429:
                print(f"  Root Key Match: {k} = {v}")
            if isinstance(v, str) and len(v) > 20:
                try:
                    d = base64.b64decode(v).decode('utf-8', errors='ignore').strip().split(',')
                    if "3230" in d:
                        print(f"  Array Match (3230) in {k} at index {d.index('3230')}")
                    if "4429" in d:
                        print(f"  Array Match (4429) in {k} at index {d.index('4429')}")
                except:
                    pass
else:
    print("Failed to fetch")
