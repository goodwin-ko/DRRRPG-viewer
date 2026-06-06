import os

search_terms = [
    "하이야드래곤", "빅테리안", "인조인간13", "인조인간14", "인조인간17", "인조인간18",
    "인조인간19", "인조인간16", "인조인간15", "인조인간8", "야콘", "바비디", "손오공", "셀",
    "사봉", "트랭크스(검)", "트랭크스(미)", "도도리아"
]

public_dir = "public"
for root, dirs, files in os.walk(public_dir):
    for file in files:
        if file.endswith((".js", ".html", ".css")):
            p = os.path.join(root, file)
            with open(p, "r", encoding="utf-8") as f:
                content = f.read()
            for term in search_terms:
                if term in content:
                    # Print lines where term is found
                    lines = content.split("\n")
                    for i, l in enumerate(lines):
                        if term in l:
                            print(f"{file}:{i+1}: {l.strip()}")
