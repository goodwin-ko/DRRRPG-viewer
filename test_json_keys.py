import requests
import json

url = "http://localhost:5000/api/logs?nicName=goodwin"
r = requests.get(url)
data = r.json()

# Write to a UTF-8 JSON file
with open("test_out.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Saved response to test_out.json. Let's inspect some keys:")
keys = data.get("data", {}).keys()
korean_keys = [k for k in keys if any(ord(c) > 127 for c in k)]
print("Korean keys count:", len(korean_keys))
print("Sample Korean keys:", korean_keys[:10])
