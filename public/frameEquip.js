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

// --- Frame Equipment Max Roll & Max Options Database (Updated with 5,210 Items from Top 100 Ranker Analysis) ---
  const FRAME_EQUIP_MAX_DB = {"62":{"mo":5,"m":{"8":1781318,"15":74,"6":1615973,"17":259,"7":1611926,"2":92,"18":250,"3":553}},"61":{"mo":3,"m":{"8":12921898,"9":125,"10":80,"6":12645924,"7":13323785}},"88":{"mo":4,"m":{"1":45,"9":166,"10":22,"2":21}},"89":{"mo":4,"m":{"3":177,"10":37,"9":178,"4":173}},"90":{"mo":3,"m":{"7":778903,"6":861221,"1":66,"9":110,"10":21}},"91":{"mo":3,"m":{"1":150,"2":55,"11":41}},"92":{"mo":4,"m":{"3":348,"9":222,"4":414,"1":135}},"95":{"mo":4,"m":{"11":34,"9":300,"1":148,"12":290}},"63":{"mo":5,"m":{"2":93,"6":1754411,"17":242,"8":1825306,"16":1126,"18":259,"7":1670058}},"64":{"mo":5,"m":{"4":605,"17":269,"1":183,"3":563,"18":241,"15":71}},"65":{"mo":5,"m":{"9":487,"17":211,"11":37,"7":1825450,"6":2013467,"18":243,"1":184}},"66":{"mo":5,"m":{"6":1700031,"3":557,"4":548,"15":73,"18":247,"17":236,"8":1818029,"7":1813820}},"67":{"mo":5,"m":{"7":1887036,"18":251,"12":320,"8":1621646,"9":469,"1":186,"17":245,"6":1809704}},"68":{"mo":5,"m":{"3":541,"17":231,"4":563,"18":245,"10":92,"15":74}},"80":{"mo":2,"m":{"15":60,"16":1000}},"81":{"mo":2,"m":{"15":60,"16":1000}},"96":{"mo":2,"m":{"15":60,"17":200}},"69":{"mo":5,"m":{"6":1740546,"16":1336,"18":244,"2":93,"8":1858054,"17":245,"10":93,"7":1673705}},"70":{"mo":5,"m":{"1":195,"11":40,"5":322,"17":252,"18":256,"8":1846615,"12":364,"7":1851860,"6":1862710}},"97":{"mo":2,"m":{"5":500,"2":100}},"71":{"mo":5,"m":{"1":184,"8":1825011,"7":1798784,"5":331,"9":450,"6":1845608,"16":1297,"18":244,"17":250}},"72":{"mo":5,"m":{"10":93,"4":555,"17":222,"18":210,"9":424,"15":68}},"126":{"mo":0,"m":{}},"128":{"mo":0,"m":{}},"130":{"mo":0,"m":{}},"132":{"mo":0,"m":{}},"133":{"mo":0,"m":{}},"186":{"mo":0,"m":{}},"187":{"mo":0,"m":{}},"188":{"mo":0,"m":{}},"190":{"mo":0,"m":{}},"191":{"mo":0,"m":{}},"248":{"mo":0,"m":{}},"250":{"mo":0,"m":{}},"252":{"mo":0,"m":{}},"254":{"mo":0,"m":{}},"255":{"mo":0,"m":{}},"257":{"mo":0,"m":{}},"310":{"mo":0,"m":{}},"313":{"mo":0,"m":{}},"315":{"mo":0,"m":{}},"374":{"mo":0,"m":{}},"375":{"mo":0,"m":{}},"377":{"mo":0,"m":{}},"497":{"mo":0,"m":{}},"501":{"mo":0,"m":{}},"560":{"mo":0,"m":{}},"564":{"mo":0,"m":{}},"6":{"mo":5,"m":{"6":305,"16":107,"7":336,"17":41,"8":129,"15":5,"18":39,"3":61,"2":11}},"7":{"mo":5,"m":{"2":12,"16":94,"17":39,"6":322,"18":26,"7":302,"15":5,"8":201}},"8":{"mo":5,"m":{"4":65,"3":58,"1":21,"16":98,"15":5,"17":42}},"9":{"mo":5,"m":{"9":64,"15":5,"16":103,"6":239,"17":42,"7":293,"18":38,"8":305,"1":20}},"10":{"mo":4,"m":{"6":119,"18":41,"8":308,"16":113,"3":61,"7":309,"15":3,"4":54,"17":34}},"11":{"mo":5,"m":{"8":282,"16":106,"17":36,"18":29,"7":312,"6":310,"9":60,"1":20,"15":3}},"12":{"mo":5,"m":{"4":63,"3":60,"10":15,"15":4,"16":95,"17":31,"18":20}},"13":{"mo":5,"m":{"8":272,"2":11,"16":100,"10":16,"15":5,"6":302,"18":43,"7":273,"17":42}},"14":{"mo":5,"m":{"1":21,"6":289,"8":278,"7":351,"17":37,"5":30,"18":21,"16":67,"15":4}},"15":{"mo":5,"m":{"1":21,"15":1,"5":21,"9":59,"7":301,"6":293,"8":258,"17":43,"16":96}},"16":{"mo":3,"m":{"10":16,"4":56,"16":69,"18":35,"15":5}},"17":{"mo":5,"m":{"6":3372,"16":159,"3":120,"18":65,"7":3237,"17":67,"15":12,"8":3133,"2":16}},"18":{"mo":5,"m":{"2":18,"7":3636,"17":63,"18":60,"15":11,"16":161,"6":3289,"8":3207}},"19":{"mo":5,"m":{"4":108,"18":65,"17":67,"3":122,"1":36,"15":12,"16":181}},"20":{"mo":5,"m":{"9":116,"16":161,"1":32,"17":65,"18":73,"8":3532,"15":11,"6":3645,"7":3296}},"21":{"mo":5,"m":{"7":3028,"15":12,"18":73,"6":3523,"8":3671,"4":130,"3":133,"16":158,"17":66}},"22":{"mo":5,"m":{"7":3057,"1":32,"17":73,"6":3280,"18":65,"9":120,"8":2951,"16":179,"15":12}},"23":{"mo":5,"m":{"3":122,"10":29,"17":72,"4":121,"18":66,"16":187,"15":11}},"24":{"mo":5,"m":{"8":3978,"15":11,"2":16,"17":62,"6":3542,"7":3227,"16":184,"10":27,"18":65}},"25":{"mo":5,"m":{"5":62,"17":71,"18":65,"16":155,"7":3098,"8":3389,"6":3203,"15":11,"1":40}},"26":{"mo":5,"m":{"1":41,"8":3590,"16":150,"6":3449,"9":120,"17":62,"5":54,"7":3124,"15":13}},"27":{"mo":5,"m":{"10":33,"16":180,"4":107,"9":105,"18":64,"15":12,"17":64}},"28":{"mo":5,"m":{"7":32309,"15":21,"16":319,"18":89,"17":86,"8":32461,"2":28,"3":157,"6":30562}},"29":{"mo":5,"m":{"2":33,"6":30864,"16":328,"7":33885,"17":82,"8":32258,"18":93,"15":21}},"30":{"mo":5,"m":{"4":183,"18":91,"3":165,"17":84,"1":59,"16":311,"15":21}},"31":{"mo":5,"m":{"9":174,"18":80,"6":33820,"1":52,"8":36978,"16":357,"15":17,"7":35744,"17":88}},"32":{"mo":5,"m":{"7":30917,"4":159,"15":21,"3":172,"8":31290,"6":33354,"18":86,"16":313,"17":82}},"33":{"mo":5,"m":{"8":32378,"17":83,"18":95,"16":301,"9":182,"6":31507,"1":59,"15":21,"7":38598}},"34":{"mo":5,"m":{"3":179,"10":44,"16":321,"17":93,"4":188,"18":98,"15":25}},"35":{"mo":5,"m":{"8":33817,"15":22,"16":343,"10":42,"2":30,"6":32811,"17":88,"7":35197,"18":88}},"36":{"mo":5,"m":{"5":95,"1":62,"16":303,"18":78,"15":21,"17":82,"6":29532,"7":34993,"8":31525}},"37":{"mo":5,"m":{"1":62,"16":347,"9":173,"8":33381,"5":81,"6":34560,"7":32353,"17":87,"15":24}},"38":{"mo":5,"m":{"10":42,"4":179,"18":90,"16":311,"9":155,"17":88,"15":20}},"39":{"mo":3,"m":{"7":178617,"3":179,"2":22}},"40":{"mo":2,"m":{"2":29,"8":147668}},"41":{"mo":3,"m":{"4":155,"3":214,"1":58}},"42":{"mo":4,"m":{"9":167,"8":96727,"6":70167,"1":50}},"44":{"mo":2,"m":{"7":102896,"1":32}},"45":{"mo":3,"m":{"3":126,"10":21,"4":155}},"46":{"mo":3,"m":{"8":129194,"2":27,"10":36,"6":65203,"7":85494}},"47":{"mo":4,"m":{"1":40,"7":176155,"6":108299,"8":168373,"5":78}},"48":{"mo":2,"m":{"1":66,"6":72834}},"49":{"mo":3,"m":{"10":40,"4":210,"9":159}},"50":{"mo":2,"m":{"8":698085,"2":45,"7":338838}},"51":{"mo":3,"m":{"2":34,"6":707766,"8":355314}},"52":{"mo":2,"m":{"4":262,"1":59}},"53":{"mo":1,"m":{"9":226}},"54":{"mo":2,"m":{"7":978449,"3":291}},"55":{"mo":3,"m":{"8":487227,"1":85,"9":171}},"56":{"mo":3,"m":{"4":298,"3":293,"10":47}},"57":{"mo":2,"m":{"7":639593,"10":38,"8":815759,"2":23}},"58":{"mo":1,"m":{"5":135}},"59":{"mo":3,"m":{"1":61,"7":838412,"6":823572,"5":125}},"60":{"mo":2,"m":{"10":48,"4":286,"9":131}},"73":{"mo":4,"m":{"7":1743344,"2":92,"11":38,"5":354,"8":1754951,"6":1790571}},"74":{"mo":5,"m":{"2":93,"7":2009081,"5":336,"8":1697128,"6":1827983}},"75":{"mo":4,"m":{"5":315,"9":460,"1":184,"12":357}},"76":{"mo":4,"m":{"6":1922594,"2":94,"3":588,"4":535,"8":1848229,"7":1648731}},"77":{"mo":4,"m":{"9":509,"5":336,"1":177,"11":38}},"78":{"mo":4,"m":{"8":1629176,"2":92,"10":97,"5":329,"7":1702435,"6":1531355}},"79":{"mo":4,"m":{"10":94,"9":486,"4":556,"5":327}},"82":{"mo":5,"m":{"8":1846301,"6":1841001,"18":225,"15":74,"2":91,"16":1230,"7":1902443,"17":244}},"83":{"mo":5,"m":{"2":93,"7":1754451,"18":242,"6":2015188,"15":71,"17":242,"8":1545502}},"84":{"mo":5,"m":{"9":463,"1":182,"12":376,"16":1219,"11":37}},"85":{"mo":5,"m":{"7":1644831,"4":558,"16":1232,"3":555,"6":1576352,"15":70,"8":1595108}},"86":{"mo":5,"m":{"7":1856528,"1":192,"9":494,"18":238,"17":247,"8":1836715,"6":2023278}},"87":{"mo":5,"m":{"10":91,"4":598,"9":483,"15":80,"16":1228}}};
  const GLOBAL_MAX_BY_KIND = {"8":1858054,"15":80,"6":2023278,"17":269,"7":2009081,"2":100,"18":259,"3":588,"9":509,"10":97,"1":195,"4":605,"11":41,"12":376,"16":1336,"5":500};

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


  // --- Parts Option Guide Data & Controllers ---
  const PARTS_GUIDE_DATA = {"11": {"part_id": "11", "name": "무기", "total": 348, "options": [{"kd": 1, "name": "트리거 데미지", "tag": "확정 고유", "tag_class": "tag-guaranteed", "count": 348, "ratio": "100.0%", "min": "+0.8%", "max": "+18.4%", "enh10": "+36.8%", "note": "무기 100% 필수 확정 옵션 (모든 무기에 기본 1줄 탑재)"}, {"kd": 6, "name": "힘", "tag": "일반", "tag_class": "tag-normal", "count": 97, "ratio": "27.9%", "min": "+177", "max": "+1,845,608", "enh10": "+3,691,216", "note": "힘 캐릭터용 1순위 주스탯"}, {"kd": 9, "name": "공격속도", "tag": "일반", "tag_class": "tag-normal", "count": 95, "ratio": "27.3%", "min": "+3.4%", "max": "+45.0%", "enh10": "+90.0%", "note": "공격속도 추가 확보용 유효 옵션"}, {"kd": 8, "name": "지능", "tag": "일반", "tag_class": "tag-normal", "count": 84, "ratio": "24.1%", "min": "+59", "max": "+1,825,011", "enh10": "+3,650,022", "note": "지능 캐릭터용 1순위 주스탯"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 84, "ratio": "24.1%", "min": "+5.2%", "max": "+129.7%", "enh10": "+259.4%", "note": "퓨전 빌드 시 화력 증폭 핵심 옵션"}, {"kd": 5, "name": "트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 81, "ratio": "23.3%", "min": "+16", "max": "+331", "enh10": "+662", "note": "부위 범용 보조 옵션"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 77, "ratio": "22.1%", "min": "+1.5%", "max": "+25.0%", "enh10": "+50.0%", "note": "부위 범용 보조 옵션"}, {"kd": 7, "name": "민첩", "tag": "일반", "tag_class": "tag-normal", "count": 74, "ratio": "21.3%", "min": "+194", "max": "+1,798,784", "enh10": "+3,597,568", "note": "민첩 캐릭터용 1순위 주스탯"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 48, "ratio": "13.8%", "min": "+5.4%", "max": "+24.4%", "enh10": "+48.8%", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 40, "ratio": "11.5%", "min": "+1초", "max": "+24초", "enh10": "+48초", "note": "부위 범용 보조 옵션"}]}, "3": {"part_id": "3", "name": "갑옷", "total": 325, "options": [{"kd": 2, "name": "받는 트리거 데미지", "tag": "확정 고유", "tag_class": "tag-guaranteed", "count": 324, "ratio": "99.7%", "min": "+0.3%", "max": "+9.3%", "enh10": "+18.6%", "note": "갑옷 99.7% 확정 탑재 기본 생존 옵션"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 106, "ratio": "32.6%", "min": "+6.6%", "max": "+112.6%", "enh10": "+225.2%", "note": "퓨전 상태 데미지 대폭 증폭 (+112.6%)"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 105, "ratio": "32.3%", "min": "+1.9%", "max": "+24.2%", "enh10": "+48.4%", "note": "퓨전 시 생존력 보강 옵션"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 98, "ratio": "30.2%", "min": "+2.2%", "max": "+25.9%", "enh10": "+51.8%", "note": "퓨전 영웅 데미지 증가 (극딜 1순위)"}, {"kd": 6, "name": "힘", "tag": "일반", "tag_class": "tag-normal", "count": 97, "ratio": "29.8%", "min": "+114", "max": "+1,754,411", "enh10": "+3,508,822", "note": "부위 범용 보조 옵션"}, {"kd": 7, "name": "민첩", "tag": "일반", "tag_class": "tag-normal", "count": 88, "ratio": "27.1%", "min": "+301", "max": "+1,670,058", "enh10": "+3,340,116", "note": "부위 범용 보조 옵션"}, {"kd": 8, "name": "지능", "tag": "일반", "tag_class": "tag-normal", "count": 87, "ratio": "26.8%", "min": "+166", "max": "+1,825,306", "enh10": "+3,650,612", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 56, "ratio": "17.2%", "min": "+1초", "max": "+21초", "enh10": "+42초", "note": "부위 범용 보조 옵션"}]}, "2": {"part_id": "2", "name": "도복", "total": 232, "options": [{"kd": 2, "name": "받는 트리거 데미지", "tag": "확정 고유", "tag_class": "tag-guaranteed", "count": 232, "ratio": "100.0%", "min": "+3.0%", "max": "+9.3%", "enh10": "+18.6%", "note": "도복 100% 확정 탑재 기본 생존 옵션"}, {"kd": 7, "name": "민첩", "tag": "주력 유효", "tag_class": "tag-core", "count": 107, "ratio": "46.1%", "min": "+498,901", "max": "+2,009,081", "enh10": "+4,018,162", "note": "도복 특유의 높은 주스탯 등장률 (1순위)"}, {"kd": 6, "name": "힘", "tag": "주력 유효", "tag_class": "tag-core", "count": 94, "ratio": "40.5%", "min": "+460,529", "max": "+2,015,188", "enh10": "+4,030,376", "note": "도복 특유의 높은 주스탯 등장률 (1순위)"}, {"kd": 8, "name": "지능", "tag": "주력 유효", "tag_class": "tag-core", "count": 84, "ratio": "36.2%", "min": "+490,795", "max": "+1,697,128", "enh10": "+3,394,256", "note": "도복 특유의 높은 주스탯 등장률 (1순위)"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 50, "ratio": "21.6%", "min": "+5.5%", "max": "+24.2%", "enh10": "+48.4%", "note": "부위 범용 보조 옵션"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 50, "ratio": "21.6%", "min": "+5.4%", "max": "+24.2%", "enh10": "+48.4%", "note": "부위 범용 보조 옵션"}, {"kd": 5, "name": "트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 47, "ratio": "20.3%", "min": "+146", "max": "+336", "enh10": "+672", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 44, "ratio": "19.0%", "min": "+11초", "max": "+71초", "enh10": "+142초", "note": "부위 범용 보조 옵션"}]}, "0": {"part_id": "0", "name": "투구", "total": 494, "options": [{"kd": 2, "name": "받는 트리거 데미지", "tag": "주력 유효", "tag_class": "tag-core", "count": 211, "ratio": "42.7%", "min": "+0.5%", "max": "+9.2%", "enh10": "+18.4%", "note": "기본 생존용 받는 트뎀 감소"}, {"kd": 7, "name": "민첩", "tag": "주력 유효", "tag_class": "tag-core", "count": 189, "ratio": "38.3%", "min": "+250", "max": "+1,902,443", "enh10": "+3,804,886", "note": "부위 범용 보조 옵션"}, {"kd": 8, "name": "지능", "tag": "일반", "tag_class": "tag-normal", "count": 154, "ratio": "31.2%", "min": "+54", "max": "+1,846,301", "enh10": "+3,692,602", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 147, "ratio": "29.8%", "min": "+2초", "max": "+74초", "enh10": "+148초", "note": "퓨전 지속시간 보강 유효 옵션 (+74초)"}, {"kd": 6, "name": "힘", "tag": "일반", "tag_class": "tag-normal", "count": 145, "ratio": "29.4%", "min": "+80", "max": "+1,841,001", "enh10": "+3,682,002", "note": "부위 범용 보조 옵션"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 143, "ratio": "28.9%", "min": "+2.2%", "max": "+25.0%", "enh10": "+50.0%", "note": "투구 1순위 극딜 옵션 (퓨전 영웅 데미지)"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 140, "ratio": "28.3%", "min": "+1.7%", "max": "+25.9%", "enh10": "+51.8%", "note": "부위 범용 보조 옵션"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 94, "ratio": "19.0%", "min": "+7.2%", "max": "+123.0%", "enh10": "+246.0%", "note": "부위 범용 보조 옵션"}, {"kd": 3, "name": "경험치", "tag": "일반", "tag_class": "tag-normal", "count": 87, "ratio": "17.6%", "min": "+4.6%", "max": "+55.3%", "enh10": "+110.6%", "note": "부위 범용 보조 옵션"}, {"kd": 11, "name": "더블 크리티컬 확률", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 69, "ratio": "14.0%", "min": "+0.6%", "max": "+3.8%", "enh10": "+7.6%", "note": "부위 범용 보조 옵션"}, {"kd": 5, "name": "트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 63, "ratio": "12.8%", "min": "+134", "max": "+354", "enh10": "+708", "note": "부위 범용 보조 옵션"}]}, "9": {"part_id": "9", "name": "하의", "total": 412, "options": [{"kd": 10, "name": "이동속도", "tag": "주력 유효", "tag_class": "tag-core", "count": 174, "ratio": "42.2%", "min": "+9", "max": "+97", "enh10": "+194", "note": "기동력 보강 이동속도 옵션"}, {"kd": 2, "name": "받는 트리거 데미지", "tag": "주력 유효", "tag_class": "tag-core", "count": 172, "ratio": "41.7%", "min": "+0.3%", "max": "+9.3%", "enh10": "+18.6%", "note": "받는 트리거 데미지 감소 생존 옵션"}, {"kd": 6, "name": "힘", "tag": "일반", "tag_class": "tag-normal", "count": 143, "ratio": "34.7%", "min": "+132", "max": "+1,740,546", "enh10": "+3,481,092", "note": "부위 범용 보조 옵션"}, {"kd": 8, "name": "지능", "tag": "일반", "tag_class": "tag-normal", "count": 141, "ratio": "34.2%", "min": "+219", "max": "+1,858,054", "enh10": "+3,716,108", "note": "부위 범용 보조 옵션"}, {"kd": 7, "name": "민첩", "tag": "일반", "tag_class": "tag-normal", "count": 124, "ratio": "30.1%", "min": "+172", "max": "+1,702,435", "enh10": "+3,404,870", "note": "부위 범용 보조 옵션"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 116, "ratio": "28.2%", "min": "+4.8%", "max": "+133.6%", "enh10": "+267.2%", "note": "★하의 1순위 극딜 옵션! 최대 +133.6% (10강 +267.2%)"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 103, "ratio": "25.0%", "min": "+1.3%", "max": "+24.5%", "enh10": "+49.0%", "note": "부위 범용 보조 옵션"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 98, "ratio": "23.8%", "min": "+2.4%", "max": "+24.4%", "enh10": "+48.8%", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 55, "ratio": "13.3%", "min": "+3초", "max": "+22초", "enh10": "+44초", "note": "부위 범용 보조 옵션"}, {"kd": 5, "name": "트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 49, "ratio": "11.9%", "min": "+124", "max": "+329", "enh10": "+658", "note": "부위 범용 보조 옵션"}]}, "5": {"part_id": "5", "name": "장갑", "total": 498, "options": [{"kd": 9, "name": "공격속도", "tag": "확정 고유", "tag_class": "tag-guaranteed", "count": 475, "ratio": "95.4%", "min": "+2.5%", "max": "+48.7%", "enh10": "+97.4%", "note": "장갑 95.4% 확정급 탑재 기본 옵션"}, {"kd": 1, "name": "트리거 데미지", "tag": "주력 유효", "tag_class": "tag-core", "count": 194, "ratio": "39.0%", "min": "+1.7%", "max": "+18.4%", "enh10": "+36.8%", "note": "추가 트리거 데미지 확보용 유효 옵션"}, {"kd": 11, "name": "더블 크리티컬 확률", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 128, "ratio": "25.7%", "min": "+0.5%", "max": "+3.7%", "enh10": "+7.4%", "note": "크리티컬 발동을 위한 특급 극딜 옵션"}, {"kd": 12, "name": "더블 크리티컬 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 111, "ratio": "22.3%", "min": "+5.6%", "max": "+37.6%", "enh10": "+75.2%", "note": "★장갑 1순위 종결 옵션! 10강 시 +75.2% 폭발적 딜 상승"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 108, "ratio": "21.7%", "min": "+7.7%", "max": "+121.9%", "enh10": "+243.8%", "note": "부위 범용 보조 옵션"}, {"kd": 6, "name": "힘", "tag": "일반", "tag_class": "tag-normal", "count": 89, "ratio": "17.9%", "min": "+163", "max": "+2,013,467", "enh10": "+4,026,934", "note": "부위 범용 보조 옵션"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 86, "ratio": "17.3%", "min": "+2.0%", "max": "+24.3%", "enh10": "+48.6%", "note": "부위 범용 보조 옵션"}, {"kd": 7, "name": "민첩", "tag": "일반", "tag_class": "tag-normal", "count": 78, "ratio": "15.7%", "min": "+153", "max": "+1,825,450", "enh10": "+3,650,900", "note": "부위 범용 보조 옵션"}, {"kd": 5, "name": "트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 71, "ratio": "14.3%", "min": "+121", "max": "+315", "enh10": "+630", "note": "부위 범용 보조 옵션"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 64, "ratio": "12.9%", "min": "+2.2%", "max": "+21.1%", "enh10": "+42.2%", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 30, "ratio": "6.0%", "min": "+2초", "max": "+17초", "enh10": "+34초", "note": "부위 범용 보조 옵션"}, {"kd": 8, "name": "지능", "tag": "일반", "tag_class": "tag-normal", "count": 30, "ratio": "6.0%", "min": "+273", "max": "+96,727", "enh10": "+193,454", "note": "부위 범용 보조 옵션"}]}, "12": {"part_id": "12", "name": "신발", "total": 510, "options": [{"kd": 10, "name": "이동속도", "tag": "확정 고유", "tag_class": "tag-guaranteed", "count": 510, "ratio": "100.0%", "min": "+6", "max": "+94", "enh10": "+188", "note": "신발 100% 필수 확정 옵션 (모든 신발 기본 탑재)"}, {"kd": 4, "name": "드랍률", "tag": "주력 유효", "tag_class": "tag-core", "count": 237, "ratio": "46.5%", "min": "+2.4%", "max": "+59.8%", "enh10": "+119.6%", "note": "파밍용 2순위 유효 옵션 (최대 +59.8%)"}, {"kd": 9, "name": "공격속도", "tag": "주력 유효", "tag_class": "tag-core", "count": 206, "ratio": "40.4%", "min": "+4.5%", "max": "+48.6%", "enh10": "+97.2%", "note": "공속 보강용 유효 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "주력 유효", "tag_class": "tag-core", "count": 180, "ratio": "35.3%", "min": "+2초", "max": "+80초", "enh10": "+160초", "note": "★퓨전 빌드 필수! 10강 시 지속시간 +160초 증가"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 137, "ratio": "26.9%", "min": "+4.8%", "max": "+122.8%", "enh10": "+245.6%", "note": "부위 범용 보조 옵션"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 94, "ratio": "18.4%", "min": "+2.0%", "max": "+22.2%", "enh10": "+44.4%", "note": "부위 범용 보조 옵션"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 91, "ratio": "17.8%", "min": "+2.1%", "max": "+21.0%", "enh10": "+42.0%", "note": "부위 범용 보조 옵션"}, {"kd": 5, "name": "트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 47, "ratio": "9.2%", "min": "+148", "max": "+327", "enh10": "+654", "note": "부위 범용 보조 옵션"}]}, "4": {"part_id": "4", "name": "목걸이", "total": 365, "options": [{"kd": 4, "name": "드랍률", "tag": "확정 고유", "tag_class": "tag-guaranteed", "count": 357, "ratio": "97.8%", "min": "+2.1%", "max": "+60.5%", "enh10": "+121.0%", "note": "목걸이 97.8% 확정급 파밍 기본 옵션"}, {"kd": 3, "name": "경험치", "tag": "주력 유효", "tag_class": "tag-core", "count": 131, "ratio": "35.9%", "min": "+4.2%", "max": "+56.3%", "enh10": "+112.6%", "note": "경험치 획득량 2순위 파밍 옵션"}, {"kd": 1, "name": "트리거 데미지", "tag": "주력 유효", "tag_class": "tag-core", "count": 129, "ratio": "35.3%", "min": "+1.0%", "max": "+18.3%", "enh10": "+36.6%", "note": "목걸이 1순위 딜 옵션 (트뎀 +18.3%)"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 115, "ratio": "31.5%", "min": "+1.6%", "max": "+26.9%", "enh10": "+53.8%", "note": "부위 범용 보조 옵션"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 102, "ratio": "27.9%", "min": "+2.0%", "max": "+24.1%", "enh10": "+48.2%", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 97, "ratio": "26.6%", "min": "+2초", "max": "+71초", "enh10": "+142초", "note": "퓨전 지속시간 증가 유효 옵션 (+71초)"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 43, "ratio": "11.8%", "min": "+6.9%", "max": "+31.1%", "enh10": "+62.2%", "note": "부위 범용 보조 옵션"}]}, "10": {"part_id": "10", "name": "반지", "total": 403, "options": [{"kd": 1, "name": "트리거 데미지", "tag": "주력 유효", "tag_class": "tag-core", "count": 218, "ratio": "54.1%", "min": "+1.0%", "max": "+19.5%", "enh10": "+39.0%", "note": "반지 핵심 딜 옵션 (수치 +19.5%까지 등장)"}, {"kd": 5, "name": "트리거 데미지", "tag": "주력 유효", "tag_class": "tag-core", "count": 184, "ratio": "45.7%", "min": "+10", "max": "+500", "enh10": "+1,000", "note": "부위 범용 보조 옵션"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 114, "ratio": "28.3%", "min": "+2.3%", "max": "+25.2%", "enh10": "+50.4%", "note": "부위 범용 보조 옵션"}, {"kd": 7, "name": "민첩", "tag": "일반", "tag_class": "tag-normal", "count": 107, "ratio": "26.6%", "min": "+262", "max": "+1,851,860", "enh10": "+3,703,720", "note": "부위 범용 보조 옵션"}, {"kd": 6, "name": "힘", "tag": "일반", "tag_class": "tag-normal", "count": 101, "ratio": "25.1%", "min": "+123", "max": "+1,862,710", "enh10": "+3,725,420", "note": "부위 범용 보조 옵션"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 90, "ratio": "22.3%", "min": "+1.2%", "max": "+25.6%", "enh10": "+51.2%", "note": "부위 범용 보조 옵션"}, {"kd": 8, "name": "지능", "tag": "일반", "tag_class": "tag-normal", "count": 84, "ratio": "20.8%", "min": "+153", "max": "+1,846,615", "enh10": "+3,693,230", "note": "부위 범용 보조 옵션"}, {"kd": 12, "name": "더블 크리티컬 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 71, "ratio": "17.6%", "min": "+5.9%", "max": "+36.4%", "enh10": "+72.8%", "note": "★반지 1순위 종결 옵션! 10강 시 +72.8% 극딜"}, {"kd": 11, "name": "더블 크리티컬 확률", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 66, "ratio": "16.4%", "min": "+0.5%", "max": "+4.0%", "enh10": "+8.0%", "note": "더블 크리티컬 발동 확률 증폭"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 54, "ratio": "13.4%", "min": "+5.5%", "max": "+30.3%", "enh10": "+60.6%", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 40, "ratio": "9.9%", "min": "+3초", "max": "+21초", "enh10": "+42초", "note": "부위 범용 보조 옵션"}, {"kd": 2, "name": "받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 1, "ratio": "0.2%", "min": "+10.0%", "max": "+10.0%", "enh10": "+20.0%", "note": "부위 범용 보조 옵션"}]}, "6": {"part_id": "6", "name": "벨트", "total": 511, "options": [{"kd": 4, "name": "드랍률", "tag": "주력 유효", "tag_class": "tag-core", "count": 254, "ratio": "49.7%", "min": "+3.8%", "max": "+55.8%", "enh10": "+111.6%", "note": "파밍 1순위 드랍률 옵션 (+55.8%)"}, {"kd": 3, "name": "경험치", "tag": "주력 유효", "tag_class": "tag-core", "count": 229, "ratio": "44.8%", "min": "+4.0%", "max": "+58.8%", "enh10": "+117.6%", "note": "레벨업 1순위 경험치 옵션 (+58.8%)"}, {"kd": 7, "name": "민첩", "tag": "주력 유효", "tag_class": "tag-core", "count": 182, "ratio": "35.6%", "min": "+69", "max": "+1,813,820", "enh10": "+3,627,640", "note": "부위 범용 보조 옵션"}, {"kd": 6, "name": "힘", "tag": "일반", "tag_class": "tag-normal", "count": 176, "ratio": "34.4%", "min": "+119", "max": "+1,922,594", "enh10": "+3,845,188", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 176, "ratio": "34.4%", "min": "+2초", "max": "+73초", "enh10": "+146초", "note": "벨트 1순위 유효 옵션 (퓨전 지속시간 +73초)"}, {"kd": 8, "name": "지능", "tag": "일반", "tag_class": "tag-normal", "count": 152, "ratio": "29.7%", "min": "+130", "max": "+1,848,229", "enh10": "+3,696,458", "note": "부위 범용 보조 옵션"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 120, "ratio": "23.5%", "min": "+5.8%", "max": "+123.2%", "enh10": "+246.4%", "note": "부위 범용 보조 옵션"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 94, "ratio": "18.4%", "min": "+1.5%", "max": "+24.7%", "enh10": "+49.4%", "note": "부위 범용 보조 옵션"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 92, "ratio": "18.0%", "min": "+1.2%", "max": "+23.6%", "enh10": "+47.2%", "note": "부위 범용 보조 옵션"}, {"kd": 2, "name": "받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 65, "ratio": "12.7%", "min": "+3.1%", "max": "+9.4%", "enh10": "+18.8%", "note": "부위 범용 보조 옵션"}]}, "7": {"part_id": "7", "name": "손목", "total": 501, "options": [{"kd": 9, "name": "공격속도", "tag": "주력 유효", "tag_class": "tag-core", "count": 269, "ratio": "53.7%", "min": "+4.4%", "max": "+50.9%", "enh10": "+101.8%", "note": "손목 주요 옵션 (최대 +50.9%의 높은 공속)"}, {"kd": 1, "name": "트리거 데미지", "tag": "주력 유효", "tag_class": "tag-core", "count": 237, "ratio": "47.3%", "min": "+1.1%", "max": "+19.2%", "enh10": "+38.4%", "note": "트리거 데미지 2순위 유효 옵션"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 164, "ratio": "32.7%", "min": "+1.2%", "max": "+25.1%", "enh10": "+50.2%", "note": "퓨전 시 영웅 데미지 대폭 상승"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 162, "ratio": "32.3%", "min": "+2.4%", "max": "+24.7%", "enh10": "+49.4%", "note": "부위 범용 보조 옵션"}, {"kd": 7, "name": "민첩", "tag": "일반", "tag_class": "tag-normal", "count": 157, "ratio": "31.3%", "min": "+80", "max": "+1,887,036", "enh10": "+3,774,072", "note": "부위 범용 보조 옵션"}, {"kd": 6, "name": "힘", "tag": "일반", "tag_class": "tag-normal", "count": 134, "ratio": "26.7%", "min": "+87", "max": "+2,023,278", "enh10": "+4,046,556", "note": "부위 범용 보조 옵션"}, {"kd": 8, "name": "지능", "tag": "일반", "tag_class": "tag-normal", "count": 114, "ratio": "22.8%", "min": "+122", "max": "+1,836,715", "enh10": "+3,673,430", "note": "부위 범용 보조 옵션"}, {"kd": 11, "name": "더블 크리티컬 확률", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 67, "ratio": "13.4%", "min": "+0.8%", "max": "+3.8%", "enh10": "+7.6%", "note": "부위 범용 보조 옵션"}, {"kd": 5, "name": "트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 57, "ratio": "11.4%", "min": "+133", "max": "+336", "enh10": "+672", "note": "부위 범용 보조 옵션"}, {"kd": 12, "name": "더블 크리티컬 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 51, "ratio": "10.2%", "min": "+7.2%", "max": "+32.0%", "enh10": "+64.0%", "note": "★손목 1순위 종결 옵션! 10강 시 +64.0%"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 43, "ratio": "8.6%", "min": "+6.2%", "max": "+30.1%", "enh10": "+60.2%", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 34, "ratio": "6.8%", "min": "+2초", "max": "+21초", "enh10": "+42초", "note": "부위 범용 보조 옵션"}]}, "8": {"part_id": "8", "name": "귀걸이", "total": 462, "options": [{"kd": 4, "name": "드랍률", "tag": "주력 유효", "tag_class": "tag-core", "count": 320, "ratio": "69.3%", "min": "+2.5%", "max": "+56.3%", "enh10": "+112.6%", "note": "귀걸이 주력 파밍 옵션 (등장률 69.3%)"}, {"kd": 3, "name": "경험치", "tag": "주력 유효", "tag_class": "tag-core", "count": 285, "ratio": "61.7%", "min": "+2.4%", "max": "+54.1%", "enh10": "+108.2%", "note": "귀걸이 주력 경험치 옵션 (등장률 61.7%)"}, {"kd": 10, "name": "이동속도", "tag": "일반", "tag_class": "tag-normal", "count": 160, "ratio": "34.6%", "min": "+5", "max": "+92", "enh10": "+184", "note": "부위 범용 보조 옵션"}, {"kd": 15, "name": "퓨전 지속시간", "tag": "일반", "tag_class": "tag-normal", "count": 156, "ratio": "33.8%", "min": "+2초", "max": "+74초", "enh10": "+148초", "note": "퓨전 지속시간 보강 옵션 (+74초)"}, {"kd": 18, "name": "퓨전 시 영웅 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 147, "ratio": "31.8%", "min": "+1.7%", "max": "+24.5%", "enh10": "+49.0%", "note": "부위 범용 보조 옵션"}, {"kd": 17, "name": "퓨전 시 받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 134, "ratio": "29.0%", "min": "+1.4%", "max": "+23.1%", "enh10": "+46.2%", "note": "부위 범용 보조 옵션"}, {"kd": 16, "name": "퓨전 상태 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 68, "ratio": "14.7%", "min": "+5.1%", "max": "+100.0%", "enh10": "+200.0%", "note": "부위 범용 보조 옵션"}]}, "13": {"part_id": "13", "name": "보조", "total": 40, "options": []}, "1": {"part_id": "1", "name": "명예", "total": 109, "options": [{"kd": 9, "name": "공격속도", "tag": "주력 유효", "tag_class": "tag-core", "count": 81, "ratio": "74.3%", "min": "+2.6%", "max": "+30.0%", "enh10": "+60.0%", "note": "공격속도 고정 보너스 (+30.0%)"}, {"kd": 10, "name": "이동속도", "tag": "주력 유효", "tag_class": "tag-core", "count": 80, "ratio": "73.4%", "min": "+13", "max": "+80", "enh10": "+160", "note": "이동속도 고정 보너스 (+80)"}, {"kd": 7, "name": "민첩", "tag": "일반", "tag_class": "tag-normal", "count": 34, "ratio": "31.2%", "min": "+706,310", "max": "+13,323,785", "enh10": "+26,647,570", "note": "★제국의 명예 단일 올스탯 종결 (+1,332만)"}, {"kd": 6, "name": "힘", "tag": "일반", "tag_class": "tag-normal", "count": 33, "ratio": "30.3%", "min": "+447,368", "max": "+12,645,924", "enh10": "+25,291,848", "note": "★제국의 명예 단일 올스탯 종결 (+1,264만)"}, {"kd": 8, "name": "지능", "tag": "일반", "tag_class": "tag-normal", "count": 32, "ratio": "29.4%", "min": "+1,199,100", "max": "+12,921,898", "enh10": "+25,843,796", "note": "★제국의 명예 단일 올스탯 종결 (+1,292만)"}, {"kd": 3, "name": "경험치", "tag": "일반", "tag_class": "tag-normal", "count": 7, "ratio": "6.4%", "min": "+11.4%", "max": "+34.8%", "enh10": "+69.6%", "note": "부위 범용 보조 옵션"}, {"kd": 1, "name": "트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 6, "ratio": "5.5%", "min": "+4.5%", "max": "+15.0%", "enh10": "+30.0%", "note": "부위 범용 보조 옵션"}, {"kd": 4, "name": "드랍률", "tag": "일반", "tag_class": "tag-normal", "count": 3, "ratio": "2.8%", "min": "+13.2%", "max": "+41.4%", "enh10": "+82.8%", "note": "부위 범용 보조 옵션"}, {"kd": 2, "name": "받는 트리거 데미지", "tag": "일반", "tag_class": "tag-normal", "count": 2, "ratio": "1.8%", "min": "+2.1%", "max": "+5.5%", "enh10": "+11.0%", "note": "부위 범용 보조 옵션"}, {"kd": 11, "name": "더블 크리티컬 확률", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 2, "ratio": "1.8%", "min": "+3.4%", "max": "+4.1%", "enh10": "+8.2%", "note": "부위 범용 보조 옵션"}, {"kd": 12, "name": "더블 크리티컬 데미지", "tag": "특급 극딜", "tag_class": "tag-premium", "count": 1, "ratio": "0.9%", "min": "+29.0%", "max": "+29.0%", "enh10": "+58.0%", "note": "부위 범용 보조 옵션"}]}};

  window.switchGuideTab = function(tabName) {
    const tabs = ['stars', 'parts', 'builds'];
    tabs.forEach(t => {
      const btn = document.getElementById('btnGuide' + t.charAt(0).toUpperCase() + t.slice(1));
      const pane = document.getElementById('paneGuide' + t.charAt(0).toUpperCase() + t.slice(1));
      if (btn) btn.classList.toggle('active', t === tabName);
      if (pane) pane.classList.toggle('active', t === tabName);
    });

    if (tabName === 'parts') {
      initGuidePartsFilter();
      renderGuidePartsTable(window._currentGuidePartFilter || 'all');
    }
  };

  window.initGuidePartsFilter = function() {
    const container = document.getElementById('partsFilterChips');
    if (!container || container.children.length > 0) return;

    const parts = [
      { id: 'all', name: '전체 보기' },
      { id: '11', name: '무기' },
      { id: '3', name: '갑옷' },
      { id: '2', name: '도복' },
      { id: '0', name: '투구' },
      { id: '9', name: '하의' },
      { id: '5', name: '장갑' },
      { id: '12', name: '신발' },
      { id: '4', name: '목걸이' },
      { id: '10', name: '반지' },
      { id: '6', name: '벨트' },
      { id: '7', name: '손목' },
      { id: '8', name: '귀걸이' },
      { id: '1', name: '명예' }
    ];

    container.innerHTML = parts.map(p => `
      <button class="part-chip ${p.id === 'all' ? 'active' : ''}" data-part-id="${p.id}" onclick="filterGuidePart('${p.id}')">
        ${p.name}
      </button>
    `).join('');
  };

  window.filterGuidePart = function(partId) {
    window._currentGuidePartFilter = partId;
    const chips = document.querySelectorAll('.part-chip');
    chips.forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-part-id') === partId);
    });
    renderGuidePartsTable(partId);
  };

  window.renderGuidePartsTable = function(partId) {
    const tbody = document.getElementById('guidePartsTableBody');
    if (!tbody) return;

    let rowsHtml = '';
    const keys = partId === 'all' ? Object.keys(PARTS_GUIDE_DATA) : [partId];

    keys.forEach(k => {
      const partInfo = PARTS_GUIDE_DATA[k];
      if (!partInfo || !partInfo.options) return;

      partInfo.options.forEach((opt, idx) => {
        rowsHtml += `
          <tr>
            ${idx === 0 ? `<td rowspan="${partInfo.options.length}" class="td-part-col">
              <span class="part-name-badge">${partInfo.name}</span>
              <span class="part-count-sub">표본 ${partInfo.total}개</span>
            </td>` : ''}
            <td class="td-opt-name">${opt.name}</td>
            <td><span class="opt-tag-badge ${opt.tag_class}">${opt.tag}</span></td>
            <td class="td-range">${opt.min}</td>
            <td class="td-max-val">${opt.max}</td>
            <td class="td-enh10-val"><span class="enh10-badge">${opt.enh10}</span></td>
            <td class="td-ratio">${opt.ratio}</td>
            <td class="td-note">${opt.note}</td>
          </tr>
        `;
      });
    });

    tbody.innerHTML = rowsHtml;
  };

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

            <!-- Guide & Recommendations Panel Box -->
            <div class="guide-panel-box">
              <div class="guide-panel-header">
                <div class="guide-title-wrap">
                  <span class="guide-title-icon">📖</span>
                  <div>
                    <div class="guide-title-text">프레임 장비 백서 & 추천 세팅 가이드</div>
                    <div class="guide-title-sub">열정랭킹 TOP 100 랭커 실데이터 (5,210개 장비) 기반 분석 리포트</div>
                  </div>
                </div>
                <div class="guide-tabs-bar">
                  <button class="guide-tab-pill active" id="btnGuideStars" onclick="switchGuideTab('stars')">🌟 별 등급 시스템</button>
                  <button class="guide-tab-pill" id="btnGuideParts" onclick="switchGuideTab('parts')">📊 부위별 옵션 수치표</button>
                  <button class="guide-tab-pill" id="btnGuideBuilds" onclick="switchGuideTab('builds')">💡 종결 세팅 & 추천 옵션</button>
                </div>
              </div>

              <div class="guide-panel-body">
                <!-- TAB 1: 별 등급 시스템 -->
                <div class="guide-pane active" id="paneGuideStars">
                  <div class="guide-section">
                    <h4 class="guide-section-title">1. 옵션 개수에 따른 별 테두리 (외곽선 ☆)</h4>
                    <p class="guide-desc">장비가 보유한 옵션 개수(최대 5개)에 따라 외곽선 별(Outline Star)의 개수가 정해집니다. 별의 총 개수는 장비의 잠재력(슬롯 개수)을 의미합니다.</p>
                    <div class="stars-demo-grid">
                      <div class="stars-demo-card">
                        <div class="stars-demo-stars"><span class="star-outline">☆</span></div>
                        <div class="stars-demo-name">1옵션 장비</div>
                        <div class="stars-demo-sub">옵션 1개 보유 (1성)</div>
                      </div>
                      <div class="stars-demo-card">
                        <div class="stars-demo-stars"><span class="star-outline">☆☆</span></div>
                        <div class="stars-demo-name">2옵션 장비</div>
                        <div class="stars-demo-sub">옵션 2개 보유 (2성)</div>
                      </div>
                      <div class="stars-demo-card">
                        <div class="stars-demo-stars"><span class="star-outline">☆☆☆</span></div>
                        <div class="stars-demo-name">3옵션 장비</div>
                        <div class="stars-demo-sub">옵션 3개 보유 (3성)</div>
                      </div>
                      <div class="stars-demo-card">
                        <div class="stars-demo-stars"><span class="star-outline">☆☆☆☆</span></div>
                        <div class="stars-demo-name">4옵션 장비</div>
                        <div class="stars-demo-sub">옵션 4개 보유 (4성)</div>
                      </div>
                      <div class="stars-demo-card highlight-card">
                        <div class="stars-demo-stars"><span class="star-outline">☆☆☆☆☆</span></div>
                        <div class="stars-demo-name">5옵션 장비 (최대치)</div>
                        <div class="stars-demo-sub">종결 베이스 (5성 최대 슬롯)</div>
                      </div>
                    </div>
                  </div>

                  <div class="guide-section" style="margin-top:20px;">
                    <h4 class="guide-section-title">2. 옵션별 수치 달성률에 따른 별 색상 채우기</h4>
                    <p class="guide-desc">TOP 100 랭커 데이터 중 관측된 <strong>최고 수치(Max 100%)</strong> 대비 현재 아이템의 옵션 수치가 차지하는 비율(%)에 따라 별에 고유한 색상이 부여됩니다.</p>
                    <div class="star-grade-table-wrap">
                      <table class="star-grade-table">
                        <thead>
                          <tr>
                            <th>등급</th>
                            <th>별 모양 & 색상</th>
                            <th>도달 퍼센티지</th>
                            <th>수준 설명</th>
                            <th>대표 예시 (더블 크뎀 37.6% 기준)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><span class="badge-grade grade-cyan">Cyan (종결)</span></td>
                            <td class="star-symbol star-cyan">★</td>
                            <td><strong style="color:var(--cyan);">100%</strong></td>
                            <td>단일 옵션 데이터상 최고점 (절대 종결급)</td>
                            <td>+37.6% (10강 시 +75.2%)</td>
                          </tr>
                          <tr>
                            <td><span class="badge-grade grade-gold">Gold (최상급)</span></td>
                            <td class="star-symbol star-gold">★</td>
                            <td><strong style="color:#ffd700;">90% ~ 99.9%</strong></td>
                            <td>최고치에 근접한 준종결급 최상위 옵션</td>
                            <td>+33.8% ~ +37.5%</td>
                          </tr>
                          <tr>
                            <td><span class="badge-grade grade-silver">Silver (상급)</span></td>
                            <td class="star-symbol star-silver">★</td>
                            <td><strong style="color:#e0e0e0;">80% ~ 89.9%</strong></td>
                            <td>충분히 실전 투입 가능한 우수한 상위 옵션</td>
                            <td>+30.1% ~ +33.7%</td>
                          </tr>
                          <tr>
                            <td><span class="badge-grade grade-bronze">Bronze (중상급)</span></td>
                            <td class="star-symbol star-bronze">★</td>
                            <td><strong style="color:#cd7f32;">70% ~ 79.9%</strong></td>
                            <td>성장 구간에서 거쳐가기 좋은 유효 옵션</td>
                            <td>+26.3% ~ +30.0%</td>
                          </tr>
                          <tr>
                            <td><span class="badge-grade grade-white">White (일반)</span></td>
                            <td class="star-symbol star-white">★</td>
                            <td><strong style="color:#ffffff;">50% ~ 69.9%</strong></td>
                            <td>평균적인 기본 수치 옵션</td>
                            <td>+18.8% ~ +26.2%</td>
                          </tr>
                          <tr>
                            <td><span class="badge-grade grade-empty">Empty (하위)</span></td>
                            <td class="star-symbol star-empty">☆</td>
                            <td><strong style="color:#888;">50% 미만</strong></td>
                            <td>최저치에 가까운 하위 수치 옵션</td>
                            <td>+18.8% 미만</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="guide-section" style="margin-top:20px;">
                    <h4 class="guide-section-title">3. 보관함/인벤토리 실시간 듀얼 비교 및 오차 뱃지</h4>
                    <p class="guide-desc">보관함이나 인벤토리의 장비에 마우스를 올리면, <strong>현재 착용 중인 동일 부위 장비</strong>가 팝업 우측에 나란히 배치되어 1:1 비교를 제공합니다. 각 옵션 우측의 <span class="diff-badge diff-pos">+차이</span> / <span class="diff-badge diff-neg">-차이</span> 오차 뱃지를 통해 장비 교체 이득을 즉시 계산할 수 있습니다.</p>
                  </div>
                </div>

                <!-- TAB 2: 부위별 옵션 수치표 -->
                <div class="guide-pane" id="paneGuideParts">
                  <div class="parts-filter-row">
                    <span class="filter-label">부위 선택:</span>
                    <div class="parts-chips-container" id="partsFilterChips"></div>
                  </div>
                  <div class="parts-table-wrap">
                    <table class="guide-parts-table">
                      <thead>
                        <tr>
                          <th style="width:100px;">부위</th>
                          <th style="width:140px;">옵션명</th>
                          <th style="width:90px;">구분</th>
                          <th style="width:130px;">0강 최소 수치</th>
                          <th style="width:130px;">0강 최대 수치</th>
                          <th style="width:140px;">+10강 종결 수치</th>
                          <th style="width:90px;">등장 확률</th>
                          <th>부위별 특징 분석</th>
                        </tr>
                      </thead>
                      <tbody id="guidePartsTableBody"></tbody>
                    </table>
                  </div>
                </div>

                <!-- TAB 3: 종결 세팅 & 추천 옵션 -->
                <div class="guide-pane" id="paneGuideBuilds">
                  <div class="guide-section">
                    <h4 class="guide-section-title">👑 TOP 랭커 실전 종결 빌드 (3대 추천 세팅)</h4>
                    <div class="build-cards-grid">
                      <div class="build-card top-tier">
                        <div class="build-card-badge">랭커 압도적 1티어</div>
                        <div class="build-card-title">오지터 11세트 + 제국의 명예 + 셀X 반지</div>
                        <div class="build-card-desc">현재 열정랭킹 최상위권 80% 이상이 채택한 현존 최강의 밸런스 & 깡스탯 종결 조합입니다.</div>
                        <ul class="build-parts-list">
                          <li><strong style="color:var(--gold);">[명예] 제국의 명예</strong>: 올스탯 +1,260만~+1,332만, 공속 +30%, 이속 +80의 독보적 단품 종결</li>
                          <li><strong style="color:var(--cyan);">[반지] 셀X의 반지</strong>: 고유 특수 옵션으로 엔드스펙 데미지 견인</li>
                          <li><strong style="color:#4db6ac;">[11부위] 오지터 장비</strong>: 무기, 방어구, 악세사리 11부위 풀세트로 최고 배율 세트 효과 획득</li>
                        </ul>
                      </div>

                      <div class="build-card fusion-tier">
                        <div class="build-card-badge">퓨전 극딜 특화</div>
                        <div class="build-card-title">융합의 힘 I 6세트 + 오지터/단품 조합</div>
                        <div class="build-card-desc">퓨전 변신 상태를 상시 유지하며 폭발적인 추가 트리거 데미지를 쏟아붓는 극딜 특화 세팅입니다.</div>
                        <ul class="build-parts-list">
                          <li><strong style="color:#ab47bc;">[6세트 부위]</strong>: 머리띠, 도복, 장갑, 띠(벨트), 손목 보호대, 신발</li>
                          <li><strong style="color:#ba68c8;">[핵심 보너스]</strong>: 6세트 효과로 퓨전 지속시간 +300초 확보 (무한 변신 가능)</li>
                          <li><strong style="color:#ce93d8;">[기타 부위]</strong>: 무기, 목걸이, 반지, 귀걸이, 명예는 오지터/제국의 명예 단품 착용</li>
                        </ul>
                      </div>

                      <div class="build-card farm-tier">
                        <div class="build-card-badge">입문 & 파밍 추천</div>
                        <div class="build-card-title">천하제일 무도가 11세트 (성장 & 파밍용)</div>
                        <div class="build-card-desc">파밍 난이도가 낮고 경험치와 드랍률 옵션이 골고루 포진되어 있어 초중반 육성에 최적화된 세트입니다.</div>
                        <ul class="build-parts-list">
                          <li><strong style="color:#64b5f6;">[파밍 최적화]</strong>: 목걸이/벨트/귀걸이에 드랍률 +60% 및 경험치 +58% 집중 파밍</li>
                          <li><strong style="color:#90caf9;">[세트 효과]</strong>: 초반 부족한 전투 스탯을 세트 효과로 보충하여 상위 던전 진입 가속</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="guide-section" style="margin-top:25px;">
                    <h4 class="guide-section-title">🎯 부위별 필수 / 유효 추천 옵션 (BIS Priority)</h4>
                    <p class="guide-desc">각 장비 부위마다 고유하게 붙는 확정 옵션과 우선적으로 파밍해야 하는 1순위/2순위 옵션 정리입니다.</p>
                    <div class="part-recom-grid">
                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">무기</span> <span class="core-slot">핵심 딜러 슬롯</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>주스탯 (힘/민/지)</strong> + <strong>퓨전 상태 데미지</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 공격속도 (+45.0%)</div>
                        <div class="recom-note">※ 트리거 데미지는 모든 무기에 100% 확정(최대 +18.4% / 10강 +36.8%)으로 부여됩니다.</div>
                      </div>

                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">장갑</span> <span class="core-slot">더블 크뎀 종결 슬롯</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>더블 크리티컬 데미지 (+37.6%)</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 더블 크리티컬 확률 (+3.7%), 주스탯</div>
                        <div class="recom-note">※ 공격속도는 거의 100% 확정(최대 +48.7%). 10강 시 더블 크뎀이 무려 +75.2%까지 폭증하는 핵심 부위!</div>
                      </div>

                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">반지</span> <span class="core-slot">쌍크리티컬 슬롯</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>더블 크리티컬 데미지 (+36.4%)</strong> + <strong>트리거 데미지 (+19.5%)</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 더블 크리티컬 확률 (+4.0%), 주스탯</div>
                        <div class="recom-note">※ 더블 크뎀과 크확, 트뎀이 동시에 뜨는 최고 효율 장신구. 셀X의 반지 고유옵션 우선 고려.</div>
                      </div>

                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">손목</span> <span class="core-slot">딜 & 공속 슬롯</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>더블 크리티컬 데미지 (+32.0%)</strong> + <strong>트리거 데미지 (+19.2%)</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 공격속도 (+50.9%), 주스탯</div>
                        <div class="recom-note">※ 공속이 최대 +50.9%까지 붙으며 더블 크뎀까지 챙길 수 있는 공격형 방어구 부위.</div>
                      </div>

                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">신발</span> <span class="core-slot">퓨전 지속 & 유틸</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>퓨전 지속시간 (+80초)</strong> + <strong>퓨전 상태 데미지</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 공격속도 (+48.6%), 드랍률 (+59.8%)</div>
                        <div class="recom-note">※ 이동속도는 100% 기본 보장(최대 +94). 퓨전 빌드 시 지속시간 +80초(10강 +160초) 필수.</div>
                      </div>

                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">갑옷 / 도복</span> <span class="core-slot">생존 & 주스탯</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>퓨전 영웅 데미지 (+25.9%)</strong> + <strong>주스탯 (힘/민/지)</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 퓨전 시 받는 트리거 데미지 감소</div>
                        <div class="recom-note">※ 받는 트뎀 감소는 100% 확정(최대 +9.3% / 10강 +18.6%). 도복은 주스탯 등장률이 40% 이상으로 높음.</div>
                      </div>

                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">목걸이</span> <span class="core-slot">드랍률 & 트리거 데미지</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>트리거 데미지 (+18.3%)</strong> + <strong>퓨전 지속시간 (+71초)</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 경험치 (+56.3%), 퓨전 받는 트뎀 감소</div>
                        <div class="recom-note">※ 드랍률은 98% 확정으로 기본 탑재(최대 +60.5% / 10강 +121.0%). 딜과 파밍을 겸비.</div>
                      </div>

                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">벨트 (띠)</span> <span class="core-slot">파밍 & 퓨전 지속</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>퓨전 지속시간 (+73초)</strong> + <strong>주스탯 (최대 +192만)</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 드랍률 (+55.8%), 경험치 (+58.8%)</div>
                        <div class="recom-note">※ 드랍률과 경험치가 각 45~50% 빈도로 등장하여 레벨업 및 파밍에 핵심적인 부위.</div>
                      </div>

                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">하의</span> <span class="core-slot">퓨전 데미지 & 생존</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>퓨전 상태 데미지 (+133.6%)</strong> + <strong>주스탯</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 받는 트리거 데미지 감소, 이동속도</div>
                        <div class="recom-note">※ 퓨전 상태 데미지가 최대 +133.6%(10강 시 +267.2%)까지 치솟는 폭발적인 화력 부위.</div>
                      </div>

                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">투구 (머리띠)</span> <span class="core-slot">올라운드 부위</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>퓨전 시 영웅 데미지 (+25.0%)</strong> + <strong>주스탯 (최대 +190만)</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 퓨전 지속시간 (+74초), 받는 트뎀 감소</div>
                        <div class="recom-note">※ 융합 6세트 시 '융합의 머리띠' 필수. 오지터 세트 시 깡스탯 극대화.</div>
                      </div>

                      <div class="recom-card">
                        <div class="recom-card-head"><span class="part-tag">귀걸이</span> <span class="core-slot">파밍 & 퓨전 유틸</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>퓨전 지속시간 (+74초)</strong> + <strong>이동속도 (+92)</strong></div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 드랍률 (+56.3%), 경험치 (+54.1%)</div>
                        <div class="recom-note">※ 드랍률/경험치 등장률이 60~70%로 매우 높아 파밍 장비로 적극 활용.</div>
                      </div>

                      <div class="recom-card highlight-card">
                        <div class="recom-card-head"><span class="part-tag">명예</span> <span class="core-slot">압도적 종결 슬롯</span></div>
                        <div class="recom-row"><span class="recom-p1">1순위</span> <strong>'제국의 명예' 단일 장착</strong> (올스탯 +1,260만 ~ +1,332만)</div>
                        <div class="recom-row"><span class="recom-p2">2순위</span> 공격속도 (+30.0%), 이동속도 (+80)</div>
                        <div class="recom-note">※ 최상위 랭커의 필수 장비. 단 한 부위로 일반 장비 10개 분량의 주스탯을 제공합니다.</div>
                      </div>
                    </div>
                  </div>
                </div>
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
    initGuidePartsFilter();
    renderGuidePartsTable("all");
  };

  // Global hooks
  window.renderFrameEquip = function() {
    initFrameEquip('col-frame-equip');
    renderAll();
    initGuidePartsFilter();
    renderGuidePartsTable("all");
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
