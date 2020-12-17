const axios = require('axios');

const host = 'http://iot.chntek.com:3410';

function Chntek() {
    this.devices = {
        async regions() {
            while (true) {
                const { data } = await axios.get(`${host}/api/Terminal/Regions`, {
                    headers: { 'Authorization': '12' }
                });
                if (data.val) return data.val
            }
            return null
        },
        async ids() {
            console.log('deviceIds: ');
            const { data } = await axios.get(`${host}/api/Terminal/GetAllDevice`, {
                headers: { 'Authorization': '12' }
            });
            console.log('warningList: data.err ' + data.err);
            if (data.err) throw data.err;
            console.log(data.val);
            return data.val;
        },
        async status(ids, dateBegin, dateEnd) {
            let strIds = ''
            for (let id of ids) strIds += id + ','

            console.log(`status: ${strIds} ${dateBegin} ${dateEnd}`)
            const { data } = await axios.get(`${host}/api/Terminal/HistoryData`, {
                params: {
                    date_begin: dateBegin,
                    date_end: dateEnd,
                    ids: strIds
                },
                headers: { 'Authorization': '12' }
            });
            console.log(`status: data.err ${data.err}`)
            if (data.err) throw data.err;
            let val = {};
            for (let id in data.val) {
                let objs = data.val[id];
                val[id] = [];
                for (let obj of objs) {
                    val[id].push({
                        "hydraulic_pressure": obj.pressure, //水压
                        "temperature": obj.temper,		//温度
                        "energy": obj.electricity,      //电量
                        "signal_intensity": obj.rssi,   //信号强度
                        "status_of_low_hydraulic_pressure": 0, //低水压状态，0：正常，1：报警
                        "status_of_high_hydraulic_pressure": 0,//高水压状态，0：正常，1：报警
                        "status_of_leak": 0,		    //漏水/取水状态，0：正常，1：报警
                        "status_of_low_temperature": 0,	//低温状态，0：正常，1：报警
                        "status_of_high_temperature": 0,//高温状态，0：正常，1：报警
                        "status_of_slope": 0,	        //倾斜状态，0：正常，1：报警
                        "status_of_vibration": 0,	    //振动状态，0：正常，1：报警
                        "status_of_energy": 0,		    //电量状态，0：正常，1：报警
                        "status_of_pressure_sensor": 0, //压力传感器状态，0：正常，1：报警
                        "status_of_water_quality": 0,   //水质状态，0：正常，1：报警
                        "status_of_subzero_temperature": 0, //负温状态，0：正常，1：报警
                        "status_of_low_signal_intensity": 0,//低信号状态，0：正常，1：报警
                        "type": obj.terminalType,
                        "longitude": obj.longitude,		        //设备经度
                        "latitude": obj.latitude,		        //设备纬度
                        "time": obj.monitorsTime		//检测时间
                    });
                }
            }
            return val;
        },
        async warningList(date) {
            console.log('warningList: ' + date);
            const { data } = await axios.get(`${host}/api/Terminal/RealTimeData`, {
                params: {
                    searchDate: date
                },
                headers: { 'Authorization': '12' }
            });
            console.log('warningList: data.err ' + data.err);
            if (data.Err) throw data.Err;
            if (data.err) throw data.err;

            let val = [];

            for (let obj of data.val) {
                val.push({
                    "id": obj.terminalNum,		//设备编号
                    "location": obj.prefecturecity + obj.distriancounty + obj.customerunit, //地点
                    "warning_type": obj.warnName,	//警告类型
                    "time": obj.monitorsTime,			//时间
                    "longitude": obj.longitude,
                    "latitude": obj.latitude
                });
            }

            return val;
        }
    };

    this.transCityList = async () => {
        let val = await this.devices.regions()

        let citys = []

        for (let city in val) {
            let cityName = city
            let children = []
            let regions = val[city]
            for (let areaName in regions) {
                let deviceList = regions[areaName]
                children.push({ areaName, deviceList })
            }
            citys.push({ cityName, children })
        }
        console.log('transCityList: citys ' + citys)
        return citys
    }

    this.transDeviceStatus = async (ids) => {
        console.log('transDeviceStatus: ');
        let dt = new Date();
        let date = dt.toISOString().slice(0, 10)

        let devices = await this.devices.status(ids, date, date);

        let legendData = [];
        let xAxisData = ['00', '01', '02', '03'
            , '04', '05', '06', '07', '08'
            , '09', '10', '11', '12', '14'
            , '15', '16', '17', '18', '19'
            , '20', '21', '22', '23'];
        let hydraulicPressures = [];
        let list = []

        for (let id in devices) {
            let device = devices[id];
            legendData.push(id);
            let hydraulicPressureData = {
                name: id,
                type: 'line',
                data: []
            };

            for (let detail of device) {
                detail.id = id
                list.push(detail)
            }

            let et = new Date()

            for (let t = 0, hydraulicPressure = 0, temperature = 0, energy = 100; t < 24 && t < et.getHours(); t++) {
                for (let detail of device) {
                    let time = new Date(detail.time);

                    if (t == time.getHours()) {
                        hydraulicPressure = detail['hydraulic_pressure'];
                        break;
                    }
                }

                hydraulicPressureData.data.push(hydraulicPressure);
            }

            hydraulicPressures.push(hydraulicPressureData);
        }

        let chart = [{
            title: { text: '压力' },
            legend: { data: legendData },
            xAxis: { data: xAxisData },
            series: hydraulicPressures
        }];

        let val = { chart, list }
        console.log('transDeviceStatus: val ' + val);
        return val;
    };

    this.transUnitList = async () => {
        let ids = await this.devices.ids()
        let val = []
        for (let timestamp = Date.now(), day = 0; ids.length && day < 10; day++, timestamp -= 24 * 3600 * 1000) {
            let dt = new Date(timestamp);
            let date = dt.toISOString().slice(0, 10)
            let devices = await this.devices.status(ids, date, date);

            for (let id in devices) {
                let device = devices[id];
                for (let detail of device) {
                    detail.id = id
                    val.push(detail)
                    break
                }

                let i = ids.indexOf(id)
                ids.splice(i, 1)
            }
        }

        console.log('transDeviceStatusHistory: val ' + JSON.stringify(val));
        return val;
    }

    this.transWarningListOfToday = async () => {
        console.log('transWarningListOfToday: ');
        let dt = new Date();
        let date = dt.toISOString().slice(0, 10);
        console.log(date)
        let warnings = await this.devices.warningList(date);
        console.log('transWarningListOfToday: return');
        return warnings;
    };

    this.transWarningListOfMonths = async (date) => {
        console.log('transWarningListOfMonths: ' + date);
        let warnings = await this.devices.warningList(date);
        console.log('transWarningListOfMonths: return');
        return warnings;
    };

    this.transDeviceStatusHistory = async (ids, dateBegin, dateEnd) => {
        console.log('transDeviceStatusHistory: ');
        let devices = await this.devices.status(ids, dateBegin, dateEnd);
        let val = []

        for (let id in devices) {
            let device = devices[id];
            for (let detail of device) {
                detail.id = id
                val.push(detail)
            }
        }

        console.log('transDeviceStatusHistory: val ' + val);
        return val;
    }

    this.notify = (obj) => { }
};

