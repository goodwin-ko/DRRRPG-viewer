from flask import Flask, request, jsonify, send_from_directory
import requests
from bs4 import BeautifulSoup
import re
import json
import os
import datetime

app = Flask(__name__, static_folder='public', static_url_path='')

# ─── 영구 캐시: 친구 이름 / 캐릭터 각성명 ───────────────────────────
CACHE_FILE = os.path.join(os.path.dirname(__file__), 'friend_cache.json')

def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            pass
    return {}

def save_cache(cache):
    try:
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)
    except:
        pass
# ─────────────────────────────────────────────────────────────────────

LINK_NAME_MAPPING = {
    1: '손오공', 2: '크리링', 3: '야무치', 4: '천진반', 5: '무천도사',
    6: '피콜로', 7: '라데츠', 8: '내퍼', 9: '베지터', 10: '굴드',
    11: '리쿰', 12: '지스', 13: '버터', 14: '기뉴', 15: '사탄',
    16: '어린손오반', 17: '프리저', 18: '콜드대왕', 19: '네일', 20: '인조인간16호',
    21: '인조인간19호', 22: '인조인간20호', 23: '인조인간17호', 24: '인조인간18호', 25: '셀',
    26: '트랭크스(미래)', 27: '부르마', 28: '야콩', 29: '데브라', 30: '비비디',
    31: '마인부우', 32: '손오반', 33: '도도리아', 34: '비델', 35: '손오천',
    36: '트랭크스(어린)', 37: '자봉', 38: '쿠우라', 39: '인조인간15호', 40: '인조인간14호',
    41: '우부', 42: '타피온', 43: '농부', 44: '인조인간13호', 45: '자넨바',
    46: '블루장군', 47: '브로리(전설)', 48: '버독', 49: '타레스', 50: '박테리안',
    51: '우마왕', 52: '팡', 53: '하야이드래곤', 54: '브로리(약해진)', 55: '아리',
    56: '파이크한', 57: '베이비', 58: '리루도', 59: '인조인간8호', 60: '심벌', 61: '유린'
}

HERO_ALIASES = {
    "자봉": ["자봉", "자붕"],
    "타피온": ["타피온", "용사", "환상의용사", "힐데건"]
}

HERO_COMPATIBILITY_GROUPS = {
    "우부": ["우부", "슈퍼우부"],
    "슈퍼우부": ["우부", "슈퍼우부"],
    "자봉": ["자봉", "자붕"],
    "타피온": ["타피온", "용사", "환상의용사", "힐데건"],
    "용사": ["타피온", "용사", "환상의용사", "힐데건"],
    "힐데건": ["타피온", "용사", "환상의용사", "힐데건"]
}

import base64

def get_slot_save_date(slot_str, merged_data):
    k_d3 = f"DATA3_{slot_str}"
    if k_d3 in merged_data:
        try:
            b64_val = merged_data[k_d3]
            decoded = base64.b64decode(b64_val).decode('utf-8', errors='ignore')
            m = re.search(r'\b(20\d{6})\b', decoded)
            if m:
                return m.group(1)
        except:
            pass
    for k_prefix in ["DATA1_", "DATA2_"]:
        k = f"{k_prefix}{slot_str}"
        if k in merged_data:
            try:
                b64_val = merged_data[k]
                decoded = base64.b64decode(b64_val).decode('utf-8', errors='ignore')
                m = re.search(r'\b(20\d{6})\b', decoded)
                if m:
                    return m.group(1)
            except:
                pass
    return None

