import requests
from bs4 import BeautifulSoup

url = "https://m16tool.xyz/Game/DRR/UserLog/RPGDetail?nicName=goodwin&character=JN_DATA_1"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

r = requests.get(url, headers=headers)
if r.status_code == 200:
    soup = BeautifulSoup(r.text, 'html.parser')
    # print some key elements
    print("Title:", soup.title.text if soup.title else "No title")
    
    # print table or divs
    main = soup.find('main') or soup.find('body')
    # print first 1000 chars of text content
    print("Content preview:")
    print(main.text[:1500].strip())
else:
    print("Failed to fetch, status:", r.status_code)
