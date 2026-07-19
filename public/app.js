// Dragonball RPG Random (DRR) Dashboard Frontend Logic

// UpBook{N}_Lv → Slot Number mapping (from PDATA1 array, 1-based index)
const UPBOOK_TO_SLOT = {
    1: 4,   // 천진반
    2: 6,   // 피콜로
    3: 32,  // 손오반
    4: 16,  // 어린손오반
    5: 5,   // 무천도사
    6: 2,   // 크리링
    7: 3,   // 야무치
    8: 17,  // 프리저
    9: 25,  // 셀
    10: 14, // 기뉴
    11: 11, // 리쿰
    12: 13, // 버터
    13: 12, // 지스
    14: 10, // 굴드
    16: 15, // 사탄
    17: 27, // 부르마
    18: 45, // 자넨바
    20: 7,  // 라데츠
    21: 21, // 인조인간19호
    22: 18, // 콜드대왕
    23: 19, // 네일
    24: 43, // 농부
    25: 22, // 인조인간20호
    26: 28, // 야콩 (신규 추가)
    27: 20, // 인조인간16호
    28: 1,  // 손오공
    29: 9,  // 베지터
    30: 47  // 브로리(전설) (신규 추가)
};

// Reverse map: slot number → UpBook 1-based index (built automatically)
const SLOT_TO_UPBOOK = {};
for (const [upBookIdx, slotNum] of Object.entries(UPBOOK_TO_SLOT)) {
    SLOT_TO_UPBOOK[slotNum] = parseInt(upBookIdx);
}

// Character Maximum Speed Mapping Table
const MAX_SPEED_MAPPING = {
    '손오공': 10,
    '크리링': 13.5,
    '야무치': 4,
    '천진반': 4.5,
    '무천도사': 4.5,
    '피콜로': 5,
    '라데츠': 10,
    '내퍼': 6.7,
    '베지터': 16.7,
    '굴드': 5,
    '리쿰': 8.3,
    '지스': 10,
    '버터': 10,
    '기뉴': 20,
    '사탄': 5,
    '어린손오반': 16.7,
    '프리저': 10,
    '콜드대왕': 11.1,
    '네일': 5,
    '인조인간16호': 6.7,
    '인조인간19호': 6.7,
    '인조인간20호': 6.7,
    '인조인간17호': 16.7,
    '인조인간18호': 16.7,
    '셀': 16.7,
    '트랭크스(미래)': 14.3,
    '부르마': 3.3,
    '야콩': 11.1,
    '데브라': 8.3,
    '비비디': 6.7,
    '마인부우': 20,
    '손오반': 16.7,
    '도도리아': 6.25,
    '비델': 12.5,
    '손오천': 12.5,
    '트랭크스(어린)': 16.7,
    '자붕': 8.3,
    '쿠우라': 16.7,
    '인조인간15호': 16.7,
    '인조인간14호': 16.7,
    '우부': 10,
    '타피온': 12.5,
    '농부': 10,
    '인조인간13호': 20,
    '자넨바': 10,
    '블루장군': 10,
    '브로리(전설)': 20,
    '버독': 16.7,
    '타레스': 8.3,
    '박테리안': 5,
    '우마왕': 5,
    '팡': 12.5,
    '하야이드래곤': 10,
    '브로리(약해진)': 20,
    '아리': 10,
    '파이크한': 16.7,
    '베이비': 16.7,
    '리루도': 10,
    '인조인간8호': 10,
    '심벌': 8.3,
    '유린': 10
};

// Character ID Mapping Table
// Slot number to UI category mapping
const SLOT_CATEGORY_MAPPING = {
    43: 'basic',  // 농부
    51: 'basic',  // 우마왕
    44: 'detail', // 인조인간13호
    52: 'detail', // 팡
    45: 'equip',  // 자넨바
    53: 'equip',  // 하야이드래곤
    46: 'hell',   // 블루장군
    54: 'hell',   // 브로리(약해진)
    48: 'db',     // 버독
    55: 'db',     // 아리
    49: 'potion', // 타레스
    56: 'potion', // 파이크한
    50: 'other'   // 박테리안
};

// LINK_X to Character Name Mapping Table
const LINK_NAME_MAPPING = {
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
    32: '손오반',
    33: '도도리아',
    34: '비델',
    35: '손오천',
    36: '트랭크스(어린)',
    37: '자붕',
    38: '쿠우라',
    39: '인조인간15호',
    40: '인조인간14호',
    41: '우부',
    42: '타피온',
    43: '농부',
    44: '인조인간13호',
    45: '자넨바',
    46: '블루장군',
    47: '브로리(전설)',
    48: '버독',
    49: '타레스',
    50: '박테리안',
    51: '우마왕',
    52: '팡',
    53: '하야이드래곤',
    54: '브로리(약해진)',
    55: '아리',
    56: '파이크한',
    57: '베이비',
    58: '리루도',
    59: '인조인간8호',
    60: '심벌',
    61: '유린'
};

// Friend ID to Name Mapping (캐릭터 슬롯과 번호가 다름)
const FRIEND_NAME_MAPPING = {};

// Base64 디코딩 후 숫자 배열로 변환하는 함수
function decodeSaveCode(base64Str) {
    try {
        const binaryString = atob(base64Str);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const text = new TextDecoder().decode(bytes);
        // 마지막 쉼표 제거 후 배열 변환
        return text.replace(/,$/, "").split(",").map(Number);
    } catch (e) {
        console.error("코드 디코딩 실패:", e);
        return null;
    }
}

// DATA1과 DATA2 배열을 크로스 체크하여 친구 이름을 특정하는 마스터 판정 함수
function identifyFriendCharacter(data1Code, data2Code) {
    const d1 = decodeSaveCode(data1Code);
    const d2 = decodeSaveCode(data2Code);
    
    if (!d1 || !d2) return "친구";

    // 1. 친구 슬롯 ID (Index 95) 추출
    const friendSlot = d1.length > 95 ? Number(d1[95]) || 0 : 0;
    if (friendSlot <= 0) {
        return "친구"; // 친구가 장착되지 않은 경우
    }

    // [예외 매핑] 우마왕(51번 슬롯)은 인게임 한글 번역명인 "황소"로 표시
    if (friendSlot === 51) {
        return "황소";
    }

    // 2. DATA2 구조 기반의 특수 친구 마스터 키(1363) 포함 여부 검사
    const has1363 = d2.slice(12, 25).some(val => {
        const vStr = String(val);
        return vStr === "1363" || vStr.includes("13;6");
    });

    // 3. 특수 친구 상태(1363 활성화)라면 이름 뒤에 '(약해진)' 접미사 부여
    if (has1363) {
        // 친구 스탯 영역(인덱스 52, 53, 54)의 최대값이 100만 이상이면 무조건 "메탈 쿠우라(약해진)"
        const fStr = d1.length > 52 ? Number(d1[52]) || 0 : 0;
        const fAgi = d1.length > 53 ? Number(d1[53]) || 0 : 0;
        const fInt = d1.length > 54 ? Number(d1[54]) || 0 : 0;
        const maxStat = Math.max(fStr, fAgi, fInt);

        if (maxStat >= 1000000) {
            return "메탈 쿠우라(약해진)";
        }

        // 특별히 키드부우 예외가 필요한 경우 치환 처리
        const has1460 = d2.slice(12, 25).some(val => String(val) === "1460");
        if (has1460) {
            return "키드부우(약해진)";
        }

        // 진행도 그룹(이벤트 활성화 값) 추출
        const progressGroup = d1[16]; 
        if (progressGroup === 19001) {
            return "마인부우(약해진)";
        }

        return "친구(약해진)";
    }

    // 일반 친구 상태인 경우 엉뚱한 영웅 도감을 불러오지 않고 기본 라벨인 "친구"로 안전하게 수렴
    return "친구";
}

// Determine Star Grade (성급) based on 0-based index value
function getStarGrade(val) {
    const v = parseInt(val) || 0;
    if (v <= 0) return '-';
    
    // Group ranges (each has 8 steps: 1 to 8)
    const grades = [
        { name: '노멀', min: 1, max: 8 },
        { name: '녹색', min: 9, max: 16 },
        { name: '청색', min: 17, max: 24 },
        { name: '퍼플', min: 25, max: 32 },
        { name: '레드', min: 33, max: 40 },
        { name: '닼레', min: 41, max: 48 }
    ];
    
    for (const g of grades) {
        if (v >= g.min && v <= g.max) {
            const level = v - g.min + 1;
            return `${g.name} ${level}`;
        }
    }
    return `레벨 ${v}`; // Fallback if it exceeds 48
}