def parse_ymd_to_date(ymd_str):
    try:
        return datetime.date(int(ymd_str[0:4]), int(ymd_str[4:6]), int(ymd_str[6:8]))
    except:
        return None
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
    
    data = {}
    try:
        data = json.loads(json_str)
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

    # 로그 텍스트 내의 친구 이름 동적 추출 로직 (유연한 라인 검출 및 정제)
    slots = set(re.findall(r"DATA1_(\d+)", text))
    if not slots:
        slots = set(re.findall(r"DATA1.*?(\d+)", text))

    friend_name = None
    for line in text.split("\n"):
        line = line.strip()
        if "친구" in line:
            if ":" in line:
                parts = line.split(":", 1)
                if len(parts) > 1:
                    content = parts[1].strip()
                    # 'Lv4341' 이나 'Lv 4341' 등 레벨 정보 제거
                    content = re.sub(r"^Lv\s*\d+", "", content, flags=re.IGNORECASE).strip()
                    # 워크래프트 컬러코드 및 특수태그 제거
                    content = re.sub(r"\|c[0-9a-fA-F]{8}", "", content)
                    content = re.sub(r"\|r", "", content)
                    content = re.sub(r"『친구』", "", content)
                    content = re.sub(r"\[친구\]", "", content)
                    content = content.strip()
                    if content:
                        friend_name = content
                        break

    if friend_name:
        for slot in slots:
            data[f"FRIEND_NAME_{slot}"] = friend_name

    return data

def iso_to_m16_date(iso_str):
    if not iso_str:
        return None
    try:
        # Match YYYY-MM-DDTHH:MM:SS
        m = re.match(r"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})", iso_str)
        if m:
            year, month, day, hour, minute, second = m.groups()
            return f"{month}/{day}/{year} {hour}:{minute}:{second}"
    except:
        pass
    return None

