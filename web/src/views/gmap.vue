<template>
  <div class="map-container">
    <!-- 注意这里必须设置center和zoom，不然组件是不会渲染地图的 -->
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="onReady">
      <!-- 自定义组件 -->
      <!-- <bm-control anchor="BMAP_ANCHOR_BOTTOM_LEFT">
        <md-field class="select-address" :validity="''">
          <label for="address">选择一个地点</label>
          <md-select v-model="current" name="address" id="address" key="adress">
            <md-option :value="index" v-for="(item,index) in list" :key="index">{{item.id}}</md-option>
          </md-select>
        </md-field>
      </bm-control>-->
      <!-- 缩放组件 -->
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      <!-- 标记组件 -->
      <bm-marker
        v-for="(item,index) in list"
        :key="item.id"
        :position="{lng: item.lng, lat: item.lat}"
        :dragging="false"
        :offset="{width: 0 , height: 0}"
        @click="infoWindowOpen(index)"
      ></bm-marker>
      <!-- 信息窗体 -->
      <bm-info-window
        v-for="(item,index) in list"
        :show="show && currentMark == index"
        :key="index"
        :width="220"
        :closeOnClick="true"
        :autoPan="true"
        :offset="{width: -6 , height: -15}"
        :position="{lng: item.lng, lat: item.lat}"
        @close="infoWindowClose"
        class="message-box"
      >
        <p class="display-flex message">
          <span class="flex_1">设备编号:</span>
          {{item.id}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">当前水压:</span>
          {{item.hydraulic_pressure}}Mpa
        </p>
        <p class="display-flex message">
          <span class="flex_1">当前温度:</span>
          {{item.temperature}}°C
        </p>
        <p class="display-flex message">
          <span class="flex_1">当前电量:</span>
          {{item.energy}}%
        </p>
        <p class="display-flex message">
          <span class="flex_1">信号强度:</span>
          {{item.signal_intensity}}db
        </p>
        <p class="display-flex message">
          <span class="flex_1">监测日期:</span>
          {{date}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">监测时间:</span>
          {{item.time}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">坐标经度:</span>
          {{item.longitude}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">坐标纬度</span>
          {{item.latitude}}
        </p>
      </bm-info-window>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      zoom: 8,
      show: false,
      list: [],
      current: 0,
      currentMark: 0,
      center: '长沙'
    };
  },
  watch: {
    current(newV) {
      this.$nextTick(() => {
        this.center = {
          lng: this.list[newV].lng,
          lat: this.list[newV].lat
        };
        setTimeout(() => {
          console.log(this.list[newV]);
          this.infoWindowOpen(newV);
        }, 0);
      });

    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.infoWindowOpen(0);
    // }, 0);
  },
  methods: {
    onReady({ BMap, map }) {
      this.getData();
    },
    async getData() {
      this.date = '2020-12-04';//上线时删除
      let resultObj = await this.$chntek.devices.statusHistory('', this.date);
      // 过滤空数组和没有经纬度的点
      let array = Object.keys(resultObj).filter(key => {
        return resultObj[key] != [] && resultObj[key][0].longitude && resultObj[key][0].longitude;
      });
      // 从数组的第一个元素中映射需要展示的数据
      this.list = array.map(item => {
        return {
          id: item,
          hydraulic_pressure: resultObj[item][0].hydraulic_pressure,
          temperature: resultObj[item][0].temperature,
          energy: resultObj[item][0].energy,
          signal_intensity: resultObj[item][0].signal_intensity,
          time: resultObj[item][0].time,
          longitude: resultObj[item][0].longitude,
          latitude: resultObj[item][0].latitude,
          lng: resultObj[item][0].longitude.slice(1),
          lat: resultObj[item][0].latitude.slice(1),
        };
      });
      this.center = this.list[0];
    },
    infoWindowOpen(index) {
      this.currentMark = index;
      this.show = true;
    },
    infoWindowClose() {
      this.show = false;
    }
  },
}
</script>

<style lang="scss" scoped>
/* 地图容器必须设置宽和高属性 */
.map {
  position: fixed;
  top: 60px;
  /* left:0 有用，不要删 */
  left: 0px;
  padding: 0;
  width: 100%;
  height: calc(100vh - 116px);
}
.map-container {
  position: fixed;
  left: -6px;
  top: -1px;
  width: 100%;
  height: calc(100vh - 120px);
}
.select-address {
  margin-left: 5px;
  padding-left: 5px;
  width: 150px;
  box-shadow: 2px 2px 2px 1px rgba(255, 255, 255, 0.5);
  label {
    padding-left: 5px;
  }
}
.md-field,
.address {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>

