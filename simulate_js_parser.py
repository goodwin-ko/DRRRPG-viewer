import json
import base64

with open("test_out.json", "r", encoding="utf-8") as f:
    res = json.load(f)

data = res["data"]
print("Simulating app.js parsing:")
slot_data = []
for key, val in data.items():
    if key.startswith("DATA1_"):
        slot_num = key.replace("DATA1_", "")
        d1_b64 = val
        d2_b64 = data.get(f"DATA2_{slot_num}", "")
        d3_b64 = data.get(f"DATA3_{slot_num}", "")
        
        # Decode base64
        try:
            d1_decoded = base64.b64decode(d1_b64.strip()).decode('utf-8', errors='ignore')
            d1 = [s.strip() for s in d1_decoded.split(',')]
        except Exception as e:
            print(f"Failed to decode DATA1_{slot_num}: {e}")
            continue
            
        try:
            d2_decoded = base64.b64decode(d2_b64.strip()).decode('utf-8', errors='ignore')
            d2 = [s.strip() for s in d2_decoded.split(',')]
        except:
            d2 = []
            
        try:
            d3_decoded = base64.b64decode(d3_b64.strip()).decode('utf-8', errors='ignore')
            d3 = [s.strip() for s in d3_decoded.split(',')]
        except:
            d3 = []
            
        if len(d1) > 72:
            try:
                char_id = int(d1[2]) if d1[2].isdigit() else -1
                # Level formula calculation
                # Let's see if this throws any error
                raw_lvl_val = int(d1[17]) if d1[17].isdigit() else 0
                exp_val = int(d1[3]) if d1[3].isdigit() else 0
                
                exp_lvl = int((exp_val / 25) ** 0.5)
                raw_lvl_calculated = int(raw_lvl_val / 3.28)
                
                # simulate getActiveSlotNum
                final_char = data.get("인증 Final 캐릭터")
                # Wait! What if "인증 Final 캐릭터" is not found?
                # We do:
                active_slot_num = -1
                if final_char:
                    # clean up and match
                    pass
                
                slot_num_int = int(slot_num)
                if slot_num_int == active_slot_num or abs(raw_lvl_calculated - expLvl if 'expLvl' in locals() else exp_lvl) > 100:
                    level = exp_lvl
                else:
                    level = raw_lvl_calculated
                    
                print(f"  Slot {slot_num}: Name={d1[1]}, ID={char_id}, Level={level}")
            except Exception as e:
                print(f"Error parsing slot {slot_num}: {e}")
