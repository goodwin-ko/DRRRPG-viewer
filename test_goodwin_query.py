import requests

url = "http://localhost:5000/api/logs?nicName=goodwin"
print(f"Calling: {url}")
try:
    r = requests.get(url, timeout=10)
    print("Status Code:", r.status_code)
    print("Response JSON:")
    print(r.json())
except Exception as e:
    print("Error:", e)
