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
    10: 11,  // 리쿰
    11: 13,  // 버터
    12: 12,  // 지스
    13: 10,  // 골드(굴드)
    14: 14,  // 기뉴(캡틴 기뉴)
    15: 15,  // 사탄(미스터 사탄)
    16: 27,  // 부르마
    17: 7,   // 라데츠
    18: 18,  // 콜드대왕
    19: 19,  // 네일
    20: 20,  // 인조인간16호
    21: 21,  // 인조인간19호
    22: 22,  // 인조인간20호
    23: 45,  // 자넨바(쟈넨바)
    24: 43,  // 농부
    // UpBook 25~27: 아직 미확인 슬롯 (필요시 추가)
    28: 1,   // 손오공(카카로트) ← PDATA1 인덱스 28 검증 완료
    29: 9,   // 베지터 ← PDATA1 인덱스 29 검증 완료
};

// Reverse map: slot number → UpBook 1-based index (built automatically)
const SLOT_TO_UPBOOK = {};
for (const [upBookIdx, slotNum] of Object.entries(UPBOOK_TO_SLOT)) {
    SLOT_TO_UPBOOK[slotNum] = parseInt(upBookIdx);
}

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
    47: 'hell',   // 브로리(약해진)
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
    10: '골드',
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
    40: '리루도',
    41: '우부',
    42: '타피온',
    43: '농부',
    44: '인조인간13호',
    45: '자넨바',
    46: '블루장군',
    47: '브로리(약해진)',
    48: '버독',
    49: '타레스',
    50: '박테리안',
    51: '우마왕',
    52: '팡',
    53: '하야이드래곤',
    54: '브로리(전설)',
    55: '아리',
    56: '파이크한',
    57: '베이비',
    58: '인조인간14호',
    59: '인조인간8호',
    60: '심벌',
    61: '유린'
};

