# 启泰智慧消防APP（chntek-fire-fighting）

## 要求

参照启泰智慧消防的”原型设计图”完成相应的界面与功能，并提供代码。

## 时间

13天，根据工作计划表的任务量的进行时间的估算（非精确时间）。超过的时间不额外计费，完成后，免费维护2个月。

## 人员

刘楚门，周存根，启泰传感后台开发人员。

## 工作安排

| 项目            | 任务     | 问题                                                         | 时间 | 人员               |
| --------------- | -------- | ------------------------------------------------------------ | :--- | ------------------ |
| 启泰智慧消防APP | 其他     | ~~界面-顶部导航~~  <br />~~界面-底部导航~~                   | 2天  | 周存根             |
|                 | 综合显示 | ~~界面-温度图表~~  <br />~~界面-压力图表~~  <br />~~界面-电量图表~~  <br />~~界面-其他数据表格~~  <br />~~界面-设备查询~~  <br />功能-查询设备数据 | 3天  | 刘楚门<br />周存根 |
|                 | GIS模块  | ~~界面-地图~~<br />~~界面-设备信息~~<br />功能-查询设备数据  | 2天  | 刘楚门<br />周存根 |
|                 | 告警模块 | ~~界面-当天告警~~  <br />~~界面-历史告警~~  <br />~~界面-告警详情~~  <br />功能-查询告警信息  <br />功能-告警通知 | 3天  | 刘楚门<br />周存根 |
|                 | 数据中心 | ~~界面-设备告警统计~~  <br />功能-查询设备告警统计           | 1天  | 刘楚门<br />周存根 |
|                 | 接口测试 | ~~接口-查询设备告警统计~~  <br />~~接口-查询告警信息~~  <br />~~接口-查询设备数据~~ | 2天  | 刘楚门             |
|                 | 接口文档 | ~~接口-查询告警信息~~  <br />~~接口-查询设备数据~~  <br />~~接口-查询设备告警统计~~  <br />接口-获取所有设备编号<br />~~GIS地图密钥~~ | 不定 | 启泰传感           |
|                 | 测试真机 | 多种的安卓机型                                               | 不定 |                    |
|                 |          |                                                              |      |                    |

#  前端

## 接口定义

`chntek.js`

### 设备

实时状态查询

#### 历史状态查询

```json
#方法
statusHistory(
    ids: '设备A,设备B',	  #被查询的设备编号，如果是多个设备则用逗号分隔，不填则是所有设备
)
#错误
抛出异常
#输出
{
    "设备A": [{	#设备编号
            "hydraulic_pressure":90, 		 #水压 MPa
            "temperature":80,				 #温度  °C
            "energy":70,    	 			 #电量  %
            "signal_intensity":29,  		 #信号强度 db
            "status_of_low_hydraulic_pressure":0, #低水压状态，0：正常，1：报警
            "status_of_high_hydraulic_pressure":0,#高水压状态，0：正常，1：报警
            "status_of_leak":0,		#漏水/取水状态，0：正常，1：报警
            "status_of_low_temperature":0,	#低温状态，0：正常，1：报警
            "status_of_high_temperature":0,	#高温状态，0：正常，1：报警
            "status_of_slope":0,	#倾斜状态，0：正常，1：报警
            "status_of_vibration":0,	#振动状态，0：正常，1：报警
            "status_of_energy":0,		#电量状态，0：正常，1：报警
            "status_of_pressure_sensor":0, #压力传感器状态，0：正常，1：报警
            "status_of_water_quality":0, #水质状态，0：正常，1：报警
            "status_of_subzero_temperature":0, #负温状态，0：正常，1：报警
            "status_of_low_signal_intensity":0, #低信号状态，0：正常，1：报警
            "longitude":1.2281,		#设备经度
            "latitude":13.128,		#设备纬度
            "time": "2010-12-10 14:20:00"		#检测时间
	}],
    "设备B": [{
        "hydraulic_pressure":90, 		 #水压
        "temperature":80,				 #温度
        "energy":70,    	 			 #电量
        "signal_intensity":29,  		 #信号强度
        "status_of_low_hydraulic_pressure":0, #低水压状态，0：正常，1：报警
        "status_of_high_hydraulic_pressure":0,#高水压状态，0：正常，1：报警
        "status_of_leak":0,		#漏水/取水状态，0：正常，1：报警
        "status_of_low_temperature":0,	#低温状态，0：正常，1：报警
        "status_of_high_temperature":0,	#高温状态，0：正常，1：报警
        "status_of_slope":0,	#倾斜状态，0：正常，1：报警
        "status_of_vibration":0,	#振动状态，0：正常，1：报警
        "status_of_energy":0,		#电量状态，0：正常，1：报警
        "status_of_pressure_sensor":0, #压力传感器状态，0：正常，1：报警
        "status_of_water_quality":0, #水质状态，0：正常，1：报警
        "status_of_subzero_temperature":0, #负温状态，0：正常，1：报警
        "status_of_low_signal_intensity":0, #低信号状态，0：正常，1：报警
        "longitude":1.2281,		#设备经度
        "latitude":13.128,		#设备纬度
        "time": "2010-14-10 10:20:00"		#检测时间
    }]
}
```

