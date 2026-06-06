import requests
from bs4 import BeautifulSoup
import re

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

    print("Latest Row Date:", cols[-1].text.strip())
    print("인증 Final 캐릭터:", data.get("인증 Final 캐릭터"))
    # print all keys starting with LINK_ or DATA_
    for k in sorted(data.keys()):
        if not k.startswith("DATA") and not k.startswith("LINK"):
            print(f"  {k}: {data[k]}")
else:
    print("Failed to fetch")
