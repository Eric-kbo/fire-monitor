const axios = require('axios');

const host = 'http://iot.chntek.com:3410';
const proxyHost = 'http://dungbeetles.xyz:3410';

function Chntek() {
    this.timer = null;
    this.account = '';
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCIsImV4cCI6MTYxMTUwMDM3NCwiaXNzIjoiSnd0S2V5TmFtZSIsImF1ZCI6Ikp3dEtleU5hbWUifQ.8nnKmig8Ar5uAC5WDZLxJZEl9mEpPsqbN4YrBt-H_UQ';
    this.warningsLength = 0;
    this.devices = {};
    this.ids = 0;

    this.regions = async () => {
        while (true) {
            const { data } = await axios.get(`${proxyHost}/devices/regions`, {
                params: { account: this.account },
                headers: { 'Authorization': this.token }
            });
            if (data.val) return data.val;
        }
        return null;
    };

    this.getIds = async () => {
        const { data } = await axios.get(`${proxyHost}/devices/ids`, {
            params: { account: this.account },
            headers: { 'Authorization': this.token }
        });
        console.log('warningList: data.err ' + data.err);
        if (data.err) throw data.err;
        console.log(data.val);
        return data.val;
    };

    this.status = async (ids, dateBegin, dateEnd) => {
        let strIds = '';
        for (let id of ids) strIds += id + ',';

        console.log(`status: ${strIds} ${dateBegin} ${dateEnd}`);
        const { data } = await axios.get(`${host}/api/Terminal/HistoryData`, {
            params: {
                date_begin: dateBegin,
                date_end: dateEnd,
                ids: strIds
            },
            headers: { 'Authorization': this.token }
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
    };

    this.warningList = async (date) => {
        console.log('warningList: ' + date);
        const { data } = await axios.get(`${host}/api/Terminal/RealTimeData`, {
            params: {
                searchDate: date
            },
            headers: { 'Authorization': this.token }
        });
        console.log('warningList: data.err ' + data.err);
        if (data.Err) throw data.Err;
        if (data.err) throw data.err;

        let val = {};

        for (let obj of data.val) {
            let id = obj.productTerID;
            let info = {
                id: id,		//设备编号
                location: obj.prefecturecity + obj.distriancounty + obj.customerunit, //地点
                warning_type: obj.warnName,	//警告类型
                time: obj.monitorsTime,			//时间
                longitude: obj.longitude,
                latitude: obj.latitude
            };

            if (!val[id]) val[id] = { id: obj.productTerID, location: info.location, time: info.time, children: [] };
            val[id].children.push(info);
        }

        let val2 = [];
        for (let id in val) {
            if(this.ids.indexOf(id) == -1) continue
            val2.push(val[id]);
        }

        return val2;
    };

    this.transCityList = async () => {
        let val = await this.regions();
        let citys = [];
        for (let city in val) {
            let cityName = city;
            let children = [];
            let regions = val[city];
            for (let areaName in regions) {
                let deviceList = [];
                for (let id of regions[areaName]) {
                    if (this.devices[id]) deviceList.push(this.devices[id].location + id);
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
            if(this.devices[id] == undefined) continue;
            idsNew.push(this.devices[id].id);
        }

        let status = await this.status(idsNew, date, date);

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
        for (let id of this.ids) {
            if(this.devices[id] == undefined || this.devices[id].latitude == null || this.devices[id].longitude == null) continue;
            val.push(this.devices[id]);
        }
        return val;
    };

    this.transWarningListOfToday = async () => {
        console.log('transWarningListOfToday: ');
        let dt = new Date();
        let date = dt.toISOString().slice(0, 10);
        let warnings = await this.warningList(date);
        console.log('transWarningListOfToday: ', warnings);
        return warnings;
    };

    this.transWarningListOfMonths = async (date) => {
        let warnings = await this.warningList(date);
        console.log('transWarningListOfMonths: return');
        return warnings;
    };

    this.transDeviceStatusHistory = async (ids, dateBegin, dateEnd) => {
        console.log('transDeviceStatusHistory: ');

        let idsNew = [];
        for (let id of ids) {
            if(this.devices[id] == undefined) continue;
            idsNew.push(this.devices[id].id);
        }

        let status = await this.status(idsNew, dateBegin, dateEnd);

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
        console.log('notification: warningsLength ' + this.warningsLength);

        try {
            let warnings = await chntek.transWarningListOfToday();
           
            if (warnings.length != this.warningsLength) {
                window.cordova.plugins.notification.local.schedule({
                    text: '有新的告警信息...',
                    foreground: true
                })    
            }

            this.warningsLength = warnings.length;
            
            let ids = this.ids.slice(0)
            let sum = ids.length, normal = 0, abnormal = 0;

            for (let w of warnings) {
                if(w == undefined) continue;
                let i = ids.indexOf(w.id);
                if (i == -1) continue;
                ids.splice(i, 1);
                abnormal++;
            }

            normal = sum - abnormal;
            console.log(`notification:${sum} ${normal} ${abnormal} ${warnings.length}`);
            this.notify({ warnings, sum, normal, abnormal });
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
        this.token = data.val.token;
        this.account = account

        this.ids = await this.getIds();
        let ids = this.ids.slice(0)

        for (let timestamp = Date.now(), day = 0; ids.length && day < 60; day++, timestamp -= 1 * 24 * 3600 * 1000) {
            let dt = new Date(timestamp);
            let date = dt.toISOString().slice(0, 10);
            let status = await this.status(ids, date, date);

            for (let id in status) {
                let device = status[id];

                for (let detail of device) {
                    let t = this.devices[id] == undefined ? 0 : new Date(this.devices[id].time).getTime()
                    let t1 = new Date(detail.time).getTime()
                    if(t > t1) continue
                    detail.id = id;
                    this.devices[id] = detail;
                    this.devices[detail.location + id] = detail;
                }

                let i = ids.indexOf(id);
                ids.splice(i, 1);
            }
        }


        try {
            document.addEventListener('deviceready', async () => {
                await this.syncingWarnings();
                this.timer = setInterval(async () => this.syncingWarnings(), 20000);
                window.cordova.plugins.backgroundMode.enable();
            });
        }
        catch (e) { }
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