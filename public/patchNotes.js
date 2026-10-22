/**
 * Dragonball RPG Manager - Patch Notes & Version System
 * 
 * [패치 업데이트 방법]
 * 새로운 패치를 진행할 때마다 아래 PATCH_NOTES 배열의 맨 위에 새 버전 객체를 추가하세요.
 * 상단 버전 표시 배지와 패치노트 모달에 자동으로 최신 버전 및 변경 사항이 반영됩니다.
 */

const PATCH_NOTES = [
    {
        version: "v1.4.3",
        date: "2026-10-22",
        title: "1m60cm 유저 전캐릭 올맥스(ALL-MAX) 명예의 전당 테마 & 랭킹 하이라이트",
        isLatest: true,
        changes: [
            { type: "feat", text: "1m60cm 조회 시 상단 프로필 헤더 3인 성운 일러스트 배너 & 👑 ALL-MAX MASTER 배지 적용" },
            { type: "feat", text: "브로리(폭주 에메랄드 그린/LEGEND), 손오공(로제 블레이드/BLADE), 베지터(에네르기파 격돌/CLASH) 전용 테마 카드 탑재" },
            { type: "feat", text: "랭킹 게시판 내 1m60cm 전용 골드 하이라이트 행, 미니 프로필 원형 아이콘 및 👑 전캐릭 올맥스 칭호 배지 추가" },
            { type: "improve", text: "일러스트 배경 위 텍스트 가독성을 위한 이중 다크 비네팅 그라데이션 및 텍스트 섀도우 최적화" }
        ]
    },
    {
        version: "v1.4.2",
        date: "2026-10-22",
        title: "goodwin 유저 손오공(로제) & 베지터(듀얼) 스페셜 카드 테마 적용",
        changes: [
            { type: "feat", text: "goodwin 조회 시 손오공(초사이어인 로제) & 베지터(갓&블루 듀얼) 전용 배경 일러스트 탑재" },
            { type: "feat", text: "손오공 전용 'ROSE' 뱃지 및 베지터 전용 'DUAL' 뱃지 추가" },
            { type: "style", text: "로제 핑크 네온 아우라 및 갓&블루 투톤 듀얼 아우라 맥동 애니메이션 적용" }
        ]
    },
    {
        version: "v1.4.1",
        date: "2026-10-22",
        title: "Cloudflare 고속 프록시 연동 및 Horus 손오공 스페셜 카드 테마 적용",
        changes: [
            { type: "feat", text: "Horus 유저 손오공 캐릭터 전용 초사이어인 블루 일러스트 배경 & 아우라 테마 탑재" },
            { type: "improve", text: "일러스트 배경 위에서도 모든 스탯/장비/글자가 선명하게 읽히도록 다크 비네팅 & 텍스트 섀도우 강화" },
            { type: "feat", text: "Cloudflare Workers 글로벌 에지 프록시 & 캐시 연동으로 반복 및 멀티 조회 10배 가속" }
        ]
    },
    {
        version: "v1.4.0",
        date: "2026-10-20",
        title: "전체 영웅 캐릭터 고화질 아이콘 시스템 적용",
        changes: [
            { type: "feat", text: "61종 전체 영웅 고화질 일러스트 아이콘 추출 및 HD 리샘플링 적용" },
            { type: "feat", text: "개인 조회 및 멀티 대시보드 캐릭터 이름 및 친구 이름 옆에 고화질 아이콘 표시" },
            { type: "style", text: "아이콘 마우스 오버 시 입체 확대 및 네온 글로우 이펙트 적용" }
        ]
    },
    {
        version: "v1.3.0",
        date: "2026-10-14",
        title: "버전 표시 & 패치노트 시스템 도입 및 GA4 통계 연동",
        changes: [
            { type: "feat", text: "상단 헤더에 실시간 패치 버전 표시 배지 및 클릭 가능한 패치노트 모달 추가" },
            { type: "feat", text: "Google Analytics 4 (GA4) 분리 연동 (개인 조회 / 멀티 조회 별도 통계 수집)" },
            { type: "improve", text: "패치 진행 시마다 최신 버전 번호와 업데이트 내역이 자동 갱신되는 통합 패치 관리 모듈 구축" }
        ]
    },
    {
        version: "v1.2.1",
        date: "2026-09-22",
        title: "Render 서버 안정성 강화 및 캐시 독립 분리",
        changes: [
            { type: "fix", text: "Render Worker Timeout 문제 해결 (Procfile 120초 타임아웃 및 GetLog 루프 최적화)" },
            { type: "fix", text: "GetLog 타임아웃 시에도 캐시된 친구 이름과 각성명이 보존되도록 독립 try 블록 분리" },
            { type: "fix", text: "개인 조회 시 간헐적으로 조회가 멈추던 스크립트 예외 오류 복구" }
        ]
    },
    {
        version: "v1.2.0",
        date: "2026-09-22",
        title: "영웅 데이터 보정 및 외부 링크/스타일 개선",
        changes: [
            { type: "feat", text: "상단 헤더에 DRR 네이버 공식 카페 및 M16 툴 바로가기 링크 버튼 추가" },
            { type: "fix", text: "자붕 → 자봉 오타 전면 수정 및 타피온/용사/힐데건/환상의용사 별칭 및 각성 매핑 지원" },
            { type: "improve", text: "친구 캐릭터 이름 시인성을 높이기 위해 네온 민트 그린(#00FF9D) 컬러 적용" }
        ]
    },
    {
        version: "v1.1.0",
        date: "2026-09-22",
        title: "친구/각성 영구 캐시 시스템 및 아이템 추가",
        changes: [
            { type: "feat", text: "friend_cache.json 영구 캐시 도입으로 과거 플레이 캐릭터도 친구 이름 및 각성명 영구 유지" },
            { type: "feat", text: "신규 아이템 및 칭호 6종 데이터 추가 (562, 587, 588, 685, 701, 703)" },
            { type: "fix", text: "손오공(1번 슬롯)과 유린 간 캐릭터 오매핑 현상 수정" }
        ]
    },
    {
        version: "v1.0.0",
        date: "2026-07-19",
        title: "Dragonball Manager 공식 오픈",
        changes: [
            { type: "feat", text: "M16 전적 기반 드래곤볼 RPG 캐릭터 스탯/장비/가방 실시간 개인 조회 기능 오픈" },
            { type: "feat", text: "최대 4인 동시 파티 비교 및 올맥스(ALL MAX) 달성 등급 판정 멀티 대시보드 지원" },
            { type: "feat", text: "장비 도감 및 세트/아이템 상세 툴팁 팝업 지원" }
        ]
    }
];

