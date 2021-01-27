#!/usr/bin/env python3
import copy
import json
import os
import datetime
from pandas import date_range

from flask import Flask, flash,abort, redirect, request, url_for
from gevent import pywsgi
from flask_cors import CORS

import chntek_db as db

app = Flask(__name__,'')
CORS(app,send_wildcard=True)
app.config['JSON_AS_ASCII'] = False

@app.route('/devices/ids', methods=['GET'])
def ids():
    try:
        account = request.args['account']
        ids = db.ids[account.upper()]
    except KeyError:
        ids = []
    return { 'val':ids, 'err':None}

@app.route('/devices/regions', methods=['GET'])
def regions():
    try:
        account = request.args['account']
        ids = db.ids[account.upper()]
    except KeyError:
        ids = []

    regions = {}
    for i in ids:
        try:
            with open(f'db/devices/{i}/primary.json') as f:
                primary = json.loads(f.read())
                city = primary['city']
                county = primary['county']
                if(not city): print(i) 
                
                if city not in regions or county not in regions[city]: 
                    regions[city] = {}
                    regions[city][county] = []
                regions[city][county].append(i)
        except FileNotFoundError as e:
            print(e)

    return { 'val': regions,'err':None}

@app.route('/devices/primary', methods=['GET'])
def primary():
    ids = request.args['ids'].split(',')
    primaries = []

    for i in ids:
        try:
            with open(f'db/devices/{i}/primary.json') as f:
                primaries.append(json.load(f))
        except FileNotFoundError as e:
            print(e)

    return { 'val':primaries, 'err':None}

@app.route('/devices/status-recent', methods=['GET'])
def status_realtime():
    id = request.args['id']

    status = []
    for days in range(60):
        time = datetime.datetime.now() - datetime.timedelta(days)
        print(time)
        try:
            with open(f'db/devices/{id}/status/{time.date()}.json') as f:
                status += json.load(f)
        except FileNotFoundError as e:
            print(e)

        if len(status) > 20: break
    return { 'val':status[0:20], 'err':None}

@app.route('/devices/status-history', methods=['GET'])
def status_history():
    id = request.args['id']
    date_begin = request.args['date_begin']
    date_end = request.args['date_end']
    size = int(request.args['size'])

    status = []
    for time in date_range(date_begin,date_end):
        try:
            with open(f'db/devices/{id}/status/{time.date()}.json') as f:
                status = json.load(f) + status
        except FileNotFoundError as e:
            print(e)

        if len(status) > size: break
    return { 'val': status[0:size], 'err':None}

@app.route('/devices/warnings', methods=['GET'])
def warnings():
    id = request.args['id']
    date = datetime.datetime.strptime(request.args['date'],'%Y-%m-%d').date()

    warnings = []
    try:
        with open(f'db/devices/{id}/warnings/{date}.json') as f:
            warnings = json.load(f)
    except FileNotFoundError as e:
        print(e)

    return { 'val': warnings, 'err':None }

from werkzeug.utils import secure_filename
os.makedirs(f'static/app', exist_ok=True)

app.config['UPLOAD_FOLDER'] = 'static/app/'
@app.route('/app/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        err = 'No file part'
        return { 'val': None, 'err': 'No file part!' }
    file = request.files['file']
    if file.filename == '':
        return { 'val': None, 'err': 'No selected file!' }
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return { 'val': True, 'err': None }

@app.route('/app/latest', methods=['GET'])
def latest():
    dirs = os.listdir(app.config['UPLOAD_FOLDER'])
    if not dirs:
        return { 'val': None, 'err': 'No latest version!'}
    return { 'val': request.host_url + 'app/' + dirs[-1] , 'err': None }

print('http://localhost:3410/')
http_server = pywsgi.WSGIServer(('0.0.0.0', 3410), app)
http_server.serve_forever()
