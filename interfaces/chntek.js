const axios = require('axios')

const host = 'http://iot.chntek.com:3410'

const chntek = new function () {
    this.devices = {
        async statusHistory(ids, date) {
            const { data } = await axios.get(`${host}/api/Terminal/HistoryData`, {
                params: {
                    searchDate: date,
                    ids: ids
                },
                headers: { 'Authorization': '12' }
            })
            if (data.err) throw data.err
            let val = {}
            for (id in data.val) {
                let objs = data.val[id]
                val[id] = []
                for (obj of objs) {
                    let dt = new Date(obj.monitorsTime)

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
                    })
                }
            }

            return val
        },
        async warningList(date) {
            const { data } = await axios.get(`${host}/api/Terminal/RealTimeData`, {
                params: {
                    searchDate: date
                },
                headers: { 'Authorization': '12' }
            })
            if (data.err) throw data.err

            let val = []

            for (obj of data.val) {
                val.push({
                    "id": obj.terminalNum,		//设备编号
                    "location": obj.prefecturecity + obj.distriancounty + obj.customerunit, //地点
                    "warning_type": obj.warnName,	//警告类型
                    "date_time": obj.monitorsTime,			//时间
                })
            }
            console.log(val)
            return val
        },
        async warningStatistics(devices, dateStart, dateEnd) {
            const { data } = await axios.get(`${host}/api/Terminal/WarningList`, {
                params: {
                    date_begin: dateStart,
                    date_end: dateEnd,
                    ids: devices
                },
                headers: { 'Authorization': '12' }
            })
            if (data.err) throw data.err
            console.log(data.val)
            return data.val
        }
    }

    this.transDeviceStatus = async (ids, date) => {
        let devices = await this.devices.statusHistory(ids, date)

        let legendData = []
        let xAxisData = ['00:00', '01:00', '02:00', '03:00'
            , '04:00', '05:00', '06:00', '07:00', '08:00'
            , '09:00', '10:00', '11:00', '12:00', '14:00'
            , '15:00', '16:00', '17:00', '18:00', '19:00'
            , '20:00', '21:00', '22:00', '23:00']
        let hydraulicPressures = []
        let temperatures = []
        let energies = []
        for (name in devices) {
            let device = devices[name]
            legendData.push(name)
            let hydraulicPressureData = {
                name: name,
                data: []
            }

            let temperatureData = {
                name: name,
                data: []
            }

            let energyData = {
                name: name,
                data: []
            }

            for (t = 0, hydraulicPressure = 0, temperature = 0, energy = 100; t < 24; t++) {
                for (detail of device) {
                    let time = new Date(`2000-01-01 ${detail.time}`)
                    let hours = time.getHours()

                    if (t == hours) {
                        hydraulicPressure = detail['hydraulic_pressure']
                        energy = detail['energy']
                        break
                    }
                }

                hydraulicPressureData.data.push(hydraulicPressure)
                temperatureData.data.push(temperature)
                energyData.data.push(energy)
            }

            hydraulicPressures.push(hydraulicPressureData)
            temperatures.push(temperatureData);
            energies.push(energyData)
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
        }]
        console.log(val)
        return val
    }

    this.transWarningList = async (date) => {
        let warnings = await this.devices.warningList(date)
        return warnings
    }

    this.transStatistics = async (ids, dateStart, dateEnd) => {
        let devices = await this.devices.warningStatistics(ids, dateStart, dateEnd)

        let legendData = []
        let xAxisData = []
        let warningStatistics = []
        for (name in devices) {
            let device = devices[name]
            for (date in device) {
                if (-1 == xAxisData.indexOf(date))
                    xAxisData.push(date)
            }
        }

        xAxisData.sort((a, b) => Date.parse(a) - Date.parse(b))
  
        for (name in devices) {
            let device = devices[name]
            legendData.push(name)
            let countData = {
                name: name,
                data: []
            }

            for (t of xAxisData) {
                let count = device[t]
                countData.data.push(count ? count : 0)
            }

            warningStatistics.push(countData)
        }

        let val = [{
            title: { text: '统计信息' },
            legend: { data: legendData },
            xAxis: { data: xAxisData },
            series: warningStatistics
        }]

        return val
    }
}

//export default chntek
chntek.transDeviceStatus('00017,00018', '2020-12-03')
chntek.transWarningList('2020-12-03')
chntek.transStatistics('00017,00018', '2020-11-01', '2020-12-03')