import requests
from bs4 import BeautifulSoup
import re
import json

url = "https://m16tool.xyz/Game/DRR/UserLog/LogResult?nicName=goodwin"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

r = requests.get(url, headers=headers)
if r.status_code == 200:
    soup = BeautifulSoup(r.text, 'html.parser')
    tbody = soup.find('tbody')
    if tbody:
        rows = tbody.find_all('tr')
        print(f"Total rows: {len(rows)}")
        # Get the first row's data
        cols = rows[0].find_all('td')
        data_html = "".join([str(c) for c in cols[1].contents])
        text = re.sub(r"<br\s*/?>", "\n", data_html)
        text = re.sub(r"<[^>]+>", "", text)
        text = text.strip()
        
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
            
        print("\nAll LINK_ keys in goodwin's latest log:")
        links = []
        for k, v in data.items():
            if k.startswith("LINK_"):
                num = int(k.split("_")[1])
                links.append((num, v))
        
        links.sort()
        for num, v in links:
            print(f"  LINK_{num}: {v}")
else:
    print(f"Failed to fetch, status: {r.status_code}")
