import os

search_terms = ["level", "formula", "310", "3.28"]
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith((".py", ".js", ".html")):
            p = os.path.join(root, file)
            with open(p, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            for term in search_terms:
                if term in content:
                    print(f"Found '{term}' in {p}")