// ─── UI Styles Injection ───
function injectPatchNotesStyles() {
    if (document.getElementById('patch-notes-styles')) return;

    const style = document.createElement('style');
    style.id = 'patch-notes-styles';
    style.textContent = `
        /* Patch Version Badge */
        .patch-version-btn {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 4px 11px;
            border-radius: 999px;
            background: rgba(0, 229, 255, 0.08);
            border: 1px solid rgba(0, 229, 255, 0.35);
            color: #00e5ff;
            font-family: 'Outfit', 'Noto Sans KR', sans-serif;
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.3px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
            white-space: nowrap;
            box-shadow: 0 0 10px rgba(0, 229, 255, 0.12);
            flex-shrink: 0;
        }

        .patch-version-btn:hover {
            background: rgba(0, 229, 255, 0.2);
            border-color: #00e5ff;
            box-shadow: 0 0 16px rgba(0, 229, 255, 0.45);
            transform: translateY(-1px);
            color: #ffffff;
        }

        .patch-version-btn .patch-pulse-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background-color: #00ff66;
            box-shadow: 0 0 8px #00ff66;
            animation: patchPulse 1.8s infinite ease-in-out;
            flex-shrink: 0;
        }

        @keyframes patchPulse {
            0% { transform: scale(0.9); opacity: 0.7; box-shadow: 0 0 4px #00ff66; }
            50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 12px #00ff66; }
            100% { transform: scale(0.9); opacity: 0.7; box-shadow: 0 0 4px #00ff66; }
        }

        .patch-version-btn .patch-text-label {
            font-size: 0.72rem;
            color: rgba(240, 235, 247, 0.75);
            font-weight: 500;
            margin-left: 2px;
            padding-left: 6px;
            border-left: 1px solid rgba(0, 229, 255, 0.25);
        }

        .patch-version-btn:hover .patch-text-label {
            color: #ffffff;
        }

        /* Modal Overlay */
        .patch-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(8, 4, 18, 0.78);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.25s ease, visibility 0.25s ease;
            padding: 16px;
            box-sizing: border-box;
        }

        .patch-modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        /* Modal Container */
        .patch-modal-container {
            background: linear-gradient(145deg, #160d2a, #0e071c);
            border: 1px solid rgba(192, 132, 252, 0.35);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(192, 132, 252, 0.2);
            border-radius: 16px;
            width: 100%;
            max-width: 680px;
            max-height: 84vh;
            display: flex;
            flex-direction: column;
            transform: scale(0.92) translateY(10px);
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
            color: #f0ebf7;
            font-family: 'Noto Sans KR', sans-serif;
        }

        .patch-modal-overlay.active .patch-modal-container {
            transform: scale(1) translateY(0);
        }

        /* Modal Header */
        .patch-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 24px;
            background: rgba(22, 13, 38, 0.9);
            border-bottom: 1px solid rgba(192, 132, 252, 0.2);
        }

        .patch-modal-title-wrap {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .patch-modal-title {
            margin: 0;
            font-size: 1.15rem;
            font-weight: 800;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .patch-modal-title svg {
            color: #00e5ff;
        }

        .patch-modal-latest-badge {
            background: linear-gradient(135deg, #00e5ff, #0088ff);
            color: #07040f;
            font-size: 0.72rem;
            font-weight: 900;
            padding: 2px 8px;
            border-radius: 6px;
            letter-spacing: 0.5px;
        }

        .patch-modal-close {
            background: transparent;
            border: none;
            color: #9589b2;
            cursor: pointer;
            padding: 6px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .patch-modal-close:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.1);
            transform: rotate(90deg);
        }

        /* Modal Body */
        .patch-modal-body {
            padding: 20px 24px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 20px;
            scrollbar-width: thin;
            scrollbar-color: rgba(192, 132, 252, 0.4) transparent;
        }

        .patch-modal-body::-webkit-scrollbar {
            width: 6px;
        }
        .patch-modal-body::-webkit-scrollbar-thumb {
            background: rgba(192, 132, 252, 0.35);
            border-radius: 4px;
        }
        .patch-modal-body::-webkit-scrollbar-track {
            background: transparent;
        }

        /* Timeline Patch Item */
        .patch-item {
            position: relative;
            background: rgba(14, 9, 22, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 18px 20px;
            transition: all 0.2s;
        }

        .patch-item.is-latest {
            border-color: rgba(0, 229, 255, 0.4);
            background: linear-gradient(180deg, rgba(0, 229, 255, 0.06), rgba(14, 9, 22, 0.85));
            box-shadow: 0 4px 20px rgba(0, 229, 255, 0.08);
        }

        .patch-item-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
            flex-wrap: wrap;
            gap: 8px;
        }

        .patch-item-version-group {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .patch-item-version {
            font-family: 'Outfit', sans-serif;
            font-size: 1.15rem;
            font-weight: 800;
            color: #00e5ff;
        }

        .patch-item.is-latest .patch-item-version {
            color: #00ffaa;
            text-shadow: 0 0 10px rgba(0, 255, 170, 0.4);
        }

        .patch-item-date {
            font-size: 0.8rem;
            color: #8c82a5;
        }

        .patch-item-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #f5f2fa;
            margin: 0 0 12px 0;
            line-height: 1.4;
        }

        .patch-item-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .patch-change-row {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 0.86rem;
            line-height: 1.5;
            color: #d8cfe5;
        }

        .patch-tag {
            font-size: 0.7rem;
            font-weight: 800;
            padding: 1px 7px;
            border-radius: 4px;
            text-transform: uppercase;
            flex-shrink: 0;
            margin-top: 2px;
            letter-spacing: 0.3px;
        }

        .patch-tag.feat {
            background: rgba(0, 255, 102, 0.15);
            color: #00ff66;
            border: 1px solid rgba(0, 255, 102, 0.35);
        }

        .patch-tag.fix {
            background: rgba(255, 77, 106, 0.15);
            color: #ff4d6a;
            border: 1px solid rgba(255, 77, 106, 0.35);
        }

        .patch-tag.improve {
            background: rgba(0, 180, 255, 0.15);
            color: #00b4ff;
            border: 1px solid rgba(0, 180, 255, 0.35);
        }

        .patch-tag.style {
            background: rgba(192, 132, 252, 0.15);
            color: #c084fc;
            border: 1px solid rgba(192, 132, 252, 0.35);
        }

        .patch-tag.notice {
            background: rgba(255, 208, 0, 0.15);
            color: #ffd000;
            border: 1px solid rgba(255, 208, 0, 0.35);
        }

        /* Modal Footer */
        .patch-modal-footer {
            padding: 14px 24px;
            background: rgba(18, 10, 32, 0.9);
            border-top: 1px solid rgba(192, 132, 252, 0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #8c82a5;
        }

        .patch-modal-confirm-btn {
            background: linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(192, 132, 252, 0.25));
            border: 1px solid rgba(0, 229, 255, 0.4);
            color: #ffffff;
            font-weight: 700;
            padding: 6px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .patch-modal-confirm-btn:hover {
            background: linear-gradient(135deg, rgba(0, 229, 255, 0.35), rgba(192, 132, 252, 0.4));
            border-color: #00e5ff;
            box-shadow: 0 0 12px rgba(0, 229, 255, 0.3);
        }

        /* Responsive Styles */
        @media (max-width: 640px) {
            .patch-version-btn {
                padding: 3px 8px;
                font-size: 0.75rem;
            }
            .patch-version-btn .patch-text-label {
                display: none;
            }
            .patch-modal-container {
                max-height: 90vh;
                border-radius: 12px;
            }
            .patch-modal-header {
                padding: 14px 16px;
            }
            .patch-modal-title {
                font-size: 1rem;
            }
            .patch-modal-body {
                padding: 14px 16px;
                gap: 14px;
            }
            .patch-item {
                padding: 14px 14px;
            }
            .patch-change-row {
                font-size: 0.82rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// ─── Modal HTML Rendering ───
function getTagLabel(type) {
    switch (type) {
        case 'feat': return { label: '신규', className: 'feat' };
        case 'fix': return { label: '수정', className: 'fix' };
        case 'improve': return { label: '개선', className: 'improve' };
        case 'style': return { label: '디자인', className: 'style' };
        default: return { label: '안내', className: 'notice' };
    }
}

function renderPatchModal() {
    if (document.getElementById('patch-modal-overlay')) return;

    const latest = PATCH_NOTES[0] || { version: "v1.0.0" };

    const overlay = document.createElement('div');
    overlay.id = 'patch-modal-overlay';
    overlay.className = 'patch-modal-overlay';

    let listHtml = '';
    PATCH_NOTES.forEach((patch, index) => {
        const isLatest = index === 0;
        let changesHtml = '';
        (patch.changes || []).forEach(ch => {
            const tag = getTagLabel(ch.type);
            changesHtml += `
                <li class="patch-change-row">
                    <span class="patch-tag ${tag.className}">${tag.label}</span>
                    <span>${ch.text}</span>
                </li>
            `;
        });

        listHtml += `
            <div class="patch-item ${isLatest ? 'is-latest' : ''}">
                <div class="patch-item-header">
                    <div class="patch-item-version-group">
                        <span class="patch-item-version">${patch.version}</span>
                        ${isLatest ? '<span class="patch-modal-latest-badge">LATEST</span>' : ''}
                    </div>
                    <span class="patch-item-date">${patch.date}</span>
                </div>
                <h4 class="patch-item-title">${patch.title}</h4>
                <ul class="patch-item-list">
                    ${changesHtml}
                </ul>
            </div>
        `;
    });

    overlay.innerHTML = `
        <div class="patch-modal-container" onclick="event.stopPropagation()">
            <div class="patch-modal-header">
                <div class="patch-modal-title-wrap">
                    <h3 class="patch-modal-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        업데이트 & 패치노트
                    </h3>
                    <span class="patch-modal-latest-badge">${latest.version}</span>
                </div>
                <button class="patch-modal-close" onclick="closePatchNotesModal()" title="닫기">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="patch-modal-body">
                ${listHtml}
            </div>
            <div class="patch-modal-footer">
                <span>Dragonball Manager Version History</span>
                <button class="patch-modal-confirm-btn" onclick="closePatchNotesModal()">닫기</button>
            </div>
        </div>
    `;

    overlay.addEventListener('click', closePatchNotesModal);
    document.body.appendChild(overlay);

    // ESC Key to close
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePatchNotesModal();
        }
    });
}

function openPatchNotesModal() {
    renderPatchModal();
    const overlay = document.getElementById('patch-modal-overlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePatchNotesModal() {
    const overlay = document.getElementById('patch-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ─── Mount Version Badge to Header ───
function mountPatchVersionBadge() {
    injectPatchNotesStyles();

    const latest = PATCH_NOTES[0] || { version: "v1.0.0" };

    // Create Badge Element
    const badge = document.createElement('button');
    badge.type = 'button';
    badge.className = 'patch-version-btn';
    badge.title = '클릭하여 패치노트 확인';
    badge.innerHTML = `
        <span class="patch-pulse-dot"></span>
        <span>${latest.version}</span>
        <span class="patch-text-label">패치노트</span>
    `;
    badge.addEventListener('click', (e) => {
        e.preventDefault();
        openPatchNotesModal();
    });

    // Mount Target:
    // 1. Explicit target container if present
    const explicitTarget = document.getElementById('patch-version-area');
    if (explicitTarget) {
        explicitTarget.innerHTML = '';
        explicitTarget.appendChild(badge);
        return;
    }

    // 2. Insert into .logo-area (right after logo text or before tabs)
    const logoArea = document.querySelector('.logo-area');
    if (logoArea) {
        const tabs = logoArea.querySelector('.page-switch-tabs');
        if (tabs) {
            logoArea.insertBefore(badge, tabs);
        } else {
            logoArea.appendChild(badge);
        }
        return;
    }

    // 3. Fallback: Top of main-header or top-header
    const header = document.querySelector('.main-header') || document.querySelector('.top-header');
    if (header) {
        header.prepend(badge);
    }
}

// Auto Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountPatchVersionBadge);
} else {
    mountPatchVersionBadge();
}

// Global functions for inline usage
window.openPatchNotesModal = openPatchNotesModal;
window.closePatchNotesModal = closePatchNotesModal;
