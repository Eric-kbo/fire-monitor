const axios = require('axios');

const host = 'http://iot.chntek.com:3410';

function Chntek() {
    this.devices = {
        async ids() {
            console.log('deviceIds: ');
            const { data } = await axios.get(`${host}/api/Terminal/GetAllDevice`, {
                headers: { 'Authorization': '12' }
            });
            console.log('warningList: data.err ' + data.err);
            if (data.Err) throw data.Err;
            if (data.err) throw data.err;
            console.log(data.val);
            return data.val;
        },
        async status(ids,dateBegin,dateEnd) {
            if (ids.trim() == '') {
                let devicesIds = await this.ids();
                for (let id of devicesIds) {
                    ids += id + ',';
                }
            }

            let dt = new Date;
            let date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
            console.log(`status: ${ids} ${date}`)
            const { data } = await axios.get(`${host}/api/Terminal/HistoryData`, {
                params: ids.trim() == ''
                    ? { searchDate: date } : {
                        searchDate: date,
                        ids: ids
                    },
                headers: { 'Authorization': '12' }
            });
            console.log(`statusHistory: data.err ${data.err}`)
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
                });
            }

            return val;
        }
    };

    this.transDeviceStatus = async (ids) => {
        console.log('transDeviceStatus: ');
        let devices = await this.devices.statusHistory(ids);

        let legendData = [];
        let xAxisData = ['00', '01', '02', '03'
            , '04', '05', '06', '07', '08'
            , '09', '10', '11', '12', '14'
            , '15', '16', '17', '18', '19'
            , '20', '21', '22', '23'];
        let hydraulicPressures = [];
        let temperatures = [];
        let energies = [];
        for (let name in devices) {
            let device = devices[name];
            legendData.push(name);
            let hydraulicPressureData = {
                name: name,
                type: 'line',
                data: []
            };

            let temperatureData = {
                name: name,
                type: 'line',
                data: []
            };

            let energyData = {
                name: name,
                type: 'line',
                data: []
            };

            let et = new Date()

            for (let t = 0, hydraulicPressure = 0, temperature = 0, energy = 100; t < 24 && t < et.getHours(); t++) {
                for (let detail of device) {
                    let time = new Date(detail.time);

                    if (t == time.getHours()) {
                        hydraulicPressure = detail['hydraulic_pressure'];
                        energy = detail['energy'];
                        break;
                    }
                }

                hydraulicPressureData.data.push(hydraulicPressure);
                temperatureData.data.push(temperature);
                energyData.data.push(energy);
            }

            hydraulicPressures.push(hydraulicPressureData);
            temperatures.push(temperatureData);
            energies.push(energyData);
        }

        let val = [{
            title: { text: '压力' },
            legend: { data: legendData },
            xAxis: { data: xAxisData },
            series: hydraulicPressures
        }, {
            title: { text: '温度' },
            legend: { data: legendData },
            xAxis: { data: xAxisData },
            series: temperatures
        }, {
            title: { text: '电量' },
            legend: { data: legendData },
            xAxis: { data: xAxisData },
            series: energies
        }];
        console.log('transDeviceStatus: return');
        return val;
    };

    this.transWarningListOfToday = async () => {
        console.log('transWarningListOfToday: ');
        let dt = new Date();
        let m = dt.getMonth() + 1;
        let d = dt.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        let date = `${dt.getFullYear()}-${m}-${d}`;

        let warnings = await this.devices.warningList(date);

        let warningsDisposed = [];
        for (let warning of warnings) {
            let dt2 = new Date(warning.time);
            if (dt.toLocaleDateString() != dt2.toLocaleDateString())
                continue;
            warningsDisposed.push(warning);
        }

        console.log('transWarningListOfToday: return');
        return warningsDisposed;
    };

    this.transWarningListOfMonths = async (date) => {
        console.log('transWarningListOfMonths: ' + date);
        let warnings = await this.devices.warningList(date);

        let dt = new Date();
        let warningsDisposed = [];
        for (let warning of warnings) {
            let dt2 = new Date(warning.time);
            if (dt.toLocaleDateString() === dt2.toLocaleDateString()) {
                continue;
            }
            warningsDisposed.push(warning);
        }

        console.log('transWarningListOfMonths: return');
        return warningsDisposed;
    };
};

const chntek = new Chntek();
//export default chntek;
//chntek.transDeviceStatus('')
//chntek.transWarningListOfToday()
//chntek.transWarningListOfMonths('2020-12-01')
//chntek.transStatistics('00017,00018', '2020-11-01', '2020-12-03')

async function syncingWarnings() {
    let warningsLength = window.localStorage.getItem('warningsLength')
    console.log('notification: warningsLength ' + warningsLength)
    try {
        let warnings = await chntek.transWarningListOfToday()
        console.log('notification: warnings ' + warnings.length)

        if (warnings.length != warningsLength) {
            console.log('notification: schedule ')
            window.cordova.plugins.notification.local.schedule({
                text: '有新的告警信息...',
                foreground: true
            })
        }

        window.localStorage.setItem('warningsLength', warnings.length)
    }
    catch (e) {
        console.error(e)
    }
}

try {
    document.addEventListener('deviceready', async () => {
        console.log('deviceready')
        //启用后台运行模式
        window.cordova.plugins.backgroundMode.enable()

        await syncingWarnings()
        setInterval(async () => syncingWarnings(), 60000)
    })
}
catch (e) {
    console.error(e)
}