// 递归获取所有设备
export function getAllDeviceslist(res, child) {
    // eslint-disable-next-line no-empty
    if (res instanceof Array) {
        res.forEach(x => {
            child.push(x)
        })
    } else {
        const keys = Object.keys(res);
        keys.forEach(x => {
            getAllDeviceslist(res[x], child)
        });
    }
    return child;
}

export function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getNowFormatDate(date) {
    if (!date) {
        date = new Date();
    } else {
        date = new Date(date);
    }
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

export function formatDateBeforDay(date, day) {
    // var time = (new Date).getTime() - 24 * 60 * 60 * 1000;
    // eslint-disable-next-line no-unused-vars
    // date = '2020-01-22'
    // var yesterday = new Date(date);
    // yesterday = yesterday.getFullYear() + "-" + (yesterday.getMonth() > 9 ?
    //     (yesterday.getMonth() + 1) : "0" + (yesterday.getMonth() + 1)) + "-" + (yesterday.getDate() > 9 ?
    //     (yesterday.getDate()) : "0" + (yesterday.getDate()));
    // return yesterday;


    var dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d;


    // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function formatDateBeforMonth(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function getPosition(data) {
    if (data) {
        return data.longitude + ';' + data.latitude;
    }
    return '';
}

export function getDevicesList(str) {
    if (str) {
        switch (str) {
            case 'LowerFlange':
            case 'lowerflange':
                return '下法兰消防栓'
            case 'firehydrant':
            case 'FireHydrant':
                return '上法兰消防栓'
            case 'pressure':
                return '无线压力表'
            case 'cylinders':
                return '消防气瓶'
        }
    }
    return '';
}