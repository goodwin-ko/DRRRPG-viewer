/**
 * Dragonball RPG Manager - Hero Icons Helper
 * 66개 전체 영웅 고화질 아이콘 매핑 및 렌더링 헬퍼 모듈
 */

const HERO_NAME_TO_SLOT = {
    // 1행
    '손오공': 1, '극의손오공': 1, '무의식의극의': 1, '초사이어인손오공': 1,
    '크리링': 2,
    '야무치': 3,
    '천진반': 4,
    '무천도사': 5,
    '피콜로': 6,
    '라데츠': 7,
    '내퍼': 8,

    // 2행
    '베지터': 9, '초사이어인베지터': 9, '마인베지터': 9,
    '굴드': 10,
    '리쿰': 11,
    '지스': 12,
    '버터': 13,
    '기뉴': 14,
    '사탄': 15,
    '어린손오반': 16, '어린오반': 16, '손오반(어린)': 16, '손오반 (어린)': 16, '어린 손오반': 16,

    // 3행
    '프리저': 17, '골든프리저': 17,
    '콜드대왕': 18,
    '네일': 19,
    '인조인간16호': 20, '16호': 20,
    '인조인간19호': 21, '19호': 21,
    '인조인간20호': 22, '20호': 22,
    '인조인간17호': 23, '17호': 23,
    '인조인간18호': 24, '18호': 24,

    // 4행
    '셀': 25, '완전체셀': 25,
    '트랭크스(미래)': 26, '트랭크스': 26, '미래트랭크스': 26,
    '부르마': 27,
    '야콩': 28,
    '데브라': 29,
    '비비디': 30, '바비디': 30,
    '마인부우': 31,
    '손오반': 32, '미스틱손오반': 32, '얼티밋손오반': 32, '청년손오반': 32,

    // 5행
    '도도리아': 33,
    '비델': 34,
    '손오천': 35,
    '트랭크스(어린)': 36, '어린트랭': 36, '어린트랭크스': 36, '트랭크스 (어린)': 36,
    '자봉': 37, '자붕': 37,
    '쿠우라': 38, '최종쿠우라': 38,
    '인조인간15호': 39, '15호': 39,
    '인조인간14호': 40, '14호': 40,

    // 6행
    '우부': 41, '슈퍼우부': 41,
    '타피온': 42, '용사': 42, '환상의용사': 42, '힐데건': 42,
    '농부': 43,
    '인조인간13호': 44, '13호': 44,
    '자넨바': 45, '쟈넨바': 45,
    '블루장군': 46,
    '브로리(전설)': 47, '전설브로리': 47, '전설의브로리': 47, '브로리': 47,
    '버독': 48,

    // 7행
    '타레스': 49,
    '박테리안': 50,
    '우마왕': 51,
    '팡': 52,
    '하야이드래곤': 53, '하이야': 53,
    '브로리(약해진)': 54, '약브로리': 54, '약해진브로리': 54,
    '아리': 55,
    '파이크한': 56,

    // 8행
    '베이비': 57,
    '리루도': 58,
    '인조인간8호': 59, '8호': 59,
    '심벌': 60,
    '유린': 61,

    // 9행 (신규 영웅)
    '메탈 쿠우라': 62, '메탈쿠우라': 62,
    '킹 베지터': 63, '킹베지터': 63, '베지터왕': 63,
    '로드 슬러그': 64, '로드슬러그': 64, '슬러그': 64,
    '블랙 오공': 65, '블랙오공': 65, '오공블랙': 65,
    '자마스': 66, '자미스': 66, '합체자마스': 66
};

/**
 * 캐릭터 이름 문자열에서 해당 영웅의 슬롯 번호(1~66)를 찾습니다.
 * - 어린손오반(16) vs 손오반(32), 베지터(9) vs 킹 베지터(63) 등 고유 슬롯 완전 분리
 */
