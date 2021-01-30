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

export function formatDateBeforDay(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}`;
}

export function formatDateBeforWeek(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 7}`;
}

export function formatDateBeforMonth(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}