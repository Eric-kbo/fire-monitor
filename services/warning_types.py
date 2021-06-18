import json
import os


warning_types = set()

for device in os.listdir('db/devices'):
    for warning in os.listdir(f'db/devices/{device}/warnings'):
        warnings = []
        with open(f'db/devices/{device}/warnings/{warning}') as f:
            warnings = json.load(f)

        for w in warnings:
            for t in w['type'].split('，'):
                for t in t.split('、'):
                    warning_types.add(t)
        
with open(f'db/warning_types.json','w',encoding='utf-8') as f:
    json.dump(list(warning_types),f,ensure_ascii=False)