def get_latest_log_char(nicName):
    url = "https://logs2.m16tool.xyz/Game/DRR/UserLog/GetLog2"
    current_month = datetime.datetime.now().strftime("%Y-%m")
    
    data = {
        "nicName": nicName,
        "character": "JN_DATA_1",
        "index": "0",
        "search": "",
        "Month": current_month
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    try:
        response = requests.post(url, data=data, headers=headers, timeout=10)
        if response.status_code != 200:
            return None, None
            
        decoded_text = response.content.decode('utf-8', errors='ignore')
        res = json.loads(decoded_text)
        
        if not res.get("success") or "data" not in res or not res["data"]:
            return None, None
            
        log_texts = []
        latest_date_iso = None
        for item in res["data"][:3]:
            obj = json.loads(item)
            if latest_date_iso is None:
                latest_date_iso = obj.get("CreateDate")
            log_texts.append(obj.get("Loging", ""))
                
        full_text = "\n".join(log_texts)
        full_text_clean = full_text.replace("<br>", "\n").replace("<br/>", "\n")
        
        match = re.search(r"영웅\s*:\s*Lv\d+\s*(?:\|c[0-9a-fA-F]{8})?(?:『영웅』|『친구』)?(?:\|r)?\s*([^\n\r]+)", full_text_clean)
        if match:
            char_name = match.group(1).strip()
            # 워크래프트 컬러코드 및 태그 제거
            char_name = re.sub(r"\|c[0-9a-fA-F]{8}", "", char_name)
            char_name = re.sub(r"\|r", "", char_name)
            char_name = re.sub(r"『영웅』", "", char_name)
            # [2차 각성] 등은 공백으로 변환하여 표시명에 포함 (ex: "인조인간 16호[2차 각성]" → "인조인간 16호 2차 각성")
            char_name = re.sub(r"\[", " ", char_name)
            char_name = re.sub(r"\]", "", char_name)
            char_name = re.sub(r"\s+", " ", char_name).strip()
            formatted_date = iso_to_m16_date(latest_date_iso)
            return char_name, formatted_date
            
    except:
        pass
        
    return None, None

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/multi')
def multi():
    return app.send_static_file('multi.html')

@app.route('/api/logs')
def get_logs():
    nicName = request.args.get('nicName', '').strip()
    if not nicName:
        return jsonify({"success": False, "error": "Nickname is required"}), 400
        
    import time
    url = f"https://m16tool.xyz/Game/DRR/UserLog/LogResult?nicName={nicName}&_={int(time.time() * 1000)}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            return jsonify({"success": False, "error": f"Failed to fetch logs from server (Status Code: {response.status_code})"}), 500
            
        response.encoding = 'utf-8'
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
        slot_dates = {}
        for entry in log_entries:
            merged_data.update(entry['data'])
            latest_date = entry['date']  # Keep track of the absolute newest save date
            
            # Extract slot number from char_file ONLY for "nickname_N.txt" patterns.
            # JN_DATA_1, JN_DATA_2 등 파일명의 숫자는 슬롯번호가 아닌 파일 인덱스이므로 무시.
            # 슬롯번호는 반드시 닉네임_숫자.txt 형식이어야 함 (e.g. goodwin_5.txt → slot 5)
            char_file = entry['char_file']
            m_slot = re.search(r'^[A-Za-z0-9가-힣]+_(\d+)(?:\.txt)?$', char_file)
            if m_slot and not char_file.upper().startswith('JN_'):
                slot_num = int(m_slot.group(1))
                slot_dates[str(slot_num)] = entry['date']

        # Fetch additional recent logs from GetLog (without Month filter) to extract latest friend names
        # Scan pages 4 to 0 (oldest to newest in the range) so that newer logs overwrite older ones.
        try:
            import time
            ajax_url = f"https://logs2.m16tool.xyz/Game/DRR/UserLog/GetLog?_={int(time.time() * 1000)}"
            ajax_headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache"
            }
            
            pages_data = []
            for page_idx in range(20):  # 최대 20페이지 조회로 오래된 기록도 커버
                ajax_data = {
                    "nicName": nicName,
                    "character": "JN_DATA_1",
                    "index": page_idx
                }
                ajax_resp = requests.post(ajax_url, data=ajax_data, headers=ajax_headers, timeout=10)
                if ajax_resp.status_code == 200:
                    ajax_res = ajax_resp.json()
                    if ajax_res.get("success") and "data" in ajax_res and ajax_res["data"]:
                        pages_data.append(ajax_res["data"])
                    else:
                        break
                else:
                    break
            
            # 1. Collect all candidates from oldest to newest
            candidates = []
            for page_logs in reversed(pages_data):
                # Reverse log entries inside each page to process oldest first
                for item in reversed(page_logs):
                    obj = json.loads(item)
                    loging_html = obj.get("Loging", "")
                    if loging_html:
                        try:
                            loging_html = loging_html.encode('latin1').decode('cp949', errors='ignore')
                        except:
                            pass
                        # Clean up HTML tags and get raw text
                        text_clean = re.sub(r"<br\s*/?>", "\n", loging_html)
                        text_clean = re.sub(r"<[^>]+>", "", text_clean).strip()
                        
                        # Extract friend name
                        friend_name = None
                        for line in text_clean.split("\n"):
                            line = line.strip()
                            if "친구" in line:
                                if ":" in line:
                                    parts = line.split(":", 1)
                                    if len(parts) > 1:
                                        content = parts[1].strip()
                                        content = re.sub(r"^Lv\s*\d+", "", content, flags=re.IGNORECASE).strip()
                                        content = re.sub(r"\|c[0-9a-fA-F]{8}", "", content)
                                        content = re.sub(r"\|r", "", content)
                                        content = re.sub(r"『친구』", "", content)
                                        content = re.sub(r"\[친구\]", "", content)
                                        content = content.strip()
                                        if content:
                                            friend_name = content
                                            break
                        
                        # Extract hero name
                        hero_name = None
                        hero_display_name = None
                        hero_match = re.search(r"영웅\s*:\s*Lv\d+\s*(?:\|c[0-9a-fA-F]{8})?(?:『영웅』|『용사』|『환상의 용사』)?(?:\|r)?\s*([^\n\r]+)", text_clean)
                        if hero_match:
                            hero_raw = hero_match.group(1).strip()
                            hero_raw = re.sub(r"\|c[0-9a-fA-F]{8}", "", hero_raw)
                            hero_raw = re.sub(r"\|r", "", hero_raw)
                            hero_raw = re.sub(r"『영웅』|『용사』|『환상의 용사』", "", hero_raw).strip()
                            # 표시명: [] 기호를 고론로 삼아 공백 정희 (ex: "인조인간 16호[2차 각성]" → "인조인간 16호 2차 각성")
                            display_raw = re.sub(r"\[", " ", hero_raw)
                            display_raw = re.sub(r"\]", "", display_raw)
                            hero_display_name = re.sub(r"\s+", " ", display_raw).strip()
                            # 슬롯 매칭용: 공백 정규화 + [] 제거
                            hero_line = re.sub(r"\[.*?\]", "", hero_raw)
                            hero_line = re.sub(r"\s+", "", hero_line)
                            
                            for slot_id, char_basic_name in LINK_NAME_MAPPING.items():
                                match_targets = HERO_ALIASES.get(char_basic_name, [char_basic_name])
                                if any(re.sub(r"\s+", "", t) in hero_line for t in match_targets):
                                    hero_name = char_basic_name
                                    break
                                    
                        if hero_name and friend_name:
                            candidates.append({
                                "hero_name": hero_name,
                                "hero_display_name": hero_display_name or hero_name,
                                "friend_name": friend_name,
                                "CreateDate": obj.get("CreateDate")
                            })
            
            # 2. Map candidates to corresponding slots
            # The candidates list is ordered from oldest to newest.
            # The last 10 items in candidates are the absolute most recent saves (bypass date guard).
            for idx, cand in enumerate(candidates):
                hero_name = cand["hero_name"]
                hero_display_name = cand.get("hero_display_name", hero_name)
                friend_name = cand["friend_name"]
                log_date_str = cand["CreateDate"]
                
                is_very_recent = (len(candidates) - idx) <= 10
                
                log_ymd = None
                if log_date_str:
                    m_log = re.match(r"(\d{4})-(\d{2})-(\d{2})", log_date_str)
                    if m_log:
                        log_ymd = m_log.group(1) + m_log.group(2) + m_log.group(3)
                
                for key in list(merged_data.keys()):
                    if key.startswith("DATA1_"):
                        slot_str = key.split("_")[1]
                        slot_id_int = int(slot_str)
                        slot_name = LINK_NAME_MAPPING.get(slot_id_int)
                        is_hero_match = (slot_name == hero_name) or (slot_name in HERO_COMPATIBILITY_GROUPS.get(hero_name, []))
                        if is_hero_match:
                            # 영웅 이름이 매칭되면 날짜 무관하게 친구 이름 적용
                            # (날짜 가드 제거: 영웅 이름 매칭이 이미 정확성 보장, 데이터는 영구 유지)
                            merged_data[f"FRIEND_NAME_{slot_str}"] = friend_name
                            merged_data[f"HERO_DISPLAY_NAME_{slot_str}"] = hero_display_name

            # 3. 캐시 로드 및 적용: 로그에서 찾지 못한 슬롯은 캐시에서 보충
            cache = load_cache()
            nic_cache = cache.get(nicName, {})

            for key in list(merged_data.keys()):
                if key.startswith("DATA1_"):
                    slot_str = key.split("_")[1]
                    # 이번 로그에서 찾은 게 있으면 캐시 업데이트
                    fn_key = f"FRIEND_NAME_{slot_str}"
                    dn_key = f"HERO_DISPLAY_NAME_{slot_str}"
                    if fn_key in merged_data:
                        nic_cache[slot_str] = {
                            "friend_name": merged_data[fn_key],
                            "hero_display_name": merged_data.get(dn_key, "")
                        }
                    # 이번 로그에서 못 찾았지만 캐시에 있으면 캐시에서 보충
                    elif slot_str in nic_cache:
                        merged_data[fn_key] = nic_cache[slot_str]["friend_name"]
                        if nic_cache[slot_str].get("hero_display_name"):
                            merged_data[dn_key] = nic_cache[slot_str]["hero_display_name"]

            # 캐시 저장
            cache[nicName] = nic_cache
            save_cache(cache)

        except Exception as ex:
            import traceback
            traceback.print_exc()

        # Fetch latest played character & date from logs2 AJAX endpoint
        latest_log_char, latest_log_date = get_latest_log_char(nicName)
        if latest_log_date and latest_log_char:
            if parse_date(latest_log_date) > parse_date(latest_date):
                latest_date = latest_log_date

        return jsonify({
            "success": True,
            "nicName": nicName,
            "latest_date": latest_date,
            "latest_log_character": latest_log_char,
            "latest_log_date": latest_log_date,
            "slot_dates": slot_dates,
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
        response.encoding = 'utf-8'
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
