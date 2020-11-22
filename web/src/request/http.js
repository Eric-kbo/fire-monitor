import axios from 'axios';

function serialize(params) {
  if (!params || Object.prototype.toString.call(params) != "[object Object]") {
    return "";
  }
  let str = "?",
    keys = Object.keys(params);
  keys.forEach(k => {
    if (Object.prototype.toString.call(params[k]) === "[object Object]" || Object.prototype.toString.call(params[k]) ===
      "[object Array]") {
      str += k + "=" + JSON.stringify(params[k]) + "&";
    } else {
      str += k + "=" + params[k] + "&";
    }

  });
  return str.substr(0, str.length - 1);
}

const host = './mock';

const http = {
  getHistory: (params) => axios.get(host + "/devices/status-history.json" + serialize(params)),
  getRealtime: (params) => axios.get(host + "/devices/status-realtime.json" + serialize(params)),
  getWarningList: (params) => axios.get(host + "/devices/warning-list.json" + serialize(params)),
  getWarningStatistics: (params) => axios.get(host + "/devices/warning-statistics.json" + serialize(params)),
};
export default http;