// Item ID to Name and Color Mapping Table
const ITEM_MAPPING = {
    120:  { name: '야무치의 이빨', color: 'standard' },
    276:  { name: '사과파이', color: 'standard' },
    279:  { name: '로봇오룡의 철팔대', color: 'standard' },
    496:  { name: '피콜로 장갑', color: 'standard' },
    524:  { name: '피콜로의 두건', color: 'standard' },
    525:  { name: '빨간 공룡의 가죽', color: 'standard' },
    528:  { name: '선두콩', color: 'standard' },
    533:  { name: '드래곤볼[1성구]', color: 'standard' },
    534:  { name: '드래곤볼[2성구]', color: 'standard' },
    535:  { name: '드래곤볼[3성구]', color: 'standard' },
    536:  { name: '드래곤볼[4성구]', color: 'standard' },
    537:  { name: '드래곤볼[5성구]', color: 'standard' },
    538:  { name: '드래곤볼[6성구]', color: 'standard' },
    539:  { name: '드래곤볼[7성구]', color: 'standard' },
    541:  { name: '드래곤볼[7성구셋트]', color: 'cyan' },
    542:  { name: '드래곤볼 탐지기', color: 'standard' },
    547:  { name: '바바의 1관문[칭호]', color: 'standard' },
    548:  { name: '바바의 2관문[칭호]', color: 'standard' },
    549:  { name: '바바의 3관문[칭호]', color: 'standard' },
    550:  { name: '바바의 4관문[칭호]', color: 'standard' },
    551:  { name: '바바의 5관문[칭호]', color: 'standard' },
    562:  { name: '바바의 인정[칭호]', color: 'standard' },
    553:  { name: '라데츠의 다리띠', color: 'standard' },
    557:  { name: '재배맨a의 눈물', color: 'standard' },
    558:  { name: '재배맨b의 눈물', color: 'standard' },
    559:  { name: '재배맨c의 눈물', color: 'standard' },
    565:  { name: '부서진 스타우트 조각A', color: 'standard' },
    566:  { name: '부서진 스카우트 조각B', color: 'standard' },
    567:  { name: '부서진 스카우트 조각C', color: 'standard' },
    577:  { name: '손오공의 추억', color: 'standard' },
    584:  { name: '모험의 물약', color: 'standard' },
    587:  { name: '약한자 괴롭히는[칭호]', color: 'standard' },
    588:  { name: '레드 리본군 격퇴[칭호]', color: 'standard' },
    589:  { name: '재배맨s 퇴치[칭호]', color: 'standard' },
    590:  { name: '초급자 신발', color: 'standard' },
    597:  { name: '카린의 증표Lv1 조합서', color: 'standard' },
    598:  { name: '카린의증표Lv1', color: 'standard' },
    599:  { name: '카린의 증표Lv2 조합서', color: 'standard' },
    600:  { name: '카린의증표Lv2', color: 'standard' },
    601:  { name: '카린의 증표Lv3 조합서', color: 'standard' },
    602:  { name: '카린의증표Lv3', color: 'standard' },
    603:  { name: '카린의 증표Lv4 조합서', color: 'standard' },
    604:  { name: '카린의증표Lv4', color: 'standard' },
    605:  { name: '카린의 증표Lv5 조합서', color: 'standard' },
    606:  { name: '카린의 증표Lv5', color: 'standard' },
    607:  { name: '카린의 증표Lv6 조합서', color: 'standard' },
    608:  { name: '카린의 증표Lv6', color: 'standard' },
    609:  { name: '카린의 증표Lv7 조합서', color: 'standard' },
    610:  { name: '카린의 증표Lv7', color: 'standard' },
    611:  { name: '카린의 증표Lv8 조합서', color: 'standard' },
    612:  { name: '카린의 증표Lv8', color: 'standard' },
    613:  { name: '카린의 증표Lv9 조합서', color: 'standard' },
    614:  { name: '카린의 증표Lv9', color: 'standard' },
    615:  { name: '카린의 증표Lv10 조합서', color: 'standard' },
    616:  { name: '카린의 증표Lv10', color: 'standard' },
    617:  { name: '카린의 증표Lv11 조합서', color: 'standard' },
    618:  { name: '카린의 증표Lv11', color: 'standard' },
    619:  { name: '카린의 증표Lv12 조합서', color: 'standard' },
    620:  { name: '카린의 증표Lv12', color: 'standard' },
    635:  { name: '오자루의 꼬리', color: 'standard' },
    637:  { name: '나메크성인의 물약', color: 'standard' },
    641:  { name: '굴드의 신발', color: 'standard' },
    645:  { name: '리쿰의 장갑', color: 'standard' },
    650:  { name: '지스의 눈물', color: 'standard' },
    652:  { name: '기뉴 격퇴[칭호]', color: 'standard' },
    654:  { name: '프리저의 꼬리', color: 'standard' },
    685:  { name: '나메크행성의 추억', color: 'standard' },
    701:  { name: '프리저의 분노[완제품][칭호]', color: 'standard' },
    703:  { name: '나메크행성 파괴자[칭호]', color: 'standard' },
    706:  { name: '메카 프리저의 조각', color: 'standard' },
    707:  { name: '콜드대왕의 뿔', color: 'standard' },
    708:  { name: '기계 물약', color: 'standard' },
    735:  { name: '신 낭아풍풍권Lv3[스킬북]', color: 'standard' },
    723:  { name: '셀의 꼬리', color: 'standard' },
    724:  { name: '셀 완전체 격퇴[칭호]', color: 'standard' },
    747:  { name: '인조인간 저지 [칭호]', color: 'standard' },
    778:  { name: '셀의 점퍼[세트]', color: 'standard' },
    785:  { name: '마인의 물약', color: 'standard' },
    830:  { name: '인조인간 18호의 팬티', color: 'standard' },
    831:  { name: '치치의 팬티', color: 'standard' },
    832:  { name: '런치의 팬티', color: 'standard' },
    834:  { name: '오룡의 팬티 컬렉션 조합서', color: 'standard' },
    836:  { name: '마인부우의 사탕', color: 'standard' },
    846:  { name: '마인부우의 신발', color: 'standard' },
    853:  { name: '레드 스톤', color: 'standard' },
    854:  { name: '그린 스톤', color: 'standard' },
    855:  { name: '블루 스톤', color: 'standard' },
    891:  { name: '셀 스톤', color: 'standard' },
    897:  { name: '이블부우 스톤', color: 'standard' },
    899:  { name: '키드부우의 손톱', color: 'standard' },
    904:  { name: '키드부우의 갑옷[세트]', color: 'standard' },
    905:  { name: '키드부우의 장갑[세트]', color: 'standard' },
    910:  { name: '기념주화', color: 'standard' },
    918:  { name: '평화의 물약', color: 'standard' },
    921:  { name: '각성책:천진반', color: 'standard' },
    932:  { name: '쿠우라의 갑옷[세트]', color: 'standard' },
    933:  { name: '쿠우라의 각반[세트]', color: 'standard' },
    934:  { name: '쿠우라의 장갑[세트]', color: 'standard' },
    941:  { name: '메탈쿠우라의 가죽', color: 'standard' },
    942:  { name: '메탈쿠우라의 손톱', color: 'standard' },
    952:  { name: '기념 주화V2', color: 'standard' },
    999:  { name: '새로운 시작[칭호]', color: 'purple' },
    1000: { name: '학습의 물약', color: 'standard' },
    1007: { name: '각성책:야무치', color: 'standard' },
    1019: { name: '인조인간 스톤', color: 'standard' },
    1023: { name: '고급 인조인간의 갑옷[세트]', color: 'standard' },
    1024: { name: '고급 인조인간의 바지[세트]', color: 'standard' },
    1025: { name: '고급 인조인간의 장갑[세트]', color: 'standard' },
    1027: { name: '나메크 드래곤볼[1성구]', color: 'standard' },
    1028: { name: '나메크 드래곤볼[2성구]', color: 'standard' },
    1029: { name: '나메크 드래곤볼[3성구]', color: 'standard' },
    1030: { name: '나메크 드래곤볼[4성구]', color: 'standard' },
    1031: { name: '나메크 드래곤볼[5성구]', color: 'standard' },
    1032: { name: '나메크 드래곤볼[6성구]', color: 'standard' },
    1033: { name: '나메크 드래곤볼[7성구]', color: 'standard' },
    1035: { name: '나메크 드래곤볼[7성구셋트]', color: 'cyan' },
    1036: { name: '지구인의 생명', color: 'blue' },
    1037: { name: '중급자 신발', color: 'standard' },
    1039: { name: '드래곤볼 탐지기Lv2', color: 'standard' },
    1042: { name: '각성책:지스', color: 'standard' },
    1043: { name: '각성책:굴드', color: 'standard' },
    1045: { name: '학습의 물약Lv2', color: 'standard' },
    1046: { name: '인조 물약', color: 'standard' },
    1092: { name: '용권[스킬북]', color: 'standard' },
    1094: { name: '명절 선물셋트[Event]', color: 'standard' },
    1095: { name: '타임캡슐 우주선Lv1', color: 'standard' },
    1096: { name: '사오공의 낡은 여의봉', color: 'standard' },
    1097: { name: '사오공의 낡은 도복', color: 'standard' },
    1098: { name: '사오공의 여의봉 [유물]', color: 'blue' },
    1099: { name: '사오공의 도복 [유물]', color: 'blue' },
    1100: { name: '사오공의 가방 [유물]', color: 'blue' },
    1119: { name: '변신한 쟈넨바의 갑옷', color: 'purple' },
    1125: { name: '변화의 물약', color: 'standard' },
    1126: { name: '발전의 증표Lv1', color: 'standard' },
    1127: { name: '발전의 증표Lv2', color: 'standard' },
    1128: { name: '발전의 증표Lv3', color: 'standard' },
    1129: { name: '발전의 증표Lv4', color: 'standard' },
    1130: { name: '발전의 증표Lv5', color: 'standard' },
    1131: { name: '발전의 증표Lv6', color: 'standard' },
    1132: { name: '발전의 증표Lv7', color: 'standard' },
    1133: { name: '발전의 증표Lv8', color: 'standard' },
    1134: { name: '발전의 증표Lv9', color: 'standard' },
    1135: { name: '발전의 증표Lv10', color: 'standard' },
    1136: { name: '발전의 증표Lv11', color: 'standard' },
    1137: { name: '발전의 증표Lv12', color: 'standard' },
    1138: { name: '발전의 증표Lv13', color: 'standard' },
    1139: { name: '발전의 증표Lv14', color: 'standard' },
    1140: { name: '발전의 증표Lv15', color: 'standard' },
    1141: { name: '발전의 증표Lv16', color: 'standard' },
    1142: { name: '발전의 증표Lv17', color: 'standard' },
    1143: { name: '발전의 증표Lv18', color: 'standard' },
    1144: { name: '발전의 증표Lv19', color: 'standard' },
    1145: { name: '발전의 증표Lv20', color: 'standard' },
    1146: { name: '발전의 증표Lv21', color: 'standard' },
    1147: { name: '발전의 증표Lv22', color: 'standard' },
    1148: { name: '발전의 증표Lv23', color: 'standard' },
    1149: { name: '발전의 증표Lv24', color: 'standard' },
    1150: { name: '발전의 증표Lv25', color: 'standard' },
    1151: { name: '발전의 증표Lv26', color: 'standard' },
    1152: { name: '발전의 증표Lv27', color: 'standard' },
    1153: { name: '발전의 증표Lv28', color: 'standard' },
    1154: { name: '발전의 증표Lv29', color: 'standard' },
    1155: { name: '발전의 증표Lv30', color: 'standard' },
    1156: { name: '발전의 증표Lv31', color: 'standard' },
    1157: { name: '발전의 증표Lv32', color: 'standard' },
    1159: { name: '낡은 손오반의 모자[유물]', color: 'purple' },
    1160: { name: '손오반의 모자[유물]', color: 'purple' },
    1161: { name: '여성용 리본[유물]', color: 'purple' },
    1162: { name: '부르마의 토끼띠[유물]', color: 'purple' },
    1163: { name: '개발용 헬멧[유물]', color: 'green' },
    1165: { name: '어둠의 물약', color: 'standard' },
    1166: { name: '어둠의 물약Lv2', color: 'standard' },
    1176: { name: '브로리의 힘 Lv3 [고유]', color: 'purple' },
    1177: { name: '오천크스의 낡은 수련팔찌', color: 'standard' },
    1178: { name: '오천크스의 낡은  갑옷', color: 'standard' },
    1179: { name: '오천크스의 수련팔찌 [유물]', color: 'blue' },
    1181: { name: '오천크스의 갑옷 [유물]', color: 'blue' },
    1182: { name: '오천크스의 가방 [유물]', color: 'blue' },
    1183: { name: '타임캡슐 우주선Lv2', color: 'standard' },
    1187: { name: '인조인간 슈퍼 13호의 오만 [칭호]', color: 'blue' },
    1190: { name: '브로리의 분노 Lv2 [고유]', color: 'purple' },
    1193: { name: '개발용 헬멧[+1]', color: 'green' },
    1194: { name: '개발용 헬멧[+2]', color: 'green' },
    1199: { name: '자넨바의 낡은 팔찌', color: 'standard' },
    1200: { name: '자넨바의 낡은 신발', color: 'standard' },
    1201: { name: '자넨바 팔찌', color: 'blue' },
    1202: { name: '자넨바 신발', color: 'blue' },
    1203: { name: '자넨바 보석', color: 'blue' },
    1204: { name: '타임캡슐 우주선Lv3', color: 'standard' },
    1205: { name: '나무꾼의 물약', color: 'standard' },
    1208: { name: '브로리의 힘Lv3[고유]', color: 'purple' },
    1332: { name: '방심의 라데츠의 갑옷', color: 'standard' },
    1349: { name: '타임캡슐 우주선Lv1', color: 'cyan' },
    1350: { name: '타임캡슐 우주선Lv2', color: 'cyan' },
    1351: { name: '각성책:농부', color: 'standard' },
    1352: { name: '타임캡슐 우주선Lv4', color: 'cyan' },
    1353: { name: '자넨바의 낡은 팔찌 Lv2', color: 'standard' },
    1354: { name: '자넨바의 낡은 신발 Lv2', color: 'standard' },
    1355: { name: '자넨바의 팔찌 Lv2', color: 'blue' },
    1356: { name: '자넨바의 신발 Lv2', color: 'blue' },
    1357: { name: '자넨바의 보석 Lv2', color: 'blue' },
    1362: { name: '브로리의 힘Lv4[고유]', color: 'purple' },
    1363: { name: '약탈꾼의 물약', color: 'standard' },
    1365: { name: '헬타임캡슐 우주선Lv1', color: 'cyan' },
    1366: { name: '키드부우(약해진) 소환피리', color: 'cyan' },
    1367: { name: '콜든 프리저[조각]', color: 'standard' },
    1368: { name: '개발용 헬멧[+3]', color: 'green' },
    1369: { name: '개발용 헬멧[+4]', color: 'green' },
    1370: { name: '초사이언4-손오공[조각]', color: 'standard' },
    1371: { name: '각성책:카카로트', color: 'standard' },
    1372: { name: '초사이언 로제-라데츠[조각]', color: 'standard' },
    1373: { name: '베이비의 반지', color: 'purple' },
    1374: { name: '베이비의 신발', color: 'purple' },
    1375: { name: '베이비의 보석', color: 'purple' },
    1376: { name: '블루 하이야드래곤 소환장치', color: 'standard' },
    1377: { name: '알 수 없는 캐릭터[조각]', color: 'standard' },
    1378: { name: '오지터[조각]', color: 'standard' },
    1379: { name: '사오공[조각]', color: 'standard' },
    1381: { name: '그림자 물약', color: 'standard' },
    1382: { name: '자연의 물약', color: 'standard' },
    1383: { name: '진화의 증표 Lv1', color: 'purple' },
    1384: { name: '진화의 증표 Lv2', color: 'purple' },
    1385: { name: '진화의 증표 Lv3', color: 'purple' },
    1386: { name: '진화의 증표 Lv4', color: 'purple' },
    1387: { name: '진화의 증표 Lv5', color: 'purple' },
    1388: { name: '진화의 증표 Lv6', color: 'purple' },
    1389: { name: '진화의 증표 Lv7', color: 'purple' },
    1390: { name: '진화의 증표 Lv8', color: 'purple' },
    1391: { name: '진화의 증표 Lv9', color: 'purple' },
    1392: { name: '진화의 증표 Lv10', color: 'purple' },
    1393: { name: '진화의 증표 Lv11', color: 'purple' },
    1394: { name: '진화의 증표 Lv12', color: 'purple' },
    1395: { name: '진화의 증표 Lv13', color: 'purple' },
    1396: { name: '진화의 증표 Lv14', color: 'purple' },
    1397: { name: '진화의 증표 Lv15', color: 'purple' },
    1398: { name: '진화의 증표 Lv16', color: 'purple' },
    1399: { name: '진화의 증표 Lv17', color: 'purple' },
    1400: { name: '진화의 증표 Lv18', color: 'purple' },
    1401: { name: '진화의 증표 Lv19', color: 'purple' },
    1402: { name: '진화의 증표 Lv20', color: 'purple' },
    1403: { name: '진화의 증표 Lv21', color: 'purple' },
    1404: { name: '진화의 증표 Lv22', color: 'purple' },
    1427: { name: '영웅의 증표 Lv1', color: 'purple' },
    1428: { name: '영웅의 증표 Lv2', color: 'purple' },
    1429: { name: '영웅의 증표 Lv3', color: 'purple' },
    1430: { name: '영웅의 증표 Lv4', color: 'purple' },
    1431: { name: '영웅의 증표 Lv5', color: 'purple' },
    1432: { name: '영웅의 증표 Lv6', color: 'purple' },
    1433: { name: '영웅의 증표 Lv7', color: 'purple' },
    1434: { name: '영웅의 증표 Lv8', color: 'purple' },
    1435: { name: '영웅의 증표 Lv9', color: 'purple' },
    1436: { name: '영웅의 증표 Lv10', color: 'purple' },
    1437: { name: '영웅의 증표 Lv11', color: 'purple' },
    1438: { name: '영웅의 증표 Lv12', color: 'purple' },
    1439: { name: '영웅의 증표 Lv13', color: 'purple' },
    1440: { name: '영웅의 증표 Lv14', color: 'purple' },
    1441: { name: '영웅의 증표 Lv15', color: 'purple' },
    1442: { name: '영웅의 증표 Lv16', color: 'purple' },
    1443: { name: '영웅의 증표 Lv17', color: 'purple' },
    1444: { name: '영웅의 증표 Lv18', color: 'purple' },
    1445: { name: '영웅의 증표 Lv19', color: 'purple' },
    1446: { name: '영웅의 증표 Lv20', color: 'purple' },
    1447: { name: '영웅의 증표 Lv21', color: 'purple' },
    1448: { name: '영웅의 증표 Lv22', color: 'purple' },
    1449: { name: '힐데건 성충 소환장치', color: 'cyan' },
    1450: { name: '무차별 폭행[스킬북]', color: 'standard' },
    1455: { name: '초사이언4-베지터[조각]', color: 'standard' },
    1452: { name: '전신 트레이닝MAX[스킬북]', color: 'standard' },
    1456: { name: '풀파워 셀[조각]', color: 'standard' },
    1457: { name: '헬타임캡슐 우주선Lv2', color: 'cyan' },
    1458: { name: '베이비의 반지 Lv2', color: 'purple' },
    1459: { name: '베이비의 보석 Lv2', color: 'purple' },
    1460: { name: '베이비의 신발 Lv2', color: 'purple' },
    1461: { name: '메탈쿠우라(약해진) 소환피리', color: 'cyan' },
    1463: { name: '브로리의 최종힘[고유]', color: 'rainbow' },
    1465: { name: '베지트의 체력장갑', color: 'cyan' },
    1466: { name: '베지트의 전투장갑', color: 'cyan' },
    1467: { name: '베지트의 기력장갑', color: 'cyan' },
    1468: { name: '베지트의 체력반지', color: 'cyan' },
    1469: { name: '베지트의 전투반지', color: 'cyan' },
    1470: { name: '베지트의 기력반지', color: 'cyan' },
    1471: { name: '베지트의 만능반지 [유물]', color: 'rainbow' },
    1472: { name: '베지트의 신발 [영웅]', color: 'rainbow' },
    1473: { name: '베지트의 도복 [영웅]', color: 'rainbow' },
    1474: { name: '베지트의 만능장갑 [영웅]', color: 'rainbow' },
    1476: { name: '단풍잎[Event]', color: 'standard' },
    1482: { name: '손오반의 힘[고유]', color: 'rainbow' },
    1484: { name: '영웅의 신전', color: 'rainbow' },
    1485: { name: '영웅의 신전 조합서', color: 'rainbow' },
    1491: { name: '자연의 물약lv2', color: 'standard' },
    1492: { name: '명예의 주화[event]', color: 'standard' },
    1493: { name: '타레스의 반지 [전설]', color: 'red' },
    1494: { name: '타레스의 보물반지 [전설]', color: 'red' }
};

