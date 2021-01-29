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