function getHeroSlotByName(name) {
    if (!name || typeof name !== 'string') return null;
    if (HERO_NAME_TO_SLOT[name]) return HERO_NAME_TO_SLOT[name];

    // 태그 제거: [], 『』만 제거하고 ()는 캐릭터 구분을 위해 반드시 보존!
    const raw = name.replace(/\[.*?\]|『.*?』/g, '').trim();
    if (HERO_NAME_TO_SLOT[raw]) return HERO_NAME_TO_SLOT[raw];
    
    const clean = raw.replace(/\s+/g, '');
    if (HERO_NAME_TO_SLOT[clean]) return HERO_NAME_TO_SLOT[clean];

    // 정밀 우선순위 규칙: 유사한 이름을 가진 독립 캐릭터들을 명확히 분리!
    // 1. 어린손오반 (16) vs 손오반 (32)
    if (clean.includes('오반')) {
        if (clean.includes('어린')) return 16;
        return 32;
    }
    // 2. 킹 베지터 (63) vs 베지터 (9)
    if (clean.includes('베지터')) {
        if (clean.includes('킹') || clean.includes('왕')) return 63;
        return 9;
    }
    // 3. 메탈 쿠우라 (62) vs 쿠우라 (38)
    if (clean.includes('쿠우라')) {
        if (clean.includes('메탈')) return 62;
        return 38;
    }
    // 4. 블랙 오공 (65) vs 손오공 (1)
    if (clean.includes('블랙') || clean.includes('오공블랙')) {
        return 65;
    }
    if (clean.includes('손오공') || clean.includes('극의') || clean.includes('오공')) {
        return 1;
    }
    // 5. 트랭크스(어린) (36) vs 트랭크스(미래) (26)
    if (clean.includes('트랭')) {
        if (clean.includes('어린')) return 36;
        return 26;
    }
    // 6. 브로리(약해진) (54) vs 브로리(전설) (47)
    if (clean.includes('브로리')) {
        if (clean.includes('약해진') || clean.includes('약브')) return 54;
        return 47;
    }
    // 7. 자마스 / 자미스 (66)
    if (clean.includes('자마스') || clean.includes('자미스')) {
        return 66;
    }
    // 8. 로드 슬러그 (64)
    if (clean.includes('슬러그')) {
        return 64;
    }

    // 일반 캐릭터 부분 일치 (키 길이 내림차순 검사, 역방향 검사는 제외하여 오매칭 방지)
    const sortedEntries = Object.entries(HERO_NAME_TO_SLOT)
        .sort((a, b) => b[0].length - a[0].length);
    for (const [k, v] of sortedEntries) {
        const cleanK = k.replace(/\s+/g, '');
        if (clean.includes(cleanK)) return v;
    }
    return null;
}

/**
 * 고화질 아이콘 이미지 URL 반환
 */
function getHeroIconUrl(name, slotNum) {
    let slot = parseInt(slotNum);
    if (!slot || isNaN(slot) || slot < 1 || slot > 66) {
        slot = getHeroSlotByName(name);
    }
    if (slot && slot >= 1 && slot <= 66) {
        return `images/heroes/${slot}.png`;
    }
    return null;
}

/**
 * 고화질 아이콘 <img> DOM 엘리먼트 생성
 */
function createHeroIconElement(name, slotNum, size = 26, isFriend = false) {
    const url = getHeroIconUrl(name, slotNum);
    if (!url) return null;
    const img = document.createElement('img');
    img.src = url;
    img.alt = name || '';
    img.className = isFriend ? 'hero-icon-img hero-icon-friend' : 'hero-icon-img';
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
    if (name) img.title = name;
    img.loading = 'lazy';
    img.onerror = function() { this.style.display = 'none'; };
    return img;
}

/**
 * 고화질 아이콘 <img> HTML 문자열 생성
 */
function getHeroIconHtml(name, slotNum, size = 26, isFriend = false) {
    const url = getHeroIconUrl(name, slotNum);
    if (!url) return '';
    const cls = isFriend ? 'hero-icon-img hero-icon-friend' : 'hero-icon-img';
    const titleAttr = name ? `title="${name}"` : '';
    return `<img src="${url}" alt="${name || ''}" class="${cls}" style="width:${size}px;height:${size}px;" ${titleAttr} loading="lazy" onerror="this.style.display='none'">`;
}

// Global scope export
window.HERO_NAME_TO_SLOT = HERO_NAME_TO_SLOT;
window.getHeroSlotByName = getHeroSlotByName;
window.getHeroIconUrl = getHeroIconUrl;
window.createHeroIconElement = createHeroIconElement;
window.getHeroIconHtml = getHeroIconHtml;


