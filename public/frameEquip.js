/* Dragonball RPG - Frame Equipment Component Module (High-Resolution Official Sprite & Frame Engine) */
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

  // --- Preset Data Definitions (including Krillin, Gohan, and full jyh10 sets) ---
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

  // --- Official Database from Worker (Defs, Sets, Kinds, Chars, Parts, Grades, Special) ---
  const eqDat = {
  "defs": {
    "1": {
      "n": "시험용 도복",
      "p": 2,
      "i": "BTNHumanArmorUpOne.blp",
      "c": 0,
      "s": 1,
      "col": "",
      "ic": -1
    },
    "2": {
      "n": "시험용 장갑",
      "p": 5,
      "i": "BTNGauntletsOfOgrePower.blp",
      "c": 0,
      "s": 1,
      "col": "",
      "ic": -1
    },
    "3": {
      "n": "시험용 신발",
      "p": 12,
      "i": "BTNBootsOfSpeed.blp",
      "c": 0,
      "s": 1,
      "col": "",
      "ic": -1
    },
    "4": {
      "n": "시험용 검",
      "p": 11,
      "i": "BTNSteelMelee.blp",
      "c": -1,
      "s": 0,
      "col": "",
      "ic": -1
    },
    "5": {
      "n": "시험용 반지",
      "p": 10,
      "i": "BTNRingGreen.blp",
      "c": -1,
      "s": 0,
      "col": "",
      "ic": -1
    },
    "6": {
      "n": "거북선인 문하 무도가의 투구",
      "p": 0,
      "i": "BTNDB_Beg_Helm.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 5
    },
    "7": {
      "n": "거북선인 문하 무도가의 갑옷",
      "p": 3,
      "i": "BTNDB_Beg_Armor.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 6
    },
    "8": {
      "n": "거북선인 문하 무도가의 목걸이",
      "p": 4,
      "i": "BTNDB_Beg_Neck.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 7
    },
    "9": {
      "n": "거북선인 문하 무도가의 장갑",
      "p": 5,
      "i": "BTNDB_Beg_Glove.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 8
    },
    "10": {
      "n": "거북선인 문하 무도가의 벨트",
      "p": 6,
      "i": "BTNDB_Beg_Belt.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 9
    },
    "11": {
      "n": "거북선인 문하 무도가의 손목",
      "p": 7,
      "i": "BTNDB_Beg_Wrist.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 10
    },
    "12": {
      "n": "거북선인 문하 무도가의 귀걸이",
      "p": 8,
      "i": "BTNDB_Beg_Ear.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 11
    },
    "13": {
      "n": "거북선인 문하 무도가의 하의",
      "p": 9,
      "i": "BTNDB_Beg_Pants.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 12
    },
    "14": {
      "n": "거북선인 문하 무도가의 반지",
      "p": 10,
      "i": "BTNDB_Beg_Ring.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 13
    },
    "15": {
      "n": "거북선인 문하 무도가의 무기",
      "p": 11,
      "i": "BTNDB_Beg_Weapon.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 14
    },
    "16": {
      "n": "거북선인 문하 무도가의 신발",
      "p": 12,
      "i": "BTNDB_Beg_Boots.blp",
      "c": 0,
      "s": 2,
      "col": "",
      "ic": 15
    },
    "17": {
      "n": "천하제일 무도가의 투구",
      "p": 0,
      "i": "BTNDB_Stl_Helm.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 16
    },
    "18": {
      "n": "천하제일 무도가의 갑옷",
      "p": 3,
      "i": "BTNDB_Stl_Armor.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 17
    },
    "19": {
      "n": "천하제일 무도가의 목걸이",
      "p": 4,
      "i": "BTNDB_Stl_Neck.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 18
    },
    "20": {
      "n": "천하제일 무도가의 장갑",
      "p": 5,
      "i": "BTNDB_Stl_Glove.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 19
    },
    "21": {
      "n": "천하제일 무도가의 벨트",
      "p": 6,
      "i": "BTNDB_Stl_Belt.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 20
    },
    "22": {
      "n": "천하제일 무도가의 손목",
      "p": 7,
      "i": "BTNDB_Stl_Wrist.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 21
    },
    "23": {
      "n": "천하제일 무도가의 귀걸이",
      "p": 8,
      "i": "BTNDB_Stl_Ear.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 22
    },
    "24": {
      "n": "천하제일 무도가의 하의",
      "p": 9,
      "i": "BTNDB_Stl_Pants.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 23
    },
    "25": {
      "n": "천하제일 무도가의 반지",
      "p": 10,
      "i": "BTNDB_Stl_Ring.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 24
    },
    "26": {
      "n": "천하제일 무도가의 무기",
      "p": 11,
      "i": "BTNDB_Stl_Weapon.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 25
    },
    "27": {
      "n": "천하제일 무도가의 신발",
      "p": 12,
      "i": "BTNDB_Stl_Boots.blp",
      "c": 0,
      "s": 3,
      "col": "",
      "ic": 26
    },
    "28": {
      "n": "카린탑 무도가의 투구",
      "p": 0,
      "i": "BTNDB_Sil_Helm.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 27
    },
    "29": {
      "n": "카린탑 무도가의 갑옷",
      "p": 3,
      "i": "BTNDB_Sil_Armor.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 28
    },
    "30": {
      "n": "카린탑 무도가의 목걸이",
      "p": 4,
      "i": "BTNDB_Sil_Neck.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 29
    },
    "31": {
      "n": "카린탑 무도가의 장갑",
      "p": 5,
      "i": "BTNDB_Sil_Glove.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 30
    },
    "32": {
      "n": "카린탑 무도가의 벨트",
      "p": 6,
      "i": "BTNDB_Sil_Belt.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 31
    },
    "33": {
      "n": "카린탑 무도가의 손목",
      "p": 7,
      "i": "BTNDB_Sil_Wrist.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 32
    },
    "34": {
      "n": "카린탑 무도가의 귀걸이",
      "p": 8,
      "i": "BTNDB_Sil_Ear.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 33
    },
    "35": {
      "n": "카린탑 무도가의 하의",
      "p": 9,
      "i": "BTNDB_Sil_Pants.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 34
    },
    "36": {
      "n": "카린탑 무도가의 반지",
      "p": 10,
      "i": "BTNDB_Sil_Ring.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 35
    },
    "37": {
      "n": "카린탑 무도가의 무기",
      "p": 11,
      "i": "BTNDB_Sil_Weapon.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 36
    },
    "38": {
      "n": "카린탑 무도가의 신발",
      "p": 12,
      "i": "BTNDB_Sil_Boots.blp",
      "c": 0,
      "s": 4,
      "col": "",
      "ic": 37
    },
    "39": {
      "n": "달인 무도가의 투구",
      "p": 0,
      "i": "BTNDB_Gld_Helm.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 38
    },
    "40": {
      "n": "달인 무도가의 갑옷",
      "p": 3,
      "i": "BTNDB_Gld_Armor.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 39
    },
    "41": {
      "n": "달인 무도가의 목걸이",
      "p": 4,
      "i": "BTNDB_Gld_Neck.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 40
    },
    "42": {
      "n": "달인 무도가의 장갑",
      "p": 5,
      "i": "BTNDB_Gld_Glove.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 41
    },
    "43": {
      "n": "달인 무도가의 벨트",
      "p": 6,
      "i": "BTNDB_Gld_Belt.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 42
    },
    "44": {
      "n": "달인 무도가의 손목",
      "p": 7,
      "i": "BTNDB_Gld_Wrist.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 43
    },
    "45": {
      "n": "달인 무도가의 귀걸이",
      "p": 8,
      "i": "BTNDB_Gld_Ear.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 44
    },
    "46": {
      "n": "달인 무도가의 하의",
      "p": 9,
      "i": "BTNDB_Gld_Pants.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 45
    },
    "47": {
      "n": "달인 무도가의 반지",
      "p": 10,
      "i": "BTNDB_Gld_Ring.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 46
    },
    "48": {
      "n": "달인 무도가의 무기",
      "p": 11,
      "i": "BTNDB_Gld_Weapon.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 47
    },
    "49": {
      "n": "달인 무도가의 신발",
      "p": 12,
      "i": "BTNDB_Gld_Boots.blp",
      "c": 0,
      "s": 5,
      "col": "",
      "ic": 48
    },
    "50": {
      "n": "세계 무도가의 투구",
      "p": 0,
      "i": "BTNDB_God_Helm.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 49
    },
    "51": {
      "n": "세계 무도가의 갑옷",
      "p": 3,
      "i": "BTNDB_God_Armor.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 50
    },
    "52": {
      "n": "세계 무도가의 목걸이",
      "p": 4,
      "i": "BTNDB_God_Neck.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 51
    },
    "53": {
      "n": "세계 무도가의 장갑",
      "p": 5,
      "i": "BTNDB_God_Glove.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 52
    },
    "54": {
      "n": "세계 무도가의 벨트",
      "p": 6,
      "i": "BTNDB_God_Belt.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 53
    },
    "55": {
      "n": "세계 무도가의 손목",
      "p": 7,
      "i": "BTNDB_God_Wrist.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 54
    },
    "56": {
      "n": "세계 무도가의 귀걸이",
      "p": 8,
      "i": "BTNDB_God_Ear.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 55
    },
    "57": {
      "n": "세계 무도가의 하의",
      "p": 9,
      "i": "BTNDB_God_Pants.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 56
    },
    "58": {
      "n": "세계 무도가의 반지",
      "p": 10,
      "i": "BTNDB_God_Ring.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 57
    },
    "59": {
      "n": "세계 무도가의 무기",
      "p": 11,
      "i": "BTNDB_God_Weapon.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 58
    },
    "60": {
      "n": "세계 무도가의 신발",
      "p": 12,
      "i": "BTNDB_God_Boots.blp",
      "c": 0,
      "s": 6,
      "col": "",
      "ic": 59
    },
    "61": {
      "n": "제국의 명예",
      "p": 1,
      "i": "BTNEmpHonor.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": -1
    },
    "62": {
      "n": "오지터의 투구",
      "p": 0,
      "i": "BTNDB_Ozi_Helm.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 61
    },
    "63": {
      "n": "오지터의 갑옷",
      "p": 3,
      "i": "BTNDB_Ozi_Armor.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 62
    },
    "64": {
      "n": "오지터의 목걸이",
      "p": 4,
      "i": "BTNDB_Ozi_Neck.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 63
    },
    "65": {
      "n": "오지터의 장갑",
      "p": 5,
      "i": "BTNDB_Ozi_Glove.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 64
    },
    "66": {
      "n": "오지터의 벨트",
      "p": 6,
      "i": "BTNDB_Ozi_Belt.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 65
    },
    "67": {
      "n": "오지터의 손목",
      "p": 7,
      "i": "BTNDB_Ozi_Wrist.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 66
    },
    "68": {
      "n": "오지터의 귀걸이",
      "p": 8,
      "i": "BTNDB_Ozi_Ear.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 67
    },
    "69": {
      "n": "오지터의 하의",
      "p": 9,
      "i": "BTNDB_Ozi_Pants.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 68
    },
    "70": {
      "n": "오지터의 반지",
      "p": 10,
      "i": "BTNDB_Ozi_Ring.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 69
    },
    "71": {
      "n": "오지터의 무기",
      "p": 11,
      "i": "BTNDB_Ozi_Weapon.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 70
    },
    "72": {
      "n": "오지터의 신발",
      "p": 12,
      "i": "BTNDB_Ozi_Boots.blp",
      "c": 0,
      "s": 0,
      "col": "",
      "ic": 71
    },
    "73": {
      "n": "크리링의 두건",
      "p": 0,
      "i": "BTNDB_Kri_Helm.blp",
      "c": 2,
      "s": 8,
      "col": "FF00FF00",
      "ic": 72
    },
    "74": {
      "n": "크리링의 도복",
      "p": 2,
      "i": "BTNDB_Kri_Robe.blp",
      "c": 2,
      "s": 8,
      "col": "FF00FF00",
      "ic": 73
    },
    "75": {
      "n": "크리링의 장갑",
      "p": 5,
      "i": "BTNDB_Kri_Glove.blp",
      "c": 2,
      "s": 8,
      "col": "FF00FF00",
      "ic": 74
    },
    "76": {
      "n": "크리링의 띠",
      "p": 6,
      "i": "BTNDB_Kri_Belt.blp",
      "c": 2,
      "s": 8,
      "col": "FF00FF00",
      "ic": 75
    },
    "77": {
      "n": "크리링의 손목 붕대",
      "p": 7,
      "i": "BTNDB_Kri_Wrist.blp",
      "c": 2,
      "s": 8,
      "col": "FF00FF00",
      "ic": 76
    },
    "78": {
      "n": "크리링의 하의",
      "p": 9,
      "i": "BTNDB_Kri_Pants.blp",
      "c": 2,
      "s": 8,
      "col": "FF00FF00",
      "ic": 77
    },
    "79": {
      "n": "크리링의 신발",
      "p": 12,
      "i": "BTNDB_Kri_Boots.blp",
      "c": 2,
      "s": 8,
      "col": "FF00FF00",
      "ic": 78
    },
    "80": {
      "n": "베지트의 퓨전귀걸이",
      "p": 8,
      "i": "BTNDB_Potara.blp",
      "c": 0,
      "s": 0,
      "col": "FFFFD700",
      "ic": 79
    },
    "81": {
      "n": "오지터의 수련귀걸이",
      "p": 8,
      "i": "BTNDB_OziTrain.blp",
      "c": 0,
      "s": 0,
      "col": "FFFFD700",
      "ic": 80
    },
    "82": {
      "n": "융합의 머리띠",
      "p": 0,
      "i": "BTNDB_Fs_Helm.blp",
      "c": 0,
      "s": 9,
      "col": "FFCC99FF",
      "ic": 81
    },
    "83": {
      "n": "융합의 도복",
      "p": 2,
      "i": "BTNDB_Fs_Armor.blp",
      "c": 0,
      "s": 9,
      "col": "FFCC99FF",
      "ic": 82
    },
    "84": {
      "n": "융합의 장갑",
      "p": 5,
      "i": "BTNDB_Fs_Glove.blp",
      "c": 0,
      "s": 9,
      "col": "FFCC99FF",
      "ic": 83
    },
    "85": {
      "n": "융합의 띠",
      "p": 6,
      "i": "BTNDB_Fs_Belt.blp",
      "c": 0,
      "s": 9,
      "col": "FFCC99FF",
      "ic": 84
    },
    "86": {
      "n": "융합의 손목 보호대",
      "p": 7,
      "i": "BTNDB_Fs_Wrist.blp",
      "c": 0,
      "s": 9,
      "col": "FFCC99FF",
      "ic": 85
    },
    "87": {
      "n": "융합의 신발",
      "p": 12,
      "i": "BTNDB_Fs_Boots.blp",
      "c": 0,
      "s": 9,
      "col": "FFCC99FF",
      "ic": 86
    },
    "88": {
      "n": "랭커의 휘장",
      "p": 1,
      "i": "BTNDB_Hn_N1.blp",
      "c": 0,
      "s": 0,
      "col": "FF87CEEB",
      "ic": 87
    },
    "89": {
      "n": "랭커의 훈장",
      "p": 1,
      "i": "BTNDB_Hn_N2.blp",
      "c": 0,
      "s": 0,
      "col": "FF87CEEB",
      "ic": 88
    },
    "90": {
      "n": "랭커의 배지",
      "p": 1,
      "i": "BTNDB_Hn_N3.blp",
      "c": 0,
      "s": 0,
      "col": "FF87CEEB",
      "ic": 89
    },
    "91": {
      "n": "챔피언의 휘장",
      "p": 1,
      "i": "BTNDB_Hn_A1.blp",
      "c": 0,
      "s": 0,
      "col": "FFFFD700",
      "ic": 90
    },
    "92": {
      "n": "챔피언의 훈장",
      "p": 1,
      "i": "BTNDB_Hn_A2.blp",
      "c": 0,
      "s": 0,
      "col": "FFFFD700",
      "ic": 91
    },
    "93": {
      "n": "챔피언의 수호 문장",
      "p": 1,
      "i": "BTNDB_Hn_A3.blp",
      "c": 0,
      "s": 0,
      "col": "FFFFD700",
      "ic": 92
    },
    "94": {
      "n": "챔피언의 왕관",
      "p": 1,
      "i": "BTNDB_Hn_A4.blp",
      "c": 0,
      "s": 0,
      "col": "FFFFD700",
      "ic": 93
    },
    "95": {
      "n": "천하제일 챔피언 벨트",
      "p": 1,
      "i": "BTNDB_Hn_A5.blp",
      "c": 0,
      "s": 0,
      "col": "FFFFD700",
      "ic": 94
    },
    "96": {
      "n": "오천크스의 귀걸이",
      "p": 8,
      "i": "BTNDB_GotenksEar.blp",
      "c": 0,
      "s": 0,
      "col": "FFFFD700",
      "ic": 95
    },
    "97": {
      "n": "셀X의 반지",
      "p": 10,
      "i": "BTNDB_CellX_Ring.blp",
      "c": 0,
      "s": 0,
      "col": "FFFFD700",
      "ic": 96
    }
  },
  "sets": {
    "1": {
      "n": "시험",
      "c": 0,
      "nd": [
        2,
        3,
        0
      ],
      "bn": [
        20,
        50,
        0
      ]
    },
    "2": {
      "n": "거북선인 문하 무도가",
      "c": 0,
      "nd": [
        3,
        6,
        9
      ],
      "bn": [
        20,
        40,
        60
      ]
    },
    "3": {
      "n": "천하제일 무도가",
      "c": 0,
      "nd": [
        3,
        6,
        9
      ],
      "bn": [
        30,
        60,
        100
      ]
    },
    "4": {
      "n": "카린탑 무도가",
      "c": 0,
      "nd": [
        3,
        6,
        9
      ],
      "bn": [
        50,
        100,
        150
      ]
    },
    "5": {
      "n": "달인 무도가",
      "c": 0,
      "nd": [
        3,
        6,
        9
      ],
      "bn": [
        70,
        140,
        220
      ]
    },
    "6": {
      "n": "세계 무도가",
      "c": 0,
      "nd": [
        3,
        6,
        9
      ],
      "bn": [
        100,
        200,
        300
      ]
    },
    "7": {
      "n": "오지터",
      "c": 0,
      "nd": [
        3,
        6,
        9
      ],
      "bn": [
        150,
        300,
        450
      ]
    },
    "8": {
      "n": "크리링의 기원",
      "c": 2,
      "nd": [
        4,
        7,
        0
      ],
      "bn": [
        0,
        0,
        0
      ]
    },
    "9": {
      "n": "융합의 힘 I",
      "c": 0,
      "nd": [
        2,
        4,
        6
      ],
      "bn": [
        100,
        200,
        300
      ]
    }
  },
  "kinds": {
    "1": [
      "트리거 데미지",
      "+"
    ],
    "2": [
      "받는 트리거 데미지",
      "-"
    ],
    "3": [
      "경험치",
      "+"
    ],
    "4": [
      "드랍률",
      "+"
    ],
    "5": [
      "트리거 데미지",
      "+"
    ],
    "6": [
      "힘",
      "+"
    ],
    "7": [
      "민첩",
      "+"
    ],
    "8": [
      "지능",
      "+"
    ],
    "9": [
      "공격속도",
      "+"
    ],
    "10": [
      "이동속도",
      "+"
    ],
    "11": [
      "더블 크리티컬 확률",
      "+"
    ],
    "12": [
      "더블 크리티컬 데미지",
      "+"
    ],
    "15": [
      "퓨전 지속시간",
      "+"
    ],
    "16": [
      "퓨전 상태 데미지",
      "+"
    ],
    "17": [
      "퓨전 시 받는 트리거 데미지",
      "-"
    ],
    "18": [
      "퓨전 시 영웅 데미지",
      "-"
    ],
    "13": [
      "기 소모 감소",
      "-"
    ],
    "14": [
      "기 소모 감소",
      "-"
    ]
  },
  "chars": {
    "1": "손오공",
    "2": "크리링",
    "3": "야무치",
    "4": "천진반",
    "5": "무천도사",
    "6": "피콜로",
    "7": "라데츠",
    "8": "내퍼",
    "9": "베지터",
    "10": "굴드",
    "11": "리쿰",
    "12": "지스",
    "13": "버터",
    "14": "캡틴 기뉴",
    "15": "미스터 사탄",
    "16": "손오반(어린)",
    "17": "프리저",
    "18": "콜드대왕",
    "19": "네일",
    "20": "인조인간 16호",
    "21": "인조인간 19호",
    "22": "인조인간 20호",
    "23": "인조인간 17호",
    "24": "인조인간 18호",
    "25": "셀",
    "26": "트랭크스(미래)",
    "27": "부르마",
    "28": "야콩",
    "29": "데브라",
    "30": "바비디",
    "31": "마인부우",
    "32": "손오반",
    "33": "도도리아",
    "34": "비델",
    "35": "손오천",
    "36": "트랭크스(어린)",
    "37": "자봉",
    "38": "쿠우라",
    "39": "인조인간 15호",
    "40": "인조인간 14호",
    "41": "우부",
    "42": "타피온",
    "43": "농부",
    "44": "인조인간 13호",
    "45": "쟈넨바",
    "46": "블루장군",
    "47": "브로리",
    "48": "버독",
    "49": "타레스",
    "50": "박테리안",
    "51": "우마왕",
    "52": "팡",
    "53": "하이야 드래곤",
    "54": "브로리(약해진)",
    "55": "천사 아리",
    "56": "파이크한",
    "57": "베이비",
    "58": "리루도",
    "59": "인조인간 8호",
    "60": "심벌",
    "61": "유린"
  },
  "parts": {
    "0": "투구",
    "1": "명예",
    "2": "도복",
    "3": "갑옷",
    "4": "목걸이",
    "5": "장갑",
    "6": "벨트",
    "7": "손목",
    "8": "귀걸이",
    "9": "하의",
    "10": "반지",
    "11": "무기",
    "12": "신발",
    "13": "보조"
  },
  "grades": {
    "1": "일반",
    "2": "고급",
    "3": "희귀",
    "4": "영웅",
    "5": "전설"
  },
  "special": {
    "DBEqKriSet": 8,
    "DBVgDef": 80,
    "DBOzDef": 81,
    "DBEqFsSet": 9,
    "DBGtDef": 96,
    "DBCxDef": 97
  }
};

  let currentChar = '손오반';
  let currentSlotId = 32;
  let currentData = JSON.parse(JSON.stringify(PRESET_DATA));
  let currentTab = 'inventory'; // 'inventory' | 'vault'
  let currentPage = 1;
  let currentFilter = 'all'; // 'all' | 'weapon' | 'armor' | 'acc'

  const B62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const d62 = s => {
    let r = 0;
    for (const c of s) {
      const j = B62.indexOf(c);
      if (j < 0) return 0;
      r = r * 62 + j;
    }
    return r;
  };

  const SLOTP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 10, 10, 11, 12, 13];
  const SLOT_MAP = {
    0: { hex: '0', name: '투구', part: 0 },
    1: { hex: '1', name: '명예', part: 1 },
    2: { hex: '2', name: '도복', part: 2 },
    3: { hex: '3', name: '갑옷', part: 3 },
    4: { hex: '4', name: '목걸이', part: 4 },
    5: { hex: '5', name: '장갑', part: 5 },
    6: { hex: '6', name: '벨트', part: 6 },
    7: { hex: '7', name: '손목', part: 7 },
    8: { hex: '8', name: '귀걸이(좌)', part: 8 },
    9: { hex: '9', name: '하의', part: 9 },
    10: { hex: 'A', name: '귀걸이(우)', part: 8 },
    11: { hex: 'B', name: '반지(좌)', part: 10 },
    12: { hex: 'C', name: '반지(우)', part: 10 },
    13: { hex: 'D', name: '무기', part: 11 },
    14: { hex: 'E', name: '신발', part: 12 },
    15: { hex: 'F', name: '보조', part: 13 }
  };

  // --- Frame Equipment Max Roll & Max Options Database (Generated from Top 100 Ranker Analysis) ---
  const FRAME_EQUIP_MAX_DB = {"62":{"mo":5,"m":{"6":1615973,"18":239,"8":1781318,"15":74,"17":259,"7":1611926,"2":92,"3":553}},"61":{"mo":3,"m":{"8":12921898,"9":125,"10":80,"7":13323785,"6":12645924}},"88":{"mo":4,"m":{"1":45,"9":166,"10":22,"2":21}},"89":{"mo":4,"m":{"3":177,"10":37,"9":178,"4":173}},"90":{"mo":3,"m":{"6":861221,"1":66,"9":110,"7":778903,"10":21}},"91":{"mo":3,"m":{"1":150,"2":55,"11":41}},"92":{"mo":4,"m":{"3":348,"9":222,"4":414,"1":135}},"95":{"mo":4,"m":{"11":34,"9":300,"1":148,"12":290}},"63":{"mo":5,"m":{"2":93,"8":1825306,"7":1670058,"16":1126,"18":259,"17":242,"6":1754411}},"64":{"mo":5,"m":{"4":605,"3":531,"17":269,"15":71,"18":237,"1":183}},"65":{"mo":5,"m":{"9":487,"6":2013467,"18":240,"11":36,"1":184,"7":1561844,"17":211}},"66":{"mo":5,"m":{"7":1813820,"3":557,"17":236,"8":1818029,"18":247,"4":548,"15":73,"6":1594650}},"67":{"mo":5,"m":{"6":1623393,"17":245,"7":1887036,"18":251,"12":315,"1":186,"9":436,"8":1621646}},"68":{"mo":5,"m":{"4":563,"18":245,"15":70,"3":541,"17":231,"10":91}},"80":{"mo":2,"m":{"15":60,"16":1000}},"81":{"mo":2,"m":{"15":60,"16":1000}},"96":{"mo":2,"m":{"15":60,"17":200}},"69":{"mo":5,"m":{"6":1740546,"8":1858054,"18":244,"16":1336,"7":1673705,"10":93,"17":245,"2":93}},"70":{"mo":5,"m":{"5":319,"1":195,"18":256,"8":1846615,"12":361,"7":1819791,"11":40,"17":252,"6":1862710}},"97":{"mo":2,"m":{"5":500,"2":100}},"71":{"mo":5,"m":{"1":184,"9":450,"6":1832039,"5":331,"7":1798784,"18":239,"16":1297,"17":233,"8":1825011}},"72":{"mo":5,"m":{"10":90,"15":68,"4":555,"18":210,"17":222,"9":424}},"126":{"mo":0,"m":{}},"128":{"mo":0,"m":{}},"133":{"mo":0,"m":{}},"186":{"mo":0,"m":{}},"187":{"mo":0,"m":{}},"190":{"mo":0,"m":{}},"248":{"mo":0,"m":{}},"250":{"mo":0,"m":{}},"254":{"mo":0,"m":{}},"257":{"mo":0,"m":{}},"315":{"mo":0,"m":{}},"374":{"mo":0,"m":{}},"375":{"mo":0,"m":{}},"497":{"mo":0,"m":{}},"560":{"mo":0,"m":{}},"564":{"mo":0,"m":{}},"6":{"mo":5,"m":{"7":336,"6":279,"17":25,"2":11,"16":76,"15":5,"18":39,"3":61,"8":129}},"7":{"mo":4,"m":{"2":12,"7":302,"15":5,"17":39,"6":173,"8":201}},"8":{"mo":3,"m":{"4":45,"15":3,"17":16}},"9":{"mo":4,"m":{"9":64,"7":293,"17":39,"16":94,"6":239,"15":5,"8":305,"18":28,"1":17}},"10":{"mo":4,"m":{"7":309,"8":263,"18":37,"17":34,"16":113,"4":54,"3":61,"6":119}},"11":{"mo":5,"m":{"7":311,"18":12,"6":281,"15":3,"16":85,"9":60,"1":14,"8":213}},"12":{"mo":3,"m":{"4":63,"3":47,"10":12}},"13":{"mo":5,"m":{"8":272,"2":10,"7":273,"17":42,"16":100,"15":5,"10":16,"6":180,"18":39}},"14":{"mo":5,"m":{"1":21,"15":3,"5":30,"18":21,"7":351,"8":278,"6":289,"17":32,"16":67}},"15":{"mo":4,"m":{"1":21,"15":1,"5":19,"9":55,"8":258,"7":301,"16":78,"6":177}},"16":{"mo":3,"m":{"10":14,"16":69,"4":56,"18":30}},"17":{"mo":5,"m":{"8":3133,"15":12,"6":3372,"17":67,"3":120,"7":3237,"16":159,"18":62,"2":16}},"18":{"mo":5,"m":{"2":18,"16":161,"6":3289,"7":3636,"15":11,"8":3207,"17":63,"18":60}},"19":{"mo":5,"m":{"4":108,"16":181,"17":67,"1":36,"3":122,"15":12,"18":65}},"20":{"mo":5,"m":{"9":116,"18":73,"1":32,"7":3296,"8":3532,"17":65,"15":11,"16":161,"6":3645}},"21":{"mo":5,"m":{"8":3671,"15":12,"18":73,"7":3028,"16":158,"6":3523,"4":114,"17":66,"3":104}},"22":{"mo":5,"m":{"6":3280,"16":179,"9":120,"8":2785,"17":73,"1":32,"15":12,"7":3057,"18":65}},"23":{"mo":5,"m":{"3":122,"17":72,"15":11,"4":121,"16":187,"10":29,"18":66}},"24":{"mo":5,"m":{"6":3542,"16":184,"15":11,"8":3554,"17":62,"10":27,"2":16,"7":3227,"18":65}},"25":{"mo":5,"m":{"1":37,"15":11,"8":3389,"18":65,"5":62,"6":3092,"16":155,"7":3098,"17":71}},"26":{"mo":5,"m":{"1":41,"9":120,"6":3449,"5":54,"15":13,"8":3590,"7":3124,"17":62,"16":150}},"27":{"mo":5,"m":{"10":27,"15":10,"17":64,"4":107,"16":168,"18":64,"9":98}},"28":{"mo":5,"m":{"8":31722,"3":157,"18":89,"16":313,"7":32309,"2":28,"15":21,"17":86,"6":30562}},"29":{"mo":5,"m":{"2":33,"7":33885,"8":32258,"18":93,"15":21,"16":328,"6":30864,"17":82}},"30":{"mo":5,"m":{"4":183,"17":82,"3":160,"1":59,"16":311,"18":91,"15":21}},"31":{"mo":5,"m":{"9":174,"1":52,"8":36978,"6":33820,"16":357,"18":80,"7":35744,"17":88,"15":17}},"32":{"mo":5,"m":{"6":33354,"3":156,"18":86,"17":81,"16":312,"15":21,"7":30917,"4":159,"8":31290}},"33":{"mo":5,"m":{"8":32378,"18":95,"17":83,"16":301,"9":170,"7":38598,"1":59,"6":31507,"15":20}},"34":{"mo":5,"m":{"3":179,"4":174,"10":42,"17":85,"15":19,"16":321,"18":86}},"35":{"mo":5,"m":{"8":33817,"6":32811,"2":30,"18":88,"10":42,"16":316,"15":22,"17":84,"7":35197}},"36":{"mo":5,"m":{"5":95,"1":62,"18":78,"7":33251,"17":82,"16":303,"15":21,"6":29532,"8":31525}},"37":{"mo":5,"m":{"1":59,"7":32353,"6":34560,"17":87,"9":150,"8":33381,"15":24,"5":75,"16":347}},"38":{"mo":5,"m":{"10":42,"18":90,"16":311,"17":86,"4":179,"15":20,"9":155}},"39":{"mo":1,"m":{"7":168777}},"40":{"mo":2,"m":{"2":24,"8":147668}},"41":{"mo":3,"m":{"4":155,"3":214,"1":58}},"42":{"mo":4,"m":{"9":167,"8":96727,"6":70167,"1":50}},"45":{"mo":2,"m":{"4":147,"3":110}},"46":{"mo":3,"m":{"8":129194,"2":27,"10":32}},"47":{"mo":4,"m":{"1":40,"7":176155,"6":108299,"8":158698,"5":78}},"48":{"mo":2,"m":{"1":66,"6":72834}},"49":{"mo":3,"m":{"10":40,"9":159,"4":210}},"51":{"mo":3,"m":{"2":32,"6":707766,"8":355314}},"52":{"mo":1,"m":{"4":262}},"53":{"mo":1,"m":{"9":226}},"54":{"mo":2,"m":{"7":978449,"3":291}},"55":{"mo":2,"m":{"8":487227,"9":171}},"56":{"mo":3,"m":{"4":265,"10":47,"3":293}},"57":{"mo":2,"m":{"8":815759,"2":23}},"59":{"mo":3,"m":{"1":61,"6":823572,"5":125}},"60":{"mo":1,"m":{"10":47}},"73":{"mo":4,"m":{"8":1754951,"2":92,"11":38,"5":354,"6":1790571,"7":1743344}},"74":{"mo":5,"m":{"2":93,"7":2009081,"6":1827983,"5":336,"8":1697128}},"75":{"mo":4,"m":{"5":296,"1":182,"12":357,"9":460}},"76":{"mo":4,"m":{"6":1922594,"4":535,"2":94,"3":588,"8":1848229,"7":1648731}},"77":{"mo":4,"m":{"9":509,"5":316,"11":32,"1":177}},"78":{"mo":4,"m":{"7":1670567,"5":329,"10":97,"8":1629176,"2":92,"6":1531355}},"79":{"mo":4,"m":{"10":94,"4":556,"9":486,"5":327}},"82":{"mo":5,"m":{"8":1846301,"16":1230,"18":224,"7":1902443,"15":67,"17":244,"2":89,"6":1841001}},"83":{"mo":5,"m":{"2":93,"6":2015188,"7":1726495,"18":242,"17":242,"8":1545502,"15":63}},"84":{"mo":5,"m":{"9":463,"1":180,"16":1219,"12":355,"11":37}},"85":{"mo":5,"m":{"7":1638590,"15":65,"3":534,"16":1232,"4":558,"8":1589536,"6":1550280}},"86":{"mo":5,"m":{"8":1836715,"7":1847420,"18":237,"6":2023278,"1":192,"17":241,"9":494}},"87":{"mo":5,"m":{"10":91,"9":483,"16":1205,"15":80,"4":598}}};
  const GLOBAL_MAX_BY_KIND = {"6":2023278,"18":259,"8":1858054,"15":80,"17":269,"7":2009081,"2":100,"3":588,"9":509,"10":97,"1":195,"4":605,"11":41,"12":361,"16":1336,"5":500};

  const GC = { 1: '#bebebe', 2: '#50dc5a', 3: '#50a0ff', 4: '#be5fff', 5: '#ff9b2d' };

  function getStarInfo(pct) {
    if (pct >= 100) {
      return { symbol: '★', color: '#00ffff', label: '100% (Cyan)', glow: '0 0 6px #00ffff' };
    } else if (pct >= 90) {
      return { symbol: '★', color: '#ffd700', label: '90%+ (Gold)', glow: '0 0 4px rgba(255,215,0,0.7)' };
    } else if (pct >= 80) {
      return { symbol: '★', color: '#cbd5e1', label: '80%+ (Silver)', glow: '0 0 3px rgba(203,213,225,0.7)' };
    } else if (pct >= 70) {
      return { symbol: '★', color: '#cd7f32', label: '70%+ (Bronze)', glow: '0 0 3px rgba(205,127,50,0.7)' };
    } else if (pct >= 50) {
      return { symbol: '★', color: '#ffffff', label: '50%+ (White)', glow: 'none' };
    } else if (pct > 0) {
      return { symbol: '☆', color: '#64748b', label: '50% 미만', glow: 'none' };
    } else {
      return { symbol: '☆', color: 'rgba(255,255,255,0.22)', label: '미부여 슬롯', glow: 'none' };
    }
  }

  function renderItemStarsHtml(it, isSmall = false) {
    if (!it || !it.d) return '';
    const defId = it.t;
    const dbInfo = FRAME_EQUIP_MAX_DB[defId];
    let maxOpts = (dbInfo && dbInfo.mo) ? dbInfo.mo : 5;
    if (it.o && it.o.length > maxOpts) maxOpts = it.o.length;

    let starsHtml = '';
    for (let i = 0; i < maxOpts; i++) {
      if (it.o && i < it.o.length) {
        const [kd, aux, v] = it.o[i];
        let maxV = (dbInfo && dbInfo.m && dbInfo.m[kd]) ? dbInfo.m[kd] : (GLOBAL_MAX_BY_KIND[kd] || v);
        if (maxV <= 0) maxV = v || 1;
        const pct = Math.min(100, Math.round((v / maxV) * 100));
        const sInfo = getStarInfo(pct);
        const style = `color:${sInfo.color};${sInfo.glow !== 'none' ? ` text-shadow:${sInfo.glow};` : ''}`;
        starsHtml += `<span class="opt-star" style="${style}" title="옵션 ${i + 1}: ${sInfo.label} (${pct}%)">${sInfo.symbol}</span>`;
      } else {
        const sInfo = getStarInfo(0);
        starsHtml += `<span class="opt-star empty" style="color:${sInfo.color};" title="미부여 슬롯">${sInfo.symbol}</span>`;
      }
    }
    return `<span class="item-stars-row ${isSmall ? 'small' : ''}">${starsHtml}</span>`;
  }

  function getItemStatTotals(it) {
    const totals = {};
    if (!it || !it.o) return totals;
    for (const o of it.o) {
      const [kd, aux, v] = o;
      if (kd <= 0) continue;
      const key = (kd === 5) ? `5_${aux}` : `${kd}`;
      const eff = evv(v, it.lv);
      if (!totals[key]) {
        totals[key] = { kd, aux, eff: 0, base: 0 };
      }
      totals[key].eff += eff;
      totals[key].base += v;
    }
    return totals;
  }

  function getEquippedItemForPart(partId) {
    const equipKey = `DBEQ_E_${currentSlotId}`;
    const rawEquipStr = currentData[equipKey];
    if (!rawEquipStr || typeof rawEquipStr !== 'string') return null;
    const codes = rawEquipStr.split(',');

    // If part is 8 (귀걸이: slot 8 or 10):
    if (partId === 8) {
      const it8 = (codes.length > 8 && codes[8] !== '0') ? eqDec(codes[8]) : null;
      if (it8 && it8.d) return it8;
      const it10 = (codes.length > 10 && codes[10] !== '0') ? eqDec(codes[10]) : null;
      if (it10 && it10.d) return it10;
      return null;
    }
    // If part is 10 (반지: slot 11 or 12):
    if (partId === 10) {
      const it11 = (codes.length > 11 && codes[11] !== '0') ? eqDec(codes[11]) : null;
      if (it11 && it11.d) return it11;
      const it12 = (codes.length > 12 && codes[12] !== '0') ? eqDec(codes[12]) : null;
      if (it12 && it12.d) return it12;
      return null;
    }

    // Single slot matching partId
    for (let s = 0; s < 16; s++) {
      if (SLOTP[s] === partId && s < codes.length) {
        const code = codes[s];
        if (code && code !== '0') {
          const eqIt = eqDec(code);
          if (eqIt && eqIt.d) return eqIt;
        }
      }
    }
    return null;
  }

  function formatStatDiff(kd, diffEff) {
    if (diffEff === 0) {
      return `<span class="diff-tag diff-eq">±0</span>`;
    }
    const isPos = diffEff > 0;
    const sign = isPos ? '+' : '-';
    const arrow = isPos ? '▲' : '▼';
    const cls = isPos ? 'diff-pos' : 'diff-neg';
    const absDiff = Math.abs(diffEff);
    
    let text = '';
    if (kd === 15) {
      text = `${sign}${absDiff}초 ${arrow}`;
    } else if (kd === 6 || kd === 7 || kd === 8 || kd === 10 || kd === 13) {
      text = `${sign}${fmt(absDiff)} ${arrow}`;
    } else {
      text = `${sign}${f1(absDiff)}% ${arrow}`;
    }
    return `<span class="diff-tag ${cls}">${text}</span>`;
  }


  function eqDec(e) {
    if (!e || e === '0') return null;
    let n = e.length, lv = 0;
    if (n >= 5 && e[n - 2] === '+') {
      lv = d62(e[n - 1]);
      e = e.slice(0, n - 2);
      n -= 2;
    }
    if (n < 3) return null;
    const it = { t: d62(e.slice(0, 2)), lv: Math.min(Math.max(lv, 0), 10), o: [], raw: e };
    let g = d62(e[2]) - 35, w = 4;
    if (g < 1 || g > 5) {
      g = /\d/.test(e[2]) ? +e[2] : 0;
      w = 3;
    }
    it.g = g;
    let p = 3;
    while (it.o.length < 5 && p + 2 + w <= n) {
      it.o.push([d62(e[p]), d62(e.slice(p + 1, p + 2)), d62(e.slice(p + 2, p + 2 + w))]);
      p += 2 + w;
    }
    const d = eqDat.defs[it.t];
    if (!d) return { t: it.t, g: it.g, lv: it.lv, o: [], unk: 1, d: { n: '미확인 장비', p: 13, ic: -1, c: 0, s: 0, col: '' } };
    it.d = d;
    return it;
  }

  const evv = (v, lv) => {
    const m = 10 + lv;
    return Math.floor(v / 10) * m + Math.floor((v % 10) * m / 10);
  };

  const f1 = n => (n / 10).toFixed(1);
  const fmt = n => Number(n).toLocaleString('ko-KR');
  const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  function eqNameCol(it) {
    return it.d.col ? '#' + it.d.col.slice(2) : (GC[it.g] || '#fff');
  }

  function eqNameTx(it) {
    return (it.lv > 0 ? '+' + it.lv + ' ' : '') + it.d.n;
  }


  function eqLine(it, o, diffTag = '') {
    const [kd, aux, v] = o, K = eqDat.kinds[kd];
    if (!K) return '? ' + v;
    const e = evv(v, it.lv);
    let nm = K[0];
    if (kd === 5) nm = (eqDat.chars[aux] || '?') + ' ' + nm;

    // Calculate percentage against max roll
    const defId = it.t;
    const dbInfo = FRAME_EQUIP_MAX_DB[defId];
    let maxV = (dbInfo && dbInfo.m && dbInfo.m[kd]) ? dbInfo.m[kd] : (GLOBAL_MAX_BY_KIND[kd] || v);
    if (maxV <= 0) maxV = v || 1;
    const pct = Math.min(100, Math.round((v / maxV) * 100));
    const sInfo = getStarInfo(pct);
    const starBadge = `<span class="opt-star" style="color:${sInfo.color};${sInfo.glow !== 'none' ? ` text-shadow:${sInfo.glow};` : ''}; font-size:12px; margin-right:3px;">${sInfo.symbol}</span>`;

    let valStr = '';
    if (kd === 15) valStr = nm + ' +' + e + '초';
    else if (kd === 6 || kd === 7 || kd === 8 || kd === 10) valStr = nm + ' +' + fmt(e);
    else if (kd === 13) valStr = nm + ' -' + fmt(e);
    else valStr = nm + ' ' + K[1] + f1(e) + '%';

    const pctBadge = `<span style="font-size:11px; color:#aaa; margin-left:3px;">(${pct}%)</span>`;
    return `${starBadge}${valStr}${pctBadge}${diffTag ? ' ' + diffTag : ''}`;
  }

  function renderCardInner(it, comparedIt = null, isEquippedCard = false) {
    if (!it || !it.d) return '';
    const d = it.d, st = d.s > 0 ? eqDat.sets[d.s] : null;
    const defId = it.t;
    const dbInfo = FRAME_EQUIP_MAX_DB[defId];
    let maxOpts = (dbInfo && dbInfo.mo) ? dbInfo.mo : 5;
    if (it.o && it.o.length > maxOpts) maxOpts = it.o.length;

    let h = `
      <div style="display:flex; gap:10px; align-items:center; margin-bottom:6px;">
        <div style="width:48px; height:48px; position:relative; background:#0f0b08; border-radius:6px; flex-shrink:0;">
          ${d.ic >= 0 
            ? `<span style="position:absolute; inset:2px; background-image:url('images/frame/eq_icons.webp'); background-size:1000% 1000%; background-position:${(d.ic % 10) * 100 / 9}% ${Math.floor(d.ic / 10) * 100 / 9}%;"></span>`
            : `<span style="position:absolute; inset:2px; display:flex; align-items:center; justify-content:center; color:#ffd9a0; font-weight:bold;">${(d.n||'?')[0]}</span>`
          }
          ${it.g >= 1 && it.g <= 5 
            ? `<span style="position:absolute; inset:0; background-image:url('images/frame/eq_fr.webp'); background-size:600% 100%; background-position:${(it.g - 1) * 20}% 0;"></span>` 
            : ''}
          ${it.lv > 0 ? `<span class="up" style="position:absolute; top:2px; right:2px; font-size:10px; background:#ffd700; color:#000; font-weight:bold; border-radius:3px; padding:0 3px;">+${it.lv}</span>` : ''}
        </div>
        <div>
          <div style="color:${eqNameCol(it)}; font-weight:bold; font-size:14px; line-height:1.2;">${esc(eqNameTx(it))}</div>
          <div style="font-size:11px; color:#aaa; margin-top:2px;">
            <span style="color:${GC[it.g] || '#fff'}; font-weight:600;">[${eqDat.grades[it.g] || '-'}]</span> ${esc(eqDat.parts[d.p] || '')}
          </div>
          <div style="margin-top:3px; display:flex; align-items:center; gap:4px;">
            ${renderItemStarsHtml(it)}
            <span style="font-size:10px; color:#888;">(${it.o ? it.o.length : 0}/${maxOpts}옵)</span>
          </div>
        </div>
      </div>
    `;

    // Options list
    const itTotals = getItemStatTotals(it);
    const compTotals = comparedIt ? getItemStatTotals(comparedIt) : null;

    if (it.o && it.o.length > 0) {
      h += '<div style="margin:6px 0; border-top:1px solid rgba(255,255,255,0.08); padding-top:6px;">';
      for (const o of it.o) {
        if (o[0] > 0) {
          let diffTag = '';
          if (comparedIt) {
            const kd = o[0], aux = o[1], v = o[2];
            const key = (kd === 5) ? `5_${aux}` : `${kd}`;
            const myEff = evv(v, it.lv);
            const compEff = (compTotals && compTotals[key]) ? compTotals[key].eff : 0;
            const diffEff = myEff - compEff;
            diffTag = formatStatDiff(kd, diffEff);
          }
          h += `<div style="font-size:12px; color:#e0e0e0; line-height:1.5;">• ${eqLine(it, o, diffTag)}</div>`;
        }
      }

      // Check if comparedIt has any stats missing from this item
      if (comparedIt && compTotals) {
        const lostStats = [];
        for (const [key, cInfo] of Object.entries(compTotals)) {
          if (!itTotals[key]) {
            let nm = eqDat.kinds[cInfo.kd] ? eqDat.kinds[cInfo.kd][0] : `옵션(${cInfo.kd})`;
            if (cInfo.kd === 5) nm = (eqDat.chars[cInfo.aux] || '?') + ' ' + nm;
            let valStr = '';
            if (cInfo.kd === 15) valStr = `${cInfo.eff}초`;
            else if (cInfo.kd === 6 || cInfo.kd === 7 || cInfo.kd === 8 || cInfo.kd === 10 || cInfo.kd === 13) valStr = fmt(cInfo.eff);
            else valStr = `${f1(cInfo.eff)}%`;
            lostStats.push(`${nm} -${valStr}`);
          }
        }
        if (lostStats.length > 0) {
          h += `<div class="diff-lost-section">`;
          h += `<div style="font-size:11px; color:#ff7043; font-weight:bold; margin-bottom:2px;">⚠️ 교체 시 감소(미보유) 능력치:</div>`;
          for (const ls of lostStats) {
            h += `<div style="font-size:11px; color:#ff8a80; line-height:1.4;">• ${esc(ls)} <span class="diff-tag diff-neg">▼</span></div>`;
          }
          h += `</div>`;
        }
      }
      h += '</div>';
    }

    if (it.lv > 0) {
      h += `<div style="color:#ffd700; font-size:11px; margin-top:4px; border-top:1px dashed rgba(255,215,0,0.3); padding-top:4px;">✨ 강화 +${it.lv} / 10 (모든 옵션 +${it.lv * 10}%)</div>`;
    }

    if (st) {
      h += `<div style="margin-top:6px; border-top:1px solid rgba(255,255,255,0.1); padding-top:4px; color:#00e5ff; font-size:11px; font-weight:bold;">${esc(st.n)} 세트${st.c > 0 ? ` <span style="color:#ffd700;">(${esc(eqDat.chars[st.c] || '')} 전용)</span>` : ''}</div>`;
      h += st.nd.map((n, i) => n > 0 ? `<div style="font-size:10px; color:#aaa; line-height:1.3;">• ${n}세트 : ${st.c > 0 ? esc(eqDat.chars[st.c] || '') + ' 트리거 데미지' : '트리거 데미지'} +${f1(st.bn[i])}%</div>` : '').join('');
    }

    const sp = eqDat.special;
    if (d.n && it.t === sp.DBVgDef) h += '<div style="margin-top:4px; color:#ffd700; font-size:10px; font-weight:bold;">[특수] 포타라 : 퓨전 지속 시간 동안 카운터 100% 카운터로 변경</div>';
    if (it.t === sp.DBGtDef) h += '<div style="margin-top:4px; color:#ffd700; font-size:10px; font-weight:bold;">[특수] 오천크스 : 마그눔 파워 지속시간 공격 주기 2배</div>';
    if (it.t === sp.DBOzDef) h += '<div style="margin-top:4px; color:#ffd700; font-size:10px; font-weight:bold;">[특수] 오지터 : 보너스 1 이어링 착용 시 퓨전 지속시간 3배 증가</div>';
    if (it.t === sp.DBCxDef) h += '<div style="margin-top:4px; color:#ffd700; font-size:10px; font-weight:bold;">[특수] 셀 X : 풀파워 시 모든 공격력 증가</div>';

    return h;
  }

  function eqTip(it) {
    return renderCardInner(it, null, false);
  }

  function eqStatus(items, slot) {
    const S = new Array(19).fill(0), CS = {}, cnt = {};
    let n = 0;
    for (const it of items) {
      if (!it || it.unk) continue;
      n++;
      for (const o of it.o) {
        const kd = o[0];
        if (!kd) continue;
        const e = evv(o[2], it.lv);
        if (kd === 5) CS[o[1]] = (CS[o[1]] || 0) + e * 0.1;
        else if ([6, 7, 8, 10, 13, 15].includes(kd)) S[kd] += e;
        else if (kd > 0 && kd < 19) S[kd] += e * 0.1;
      }
      if (it.d.s > 0) cnt[it.d.s] = (cnt[it.d.s] || 0) + 1;
    }
    const sets = [];
    for (const s in cnt) {
      const st = eqDat.sets[s];
      let step = 0;
      for (let k = 2; k >= 0; k--) {
        if (st.nd[k] > 0 && cnt[s] >= st.nd[k]) {
          step = k + 1;
          break;
        }
      }
      if (step > 0) {
        if (st.c <= 0) S[1] += st.bn[step - 1] * 0.1;
        else CS[st.c] = (CS[st.c] || 0) + st.bn[step - 1] * 0.1;
      }
      sets.push({ n: st.n, c: cnt[s], bn: step ? st.bn[step - 1] : 0, step, id: +s });
    }
    const fs = eqDat.special.DBEqFsSet;
    const fst = sets.find(x => x.id === fs);
    if (fst) {
      if (fst.step >= 1) { S[15] += 20; S[16] += 30; }
      if (fst.step >= 3) S[16] += 50;
      if (fst.step >= 2) { S[17] += 15; S[18] += 15; }
    }
    return { S, CS, sets, n };
  }

  const catOk = (p, c) => c === 'all' || (c === 'weapon' && (p === 11 || p === 13)) || (c === 'armor' && [0, 1, 2, 3, 5, 6, 7, 9, 12].includes(p)) || (c === 'acc' && [4, 8, 10].includes(p));

  // --- Render Functions ---
  function renderAll() {
    const iconHtml = (typeof getHeroIconHtml === 'function') ? getHeroIconHtml(currentChar, currentSlotId, 26) : '';
    const wChar = document.getElementById('windowCharName');
    if (wChar) wChar.innerText = currentChar;
    const hChar = document.getElementById('frame-header-char-name');
    if (hChar) hChar.innerHTML = `<span style="display:inline-flex; align-items:center; gap:6px; vertical-align:middle;">${iconHtml}${currentChar}</span>`;
    const statsChar = document.getElementById('statsCharLabel');
    if (statsChar) statsChar.innerHTML = `<span style="display:inline-flex; align-items:center; gap:4px; vertical-align:middle;">${iconHtml}${currentChar}</span>`;
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
    if (x + 220 > window.innerWidth) x = e.clientX - 230;
    if (y + 100 > window.innerHeight) y = window.innerHeight - 110;
    charTooltip.style.left = Math.max(10, x) + 'px';
    charTooltip.style.top = Math.max(10, y) + 'px';
  }

  function hideCharTooltip() {
    const charTooltip = document.getElementById('charHoverTooltip');
    if (charTooltip) charTooltip.classList.remove('active');
  }

  function renderCurrencies() {
    const dustEl = document.getElementById('currDust');
    if (dustEl) dustEl.innerText = fmt(currentData['DBEQ_GIN'] || 0);
    const arkEl = document.getElementById('currArk');
    if (arkEl) arkEl.innerText = fmt(currentData['DBEQ_ARK'] || 0);
  }

  function renderSlotHtml(it, slotHex, fallbackLabel) {
    let html = '';
    if (slotHex) html += `<span class="slot-idx">${slotHex}</span>`;

    if (it && it.d) {
      const ic = it.d.ic;
      if (ic >= 0) {
        html += `<span class="ic2" style="background-image:url('images/frame/eq_icons.webp'); background-size:1000% 1000%; background-position:${(ic % 10) * 100 / 9}% ${Math.floor(ic / 10) * 100 / 9}%;"></span>`;
      } else {
        html += `<span class="ph">${(it.d.n || '?')[0]}</span>`;
      }
      if (it.g >= 1 && it.g <= 5) {
        html += `<span class="gf" style="background-image:url('images/frame/eq_fr.webp'); background-size:600% 100%; background-position:${(it.g - 1) * 20}% 0;"></span>`;
      }
      if (it.lv > 0) {
        html += `<span class="up">+${it.lv}</span>`;
      }
      html += `<div class="slot-stars-overlay">${renderItemStarsHtml(it, true)}</div>`;
    } else if (fallbackLabel) {
      html += `<span class="slot-label">${fallbackLabel}</span>`;
    }
    return html;
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

      slotEl.className = 'equip-slot';
      slotEl.onmouseenter = null;
      slotEl.onmousemove = null;
      slotEl.onmouseleave = null;
      slotEl.onclick = null;
      slotEl.removeAttribute('title');

      const code = (slot < equippedCodes.length) ? equippedCodes[slot] : '0';
      const it = eqDec(code);

      if (it && it.d) {
        equippedCount++;
        slotEl.classList.add('has-item', `rarity-${it.g}`);
        slotEl.innerHTML = renderSlotHtml(it, SLOT_MAP[slot].hex, null);
        attachTooltip(slotEl, it, true);
        slotEl.onclick = (e) => { if (matchMedia('(hover:none)').matches) showTooltip(e, it, true); };
      } else {
        slotEl.innerHTML = renderSlotHtml(null, SLOT_MAP[slot].hex, SLOT_MAP[slot].name);
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
    const unlockedCount = parseInt(openParts[currentTab === 'inventory' ? 0 : 1]) || 36;

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

      if (!isUnlocked) {
        slotEl.classList.add('locked');
        slotEl.title = `잠긴 슬롯 (#${globalSlotIdx + 1})`;
        slotEl.innerHTML = `<span class="slot-num">${idx + 1}</span>`;
      } else {
        const it = eqDec(slotData.code);
        if (it && it.d) {
          currentCount++;
          let showItem = catOk(it.d.p, currentFilter);

          if (showItem) {
            slotEl.classList.add('has-item', `rarity-${it.g}`);
            slotEl.innerHTML = renderSlotHtml(it, null, null);
            attachTooltip(slotEl, it, false);
            slotEl.onclick = (e) => { if (matchMedia('(hover:none)').matches) showTooltip(e, it, false); };
          } else {
            slotEl.classList.add('filtered-out');
            slotEl.innerHTML = `<span class="slot-num">${idx + 1}</span>`;
          }
        } else {
          slotEl.innerHTML = `<span class="slot-num">${idx + 1}</span>`;
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
    const items = codes.map(eqDec);
    while (items.length < 16) items.push(null);

    const st = eqStatus(items, currentSlotId);

    // Set Bonus lines
    const setLines = [];
    st.sets.forEach(s => {
      if (s.step > 0) {
        setLines.push(`<span>${esc(s.n)} ${s.c}개 (${s.step * 3 >= 9 ? 9 : (s.step === 2 ? 6 : 3)}세트)</span> <strong style="color:#00ff66;">트뎀 +${f1(s.bn)}%</strong>`);
      }
    });

    const setBonusBar = document.getElementById('setBonusBar');
    if (setBonusBar) {
      if (setLines.length > 0) {
        setBonusBar.style.display = 'flex';
        setBonusBar.innerHTML = setLines.map(l => `<div class="set-item-line">${l}</div>`).join('');
      } else {
        setBonusBar.style.display = 'none';
      }
    }

    // Display total stats
    const stEl = document.getElementById('stat_trigger') || document.getElementById('stat_trig_dmg');
    if (stEl) stEl.innerText = `+${st.S[1].toFixed(1)}%`;

    const statJobEl = document.getElementById('stat_job');
    const jobVal = st.CS[currentSlotId] || 0;
    if (statJobEl) statJobEl.innerText = `+${jobVal.toFixed(1)}%`;

    const sdrEl = document.getElementById('stat_dmg_reduc') || document.getElementById('stat_dmg_red');
    if (sdrEl) sdrEl.innerText = `-${st.S[2].toFixed(1)}%`;

    const sdcEl = document.getElementById('stat_dc_chance');
    if (sdcEl) sdcEl.innerText = `+${st.S[11].toFixed(1)}%`;

    const sddEl = document.getElementById('stat_dc_dmg');
    if (sddEl) sddEl.innerText = `+${st.S[12].toFixed(1)}%`;

    const seEl = document.getElementById('stat_exp');
    if (seEl) seEl.innerText = `+${st.S[3].toFixed(1)}%`;

    const sdrpEl = document.getElementById('stat_drop');
    if (sdrpEl) sdrpEl.innerText = `+${st.S[4].toFixed(1)}%`;

    const sStrEl = document.getElementById('stat_str');
    if (sStrEl) sStrEl.innerText = `+${fmt(Math.floor(st.S[6]))}`;

    const sDexEl = document.getElementById('stat_dex');
    if (sDexEl) sDexEl.innerText = `+${fmt(Math.floor(st.S[7]))}`;

    const sIntEl = document.getElementById('stat_int');
    if (sIntEl) sIntEl.innerText = `+${fmt(Math.floor(st.S[8]))}`;

    const sAtkSpdEl = document.getElementById('stat_atk_spd');
    if (sAtkSpdEl) sAtkSpdEl.innerText = `+${st.S[9].toFixed(1)}%`;

    const sMovSpdEl = document.getElementById('stat_mov_spd');
    if (sMovSpdEl) sMovSpdEl.innerText = `+${fmt(Math.floor(st.S[10]))}`;
  }

  // --- Tooltip Handler ---
  function attachTooltip(element, it, isEquippedSlot = false) {
    element.onmouseenter = (e) => showTooltip(e, it, isEquippedSlot);
    element.onmousemove = (e) => moveTooltip(e);
    element.onmouseleave = () => detachTooltip();
  }

  function showTooltip(e, it, isEquippedSlot = false) {
    const tt = document.getElementById('itemTooltip');
    if (!tt || !it || !it.d) return;

    let equippedIt = null;
    if (!isEquippedSlot) {
      equippedIt = getEquippedItemForPart(it.d.p);
    }

    if (equippedIt && equippedIt.raw !== it.raw) {
      // Comparison Mode (Side by Side)
      tt.classList.add('compare-mode');
      tt.innerHTML = `
        <div class="compare-tooltip-wrapper">
          <div class="compare-col target-item">
            <div class="compare-header-badge badge-storage">📦 보관함 장비 (비교 대상)</div>
            ${renderCardInner(it, equippedIt, false)}
          </div>
          <div class="compare-col equipped-item">
            <div class="compare-header-badge badge-equipped">⚔️ 현재 장착 중인 장비</div>
            ${renderCardInner(equippedIt, null, true)}
          </div>
        </div>
      `;
    } else {
      // Single Card Mode
      tt.classList.remove('compare-mode');
      tt.innerHTML = `
        <div class="single-tooltip-wrapper">
          ${isEquippedSlot ? '<div class="compare-header-badge badge-equipped" style="margin-bottom:8px;">⚔️ 현재 장착 중인 장비</div>' : ''}
          ${renderCardInner(it, null, isEquippedSlot)}
          ${!isEquippedSlot && !equippedIt ? `<div style="margin-top:8px;padding-top:6px;border-top:1px dashed rgba(255,255,255,0.12);font-size:11px;color:#888;">💡 현재 부위(${esc(eqDat.parts[it.d.p] || '')})에 장착된 장비가 없습니다.</div>` : ''}
        </div>
      `;
    }

    tt.classList.add('active');
    moveTooltip(e);
  }

  function moveTooltip(e) {
    const tt = document.getElementById('itemTooltip');
    if (!tt) return;
    let x = e.clientX + 16;
    let y = e.clientY + 16;
    const ttWidth = tt.offsetWidth || 320;
    const ttHeight = tt.offsetHeight || 260;
    if (x + ttWidth > window.innerWidth) x = e.clientX - ttWidth - 16;
    if (y + ttHeight > window.innerHeight) y = window.innerHeight - ttHeight - 16;
    tt.style.left = Math.max(10, x) + 'px';
    tt.style.top = Math.max(10, y) + 'px';
  }

  function detachTooltip() {
    const tt = document.getElementById('itemTooltip');
    if (tt) tt.classList.remove('active');
  }

  // --- Modal Control ---
  let pendingModalAction = null;

  function openItemModal(it, source, meta) {
    detachTooltip();
    const modal = document.getElementById('actionModal');
    if (!modal || !it || !it.d) return;

    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const confirmBtn = document.getElementById('modalConfirmBtn');

    if (titleEl) {
      titleEl.innerText = eqNameTx(it);
      titleEl.style.color = eqNameCol(it);
    }

    let actionLabel = '';
    let descriptionText = '';

    if (source === 'equip') {
      actionLabel = '장비 해제';
      descriptionText = `[${currentChar}]이(가) 착용 중인 <strong style="color:${eqNameCol(it)};">${esc(eqNameTx(it))}</strong> 장비를 인벤토리로 해제하시겠습니까?`;
      pendingModalAction = () => unequipItem(meta);
    } else {
      actionLabel = '장비 장착';
      descriptionText = `<strong style="color:${eqNameCol(it)};">${esc(eqNameTx(it))}</strong> 장비를 [${currentChar}]에게 장착하시겠습니까?`;
      pendingModalAction = () => equipItemFromStorage(meta, it);
    }

    if (confirmBtn) {
      confirmBtn.innerText = actionLabel;
      confirmBtn.style.background = source === 'equip' ? 'rgba(255, 77, 77, 0.25)' : 'rgba(0, 229, 255, 0.25)';
      confirmBtn.style.color = source === 'equip' ? '#ff4d4d' : '#00e5ff';
      confirmBtn.style.border = source === 'equip' ? '1px solid #ff4d4d' : '1px solid #00e5ff';
    }

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="font-size:13px; line-height:1.5; color:#ddd; margin-bottom:12px;">
          ${descriptionText}
        </div>
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-card); border-radius:6px; padding:10px; max-height:160px; overflow-y:auto;">
          ${eqTip(it)}
        </div>
      `;
    }

    modal.classList.add('active');
  }

  function closeModal() {
    const modal = document.getElementById('actionModal');
    if (modal) modal.classList.remove('active');
    pendingModalAction = null;
  }

  function confirmModalAction() {
    if (typeof pendingModalAction === 'function') {
      pendingModalAction();
    }
    closeModal();
  }

  function unequipItem(slotIdx) {
    const equipKey = `DBEQ_E_${currentSlotId}`;
    const rawStr = currentData[equipKey] || '';
    const codes = rawStr.split(',');
    while (codes.length < 16) codes.push('0');

    const itemCode = codes[slotIdx];
    if (!itemCode || itemCode === '0') return;

    codes[slotIdx] = '0';
    currentData[equipKey] = codes.join(',');

    renderEquipSlots();
    renderStats();
    renderCharacterAvatars();
  }

  function equipItemFromStorage(meta, it) {
    if (!it || !it.d) return;
    const targetSlot = SLOTP.indexOf(it.d.p);
    const equipKey = `DBEQ_E_${currentSlotId}`;
    const rawStr = currentData[equipKey] || '';
    const codes = rawStr.split(',');
    while (codes.length < 16) codes.push('0');

    const actualSlot = targetSlot >= 0 ? targetSlot : 0;
    codes[actualSlot] = it.raw || '0';
    currentData[equipKey] = codes.join(',');

    renderEquipSlots();
    renderStats();
    renderCharacterAvatars();
  }

  function switchStorageTab(tab) {
    currentTab = tab;
    currentPage = 1;

    const tInv = document.getElementById('tabInventory');
    const tVault = document.getElementById('tabVault');
    if (tInv && tVault) {
      if (tab === 'inventory') {
        tInv.classList.add('active');
        tVault.classList.remove('active');
      } else {
        tVault.classList.add('active');
        tInv.classList.remove('active');
      }
    }

    renderInventoryGrid();
  }

  function switchPage(p) {
    currentPage = p;
    document.querySelectorAll('.inv-page-pill').forEach((pill, idx) => {
      if (idx + 1 === p) pill.classList.add('active');
      else pill.classList.remove('active');
    });
    renderInventoryGrid();
  }

  function setFilter(cat) {
    currentFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      if (btn.getAttribute('data-cat') === cat) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    renderInventoryGrid();
  }

  function expandSlotPrompt() {
    alert('슬롯 확장은 게임 내 상점 및 마법 결정을 통해 진행할 수 있습니다.');
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
                  </div>
                  <div class="inv-filter-group">
                    <button class="filter-btn active" data-cat="all" onclick="setFilter('all')">전체</button>
                    <button class="filter-btn" data-cat="weapon" onclick="setFilter('weapon')">무기</button>
                    <button class="filter-btn" data-cat="armor" onclick="setFilter('armor')">방어구</button>
                    <button class="filter-btn" data-cat="acc" onclick="setFilter('acc')">장신구</button>
                  </div>
                </div>

                <div class="inv-grid-container">
                  <div class="inv-grid" id="invGrid"></div>
                </div>

                <div class="inv-footer-bar">
                  <div class="inv-capacity">
                    슬롯 확장: <strong id="invCapacityCount">0/36</strong>
                    <button class="btn-expand" onclick="expandSlotPrompt()">+</button>
                  </div>
                  <div class="inv-currency">
                    <div class="curr-item"><span class="curr-icon dust-icon">✨</span> 마법결정: <strong id="currDust">0</strong></div>
                    <div class="curr-item"><span class="curr-icon ark-icon">💎</span> 아크: <strong id="currArk">0</strong></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom: Real-Time Stats Display Box -->
            <div class="stats-panel-box">
              <div class="stats-panel-header">
                <span class="stats-title">스탯 요약 (<span id="statsCharLabel">${currentChar}</span>)</span>
                <span class="stats-badge" id="statEquipSummary">장착 0/16</span>
              </div>
              <div class="set-bonus-bar" id="setBonusBar" style="display:none;"></div>
              <div class="stats-grid">
                <div class="stat-cell"><span class="stat-name">트리거 데미지</span><span class="stat-val highlight" id="stat_trigger">+0.0%</span></div>
                <div class="stat-cell"><span class="stat-name" id="stat_job_label">${currentChar} 전용</span><span class="stat-val highlight" id="stat_job">+0.0%</span></div>
                <div class="stat-cell"><span class="stat-name">받는 트뎀 감소</span><span class="stat-val" id="stat_dmg_reduc">-0.0%</span></div>
                <div class="stat-cell"><span class="stat-name">드랍 크리티컬 확률</span><span class="stat-val" id="stat_dc_chance">+0.0%</span></div>
                <div class="stat-cell"><span class="stat-name">드랍 크리티컬 데미지</span><span class="stat-val" id="stat_dc_dmg">+0.0%</span></div>
                <div class="stat-cell"><span class="stat-name">경험치 획득량</span><span class="stat-val" id="stat_exp">+0.0%</span></div>
                <div class="stat-cell"><span class="stat-name">드랍률</span><span class="stat-val" id="stat_drop">+0.0%</span></div>
                <div class="stat-cell"><span class="stat-name">공격속도</span><span class="stat-val" id="stat_atk_spd">+0.0%</span></div>
                <div class="stat-cell"><span class="stat-name">힘</span><span class="stat-val" id="stat_str">+0</span></div>
                <div class="stat-cell"><span class="stat-name">민첩</span><span class="stat-val" id="stat_dex">+0</span></div>
                <div class="stat-cell"><span class="stat-name">지능</span><span class="stat-val" id="stat_int">+0</span></div>
                <div class="stat-cell"><span class="stat-name">이동속도</span><span class="stat-val" id="stat_mov_spd">+0</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Ensure Tooltip and Modal exist
    if (!document.getElementById('itemTooltip')) {
      const tt = document.createElement('div');
      tt.className = 'tooltip-card';
      tt.id = 'itemTooltip';
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

    if (false && !document.getElementById('actionModal')) {
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

    // Reset currentData cleanly for the searched user - NEVER merge with preset or other users
    currentData = {};
    let hasDbeq = false;
    for (const key in data) {
      if (key.startsWith('DBEQ_')) {
        hasDbeq = true;
        currentData[key] = data[key];
      }
    }

    // Auto select character with most items among this searched user's characters
    let bestSlot = 1;
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

    if (maxEquipped > 0) {
      currentSlotId = bestSlot;
      currentChar = LINK_NAME_MAPPING[bestSlot] || `LINK_${bestSlot}`;
    } else {
      if (!currentSlotId || currentSlotId < 1 || currentSlotId > 66) {
        currentSlotId = 1;
      }
      currentChar = LINK_NAME_MAPPING[currentSlotId] || `LINK_${currentSlotId}`;
    }

    renderFrameEquip();
  };

  window.switchStorageTab = switchStorageTab;
  window.switchPage = switchPage;
  window.setFilter = setFilter;
  window.expandSlotPrompt = expandSlotPrompt;
  window.closeModal = closeModal;
  window.confirmModalAction = confirmModalAction;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initFrameEquip('col-frame-equip'));
  } else {
    initFrameEquip('col-frame-equip');
  }

})();
