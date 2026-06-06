import base64

d1_b64 = "MCwwLDEzOCwyNjA5NTc1ODQsMTM2OSwwLDE0ODIsMCwxNDc0LDAsMTQ3MSwwLDEzNzQsMCwxMzc0LDAsMTkwMDEsNzM5NSw1NTM3MDgsMTU1NTY2MSw5MjcyNywxNDc2LDE4ODcsNTI4LDQwMSw5MTAsMzAsMTM4MiwyNDksMCwwLDAsMCwxNDAwLDE0MDAsMTUwMCwxNTAwLDEzMCwxMjMsNDkwNjQwNTQ0LDEzNjgsMCwxNDgyLDAsMTM3MywwLDEzNzUsMCwxMzc0LDAsMTM3NCwwLDU4OTQ2OCwxNzEwMTgwLDc3NDUxLDE0NzM1NywxMywxMTgyNTY0NywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDczNSwwLDEwNDUsMjgwLDEwNDYsMjXQsDc4NSw4Nyw5NTIsMTgsMTAwNywyODMsMTM3NCwwLDEwMjUsMCwxMzc1LDAsMTA5NCw1OCwxMDM2LDAsMCwwLDks"
d1 = base64.b64decode(d1_b64).decode('utf-8', errors='ignore').strip().split(',')

print("=== DATA1_3 elements ===")
for idx, val in enumerate(d1):
    print(f"Index {idx:2d}: {val}")
