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
    
    # search for 3230 in text
    print("Occurrences of 3230 in raw td text:")
    for line in text.split("\n"):
        if "3230" in line:
            print(f"  {line}")
else:
    print("Failed to fetch")
