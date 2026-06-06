import re

path = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\.system_generated\steps\170\content.md"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for some terms case-insensitively
terms = ["다이아", "엔젤", "AP", "블루", "SP", "SPECIAL", "RANK", "점수", "포인트"]

for term in terms:
    matches = list(re.finditer(term, content, re.IGNORECASE))
    print(f"Term '{term}': {len(matches)} matches")
    for m in matches[:5]:
        start = max(0, m.start() - 40)
        end = min(len(content), m.end() + 40)
        snippet = content[start:end].replace('\n', ' ')
        print(f"  ... {snippet} ...")
