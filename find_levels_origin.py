import json

transcript_path = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\.system_generated\logs\transcript.jsonl"

with open(transcript_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get("content", "")
            if "3351" in content and data.get("source") == "USER_EXPLICIT":
                print(f"Step {data.get('step_index')} (USER_EXPLICIT):")
                print(content[:600])
                print("=" * 60)
        except Exception as e:
            pass
