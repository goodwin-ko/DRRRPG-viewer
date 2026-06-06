import base64

d1_3_b64 = "MCwwLDEzOCwyNjA5NTc1ODQsMTM2OSwwLDE0ODIsMCwxNDc0LDAsMTQ3MSwwLDEzNzQsMCwxMzc0LDAsMTkwMDEsNzM5NSw1NTM3MDgsMTU1NTY2MSw5MjcyNywxNDc2LDE4ODcsNTI4LDQwMSw5MTAsMzAsMTM4MiwyNDksMCwwLDAsMCwxNDAwLDE0MDAsMTUwMCwxNTAwLDEzMCwxMjMsNDkwNjQwNTQ0LDEzNjgsMCwxNDgyLDAsMTM3MywwLDEzNzUsMCwxMzc0LDAsMTM3NCwwLDU4OTQ2OCwxNzEwMTgwLDc3NDUxLDE0NzM1NywxMywxMTgyNTY0NywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDczNSwwLDEwNDUsMjgwLDEwNDYsMjY0LDc4NSw4Nyw5NTIsMTgsMTAwNywyODMsMTM3NCwwLDEwMjUsMCwxMzc1LDAsMTA5NCw1OCwxMDM2LDAsMCwwLDks"
d1_20_b64 = "MTAwMDAwMCw4ODU1NTksMTQxLDIwMzY1NjczNiwxMTk0LDAsMTQ4MiwwLDEzNzMsMCwxMzc0LDAsMTM3NCwwLDEzNzQsMCwxOTAwMSw5MzU5LDI0NzAyNjAsMjQ3MDI2MCwyNDcwMjYwLDkxMCw3OSwxNDc2LDM0NzQsMCwwLDAsMCwwLDAsMCwxNDAwLDE0MDAsMTUwMCwxNTAwLDEzMCwxMjMsNTM3MzM2OCwxMTk0LDAsMTQ4MiwwLDEzNzMsMCwxMzc1LDAsMTM3NCwwLDEzNzQsMCw5NzczODAsMTYzMDUzNywzNzUxODgsMTczMzUwLDEzLDE1MTkyMjg5LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTA0NiwxMjUsMTA0NSw3OSw1MzYsMCw5MzksMCw1MzMsMCw2MzcsNTkyLDEwMjgsMCwxMDI5LDAsMTAzMywwLDEwMjMsMCwxMDk5LDAsMTM3NCwwLDMs"

d1_3 = base64.b64decode(d1_3_b64).decode('utf-8', errors='ignore').strip().split(',')
d1_20 = base64.b64decode(d1_20_b64).decode('utf-8', errors='ignore').strip().split(',')

print(f"{'Index':<5} | {'Slot 3':<15} | {'Slot 20':<15}")
print("-" * 40)
max_len = max(len(d1_3), len(d1_20))
for i in range(max_len):
    val_3 = d1_3[i] if i < len(d1_3) else ""
    val_20 = d1_20[i] if i < len(d1_20) else ""
    print(f"{i:<5} | {val_3:<15} | {val_20:<15}")
