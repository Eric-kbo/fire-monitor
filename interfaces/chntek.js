const axios = require('axios');

const host = 'http://iot.chntek.com:3410';

let timer = null;
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCIsImV4cCI6MTYxMTUwMDM3NCwiaXNzIjoiSnd0S2V5TmFtZSIsImF1ZCI6Ikp3dEtleU5hbWUifQ.8nnKmig8Ar5uAC5WDZLxJZEl9mEpPsqbN4YrBt-H_UQ';
let warningsLength = 0;
let devices = {};

function Chntek() {
    this.api = {
        async regions() {
            while (true) {
                const { data } = await axios.get(`${host}/api/Terminal/Regions`, {
                    headers: { 'Authorization': token }
                });
                if (data.val) return data.val;
            }
            return null;
        },
        async ids() {
            console.log('deviceIds: ');
            const { data } = await axios.get(`${host}/api/Terminal/GetAllDevice`, {
                headers: { 'Authorization': token }
            });
            console.log('warningList: data.err ' + data.err);
            if (data.err) throw data.err;
            console.log(data.val);
            return data.val;
        },
        async status(ids, dateBegin, dateEnd) {
            let strIds = '';
            for (let id of ids) strIds += id + ',';

            console.log(`status: ${strIds} ${dateBegin} ${dateEnd}`);
            const { data } = await axios.get(`${host}/api/Terminal/HistoryData`, {
                params: {
                    date_begin: dateBegin,
                    date_end: dateEnd,
                    ids: strIds
                },
                headers: { 'Authorization': token }
            });
            console.log(`status: data.err ${data.err}`);
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
                        "location": obj.customerunit,    //位置
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
                headers: { 'Authorization': token }
            });
            console.log('warningList: data.err ' + data.err);
            if (data.Err) throw data.Err;
            if (data.err) throw data.err;

            let val = {};

            for (let obj of data.val) {
                let id = obj.terminalNum;
                let info = {
                    id: id,		//设备编号
                    location: obj.prefecturecity + obj.distriancounty + obj.customerunit, //地点
                    warning_type: obj.warnName,	//警告类型
                    time: obj.monitorsTime,			//时间
                    longitude: obj.longitude,
                    latitude: obj.latitude
                };

                if (!val[id]) val[id] = { id: obj.terminalNum, location: info.location, time: info.time, children: [] };
                val[id].children.push(info);
            }

            let val2 = [];
            for (let id in val) {
                val2.push(val[id]);
            }

            return val2;
        }
    };

    this.transCityList = async () => {
        let val = await this.api.regions();
        let citys = [];
        for (let city in val) {
            let cityName = city;
            let children = [];
            let regions = val[city];
            for (let areaName in regions) {
                let deviceList = [];
                for (let id of regions[areaName]) {
                    if (devices[id]) deviceList.push(devices[id].location + id);
                }
                children.push({ areaName, deviceList });
            }
            citys.push({ cityName, children });
        }
        console.log('transCityList: citys ', JSON.stringify(citys));
        return citys;
    };

    this.transDeviceStatus = async (ids) => {
        console.log('transDeviceStatus: ');
        let dt = new Date();
        let date = dt.toISOString().slice(0, 10);

        let idsNew = [];
        for (let id of ids) {
            idsNew.push(devices[id].id);
        }

        let status = await this.api.status(idsNew, date, date);

        let legendData = [];
        let xAxisData = ['00', '01', '02', '03'
            , '04', '05', '06', '07', '08'
            , '09', '10', '11', '12', '14'
            , '15', '16', '17', '18', '19'
            , '20', '21', '22', '23'];
        let hydraulicPressures = [];
        let list = [];

        for (let id in status) {
            let device = status[id];
            legendData.push(id);
            let hydraulicPressureData = {
                name: id,
                type: 'line',
                data: []
            };

            for (let detail of device) {
                detail.id = id;
                list.push(detail);
            }

            let et = new Date();

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

        let val = { chart, list };
        console.log('transDeviceStatus: val ', val);
        return val;
    };

    this.transUnitList = async () => {
        let keys = {};
        let val = [];
        for (let id in devices) {
            val.push(devices[id]);
        }
        console.log(val);
        return val;
    };

    this.transWarningListOfToday = async () => {
        console.log('transWarningListOfToday: ');
        let dt = new Date();
        let date = dt.toISOString().slice(0, 10);
        let warnings = await this.api.warningList(date);
        console.log('transWarningListOfToday: ', warnings);
        return warnings;
    };

    this.transWarningListOfMonths = async (date) => {
        let warnings = await this.api.warningList(date);
        console.log('transWarningListOfMonths: return');
        return warnings;
    };

    this.transDeviceStatusHistory = async (ids, dateBegin, dateEnd) => {
        console.log('transDeviceStatusHistory: ');

        let idsNew = [];
        for (let id of ids) {
            idsNew.push(devices[id].id);
        }

        let status = await this.api.status(idsNew, dateBegin, dateEnd);

        let val = [];

        for (let id in status) {
            let device = status[id];
            for (let detail of device) {
                detail.id = id;
                val.push(detail);
            }
        }

        console.log('transDeviceStatusHistory: val ');
        return val;
    };

    this.notify = (obj) => { };

    this.syncingWarnings = async () => {
        console.log('notification: warningsLength ' + warningsLength);

        try {
            let ids = await chntek.api.ids();
            let sum = ids.length, normal = 0, abnormal = 0;

            let warnings = await chntek.transWarningListOfToday();
            for (let warning of warnings) {
                let i = ids.indexOf(warning.id);
                if (i != -1) continue;
                ids.splice(i, 1);
                abnormal++;
            }
            normal = sum - abnormal;
            console.log(`notification:${sum} ${normal} ${abnormal} ${warnings.length}`);
            chntek.notify({ warnings, sum, normal, abnormal });

            if (warnings.length != warningsLength) {
                console.log('notification: schedule ');
                warningsLength = warnings.length;
                window.cordova.plugins.notification.local.schedule({
                    text: '有新的告警信息...',
                    foreground: true
                })
            }
        }
        catch (e) {
            console.error(e);
        }
    };

    this.login = async (account, password) => {
        const { data } = await axios.get(`${host}/api/user/login`, {
            params: { account, password }
        });

        if (data.err) throw data.err;
        console.log('token:', data.val.token);
        token = data.val.token;

        let ids = await chntek.api.ids();

        for (let timestamp = Date.now(), day = 0; ids.length && day < 10; day++, timestamp -= 7 * 24 * 3600 * 1000) {
            let dt = new Date(timestamp);
            let date = dt.toISOString().slice(0, 10);
            let status = await chntek.api.status(ids, date, date);

            for (let id in status) {
                let device = status[id];
                for (let detail of device) {
                    detail.id = id;
                    devices[id] = detail;
                    devices[detail.location + id] = detail;
                    break;
                }

                let i = ids.indexOf(id);
                ids.splice(i, 1);
            }
        }

        try {
            document.addEventListener('deviceready', async () => {
                timer = setInterval(async () => this.syncingWarnings(), 20000);
                window.cordova.plugins.backgroundMode.enable()
            });
        }
        catch (e) {
            console.error(e)
        }
    };

    this.logout = async () => {
        clearInterval(timer);
        window.cordova.plugins.backgroundMode.disable();
    };
};

const chntek = new Chntek();


async function test() {
    await chntek.login('test', '123');
    //await chntek.transCityList()
    //await chntek.transDeviceStatus(['湖南金鼎消防公司00004','00008'])
    //await chntek.transDeviceStatusHistory(['00006','00008'], '2020-12-06', '2020-12-06')
    //await chntek.transUnitList()
    //await chntek.transWarningListOfToday()
    //await chntek.transWarningListOfMonths('2020-12-01')
    //await chntek.syncingWarnings();
}

// test();
export default chntek;