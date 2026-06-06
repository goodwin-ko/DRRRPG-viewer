import re

decoded_path = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\scratch\decoded.txt"
output_path = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\scratch\matched_items.txt"

# Screenshot item lists per character
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

with open(decoded_path, "r", encoding="utf-8") as f:
    text = f.read()

records = text.split("================================================================================\n")

proposed_mappings = {}

for r in records:
    if not r.strip(): continue
    lines = r.strip().split("\n")
    c_idx_match = re.match(r"Character index: (\d+)", lines[0])
    if c_idx_match:
        d1 = []
        for line in lines[1:]:
            if line.startswith("  DATA1:"):
                d1 = line.replace("  DATA1:", "").strip().split(",")
        
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
                
                # Check if length matches
                limit = min(len(raw_ids), len(screen_list))
                for i in range(limit):
                    rid = raw_ids[i]
                    sname = screen_list[i]
                    if rid not in proposed_mappings:
                        proposed_mappings[rid] = set()
                    proposed_mappings[rid].add(sname)

with open(output_path, "w", encoding="utf-8") as out:
    out.write("Proposed Mappings:\n")
    for rid in sorted(proposed_mappings.keys()):
        names = list(proposed_mappings[rid])
        out.write(f"  {rid} -> {names}\n")

print("Output written to matched_items.txt successfully.")
