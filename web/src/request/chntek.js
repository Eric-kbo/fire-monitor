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
                    "type": obj.TerminalType,
                    "longitude": obj.Longitude,		        //设备经度
                    "latitude": obj.Latitude,		        //设备纬度
                    "location": obj.Customerunit,    //位置
                    "time": obj.MonitorsTime		//检测时间
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
            if(obj.WarnName == '') continue
            obj.WarnName = obj.WarnName.replace(/、水质报警/,'')
            obj.WarnName = obj.WarnName.replace(/水质报警/,'')
            
            let id = obj.ProductTerId;
            let info = {
                id: id,		//设备编号
                location: obj.Prefecturecity + obj.Distriancounty + obj.Customerunit, //地点
                warning_type: obj.WarnName,	//警告类型
                time: obj.MonitorsTime,			//时间
                longitude: obj.Longitude,
                latitude: obj.Latitude
            };

            if (!val[id]) val[id] = { id: obj.ProductTerId, location: info.location, time: info.time, children: [] };
            val[id].children.push(info);
        }

        let val2 = [];
        for (let id in val) {
            if (this.ids.indexOf(id) == -1) continue
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

        let status = {};
        for (let id of ids) {
            if (this.devices[id] == undefined) continue;

            const { data } = await axios.get(`${proxyHost}/devices/status-recent`, {
                params: { id: this.devices[id].id }
            });

            status[this.devices[id].id] = data.val
        }

        let legendData = [];
        let xAxisData = ['1', '2', '3'
            , '4', '5', '6', '7', '8'
            , '9', '10', '11', '12', '14'
            , '15', '16', '17', '18', '19'
            , '20'];
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
                hydraulicPressureData.data.push(detail['hydraulic_pressure']);
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
            if (this.devices[id] == undefined || this.devices[id].latitude == null || this.devices[id].longitude == null) continue;
            const { data } = await axios.get(`${proxyHost}/devices/status-recent`, {params: { id }});
            
            for(let k in data.val[0]) {
                this.devices[id][k] = data.val[0][k]
            }

            val.push(this.devices[id]);
        }
        console.log(val);
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
            if (this.devices[id] == undefined) continue;
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
                if (w == undefined) continue;
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
        let res = await axios.get(`${host}/api/user/login`, { params: { account, password } });

        if (res.data.err) throw res.data.err;
        console.log('token:', res.data.val.token);
        this.token = res.data.val.token;
        this.account = account
        
        this.ids = await this.getIds();
        let strIds = '';
        for (let id of this.ids) strIds += id + ',';
        res = await axios.get(`${proxyHost}/devices/primary`, { params: { ids:strIds } });
        if (res.data.err) throw res.data.err;

        for (let detail of res.data.val) {
            this.devices[detail.id] = detail;
            this.devices[detail.location + detail.id] = detail;
        }

        window.cordova.plugins.backgroundMode.enable();
        await this.syncingWarnings();
        this.timer = setInterval(async () => this.syncingWarnings(), 20000);
    };

    this.logout = async () => {
        clearInterval(timer);
        window.cordova.plugins.backgroundMode.disable();
    };
};

document.addEventListener('deviceready', async () => {
    let version = window.cordova.plugins.version.getAppVersion();
    const { data } = await axios.get(`${proxyHost}/app/latest`);
    
    if(data.err)
        return

    if(-1 != data.val.indexOf(version))
        return

    var uri = encodeURI(data.val)
    var fileURL = 'cdvfile://localhost/temporary/tuner.apk'
    var fileTransfer = new window.FileTransfer()
    fileTransfer.download(
        uri, fileURL, function (entry) {
            alert('确认并安装新版本更新！')
            cordova.plugins.fileOpener2.open('cdvfile://localhost/temporary/tuner.apk','application/vnd.android.package-archive')
        },
        function (error) {
            console.error('download error: ' + error.source + error.target + error.code)
        })
})

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