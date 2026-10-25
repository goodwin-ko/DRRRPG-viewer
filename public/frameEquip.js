/* Dragonball RPG - Frame Equipment Component Module */
(function() {
  'use strict';

  // --- 66 Link Characters Mapping ---
  const LINK_NAME_MAPPING = {
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
    56: '파이크한', 57: '베이비', 58: '리루도', 59: '인조인간8호', 60: '심벌', 61: '유린',
    62: '메탈 쿠우라', 63: '킹 베지터', 64: '로드 슬러그', 65: '블랙 오공', 66: '자마스'
  };

  // Preset Data Definitions (including Krillin and Gohan presets)
  const PRESET_DATA = {
    "DBEQ_OPEN": "37,36",
    "DBEQ_GIN": 132,
    "DBEQ_ARK": 0,
    // 손오반 (Slot 32): 천하제일 무도가 9세트 + 거북선인 문하 3세트
    "DBEQ_E_32": "0Hc8000TPH0000x,0,0,0Ic20000DF000087000ZJ,0Jd40001VH0000x,0Kc90001Q6000TE,0Lc7000iC,0Ma7000JB,0Nb40001QG0001aF00002,0Db70002XH0000WF00001G0001C,0Nc40001TI0000y30000y,0,0Ec5r000UG00015,0Qd10000T,0GeA0000BF00005G0001R90000r,0",
    // 크리링 (Slot 2): 크리링의 도복, 띠, 하의, 신발 (크리링 4세트 구성)
    "DBEQ_E_2": "0,0,1Ca70000k,0,0,0,1Ea702pjE20000X,0,0,1Gd705q7n200018,0,0,0,0,1HbA00011,0",
    // 인벤토리 (Inventory)
    "DBEQ_I1": "11a20000k,1Ca70000k,0,0,0,0,0,0,0,0,0,0",
    "DBEQ_I2": "0,0,0,0,0,0,0,0,0,0,0,0",
    "DBEQ_I3": "0,0,0,0,0,0,0,0,0,0,0,0",
    "DBEQ_I4": "0,0,0,0,0,0,0,0,0,0,0,0",
    // 보관함 / 창고 (Vault)
    "DBEQ_B1": "0Oc8000adF0000820000CH0000d,0Oa6000LT200006A0000AG0000z,0,0,0Lc8000bP40001SI0000a,0,0,0Lc6000dn,0,0Zc80052T20000OI0000l,0,0Kb900017",
    "DBEQ_B2": "1Ea702pjE20000X,1Ca70000k,1Gd705q7n200018,1HbA00011,0,0,0,0,0,0,0,0"
  };

  let currentChar = '손오반';
  let currentSlotId = 32;
  let currentData = JSON.parse(JSON.stringify(PRESET_DATA));
  let currentTab = 'inventory'; // 'inventory' | 'vault'
  let currentPage = 1;
  let currentFilter = 'all';
  let selectedItemModal = null;

  const BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function base62Decode(str) {
    let val = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      let idx = BASE62_CHARS.indexOf(c);
      if (idx === -1) idx = 0;
      val = val * 62 + idx;
    }
    return val;
  }

  const RARITY_MAP = {
    'a': { name: '일반', color: '#b0aec2', class: 'rarity-a' },
    'b': { name: '고급', color: '#00ff66', class: 'rarity-b' },
    'c': { name: '희귀', color: '#00d2ff', class: 'rarity-c' },
    'd': { name: '영웅', color: '#c77dff', class: 'rarity-d' },
    'e': { name: '전설', color: '#ffaa00', class: 'rarity-e' },
    'f': { name: '신화', color: '#ff3355', class: 'rarity-f' }
  };

  const SLOT_MAP = {
    0: { name: '투구', hex: '0', cat: 'armor' },
    1: { name: '명예', hex: '1', cat: 'acc' },
    2: { name: '도복', hex: '2', cat: 'armor' },
    3: { name: '갑옷', hex: '3', cat: 'armor' },
    4: { name: '목걸이', hex: '4', cat: 'acc' },
    5: { name: '장갑', hex: '5', cat: 'acc' },
    6: { name: '벨트', hex: '6', cat: 'acc' },
    7: { name: '손목', hex: '7', cat: 'acc' },
    8: { name: '귀걸이(좌)', hex: '8', cat: 'acc' },
    9: { name: '하의', hex: '9', cat: 'armor' },
    10: { name: '귀걸이(우)', hex: 'A', cat: 'acc' },
    11: { name: '반지(좌)', hex: 'B', cat: 'acc' },
    12: { name: '반지(우)', hex: 'C', cat: 'acc' },
    13: { name: '무기', hex: 'D', cat: 'weapon' },
    14: { name: '신발', hex: 'E', cat: 'armor' },
    15: { name: '보조', hex: 'F', cat: 'weapon' }
  };

  // Default icons per slot
  const DEFAULT_SLOT_ICONS = {
    0: 'images/frame/slot_0_helm.png',
    1: 'images/frame/champion_belt.png',
    2: 'images/frame/krillin_dobok.png',
    3: 'images/frame/slot_3_armor.png',
    4: 'images/frame/slot_4_necklace.png',
    5: 'images/frame/slot_5_gloves.png',
    6: 'images/frame/slot_6_belt.png',
    7: 'images/frame/slot_7_wrist.png',
    8: 'images/frame/slot_8_earring.png',
    9: 'images/frame/slot_9_pants.png',
    10: 'images/frame/slot_10_earring.png',
    11: 'images/frame/slot_12_ring.png',
    12: 'images/frame/slot_12_ring.png',
    13: 'images/frame/slot_13_weapon.png',
    14: 'images/frame/slot_14_boots.png',
    15: 'images/frame/slot_13_weapon.png'
  };

  const ITEM_BASE_MAP = {
    // 거북선인 문하 무도가 세트 (0A ~ 0G)
    '0A': { name: '거북선인 문하 무도가의 투구', set: '거북선인 문하 무도가', slot: 0 },
    '0B': { name: '거북선인 문하 무도가의 도복', set: '거북선인 문하 무도가', slot: 2 },
    '0C': { name: '거북선인 문하 무도가의 갑옷', set: '거북선인 문하 무도가', slot: 3 },
    '0D': { name: '거북선인 문하 무도가의 하의', set: '거북선인 문하 무도가', slot: 9, icon: 'images/frame/slot_9_pants.png' },
    '0E': { name: '거북선인 문하 무도가의 반지', set: '거북선인 문하 무도가', slot: 12, icon: 'images/frame/slot_12_ring.png' },
    '0G': { name: '거북선인 문하 무도가의 신발', set: '거북선인 문하 무도가', slot: 14, icon: 'images/frame/slot_14_boots.png' },

    // 천하제일 무도가 세트 (0H ~ 0Q)
    '0H': { name: '천하제일 무도가의 투구', set: '천하제일 무도가', slot: 0, icon: 'images/frame/slot_0_helm.png' },
    '0I': { name: '천하제일 무도가의 갑옷', set: '천하제일 무도가', slot: 3, icon: 'images/frame/slot_3_armor.png' },
    '0J': { name: '천하제일 무도가의 목걸이', set: '천하제일 무도가', slot: 4, icon: 'images/frame/slot_4_necklace.png' },
    '0K': { name: '천하제일 무도가의 장갑', set: '천하제일 무도가', slot: 5, icon: 'images/frame/slot_5_gloves.png' },
    '0L': { name: '천하제일 무도가의 벨트', set: '천하제일 무도가', slot: 6, icon: 'images/frame/slot_6_belt.png' },
    '0M': { name: '천하제일 무도가의 손목', set: '천하제일 무도가', slot: 7, icon: 'images/frame/slot_7_wrist.png' },
    '0N': { name: '천하제일 무도가의 귀걸이', set: '천하제일 무도가', slot: 8, icon: 'images/frame/slot_8_earring.png' },
    '0Q': { name: '천하제일 무도가의 무기', set: '천하제일 무도가', slot: 13, icon: 'images/frame/slot_13_weapon.png' },

    // 크리링의 기원 세트 (1B ~ 1H) - 크리링 전용 7세트
    '1B': { name: '크리링의 두건', set: '크리링의 기원 (크리링 전용)', slot: 0, icon: 'images/frame/krillin_headband.png' },
    '1C': { name: '크리링의 도복', set: '크리링의 기원 (크리링 전용)', slot: 2, icon: 'images/frame/krillin_dobok.png' },
    '1D': { name: '크리링의 장비 [1D]', set: '크리링의 기원 (크리링 전용)', slot: 5 },
    '1E': { name: '크리링의 띠', set: '크리링의 기원 (크리링 전용)', slot: 6, icon: 'images/frame/krillin_belt.png' },
    '1F': { name: '크리링의 장비 [1F]', set: '크리링의 기원 (크리링 전용)', slot: 7 },
    '1G': { name: '크리링의 하의', set: '크리링의 기원 (크리링 전용)', slot: 9, icon: 'images/frame/slot_9_pants.png' },
    '1H': { name: '크리링의 신발', set: '크리링의 기원 (크리링 전용)', slot: 14, icon: 'images/frame/slot_14_boots.png' },

    // 오지터 세트
    '11': { name: '오지터의 갑옷', set: '오지터', slot: 3, icon: 'images/gogeta_armor.png' },
    '15': { name: '오지터의 손목', set: '오지터', slot: 7, icon: 'images/frame/slot_7_wrist.png' },

    // 융합의 힘 I 세트
    '1N': { name: '융합의 띠', set: '융합의 힘 I', slot: 6, icon: 'images/frame/slot_6_belt.png' },

    // 기타 확인된 세트 및 접두사 (10, 12, 13, 14, 16, 1L, 1P)
    '10': { name: '장비 [10]', set: '일반 장비', slot: 0 },
    '12': { name: '장비 [12]', set: '일반 장비', slot: 4 },
    '13': { name: '장비 [13]', set: '일반 장비', slot: 5 },
    '14': { name: '장비 [14]', set: '일반 장비', slot: 6 },
    '16': { name: '장비 [16]', set: '일반 장비', slot: 10 },
    '1L': { name: '장비 [1L]', set: '일반 장비', slot: 2 },
    '1P': { name: '장비 [1P]', set: '일반 장비', slot: 14 },
    '1X': { name: '천하제일 챔피언 벨트', set: '일반 장비', slot: 1, icon: 'images/frame/champion_belt.png' }
  };

  const SET_EFFECTS = {
    '거북선인 문하 무도가': {
      title: '거북선인 문하 무도가 세트',
      desc: [
        '3세트 : 트리거 데미지 + 2.0%',
        '6세트 : 트리거 데미지 + 5.0%'
      ]
    },
    '천하제일 무도가': {
      title: '천하제일 무도가 세트',
      desc: [
        '3세트 : 트리거 데미지 + 2.0%',
        '9세트 : 트리거 데미지 + 10.0%'
      ]
    },
    '크리링의 기원 (크리링 전용)': {
      title: '크리링의 기원 세트 (크리링 전용)',
      desc: [
        '4세트 : 받는 트리거 피해 -20%, 받는 영웅 피해 -15%',
        '7세트 : 에너지파 → 기원참'
      ]
    },
    '융합의 힘 I': {
      title: '융합의 힘 I 세트',
      desc: [
        '2세트 : 트뎀 +10%, 퓨전 지속 +20초, 퓨전 데미지 +30%',
        '4세트 : 트뎀 +20%, 퓨전 시 받트뎀 · 영웅뎀 -15%',
        '6세트 : 트뎀 +30%, 오지터 퓨전 실패 없음, 퓨전 데미지 +50%'
      ]
    },
    '오지터': {
      title: '오지터 세트',
      desc: [
        '2세트 : 영웅 공격속도 및 능력치 대폭 증가'
      ]
    }
  };

  const STAT_TYPE_MAP = {
    '1': { name: '트리거 데미지', isPct: true, div: 10 },
    '2': { name: '받는 트리거 피해', isPct: true, div: 10, isNegative: true },
    '3': { name: '경험치 획득량', isPct: true, div: 10 },
    '4': { name: '드랍률', isPct: true, div: 10 },
    '5': { name: '캐릭터 전용 트리거 데미지', isPct: true, div: 10 },
    '6': { name: '힘', isPct: false },
    '7': { name: '민첩', isPct: false },
    '8': { name: '지능', isPct: false },
    '9': { name: '공격속도', isPct: true, div: 10 },
    'A': { name: '이동속도', isPct: false },
    'B': { name: '더블 크리티컬 확률', isPct: true, div: 10 },
    'C': { name: '더블 크리티컬 데미지', isPct: true, div: 10 },
    'D': { name: '스킬 쿨타임 감소', isPct: true, div: 10, isNegative: true },
    'E': { name: '물리 방어력', isPct: false },
    'F': { name: '마법 방어력', isPct: false },
    'G': { name: '퓨전 상태 데미지', isPct: true, div: 10 },
    'H': { name: '퓨전 시 받는 트리거 피해', isPct: true, div: 10, isNegative: true },
    'I': { name: '퓨전 시 받는 영웅 피해', isPct: true, div: 10, isNegative: true },
    'J': { name: '퓨전 지속시간', isPct: false, unit: '초' }
  };

  function decodeItem(code, fallbackSlotIdx = 0) {
    if (!code || code === '0' || code.length < 9) return null;

    const basePrefix = code.slice(0, 2);
    const rarityChar = code.slice(2, 3);
    const baseStatTypeChar = code.slice(3, 4);
    const baseValRaw = code.slice(4, 9);

    const knownBase = ITEM_BASE_MAP[basePrefix] || {
      name: `프레임 장비 [${basePrefix}]`,
      set: '일반 장비',
      slot: fallbackSlotIdx
    };

    const rarity = RARITY_MAP[rarityChar] || { name: '일반', color: '#b0aec2', class: 'rarity-a' };
    const slotIdx = (knownBase.slot !== undefined) ? knownBase.slot : fallbackSlotIdx;
    const slotInfo = SLOT_MAP[slotIdx] || { name: `부위(${slotIdx})`, cat: 'acc' };

    let baseStatName = '';
    let baseValNum = 0;
    let baseValFormatted = '';
    let baseTargetSlotId = null;
    let baseTargetName = null;

    if (baseStatTypeChar === '5') {
      const targetCharChar = baseValRaw[0];
      baseTargetSlotId = BASE62_CHARS.indexOf(targetCharChar);
      baseTargetName = LINK_NAME_MAPPING[baseTargetSlotId] || ('LINK_' + baseTargetSlotId);
      baseStatName = `${baseTargetName} 트리거 데미지`;
      baseValNum = base62Decode(baseValRaw.slice(1));
      baseValFormatted = '+' + (baseValNum / 10).toFixed(1) + '%';
    } else {
      const baseStatConf = STAT_TYPE_MAP[baseStatTypeChar] || { name: `스탯(${baseStatTypeChar})`, isPct: false, div: 1 };
      baseStatName = baseStatConf.name;
      baseValNum = base62Decode(baseValRaw);
      baseValFormatted = baseStatConf.isPct ? (baseValNum / baseStatConf.div).toFixed(1) + '%' : `${baseValNum}`;
      if (baseStatConf.unit) baseValFormatted += baseStatConf.unit;
      if (baseStatConf.isNegative) baseValFormatted = '-' + baseValFormatted;
      else baseValFormatted = '+' + baseValFormatted;
    }

    const options = [];
    const optsStr = code.slice(9);
    for (let i = 0; i < optsStr.length; i += 6) {
      if (i + 6 <= optsStr.length) {
        const chunk = optsStr.slice(i, i + 6);
        const typeCode = chunk[0];
        const valRaw = chunk.slice(1);
        let optName = '';
        let optValNum = 0;
        let optValFormatted = '';
        let optTargetSlotId = null;
        let optTargetName = null;
        let isDedicated = false;

        if (typeCode === '5') {
          const targetCharChar = valRaw[0];
          optTargetSlotId = BASE62_CHARS.indexOf(targetCharChar);
          optTargetName = LINK_NAME_MAPPING[optTargetSlotId] || ('LINK_' + optTargetSlotId);
          optName = `${optTargetName} 트리거 데미지`;
          optValNum = base62Decode(valRaw.slice(1));
          optValFormatted = '+' + (optValNum / 10).toFixed(1) + '%';
          isDedicated = true;
        } else {
          const optConf = STAT_TYPE_MAP[typeCode] || { name: `옵션(${typeCode})`, isPct: false, div: 1 };
          optName = optConf.name;
          optValNum = base62Decode(valRaw);
          optValFormatted = optConf.isPct ? (optValNum / optConf.div).toFixed(1) + '%' : `${optValNum}`;
          if (optConf.unit) optValFormatted += optConf.unit;
          if (optConf.isNegative) optValFormatted = '-' + optValFormatted;
          else optValFormatted = '+' + optValFormatted;
        }

        options.push({
          code: typeCode,
          targetSlotId: optTargetSlotId,
          targetName: optTargetName,
          isDedicated: isDedicated,
          name: optName,
          valRaw: valRaw,
          valNum: optValNum,
          valFormatted: optValFormatted,
          isPct: true,
          div: 10
        });
      }
    }

    // Default icon mapping per slot
    let icon = knownBase.icon || DEFAULT_SLOT_ICONS[slotIdx] || 'images/frame/slot_3_armor.png';

    return {
      code,
      basePrefix,
      setName: knownBase.set,
      rarityChar,
      rarity,
      slotIdx,
      slotInfo,
      itemName: knownBase.name,
      baseStatType: baseStatTypeChar,
      baseTargetSlotId,
      baseTargetName,
      baseStatName,
      baseValNum,
      baseValFormatted,
      options,
      icon
    };
  }

  // --- Render Functions ---
  function renderAll() {
    const wChar = document.getElementById('windowCharName');
    if (wChar) wChar.innerText = currentChar;
    const hChar = document.getElementById('frame-header-char-name');
    if (hChar) hChar.innerText = currentChar;
    const statsChar = document.getElementById('statsCharLabel');
    if (statsChar) statsChar.innerText = currentChar;
    const jobLabel = document.getElementById('stat_job_label');
    if (jobLabel) jobLabel.innerText = `${currentChar} 전용`;

    renderCharacterAvatars();
    renderCurrencies();
    renderEquipSlots();
    renderInventoryGrid();
    renderStats();
  }

  function renderCharacterAvatars() {
    const container = document.getElementById('charAvatarGrid');
    if (!container) return;
    container.innerHTML = '';

    for (let sid = 1; sid <= 66; sid++) {
      const charName = LINK_NAME_MAPPING[sid] || `LINK_${sid}`;
      const eqStr = currentData[`DBEQ_E_${sid}`];
      let eqCount = 0;
      if (eqStr) {
        eqCount = eqStr.split(',').filter(c => c && c !== '0').length;
      }

      const btn = document.createElement('div');
      btn.className = `char-avatar-btn ${sid === currentSlotId ? 'active' : ''}`;
      btn.setAttribute('data-slot-id', sid);

      let imgHtml = `<img src="images/heroes/${sid}.png" alt="${charName}" onerror="this.src='images/heroes/${charName}.png'; this.onerror=function(){this.src='images/heroes/1.png'}">`;
      let badgeHtml = eqCount > 0 ? `<span class="badge-eq">${eqCount}</span>` : '';
      let tagHtml = `<span class="slot-tag">${sid}</span>`;

      btn.innerHTML = `${imgHtml}${badgeHtml}${tagHtml}`;
      btn.onclick = () => selectCharacter(sid);

      btn.onmouseenter = (e) => showCharTooltip(e, charName, sid, eqCount);
      btn.onmousemove = (e) => moveCharTooltip(e);
      btn.onmouseleave = () => hideCharTooltip();

      container.appendChild(btn);
    }
  }

  function selectCharacter(slotId) {
    currentSlotId = slotId;
    currentChar = LINK_NAME_MAPPING[slotId] || `LINK_${slotId}`;
    detachTooltip();
    renderAll();
  }

  function showCharTooltip(e, name, sid, eqCount) {
    const charTooltip = document.getElementById('charHoverTooltip');
    if (!charTooltip) return;
    const ttName = document.getElementById('charTtName');
    if (ttName) ttName.innerText = name;
    const ttSlot = document.getElementById('charTtSlot');
    if (ttSlot) ttSlot.innerText = `링크 슬롯 #${sid} (LINK_${sid})`;
    const ttEq = document.getElementById('charTtEquip');
    if (ttEq) ttEq.innerText = eqCount > 0 ? `장착 프레임 장비: ${eqCount}개` : `장착 프레임 장비: 없음`;
    charTooltip.classList.add('active');
    moveCharTooltip(e);
  }

    function moveCharTooltip(e) {
    const charTooltip = document.getElementById('charHoverTooltip');
    if (!charTooltip) return;
    let x = e.clientX + 16;
    let y = e.clientY + 16;
    if (x + 220 > window.innerWidth) {
      x = e.clientX - 230;
    }
    if (y + 100 > window.innerHeight) {
      y = window.innerHeight - 110;
    }
    charTooltip.style.left = Math.max(10, x) + 'px';
    charTooltip.style.top = Math.max(10, y) + 'px';
  }

  function hideCharTooltip() {
    const charTooltip = document.getElementById('charHoverTooltip');
    if (charTooltip) charTooltip.classList.remove('active');
  }

  function renderCurrencies() {
    const dustEl = document.getElementById('currDust');
    if (dustEl) dustEl.innerText = currentData['DBEQ_GIN'] || '0';
    const arkEl = document.getElementById('currArk');
    if (arkEl) arkEl.innerText = currentData['DBEQ_ARK'] || '0';
  }

  function renderEquipSlots() {
    detachTooltip();

    const equipKey = `DBEQ_E_${currentSlotId}`;
    const rawEquipStr = currentData[equipKey];
    let equippedCodes = [];
    if (rawEquipStr && typeof rawEquipStr === 'string' && rawEquipStr.trim().length > 0) {
      equippedCodes = rawEquipStr.split(',');
    }

    let equippedCount = 0;
    for (let slot = 0; slot < 16; slot++) {
      const slotEl = document.querySelector(`.equip-slot[data-slot="${slot}"]`);
      if (!slotEl) continue;

      // 1. Completely reset slot element (classes, listeners, title, innerHTML)
      slotEl.className = 'equip-slot';
      slotEl.onmouseenter = null;
      slotEl.onmousemove = null;
      slotEl.onmouseleave = null;
      slotEl.onclick = null;
      slotEl.removeAttribute('title');
      slotEl.innerHTML = `<span class="slot-idx">${SLOT_MAP[slot].hex}</span><span class="slot-label">${SLOT_MAP[slot].name}</span>`;

      // 2. Decode item if exists
      const code = (slot < equippedCodes.length) ? equippedCodes[slot] : '0';
      const item = decodeItem(code, slot);

      if (item) {
        equippedCount++;
        slotEl.classList.add('has-item', item.rarity.class);
        slotEl.innerHTML = `<span class="slot-idx">${SLOT_MAP[slot].hex}</span><img src="${item.icon}" alt="${item.itemName}" onerror="this.src='images/frame_slot_empty.png'">`;
        attachTooltip(slotEl, item);
        slotEl.onclick = () => openItemModal(item, 'equip', slot);
      }
    }

    const eqCountEl = document.getElementById('equipCount');
    if (eqCountEl) eqCountEl.innerText = `장착 ${equippedCount}/16`;
    const statSummaryEl = document.getElementById('statEquipSummary');
    if (statSummaryEl) statSummaryEl.innerText = `장착 ${equippedCount}/16`;
  }

  function renderInventoryGrid() {
    const grid = document.getElementById('invGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const openParts = (currentData['DBEQ_OPEN'] || '36,36').split(',');
    const unlockedCount = parseInt(openParts[0]) || 36;

    const startRow = (currentPage - 1) * 8 + 1;
    const endRow = startRow + 7;

    const prefix = currentTab === 'inventory' ? 'DBEQ_I' : 'DBEQ_B';
    const pageItems = [];

    for (let r = startRow; r <= endRow; r++) {
      const rowStr = currentData[`${prefix}${r}`] || "0,0,0,0,0,0,0,0,0,0,0,0";
      const cols = rowStr.split(',');
      for (let c = 0; c < 12; c++) {
        pageItems.push({
          code: cols[c] || '0',
          row: r,
          col: c
        });
      }
    }

    let currentCount = 0;
    pageItems.forEach((slotData, idx) => {
      const globalSlotIdx = (currentPage - 1) * 96 + idx;
      const isUnlocked = globalSlotIdx < unlockedCount;

      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      slotEl.innerHTML = `<span class="slot-num">${idx + 1}</span>`;

      if (!isUnlocked) {
        slotEl.classList.add('locked');
        slotEl.title = `잠긴 슬롯 (#${globalSlotIdx + 1})`;
      } else {
        const item = decodeItem(slotData.code);
        if (item) {
          currentCount++;
          // Apply filter
          let showItem = true;
          if (currentFilter !== 'all') {
            if (item.slotInfo.cat !== currentFilter) {
              showItem = false;
            }
          }

          if (showItem) {
            slotEl.classList.add('has-item', item.rarity.class);
            slotEl.innerHTML = `<img class="item-icon" src="${item.icon}" alt="${item.itemName}" onerror="this.src='images/frame_slot_empty.png'">`;
            attachTooltip(slotEl, item);
            slotEl.onclick = () => openItemModal(item, currentTab, { row: slotData.row, col: slotData.col });
          } else {
            slotEl.classList.add('filtered-out');
          }
        }
      }

      grid.appendChild(slotEl);
    });

    const pageLabel = document.getElementById('pageLabel');
    if (pageLabel) pageLabel.innerText = `${currentPage} 페이지`;
    const pageSlotCount = document.getElementById('pageSlotCount');
    if (pageSlotCount) pageSlotCount.innerText = `${currentCount} / 96`;
    const invCapacityCount = document.getElementById('invCapacityCount');
    if (invCapacityCount) invCapacityCount.innerText = `${currentCount}/${unlockedCount}`;
  }

  function renderStats() {
    const equipKey = `DBEQ_E_${currentSlotId}`;
    const equipStr = currentData[equipKey] || "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
    const codes = equipStr.split(',');

    const setCountMap = {};
    let totalStats = {
      trigger: 0,
      job: 0,
      reduc: 0,
      dc_chance: 0,
      dc_dmg: 0,
      exp: 0,
      drop: 0,
      str: 0,
      dex: 0,
      int: 0,
      atk_spd: 0,
      mov_spd: 0
    };

    codes.forEach((code, slot) => {
      const item = decodeItem(code, slot);
      if (item) {
        if (item.setName) {
          setCountMap[item.setName] = (setCountMap[item.setName] || 0) + 1;
        }

        const bt = item.baseStatType;
        const bv = item.baseValNum;
        if (bt === '1') totalStats.trigger += bv / 10;
        if (bt === '2') totalStats.reduc += bv / 10;
        if (bt === '3') totalStats.exp += bv / 10;
        if (bt === '4') totalStats.drop += bv / 10;
        if (bt === '5') {
          if (item.baseTargetSlotId === currentSlotId) {
            totalStats.job += bv / 10;
          }
        }
        if (bt === '6') totalStats.str += bv;
        if (bt === '7') totalStats.dex += bv;
        if (bt === '8') totalStats.int += bv;
        if (bt === '9') totalStats.atk_spd += bv / 10;
        if (bt === 'A') totalStats.mov_spd += bv;
        if (bt === 'B') totalStats.dc_chance += bv / 10;
        if (bt === 'C') totalStats.dc_dmg += bv / 10;

        item.options.forEach(opt => {
          const ot = opt.code;
          const ov = opt.valNum;
          if (ot === '1') totalStats.trigger += ov / 10;
          if (ot === '2') totalStats.reduc += ov / 10;
          if (ot === '3') totalStats.exp += ov / 10;
          if (ot === '4') totalStats.drop += ov / 10;
          if (ot === '5') {
            if (opt.targetSlotId === currentSlotId) {
              totalStats.job += ov / 10;
            }
          }
          if (ot === '6') totalStats.str += ov;
          if (ot === '7') totalStats.dex += ov;
          if (ot === '8') totalStats.int += ov;
          if (ot === '9') totalStats.atk_spd += ov / 10;
          if (ot === 'A') totalStats.mov_spd += ov;
          if (ot === 'B') totalStats.dc_chance += ov / 10;
          if (ot === 'C') totalStats.dc_dmg += ov / 10;
        });
      }
    });

    // Set Bonuses calculation
    const setLines = [];
    const countGeobuk = setCountMap['거북선인 문하 무도가'] || 0;
    if (countGeobuk >= 6) {
      totalStats.trigger += 5.0;
      setLines.push(`<span>거북선인 문하 무도가 ${countGeobuk}개 (6세트)</span> <strong style="color:var(--cyan);">트뎀 +5.0%</strong>`);
    } else if (countGeobuk >= 3) {
      totalStats.trigger += 2.0;
      setLines.push(`<span>거북선인 문하 무도가 ${countGeobuk}개 (3세트)</span> <strong style="color:var(--cyan);">트뎀 +2.0%</strong>`);
    }

    const countCheonha = setCountMap['천하제일 무도가'] || 0;
    if (countCheonha >= 9) {
      totalStats.trigger += 10.0;
      setLines.push(`<span>천하제일 무도가 ${countCheonha}개 (9세트)</span> <strong style="color:var(--cyan);">트뎀 +10.0%</strong>`);
    } else if (countCheonha >= 3) {
      totalStats.trigger += 2.0;
      setLines.push(`<span>천하제일 무도가 ${countCheonha}개 (3세트)</span> <strong style="color:var(--cyan);">트뎀 +2.0%</strong>`);
    }

    const countKrillin = setCountMap['크리링의 기원 (크리링 전용)'] || 0;
    if (countKrillin >= 4) {
      totalStats.reduc += 20.0;
      setLines.push(`<span>크리링의 기원 ${countKrillin}개 (4세트)</span> <strong style="color:var(--cyan);">받트뎀 -20%, 영웅뎀 -15%</strong>`);
    }
    if (countKrillin >= 7) {
      setLines.push(`<span>크리링의 기원 7개 (7세트)</span> <strong style="color:#00ff66;">에너지파 → 기원참</strong>`);
    }

    const countFusion = setCountMap['융합의 힘 I'] || 0;
    if (countFusion >= 6) {
      totalStats.trigger += 30.0;
      setLines.push(`<span>융합의 힘 I ${countFusion}개 (6세트)</span> <strong style="color:#00ff66;">트뎀 +30%, 오지터 퓨전 실패 없음, 퓨전 뎀 +50%</strong>`);
    } else if (countFusion >= 4) {
      totalStats.trigger += 20.0;
      totalStats.reduc += 15.0;
      setLines.push(`<span>융합의 힘 I ${countFusion}개 (4세트)</span> <strong style="color:var(--cyan);">트뎀 +20%, 퓨전 시 받트뎀 · 영웅뎀 -15%</strong>`);
    } else if (countFusion >= 2) {
      totalStats.trigger += 10.0;
      setLines.push(`<span>융합의 힘 I ${countFusion}개 (2세트)</span> <strong style="color:var(--cyan);">트뎀 +10%, 퓨전 지속 +20초, 퓨전 뎀 +30%</strong>`);
    }

    const countGogeta = setCountMap['오지터'] || 0;
    if (countGogeta >= 2) {
      totalStats.atk_spd += 30.0;
      setLines.push(`<span>오지터 ${countGogeta}개 (2세트)</span> <strong style="color:var(--cyan);">영웅 공속 및 능력치 대폭 증가</strong>`);
    }

    const setBonusBar = document.getElementById('setBonusBar');
    if (setBonusBar) {
      if (setLines.length > 0) {
        setBonusBar.style.display = 'flex';
        setBonusBar.innerHTML = setLines.map(l => `<div class="set-item-line">${l}</div>`).join('');
      } else {
        setBonusBar.style.display = 'none';
      }
    }

    // Display in stats panel (Support both old & new element IDs)
    const stEl = document.getElementById('stat_trigger') || document.getElementById('stat_trig_dmg');
    if (stEl) stEl.innerText = `+${totalStats.trigger.toFixed(1)}%`;

    const statJobEl = document.getElementById('stat_job');
    if (statJobEl) statJobEl.innerText = `+${totalStats.job.toFixed(1)}%`;

    const sdrEl = document.getElementById('stat_dmg_reduc') || document.getElementById('stat_dmg_red');
    if (sdrEl) sdrEl.innerText = `-${totalStats.reduc.toFixed(1)}%`;

    const sdcEl = document.getElementById('stat_dc_chance');
    if (sdcEl) sdcEl.innerText = `+${totalStats.dc_chance.toFixed(1)}%`;

    const sddEl = document.getElementById('stat_dc_dmg');
    if (sddEl) sddEl.innerText = `+${totalStats.dc_dmg.toFixed(1)}%`;

    const seEl = document.getElementById('stat_exp');
    if (seEl) seEl.innerText = `+${totalStats.exp.toFixed(1)}%`;

    const sdrpEl = document.getElementById('stat_drop');
    if (sdrpEl) sdrpEl.innerText = `+${totalStats.drop.toFixed(1)}%`;

    const sStrEl = document.getElementById('stat_str');
    if (sStrEl) sStrEl.innerText = `+${totalStats.str}`;

    const sDexEl = document.getElementById('stat_dex') || document.getElementById('stat_agi');
    if (sDexEl) sDexEl.innerText = `+${totalStats.dex}`;

    const sIntEl = document.getElementById('stat_int');
    if (sIntEl) sIntEl.innerText = `+${totalStats.int}`;

    const satkEl = document.getElementById('stat_atk_spd');
    if (satkEl) satkEl.innerHTML = `+${totalStats.atk_spd.toFixed(1)}%`;

    const smovEl = document.getElementById('stat_mov_spd');
    if (smovEl) smovEl.innerHTML = `+${totalStats.mov_spd}`;
  }

  // --- Tooltip Logic ---
  function attachTooltip(el, item) {
    el.onmouseenter = (e) => {
      const tooltip = document.getElementById('itemTooltip');
      if (!tooltip) return;

      const ttName = document.getElementById('ttName');
      if (ttName) {
        ttName.innerText = item.itemName;
        ttName.style.color = item.rarity.color;
      }
      const ttMeta = document.getElementById('ttMeta');
      if (ttMeta) ttMeta.innerText = `[${item.rarity.name}] ${item.slotInfo.name}`;
      const ttIcon = document.getElementById('ttIcon');
      if (ttIcon) ttIcon.src = item.icon;

      const statsEl = document.getElementById('ttStats');
      if (statsEl) {
        const isBaseReduc = (item.baseStatType === '2' || item.baseStatType === 'H' || item.baseStatType === 'I');
        let html = `
          <div class="tt-stat-row">
            <span style="color:#d1c4e9; font-weight:bold;">${item.baseStatName}:</span>
            <span style="color:${isBaseReduc ? '#ff8888' : '#00ff66'}; font-weight:bold;">${item.baseValFormatted}</span>
          </div>
        `;

        item.options.forEach(opt => {
          const isReduc = (opt.code === '2' || opt.code === 'H' || opt.code === 'I');
          html += `
            <div class="tt-stat-row">
              <span style="color:#d1c4e9; line-height:1.45;">• ${opt.name}:</span>
              <span style="color:${isReduc ? '#ff8888' : '#00ff66'}; font-weight:bold;">${opt.valFormatted}</span>
            </div>
          `;
        });
        statsEl.innerHTML = html;
      }

      const setEl = document.getElementById('ttSet');
      if (setEl) {
        const setEffect = SET_EFFECTS[item.setName];
        if (setEffect) {
          const descHtml = setEffect.desc.map(d => `<div style="color:#d1c4e9; font-size:11px; margin-top:2px;">• ${d}</div>`).join('');
          setEl.innerHTML = `
            <div style="color:#00ff66; font-weight:bold; font-size:12px; margin-bottom:3px;">${setEffect.title}</div>
            ${descHtml}
          `;
          setEl.style.display = 'block';
        } else if (item.setName && item.setName !== '일반 장비') {
          setEl.innerHTML = `<div style="color:#00ff66; font-weight:bold; font-size:12px;">${item.setName} 세트</div>`;
          setEl.style.display = 'block';
        } else {
          setEl.style.display = 'none';
        }
      }

      tooltip.classList.add('active');
      moveTooltip(e);
    };

    el.onmousemove = (e) => moveTooltip(e);
    el.onmouseleave = () => detachTooltip();
  }

  function detachTooltip(el) {
    if (el) {
      el.onmouseenter = null;
      el.onmousemove = null;
      el.onmouseleave = null;
    }
    const tooltip = document.getElementById('itemTooltip');
    if (tooltip) {
      tooltip.classList.remove('active');
      tooltip.style.display = 'none';
    }
  }

    function moveTooltip(e) {
    const tooltip = document.getElementById('itemTooltip');
    if (!tooltip) return;
    let x = e.clientX + 16;
    let y = e.clientY + 16;
    if (x + 300 > window.innerWidth) {
      x = e.clientX - 310;
    }
    if (y + 260 > window.innerHeight) {
      y = window.innerHeight - 270;
    }
    tooltip.style.left = Math.max(10, x) + 'px';
    tooltip.style.top = Math.max(10, y) + 'px';
  }

  // --- Modal Logic ---
  function openItemModal(item, locationType, locParam) {
    selectedItemModal = { item, locationType, locParam };
    const modal = document.getElementById('actionModal');
    if (!modal) return;

    const title = document.getElementById('modalTitle');
    if (title) title.innerHTML = `<span style="color:${item.rarity.color}">[${item.rarity.name}] ${item.itemName}</span>`;

    const setEffect = SET_EFFECTS[item.setName];
    let setHtml = '';
    if (setEffect) {
      setHtml = `<div style="margin-top:8px; padding-top:6px; border-top:1px dashed var(--border-card); color:#00ff66; font-size:11px;"><strong>${setEffect.title}:</strong><br>${setEffect.desc.join('<br>')}</div>`;
    }

    const body = document.getElementById('modalBody');
    if (body) {
      if (locationType === 'equip' || locationType === 'equipped') {
        body.innerHTML = `
          <strong>기본 능력치:</strong> ${item.baseStatName} ${item.baseValFormatted}<br>
          <strong>옵션:</strong> ${item.options.map(o => o.name + ' ' + o.valFormatted).join(', ') || '없음'}<br>
          <strong>소속 세트:</strong> ${item.setName}<br>
          <strong>장착 부위:</strong> ${item.slotInfo.name} (${item.slotIdx}번 슬롯)
          ${setHtml}
          <div style="margin-top:10px; color:#ffb74d;">이 장비를 해제하여 인벤토리로 이동하시겠습니까?</div>
        `;
      } else {
        body.innerHTML = `
          <strong>기본 능력치:</strong> ${item.baseStatName} ${item.baseValFormatted}<br>
          <strong>옵션:</strong> ${item.options.map(o => o.name + ' ' + o.valFormatted).join(', ') || '없음'}<br>
          <strong>소속 세트:</strong> ${item.setName}<br>
          <strong>장착 부위:</strong> ${item.slotInfo.name} (${item.slotIdx}번 슬롯)
          ${setHtml}
          <div style="margin-top:10px; color:#00e5ff;">이 프레임 장비를 <strong>[${currentChar}]</strong>에게 장착하시겠습니까?</div>
        `;
      }
    }

    const confirmBtn = document.getElementById('modalConfirmBtn');
    if (confirmBtn) {
      if (locationType === 'equip' || locationType === 'equipped') {
        confirmBtn.innerText = '장착 해제 (인벤토리 이동)';
      } else {
        confirmBtn.innerText = '장비 장착하기';
      }
    }

    modal.classList.add('active');
  }

  function closeModal() {
    const modal = document.getElementById('actionModal');
    if (modal) modal.classList.remove('active');
    selectedItemModal = null;
  }

  function confirmModalAction() {
    if (!selectedItemModal) return;
    const { item, locationType, locParam } = selectedItemModal;

    const equipKey = `DBEQ_E_${currentSlotId}`;
    const equipArr = (currentData[equipKey] || "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0").split(',');

    if (locationType === 'equip' || locationType === 'equipped') {
      equipArr[locParam] = '0';
      currentData[equipKey] = equipArr.join(',');

      let placed = false;
      for (let r = 1; r <= 32; r++) {
        const rowArr = (currentData[`DBEQ_I${r}`] || "0,0,0,0,0,0,0,0,0,0,0,0").split(',');
        for (let c = 0; c < 12; c++) {
          if (!rowArr[c] || rowArr[c] === '0') {
            rowArr[c] = item.code;
            currentData[`DBEQ_I${r}`] = rowArr.join(',');
            placed = true;
            break;
          }
        }
        if (placed) break;
      }
    } else {
      const targetSlot = item.slotIdx !== undefined ? item.slotIdx : 0;
      const oldEquipped = equipArr[targetSlot];

      equipArr[targetSlot] = item.code;
      currentData[equipKey] = equipArr.join(',');

      const prefix = locationType === 'inventory' ? 'DBEQ_I' : 'DBEQ_B';
      const sourceRow = (currentData[`${prefix}${locParam.row}`] || "0,0,0,0,0,0,0,0,0,0,0,0").split(',');
      sourceRow[locParam.col] = (oldEquipped && oldEquipped !== '0') ? oldEquipped : '0';
      currentData[`${prefix}${locParam.row}`] = sourceRow.join(',');
    }

    closeModal();
    renderAll();
  }

  function switchStorageTab(tab) {
    currentTab = tab;
    const tInv = document.getElementById('tabInventory') || document.getElementById('tabInv');
    const tVlt = document.getElementById('tabVault');
    if (tab === 'inventory') {
      if (tInv) tInv.classList.add('active');
      if (tVlt) tVlt.classList.remove('active');
    } else {
      if (tInv) tInv.classList.remove('active');
      if (tVlt) tVlt.classList.add('active');
    }
    renderInventoryGrid();
  }

  function switchPage(p) {
    currentPage = p;
    document.querySelectorAll('.inv-page-pill, .page-pill').forEach(el => {
      if (el.innerText.trim() === String(p)) el.classList.add('active');
      else if (!el.classList.contains('add-btn')) el.classList.remove('active');
    });
    renderInventoryGrid();
  }

  function setFilter(cat) {
    currentFilter = cat;
    document.querySelectorAll('.filter-pill, .pill-btn').forEach(el => {
      const onclickAttr = el.getAttribute('onclick') || '';
      if (onclickAttr.includes(`setFilter('${cat}')`)) el.classList.add('active');
      else if (onclickAttr.includes('setFilter(')) el.classList.remove('active');
    });
    renderInventoryGrid();
  }

  function expandSlotPrompt() {
    alert('인게임에서 [지구인의 생명] 아이템을 사용하여 슬롯을 확장할 수 있습니다.');
  }

  // --- HTML Injection & Mount Function ---
  window.initFrameEquip = function(containerId = 'col-frame-equip') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (container.querySelector('.frame-equip-wrapper')) return;

    container.innerHTML = `
      <div class="frame-equip-wrapper">
        <div class="frame-layout">
          <!-- Left: 66 Character Icons Navigation Column (5 per row) -->
          <div class="char-nav-col">
            <div class="char-nav-title">캐릭터 (<span id="charCountDisplay">66</span>)</div>
            <div class="char-avatar-grid" id="charAvatarGrid"></div>
          </div>

          <!-- Right: Main Content (Top: Gear + Inv, Bottom: Stats) -->
          <div class="main-content-col">
            <div class="top-content-row">
              <!-- Equipment 16 Slots -->
              <div class="equip-panel-box">
                <div class="panel-title-sm">장 비</div>
                <div class="equip-grid" id="equipGrid">
                  <div class="equip-slot empty-space"></div>
                  <div class="equip-slot" data-slot="0"><span class="slot-idx">0</span><span class="slot-label">투구</span></div>
                  <div class="equip-slot" data-slot="1"><span class="slot-idx">1</span><span class="slot-label">명예</span></div>
                  <div class="equip-slot" data-slot="2"><span class="slot-idx">2</span><span class="slot-label">도복</span></div>
                  <div class="equip-slot" data-slot="3"><span class="slot-idx">3</span><span class="slot-label">갑옷</span></div>
                  <div class="equip-slot" data-slot="4"><span class="slot-idx">4</span><span class="slot-label">목걸이</span></div>
                  <div class="equip-slot" data-slot="5"><span class="slot-idx">5</span><span class="slot-label">장갑</span></div>
                  <div class="equip-slot" data-slot="6"><span class="slot-idx">6</span><span class="slot-label">벨트</span></div>
                  <div class="equip-slot" data-slot="7"><span class="slot-idx">7</span><span class="slot-label">손목</span></div>
                  <div class="equip-slot" data-slot="8"><span class="slot-idx">8</span><span class="slot-label">귀걸이(좌)</span></div>
                  <div class="equip-slot" data-slot="9"><span class="slot-idx">9</span><span class="slot-label">하의</span></div>
                  <div class="equip-slot" data-slot="10"><span class="slot-idx">A</span><span class="slot-label">귀걸이(우)</span></div>
                  <div class="equip-slot" data-slot="11"><span class="slot-idx">B</span><span class="slot-label">반지(좌)</span></div>
                  <div class="equip-slot empty-space"></div>
                  <div class="equip-slot" data-slot="12"><span class="slot-idx">C</span><span class="slot-label">반지(우)</span></div>
                  <div class="equip-slot" data-slot="13"><span class="slot-idx">D</span><span class="slot-label">무기</span></div>
                  <div class="equip-slot" data-slot="14"><span class="slot-idx">E</span><span class="slot-label">신발</span></div>
                  <div class="equip-slot" data-slot="15"><span class="slot-idx">F</span><span class="slot-label">보조</span></div>
                </div>
              </div>

              <!-- Inventory & Storage Panel -->
              <div class="inv-panel-box">
                <div class="inv-top-bar">
                  <div class="inv-tabs-group">
                    <div class="inv-tab active" id="tabInventory" onclick="switchStorageTab('inventory')">인벤토리</div>
                    <div class="inv-tab" id="tabVault" onclick="switchStorageTab('vault')">보관함</div>
                  </div>
                  <div class="inv-page-info">
                    <span id="pageLabel">1 페이지</span> &nbsp;
                    <strong id="pageSlotCount">0 / 96</strong>
                  </div>
                </div>

                <div class="inv-pages-bar">
                  <div class="inv-page-pills">
                    <div class="inv-page-pill active" onclick="switchPage(1)">1</div>
                    <div class="inv-page-pill" onclick="switchPage(2)">2</div>
                    <div class="inv-page-pill" onclick="switchPage(3)">3</div>
                    <div class="inv-page-pill" onclick="switchPage(4)">4</div>
                    <div class="inv-page-pill add-btn" title="지구인의 생명 소모로 1칸 확장 (DBEQ_OPEN)" onclick="expandSlotPrompt()">+</div>
                  </div>
                  <div class="inv-filter-pills">
                    <div class="filter-pill active" onclick="setFilter('all')">전체</div>
                    <div class="filter-pill" onclick="setFilter('weapon')">무기</div>
                    <div class="filter-pill" onclick="setFilter('armor')">방어구</div>
                    <div class="filter-pill" onclick="setFilter('acc')">장신구</div>
                  </div>
                </div>

                <!-- Compact 12x8 Grid: 34px slots -->
                <div class="inv-grid" id="invGrid"></div>

                <div class="inv-bottom-bar">
                  <div class="inv-action-icons">
                    <div class="action-btn" title="휴지통 (아이템 버리기)">🗑️</div>
                    <div class="action-btn" title="분해 (신기루 가루 획득)">💎</div>
                    <div class="action-btn" title="재연마 / 강화">🔨</div>
                  </div>
                  <div class="inv-currencies">
                    <div class="currency-item">
                      <span>✨ 신기루 가루:</span>
                      <strong id="currDust">0</strong>
                    </div>
                    <div class="currency-item">
                      <span>💎 아크:</span>
                      <strong id="currArk">0</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom: Wide Status Panel -->
            <div class="bottom-stats-box">
              <div class="set-bonus-bar" id="setBonusBar" style="display:none;"></div>
              <div class="stats-header-wide">
                <span class="title">스테이터스 (<span id="statsCharLabel">손오반</span>)</span>
                <span class="count" id="equipCount">장착 0/16</span>
              </div>
              <div class="stats-grid-wide">
                <div class="stat-group">
                  <div class="stat-row"><span class="stat-name">트리거 데미지</span><span class="stat-val highlight" id="stat_trigger">+0.0%</span></div>
                  <div class="stat-row"><span class="stat-name" id="stat_job_label">손오반 전용</span><span class="stat-val highlight" id="stat_job">+0.0%</span></div>
                  <div class="stat-row"><span class="stat-name">받는 피해</span><span class="stat-val" id="stat_dmg_reduc">-0.0%</span></div>
                </div>
                <div class="stat-group">
                  <div class="stat-row"><span class="stat-name">더블 크리 확률</span><span class="stat-val" id="stat_dc_chance">+0.0%</span></div>
                  <div class="stat-row"><span class="stat-name">더블 크리 데미지</span><span class="stat-val" id="stat_dc_dmg">+0.0%</span></div>
                  <div class="stat-row"><span class="stat-name">경험치</span><span class="stat-val" id="stat_exp">+0.0%</span></div>
                  <div class="stat-row"><span class="stat-name">드랍률</span><span class="stat-val" id="stat_drop">+0.0%</span></div>
                </div>
                <div class="stat-group">
                  <div class="stat-row"><span class="stat-name">힘</span><span class="stat-val" id="stat_str">+0</span></div>
                  <div class="stat-row"><span class="stat-name">민첩</span><span class="stat-val" id="stat_dex">+0</span></div>
                  <div class="stat-row"><span class="stat-name">지능</span><span class="stat-val" id="stat_int">+0</span></div>
                </div>
                <div class="stat-group">
                  <div class="stat-row"><span class="stat-name">공격속도</span><span class="stat-val" id="stat_atk_spd">+0.0%</span></div>
                  <div class="stat-row"><span class="stat-name">이동속도</span><span class="stat-val" id="stat_mov_spd">+0</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Ensure Tooltips and Modals
    if (!document.getElementById('itemTooltip')) {
      const tt = document.createElement('div');
      tt.className = 'tooltip-card';
      tt.id = 'itemTooltip';
      tt.innerHTML = `
        <div class="tt-header">
          <img id="ttIcon" src="images/frame/slot_0_helm.png" alt="아이콘">
          <div>
            <div class="tt-title" id="ttName">천하제일 무도가의 투구</div>
            <div class="tt-sub" id="ttMeta">[희귀] 투구</div>
            <div class="tt-raw" id="ttRaw" style="display:none;"></div>
          </div>
        </div>
        <div class="tt-stats" id="ttStats"></div>
        <div class="tt-set" id="ttSet">천하제일 무도가 세트</div>
      `;
      document.body.appendChild(tt);
    }

    if (!document.getElementById('charHoverTooltip')) {
      const ctt = document.createElement('div');
      ctt.className = 'tooltip-card';
      ctt.id = 'charHoverTooltip';
      ctt.style.minWidth = '180px';
      ctt.style.maxWidth = '240px';
      ctt.innerHTML = `
        <div style="font-size:14px; font-weight:bold; color:var(--cyan);" id="charTtName">손오반</div>
        <div style="font-size:11px; color:#aaa; margin-top:2px;" id="charTtSlot">LINK_32</div>
        <div style="font-size:12px; color:#00ff66; margin-top:4px;" id="charTtEquip">장착 프레임 장비: 0개</div>
      `;
      document.body.appendChild(ctt);
    }

    if (!document.getElementById('actionModal')) {
      const md = document.createElement('div');
      md.className = 'action-modal';
      md.id = 'actionModal';
      md.innerHTML = `
        <div class="modal-content">
          <h3 id="modalTitle">아이템 액션</h3>
          <div class="modal-body" id="modalBody"></div>
          <div class="modal-buttons">
            <button class="btn-action" style="background:rgba(32, 19, 51, 0.8); border: 1px solid var(--border-card); color: var(--text-muted);" onclick="closeModal()">취소</button>
            <button class="btn-action" id="modalConfirmBtn" onclick="confirmModalAction()">확인</button>
          </div>
        </div>
      `;
      document.body.appendChild(md);
    }

    renderAll();
  };

  // Global hooks
  window.renderFrameEquip = function() {
    initFrameEquip('col-frame-equip');
    renderAll();
  };

  window.updateFrameEquipData = function(data) {
    if (!data) return;

    // Check if incoming search data has any DBEQ_ entries
    let hasDbeq = false;
    for (const key in data) {
      if (key.startsWith('DBEQ_')) {
        hasDbeq = true;
        break;
      }
    }

    if (hasDbeq) {
      // Merge with preset data so any missing slots or storage rows still have items
      currentData = Object.assign({}, PRESET_DATA, data);
    } else {
      // Incoming user search data has no frame equipment saved; preserve preset data!
      currentData = Object.assign({}, PRESET_DATA);
    }

    // Auto select character with most items
    let bestSlot = 32;
    let maxEquipped = -1;
    for (let sid = 1; sid <= 66; sid++) {
      const eqStr = currentData[`DBEQ_E_${sid}`];
      if (eqStr) {
        const count = eqStr.split(',').filter(c => c && c !== '0').length;
        if (count > maxEquipped) {
          maxEquipped = count;
          bestSlot = sid;
        }
      }
    }
    currentSlotId = bestSlot;
    currentChar = LINK_NAME_MAPPING[bestSlot] || `LINK_${bestSlot}`;
    renderFrameEquip();
  };

  window.switchStorageTab = switchStorageTab;
  window.switchPage = switchPage;
  window.setFilter = setFilter;
  window.expandSlotPrompt = expandSlotPrompt;
  window.closeModal = closeModal;
  window.confirmModalAction = confirmModalAction;

  // Auto initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initFrameEquip('col-frame-equip'));
  } else {
    initFrameEquip('col-frame-equip');
  }

})();
