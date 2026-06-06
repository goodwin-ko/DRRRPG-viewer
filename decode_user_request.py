import base64

pdata2_b64 = "MSwwLDAsMjAyNjA2MDIsMjAyNjAyMjgsMjAyNjAyMjgsMjAyNjAyMjgs"
data3_b64 = "MCwwLDAsMCwwLDAsMjAyNjA2MDIsMSwwLDAs"
data1_b64 = "MCwwLDEzOCwyNjA5NTc1ODQsMTM2OSwwLDE0ODIsMCwxNDc0LDAsMTQ3MSwwLDEzNzQsMCwxMzc0LDAsMTkwMDEsNzM5NSw1NTM3MDgsMTU1NTY2MSw5MjcyNywxNDc2LDE4ODcsNTI4LDQwMSw5MTAsMzAsMTM4MiwyNDksMCwwLDAsMCwxNDAwLDE0MDAsMTUwMCwxNTAwLDEzMCwxMjMsNDkwNjQwNTQ0LDEzNjgsMCwxNDgyLDAsMTM3MywwLDEzNzUsMCwxMzc0LDAsMTM3NCwwLDU4OTQ2OCwxNzEwMTgwLDc3NDUxLDE0NzM1NywxMywxMTgyNTY0NywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDczNSwwLDEwNDUsMjgwLDEwNDYsMjY0LDc4NSw4Nyw5NTIsMTgsMTAwNywyODMsMTM3NCwwLDEwMjUsMCwxMzc1LDAsMTA5NCw1OCwxMDM2LDAsMCwwLDks"
data2_b64 = "ODQ1LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyMjAsMTQsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDM2LDAsMCwxMCw1MzczMzY4LDAsMCw5NCwwLDAsMCwwLDAs"
pdata1_b64 = "MTAwLDEwMCw1MCwwLDEwMCwxMDAsMTAwLDAsMCwwLDAsMTQsMjAsNTAsMCwxLDEsMCwxLDUwLDEwMCwxMDAsMTAwLDEwMCw1MCwwLDEwMCwxMDYsMjAwLDAsMCw="

def decode(name, b64_str):
    try:
        decoded = base64.b64decode(b64_str.strip()).decode('utf-8', errors='ignore').strip()
        print(f"{name}:")
        print(f"  Raw: {decoded}")
        arr = decoded.split(',')
        print(f"  Array (length {len(arr)}): {arr}")
        return arr
    except Exception as e:
        print(f"Failed to decode {name}: {e}")
        return []

pdata2 = decode("PDATA[2]", pdata2_b64)
data3 = decode("Data[3]", data3_b64)
data1 = decode("Data[1]", data1_b64)
data2 = decode("Data[2]", data2_b64)
pdata1 = decode("PData[1]", pdata1_b64)
