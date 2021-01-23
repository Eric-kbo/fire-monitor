import datetime
import requests
import json
import os
import chntek_db as db

def gather(token,ids,today=datetime.datetime.now()):
    r = requests.get(f'http://iot.chntek.com:3410/api/Terminal/HistoryData?ids={ids}&date_begin={today.date()}&date_end={today.date()}',headers={'Authorization': token})
    r = r.json()

    for tid in r['val']:
        os.makedirs(f'db/devices/{tid}',exist_ok=True)
        os.makedirs(f'db/devices/{tid}/status',exist_ok=True)
        os.makedirs(f'db/devices/{tid}/warnings',exist_ok=True)
        
        status_list = r['val'][tid]
        if 0 == len(status_list): continue

        primary_later = {}
        
        try:
            with open(f'db/devices/{tid}/primary.json','r') as f:
                primary_later = json.load(f)
        except FileNotFoundError:
            pass

        primary = {
            'id':tid,
            'longitude':status_list[0]['Longitude'] if status_list[0]['Longitude'] else '', 
            'latitude': status_list[0]['Latitude'] if status_list[0]['Latitude'] else '',
            'city':primary_later['city'] if 'city' in primary_later else '',
            'county':primary_later['county'] if 'county' in primary_later else '', 
            'location': status_list[0]['Customerunit'] if status_list[0]['Customerunit'] else '',
            'type': status_list[0]['TerminalType'] if status_list[0]['TerminalType'] else 'firehydrant',  #设备类型 firehydrant：消防栓，pressure：无线压力表，cylinders：消防气瓶
        }
        
        status = []

        for s in status_list:
            status.append({
                'hydraulic_pressure': s['pressure'],
                'temperature':        s['temper'],
                'energy':             s['electricity'],
                'time':               s['MonitorsTime'],
                'signal_intensity':   s['rssi'],          
                'conductivity':       s['conductivity']
            })

        print(f'gather db/devices/{tid}')
        with open(f'db/devices/{tid}/primary.json','w') as f:
            f.write(json.dumps(primary,indent=4,ensure_ascii=False))
        with open(f'db/devices/{tid}/status/{today.date()}.json','w') as f:
            f.write(json.dumps(status,indent=4,ensure_ascii=False))
        with open(f'db/devices/{tid}/warnings/{today.date()}.json','w') as f:
            f.write(json.dumps([],indent=4,ensure_ascii=False))

    r = requests.get(f'http://iot.chntek.com:3410/api/Terminal/RealTimeData?searchDate={today.date()}',headers={'Authorization': token})
    r = r.json()

    for w in r['val']:
        tid = w['ProductTerId']
        os.makedirs(f'db/devices/{tid}',exist_ok=True)
        os.makedirs(f'db/devices/{tid}/status',exist_ok=True)
        os.makedirs(f'db/devices/{tid}/warnings',exist_ok=True)

        try:
            print(f'gather db/devices/{tid}/warnings/{today.date()}.json',end=' ')
            with open(f'db/devices/{tid}/primary.json','w+') as f:
                if f.seek(0,2) == 0: f.write('{}')
                f.seek(0)
                primary = json.load(f)
                primary = {
                    'id':tid,
                    'longitude':w['Longitude'] if w['Longitude'] else primary['Longitude'],
                    'latitude': w['Latitude'] if w['Latitude'] else primary['Latitude'],
                    'city': w['Prefecturecity'] if w['Prefecturecity'] else primary['city'],
                    'county': w['Distriancounty'] if w['Distriancounty'] else primary['county'],
                    'location': w['Customerunit'] if w['Customerunit'] else primary['location'],
                    'type': 'firehydrant',  #设备类型 firehydrant：消防栓，pressure：无线压力表，cylinders：消防气瓶
                }

                f.seek(0)
                f.truncate()
                f.write(json.dumps(primary,indent=4,ensure_ascii=False))

            with open(f'db/devices/{tid}/warnings/{today.date()}.json','w+') as f:
                if f.seek(0,2) == 0: f.write('[]')
                f.seek(0)
                warnings = json.load(f)
                warnings.append({
                    'type': w['WarnName'],
                    'time': w['MonitorsTime'],
                    'location': w['Prefecturecity'] + w['Distriancounty'] + w['Customerunit']
                })
                f.seek(0)
                f.truncate()
                f.write(json.dumps(warnings,indent=4,ensure_ascii=False))
                print()
        except TypeError as e:
            print(e)

print('program [recent days]')
import sys

r = requests.get(f'http://iot.chntek.com:3410/api/user/login?account=test&password=123')
token = r.json()['val']['token']
for account in db.ids:
    ids = ''    
    for i in db.ids[account]:
        ids += f'{i},'

    for i in range(1 if len(sys.argv) == 1 else int(sys.argv[1]),-1,-1):
        gather(token,ids,datetime.datetime.now() - datetime.timedelta(days=i))