// DOM Elements
const searchForm = document.getElementById('search-form');
const nicnameInput = document.getElementById('nicname-input');
const playerProfile = document.getElementById('player-profile');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');

// Dashboard Columns
const columns = {
    basic: document.getElementById('col-basic'),
    detail: document.getElementById('col-detail'),
    equip: document.getElementById('col-equip'),
    bag: document.getElementById('col-bag'),
    hell: document.getElementById('col-hell'),
    db: document.getElementById('col-db'),
    potion: document.getElementById('col-potion'),
    other: document.getElementById('col-other'),
    link: document.getElementById('col-link'),
    rank: document.getElementById('col-rank')
};

// Dashboard Column Section wrappers for active tab display
const columnSections = {
    basic: document.getElementById('col-basic').closest('.grid-column'),
    detail: document.getElementById('col-detail').closest('.grid-column'),
    equip: document.getElementById('col-equip').closest('.grid-column'),
    bag: document.getElementById('col-bag').closest('.grid-column'),
    hell: document.getElementById('col-hell').closest('.grid-column'),
    db: document.getElementById('col-db').closest('.grid-column'),
    potion: document.getElementById('col-potion').closest('.grid-column'),
    other: document.getElementById('col-other').closest('.grid-column'),
    link: document.getElementById('col-link').closest('.grid-column'),
    rank: document.getElementById('col-rank').closest('.grid-column')
};

// Switch active category tab
function switchTab(category) {
    // 1. Toggle active class on tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. Toggle active class on column sections
    for (let key in columnSections) {
        if (columnSections[key]) {
            const isRankTab = ['user-rank', 'contrib-rank', 'passion-rank'].includes(category);
            const isMatch = (key === category) || (key === 'rank' && isRankTab);
            if (isMatch) {
                columnSections[key].classList.add('active');
            } else {
                columnSections[key].classList.remove('active');
            }
        }
    }
}



// Utility: Get awakening level for a slot using SLOT_TO_UPBOOK reverse map
// PDATA1[upBookIdx - 1] = awakening level for that character
function getAwakeningLevel(pdata1Arr, slotNumInt) {
    if (!pdata1Arr || pdata1Arr.length === 0) return 0;
    const upBookIdx = SLOT_TO_UPBOOK[slotNumInt];
    if (upBookIdx === undefined) return 0;
    const arrIdx = upBookIdx - 1; // 0-based
    if (arrIdx >= 0 && arrIdx < pdata1Arr.length) {
        return pdata1Arr[arrIdx] || 0;
    }
    return 0;
}

// Utility: Format numbers with commas
function formatNumber(num) {
    if (num === undefined || num === null || isNaN(num)) return '0';
    return Number(num).toLocaleString('ko-KR');
}

// Utility: Format stat with max limit display
function formatStatWithMax(current, max) {
    const curVal = parseInt(current) || 0;
    const maxVal = parseInt(max) || 0;
    if (curVal >= maxVal) {
        return formatNumber(maxVal);
    }
    return `${formatNumber(curVal)} / ${formatNumber(maxVal)}`;
}

// Utility: Format percentages
function formatPercent(num) {
    if (num === undefined || num === null || isNaN(num)) return '0%';
    return num + '%';
}

// Utility: Decode Base64 to Comma-Separated Array
function decodeBase64ToArray(b64Str) {
    if (!b64Str) return [];
    try {
        const decodedStr = atob(b64Str.trim());
        return decodedStr.split(',').map(s => s.trim());
    } catch (e) {
        console.error("Failed to decode base64 string:", b64Str, e);
        return [];
    }
}

// Utility: Format Date string (MM/DD/YYYY HH:MM:SS -> Korean format)
function formatKoreanDate(dateStr) {
    if (!dateStr) return '저장 정보 없음';
    const match = dateStr.match(/^(\d+)\/(\d+)\/(\d+)\s+(\d+):(\d+):(\d+)$/);
    if (match) {
        const [_, month, day, year, hour, minute, second] = match;
        const hr = parseInt(hour);
        const ampm = hr >= 12 ? '오후' : '오전';
        const displayHour = hr > 12 ? hr - 12 : (hr === 0 ? 12 : hr);
        return `${year}년 ${month}월 ${day}일 ${ampm} ${String(displayHour).padStart(2, '0')}:${minute}:${second}`;
    }
    return dateStr;
}



// TT_TYPE1 Grade Mapping
const TT_GRADE_MAPPING = {
    0: '아이언',
    1: '브론즈',
    2: '실버',
    3: '골드',
    4: '다이아',
    5: '마스터',
    6: '그랜드',
    7: '챌린저',
    8: '조커',
    9: '로얄',
    10: 'G.O.D',
    11: 'SUPER G.O.D'
};

const GRADE_MULTIPLIERS = {
    0: { own: 70, friend: 50 },
    1: { own: 100, friend: 70 },
    2: { own: 130, friend: 90 },
    3: { own: 160, friend: 110 },
    4: { own: 190, friend: 130 },
    5: { own: 220, friend: 150 },
    6: { own: 250, friend: 170 },
    7: { own: 280, friend: 190 },
    8: { own: 310, friend: 210 },
    9: { own: 340, friend: 230 },
    10: { own: 370, friend: 250 },
    11: { own: 400, friend: 270 }
};

// Utility: Get Adventure Stage name from progress value
function getAdventureStage(val) {
    const v = parseInt(val) || 0;
    if (v < 67) return "태초";
    if (v < 301) return "오자루";
    if (v < 460) return "나메물약";
    if (v < 751) return "셀주";
    if (v < 1001) return "마인물약";
    if (v < 1502) return "부우물약";
    if (v < 2000) return "평화물약";
    if (v < 2501) return "사이어맨";
    if (v < 3001) return "학습물약";
    if (v < 3501) return "우부";
    if (v < 4001) return "학물LV2";
    if (v < 4501) return "인조물약";
    if (v < 5001) return "13호";
    if (v < 6001) return "변화의물약";
    if (v < 7001) return "비델사탄";
    if (v < 7501) return "변화의물약2";
    if (v < 8501) return "어둠의물약";
    if (v < 9001) return "어둠의물약2";
    if (v < 10001) return "다크사우르스";
    if (v < 11001) return "슈퍼13호";
    if (v < 12001) return "초1라데츠";
    if (v < 13000) return "나무꾼의물약";
    if (v < 13001) return "스테이지7";
    if (v < 14001) return "초3라데츠";
    if (v < 15001) return "약탈꾼의물약";
    if (v < 16001) return "거대 오자루";
    if (v < 17001) return "그림자물약";
    if (v < 18001) return "자연의물약";
    if (v < 19001) return "타차원 오우거";
    if (v < 20001) return "자연의 물약Lv2";
    if (v < 21001) return "타레스";
    return "개발중";
}

// Render Equipment Card (for 장비현황 tab)
function createEquipmentCard(char) {
    const card = document.createElement('div');
    card.className = 'equip-card';

    // Name Row
    const nameRow = document.createElement('div');
    nameRow.className = 'char-name-row';
    const nameSpan = document.createElement('span');
    // Name color: green if attended today
    nameSpan.className = char.isTodaySave ? 'char-name char-name--attended' : 'char-name';
    nameSpan.textContent = char.name;
    nameRow.appendChild(nameSpan);

    if (char.isCorrupted) {
        const errorBadge = document.createElement('span');
        errorBadge.className = 'char-error-badge';
        errorBadge.textContent = '오류';
        nameRow.appendChild(errorBadge);
    }
    if (char.isLatestSave) {
        const latestBadge = document.createElement('span');
        latestBadge.className = 'char-latest-badge char-latest-top';
        latestBadge.textContent = '제일마지막저장';
        nameRow.appendChild(latestBadge);
    }
    if (char.isTodaySave) {
        const attendBadge = document.createElement('span');
        attendBadge.className = 'char-attend-badge';
        attendBadge.textContent = '출첵완';
        nameRow.appendChild(attendBadge);
    } else if (char.missedDays > 0) {
        const missedBadge = document.createElement('span');
        const maxDays = 7 + (char.ttType !== undefined ? char.ttType : 2);
        const ratio = char.missedDays / maxDays;
        const severity = ratio >= 0.7 ? 'high' : ratio >= 0.4 ? 'mid' : 'low';
        missedBadge.className = `char-missed-badge char-missed-${severity}`;
        missedBadge.textContent = `${char.missedDays}d`;
        missedBadge.title = `미접속 ${char.missedDays}일 (상한 ${maxDays}일)`;
        nameRow.appendChild(missedBadge);
    }
    card.appendChild(nameRow);

    // Equip List container
    const equipList = document.createElement('div');
    equipList.className = 'equip-list';

    // Helper to render individual item with color styling
    function renderItem(itemId) {
        const item = ITEM_MAPPING[itemId] || { name: `아이템 ${itemId}`, color: 'standard' };
        const itemDiv = document.createElement('div');
        itemDiv.className = `equip-item item-${item.color} equip-item-clickable`;
        itemDiv.textContent = item.name;
        itemDiv.setAttribute('onclick', `showItemModal(${itemId})`);
        return itemDiv;
    }

    // 1. Render My items
    if (char.myItems && char.myItems.length > 0) {
        char.myItems.forEach(itemId => {
            equipList.appendChild(renderItem(itemId));
        });
    }

    // 2. Render Friend Divider (always show separator matching screenshot)
    const divider = document.createElement('div');
    divider.className = 'equip-divider';
    divider.textContent = '친구';
    equipList.appendChild(divider);

    // 3. Render Friend items
    if (char.friendItems && char.friendItems.length > 0) {
        char.friendItems.forEach(itemId => {
            equipList.appendChild(renderItem(itemId));
        });
    }

    card.appendChild(equipList);
    return card;
}

// Render Backpack Card (for 배낭현황 tab)
function createBackpackCard(char) {
    const card = document.createElement('div');
    card.className = 'equip-card bag-card';

    // Name Row
    const nameRow = document.createElement('div');
    nameRow.className = 'char-name-row';
    const nameSpan = document.createElement('span');
    nameSpan.className = char.isTodaySave ? 'char-name char-name--attended' : 'char-name';
    nameSpan.textContent = char.name;
    nameRow.appendChild(nameSpan);

    if (char.isCorrupted) {
        const errorBadge = document.createElement('span');
        errorBadge.className = 'char-error-badge';
        errorBadge.textContent = '오류';
        nameRow.appendChild(errorBadge);
    }
    if (char.isLatestSave) {
        const latestBadge = document.createElement('span');
        latestBadge.className = 'char-latest-badge char-latest-top';
        latestBadge.textContent = '제일마지막저장';
        nameRow.appendChild(latestBadge);
    }
    if (char.isTodaySave) {
        const attendBadge = document.createElement('span');
        attendBadge.className = 'char-attend-badge';
        attendBadge.textContent = '출첵완';
        nameRow.appendChild(attendBadge);
    } else if (char.missedDays > 0) {
        const missedBadge = document.createElement('span');
        const maxDays = 7 + (char.ttType !== undefined ? char.ttType : 2);
        const ratio = char.missedDays / maxDays;
        const severity = ratio >= 0.7 ? 'high' : ratio >= 0.4 ? 'mid' : 'low';
        missedBadge.className = `char-missed-badge char-missed-${severity}`;
        missedBadge.textContent = `${char.missedDays}d`;
        missedBadge.title = `미접속 ${char.missedDays}일 (상한 ${maxDays}일)`;
        nameRow.appendChild(missedBadge);
    }
    card.appendChild(nameRow);

    // Section Renderer helper
    function renderSection(title, items, icon) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'bag-section';
        sectionDiv.style.marginTop = '12px';

        const titleEl = document.createElement('div');
        titleEl.className = 'bag-section-title';
        titleEl.style.fontSize = '0.82rem';
        titleEl.style.fontWeight = 'bold';
        titleEl.style.color = 'var(--cyan)';
        titleEl.style.marginBottom = '6px';
        titleEl.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
        titleEl.style.paddingBottom = '3px';
        titleEl.innerHTML = `${icon} ${title}`;
        sectionDiv.appendChild(titleEl);

        const listDiv = document.createElement('div');
        listDiv.style.display = 'flex';
        listDiv.style.flexDirection = 'column';
        listDiv.style.gap = '4px';

        if (items && items.length > 0) {
            items.forEach(itemInfo => {
                const item = ITEM_MAPPING[itemInfo.id] || { name: `아이템 ${itemInfo.id}`, color: 'standard' };
                const itemRow = document.createElement('div');
                itemRow.className = 'bag-item-row';
                itemRow.style.display = 'flex';
                itemRow.style.justifyContent = 'space-between';
                itemRow.style.alignItems = 'center';
                itemRow.style.padding = '4px 8px';
                itemRow.style.borderRadius = '4px';
                itemRow.style.background = 'rgba(255, 255, 255, 0.02)';
                itemRow.style.border = '1px solid rgba(255, 255, 255, 0.05)';

                const nameEl = document.createElement('span');
                nameEl.className = `equip-item item-${item.color} equip-item-clickable`;
                nameEl.textContent = item.name;
                nameEl.style.fontSize = '0.8rem';
                nameEl.setAttribute('onclick', `showItemModal(${itemInfo.id})`);

                const countEl = document.createElement('span');
                countEl.style.fontSize = '0.78rem';
                countEl.style.fontWeight = '750';
                countEl.style.color = itemInfo.count > 0 ? 'var(--gold)' : 'var(--text-muted)';
                countEl.textContent = itemInfo.count > 0 ? `${itemInfo.count}개` : '소지';

                itemRow.appendChild(nameEl);
                itemRow.appendChild(countEl);
                listDiv.appendChild(itemRow);
            });
        } else {
            const emptyEl = document.createElement('div');
            emptyEl.style.fontSize = '0.75rem';
            emptyEl.style.color = 'var(--text-muted)';
            emptyEl.style.fontStyle = 'italic';
            emptyEl.style.paddingLeft = '6px';
            emptyEl.textContent = '비어있음';
            listDiv.appendChild(emptyEl);
        }

        sectionDiv.appendChild(listDiv);
        return sectionDiv;
    }

    const bagContainer = document.createElement('div');
    bagContainer.className = 'bag-sections-container';
    bagContainer.style.cssText = 'display: flex; flex-direction: column; gap: 10px; width: 100%;';
    
    // 기본 배낭 아이템
    bagContainer.appendChild(renderSection('배낭 아이템', char.backpackItems, '🎒'));

    // 창고배낭1~4 중 아이템이 있는 가방만
    const activeWarehouseBags = (char.warehouseBags || []).map((bagItems, idx) => ({
        idx: idx + 1,
        items: bagItems
    })).filter(b => b.items.length > 0);

    if (activeWarehouseBags.length > 0) {
        const whHeader = document.createElement('div');
        whHeader.style.cssText = 'font-size:0.8rem;font-weight:bold;color:var(--gold);margin-top:10px;margin-bottom:4px;border-top:1px solid rgba(255,255,255,0.08);padding-top:8px;';
        whHeader.textContent = '📦 창고배낭';
        bagContainer.appendChild(whHeader);

        const gridDiv = document.createElement('div');
        gridDiv.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; width: 100%;';
        
        activeWarehouseBags.forEach(bag => {
            gridDiv.appendChild(renderSection(`창고배낭${bag.idx}`, bag.items, '📦'));
        });
        bagContainer.appendChild(gridDiv);
    }

    // 후원창고배낭1~4 중 아이템이 있는 가방만
    const activeSponsorBags = (char.sponsorWarehouseBags || []).map((bagItems, idx) => ({
        idx: idx + 1,
        items: bagItems
    })).filter(b => b.items.length > 0);

    if (activeSponsorBags.length > 0) {
        const spHeader = document.createElement('div');
        spHeader.style.cssText = 'font-size:0.8rem;font-weight:bold;color:var(--cyan);margin-top:10px;margin-bottom:4px;border-top:1px solid rgba(255,255,255,0.08);padding-top:8px;';
        spHeader.textContent = '🎁 후원창고배낭';
        bagContainer.appendChild(spHeader);

        const gridDiv = document.createElement('div');
        gridDiv.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; width: 100%;';

        activeSponsorBags.forEach(bag => {
            gridDiv.appendChild(renderSection(`후원창고배낭${bag.idx}`, bag.items, '🎁'));
        });
        bagContainer.appendChild(gridDiv);
    }

    card.appendChild(bagContainer);

    return card;
}