const chntek = new Chntek();
//chntek.transCityList()
//chntek.transDeviceStatus(['00006','00008'])
//chntek.transDeviceStatusHistory(['00006','00008'], '2020-12-06', '2020-12-06')
//chntek.transUnitList()
//chntek.transWarningListOfToday()
//chntek.transWarningListOfMonths('2020-12-01')
//syncingWarnings()

async function syncingWarnings() {
    let warningsLength = window.localStorage.getItem('warnings')

    console.log('notification: warningsLength ' + warningsLength)

    try {
        let ids = await chntek.devices.ids()
        let sum = ids.length, normal = 0, abnormal = 0

        let warnings = await chntek.transWarningListOfToday()
        for (let warning of warnings) {
            let i = ids.indexOf(warning.id)
            if (i != -1) continue
            ids.splice(i, 1)
            abnormal++
        }
        normal = sum - abnormal
        console.log(`notification:${sum} ${normal} ${abnormal} ${warnings.length}`)
        chntek.notify({ warnings, sum, normal, abnormal })

        if (warnings.length != warningsLength) {
            console.log('notification: schedule ')
            window.localStorage.setItem('warnings', warningsLength)
            window.cordova.plugins.notification.local.schedule({
                text: '有新的告警信息...',
                foreground: true
            })
        }
    }
    catch (e) {
        console.error(e)
    }
}

try {
    document.addEventListener('deviceready', async () => {
        console.log('deviceready')
        window.localStorage.setItem('warnings', 0)

        //启用后台运行模式
        window.cordova.plugins.backgroundMode.enable()

        setInterval(async () => syncingWarnings(), 10000)
    })
}
catch (e) {
    //    console.error(e)
}
export default chntek;