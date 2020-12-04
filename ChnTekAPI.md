查询设备状态  

```js
// 输入参数:
{
    devices:["设备1","设备2"]
}
// 转换函数:
function transDeviceStatus([]){}
// 输出结果:
[
    {
         title: {
            text: '水压'
        },
         legend: {
            data: ['设备1', '设备2']
        },
         xAxis: {
            data: ['09:00', '10:01', '11:00', '12:00']
        },
        series: [
                {
                    name: '设备1',
                    data: [120, 132, 101, 134]
                },
                {
                    name: '设备2',
                    data: [220, 182, 191, 234]
                }
            ]
    },
     {
         title: {
            text: '电量'
        },
         legend: {
            data: ['设备1', '设备2']
        },
         xAxis: {
            data: ['09:00', '10:01', '11:00', '12:00']
        },
        series: [
                {
                    name: '设备1',
                    data: [120, 132, 101, 134]
                },
                {
                    name: '设备2',
                    data: [220, 182, 191, 234]
                }
            ]
    }
]
```

查询警告信息  

```js
// 输入参数:
{
    date:"2020-10-11"
}
// 转换函数:
function transWarningList(){}
// 输出结果:
{
"val": [
    {
      "id": "设备A",
      "location": "湖大三号厨房",
      "from": "智慧消防栓",
      "device_type": "室外消防栓",
      "warning_type": "低水压警告",
      "time": "11:22:00"
    },
    {
      "    id": "设备B",
      "location": "湖大三号厨房",
      "from": "智慧消防栓",
      "device_type": "室外消防栓",
      "warning_type": "低水压警告",
      "time": "07:22:12"
    },
    {
      "id": "设备C",
      "location": "湖大二号厨房",
      "from": "智慧消防栓",
      "device_type": "室外消防栓",
      "warning_type": "低水压警告",
      "time": "09:22:12"
    }
  ]

}
```

查询统计信息   

```js
// 输入参数:
{
    devices:["设备1","设备2"]
    dateStart:"2020-02-01",
    dateEnd:"2020-02-04"
}
function transStatistics{}
// 输出结果:
{
     title: {
        text: '统计信息'
    },
     legend: {
        data: ['设备1', '设备2']
    },
     xAxis: {
        data: ['02-01', '02-02', '02-03', '02-04']
    },
    series: [
            {
                name: '设备1',
                type: 'line',
                data: [120, 132, 101, 134]
            },
            {
                name: '设备2',
                type: 'line',
                data: [220, 182, 191, 234]
            }
    ]
    }
```