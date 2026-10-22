/**
 * Dragonball RPG Manager - Hero Icons Helper
 * 61개 전체 영웅 고화질 아이콘 매핑 및 렌더링 헬퍼 모듈
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
    '어린손오반': 16, '어린오반': 16,

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
    '손오반': 32, '미스틱손오반': 32, '얼티밋손오반': 32,

    // 5행
    '도도리아': 33,
    '비델': 34,
    '손오천': 35,
    '트랭크스(어린)': 36, '어린트랭': 36,
    '자봉': 37, '자붕': 37,
    '쿠우라': 38,
    '인조인간15호': 39, '15호': 39,
    '인조인간14호': 40, '14호': 40,

    // 6행
    '우부': 41, '슈퍼우부': 41,
    '타피온': 42, '용사': 42, '환상의용사': 42, '힐데건': 42,
    '농부': 43,
    '인조인간13호': 44, '13호': 44,
    '자넨바': 45, '쟈넨바': 45,
    '블루장군': 46,
    '브로리(전설)': 47, '전설브로리': 47, '브로리': 47,
    '버독': 48,

    // 7행
    '타레스': 49,
    '박테리안': 50,
    '우마왕': 51,
    '팡': 52,
    '하야이드래곤': 53, '하이야': 53,
    '브로리(약해진)': 54, '약브로리': 54,
    '아리': 55,
    '파이크한': 56,

    // 8행
    '베이비': 57,
    '리루도': 58,
    '인조인간8호': 59, '8호': 59,
    '심벌': 60,
    '유린': 61
};

/**
 * 캐릭터 이름 문자열에서 해당 영웅의 슬롯 번호(1~61)를 찾습니다.
 */
function getHeroSlotByName(name) {
    if (!name || typeof name !== 'string') return null;
    const clean = name.replace(/\[.*?\]|\(.*?\)|『.*?』/g, '').trim();
    if (HERO_NAME_TO_SLOT[name]) return HERO_NAME_TO_SLOT[name];
    if (HERO_NAME_TO_SLOT[clean]) return HERO_NAME_TO_SLOT[clean];
    
    // 부분 일치 검사
    for (const [k, v] of Object.entries(HERO_NAME_TO_SLOT)) {
        if (clean.includes(k) || k.includes(clean)) return v;
    }
    return null;
}

/**
 * 고화질 아이콘 이미지 URL 반환
 */
function getHeroIconUrl(name, slotNum) {
    let slot = parseInt(slotNum);
    if (!slot || isNaN(slot) || slot < 1 || slot > 61) {
        slot = getHeroSlotByName(name);
    }
    if (slot && slot >= 1 && slot <= 61) {
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
    const isGoku = (slot === 1) || (charName && typeof charName === 'string' && charName.includes('손오공'));
    const isVegeta = (slot === 9) || (charName && typeof charName === 'string' && charName.includes('베지터'));

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

    return null;
}

window.getSpecialCardTheme = getSpecialCardTheme;
