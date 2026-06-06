import re

decoded_path = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\scratch\decoded.txt"

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

unique_ids = set()
char_items = {}

for r in records:
    if not r.strip(): continue
    lines = r.strip().split("\n")
    c_idx_match = re.match(r"Character index: (\d+)", lines[0])
    if c_idx_match:
        c_idx = int(c_idx_match.group(1))
        d1 = []
        for line in lines[1:]:
            if line.startswith("  DATA1:"):
                d1 = line.replace("  DATA1:", "").strip().split(",")
        
        if len(d1) > 50:
            char_id = int(d1[2]) if d1[2].isdigit() else -1
            if char_id in char_names:
                name = char_names[char_id]
                # Extract item indices: 4, 6, 8, 10, 12, 14 and 40, 42, 44, 46, 48, 50
                item_indices = [4, 6, 8, 10, 12, 14, 40, 42, 44, 46, 48, 50]
                items = []
                for idx in item_indices:
                    item_id = int(d1[idx]) if d1[idx].isdigit() else 0
                    if item_id > 0:
                        items.append(item_id)
                        unique_ids.add(item_id)
                char_items[name] = items

print("Unique item IDs found:", sorted(list(unique_ids)))
print("\nItems per character (from save data):")
for name, items in sorted(char_items.items()):
    print(f"  {name}: {items}")
