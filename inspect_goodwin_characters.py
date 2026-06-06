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

    print(f"=== goodwin Character Slot Details ===")
    for slot_num in range(1, 100):
        d1_key = f"DATA1_{slot_num}"
        if d1_key in data:
            d1_b64 = data[d1_key]
            d2_b64 = data.get(f"DATA2_{slot_num}", "")
            d3_b64 = data.get(f"DATA3_{slot_num}", "")
            
            d1 = base64.b64decode(d1_b64).decode('utf-8', errors='ignore').strip().split(',')
            d2 = base64.b64decode(d2_b64).decode('utf-8', errors='ignore').strip().split(',') if d2_b64 else []
            d3 = base64.b64decode(d3_b64).decode('utf-8', errors='ignore').strip().split(',') if d3_b64 else []
            
            if len(d1) > 72:
                char_id = int(d1[2]) if d1[2].isdigit() else -1
                level = int(d1[17]) if d1[17].isdigit() else 0
                adv = int(d1[16]) if d1[16].isdigit() else 0
                upg_val = int(d1[72]) if d1[72].isdigit() else 0
                upgrade = upg_val - 228 if upg_val >= 150 else upg_val
                cp = int(d1[55]) if d1[55].isdigit() else 0
                
                print(f"Slot {slot_num}: Name={d1[1] if len(d1) > 1 else 'None'} (ID={char_id}), Level={level}, Upgrade={upgrade}, CP={cp}, Adv={adv}")
                print(f"  First 25 elements: {d1[:25]}")
                print(f"  Elements 70-75: {d1[70:75]}")
                if len(d1) > 75:
                    print(f"  Elements 75+: {d1[75:]}")
