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

    print(f"{'Slot':<5} | {'Char Name':<12} | {'d1[17]':<7} | {'d1[17]/3.28':<12} | {'d1[1]':<7} | {'d1[1]/310.4':<12}")
    print("-" * 70)
    for slot_num in range(1, 100):
        d1_key = f"DATA1_{slot_num}"
        if d1_key in data:
            d1 = base64.b64decode(data[d1_key]).decode('utf-8', errors='ignore').strip().split(',')
            if len(d1) > 72:
                char_id = int(d1[2]) if d1[2].isdigit() else -1
                name = d1[1] if len(d1) > 1 else 'None'
                d1_1 = int(d1[1]) if d1[1].isdigit() else 0
                d1_17 = int(d1[17]) if d1[17].isdigit() else 0
                
                # new mapping name
                from_mapping = {
                    20: '인조인간16호',
                    26: '트랭크스(미래)',
                    3: '야무치'
                }.get(slot_num, f"Slot {slot_num}")
                
                f1 = d1_17 / 3.28
                f2 = d1_1 / 310.4 if d1_1 else 0
                print(f"{slot_num:<5} | {from_mapping:<12} | {d1_17:<7} | {f1:<12.2f} | {d1_1:<7} | {f2:<12.2f}")
