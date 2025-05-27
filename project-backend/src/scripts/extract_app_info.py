import ijson
import re
import json
import sys

data_file = './checkpoints/apps_dict-ckpt-fin.json'
max_results = 10
export_file = 'matches.json'

print("Streaming data from:", data_file)

target_name = input("Enter the app name (or regex) to search for: ").strip()

try:
    pattern = re.compile(target_name, re.IGNORECASE)
except re.error as e:
    print(f"Invalid regex pattern: {e}")
    sys.exit(1)

matches = []

try:
    with open(data_file, 'r') as f:
        # ijson.kvitems parses the top-level keys and values from a JSON object
        for app_id, app_info in ijson.kvitems(f, ''):
            if isinstance(app_info, dict) and pattern.search(app_info.get('name', '')):
                matches.append((app_id, app_info))
                if len(matches) >= max_results:
                    # Stop early if max_results reached
                    break
except FileNotFoundError:
    print(f"File not found: {data_file}")
    sys.exit(1)
except Exception as e:
    print(f"Error reading JSON file: {e}")
    sys.exit(1)

print(f"\nFound {len(matches)} matching app(s):\n")

if matches:
    for i, (app_id, app_info) in enumerate(matches):
        print(f"Match {i+1}: App ID = {app_id}")
        print(json.dumps(app_info, indent=4))
        print("-" * 40)

    if len(matches) == max_results:
        print(f"Stopped after {max_results} results. There might be more matches.")

    export_choice = input(f"\nExport these matches to '{export_file}'? (y/n): ").strip().lower()
    if export_choice == 'y':
        try:
            with open(export_file, 'w') as out_f:
                # Export only matched entries
                json.dump({app_id: info for app_id, info in matches}, out_f, indent=4)
            print(f"Exported matches to {export_file}")
        except Exception as e:
            print(f"Failed to export: {e}")
else:
    print(f"No apps found matching: {target_name}")
