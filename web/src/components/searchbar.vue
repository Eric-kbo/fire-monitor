<template>
  <div class="search-bar">
    <div class="display-flex">
      <md-field class="city-area flex_1">
        <label for="city">城市</label>
        <md-select v-model="params.cityName" name="city" id="city" :required="true" @md-selected="selectedCity($event)">
          <md-option :value="item.cityName" v-for="(item,index) in city_list" :key="index">{{item.cityName}}</md-option>
        </md-select>
      </md-field>
      <md-field class="city-area flex_1">
        <label for="area">区域</label>
        <md-select v-model="params.areaName" name="area" id="area" :required="true" @md-selected="selectedArea($event)">
          <md-option :value="item.areaName" v-for="(item,index) in area_list" :key="index">{{item.areaName}}</md-option>
        </md-select>
      </md-field>
    </div>
    <div class="display-flex">
      <md-field class="device_list">
        <label for="area">设备</label>
        <md-select v-model="params.devices" name="citys" id="citys" :required="true" multiple>
          <md-option :value="item" v-for="(item,index) in device_list" :key="index">{{item}}</md-option>
        </md-select>
      </md-field>
      <div class="button-container">
        <md-button @click="search">{{options.btnText}}</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchbar',
  props: {
    options: {
      type: [Object],
      default: () => {
        return {
          btnText: ''
        };
      }
    },
    model: {
      type: [String, Object],
    }
  },
  data() {
    return {
      city_list: [{}],
      cityNameCache: '',
      areaNameCache: '',
      cityCache: {},
      areaCache: {},
      area_list: [],
      device_list: [],
      params: {
        cityName: '',
        areaName: '',
        devices: []
      },
    };
  },
  watch: {
    model(newV) {
      // 不为空时赋值
      if (newV) {
        this.params = newV;
      }
    }
  },
  created() {
    
    this.getCityList();
  },
  methods: {
    getCityList() {
      // this.$http.getCityList().then(res => {
      this.$chntek.transCityList().then(res => {
        this.city_list = res;
        console.log(this.city_list);
        // 默认选择第一个城市和全地区
        this.cityCache = this.city_list[0];
        this.area_list = this.cityCache.children;
        this.areaCache = this.cityCache.children[0];
        this.cityNameCache = this.params.cityName = this.cityCache.cityName;
        this.areaNameCache = this.params.areaName = this.city_list[0].children[0].areaName;
        if(this.model) this.params = this.model
      });
      
    },
    selectedCity(val) {
      if (val != this.cityNameCache) {
        // 更新缓存
        this.cityNameCache = val;
        // 清空搜索参数中的设备编号
        this.params.devices = [];
        // 切换城市更新地区列表
        this.city_list.forEach(city => {
          if (city.cityName == val) {
            // 缓存城市对象
            this.cityCache = city;
            this.area_list = city.children;
            // 默认选中第一个地区
            this.areaCache = this.area_list[0];
            this.params.areaName = this.areaCache.areaName;
            console.log(this.params.cityName);
          }
        });
        this.getDeviceList();
      }
    },
    selectedArea(val) {
      if (val != this.areaNameCache) {
        this.areaNameCache = val;
        this.params.devices = [];
      }
      this.area_list.forEach(item => {
        if (item.areaName == this.areaNameCache) {
          this.areaCache = item;
          this.device_list = item.deviceList;
          return;
        }
      });
    },
    search() {
      let params = this.params;
      this.$emit('change', params);
    }
  },
}
</script>

<style lang="scss" scoped>
.city-area {
  width: 50%;
}
.search-bar {
  width: 100%;
  margin-top: 10px;
  padding: 5px 5px 5px 10px;
  z-index: 1;
  .device_list {
    width: 100%;
    flex: 1;
  }
  .md-field {
    margin: 0;
    &.md-has-value {
      margin: 0;
    }
  }

  .button-container {
    display: flex;
    align-items: center;
    .md-ripple {
      padding: 0;
      z-index: 1;
    }
    .md-button {
      padding: 0;
      height: 32px;
      border: 1px solid #666;
    }
  }
}
</style>