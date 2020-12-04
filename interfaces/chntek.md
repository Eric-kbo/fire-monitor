### 1
```
GET http://iot.chntek.com:3410/api/Terminal/HistoryData
    ?searchDate=2020-12-03
    &ids=00017,00018
Authorization: 12
```

### 2
```
GET http://iot.chntek.com:3410/api/Terminal/RealTimeData
    ?searchDate=2020-12-03
Authorization: 12
```

### 3
```
GET http://iot.chntek.com:3410/api/Terminal/WarningList
    ?ids=00017,00018
    &beginDate=2020-12-01
    &endDate=2020-12-03
Authorization: 12
```