// Render Account Figures Card
function createFiguresCard(data) {
    const card = document.createElement('div');
    card.className = 'char-card figures-card';

    const nameRow = document.createElement('div');
    nameRow.className = 'char-name-row';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'char-name';
    nameSpan.textContent = '🏆 계정 피규어 현황';
    nameRow.appendChild(nameSpan);
    card.appendChild(nameRow);

    const statsBlock = document.createElement('div');
    statsBlock.className = 'char-stats-block';

    const figGrid = document.createElement('div');
    figGrid.className = 'figures-grid';

    let totalFigures = 0;
    for (let i = 1; i <= 10; i++) {
        const val = parseInt(data[`SPON_POKET${i}`]) || 0;
        totalFigures += val;

        const figItem = document.createElement('div');
        figItem.className = 'fig-item';
        figItem.innerHTML = `<span class="fig-label">피규어 ${i}</span><span class="fig-val ${val > 0 ? 'active' : ''}">${val}개</span>`;
        figGrid.appendChild(figItem);
    }

    const totalDiv = document.createElement('div');
    totalDiv.className = 'fig-total';
    totalDiv.innerHTML = `총 피규어 개수: <span>${totalFigures}개</span>`;

    statsBlock.appendChild(figGrid);
    statsBlock.appendChild(totalDiv);
    card.appendChild(statsBlock);

    return card;
}

// Render Account Link Points Card
function createLinkPointsCard(data) {
    const card = document.createElement('div');
    card.className = 'char-card link-points-card';

    const nameRow = document.createElement('div');
    nameRow.className = 'char-name-row';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'char-name';
    nameSpan.textContent = '🔗 계정 링크포인트 현황';
    nameRow.appendChild(nameSpan);
    card.appendChild(nameRow);

    const statsBlock = document.createElement('div');
    statsBlock.className = 'char-stats-block';

    const linkGrid = document.createElement('div');
    linkGrid.className = 'link-points-grid';

    let totalLinkPoints = 0;
    for (let i = 1; i <= 61; i++) {
        const charName = LINK_NAME_MAPPING[i] || `캐릭터 ${i}`;
        const val = parseInt(data[`LINK_${i}`]) || 0;
        totalLinkPoints += val;

        const linkItem = document.createElement('div');
        linkItem.className = 'link-item';
        linkItem.innerHTML = `<span class="link-item-label">${charName}</span><span class="link-item-val ${val > 0 ? 'active' : ''}">${formatNumber(val)}</span>`;
        linkGrid.appendChild(linkItem);
    }

    const totalDiv = document.createElement('div');
    totalDiv.className = 'link-total';
    totalDiv.innerHTML = `총 링크 포인트: <span>${formatNumber(totalLinkPoints)}</span>`;

    statsBlock.appendChild(linkGrid);
    statsBlock.appendChild(totalDiv);
    card.appendChild(statsBlock);

    return card;
}

// Render Character Card
function createCharacterCard(char) {
    const card = document.createElement('div');
    card.className = 'char-card';

    // Name Row
    const nameRow = document.createElement('div');
    nameRow.className = 'char-name-row';

    // Name color: green if attended today
    const nameSpan = document.createElement('span');
    nameSpan.className = char.isTodaySave ? 'char-name char-name--attended' : 'char-name';
    nameSpan.textContent = char.name;
    nameRow.appendChild(nameSpan);

    if (char.isCorrupted) {
        const errorBadge = document.createElement('span');
        errorBadge.className = 'char-error-badge';
        errorBadge.textContent = '오류';
        nameRow.appendChild(errorBadge);
    }
    if (char.isLatestSave) {
        const latestBadge = document.createElement('span');
        latestBadge.className = 'char-latest-badge char-latest-top';
        latestBadge.textContent = '제일마지막저장';
        nameRow.appendChild(latestBadge);
    }
    if (char.isTodaySave) {
        const attendBadge = document.createElement('span');
        attendBadge.className = 'char-attend-badge';
        attendBadge.textContent = '출첵완';
        nameRow.appendChild(attendBadge);
    } else if (char.missedDays > 0) {
        const missedBadge = document.createElement('span');
        const maxDays = 7 + (char.ttType !== undefined ? char.ttType : 2);
        const ratio = char.missedDays / maxDays;
        const severity = ratio >= 0.7 ? 'high' : ratio >= 0.4 ? 'mid' : 'low';
        missedBadge.className = `char-missed-badge char-missed-${severity}`;
        missedBadge.textContent = `${char.missedDays}d`;
        missedBadge.title = `미접속 ${char.missedDays}일 (상한 ${maxDays}일)`;
        nameRow.appendChild(missedBadge);
    }
    card.appendChild(nameRow);

    // Body container holding two halves
    const bodyContainer = document.createElement('div');
    bodyContainer.className = 'char-card-body';

    // Left Column (Standard Stats)
    const leftCol = document.createElement('div');
    leftCol.className = 'char-card-left';

    // 8가지 만스텟 조건 판정
    const isLvlMaxed = (parseInt(char.level) || 0) >= 6000;
    const isAdvMaxed = (parseInt(char.adventure) || 0) >= 21001;
    const cpValueForMax = typeof char.cp === 'string' ? parseInt(char.cp.replace(/,/g, '')) : parseInt(char.cp);
    const isCpMaxedForAll = (cpValueForMax || 0) >= 600000;
    const isStarMaxed = char.starGrade && (char.starGrade.replace(/\s+/g, '') === '닼레8' || char.starGrade.replace(/\s+/g, '') === '다크레드8');
    const isLimitMaxed = char.limit !== undefined && char.limit !== null && (parseInt(char.limit) || 0) >= 10;
    const isOwnStrMaxed = char.str && char.maxOwnStat && parseInt(char.str.toString().replace(/,/g, '')) >= parseInt(char.maxOwnStat.toString().replace(/,/g, ''));
    const isOwnAgiMaxed = char.agi && char.maxOwnStat && parseInt(char.agi.toString().replace(/,/g, '')) >= parseInt(char.maxOwnStat.toString().replace(/,/g, ''));
    const isOwnIntMaxed = char.intVal && char.maxOwnStat && parseInt(char.intVal.toString().replace(/,/g, '')) >= parseInt(char.maxOwnStat.toString().replace(/,/g, ''));
    
    const isAllMaxed = isLvlMaxed && isAdvMaxed && isCpMaxedForAll && isStarMaxed && isLimitMaxed && isOwnStrMaxed && isOwnAgiMaxed && isOwnIntMaxed;
    if (isAllMaxed) {
        card.className += ' char-card-all-maxed';
    }

    // Level
    const baseName = LINK_NAME_MAPPING[char.slotNum];
    const maxSpd = (MAX_SPEED_MAPPING[char.name] !== undefined ? MAX_SPEED_MAPPING[char.name] : (MAX_SPEED_MAPPING[baseName] !== undefined ? MAX_SPEED_MAPPING[baseName] : '-'));
    const lvlDiv = document.createElement('div');
    lvlDiv.className = 'char-level';
    lvlDiv.innerHTML = `<span class="stat-label">레벨:</span> <span class="stat-value ${isLvlMaxed ? 'stat-val-maxed' : ''}">${formatNumber(char.level)}</span> <span style="font-size:0.75rem; color:var(--text-muted); margin-left:6px;">(최대공속: ${maxSpd})</span>`;
    leftCol.appendChild(lvlDiv);

    // Adventure
    const advDiv = document.createElement('div');
    advDiv.className = 'char-adventure';
    const stageName = getAdventureStage(char.adventure);
    advDiv.innerHTML = `<span class="stat-label">모험:</span> <span class="stat-value ${isAdvMaxed ? 'stat-val-maxed' : ''}">${formatNumber(char.adventure)} (${stageName})</span>`;
    leftCol.appendChild(advDiv);

    // Row 1: 공격력, 방어력, 기
    const row1 = document.createElement('div');
    row1.className = 'stat-row-3col';
    row1.innerHTML = `
        <span><span class="stat-label">공격력:</span> <span class="stat-value">${formatNumber(char.attack)}</span></span>
        <span><span class="stat-label">방어력:</span> <span class="stat-value">${formatNumber(char.defense)}</span></span>
        <span><span class="stat-label">기:</span> <span class="stat-value">${formatNumber(char.ki)}</span></span>
    `;
    leftCol.appendChild(row1);

    // Row 2: 체력, 공속, 불굴
    const row2 = document.createElement('div');
    row2.className = 'stat-row-3col';
    row2.innerHTML = `
        <span><span class="stat-label">체력:</span> <span class="stat-value">${formatNumber(char.hp)}</span></span>
        <span><span class="stat-label">공속:</span> <span class="stat-value">${formatNumber(char.speed)}</span></span>
        <span><span class="stat-label">불굴:</span> <span class="stat-value">${formatNumber(char.fortitude)}</span></span>
    `;
    leftCol.appendChild(row2);

    const cpValue = typeof char.cp === 'string' ? parseInt(char.cp.replace(/,/g, '')) : parseInt(char.cp);
    const isCpMaxed = (cpValue || 0) >= 600000;
    const cpRow = document.createElement('div');
    cpRow.className = 'char-cp';
    let cpHtml = `<span class="stat-label">투력:</span> <span class="stat-value ${isCpMaxed ? 'cp-maxed-completed' : ''}">${formatNumber(char.cp)}</span>`;
    if (char.awakeningLevel > 0) {
        cpHtml += `<span class="char-awakening-badge"><span class="stat-label">각성:</span> <span class="stat-value">${char.awakeningLevel}</span></span>`;
    }
    cpRow.innerHTML = cpHtml;
    leftCol.appendChild(cpRow);

    // Limit Block
    if (char.limit !== undefined && char.limit !== null) {
        const limitBlock = document.createElement('div');
        limitBlock.className = 'char-limit-block';

        const limitHeader = document.createElement('div');
        limitHeader.className = 'limit-title';
        limitHeader.innerHTML = `<span class="stat-label">극한:</span> <span class="stat-value ${isLimitMaxed ? 'stat-val-maxed' : ''}">${formatNumber(char.limit)}</span> <small style="font-size:0.7rem; color:var(--text-muted); font-weight:normal;">(<span class="stat-value">${formatNumber(char.limitPt)}</span>pt)</small>`;
        limitBlock.appendChild(limitHeader);

        const limitStats = document.createElement('div');
        limitStats.className = 'stat-row';
        limitStats.innerHTML = `<span><span class="stat-label">근력:</span> <span class="stat-value">${formatNumber(char.strength)}</span></span><span class="alt-value"><span class="stat-label">근성:</span> <span class="stat-value">${formatNumber(char.grit)}</span></span>`;
        limitBlock.appendChild(limitStats);

        const limitStats2 = document.createElement('div');
        limitStats2.className = 'stat-row';
        limitStats2.innerHTML = `<span><span class="stat-label">탐구:</span> <span class="stat-value">${formatNumber(char.search)}</span></span><span class="alt-value"><span class="stat-label">행운:</span> <span class="stat-value">${formatNumber(char.luck)}</span></span>`;
        limitBlock.appendChild(limitStats2);

        leftCol.appendChild(limitBlock);
    }

    bodyContainer.appendChild(leftCol);

    card.appendChild(bodyContainer);

    // Bottom Stats Section: 
    const isOwnMaxed = (parseInt(char.str)||0) >= (parseInt(char.maxOwnStat)||0) &&
                       (parseInt(char.agi)||0) >= (parseInt(char.maxOwnStat)||0) &&
                       (parseInt(char.intVal)||0) >= (parseInt(char.maxOwnStat)||0);
    const isFriendMaxed = (parseInt(char.friendStr)||0) >= (parseInt(char.maxFriendStat)||0) &&
                          (parseInt(char.friendAgi)||0) >= (parseInt(char.maxFriendStat)||0) &&
                          (parseInt(char.friendInt)||0) >= (parseInt(char.maxFriendStat)||0);
    const ownMaxedClass = isOwnMaxed ? 'stat-maxed-completed' : '';
    const friendMaxedClass = isFriendMaxed ? 'stat-maxed-completed' : '';

    const bottomStats = document.createElement('div');
    bottomStats.className = 'char-card-bottom-stats';
    bottomStats.innerHTML = `
        <div class="bottom-stats-col">
            <div class="stats-col-title">영웅</div>
            <div class="stat-row ${ownMaxedClass}"><span class="val-str"><span class="stat-label">힘:</span> <span class="stat-value ${parseInt(char.str.toString().replace(/,/g, '')) >= parseInt(char.maxOwnStat.toString().replace(/,/g, '')) ? 'stat-val-maxed' : ''}">${formatStatWithMax(char.str, char.maxOwnStat)}</span></span></div>
            <div class="stat-row ${ownMaxedClass}"><span class="val-agi"><span class="stat-label">민:</span> <span class="stat-value ${parseInt(char.agi.toString().replace(/,/g, '')) >= parseInt(char.maxOwnStat.toString().replace(/,/g, '')) ? 'stat-val-maxed' : ''}">${formatStatWithMax(char.agi, char.maxOwnStat)}</span></span></div>
            <div class="stat-row ${ownMaxedClass}"><span class="val-int"><span class="stat-label">지:</span> <span class="stat-value ${parseInt(char.intVal.toString().replace(/,/g, '')) >= parseInt(char.maxOwnStat.toString().replace(/,/g, '')) ? 'stat-val-maxed' : ''}">${formatStatWithMax(char.intVal, char.maxOwnStat)}</span></span></div>
            <div style="border-top:1px dashed var(--border-card); margin-top:4px; padding-top:4px; display:flex; flex-direction:column; gap:2px;">
                <div><span class="stat-label">성급:</span> <span class="stat-value val-star ${isStarMaxed ? 'stat-val-maxed' : ''}">${char.starGrade}</span></div>
                <div><span class="stat-label">도감:</span> <span class="stat-value val-dogam">-</span></div>
                <div><span class="stat-label">자동선두:</span> <span class="stat-value val-autosundu">${formatNumber(char.doGam)}</span></div>
            </div>
        </div>
        <div class="bottom-stats-col">
            <div class="stats-col-title friend-name-text">${char.friendName}</div>
            <div class="stat-row ${friendMaxedClass}"><span class="val-str"><span class="stat-label">힘:</span> <span class="stat-value ${parseInt(char.friendStr.toString().replace(/,/g, '')) >= parseInt(char.maxFriendStat.toString().replace(/,/g, '')) ? 'stat-val-maxed' : ''}">${formatStatWithMax(char.friendStr, char.maxFriendStat)}</span></span></div>
            <div class="stat-row ${friendMaxedClass}"><span class="val-agi"><span class="stat-label">민:</span> <span class="stat-value ${parseInt(char.friendAgi.toString().replace(/,/g, '')) >= parseInt(char.maxFriendStat.toString().replace(/,/g, '')) ? 'stat-val-maxed' : ''}">${formatStatWithMax(char.friendAgi, char.maxFriendStat)}</span></span></div>
            <div class="stat-row ${friendMaxedClass}"><span class="val-int"><span class="stat-label">지:</span> <span class="stat-value ${parseInt(char.friendInt.toString().replace(/,/g, '')) >= parseInt(char.maxFriendStat.toString().replace(/,/g, '')) ? 'stat-val-maxed' : ''}">${formatStatWithMax(char.friendInt, char.maxFriendStat)}</span></span></div>
            <div style="border-top:1px dashed var(--border-card); margin-top:4px; padding-top:4px; display:flex; flex-direction:column; gap:2px;">
                <div><span class="stat-label">금화:</span> <span class="stat-value val-gold">${formatNumber(char.gold)}</span></div>
                <div><span class="stat-label">금괴:</span> <span class="stat-value val-goldbar">${formatNumber(char.goldBars)}</span></div>
                <div><span class="stat-label">블다:</span> <span class="stat-value val-bluedia">${formatNumber(char.blueDiamonds)}</span></div>
            </div>
        </div>
    `;
    card.appendChild(bottomStats);

    return card;
}

