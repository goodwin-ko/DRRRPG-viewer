import os
import re
import base64

old_log_path = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\.system_generated\steps\24\content.md"
if not os.path.exists(old_log_path):
    steps_dir = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\.system_generated\steps"
    found = False
    for root, dirs, files in os.walk(steps_dir):
        for file in files:
            if file == "content.md":
                p = os.path.join(root, file)
                with open(p, "r", encoding="utf-8") as f:
                    text = f.read()
                if "511846" in text or "511,846" in text or "232,543,194" in text:
                    old_log_path = p
                    found = True
                    break
        if found: break

with open(old_log_path, "r", encoding="utf-8") as f:
    html_content = f.read()

from bs4 import BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')
tbody = soup.find('tbody')
rows = tbody.find_all('tr')
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

print("Searching for 1561:")
for k, v in data.items():
    if v == 1561:
        print(f"  Found 1561 at: {k}")

print("Searching for 511846:")
for k, v in data.items():
    if v == 511846:
        print(f"  Found 511846 at: {k}")
        
# Let's decode PDATA1 and check if the values are inside
if "PDATA1" in data:
    p1 = base64.b64decode(data["PDATA1"]).decode("utf-8", errors="ignore").split(",")
    print("PDATA1 values count:", len(p1))
    for idx, v in enumerate(p1):
        if v in ["1561", "511846"]:
            print(f"  Found in PDATA1[{idx}] = {v}")
            
if "PDATA2" in data:
    p2 = base64.b64decode(data["PDATA2"]).decode("utf-8", errors="ignore").split(",")
    print("PDATA2 values count:", len(p2))
    for idx, v in enumerate(p2):
        if v in ["1561", "511846"]:
            print(f"  Found in PDATA2[{idx}] = {v}")