// Item ID to Name and Color Mapping Table
const ITEM_MAPPING = {
    743: { name: '오천크스 수련팔찌', color: 'standard' },
    747: { name: '베이비의신발', color: 'standard' },
    846: { name: '마인부우의 신발', color: 'purple' },
    879: { name: '베이비의 신발v2', color: 'standard' },
    932: { name: '쿠우라의 갑옷', color: 'green' },
    999: { name: '새로운 시작', color: 'purple' },
    1036: { name: '지구인의 생명', color: 'blue' },
    1039: { name: '드래곤볼 탐지기Lv2', color: 'standard' },
    1086: { name: '베이비의신발', color: 'standard' },
    1087: { name: '베이비의반지', color: 'standard' },
    1088: { name: '베이비의보석', color: 'standard' },
    1160: { name: '오천크스 가방', color: 'standard' },
    1162: { name: '오천크스 갑옷', color: 'standard' },
    1163: { name: '개발자의 헬멧(base)', color: 'green' },
    1168: { name: '개발자의 헬멧(base)', color: 'green' },
    1176: { name: '탐험일지-닥터위로', color: 'standard' },
    1179: { name: '베이비의 보석v2', color: 'standard' },
    1181: { name: '베이비의 반지v2', color: 'standard' },
    1182: { name: '베이비의 신발v2', color: 'standard' },
    1189: { name: '개발자의 헬멧(base)', color: 'green' },
    1193: { name: '개발자의 헬멧+1', color: 'green' },
    1194: { name: '개발자의 헬멧(base)', color: 'green' },
    1201: { name: '자넨바 팔찌', color: 'standard' },
    1202: { name: '자넨바 신발', color: 'standard' },
    1203: { name: '자넨바 보석', color: 'standard' },
    1346: { name: '개발자의 헬멧(base)', color: 'green' },
    1348: { name: '지구인의 생명', color: 'blue' },
    1355: { name: '자넨바의팔찌 v2', color: 'standard' },
    1356: { name: '자넨바의신발 v2', color: 'standard' },
    1368: { name: '개발자의 헬멧+3', color: 'green' },
    1369: { name: '개발자의 헬멧+4', color: 'green' },
    1373: { name: '베이비의반지', color: 'standard' },
    1374: { name: '베이비의 신발', color: 'standard' },
    1375: { name: '베이비의보석', color: 'standard' },
    1437: { name: '개발자의 헬멧+2', color: 'green' },
    1448: { name: '영웅의 증표Lv22', color: 'purple' },
    1458: { name: '베이비의 반지Lv2', color: 'standard' },
    1459: { name: '베이비의 보석Lv2', color: 'standard' },
    1460: { name: '베이비의 신발Lv2', color: 'standard' },
    1463: { name: '브로리의 최종힘', color: 'purple' },
    1465: { name: '베지트의 체력장갑', color: 'cyan' },
    1466: { name: '베지트의 전투장갑', color: 'cyan' },
    1467: { name: '베지트의 기력장갑', color: 'cyan' },
    1469: { name: '베지트의 전투반지', color: 'purple' },
    1470: { name: '베지트의 기력반지', color: 'cyan' },
    1471: { name: '베이비의 보석v2', color: 'standard' },
    1472: { name: '베지트의 신발', color: 'cyan' },
    1473: { name: '베지트의 도복', color: 'cyan' },
    1474: { name: '베지트의 만능장갑', color: 'cyan' },
    1476: { name: '개발자의 헬멧+1', color: 'green' },
    1482: { name: '손오반의 힘', color: 'purple' },
    1484: { name: '영웅의 신전', color: 'purple' }
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

// Utility: Determine active slot number using "인증 Final 캐릭터" name matching
function getActiveSlotNum(data) {
    let finalChar = data["인증 Final 캐릭터"];
    if (!finalChar) {
        // Fallback for corrupted key names (like " Final ĳ")
        const key = Object.keys(data).find(k => k.includes("Final"));
        if (key) {
            finalChar = data[key];
        }
    }
    if (!finalChar) return -1;

    // Clean up color codes like |cffff0303 and |r
    let clean = finalChar.replace(/\|c[0-9a-fA-F]{8}/g, '').replace(/\|r/g, '');
    // Clean up brackets like 『영웅』 or 『친구』
    clean = clean.replace(/『[^』]+』/g, '');
    // Remove awakening suffix like [2차 각성] or [1차 각성] or [각성]
    clean = clean.replace(/\[[^\]]+\]/g, '');
    // Remove prefixes like "초사이어인2 - " or "초사이어인3 - " or "초사이어인 - " or "초 - " or "약해진 - "
    clean = clean.replace(/^(초사이어인\d*|초|약해진)\s*-\s*/, '');
    clean = clean.trim();

    // Now match with LINK_NAME_MAPPING names
    for (let slotNum in LINK_NAME_MAPPING) {
        const charName = LINK_NAME_MAPPING[slotNum];
        if (clean.includes(charName) || charName.includes(clean)) {
            return parseInt(slotNum);
        }
    }
    return -1;
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
    if (v < 20000) return "개발중";
}