// Fetch player rankings and update ranks in the independent ranks summary card (3 lines 1 column)
async function updatePlayerRanksInHeader(nickname) {
    const userRankVal = document.getElementById('header-user-rank');
    const contribRankVal = document.getElementById('header-contrib-rank');
    const passionRankVal = document.getElementById('header-passion-rank');
    
    // Set default empty state to "--"
    if (userRankVal) userRankVal.textContent = '--';
    if (contribRankVal) contribRankVal.textContent = '--';
    if (passionRankVal) passionRankVal.textContent = '--';

    try {
        const cleanNickname = nickname.toLowerCase().trim();
        
        // Fetch all three boards in parallel
        const [resUser, resContrib, resPassion] = await Promise.all([
            fetch('/api/rankings?board=' + encodeURIComponent('유저랭킹')).then(r => r.json()),
            fetch('/api/rankings?board=' + encodeURIComponent('기여랭킹')).then(r => r.json()),
            fetch('/api/rankings?board=' + encodeURIComponent('열정랭킹')).then(r => r.json())
        ]);

        let userRank = -1;
        let contribRank = -1;
        let passionRank = -1;

        if (resUser.success && resUser.rankings) {
            const found = resUser.rankings.find(r => r.nicname.toLowerCase().trim() === cleanNickname);
            if (found) userRank = found.rank;
        }
        if (resContrib.success && resContrib.rankings) {
            const found = resContrib.rankings.find(r => r.nicname.toLowerCase().trim() === cleanNickname);
            if (found) contribRank = found.rank;
        }
        if (resPassion.success && resPassion.rankings) {
            const found = resPassion.rankings.find(r => r.nicname.toLowerCase().trim() === cleanNickname);
            if (found) passionRank = found.rank;
        }

        // Render values
        if (userRankVal) {
            userRankVal.textContent = userRank !== -1 ? `${userRank}위` : '--';
        }
        if (contribRankVal) {
            contribRankVal.textContent = contribRank !== -1 ? `${contribRank}위` : '--';
        }
        if (passionRankVal) {
            passionRankVal.textContent = passionRank !== -1 ? `${passionRank}위` : '--';
        }
    } catch (e) {
        console.error("Failed to update player ranks in header:", e);
    }
}

