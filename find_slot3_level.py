import base64

d1_b64 = "MCwwLDEzOCwyNjA5NTc1ODQsMTM2OSwwLDE0ODIsMCwxNDc0LDAsMTQ3MSwwLDEzNzQsMCwxMzc0LDAsMTkwMDEsNzM5NSw1NTM3MDgsMTU1NTY2MSw5MjcyNywxNDc2LDE4ODcsNTI4LDQwMSw5MTAsMzAsMTM4MiwyNDksMCwwLDAsMCwxNDAwLDE0MDAsMTUwMCwxNTAwLDEzMCwxMjMsNDkwNjQwNTQ0LDEzNjgsMCwxNDgyLDAsMTM3MywwLDEzNzUsMCwxMzc0LDAsMTM3NCwwLDU4OTQ2OCwxNzEwMTgwLDc3NDUxLDE0NzM1NywxMywxMTgyNTY0NywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDczNSwwLDEwNDUsMjgwLDEwNDYsMjY0LDc4NSw4Nyw5NTIsMTgsMTAwNywyODMsMTM3NCwwLDEwMjUsMCwxMzc1LDAsMTA5NCw1OCwxMDM2LDAsMCwwLDks"
d2_b64 = "ODQ1LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyMjAsMTQsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDM2LDAsMCwxMCw1MzczMzY4LDAsMCw5NCwwLDAsMCwwLDAs"
d3_b64 = "MCwwLDAsMCwwLDAsMjAyNjA2MDIsMSwwLDAs"

d1 = base64.b64decode(d1_b64).decode('utf-8', errors='ignore').strip().split(',')
d2 = base64.b64decode(d2_b64).decode('utf-8', errors='ignore').strip().split(',')
d3 = base64.b64decode(d3_b64).decode('utf-8', errors='ignore').strip().split(',')

target_level = 3230
target_upgrade = 9

print("Searching for target_level (3230) in Slot 3 arrays:")
for name, arr in [("d1", d1), ("d2", d2), ("d3", d3)]:
    for idx, val in enumerate(arr):
        if val == str(target_level):
            print(f"  Exact match in {name}[{idx}]")
        try:
            val_int = int(val)
            # check if there's any relation like val_int / X = target_level
            # or val_int - target_upgrade = target_level * Y
            if val_int > 0:
                ratio = val_int / target_level
                if abs(ratio - round(ratio)) < 0.001:
                    print(f"  Ratio match in {name}[{idx}]: {val_int} / {target_level} = {ratio}")
                ratio_with_upg = (val_int - target_upgrade) / target_level
                if abs(ratio_with_upg - round(ratio_with_upg)) < 0.001:
                    print(f"  Ratio-upgrade match in {name}[{idx}]: ({val_int} - {target_upgrade}) / {target_level} = {ratio_with_upg}")
        except:
            pass
