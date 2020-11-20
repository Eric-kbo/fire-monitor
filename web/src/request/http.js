import axios from 'axios';

const host = './mock';

const http = {

  getHome: () => axios.get(host + "/home/get.json"),

};
export default http;