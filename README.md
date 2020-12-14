# 启泰智慧消防APP（chntek-fire-fighting）

## 要求

参照启泰智慧消防的”原型设计图”完成相应的界面与功能，并提供代码。

## 时间

### 启泰智慧消防APP-预览版-0.0.1

13天，根据工作计划表的任务量的进行时间的估算（非精确时间）。超过的时间不额外计费，完成后，免费维护2个月。

### 启泰智慧消防APP-预览版-0.0.2

5天，界面修改，功能操作优化。

## 人员

刘楚门，周存根，启泰传感后台开发人员。

## 工作安排

| 项目                         | 任务     | 问题                                                         | 时间 | 人员                 |
| ---------------------------- | -------- | ------------------------------------------------------------ | :--- | -------------------- |
| 启泰智慧消防APP-预览版-0.0.1 | 其他     | ~~界面-顶部导航~~  <br />~~界面-底部导航~~                   | 2天  | 周存根               |
|                              | 综合显示 | ~~界面-温度图表~~  <br />~~界面-压力图表~~  <br />~~界面-电量图表~~  <br />~~界面-其他数据表格~~  <br />~~界面-设备查询~~  <br />~~功能-查询设备数据~~ | 3天  | 周存根               |
|                              | GIS模块  | ~~界面-地图~~<br />~~界面-设备信息~~<br />~~功能-查询设备数据~~ | 2天  | 周存根               |
|                              | 告警模块 | ~~界面-当天告警~~  <br />~~界面-历史告警~~  <br />~~界面-告警详情~~  <br />~~功能-查询告警状态~~  <br />~~功能-告警通知~~ | 3天  | 周存根               |
|                              | 数据中心 | ~~界面-设备告警统计~~  <br />~~功能-查询设备告警统计~~       | 1天  | 周存根               |
|                              | 接口定义 | ~~接口-查询设备告警统计~~  <br />~~接口-查询告警状态~~  <br />~~接口-查询设备数据~~ | 2天  | 刘楚门               |
|                              | 接口实现 | ~~接口-查询告警状态  <br />~~接口-查询设备数据~~  <br />~~接口-查询设备告警统计~~  <br />接口-~~获取所有设备编号~~<br />~~GIS地图密钥~~ | 不定 | 刘楚门<br />启泰传感 |
|                              | 测试真机 | ~~谷歌~~<br />~~小米~~<br />~~红米~~<br />~~魅族~~<br />     | 不定 | 刘楚门               |
| 启泰智慧消防APP-预览版-0.0.2 | 综合显示 | 功能-查询区域设备当天状态                                    | 1天  | 周存根<br />刘楚门   |
|                              | GIS模块  | 功能-查询设备状态-设备类型图标修改                           | 1天  | 周存根<br />         |
|                              | 告警模块 | 功能-统计告警状态-总数<br />功能-统计告警状态-正常<br />功能-统计告警状态-异常 | 2天  | 周存根<br />刘楚门   |
|                              | 数据中心 | 功能-查询区域设备历史状态                                    | 1天  | 周存根<br />刘楚门   |
|                              | 接口实现 | 后端-查询所有区域信息<br />后端-查询区域设备数据<br />       | 不定 | 刘楚门<br />启泰传感 |
|                              |          |                                                              |      |                      |

#  前端

## 接口定义

`chntek.js`

### 设备

#### 状态查询

```json
#查询状态
statusRealtime(
    ids: '设备A,设备B'	  #被查询的设备编号，如果是多个设备则用逗号分隔，不填则是所有设备
)
#查询状态历史
statusHistory(
    ids: '设备A,设备B',	  #被查询的设备编号，如果是多个设备则用逗号分隔，不填则是所有设备
    date_begin: '2020-12-01', 	#指定日期范围
    date_end:'2020-12-10'		#指定日期范围
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
 		"status_of_water_quality":0,   #水质状态，0：正常，1：报警
  		"status_of_subzero_temperature":0, #负温状态，0：正常，1：报警
  		"status_of_low_signal_intensity":0, #低信号状态，0：正常，1：报警
 		"longitude":1.2281,		#设备经度
 		"latitude":13.128,		#设备纬度
 		"type": "firehydrant", #设备类型 firehydrant：消防栓，pressure：无线压力表，cylinders：消防气瓶
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
        "type": "firehydrant",
        "time": "2010-14-10 10:20:00"		#检测时间
    }]
}
```

#### 告警状态

```json
#方法
warningListOfToday() #当天
warningListOfMonths(
    dete: '2020-12-1'	 #指定日期的历史
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

# 后端

## 接口定义

### 设备

#### 获取区域设备编号

```json
HTTP GET http://iot.chntek.com:3410/api/Terminal/Regions
Authorization: 12
#输入
#输出
{
    "长沙市":[
        "望城区":['00017','00018'],
	    "雨花区":['00019','00019'],
    	"天心区":['00021','00020']
    ], 	
    "北京市":[
    	"海淀区":['00030','00031'],
		"卧槽区":['00034','00032'],
		"要钱区":['00037','00035']
    ]
}
```

#### 状态查询

```json
#查询当天的设备状态，如果该设备当天没有状态则用最近的状态替代
HTTP GET http://iot.chntek.com:3410/api/Terminal/HistoryData
Athorization: 12
#输入
ids: '设备A,设备B' #被查询的设备编号，如果是多个设备则用逗号分隔，不填则是全部
date_begin: '2010-12-24' #指定日期的状态
date_end: '2010-12-24' #指定日期的状态
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
            "terminalType": "pressure",
            "pressure": "0.116",
            "temper": "8.7",
            "electricity": 99,
            "flow": "0.0",
            "conductivity": "7.4",
            "rssi": 14,
            "monitorsTime": "2020-12-03 05:14:46",
        },
        "设备B": {
            "customerunit": "长沙银行浏阳分行",
            "longitude": "E113.6360389",
            "latitude": "N28.1428291",
            "productTerID": "CP000010118",
            "terminalNum": "00018",
            "terminalType": "pressure",
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
date:'2020-10-01' 	#指定日期的告警状态
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

