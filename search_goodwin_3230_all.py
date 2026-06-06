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
    cols = rows[0].find_all('td')
    data_html = "".join([str(c) for c in cols[1].contents])
    text = re.sub(r"<br\s*/?>", "\n", data_html).strip()
    
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

    target_level = 3230
    target_encoded = int(target_level * 3.28) # 10594
    print(f"Target level: {target_level}, Target encoded (level * 3.28): {target_encoded}")
    
    for k, v in data.items():
        if isinstance(v, str) and (v.endswith("=") or len(v) > 20):
            try:
                decoded = base64.b64decode(v).decode('utf-8', errors='ignore').strip().split(',')
                for idx, item in enumerate(decoded):
                    if item == str(target_level):
                        print(f"Exact match for {target_level} in {k}[{idx}]")
                    if item == str(target_encoded) or item == str(target_encoded + 1) or item == str(target_encoded - 1):
                        print(f"Encoded level match (~{target_encoded}) in {k}[{idx}]: value={item}")
            except Exception as e:
                pass
        else:
            if v == target_level:
                print(f"Exact match for {target_level} in root key: {k} = {v}")
else:
    print("Failed to fetch")