// Fetch and Display Logs
async function fetchAndRenderLogs(nicName) {
    // UI transition
    loadingSpinner.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    playerProfile.classList.add('hidden');

    const warningEl = document.getElementById('corruption-warning');
    if (warningEl) {
        warningEl.classList.add('hidden');
    }

    // Clear columns
    for (let key in columns) {
        columns[key].innerHTML = '';
    }

    try {
        const response = await fetch(`/api/logs?nicName=${encodeURIComponent(nicName)}`);
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || '데이터 조회에 실패했습니다.');
        }

        const data = result.data;

        // 1. Render Player Header Metrics
        document.getElementById('player-name').textContent = result.nicName;
        updatePlayerRanksInHeader(result.nicName);

        const rankScore = data.RANK_SCORE || 0;
        
        // Render TT_TYPE1 (등급) in place of player-tier (removing Bronze/Diamond tiers)
        const ttType = data.TT_TYPE1 !== undefined ? data.TT_TYPE1 : '-';
        const ttGradeName = TT_GRADE_MAPPING[ttType] || `등급 ${ttType}`;
        
        const GRADE_ICONS = {
            0: '⚙️',   // 아이언
            1: '🥉',   // 브론즈
            2: '🥈',   // 실버
            3: '🥇',   // 골드
            4: '💎',   // 다이아
            5: '🔮',   // 마스터
            6: '🌟',   // 그랜드
            7: '🏆',   // 챌린저
            8: '🃏',   // 조커
            9: '👑',   // 로얄
            10: '⚡',  // G.O.D
            11: '🔥'   // SUPER G.O.D
        };
        const gradeIcon = GRADE_ICONS[ttType] || '🏆';

        document.getElementById('player-tier').textContent = ttGradeName;
        document.getElementById('tier-icon').textContent = gradeIcon;

        const gradeBadgeEl = document.getElementById('player-tt-grade');
        if (gradeBadgeEl) {
            gradeBadgeEl.style.display = 'none';
        }

        document.getElementById('stat-special-point').textContent = formatNumber(data.SPECIAL_POINT || 0);
        document.getElementById('stat-angel-point').textContent = formatNumber(data.AP || 0);
        document.getElementById('stat-rank-score').textContent = formatNumber(rankScore);
        document.getElementById('stat-season-point').textContent = formatNumber(data.SP || 0);
        document.getElementById('stat-rank-point').textContent = formatNumber(data.RANK_POINT || 0);
        // 블루다이아는 아래 캐릭터 데이터 복원 후 합산하여 대입함

        // Calculate Link Points
        let linkPointSum = 0;
        for (let key in data) {
            if (key.startsWith('LINK_')) {
                linkPointSum += parseInt(data[key]) || 0;
            }
        }
        document.getElementById('stat-link-point').textContent = formatNumber(linkPointSum);

        // Format Save Date
        document.getElementById('save-date').textContent = formatKoreanDate(result.latest_date);

        // 2. Decode Character Data
        const pdata1Arr = decodeBase64ToArray(data.PDATA1 || "").map(s => parseInt(s) || 0);
        const slotData = [];
        for (let key in data) {
            const match = key.match(/^DATA1_(\d+)$/);
            if (match) {
                const slotNum = match[1];
                const d1B64 = data[`DATA1_${slotNum}`];
                const d2B64 = data[`DATA2_${slotNum}`] || "";
                const d3B64 = data[`DATA3_${slotNum}`] || "";

                const d1 = decodeBase64ToArray(d1B64);
                const d2 = decodeBase64ToArray(d2B64);
                const d3 = decodeBase64ToArray(d3B64);

                if (d1.length > 72) {
                    const isCorrupted = d1.length !== 97 || (d1[0] !== "" && !/^\d+$/.test(d1[0]));
                    const charId = parseInt(d1[2]);

                    const slotNumInt = parseInt(slotNum);

                    let level = 0;
                    const rawLvlVal = parseInt(d1[17]) || 0;
                    const expVal = parseInt(d1[3]) || 0;

                    const expLvl = Math.floor(Math.sqrt(expVal / 25));
                    const rawLvlCalculated = Math.floor(rawLvlVal / 3.28);

                    if (Math.abs(rawLvlCalculated - expLvl) > 100) {
                        level = expLvl;
                    } else {
                        level = rawLvlCalculated;
                    }

                    const adv = parseInt(d1[16]) || 0;
                    const upgVal = parseInt(d1[72]) || 0;
                    const upgrade = upgVal >= 150 ? upgVal - 228 : upgVal;
                    const cp = parseInt(d1[55]) || 0;

                    // Stats
                    const attack = parseInt(d1[33]) || 0;
                    const defense = parseInt(d1[34]) || 0;
                    const ki = parseInt(d1[35]) || 0;
                    const hp = parseInt(d1[36]) || 0;
                    const speed = parseInt(d1[37]) || 0;
                    const awakening = parseInt(d1[38]) || 0;

                    const fortitude = d2.length > 12 ? parseInt(d2[12]) || 0 : 0;

                    // Limit Block
                    let limit = null, limitPt = 0, strength = 0, grit = 0, search = 0, luck = 0, saveDate = 0;
                    if (d3.length > 5) {
                        limit = parseInt(d3[0]) || 0;
                        limitPt = parseInt(d3[1]) || 0;
                        strength = parseInt(d3[2]) || 0;
                        grit = parseInt(d3[3]) || 0;
                        search = parseInt(d3[4]) || 0;
                        luck = parseInt(d3[5]) || 0;
                        saveDate = parseInt(d3[6]) || 0;
                    }

                    const myItems = [4, 6, 8, 10, 12, 14].map(idx => parseInt(d1[idx]) || 0).filter(id => id > 0);
                    const friendItems = [40, 42, 44, 46, 48, 50].map(idx => parseInt(d1[idx]) || 0).filter(id => id > 0);

                    let backpackItems = [];
                    // 창고배낭1~4: d1[71~82], d1[83~94], d2[14~25], d2[26~37] (각 6쌍)
                    let warehouseBags = [[], [], [], []];
                    // 후원창고배낭1~4: d2[38~49], d2[50~61], d2[62~73], d2[74~85] (각 6쌍)
                    let sponsorWarehouseBags = [[], [], [], []];

                    if (d1.length >= 95) {
                        // 진짜 개인 배낭 (기존의 warehouseItems)
                        const whStartIdx = 21;
                        for (let idx = whStartIdx; idx < 33; idx += 2) {
                            const itemId = parseInt(d1[idx]) || 0;
                            const count = parseInt(d1[idx + 1]) || 0;
                            if (itemId > 0 && count > 0) {
                                backpackItems.push({ id: itemId, count: count });
                            }
                        }

                        // 창고배낭 1 (d1[71~82])
                        for (let idx = 71; idx < 83; idx += 2) {
                            const itemId = parseInt(d1[idx]) || 0;
                            const count = parseInt(d1[idx + 1]) || 0;
                            if (itemId > 0) {
                                warehouseBags[0].push({ id: itemId, count: count });
                            }
                        }

                        // 창고배낭 2 (d1[83~94])
                        for (let idx = 83; idx < 95; idx += 2) {
                            const itemId = parseInt(d1[idx]) || 0;
                            const count = parseInt(d1[idx + 1]) || 0;
                            if (itemId > 0) {
                                warehouseBags[1].push({ id: itemId, count: count });
                            }
                        }
                    } else if (d1.length >= 88) {
                        // 진짜 개인 배낭 (기존의 warehouseItems)
                        const whStartIdx = 14;
                        for (let idx = whStartIdx; idx < 26; idx += 2) {
                            const itemId = parseInt(d1[idx]) || 0;
                            const count = parseInt(d1[idx + 1]) || 0;
                            if (itemId > 0 && count > 0) {
                                backpackItems.push({ id: itemId, count: count });
                            }
                        }

                        // 창고배낭 1 (d1[64~75])
                        for (let idx = 64; idx < 76; idx += 2) {
                            const itemId = parseInt(d1[idx]) || 0;
                            const count = parseInt(d1[idx + 1]) || 0;
                            if (itemId > 0) {
                                warehouseBags[0].push({ id: itemId, count: count });
                            }
                        }

                        // 창고배낭 2 (d1[76~87])
                        for (let idx = 76; idx < 88; idx += 2) {
                            const itemId = parseInt(d1[idx]) || 0;
                            const count = parseInt(d1[idx + 1]) || 0;
                            if (itemId > 0) {
                                warehouseBags[1].push({ id: itemId, count: count });
                            }
                        }
                    }

                    // 창고배낭 3 (d2[14~25])
                    if (d2.length >= 26) {
                        for (let idx = 14; idx < 26; idx += 2) {
                            const itemId = parseInt(d2[idx]) || 0;
                            const count = parseInt(d2[idx + 1]) || 0;
                            if (itemId > 0) {
                                warehouseBags[2].push({ id: itemId, count: count });
                            }
                        }
                    }

                    // 창고배낭 4 (d2[26~37])
                    if (d2.length >= 38) {
                        for (let idx = 26; idx < 38; idx += 2) {
                            const itemId = parseInt(d2[idx]) || 0;
                            const count = parseInt(d2[idx + 1]) || 0;
                            if (itemId > 0) {
                                warehouseBags[3].push({ id: itemId, count: count });
                            }
                        }
                    }

                    // 후원창고배낭 1~4 파싱 (d2[38~85], 각 배낭당 6쌍=12인덱스)
                    for (let bagIdx = 0; bagIdx < 4; bagIdx++) {
                        const bagStart = 38 + bagIdx * 12;
                        const bagEnd = bagStart + 12;
                        if (d2.length >= bagEnd) {
                            for (let idx = bagStart; idx < bagEnd; idx += 2) {
                                const itemId = parseInt(d2[idx]) || 0;
                                const count = parseInt(d2[idx + 1]) || 0;
                                if (itemId > 0) {
                                    sponsorWarehouseBags[bagIdx].push({ id: itemId, count: count });
                                }
                            }
                        }
                    }

                    // Item enhancement stats from d2: even idx=max, odd idx=current
                    const item1Max = d2.length > 14 ? parseInt(d2[14]) || 0 : 0;
                    const item1Cur = d2.length > 15 ? parseInt(d2[15]) || 0 : 0;
                    const item2Max = d2.length > 16 ? parseInt(d2[16]) || 0 : 0;
                    const item2Cur = d2.length > 17 ? parseInt(d2[17]) || 0 : 0;
                    const item3Max = d2.length > 18 ? parseInt(d2[18]) || 0 : 0;
                    const item3Cur = d2.length > 19 ? parseInt(d2[19]) || 0 : 0;
                    const fItem1Max = d2.length > 20 ? parseInt(d2[20]) || 0 : 0;
                    const fItem1Cur = d2.length > 21 ? parseInt(d2[21]) || 0 : 0;
                    const fItem2Max = d2.length > 22 ? parseInt(d2[22]) || 0 : 0;
                    const fItem2Cur = d2.length > 23 ? parseInt(d2[23]) || 0 : 0;
                    const fItem3Max = d2.length > 24 ? parseInt(d2[24]) || 0 : 0;
                    const fItem3Cur = d2.length > 25 ? parseInt(d2[25]) || 0 : 0;
                    // doGam from d3[9]
                    const doGam = d3.length > 9 ? parseInt(d3[9]) || 0 : 0;

                    const str = d1.length > 18 ? (parseInt(d1[18]) || 0) : 0;
                    const agi = d1.length > 19 ? (parseInt(d1[19]) || 0) : 0;
                    const intVal = d1.length > 20 ? (parseInt(d1[20]) || 0) : 0;
                    const friendStr = d1.length > 52 ? (parseInt(d1[52]) || 0) : 0;
                    const friendAgi = d1.length > 53 ? (parseInt(d1[53]) || 0) : 0;
                    const friendInt = d1.length > 54 ? (parseInt(d1[54]) || 0) : 0;
                    const friendSlot = d1.length > 95 ? (parseInt(d1[95]) || 0) : 0;
                    const friendExp = d1.length > 39 ? (parseInt(d1[39]) || 0) : 0;
                    const friendLevel = Math.floor(Math.sqrt(friendExp / 25));
                    const friendName = data[`FRIEND_NAME_${slotNum}`] || identifyFriendCharacter(d1B64, d2B64);

                    const gold = d1.length > 0 ? (parseInt(d1[0]) || 0) : 0;
                    const goldBars = d1.length > 1 ? (parseInt(d1[1]) || 0) : 0;
                    const blueDiamonds = d2.length > 95 ? (parseInt(d2[95]) || 0) : 0;

                    const charName = data[`HERO_DISPLAY_NAME_${slotNum}`] || LINK_NAME_MAPPING[slotNumInt] || `캐릭터 ${charId}`;
                    const category = SLOT_CATEGORY_MAPPING[slotNumInt] || 'other';
                    const awakeningLevel = getAwakeningLevel(pdata1Arr, slotNumInt);

                    const ttType = data.TT_TYPE1 !== undefined ? parseInt(data.TT_TYPE1) : 2;
                    const mults = GRADE_MULTIPLIERS[ttType] || GRADE_MULTIPLIERS[2];
                    const maxOwnStat = (adv + 1) * mults.own;
                    const maxFriendStat = (adv + 1) * mults.friend;

                    const starGradeVal = d1.length > 95 ? (parseInt(d1[95]) || 0) : 0;
                    const starGrade = getStarGrade(starGradeVal);

                    slotData.push({
                        slotNum: slotNumInt,
                        charId,
                        name: charName,
                        isCorrupted,
                        category,
                        level,
                        adventure: adv,
                        upgrade,
                        cp,
                        playtime: rawLvlVal,
                        attack,
                        defense,
                        ki,
                        hp,
                        speed,
                        awakening,
                        awakeningLevel,
                        fortitude,
                        limit,
                        limitPt,
                        strength,
                        grit,
                        search,
                        luck,
                        saveDate,
                        myItems,
                        friendItems,
                        backpackItems,
                        warehouseBags,
                        sponsorWarehouseBags,
                        item1Max, item1Cur, item2Max, item2Cur, item3Max, item3Cur,
                        fItem1Max, fItem1Cur, fItem2Max, fItem2Cur, fItem3Max, fItem3Cur,
                        doGam,
                        str,
                        agi,
                        intVal,
                        friendStr,
                        friendAgi,
                        friendInt,
                        friendSlot,
                        friendLevel,
                        friendName,
                        maxOwnStat,
                        maxFriendStat,
                        gold,
                        goldBars,
                        blueDiamonds,
                        ttType,
                        starGrade
                    });
                }
            }
        }

        // 3. Keep only the latest data per unique slot number (which is fixed per character)
        const charactersBySlot = {};
        slotData.forEach(char => {
            const existing = charactersBySlot[char.slotNum];
            if (!existing || char.saveDate > existing.saveDate) {
                charactersBySlot[char.slotNum] = char;
            }
        });
        const uniqueCharacters = Object.values(charactersBySlot);

        // 모든 캐릭터의 블루다이아 합산하여 상단 프로필에 반영
        let totalBlueDiamonds = 0;
        uniqueCharacters.forEach(char => {
            totalBlueDiamonds += char.blueDiamonds || 0;
        });
        document.getElementById('stat-blue-diamond').textContent = formatNumber(totalBlueDiamonds);

        // 제일마지막저장 판별:
        // 1. AJAX 플레이 로그(result.latest_log_character) 매칭
        // 2. 매칭 실패 시 d3[6] saveDate 최댓값 (같은 날이면 slotNum 높은 캐릭터 우선)
        let latestChar = null;
        if (result.latest_log_character && uniqueCharacters.length > 0) {
            const rawLogName = result.latest_log_character.replace(/\|c[0-9a-fA-F]{8}/g, '').replace(/\|r/g, '').replace(/『[^』]+』/g, '').replace(/\[.*?\]/g, '').trim();
            const cleanLogName = rawLogName.replace(/\s+/g, ''); // 공백 모두 제거해서 비교
            const mappingEntries = Object.entries(LINK_NAME_MAPPING)
                .map(([slot, name]) => ({ slot: parseInt(slot), name }))
                .sort((a, b) => b.name.length - a.name.length);
                
            let matchedSlot = null;
            for (const entry of mappingEntries) {
                const normEntryName = entry.name.replace(/\s+/g, '');
                if (cleanLogName.includes(normEntryName)) {
                    matchedSlot = entry.slot;
                    break;
                }
            }
            if (matchedSlot !== null) {
                latestChar = uniqueCharacters.find(c => c.slotNum === matchedSlot) || null;
            }
        }

        if (!latestChar && uniqueCharacters.length > 0) {
            latestChar = uniqueCharacters.reduce((best, c) => {
                const cDate = c.saveDate || 0, bestDate = best.saveDate || 0;
                if (cDate !== bestDate) return cDate > bestDate ? c : best;
                return c.slotNum > best.slotNum ? c : best;
            });
        }


        // Helper to parse MM/DD/YYYY HH:MM:SS to epoch ms
        function parseFullDate(dateStr) {
            if (!dateStr) return 0;
            const match = dateStr.match(/^(\d+)\/(\d+)\/(\d+)\s+(\d+):(\d+):(\d+)$/);
            if (!match) return 0;
            const [_, month, day, year, hour, minute, second] = match.map(Number);
            return new Date(year, month - 1, day, hour, minute, second).getTime();
        }

        // Helper to convert YYYYMMDD integer to timestamp
        function yyyymmddToTimestamp(yyyymmdd) {
            if (!yyyymmdd) return 0;
            const s = String(yyyymmdd);
            if (s.length !== 8) return 0;
            const year = parseInt(s.slice(0, 4));
            const month = parseInt(s.slice(4, 6));
            const day = parseInt(s.slice(6, 8));
            return new Date(year, month - 1, day, 0, 0, 0).getTime();
        }

        // Helper to parse MM/DD/YYYY to YYYYMMDD integer
        function getYYYYMMDD(dateStr) {
            if (!dateStr) return 0;
            const match = dateStr.match(/^(\d+)\/(\d+)\/(\d+)/);
            if (!match) return 0;
            return parseInt(match[3] + match[1].padStart(2, '0') + match[2].padStart(2, '0'));
        }

        // fullSaveTime 계산: 슬롯 업로드 시각 vs 인게임 저장날짜(d3[6]) 일치 여부로 판별
        // - 일치: 해당 슬롯 파일이 실제 저장 직후 업로드된 것 → 초 단위 정밀도 사용
        // - 불일치: 자동저장이 이전 데이터를 오늘 날짜로 재업로드한 것 → d3[6] 날짜만 사용
        const slotDates = result.slot_dates || {};
        uniqueCharacters.forEach(c => {
            const dateStr = slotDates[String(c.slotNum)];
            if (dateStr && c.saveDate === getYYYYMMDD(dateStr)) {
                // 업로드 날짜 == 인게임 저장날짜 → 수동저장 직후 업로드 → 초 단위 시간 사용
                c.fullSaveTime = parseFullDate(dateStr);
            } else if (result.latest_date && c.saveDate === getYYYYMMDD(result.latest_date)) {
                // slot_dates에 없지만 최신 업로드 날짜와 인게임 날짜가 일치 → 같은 배치로 저장됨
                c.fullSaveTime = parseFullDate(result.latest_date);
            } else {
                // 날짜 불일치 → 자동저장이 과거 데이터를 재업로드한 것 → 날짜만 사용 (시간 정밀도 없음)
                c.fullSaveTime = yyyymmddToTimestamp(c.saveDate);
            }
        });

        // Sort characters: corrupted first, then today's saves, then by slotNum
        // saveDate format: YYYYMMDD integer (KST)
        const nowKST = new Date(Date.now() + 9 * 60 * 60 * 1000); // UTC → KST
        const todayYYYYMMDD = parseInt(
            nowKST.getUTCFullYear().toString() +
            String(nowKST.getUTCMonth() + 1).padStart(2, '0') +
            String(nowKST.getUTCDate()).padStart(2, '0')
        );

        // Flag: saved today
        uniqueCharacters.forEach(c => {
            c.isTodaySave = !c.isCorrupted && (c.saveDate || 0) >= todayYYYYMMDD && c.saveDate > 0;
        });

        uniqueCharacters.forEach(c => {
            c.isLatestSave = latestChar !== null && c === latestChar;
        });

        uniqueCharacters.sort((a, b) => {
            if (a.isCorrupted && !b.isCorrupted) return -1;
            if (!a.isCorrupted && b.isCorrupted) return 1;
            if (a.isLatestSave && !b.isLatestSave) return -1;
            if (!a.isLatestSave && b.isLatestSave) return 1;
            if (a.isTodaySave && !b.isTodaySave) return -1;
            if (!a.isTodaySave && b.isTodaySave) return 1;
            return a.slotNum - b.slotNum;
        });

        // Calculate missed attendance days per character
        // Max cap scales with grade: 아이언(0)=7, 브론즈(1)=8, 실버(2)=9, 골드(3)=10, ...
        // Monthly reset: on the 1st of each month, non-attended characters show full maxDays
        function yyyymmddToDate(yyyymmdd) {
            const s = String(yyyymmdd);
            return new Date(+s.slice(0,4), +s.slice(4,6) - 1, +s.slice(6,8));
        }
        const todayDate = yyyymmddToDate(todayYYYYMMDD);
        const isFirstOfMonth = String(todayYYYYMMDD).slice(6, 8) === '01';
        uniqueCharacters.forEach(c => {
            if (!c.saveDate || c.saveDate <= 0 || c.isCorrupted) {
                c.missedDays = 0;
                return;
            }
            const maxDays = 7 + (c.ttType !== undefined ? c.ttType : 2);
            // On the 1st of month → monthly reset: if not saved today, show full cap
            if (isFirstOfMonth && !c.isTodaySave) {
                c.missedDays = maxDays;
                return;
            }
            const savedDate = yyyymmddToDate(c.saveDate);
            const msPerDay = 24 * 60 * 60 * 1000;
            const daysSinceSave = Math.floor((todayDate - savedDate) / msPerDay);
            c.missedDays = Math.min(daysSinceSave, maxDays);
        });

        // Check for corrupted characters and display warning at the top
        const corruptedChars = uniqueCharacters.filter(char => char.isCorrupted);
        const warningEl = document.getElementById('corruption-warning');
        const corruptedCharsListEl = document.getElementById('corrupted-chars-list');
        if (warningEl && corruptedCharsListEl) {
            corruptedCharsListEl.innerHTML = '';
            if (corruptedChars.length > 0) {
                corruptedChars.forEach(char => {
                    const badge = document.createElement('span');
                    badge.className = 'corrupted-char-badge';
                    badge.textContent = char.name;
                    corruptedCharsListEl.appendChild(badge);
                });
                warningEl.classList.remove('hidden');
            } else {
                warningEl.classList.add('hidden');
            }
        }

        // 4. Render cards to columns
        uniqueCharacters.forEach(char => {
            // Render stats cards to its specific category column (except equip tab)
            if (char.category !== 'equip' && char.category !== 'bag') {
                const card = createCharacterCard(char);
                const col = columns[char.category] || columns['other'];
                col.appendChild(card);
            }

            // Also render stats cards to the basic column (so basic contains all characters)
            if (char.category !== 'basic') {
                const cardClone = createCharacterCard(char);
                columns['basic'].appendChild(cardClone);
            }

            // Render equipment card to the equip column for ALL characters
            const equipCard = createEquipmentCard(char);
            columns['equip'].appendChild(equipCard);

            // Render backpack card to the bag column for ALL characters
            const backpackCard = createBackpackCard(char);
            columns['bag'].appendChild(backpackCard);
        });

        // Render Account Figures Card in "기타" (Other) Tab at the top
        const figuresCard = createFiguresCard(data);
        columns['other'].insertBefore(figuresCard, columns['other'].firstChild);

        // Render Account Link Points Card in "링크" (Link) Tab
        const linkPointsCard = createLinkPointsCard(data);
        columns['link'].appendChild(linkPointsCard);

        // 5. Fill empty columns with placeholders
        for (let key in columns) {
            if (columns[key].children.length === 0) {
                columns[key].innerHTML = '<div class="empty-placeholder">캐릭터가 없습니다</div>';
            }
        }

        // Show profile
        playerProfile.classList.remove('hidden');

        // Show basic tab by default on load (PC only)
        switchTab('basic');

        // 모바일이면 모바일 뷰로 전환
        applyResponsiveLayout(uniqueCharacters, data, result, totalBlueDiamonds);

    } catch (e) {
        console.error(e);
        errorText.textContent = e.message || '오류가 발생했습니다.';
        errorMessage.classList.remove('hidden');
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

// Form Submission Event
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nicName = nicnameInput.value.trim();
    if (nicName) {
        // 고정 체크 상태면 검색 시 로컬 스토리지에 유저명 즉시 갱신 저장
        const pinCheckbox = document.getElementById('pin-checkbox');
        if (pinCheckbox && pinCheckbox.checked) {
            localStorage.setItem('DRR_SINGLE_PINNED_USER', nicName);
        }
        fetchAndRenderLogs(nicName);
    }
});

