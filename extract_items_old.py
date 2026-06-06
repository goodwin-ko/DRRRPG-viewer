import os
import re

old_log_path = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\.system_generated\steps\24\content.md"
output_path = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\scratch\matched_items_perfect.txt"

if not os.path.exists(old_log_path):
    print("Old log path does not exist!")
    # Let's search in steps directory for any content.md containing "511,846" (the blue diamond value in the screenshot)
    steps_dir = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\.system_generated\steps"
    found = False
    if os.path.exists(steps_dir):
        for root, dirs, files in os.walk(steps_dir):
            for file in files:
                if file == "content.md":
                    p = os.path.join(root, file)
                    with open(p, "r", encoding="utf-8") as f:
                        text = f.read()
                    if "511846" in text or "511,846" in text or "232,543,194" in text:
                        print(f"Found matching old log file at: {p}")
                        old_log_path = p
                        found = True
                        break
            if found: break
    if not found:
        print("Could not find old matching log file!")
        exit(1)

with open(old_log_path, "r", encoding="utf-8") as f:
    html_content = f.read()

from bs4 import BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')
tbody = soup.find('tbody')
if not tbody:
    print("No tbody found in old HTML")
    exit(1)

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

import base64
def decode_b64_to_array(b64_str):
    if not b64_str: return []
    return base64.b64decode(b64_str).decode('utf-8', errors='ignore').strip().split(',')

screenshot_items = {
    "농부": [
        "자넨바의신발 v2", "자넨바의팔찌 v2", "자넨바의신발 v2", "자넨바의신발 v2", "토독(base)",
        "자넨바의팔찌 v2", "자넨바의신발 v2", "자넨바의신발 v2", "토독(base)", "자넨바의신발 v2",
        "[Event]손오반의 힘"
    ],
    "우마왕": [
        "토독(base)", "자넨바 팔찌", "자넨바 신발", "자넨바 신발", "자넨바 신발", "자넨바 신발",
        "자넨바 팔찌", "자넨바 신발", "자넨바 신발", "토독(base)", "자넨바 신발", "자넨바 신발"
    ],
    "인조인간13호": [
        "베이비의반지", "베이비의보석", "[Event]손오반의 힘", "베이비의신발", "베이비의반지", "토독(base)",
        "베이비의신발", "베이비의보석", "베이비의반지", "베이비의신발", "토독(base)", "[Event]손오반의 힘"
    ],
    "팡": [
        "자넨바의팔찌 v2", "지구인의생명!", "[Event]손오반의 힘", "토독(base)", "자넨바의신발 v2", "자넨바의신발 v2",
        "자넨바의팔찌 v2", "(Vegito) 신발", "토독(base)", "[Event]손오반의 힘", "자넨바의신발 v2", "자넨바의신발 v2"
    ],
    "자넨바": [
        "베이비의신발", "베이비의신발", "[Event]손오반의 힘", "베이비의보석", "베이비의반지", "토독(base)",
        "[Event]손오반의 힘", "베이비의반지", "베이비의신발", "베이비의신발", "베이비의반지", "베이비의보석"
    ],
    "드래곤(하이야)": [
        "토독+3", "[Event]손오반의 힘",
        "토독+1", "자넨바의신발 v2", "[Event]손오반의 힘", "자넨바의신발 v2", "자넨바의팔찌 v2", "자넨바의신발 v2"
    ],
    "블루장군": [
        "오천크스 갑옷", "오천크스 가방", "오천크스 수련팔찌",
        "오천크스 수련팔찌", "오천크스 갑옷", "오천크스 가방"
    ],
    "브로리(약해진)": [
        "(Vegito) 만능장갑", "(Vegito) 도복", "[Event]손오반의 힘", "베이비의신발", "토독+2",
        "베이비의반지", "베이비의보석", "토독+3", "[Event]손오반의 힘", "베이비의신발", "베이비의신발"
    ],
    "버독": [
        "베이비의반지", "베이비의신발", "베이비의보석", "[Event]손오반의 힘", "토독(base)", "지구인의생명!",
        "베이비의반지", "베이비의보석", "베이비의보석", "[Event]손오반의 힘", "토독(base)"
    ],
    "아리": [
        "지구인의생명!", "토독(base)",
        "토독(base)"
    ],
    "타레스": [
        "자넨바 신발", "자넨바 신발", "[Event]손오반의 힘", "자넨바 보석", "자넨바 팔찌", "토독(base)",
        "자넨바 신발", "[Event]손오반의 힘", "자넨바 신발", "자넨바 팔찌", "자넨바 보석", "자넨바 신발"
    ],
    "파이크한": [
        "베이비의 신발v2", "베이비의 반지v2", "[Event]손오반의 힘", "베이비의 보석v2", "베이비의 신발v2", "베이비의 신발v2",
        "베이비의 반지v2", "토독(base)", "베이비의 신발v2", "베이비의 신발v2", "베이비의 보석v2", "[Event]손오반의 힘"
    ],
    "박테리안": [
        "지구인의생명!", "자넨바 신발", "자넨바 팔찌", "자넨바 신발", "자넨바 보석", "자넨바 신발",
        "자넨바 신발", "자넨바 신발", "자넨바 신발", "자넨바 보석", "자넨바 팔찌", "자넨바 신발"
    ]
}

char_names = {
    156: "농부",
    135: "우마왕",
    137: "인조인간13호",
    149: "팡",
    144: "자넨바",
    161: "드래곤(하이야)",
    129: "블루장군",
    152: "브로리(약해진)",
    86: "버독",
    155: "아리",
    132: "타레스",
    103: "파이크한",
    134: "박테리안"
}

perfect_mappings = {}

for key, val in data.items():
    match = re.match(r"^DATA1_(\d+)$", key)
    if match:
        slotNum = match.group(1)
        d1 = decode_b64_to_array(data[f"DATA1_{slotNum}"])
        if len(d1) > 50:
            char_id = int(d1[2]) if d1[2].isdigit() else -1
            if char_id in char_names:
                name = char_names[char_id]
                item_indices = [4, 6, 8, 10, 12, 14, 40, 42, 44, 46, 48, 50]
                raw_ids = []
                for idx in item_indices:
                    item_id = int(d1[idx]) if d1[idx].isdigit() else 0
                    if item_id > 0:
                        raw_ids.append(item_id)
                
                screen_list = screenshot_items.get(name, [])
                
                # Check alignment
                limit = min(len(raw_ids), len(screen_list))
                for i in range(limit):
                    rid = raw_ids[i]
                    sname = screen_list[i]
                    if rid not in perfect_mappings:
                        perfect_mappings[rid] = set()
                    perfect_mappings[rid].add(sname)

with open(output_path, "w", encoding="utf-8") as out:
    out.write("Perfect Mappings:\n")
    for rid in sorted(perfect_mappings.keys()):
        names = list(perfect_mappings[rid])
        out.write(f"  {rid} -> {names}\n")

print("Perfect mappings written successfully.")
