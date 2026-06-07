from flask import Flask, request, jsonify, send_from_directory
import requests
from bs4 import BeautifulSoup
import re
import json
import os

app = Flask(__name__, static_folder='public', static_url_path='')

def parse_log_td(td_html):
    # Remove br tags and replace with newlines
    text = re.sub(r"<br\s*/?>", "\n", td_html)
    # Strip any other HTML tags
    text = re.sub(r"<[^>]+>", "", text)
    text = text.strip()
    
    # Try to wrap in curly braces and parse as JSON
    json_str = "{" + text + "}"
    # Clean up trailing commas before closing braces
    json_str = re.sub(r",\s*}", "}", json_str)
    
    try:
        return json.loads(json_str)
    except Exception as e:
        # Fallback to manual key-value extraction using regex
        data = {}
        # Find "key": "value" or "key": numeric
        pairs = re.findall(r'"([^"]+)"\s*:\s*(?:"([^"]*)"|([0-9\.\-]+))', text)
        for p in pairs:
            key = p[0]
            val = p[1] if p[1] else p[2]
            if p[2]:  # If it was matched as a number
                try:
                    if "." in val:
                        val = float(val)
                    else:
                        val = int(val)
                except:
                    pass
            data[key] = val
        return data

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/logs')
def get_logs():
    nicName = request.args.get('nicName', '').strip()
    if not nicName:
        return jsonify({"success": False, "error": "Nickname is required"}), 400
        
    url = f"https://m16tool.xyz/Game/DRR/UserLog/LogResult?nicName={nicName}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            return jsonify({"success": False, "error": f"Failed to fetch logs from server (Status Code: {response.status_code})"}), 500
            
        soup = BeautifulSoup(response.text, 'html.parser')
        tbody = soup.find('tbody')
        if not tbody:
            return jsonify({"success": False, "error": "No log data found for this nickname."}), 404
            
        rows = tbody.find_all('tr')
        if not rows:
            return jsonify({"success": False, "error": "No log entries found."}), 404
            
        # Parse all rows and extract data
        log_entries = []
        for row in rows:
            cols = row.find_all('td')
            if len(cols) >= 3:
                char_file = cols[0].text.strip()
                # Get the raw inner HTML of the data cell to preserve br tags
                data_html = "".join([str(c) for c in cols[1].contents])
                date_str = cols[-1].text.strip()
                
                parsed_data = parse_log_td(data_html)
                log_entries.append({
                    "char_file": char_file,
                    "data": parsed_data,
                    "date": date_str
                })
        
        # Sort logs by date (oldest first) so that newer entries overwrite older ones in our merge
        # Date format: e.g. "06/02/2026 18:09:32" (MM/DD/YYYY HH:MM:SS)
        def parse_date(date_str):
            try:
                # Match MM/DD/YYYY HH:MM:SS
                m = re.match(r"(\d+)/(\d+)/(\d+)\s+(\d+):(\d+):(\d+)", date_str)
                if m:
                    month, day, year, hour, minute, second = map(int, m.groups())
                    return (year, month, day, hour, minute, second)
            except:
                pass
            return (0, 0, 0, 0, 0, 0)
            
        log_entries.sort(key=lambda x: parse_date(x['date']))
        
        # Merge character states (newest overwrites oldest)
        merged_data = {}
        latest_date = ""
        for entry in log_entries:
            merged_data.update(entry['data'])
            latest_date = entry['date'] # Keep track of the absolute newest save date
            
        # Also clean up merged_data values (some might have double spaces or be strings)
        return jsonify({
            "success": True,
            "nicName": nicName,
            "latest_date": latest_date,
            "data": merged_data
        })
        
    except requests.exceptions.Timeout:
        return jsonify({"success": False, "error": "Request to m16tool.xyz timed out."}), 504
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/rankings')
def get_rankings():
    board = request.args.get('board', '유저랭킹').strip()
    import urllib.parse
    import concurrent.futures
    board_encoded = urllib.parse.quote(board)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    def fetch_page(page_idx):
        url = f"https://m16tool.xyz/Game/DRR/Rank/Index?index={page_idx}&board={board_encoded}"
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            raise Exception(f"Failed to fetch page {page_idx} (Status Code: {response.status_code})")
        return page_idx, response.text

    try:
        pages_data = {}
        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
            future_to_page = {executor.submit(fetch_page, idx): idx for idx in range(1, 6)}
            for future in concurrent.futures.as_completed(future_to_page):
                idx = future_to_page[future]
                pages_data[idx] = future.result()[1]
                
        rankings = []
        for idx in range(1, 6):
            html = pages_data.get(idx)
            if not html:
                continue
            soup = BeautifulSoup(html, 'html.parser')
            tbody = soup.find('tbody')
            if not tbody:
                continue
            rows = tbody.find_all('tr')
            for row in rows:
                cols = row.find_all('td')
                if len(cols) >= 3:
                    rank_str = cols[0].text.strip()
                    name_html = str(cols[1])
                    score_str = cols[2].text.strip()
                    
                    # Extract nickname from links or text
                    name_match = re.search(r'nicName=([^&"]+)', name_html)
                    if name_match:
                        nicname = urllib.parse.unquote(name_match.group(1))
                    else:
                        nicname = cols[1].text.strip().split('(')[0].strip()
                    
                    try:
                        rank = int(rank_str)
                    except:
                        rank = rank_str
                        
                    try:
                        score = int(score_str.replace(',', ''))
                    except:
                        score = score_str
                        
                    rankings.append({
                        "rank": rank,
                        "nicname": nicname,
                        "score": score
                    })
        return jsonify({"success": True, "rankings": rankings})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    # Ensure public folder exists
    os.makedirs('public', exist_ok=True)
    # Run server on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
