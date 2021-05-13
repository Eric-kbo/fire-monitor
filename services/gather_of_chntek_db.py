import datetime
import requests
import json
import os
import chntek_db as db


def gather(regions,token,id,today=datetime.datetime.now()):
    r = requests.get(f'http://iot.chntek.com:3410/api/Terminal/HistoryData?ids={id}&date_begin={today.date()}&date_end={today.date()}',headers={'Authorization': token})
    r = r.json()

    for tid in r['val']:
        os.makedirs(f'db/devices/{id}',exist_ok=True)
        os.makedirs(f'db/devices/{id}/status',exist_ok=True)
        os.makedirs(f'db/devices/{id}/warnings',exist_ok=True)
        
        status_list = r['val'][id]
        if 0 == len(status_list): continue

        try:
            city,county = regions[id]
        except:
            city = 'None'
            county = 'None'

        primary = {
            'id':id,
            'longitude':status_list[0]['Longitude'] if status_list[0]['Longitude'] else '', 
            'latitude': status_list[0]['Latitude'] if status_list[0]['Latitude'] else '',
            'city': city,
            'county': county, 
            'location': status_list[0]['Customerunit'] if status_list[0]['Customerunit'] else '',
            'type': status_list[0]['TerminalType'] if status_list[0]['TerminalType'] else None,  #设备类型 firehydrant：消防栓，pressure：无线压力表，cylinders：消防气瓶
        }
        
        status = []

        last = None
        for s in status_list:
            flow = float(s['flow'])
            info = {
                'hydraulic_pressure': s['pressure'],
                'temperature':        s['temper'],
                'energy':             s['electricity'],
                'time':               s['MonitorsTime'],
                'signal_intensity':   s['rssi'],
                'conductivity':       s['conductivity'],
            }

            if primary['type'] == 'firehydrant' or primary['type'] == 'LowerFlange': 
                info['sluice'] = '关'

            if primary['type'] == 'LowerFlange':
                info['flow'] = flow
                info['flow_difference'] = 0.0
                
                if last:
                    flow_difference = last['flow'] - flow
                    if flow_difference < 0: flow_difference = 0
                    last['flow_difference'] = round(flow_difference,1)
                last = info

            status.append(info)

        print(f'gather db/devices/{id}/primary.json')
        with open(f'db/devices/{id}/primary.json','w') as f:
            f.write(json.dumps(primary,indent=4,ensure_ascii=False))
        print(f'gather db/devices/{id}/status/{today.date()}.json')
        with open(f'db/devices/{id}/status/{today.date()}.json','w') as f:
            f.write(json.dumps(status,indent=4,ensure_ascii=False))
        with open(f'db/devices/{id}/warnings/{today.date()}.json','w') as f:
            f.write(json.dumps([],indent=4,ensure_ascii=False))

    r = requests.get(f'http://iot.chntek.com:3410/api/Terminal/RealTimeData?searchDate={today.date()}',headers={'Authorization': token})
    r = r.json()

    status2 = {}
    warnings = []
    primary = {}

    for w in r['val']:
        if w['ProductTerId'] != id:
            continue
        
        try:   
            with open(f'db/devices/{id}/primary.json','r') as f:
                primary = json.load(f)
            with open(f'db/devices/{id}/status/{today.date()}.json','r') as f:
                for status in json.load(f):
                    status2[status['time']] = status
        except:
            continue

        primary['id'] = id
        primary['location'] = w['Customerunit'] if w['Customerunit'] else primary['location']

        if not w['warmName']: continue
        monitor_time = w['MonitorsTime']
        if monitor_time not in status2: continue
        status_of_time = status2[monitor_time]
        if 'sluice' in status_of_time:
            status_of_time['sluice'] = '开' if -1 != w['warmName'].find('漏水/取水') else '关'

        try:
            warnings.append({
                'hydraulic_pressure': status_of_time['hydraulic_pressure'],
                'temperature':        status_of_time['temperature'],
                'energy':             status_of_time['energy'],
                'time':               monitor_time,
                'signal_intensity':   status_of_time['signal_intensity'],          
                'conductivity':       status_of_time['conductivity'],
                'type': w['warmName'],
                'time': w['MonitorsTime'],
                'location': w['Prefecturecity'] + w['Distriancounty'] + w['Customerunit']
            })
        except:
            continue

    print(f'update db/devices/{id}/primary.json')
    with open(f'db/devices/{id}/primary.json','w') as f:
        f.write(json.dumps(primary,indent=4,ensure_ascii=False))

    status = []
    for t,v in status2.items():
        status.append(v)

    print(f'update db/devices/{id}/status/{today.date()}.json')
    with open(f'db/devices/{id}/status/{today.date()}.json','w') as f:
        f.write(json.dumps(status,indent=4,ensure_ascii=False))

    os.makedirs(f'db/devices/{id}/warnings',exist_ok=True)
    print(f'gather db/devices/{id}/warnings/{today.date()}.json')
    with open(f'db/devices/{id}/warnings/{today.date()}.json','w') as f:
        f.write(json.dumps(warnings,indent=4,ensure_ascii=False))

import sys
import multiprocessing as mp

def gather_of_account(ids,regions,token):
    for id in ids:
        for i in range(0 if len(sys.argv) == 1 else int(sys.argv[1]),-1,-1):
            gather(regions,token,id,datetime.datetime.now() - datetime.timedelta(days=i))

if __name__ == '__main__':
    print('program [recent days]')
    ps = {}

    r = requests.get(f'http://iot.chntek.com:3410/api/user/login?account=test&password=123')
    token = r.json()['val']['token']

    r = requests.get(f'http://iot.chntek.com:3410/api/Terminal/Regions',headers={'Authorization': token})
    regions = r.json()['val']
    regions2 = {}
    for city in regions:
        for county,ids in regions[city].items():
            for id in ids:
                regions2[id] = city,county

    print(regions2)

    for account in db.ids:
        print('start '+account)
        gather_of_account(db.ids[account],regions2,token)