// Fetch and Render Rankings Page
async function fetchAndRenderRankings(boardName = '유저랭킹') {
    const colRank = columns['rank'];
    if (!colRank) return;

    // Dynamically update the section header text
    const rankHeader = document.querySelector('.rank-header');
    if (rankHeader) {
        rankHeader.textContent = boardName;
    }

    try {
        colRank.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>랭킹 정보를 불러오는 중입니다...</p></div>';
        const response = await fetch('/api/rankings?board=' + encodeURIComponent(boardName));
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || '랭킹 데이터를 가져오지 못했습니다.');
        }

        const rankings = result.rankings || [];
        if (rankings.length === 0) {
            colRank.innerHTML = '<div class="empty-placeholder">등록된 랭킹 정보가 없습니다.</div>';
            return;
        }

        colRank.innerHTML = '';

        // Slice into 3 ranges: 1-50, 51-100, 101-150
        const slices = [
            { label: '1위 ~ 50위', range: [0, 50] },
            { label: '51위 ~ 100위', range: [50, 100] },
            { label: '101위 ~ 150위', range: [100, 150] }
        ];

        let titleEmoji = '🏆';
        if (boardName === '기여랭킹') titleEmoji = '🎖️';
        else if (boardName === '열정랭킹') titleEmoji = '🔥';

        const boardTitle = boardName === '유저랭킹' ? '유저 랭킹' : boardName === '기여랭킹' ? '기여 랭킹' : '열정 랭킹';

        slices.forEach(slice => {
            const subRankings = rankings.slice(slice.range[0], slice.range[1]);
            if (subRankings.length === 0) return;

            // Create a card holding the rankings list
            const card = document.createElement('div');
            card.className = 'char-card rankings-card';

            const nameRow = document.createElement('div');
            nameRow.className = 'char-name-row';
            const nameSpan = document.createElement('span');
            nameSpan.className = 'char-name';
            nameSpan.textContent = `${titleEmoji} ${boardTitle} (${slice.label})`;
            nameRow.appendChild(nameSpan);
            card.appendChild(nameRow);

            const tableContainer = document.createElement('div');
            tableContainer.className = 'rankings-table-container';

            const table = document.createElement('table');
            table.className = 'rankings-table';

            // Table Header
            const thead = document.createElement('thead');
            
            let scoreHeader = '랭킹점수';
            if (boardName === '기여랭킹') scoreHeader = '기여도';
            else if (boardName === '열정랭킹') scoreHeader = '열정점수';

            thead.innerHTML = `
                <tr>
                    <th style="width: 20%; text-align: center;">순위</th>
                    <th style="width: 50%; text-align: left;">닉네임</th>
                    <th style="width: 30%; text-align: right;">${scoreHeader}</th>
                </tr>
            `;
            table.appendChild(thead);

            // Table Body
            const tbody = document.createElement('tbody');
            subRankings.forEach(item => {
                const tr = document.createElement('tr');
                
                // Format rank with medals for top 3
                let rankDisplay = item.rank;
                if (item.rank === 1) rankDisplay = '🥇';
                else if (item.rank === 2) rankDisplay = '🥈';
                else if (item.rank === 3) rankDisplay = '🥉';

                tr.innerHTML = `
                    <td style="text-align: center; font-weight: 800;" class="rank-num-${item.rank}">${rankDisplay}</td>
                    <td style="text-align: left;">
                        <span class="rank-nickname" data-nickname="${item.nicname}">${item.nicname}</span>
                    </td>
                    <td style="text-align: right; font-weight: 700; color: var(--cyan);">${formatNumber(item.score)}</td>
                `;
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            tableContainer.appendChild(table);
            card.appendChild(tableContainer);

            colRank.appendChild(card);
        });

        // Add click events to nicknames for instant search
        colRank.querySelectorAll('.rank-nickname').forEach(el => {
            el.addEventListener('click', (e) => {
                const nickname = e.target.dataset.nickname;
                if (nickname) {
                    nicnameInput.value = nickname;
                    fetchAndRenderLogs(nickname);
                }
            });
        });

    } catch (e) {
        console.error(e);
        colRank.innerHTML = `<div class="error-message"><p>랭킹 로드 중 오류가 발생했습니다: ${e.message}</p></div>`;
    }
}

// Load default lookup on page load (optional but helpful)
window.addEventListener('DOMContentLoaded', () => {
    // Set up tab button event listeners
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            switchTab(category);
            if (category === 'user-rank') {
                fetchAndRenderRankings('유저랭킹');
            } else if (category === 'contrib-rank') {
                fetchAndRenderRankings('기여랭킹');
            } else if (category === 'passion-rank') {
                fetchAndRenderRankings('열정랭킹');
            }
        });
    });

    // 고정 체크박스 이벤트 및 로컬 스토리지 연동
    const pinCheckbox = document.getElementById('pin-checkbox');
    if (pinCheckbox) {
        // 로컬스토리지에서 고정된 유저명 조회
        const savedPinnedUser = localStorage.getItem('DRR_SINGLE_PINNED_USER');
        if (savedPinnedUser) {
            nicnameInput.value = savedPinnedUser;
            pinCheckbox.checked = true;
            fetchAndRenderLogs(savedPinnedUser);
        }

        pinCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                const user = nicnameInput.value.trim();
                if (user) {
                    localStorage.setItem('DRR_SINGLE_PINNED_USER', user);
                }
            } else {
                localStorage.removeItem('DRR_SINGLE_PINNED_USER');
            }
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('nicName');
    if (userParam) {
        nicnameInput.value = userParam;
        fetchAndRenderLogs(userParam);
    } else {
        // 고정된 값이 없을 경우에만 비우기
        const savedPinnedUser = localStorage.getItem('DRR_SINGLE_PINNED_USER');
        if (!savedPinnedUser) {
            nicnameInput.value = '';
        }
    }
});

// ═══════════════════════════════════════════════════════
//  모바일 전용 UI
// ═══════════════════════════════════════════════════════

function isMobile() {
    return window.innerWidth <= 768;
}

// 모바일 배지 HTML
function mobileBadgesHtml(char) {
    let h = '';
    if (char.isCorrupted)   h += '<span class="mb-badge mb-err">오류</span>';
    if (char.isLatestSave)  h += '<span class="mb-badge mb-latest">제일마지막저장</span>';
    if (char.isTodaySave)   h += '<span class="mb-badge mb-attend">출첵완</span>';
    else if (char.missedDays > 0) {
        const maxDays = 7 + (char.ttType !== undefined ? char.ttType : 2);
        const ratio = char.missedDays / maxDays;
        const cls = ratio >= 0.7 ? 'mb-miss-h' : ratio >= 0.4 ? 'mb-miss-m' : 'mb-miss-l';
        h += `<span class="mb-badge ${cls}">${char.missedDays}d 미접속</span>`;
    }
    return h;
}

// 숫자 포맷 (모바일용)
function mbFmt(v) { return formatNumber(parseInt(v) || 0); }
function mbFmtMax(cur, max) {
    const cv = parseInt(cur)||0, mv = parseInt(max)||0;
    return cv >= mv ? mbFmt(mv) : `${mbFmt(cv)}/${mbFmt(mv)}`;
}

// 모바일 기본현황 카드
function createMobileBasicCard(char) {
    const nameClass = char.isTodaySave ? 'mc-name mc-attended' : 'mc-name';
    const awakening = char.awakeningLevel > 0
        ? `<span class="mc-awakening">각성:${char.awakeningLevel}</span>` : '';

    // 모바일 만스텟 조건 판정
    const isLvlMaxed = (parseInt(char.level) || 0) >= 6000;
    const isAdvMaxed = (parseInt(char.adventure) || 0) >= 21001;
    const cpValueForMax = typeof char.cp === 'string' ? parseInt(char.cp.replace(/,/g, '')) : parseInt(char.cp);
    const isCpMaxed = (cpValueForMax || 0) >= 600000;
    const isStarMaxed = char.starGrade && (char.starGrade.replace(/\s+/g, '') === '닼레8' || char.starGrade.replace(/\s+/g, '') === '다크레드8');
    const isLimitMaxed = char.limit !== undefined && char.limit !== null && (parseInt(char.limit) || 0) >= 10;
    const isOwnStrMaxed = char.str && char.maxOwnStat && parseInt(char.str.toString().replace(/,/g, '')) >= parseInt(char.maxOwnStat.toString().replace(/,/g, ''));
    const isOwnAgiMaxed = char.agi && char.maxOwnStat && parseInt(char.agi.toString().replace(/,/g, '')) >= parseInt(char.maxOwnStat.toString().replace(/,/g, ''));
    const isOwnIntMaxed = char.intVal && char.maxOwnStat && parseInt(char.intVal.toString().replace(/,/g, '')) >= parseInt(char.maxOwnStat.toString().replace(/,/g, ''));
    
    const isAllMaxed = isLvlMaxed && isAdvMaxed && isCpMaxed && isStarMaxed && isLimitMaxed && isOwnStrMaxed && isOwnAgiMaxed && isOwnIntMaxed;

    const limitBlock = (char.limit !== null) ? `
        <div class="mc-section">
            <div class="mc-section-title"><span class="stat-label">극한:</span> <span class="mc-val ${isLimitMaxed ? 'stat-val-maxed' : ''}">${mbFmt(char.limit)}</span> <small style="font-size:0.7rem; color:var(--text-muted); font-weight:normal;">(${mbFmt(char.limitPt)}pt)</small></div>
            <div class="mc-row"><span><span class="stat-label">근력:</span> <b class="mc-val">${mbFmt(char.strength)}</b></span><span><span class="stat-label">근성:</span> <b class="mc-val">${mbFmt(char.grit)}</b></span></div>
            <div class="mc-row"><span><span class="stat-label">탐구:</span> <b class="mc-val">${mbFmt(char.search)}</b></span><span><span class="stat-label">행운:</span> <b class="mc-val">${mbFmt(char.luck)}</b></span></div>
        </div>` : '';

    return `<div class="mc-card ${isAllMaxed ? 'char-card-all-maxed' : ''}">
        <div class="mc-header">
            <span class="${nameClass}">${char.name}</span>
            <span class="mc-badges">${mobileBadgesHtml(char)}</span>
        </div>
        <div class="mc-row">
            <span class="mc-lv"><span class="stat-label">Lv:</span> <b class="mc-val ${isLvlMaxed ? 'stat-val-maxed' : ''}">${mbFmt(char.level)}</b> <small style="font-size:0.65rem; color:var(--text-muted); font-weight:normal;">(${(MAX_SPEED_MAPPING[char.name] !== undefined ? MAX_SPEED_MAPPING[char.name] : (MAX_SPEED_MAPPING[LINK_NAME_MAPPING[char.slotNum]] !== undefined ? MAX_SPEED_MAPPING[LINK_NAME_MAPPING[char.slotNum]] : '-'))})</small></span>
            <span class="mc-adv"><span class="stat-label">모험:</span> <b class="mc-val ${isAdvMaxed ? 'stat-val-maxed' : ''}">${mbFmt(char.adventure)}</b> <small style="font-size:0.65rem; color:var(--text-muted); font-weight:normal;">(${getAdventureStage(char.adventure)})</small></span>
        </div>
        <div class="mc-cp"><span class="stat-label">투력:</span> <b class="mc-val ${(typeof char.cp === 'string' ? parseInt(char.cp.replace(/,/g, '')) : parseInt(char.cp)) >= 600000 ? 'cp-maxed-completed' : ''}">${mbFmt(char.cp)}</b>${awakening}</div>
        <div class="mc-divider"></div>
        <div class="mc-row"><span><span class="stat-label">공격:</span> <b class="mc-val">${mbFmt(char.attack)}</b></span><span><span class="stat-label">방어:</span> <b class="mc-val">${mbFmt(char.defense)}</b></span></div>
        <div class="mc-row"><span><span class="stat-label">기:</span> <b class="mc-val">${mbFmt(char.ki)}</b></span><span><span class="stat-label">체력:</span> <b class="mc-val">${mbFmt(char.hp)}</b></span></div>
        <div class="mc-row"><span><span class="stat-label">공속:</span> <b class="mc-val">${mbFmt(char.speed)}</b></span><span><span class="stat-label">불굴:</span> <b class="mc-val">${mbFmt(char.fortitude)}</b></span></div>
        ${limitBlock}
        <div class="mc-divider"></div>
        <div class="mc-sublabel">내 스텟</div>
        <div class="mc-row ${char.str >= char.maxOwnStat && char.agi >= char.maxOwnStat && char.intVal >= char.maxOwnStat ? 'mc-maxed-completed' : ''}">
            <span class="mc-str"><span class="stat-label">힘:</span> <b class="mc-val ${char.str >= char.maxOwnStat ? 'stat-val-maxed' : ''}">${mbFmtMax(char.str, char.maxOwnStat)}</b></span>
            <span class="mc-agi"><span class="stat-label">민:</span> <b class="mc-val ${char.agi >= char.maxOwnStat ? 'stat-val-maxed' : ''}">${mbFmtMax(char.agi, char.maxOwnStat)}</b></span>
            <span class="mc-int"><span class="stat-label">지:</span> <b class="mc-val ${char.intVal >= char.maxOwnStat ? 'stat-val-maxed' : ''}">${mbFmtMax(char.intVal, char.maxOwnStat)}</b></span>
        </div>
        <div class="mc-sublabel">친구 스텟</div>
        <div class="mc-row ${char.friendStr >= char.maxFriendStat && char.friendAgi >= char.maxFriendStat && char.friendInt >= char.maxFriendStat ? 'mc-maxed-completed' : ''}">
            <span class="mc-str"><span class="stat-label">힘:</span> <b class="mc-val ${char.friendStr >= char.maxFriendStat ? 'stat-val-maxed' : ''}">${mbFmtMax(char.friendStr, char.maxFriendStat)}</b></span>
            <span class="mc-agi"><span class="stat-label">민:</span> <b class="mc-val ${char.friendAgi >= char.maxFriendStat ? 'stat-val-maxed' : ''}">${mbFmtMax(char.friendAgi, char.maxFriendStat)}</b></span>
            <span class="mc-int"><span class="stat-label">지:</span> <b class="mc-val ${char.friendInt >= char.maxFriendStat ? 'stat-val-maxed' : ''}">${mbFmtMax(char.friendInt, char.maxFriendStat)}</b></span>
        </div>
        <div class="mc-row"><span><span class="stat-label">도감:</span> <b class="mc-dogam mc-val">-</b></span><span><span class="stat-label">금화:</span> <b class="mc-gold mc-val">${mbFmt(char.gold)}</b></span></div>
        <div class="mc-row"><span><span class="stat-label">자동선두:</span> <b class="mc-autosundu mc-val">${mbFmt(char.doGam)}</b></span><span><span class="stat-label">금괴:</span> <b class="mc-goldbar mc-val">${mbFmt(char.goldBars)}</b></span></div>
        <div class="mc-row"><span><span class="stat-label">블다:</span> <b class="mc-bd mc-val">${mbFmt(char.blueDiamonds)}</b></span></div>
    </div>`;
}

