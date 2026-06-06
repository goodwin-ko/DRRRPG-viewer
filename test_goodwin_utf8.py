import requests
from bs4 import BeautifulSoup
import re

url = "https://m16tool.xyz/Game/DRR/UserLog/LogResult?nicName=goodwin"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

r = requests.get(url, headers=headers)
r.encoding = 'utf-8' # Force UTF-8
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

    print("인증 Final 캐릭터:", data.get("인증 Final 캐릭터"))
    print("시즌 포인트 획득:", data.get("시즌 포인트 획득"))
else:
    print("Failed")
