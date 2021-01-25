const axios = require('axios');

// const host = 'http://iot.chntek.com:3410';
const proxyHost = 'http://dungbeetles.xyz:3410';

function Chntek() {
    this.timer = null;
    this.account = '';
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCIsImV4cCI6MTYxMTUwMDM3NCwiaXNzIjoiSnd0S2V5TmFtZSIsImF1ZCI6Ikp3dEtleU5hbWUifQ.8nnKmig8Ar5uAC5WDZLxJZEl9mEpPsqbN4YrBt-H_UQ';
    this.warningsLength = 0;
    this.devices = {};
    this.ids = 0;

    this.regions = async (val) => {
        const {data} = await axios.get(`${proxyHost}/devices/regions`, {
            // params: {account: this.account},
            params: {account: val},
            headers: {'Authorization': this.token}
        });
        if (data.val) return data.val;
    };
    this.statusRecent = async (val) => {
        const {data} = await axios.get(`${proxyHost}/devices/status-recent`, {
            // params: {account: this.account},
            params: {id: val},
            headers: {'Authorization': this.token}
        });
        if (data.val) return data.val;
    };
    this.statusPrimary = async (val) => {
        const {data} = await axios.get(`${proxyHost}/devices/primary`, {
            // params: {account: this.account},
            params: {ids: val},
            headers: {'Authorization': this.token}
        });
        if (data.val) return data.val;
    };
}

const chntek = new Chntek();

// test();
export default chntek;