// 모바일 장비현황 카드
function createMobileEquipCard(char) {
    function itemHtml(id) {
        const item = ITEM_MAPPING[id] || { name: `아이템 ${id}`, color: 'standard' };
        return `<span class="mc-item mc-item-${item.color} equip-item-clickable" onclick="showItemModal(${id})">${item.name}</span>`;
    }
    const nameClass = char.isTodaySave ? 'mc-name mc-attended' : 'mc-name';
    const myItems = char.myItems.length > 0
        ? char.myItems.map(itemHtml).join('')
        : '<span class="mc-noitem">없음</span>';
    const friendItems = char.friendItems.length > 0
        ? char.friendItems.map(itemHtml).join('')
        : '<span class="mc-noitem">없음</span>';

    return `<div class="mc-card">
        <div class="mc-header">
            <span class="${nameClass}">${char.name}</span>
            <span class="mc-badges">${mobileBadgesHtml(char)}</span>
        </div>
        <div class="mc-items">${myItems}</div>
        <div class="mc-friend-div friend-name-text">— ${char.friendName} —</div>
        <div class="mc-items">${friendItems}</div>
    </div>`;
}

// 모바일 배낭현황 카드
function createMobileBagCard(char) {
    function renderSectionHtml(title, items, icon) {
        let itemsHtml = '';
        if (items && items.length > 0) {
            itemsHtml = items.map(itemInfo => {
                const item = ITEM_MAPPING[itemInfo.id] || { name: `아이템 ${itemInfo.id}`, color: 'standard' };
                return `<div class="mc-item-row" style="display:flex; justify-content:space-between; align-items:center; width:100%; margin:3px 0; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom:3px;">
                    <span class="mc-item mc-item-${item.color} equip-item-clickable" onclick="showItemModal(${itemInfo.id})">${item.name}</span>
                    <span style="font-size:0.8rem; font-weight:700; color:${itemInfo.count > 0 ? 'var(--gold)' : 'var(--text-muted)'}; margin-left: 10px;">${itemInfo.count > 0 ? itemInfo.count + '개' : '소지'}</span>
                </div>`;
            }).join('');
        } else {
            itemsHtml = `<span style="font-size:0.72rem; color:var(--text-muted); font-style:italic; padding-left:4px;">비어있음</span>`;
        }

        return `
            <div class="mc-bag-section" style="margin-top:8px; border-top: 1px solid rgba(255,255,255,0.06); padding-top:6px; width: 100%;">
                <div style="font-size:0.75rem; font-weight:bold; color:var(--cyan); margin-bottom:4px;">${icon} ${title}</div>
                <div style="display:flex; flex-direction:column; gap:4px; width: 100%;">${itemsHtml}</div>
            </div>
        `;
    }

    const nameClass = char.isTodaySave ? 'mc-name mc-attended' : 'mc-name';

    // 창고배낭1~4 HTML (아이템이 있는 가방만)
    let warehouseBagsHtml = '';
    const activeWarehouseBags = (char.warehouseBags || []).map((bagItems, idx) => ({
        idx: idx + 1,
        items: bagItems
    })).filter(b => b.items.length > 0);

    if (activeWarehouseBags.length > 0) {
        warehouseBagsHtml = `<div style="font-size:0.75rem;font-weight:bold;color:var(--gold);margin-top:10px;border-top:1px solid rgba(255,255,255,0.08);padding-top:6px;margin-bottom:4px;width:100%;">📦 창고배낭</div>`;
        activeWarehouseBags.forEach(bag => {
            warehouseBagsHtml += renderSectionHtml(`창고배낭${bag.idx}`, bag.items, '📦');
        });
    }

    // 후원창고배낭1~4 HTML (아이템이 있는 가방만)
    let sponsorWarehouseBagsHtml = '';
    const activeSponsorBags = (char.sponsorWarehouseBags || []).map((bagItems, idx) => ({
        idx: idx + 1,
        items: bagItems
    })).filter(b => b.items.length > 0);

    if (activeSponsorBags.length > 0) {
        sponsorWarehouseBagsHtml = `<div style="font-size:0.75rem;font-weight:bold;color:var(--cyan);margin-top:10px;border-top:1px solid rgba(255,255,255,0.08);padding-top:6px;margin-bottom:4px;width:100%;">🎁 후원창고배낭</div>`;
        activeSponsorBags.forEach(bag => {
            sponsorWarehouseBagsHtml += renderSectionHtml(`후원창고배낭${bag.idx}`, bag.items, '🎁');
        });
    }

    return `<div class="mc-card" style="display:flex; flex-direction:column; align-items:flex-start; width:100%; box-sizing:border-box;">
        <div class="mc-header" style="width: 100%;">
            <span class="${nameClass}">${char.name}</span>
            <span class="mc-badges">${mobileBadgesHtml(char)}</span>
        </div>
        ${renderSectionHtml('배낭 아이템', char.backpackItems, '🎒')}
        ${warehouseBagsHtml}
        ${sponsorWarehouseBagsHtml}
    </div>`;
}

// 모바일 뷰 렌더링 메인
function renderMobileView(chars, data) {
    const mobileView = document.getElementById('mobile-view');
    const mobileChars = document.getElementById('mobile-chars');
    if (!mobileView || !mobileChars) return;

    // 모바일 탭 상태
    let currentMobileTab = 'basic';

    function renderMobileCards() {
        // innerHTML 덮어쓰기 이후 항상 최신 DOM 참조 사용
        const el = mobileView.querySelector('#mobile-chars');
        if (!el) return;
        el.innerHTML = '';

        chars.forEach(char => {
            const html = currentMobileTab === 'basic'
                ? createMobileBasicCard(char)
                : currentMobileTab === 'equip'
                ? createMobileEquipCard(char)
                : createMobileBagCard(char);
            el.insertAdjacentHTML('beforeend', html);
        });
    }

    // 헤더 요약
    const nicName = data['NICNAME'] || nicnameInput.value || '';
    const totalBD = parseInt(data['BD_POINT'] || data['BDPOINT'] || 0);
    const spPoint = parseInt(data['SP_POINT'] || 0);
    const latestDate = data._latest_date || '';

    mobileView.innerHTML = `
        <div class="mv-header">
            <div class="mv-nick">${nicName}</div>
            <div class="mv-summary">
                <span>💎 <b class="mc-bd">${mbFmt(totalBD)}</b></span>
                <span>✨ SP <b class="mc-gold">${mbFmt(spPoint)}</b></span>
            </div>
            <div class="mv-tabs">
                <button class="mv-tab active" data-tab="basic">📊 기본</button>
                <button class="mv-tab" data-tab="equip">⚔️ 장비</button>
                <button class="mv-tab" data-tab="bag">🎒 배낭</button>
            </div>
        </div>
        <div id="mobile-chars" class="mobile-chars-grid"></div>`;

    // 탭 이벤트
    mobileView.querySelectorAll('.mv-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            mobileView.querySelectorAll('.mv-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMobileTab = btn.dataset.tab;
            renderMobileCards();
        });
    });

    // 초기 카드 렌더 (renderMobileCards로 통합)
    renderMobileCards();

    mobileView.classList.remove('hidden');
}

// 모바일 여부에 따라 PC / 모바일 뷰 전환
function applyResponsiveLayout(chars, data) {
    const dashboardGrid = document.querySelector('.dashboard-grid');
    const categoryTabs = document.querySelector('.category-tabs');
    const mobileView = document.getElementById('mobile-view');

    if (isMobile()) {
        // 모바일: PC UI 숨기고 모바일 뷰 표시
        if (dashboardGrid) dashboardGrid.style.display = 'none';
        if (categoryTabs) categoryTabs.style.display = 'none';
        renderMobileView(chars, data);
    } else {
        // PC: 모바일 뷰 숨기고 PC UI 표시
        if (mobileView) mobileView.classList.add('hidden');
        if (dashboardGrid) dashboardGrid.style.display = '';
        if (categoryTabs) categoryTabs.style.display = '';
    }
}

// ─── Modal Control (Item Map Lookup) ───
function showItemModal(id) {
    const modal = document.getElementById('item-modal');
    const titleEl = document.getElementById('modal-item-title');
    const bodyEl = document.getElementById('modal-item-body');
    if (!modal || !bodyEl) return;

    const item = ITEM_MAPPING[id];
    if (item) {
        titleEl.textContent = `아이템 정보: ${item.name}`;
        
        let gradeText = '일반';
        let gradeColorStyle = 'color: var(--text-main)';
        if (item.color === 'green') { gradeText = '레어'; gradeColorStyle = 'color: var(--green); font-weight: 700;'; }
        else if (item.color === 'blue') { gradeText = '매직'; gradeColorStyle = 'color: #60b4ff; font-weight: 700;'; }
        else if (item.color === 'purple') { gradeText = '유물'; gradeColorStyle = 'color: var(--purple); font-weight: 700;'; }
        else if (item.color === 'cyan') { gradeText = '에픽'; gradeColorStyle = 'color: var(--cyan); font-weight: 700;'; }
        else if (item.color === 'red') { gradeText = '신화'; gradeColorStyle = 'color: #ff6680; font-weight: 700;'; }
        else if (item.color === 'rainbow') { gradeText = '레인보우'; gradeColorStyle = 'background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; color: transparent; font-weight: 900;'; }

        bodyEl.innerHTML = `
            <table>
                <tr>
                    <th>항목</th>
                    <th>정보</th>
                </tr>
                <tr>
                    <td>아이템 코드</td>
                    <td><strong style="color: var(--cyan);">${id}</strong></td>
                </tr>
                <tr>
                    <td>아이템 이름</td>
                    <td><strong>${item.name}</strong></td>
                </tr>
                <tr>
                    <td>아이템 등급</td>
                    <td><span style="${gradeColorStyle}">${gradeText}</span></td>
                </tr>
            </table>
        `;
    } else {
        titleEl.textContent = '아이템 정보';
        bodyEl.innerHTML = `
            <table>
                <tr>
                    <th>항목</th>
                    <th>정보</th>
                </tr>
                <tr>
                    <td>아이템 코드</td>
                    <td><strong style="color: var(--cyan);">${id}</strong></td>
                </tr>
                <tr>
                    <td>아이템 이름</td>
                    <td><span style="color: var(--text-muted);">미등록 아이템</span></td>
                </tr>
            </table>
        `;
    }
    
    modal.classList.add('active');
}

function closeItemModal() {
    const modal = document.getElementById('item-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ESC 키로 모달 닫기 지원
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeItemModal();
    }
});
