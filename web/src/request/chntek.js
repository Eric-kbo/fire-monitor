const axios = require('axios');

const host = 'http://iot.chntek.com:3410';

function Chntek() {
    this.devices = {
        async statusHistory(ids, date) {
            const { data } = await axios.get(`${host}/api/Terminal/HistoryData`, {
                params: ids.trim() == ''
                    ? {
                        searchDate: date
                    } : {
                        searchDate: date,
                        ids: ids
                    },
                headers: { 'Authorization': '12' }
            });
            if (data.err) throw data.err;
            let val = {};
            if (!data.val) throw new Error('数据为空');
            for (let id in data.val) {
                let objs = data.val[id];
                val[id] = [];
                for (let obj of objs) {
                    let dt = new Date(obj.monitorsTime);

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
                        "time": `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`		//检测时间
                    });
                }
            }
            // console.log(val);
            return val;
        },
        async warningList(date) {
            const { data } = await axios.get(`${host}/api/Terminal/RealTimeData`, {
                params: {
                    searchDate: date
                },
                headers: { 'Authorization': '12' }
            });
            if (data.err) throw data.err;

            let val = [];

            for (let obj of data.val) {
                val.push({
                    "id": obj.terminalNum,		//设备编号
                    "location": obj.prefecturecity + obj.distriancounty + obj.customerunit, //地点
                    "warning_type": obj.warnName,	//警告类型
                    "date_time": obj.monitorsTime,			//时间
                });
            }
            return val;
        },
        async warningStatistics(devices, dateStart, dateEnd) {
            const { data } = await axios.get(`${host}/api/Terminal/WarningList`, {
                params: {
                    date_begin: dateStart,
                    date_end: dateEnd,
                    ids: devices
                },
                headers: { 'Authorization': '12' }
            });
            if (data.err) throw data.err; ``;
            return data.val;
        }
    };

    this.transDeviceStatus = async (ids, date) => {
        let devices = await this.devices.statusHistory(ids, date);

        let legendData = [];
        let xAxisData = ['00', '01', '02', '03'
            , '04', '05', '06', '07', '08'
            , '09', '10', '11', '12', '14'
            , '15', '16', '17', '18', '19'
            , '20', '21', '22', '23'];
        let hydraulicPressures = [];
        let energies = [];
        let temperatures = [];
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

            for (let t = 0, hydraulicPressure = '0.000', temperature = '0.000', energy = 100; t < 24; t++) {
                for (let detail of device) {
                    let time = new Date(`2000-01-01 ${detail.time}`);
                    let hours = time.getHours();

                    if (t == hours) {
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
        // console.log(JSON.stringify(val));
        return val;
    };
    this.transWarningList = async (date) => {
        let warnings = await this.devices.warningList(date);
        // console.log(warnings);
        return warnings;
    };

    this.transStatistics = async (ids, dateStart, dateEnd) => {
        let devices = await this.devices.warningStatistics(ids, dateStart, dateEnd);
        let legendData = [];
        let xAxisData = [];
        let warningStatistics = [];
        for (let name in devices) {
            let device = devices[name];
            for (let date in device) {
                if (-1 == xAxisData.indexOf(date))
                    xAxisData.push(date);
            }
        }

        xAxisData.sort((a, b) => Date.parse(a) - Date.parse(b));

        for (let name in devices) {
            let device = devices[name];
            legendData.push(name);
            let countData = {
                name: name,
                type: 'line',
                data: []
            };

            for (let t of xAxisData) {
                let count = device[t];
                countData.data.push(count ? count : 0);
            }
            warningStatistics.push(countData);
        }

        let val = [{
            title: { text: '统计' },
            legend: { data: legendData },
            xAxis: { data: xAxisData },
            series: warningStatistics
        }];
        // console.log(JSON.stringify(val));
        return val;
    };
};

const chntek = new Chntek();



// chntek.transDeviceStatus('', '2020-12-03');
// chntek.transDeviceStatus('00017,00018', '2020-12-03');

// Warn
// chntek.transWarningList('2020-12-06');

// chntek.devices.statusHistory('', '2020-12-03');
// chntek.transStatistics('00017,00018', '2020-11-06', '2020-12-06');
// chntek.transStatistics('', '2020-11-06', '2020-12-06');

export default chntek;