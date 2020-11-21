# 启泰智慧消防APP（chntek-fire-fighting）

## 要求

参照启泰智慧消防的”原型设计图”完成相应的界面与功能，并提供代码。

## 时间

13天，根据工作计划表的任务量的进行时间的估算（非精确时间）。超过的时间不额外计费，完成后，免费维护2个月。

## 人员

刘楚门，周存根，启泰传感后台开发人员。

## 工作安排

| 项目            | 任务     | 问题                                                         | 时间 | 人员     |
| --------------- | -------- | ------------------------------------------------------------ | :--- | -------- |
| 启泰智慧消防APP | 其他     | 界面-顶部导航  <br />界面-底部导航                           | 2天  |          |
|                 | 综合显示 | 界面-温度图表  <br />界面-压力图表  <br />界面-电量图表  <br />界面-其他数据表格  <br />界面-设备查询  <br />功能-查询设备数据 | 3天  |          |
|                 | GIS模块  | 界面-地图<br />界面-设备信息<br />功能-查询设备数据          | 2天  |          |
|                 | 告警模块 | 界面-当天告警  <br />界面-历史告警  <br />界面-告警详情  <br />功能-查询告警信息  <br />功能-告警通知 | 3天  |          |
|                 | 数据中心 | 界面-设备告警统计  <br />功能-查询设备告警统计               | 1天  |          |
|                 | 接口测试 | 接口-查询设备告警统计  <br />接口-查询告警信息  <br />接口-查询设备数据 | 2天  |          |
|                 | 接口文档 | 接口-查询设备告警统计  <br />接口-查询告警信息  <br />接口-查询设备数据  <br />功能-GIS地图示例-简单的 | 不定 | 启泰传感 |
|                 | 测试真机 | 多种的安卓机型                                               | 不定 |          |
|                 |          |                                                              |      |          |

#  前端

# 后端

## 接口定义

### 设备

#### 历史状态查询

```json
HTTP GET /devices/status-history
#输入
ids: '设备A,设备B' 	 #被查询的设备编号，如果是多个设备则用逗号分隔，不填则是所有设备
date: '2020-06-22'	#指定日期
#输出
{
	err:null,
    val:{
        设备A: [{		#设备编号
           hydraulic_pressure:90, #水压
           temperature:80,		#温度
           energy:70,    	 #电量
           voltage:7.26,     #电压
           signal_intensity:29,  #信号强度
           status:'离线',       	#状态
           status_of_hydraulic_pressure:0, #水压状态，0：正常，1：不正常
           status_of_valve:0,				#阀门状态，0：关闭，1：开启
           status_of_hit_down:1,			 #撞倒状态，0：否，1：是
           ?:'2017-06-22 00:00:00',	 		#接受时间
           ?:1414							#发送次数
		},{		
           hydraulic_pressure:90, 
           temperature:80,		
           energy:70,    	 
           voltage:7.26,     
           signal_intensity:29,  
           status:'离线',       	
           status_of_hydraulic_pressure:0, 
           status_of_valve:0,				
           status_of_hit_down:1,			
           ?:'2017-06-23 01:00:00',			
           ?:1414							
		}],
       	 设备B: [{
           hydraulic_pressure:90, 
           temperature:80,		
           energy:70,    	 
           voltage:7.26,     
           signal_intensity:29,  
		  status:'离线',       	
           status_of_hydraulic_pressure:0, 
           status_of_valve:0,		
           status_of_hit_down:1,			 
           ?:'2017-06-22 00:00:00',				
           ?:1414							
         }]
    }
}
```

#### 实时状态查询

```json
HTTP GET /devices/status-realtime
#输入
ids: '设备A,设备B' #被查询的设备编号，如果是多个设备则用逗号分隔，不填则是所有设备
#输出
{
    err: null,
    val: { 
        设备A: {	#设备编号
           hydraulic_pressure:90, #水压
           temperature:80,		#温度
           energy:70,    	 #电量
           voltage:7.26,     #电压
           signal_intensity:29,  #信号强度
           status:'离线',       	#状态
           status_of_hydraulic_pressure:0, #水压状态，0：正常，1：不正常
           status_of_valve:0,				#阀门状态，0：关闭，1：开启
           status_of_hit_down:1,			 #撞倒状态，0：否，1：是
           ?:'2017-06-22 00:00:00',	 		#接受时间
           ?:1414							#发送次数
        },
        设备B: {
		  hydraulic_pressure:90, 
           temperature:80,		
           energy:70,    	 
           voltage:7.26,     
           signal_intensity:29,  
           status:'离线',       	
           status_of_hydraulic_pressure:0, 
           status_of_valve:0,		
           status_of_hit_down:1,			 
           ?:'2017-06-22 00:00:00',				
           ?:1414		
        }
	}
}
```

### 告警状态

```json
HTTP GET /devices/warning-list
#输入
date:'2020-10-22' 	#指定日期的告警列表
#输出
{
    err:null,
    val:[
        {
            id:'设备A',		#设备编号
            location:'湖大三号厨房', #地点
            from:'智慧消防栓',		#来源
            device_type:'室外消防栓',	#设备类型
            warning_type:'低水压警告',	#警告类型
            time:'11:22:00',			#时间
        },{
		   id:'设备B',
            location:'湖大三号厨房',
            from:'智慧消防栓',
            device_type:'室外消防栓',
            warning_type:'低水压警告',
            time:'07:22:12',
        },{
		   id:'设备C',				
            location:'湖大二号厨房',
            from:'智慧消防栓',
            device_type:'室外消防栓',
            warning_type:'低水压警告',
            time:'09:22:12',
        }
    ]
}
```

#### 告警统计

```json
HTTP GET /devices/warning-statistics
#输入
ids:'设备A,设备B'		#被查询的设备编号，如果是多个设备则用逗号分隔，不填则是所有设备
date_begin:'1990-02-11'	#开始时间，统计的告警时间范围起始
date_end:'1990-3-22'	#结束时间,统计的告警时间范围结束
#输出
{
    err:null,
    val:{
        设备A: {
            '1990-02-11':60,		#告警数量
            '1990-02-12':50
        },
        设备B: {
            '1990-02-11':60,
            '1990-02-12':50
        }
    }
}
```

