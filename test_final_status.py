import requests
from bs4 import BeautifulSoup
import re
import json
import base64
import sys

# 캐릭터 ID와 각성단계 매핑
HERO_ID_MAPPING = {
    734: "크리링 [2차 각성]",
    1451: "초사이어인4 손오공",
    850: "초사이어인3 손오공",
    841: "각성한 캡틴기뉴"
}

# 기본 슬롯 번호별 캐릭터명 매핑
LINK_NAME_MAPPING = {
    1: '손오공',
    2: '크리링',
    3: '야무치',
    4: '천진반',
    5: '무천도사',
    6: '피콜로',
    7: '라데츠',
    8: '내퍼',
    9: '베지터',
    10: '굴드',
    11: '리쿰',
    12: '지스',
    13: '버터',
    14: '기뉴',
    15: '사탄',
    16: '어린손오반',
    17: '프리저',
    18: '콜드대왕',
    19: '네일',
    20: '인조인간16호',
    21: '인조인간19호',
    22: '인조인간20호',
    23: '인조인간17호',
    24: '인조인간18호',
    25: '셀',
    26: '트랭크스(미래)',
    27: '부르마',
    28: '야콩',
    29: '데브라',
    30: '비비디',
    31: '마인부우',
    32: '초사이어인2 손오공',
    33: '초사이어인3 손오공',
    34: '각성한 캡틴기뉴'
}

def decode_base64_to_list(b64_str):
    try:
        decoded = base64.b64decode(b64_str).decode('utf-8')
        return [int(x) for x in decoded.split(',') if x.strip().isdigit()]
    except:
        return []

def parse_log_td(text):
    # JSON-like 텍스트 파싱
    data = {}
    pairs = re.findall(r'"([^"]+)"\s*:\s*(?:"([^"]*)"|([0-9\.\-]+))', text)
    for p in pairs:
        key = p[0]
        val = p[1] if p[1] else p[2]
        if p[2]:
            try:
                if "." in val:
                    val = float(val)
                else:
                    val = int(val)
            except:
                pass
        data[key] = val
    return data

def get_drr_real_final_status(nickname):
    url = f"https://m16tool.xyz/Game/DRR/UserLog/RPGDetail?nicName={nickname}&character=JN_DATA_1"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            return f"페이지 로드 실패 (코드: {response.status_code})"
            
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'html.parser')
        
        tbody = soup.find('tbody')
        rows = tbody.find_all('tr') if tbody else soup.find_all('tr')
        if not rows:
            return "최신 세이브 로그 데이터를 찾을 수 없습니다."
            
        # 첫 번째 행(가장 최신 로그) 선택
        target_row = rows[0]
        tds = target_row.find_all('td')
        if len(tds) < 2:
            return "유효한 데이터 행이 아닙니다."
            
        data_text = tds[1].get_text().strip()
        parsed_data = parse_log_td(data_text)
        
        # 존재하는 모든 캐릭터 슬롯 번호 수집
        slots = []
        for k in parsed_data.keys():
            if k.startswith("DATA3_"):
                try:
                    slots.append(int(k.split("_")[1]))
                except:
                    pass
                    
        if not slots:
            return "저장된 슬롯 데이터를 찾을 수 없습니다."
            
        # 각 슬롯의 DATA3_N에서 in-game saveDate(인덱스 6)를 추출하여 최댓값 판별
        best_slot = None
        best_save_date = -1
        
        for slot in slots:
            d3_val = parsed_data.get(f"DATA3_{slot}")
            if d3_val:
                d3 = decode_base64_to_list(d3_val)
                if len(d3) > 6:
                    save_date = d3[6]
                    if save_date > best_save_date:
                        best_save_date = save_date
                        best_slot = slot
                    elif save_date == best_save_date:
                        # 동률일 경우 슬롯 번호가 작은 것을 우선 (기본 설정)
                        if best_slot is None or slot < best_slot:
                            best_slot = slot
                            
        if best_slot is None or best_save_date == -1:
            return "최종 플레이 슬롯을 판별할 수 없습니다."
            
        # 캐릭터 이름 결정 (DATA2의 hero_id 매핑 우선, 없을 시 기본 매핑)
        character_name = LINK_NAME_MAPPING.get(best_slot, f"캐릭터 {best_slot}")
        d2_val = parsed_data.get(f"DATA2_{best_slot}")
        if d2_val:
            d2 = decode_base64_to_list(d2_val)
            if d2:
                hero_id = d2[0]
                character_name = HERO_ID_MAPPING.get(hero_id, character_name)
                
        # 날짜 포맷팅 (YYYYMMDD -> YYYY-MM-DD)
        date_str = str(best_save_date)
        if len(date_str) == 8:
            date_str = f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:]}"
            
        return {
            "조회 아이디": nickname,
            "진짜 최종 저장 시간": date_str,
            "진짜 최종 플레이 캐릭터": character_name
        }
        
    except Exception as e:
        return f"에러 발생: {str(e)}"

if __name__ == "__main__":
    nickname = "goodsee"
    if len(sys.argv) > 1:
        nickname = sys.argv[1]
        
    print(f"[{nickname}] 계정의 최신 세이브 정보 조회 중 (인게임 데이터 기반)...")
    result = get_drr_real_final_status(nickname)
    print("\n[조회 결과]")
    if isinstance(result, dict):
        for k, v in result.items():
            print(f"- {k}: {v}")
    else:
        print(result)