#### 告警状态

```json
#方法
warningListOfToday() #当天
warningListOfMonths(
    dete: '2020-12-1'	 #指定月的历史
)
#错误
抛出异常
#输出
[
    {
        "id":"设备A",		#设备编号
        "location":"长沙市望城区望城区管委会主楼6F男卫", #地点
        "warning_type":"信号低报警、负温标志、压力传感器报警",	#警告类型
        "time":	"2010-12-12 11:22:00",			#时间
    },{
        "id":"设备B",
        "location":"长沙市望城区望城区管委会主楼2F男卫",
        "warning_type":"低水压警告",
        "time":"2010-12-12 07:22:12",
    }
]
```

#### 告警统计

```json
#方法
warningStatistics(
    ids:'设备A,设备B',		#被查询的设备编号，如果是多个设备则用逗号分隔，不填则是所有设备
    date_begin:'1990-02-11',	#开始时间，统计的告警时间范围起始
    date_end:'1990-3-22'	#结束时间,统计的告警时间范围结束
)
#错误
抛出异常
#输出
{
    "设备A": {
        "1990-02-11":60,		#告警数量
        "1990-02-12":50
    },
    "设备B": {
        "1990-02-11":60,
        "1990-02-12":50
    }
}
```



# 后端

## 接口定义

### 设备

#### 所有设备编号

```json
HTTP GET http://iot.chntek.com:3410/api/Terminal/Devices
Authorization: 12
#输入
#输出
['00017','000018']
```

#### 状态查询

```json
#查询当天的设备状态，如果该设备当天没有状态则用最近的状态替代
HTTP GET http://iot.chntek.com:3410/api/Terminal/HistoryData
Athorization: 12
#输入
ids: '设备A,设备B' #被查询的设备编号，如果是多个设备则用逗号分隔，不填则是所有设备
date: '2010-12-24' 
#输出
{
    "err": null,		
    "val": { 
        "设备A": {	#设备编号
            "customerunit": "长沙银行浏阳分行",
            "longitude": "E113.6360389",
            "latitude": "N28.1428291",
            "productTerID": "CP000010118",
            "terminalNum": "00018",
            "pressure": "0.116",
            "temper": "8.7",
            "electricity": 99,
            "flow": "0.0",
            "conductivity": "7.4",
            "rssi": 14,
            "monitorsTime": "2020-12-03 05:14:46"
        },
        "设备B": {
            "customerunit": "长沙银行浏阳分行",
            "longitude": "E113.6360389",
            "latitude": "N28.1428291",
            "productTerID": "CP000010118",
            "terminalNum": "00018",
            "pressure": "0.116",
            "temper": "8.7",
            "electricity": 99,
            "flow": "0.0",
            "conductivity": "7.4",
            "rssi": 13,
            "monitorsTime": "2020-12-03 03:15:56"
        }
	}
}
```

#### 告警状态

```json
#查询指定月份的告警状态
HTTP GET http://iot.chntek.com:3410/api/Terminal/RealTimeData
Athorization: 12
#输入
date:'2020-10-01' 	#指定月的告警列表
#输出
{
    "err":null,
    "val":[{
            "productTerId": "QP000000006",
            "terminalNum": "00006",
            "warnName": "信号低报警、负温标志、压力传感器报警",
            "monitorsTime": "2020-12-03 08:39:13",
            "prefecturecity": "长沙市",
            "distriancounty": "浏阳",
            "customerunit": "长沙银行古港支行",
            "longitude": "E113.74880433",
            "latitude": "N28.2842444"
        },{
            "productTerId": "CP000010108",
            "terminalNum": "00008",
            "warnName": "信号低报警、负温标志、水质报警",
            "monitorsTime": "2020-12-03 01:43:38",
            "prefecturecity": "长沙市",
            "distriancounty": "浏阳",
            "customerunit": "长沙银行集里支行",
            "longitude": "E113.61641049",
            "latitude": "N28.15573705"
        }
    ]
}
```

#### 告警统计

```json
HTTP GET http://iot.chntek.com:3410/api/Terminal/WarningList
Athorization: 12
#输入
ids:'设备A,设备B'		#被查询的设备编号，如果是多个设备则用逗号分隔，不填则是所有设备
date_begin:'1990-02-11'	#开始时间，统计的告警时间范围起始
date_end:'1990-3-22'	#结束时间,统计的告警时间范围结束
#输出
{
    "err":null,
    "val":{
        "设备A": {
            "1990-02-11":60,		#告警数量
            "1990-02-12":50
        },
        "设备B": {
            "1990-02-11":60,
            "1990-02-12":50
        }
    }
}
```