// Render Equipment Card (for 장비현황 tab)
function createEquipmentCard(char) {
    const card = document.createElement('div');
    card.className = 'equip-card';

    // Name Row
    const nameRow = document.createElement('div');
    nameRow.className = 'char-name-row';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'char-name';
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
        latestBadge.className = 'char-latest-badge';
        latestBadge.textContent = '최근저장';
        nameRow.appendChild(latestBadge);
    }
    card.appendChild(nameRow);

    // Equip List container
    const equipList = document.createElement('div');
    equipList.className = 'equip-list';

    // Helper to render individual item with color styling
    function renderItem(itemId) {
        const item = ITEM_MAPPING[itemId] || { name: `아이템 ${itemId}`, color: 'standard' };
        const itemDiv = document.createElement('div');
        itemDiv.className = `equip-item item-${item.color}`;
        itemDiv.textContent = item.name;
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

    const nameSpan = document.createElement('span');
    nameSpan.className = 'char-name';
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
        latestBadge.className = 'char-latest-badge';
        latestBadge.textContent = '최근저장';
        nameRow.appendChild(latestBadge);
    }
    card.appendChild(nameRow);

    // Body container holding two halves
    const bodyContainer = document.createElement('div');
    bodyContainer.className = 'char-card-body';

    // Left Column (Standard Stats)
    const leftCol = document.createElement('div');
    leftCol.className = 'char-card-left';

    // Level
    const lvlDiv = document.createElement('div');
    lvlDiv.className = 'char-level';
    lvlDiv.innerHTML = `레벨: <span>${formatNumber(char.level)}</span>`;
    leftCol.appendChild(lvlDiv);

    // Adventure
    const advDiv = document.createElement('div');
    advDiv.className = 'char-adventure';
    const stageName = getAdventureStage(char.adventure);
    advDiv.innerHTML = `모험: <span>${formatNumber(char.adventure)} (${stageName})</span>`;
    leftCol.appendChild(advDiv);

    // Attack & Defense
    const row1 = document.createElement('div');
    row1.className = 'stat-row';
    row1.innerHTML = `<span>공격력: ${formatNumber(char.attack)}</span><span class="alt-value">방어력: ${formatNumber(char.defense)}</span>`;
    leftCol.appendChild(row1);

    // Ki & HP
    const row2 = document.createElement('div');
    row2.className = 'stat-row';
    row2.innerHTML = `<span>기: ${formatNumber(char.ki)}</span><span class="alt-value">체력: ${formatNumber(char.hp)}</span>`;
    leftCol.appendChild(row2);

    // Speed (공속) & Fortitude (불굴)
    const row3 = document.createElement('div');
    row3.className = 'stat-row';
    row3.innerHTML = `<span>공속: ${formatNumber(char.speed)}</span><span class="alt-value">불굴: ${formatNumber(char.fortitude)}</span>`;
    leftCol.appendChild(row3);

    // Combat Power (투력) + 각성 on same row, number immediately next to label, no spaces in colon
    const cpRow = document.createElement('div');
    cpRow.className = 'char-cp';
    let cpHtml = `투력:<span>${formatNumber(char.cp)}</span>`;
    if (char.awakeningLevel > 0) {
        cpHtml += `<span class="char-awakening-badge">각성:${char.awakeningLevel}</span>`;
    }
    cpRow.innerHTML = cpHtml;
    leftCol.appendChild(cpRow);

    // Limit Block
    if (char.limit !== undefined && char.limit !== null) {
        const limitBlock = document.createElement('div');
        limitBlock.className = 'char-limit-block';

        const limitHeader = document.createElement('div');
        limitHeader.innerHTML = `극한: <span>${formatNumber(char.limit)}</span> (<span>${formatNumber(char.limitPt)}</span>pt)`;
        limitBlock.appendChild(limitHeader);

        const limitStats = document.createElement('div');
        limitStats.className = 'stat-row';
        limitStats.innerHTML = `<span>근력: ${formatNumber(char.strength)}</span><span class="alt-value">근성: ${formatNumber(char.grit)}</span>`;
        limitBlock.appendChild(limitStats);

        const limitStats2 = document.createElement('div');
        limitStats2.className = 'stat-row';
        limitStats2.innerHTML = `<span>탐구: ${formatNumber(char.search)}</span><span class="alt-value">행운: ${formatNumber(char.luck)}</span>`;
        limitBlock.appendChild(limitStats2);

        leftCol.appendChild(limitBlock);
    }

    bodyContainer.appendChild(leftCol);

    // Right Column (New Stats, Friend info, Extra info)
    const rightCol = document.createElement('div');
    rightCol.className = 'char-card-right';

    // Own stats (힘, 민, 지) block
    const ownStatsBlock = document.createElement('div');
    ownStatsBlock.className = 'own-stats-block';
    ownStatsBlock.innerHTML = `
        <div>힘: <span class="val-str">${formatStatWithMax(char.str, char.maxOwnStat)}</span></div>
        <div>민: <span class="val-agi">${formatStatWithMax(char.agi, char.maxOwnStat)}</span></div>
        <div>지: <span class="val-int">${formatStatWithMax(char.intVal, char.maxOwnStat)}</span></div>
    `;
    rightCol.appendChild(ownStatsBlock);

    // Friend block
    const friendBlock = document.createElement('div');
    friendBlock.className = 'friend-stats-block';
    friendBlock.innerHTML = `
        <div class="friend-title">친구</div>
        <div>힘: <span class="val-str">${formatStatWithMax(char.friendStr, char.maxFriendStat)}</span></div>
        <div>민: <span class="val-agi">${formatStatWithMax(char.friendAgi, char.maxFriendStat)}</span></div>
        <div>지: <span class="val-int">${formatStatWithMax(char.friendInt, char.maxFriendStat)}</span></div>
    `;
    rightCol.appendChild(friendBlock);

    // Extra block: 성급, 도감, 금화, 금괴, 블다
    const extraBlock = document.createElement('div');
    extraBlock.className = 'extra-stats-block';
    extraBlock.innerHTML = `
        <div>성급: <span class="val-star">-</span></div>
        <div>도감: <span class="val-dogam">${formatNumber(char.doGam)}</span></div>
        <div>금화: <span class="val-gold">${formatNumber(char.gold)}</span></div>
        <div>금괴: <span class="val-goldbar">${formatNumber(char.goldBars)}</span></div>
        <div>블다: <span class="val-bluedia">${formatNumber(char.blueDiamonds)}</span></div>
    `;
    rightCol.appendChild(extraBlock);

    bodyContainer.appendChild(rightCol);
    card.appendChild(bodyContainer);

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

                    // Determine if this is the active hero slot
                    const activeSlotNum = getActiveSlotNum(data);
                    const slotNumInt = parseInt(slotNum);

                    let level = 0;
                    const rawLvlVal = parseInt(d1[17]) || 0;
                    const expVal = parseInt(d1[3]) || 0;

                    const expLvl = Math.floor(Math.sqrt(expVal / 25));
                    const rawLvlCalculated = Math.floor(rawLvlVal / 3.28);

                    if (slotNumInt === activeSlotNum || Math.abs(rawLvlCalculated - expLvl) > 100) {
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
                    const friendName = LINK_NAME_MAPPING[friendSlot] || "친구";

                    const gold = d1.length > 0 ? (parseInt(d1[0]) || 0) : 0;
                    const goldBars = d1.length > 1 ? (parseInt(d1[1]) || 0) : 0;
                    const blueDiamonds = d2.length > 95 ? (parseInt(d2[95]) || 0) : 0;

                    const charName = LINK_NAME_MAPPING[slotNumInt] || `캐릭터 ${charId}`;
                    const category = SLOT_CATEGORY_MAPPING[slotNumInt] || 'other';
                    const awakeningLevel = getAwakeningLevel(pdata1Arr, slotNumInt);

                    const ttType = data.TT_TYPE1 !== undefined ? parseInt(data.TT_TYPE1) : 2;
                    const mults = GRADE_MULTIPLIERS[ttType] || GRADE_MULTIPLIERS[2];
                    const maxOwnStat = (adv + 1) * mults.own;
                    const maxFriendStat = (adv + 1) * mults.friend;

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
                        blueDiamonds
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

        // Sort characters: corrupted first, then most recently saved, then by slotNum
        const maxSaveDate = Math.max(...uniqueCharacters.map(c => c.saveDate || 0));
        uniqueCharacters.forEach(c => { c.isLatestSave = !c.isCorrupted && c.saveDate === maxSaveDate && maxSaveDate > 0; });
        uniqueCharacters.sort((a, b) => {
            if (a.isCorrupted && !b.isCorrupted) return -1;
            if (!a.isCorrupted && b.isCorrupted) return 1;
            if (a.isLatestSave && !b.isLatestSave) return -1;
            if (!a.isLatestSave && b.isLatestSave) return 1;
            return a.slotNum - b.slotNum;
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
            if (char.category !== 'equip') {
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

        // Show basic tab by default on load
        switchTab('basic');

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

    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('nicName');
    if (userParam) {
        nicnameInput.value = userParam;
        fetchAndRenderLogs(userParam);
    } else {
        nicnameInput.value = '';
    }
});
