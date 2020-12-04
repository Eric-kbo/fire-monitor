<template>
  <div class="map-container">
    <!-- 注意这里必须设置center和zoom，不然组件是不会渲染地图的 -->
    <baidu-map class="map" center="长沙" :zoom="zoom" @ready="handler">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-marker
        v-for="(item,index) in list"
        :key="item.id"
        :position="{lng: item.lng, lat: item.lat}"
        :dragging="false"
        @click="infoWindowOpen(index)"
      ></bm-marker>
      <bm-info-window
        v-for="(item,index) in list"
        :show="show && currentMark == index"
        :key="index"
        :width="220"
        :closeOnClick="true"
        :autoPan="true"
        :position="{lng: item.lng, lat: item.lat}"
        @close="infoWindowClose"
        class="message-box"
      >
        <p class="display-flex message">
          <span class="flex_1">设备</span>
          {{item.id}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">水压</span>
          {{item.hydraulic_pressure}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">温度</span>
          {{item.temperature}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">电量</span>
          {{item.energy}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">时间</span>
          {{item.time}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">时间</span>
          {{item.time}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">时间</span>
          {{item.time}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">时间</span>
          {{item.time}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">时间</span>
          {{item.time}}
        </p>
        <p class="display-flex message">
          <span class="flex_1">时间</span>
          {{item.time}}
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
      zoom: 10,
      show: false,
      list: [],
      currentMark: 0,
      position: {
        lng: 114.74880433,
        lat: 28.2842444,
      }
    };
  },
  mounted() {

  },
  methods: {
    // addZoom(zoom) {
    //   this.zoom = zoom;
    // },
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.getData();
    },
    async getData() {
      // let warningList = await this.$chntek.transWarningList(this.date);
      // let deviceList = warningList.map(item => item.id);
      // let deviceString = deviceList.join(',');
      // let resultObj = this.$chntek.devices.statusHistory(deviceString, date);
      // let array = Object.keys(resultObj).filter(key => {
      //   return Object[key] != [];
      // });
      // array = array.map(item => {
      //   return {
      //     id: item,
      //     lng: resultObj[item].longitude.slice(1),
      //     lat: resultObj[item].latitude.slice(1),
      //   };
      // });
      this.list = [{
        id: '00006',
        hydraulic_pressure: '0.224',
        temperature: '15.5',
        energy: 99,
        signal_intensity: 4,
        longitude: 'E113.74880433',
        lng: 114.74880433,
        latitude: 'N28.2842444',
        lat: 28.2842444,
        time: '8:39:13'
      },
      {
        id: '00008',
        hydraulic_pressure: '0.030',
        temperature: '14.1',
        energy: 99,
        signal_intensity: 10,
        longitude: 'E113.61641049',
        lng: 113.61641049,
        latitude: 'N28.15573705',
        lat: 27.15573705,
        time: '1:43:38'
      },
      {
        id: '00011',
        hydraulic_pressure: '0.030',
        temperature: '14.1',
        energy: 99,
        signal_intensity: 10,
        longitude: 'E113.61641049',
        lng: 112.61641049,
        latitude: 'N28.15573705',
        lat: 28.15573705,
        time: '1:43:38'
      }
      ];
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
</style>