/**
 * Horus 유저의 손오공 스페셜 카드 판정 헬퍼
 */
function isSpecialHorusGoku(nicName, charName, slotNum) {
    if (!nicName || typeof nicName !== 'string') return false;
    const isHorus = nicName.trim().toLowerCase() === 'horus';
    if (!isHorus) return false;
    const slot = parseInt(slotNum);
    const isGoku = (slot === 1) || (charName && typeof charName === 'string' && charName.includes('손오공'));
    return isGoku;
}

window.isSpecialHorusGoku = isSpecialHorusGoku;


/**
 * 유저별 스페셜 카드 테마 판정 헬퍼
 * - Horus: 손오공 (SSGSS 초사이어인 블루)
 * - goodwin: 손오공 (초사이어인 로제), 베지터 (갓 & 블루 듀얼)
 */
function getSpecialCardTheme(nicName, charName, slotNum) {
    if (!nicName || typeof nicName !== 'string') return null;
    const nic = nicName.trim().toLowerCase();
    const slot = parseInt(slotNum);
    const isGoku = (slot === 1) || (!slot && charName && typeof charName === 'string' && (charName === '손오공' || (charName.includes('손오공') && !charName.includes('블랙'))));
    const isVegeta = (slot === 9) || (!slot && charName && typeof charName === 'string' && (charName === '베지터' || (charName.includes('베지터') && !charName.includes('킹') && !charName.includes('왕'))));

    // 1. Horus - 손오공 (SSGSS 블루)
    if (nic === 'horus' && isGoku) {
        return {
            className: 'special-card-horus-goku',
            badgeText: 'SSGSS',
            badgeClass: 'horus-special-badge'
        };
    }

    // 2. goodwin - 손오공 (초사이어인 로제)
    if (nic === 'goodwin' && isGoku) {
        return {
            className: 'special-card-goodwin-goku',
            badgeText: 'ROSE',
            badgeClass: 'goodwin-rose-badge'
        };
    }

    // 3. goodwin - 베지터 (갓 & 블루 듀얼)
    if (nic === 'goodwin' && isVegeta) {
        return {
            className: 'special-card-goodwin-vegeta',
            badgeText: 'DUAL',
            badgeClass: 'goodwin-dual-badge'
        };
    }

    // 4. 1m60cm - 전캐릭 올맥스 명예의 전당 (브로리, 손오공, 베지터 등)
    if (nic === '1m60cm') {
        const isBroly = (slot === 47 || slot === 54 || (charName && typeof charName === 'string' && charName.includes('브로리')));
        if (isBroly) {
            return {
                className: 'special-card-1m60cm-broly',
                badgeText: 'V20 LEGEND',
                badgeClass: 'broly-legend-badge'
            };
        }
        if (isGoku) {
            return {
                className: 'special-card-1m60cm-goku',
                badgeText: 'V20 BLADE',
                badgeClass: 'goku-blade-badge'
            };
        }
        if (isVegeta) {
            return {
                className: 'special-card-1m60cm-vegeta',
                badgeText: 'V20 CLASH',
                badgeClass: 'vegeta-clash-badge'
            };
        }
    }

    return null;
}

window.getSpecialCardTheme = getSpecialCardTheme;


/**
 * 1m60cm 전캐릭 올맥스 마스터 판정 헬퍼
 */
function isAllMaxMaster(nicName) {
    if (!nicName || typeof nicName !== 'string') return false;
    return nicName.trim().toLowerCase() === '1m60cm';
}
window.isAllMaxMaster = isAllMaxMaster;

/**
 * 유저별 상단 프로필 헤더 스페셜 테마 매핑
 */
function getSpecialProfileTheme(nicName) {
    if (!nicName || typeof nicName !== 'string') return null;
    const nic = nicName.trim().toLowerCase();
    if (nic === '1m60cm') {
        return {
            className: 'special-profile-1m60cm',
            badgeClass: 'allmax-champion-badge',
            badgeText: '👑 [V20] ALL-MAX MASTER'
        };
    }
    if (nic === 'jyh10') {
        return {
            className: 'special-profile-jyh10',
            badgeClass: 'zamasu-badge',
            badgeText: '👑 ZAMASU'
        };
    }
    return null;
}
window.getSpecialProfileTheme = getSpecialProfileTheme;
