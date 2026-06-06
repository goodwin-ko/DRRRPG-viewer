import json

transcript_path = r"C:\Users\JS\.gemini\antigravity\brain\fc4f55f5-1f5d-4232-ba7d-0e709508801d\.system_generated\logs\transcript.jsonl"

targets = ["3351", "3840", "3609", "3367"]
with open(transcript_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get("content", "")
            for t in targets:
                if t in content:
                    print(f"Step {data.get('step_index')} ({data.get('source')}): contains {t}")
                    # print snippet around it
                    idx = content.find(t)
                    start = max(0, idx - 100)
                    end = min(len(content), idx + 200)
                    print("  Snippet:", content[start:end].replace("\n", " "))
                    print("-" * 50)
                    break
        except Exception as e:
            pass
