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