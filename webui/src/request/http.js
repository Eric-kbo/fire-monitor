// request/http.js
import axios from "axios";
let proxyUrl = "";
if (process.env.NODE_ENV === "development") {
  proxyUrl = "./mock";
}

// post的序列化模块
// const Qs = require('qs');

/*-----get数据序列化-----*/
function serialize(params) {
  if (!params || Object.prototype.toString.call(params) != "[object Object]") {
    return "";
  }
  let str = "?",
    keys = Object.keys(params);
  keys.forEach(k => {
    if (
      Object.prototype.toString.call(params[k]) === "[object Object]" ||
      Object.prototype.toString.call(params[k]) === "[object Array]"
    ) {
      str += k + "=" + JSON.stringify(params[k]) + "&";
    } else {
      str += k + "=" + params[k] + "&";
    }
  });
  return str.substr(0, str.length - 1);
}

export default {
  getCityList: params => axios.get(proxyUrl + '/cityList.json' + serialize(params)),
  getUnitList: params => axios.get(proxyUrl + '/unitList.json' + serialize(params)),
  getDeviceStatus: params => axios.get(proxyUrl + '/deviceStatus.json' + serialize(params)),
  getStatistics: params => axios.get(proxyUrl + '/statisticsInfo.json' + serialize(params)),
  getWarningListOfToday: params => axios.get(proxyUrl + '/todayList.json' + serialize(params)),
  getWarningListOfHistory: params => axios.get(proxyUrl + '/historyList.json' + serialize(params)),
  getWarningStatistics: params => axios.get(proxyUrl + '/warnStatistics.json' + serialize(params)),
};
