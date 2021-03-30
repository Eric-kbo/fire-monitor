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
        except:
            pass

        primary = {
            'id':tid,
            'longitude':status_list[0]['Longitude'] if status_list[0]['Longitude'] else '', 
            'latitude': status_list[0]['Latitude'] if status_list[0]['Latitude'] else '',
            'city':primary_later['city'] if 'city' in primary_later else '',
            'county':primary_later['county'] if 'county' in primary_later else '', 
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

        print(f'gather db/devices/{tid}/primary.json')
        with open(f'db/devices/{tid}/primary.json','w') as f:
            f.write(json.dumps(primary,indent=4,ensure_ascii=False))
        print(f'gather db/devices/{tid}/status/{today.date()}.json')
        with open(f'db/devices/{tid}/status/{today.date()}.json','w') as f:
            f.write(json.dumps(status,indent=4,ensure_ascii=False))
        with open(f'db/devices/{tid}/warnings/{today.date()}.json','w') as f:
            f.write(json.dumps([],indent=4,ensure_ascii=False))

    r = requests.get(f'http://iot.chntek.com:3410/api/Terminal/RealTimeData?searchDate={today.date()}',headers={'Authorization': token})
    r = r.json()

    statues = {}
    warnings = {}
    primaries = {}

    for w in r['val']:
        tid = w['ProductTerId']
        try:   
            if tid not in primaries:
                with open(f'db/devices/{tid}/primary.json','r') as f:
                    primaries[tid] = json.load(f)
            if tid not in statues:
                statues[tid] = {}
                with open(f'db/devices/{tid}/status/{today.date()}.json','r') as f:
                    for status in json.load(f):
                        statues[tid][status['time']] = status
        except:
            continue

        if tid not in warnings:
            warnings[tid] = []

        p = primaries[tid]
        primaries[tid]['id'] = tid
        primaries[tid]['longitude'] = w['Longitude'] if w['Longitude'] else p['longitude']
        primaries[tid]['latitude'] = w['Latitude'] if w['Latitude'] else p['latitude']
        primaries[tid]['city'] = w['Prefecturecity'] if w['Prefecturecity'] else p['city']
        primaries[tid]['county'] = w['Distriancounty'] if w['Distriancounty'] else p['county']
        primaries[tid]['location'] = w['Customerunit'] if w['Customerunit'] else p['location']
        primaries[tid]['type'] = p['type'] if 'type' in p else None  
    
        if not w['WarnName']: continue
        monitor_time = w['MonitorsTime']
        if monitor_time not in statues[tid]: continue
        status_of_time = statues[tid][monitor_time]
        if 'sluice' in status_of_time:
            status_of_time['sluice'] = '开' if -1 != w['WarnName'].find('漏水/取水') else '关'

        try:
            warnings[tid].append({
                'hydraulic_pressure': status_of_time['hydraulic_pressure'],
                'temperature':        status_of_time['temperature'],
                'energy':             status_of_time['energy'],
                'time':               monitor_time,
                'signal_intensity':   status_of_time['signal_intensity'],          
                'conductivity':       status_of_time['conductivity'],
                'type': w['WarnName'],
                'time': w['MonitorsTime'],
                'location': w['Prefecturecity'] + w['Distriancounty'] + w['Customerunit']
            })
        except:
            continue

    for tid in primaries:
        p = primaries[tid]
        print(f'update db/devices/{tid}/primary.json')
        with open(f'db/devices/{tid}/primary.json','w') as f:
            f.write(json.dumps(p,indent=4,ensure_ascii=False))

    for tid in statues:
        s = statues[tid]
        status = []
        for t in s:
            status.append(s[t])

        print(f'update db/devices/{tid}/status/{today.date()}.json')
        with open(f'db/devices/{tid}/status/{today.date()}.json','w') as f:
            f.write(json.dumps(status,indent=4,ensure_ascii=False))

    for tid in warnings:
        w = warnings[tid]
        os.makedirs(f'db/devices/{tid}/warnings',exist_ok=True)
        print(f'gather db/devices/{tid}/warnings/{today.date()}.json')
        with open(f'db/devices/{tid}/warnings/{today.date()}.json','w') as f:
            f.write(json.dumps(w,indent=4,ensure_ascii=False))

import sys
import multiprocessing as mp

def gather_of_account(ids):
    r = requests.get(f'http://iot.chntek.com:3410/api/user/login?account=test&password=123')
    token = r.json()['val']['token']

    for id in ids:
        for i in range(0 if len(sys.argv) == 1 else int(sys.argv[1]),-1,-1):
            gather(token,id,datetime.datetime.now() - datetime.timedelta(days=i))

if __name__ == '__main__':
    print('program [recent days]')
    ps = {}
    for account in db.ids:
        print('start '+account)
        ps[account] = mp.Process(target=gather_of_account,args=(db.ids[account],))
        ps[account].start()
        
    for account in ps:
        print('join '+account)
        ps[account].join()