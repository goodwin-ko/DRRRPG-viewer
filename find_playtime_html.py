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
    for idx, row in enumerate(rows):
        print(f"Row {idx}:")
        for c_idx, col in enumerate(row.find_all('td')):
            text = col.text.strip()
            print(f"  Col {c_idx}: {text[:150]}")
            if "7395" in text:
                print("    Found 7395 here!")
else:
    print("Failed to fetch")
