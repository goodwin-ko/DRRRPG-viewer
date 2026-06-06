import requests
from bs4 import BeautifulSoup

url = "https://m16tool.xyz/Game/DRR/UserLog/LogResult?nicName=goodwin"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

r = requests.get(url, headers=headers)
if r.status_code == 200:
    soup = BeautifulSoup(r.text, 'html.parser')
    text = soup.text
    print("Found '플레이 타임' in page text:", "플레이 타임" in text or "플레이타임" in text)
    # Print lines containing it
    for line in text.split("\n"):
        if "플레이" in line or "타임" in line or "분" in line:
            print(f"  Line: {line.strip()}")
else:
    print("Failed to fetch")
