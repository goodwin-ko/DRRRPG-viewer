import requests
import re

url = "https://m16tool.xyz/Game/DRR/UserLog/LogResult?nicName=goodwin"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

r = requests.get(url, headers=headers)
print("Headers content-type:", r.headers.get('content-type'))
print("Guessed encoding (r.encoding):", r.encoding)
print("Apparent encoding (r.apparent_encoding):", r.apparent_encoding)

# Let's try decoding raw bytes with different encodings
raw_bytes = r.content

for enc in ['utf-8', 'euc-kr', 'cp949', 'utf-16']:
    try:
        decoded = raw_bytes.decode(enc)
        # Search for "인증 Final 캐릭터"
        if "인증 Final 캐릭터" in decoded:
            print(f"--> Success with encoding: {enc}!")
            break
        else:
            # Let's print a small slice containing one of the corrupted keys
            # to see if it decodes to something recognizable
            print(f"Encoding '{enc}': '인증 Final 캐릭터' not found. Slice search:")
            match = re.search(r'Final', decoded)
            if match:
                idx = match.start()
                # Remove control chars or html tags for print
                slice_txt = decoded[max(0, idx-50):min(len(decoded), idx+100)].replace("\n", " ").strip()
                print("  Snippet:", slice_txt)
    except Exception as e:
        print(f"Encoding '{enc}' failed: {e}")
