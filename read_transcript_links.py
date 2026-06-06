import json
import re

transcript_path = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\.system_generated\logs\transcript.jsonl"

with open(transcript_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get("content", "")
            if "LINK_3" in content or "링크_3" in content or "링크3" in content:
                print(f"Step {data.get('step_index')} ({data.get('source')}):")
                print(content[:800])
                print("=" * 60)
        except Exception as e:
            pass
