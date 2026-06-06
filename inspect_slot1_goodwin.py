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

    print("=== goodwin Slot 1 ===")
    d1_key = "DATA1_1"
    if d1_key in data:
        d1 = base64.b64decode(data[d1_key]).decode('utf-8', errors='ignore').strip().split(',')
        print("d1 length:", len(d1))
        print("d1[0] (valid/active):", d1[0])
        print("d1[1] (level/name):", d1[1])
        print("d1[2] (char_id):", d1[2])
        print("d1[3] (exp/cp):", d1[3])
        print("d1[16] (progress):", d1[16])
        print("d1[17] (playtime/level):", d1[17])
