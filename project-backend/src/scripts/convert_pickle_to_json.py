import pickle
import json

def make_json_serializable(obj):
    if isinstance(obj, bytes):
        return obj.decode('utf-8', errors='ignore')
    elif isinstance(obj, set):
        return list(obj)
    elif hasattr(obj, '__dict__'):
        return obj.__dict__
    elif isinstance(obj, (int, float, str, bool, type(None))):
        return obj
    else:
        return str(obj)  # fallback for unknown types

def convert(data):
    if isinstance(data, dict):
        return {str(k): convert(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert(i) for i in data]
    else:
        return make_json_serializable(data)

# Load the pickle file
data_file = './checkpoints/apps_dict-ckpt-fin.p'
with open(data_file, 'rb') as f:
    data = pickle.load(f)

# Convert to JSON-serializable form
data_serializable = convert(data)

# Save as JSON
json_file = './checkpoints/apps_dict-ckpt-fin.json'
with open(json_file, 'w') as f:
    json.dump(data_serializable, f, indent=4)
