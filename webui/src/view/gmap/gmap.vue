<template>
  <div class="map-container">
    <!-- 注意这里必须设置center和zoom，不然组件是不会渲染地图的 -->
    <!--    <baidu-map class="map" :center="center" :zoom="zoom" @ready="onReady">-->
    <!--      &lt;!&ndash; 自定义组件 &ndash;&gt;-->
    <!--      &lt;!&ndash; 缩放组件 &ndash;&gt;-->
    <!--      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>-->
    <!--      &lt;!&ndash; 标记组件 &ndash;&gt;-->
    <!--      <bm-marker-->
    <!--          v-for="(item,index) in list"-->
    <!--          :key="index+'-'"-->
    <!--          :position="{lng: item.lng, lat: item.lat}"-->
    <!--          :dragging="false"-->
    <!--          :offset="{width: 0 , height: 0}"-->
    <!--          @click="infoWindowOpen(index)"-->
    <!--          class="iconfont warn_type"-->
    <!--          :icon="iconStyle(item.type)"-->
    <!--      ></bm-marker>-->

    <!--      &lt;!&ndash; 信息窗体 &ndash;&gt;-->
    <!--      <bm-info-window-->
    <!--          v-for="(item,index) in list"-->
    <!--          :show="show && currentMark == index"-->
    <!--          :key="index"-->
    <!--          :width="220"-->
    <!--          :closeOnClick="true"-->
    <!--          :autoPan="true"-->
    <!--          :offset="{width: 0 , height: -10}"-->
    <!--          :position="{lng: item.lng, lat: item.lat}"-->
    <!--          @close="infoWindowClose"-->
    <!--          class="message-box"-->
    <!--      >-->
    <!--        <p class="display-flex message">-->
    <!--          单位地点:-->
    <!--          <span class="flex_1 overEllipsis">{{ item.unit }}</span>-->
    <!--        </p>-->
    <!--        <p class="display-flex message">-->
    <!--          设备编号:-->
    <!--          <span class="flex_1">{{ item.id }}</span>-->
    <!--        </p>-->
    <!--        <p class="display-flex message">-->
    <!--          当前水压:-->
    <!--          <span class="flex_1">{{ item.hydraulic_pressure }}Mpa</span>-->
    <!--        </p>-->
    <!--        <p class="display-flex message">-->
    <!--          当前温度:-->
    <!--          <span class="flex_1">{{ item.temperature }}°C</span>-->
    <!--        </p>-->
    <!--        <p class="display-flex message">-->
    <!--          当前电量:-->
    <!--          <span class="flex_1">{{ item.energy }}%</span>-->
    <!--        </p>-->
    <!--        <p class="display-flex message">-->
    <!--          信号强度:-->
    <!--          <span class="flex_1">{{ item.signal_intensity }}db</span>-->
    <!--        </p>-->
    <!--        <p class="display-flex message">-->
    <!--          监测时间:-->
    <!--          <span class="flex_1">{{ item.time }}</span>-->
    <!--        </p>-->
    <!--        <p class="display-flex message">-->
    <!--          经纬坐标:-->
    <!--          <span class="flex_1">{{ item.longitude.slice(0, 7) }} {{ item.latitude.slice(0, 6) }}</span>-->
    <!--        </p>-->
    <!--      </bm-info-window>-->
    <!--    </baidu-map>-->

    <baidu-map class="map" style="display: flex; flex-direction: column" center="长沙">
      <bml-marker-clusterer>
        <template v-for="(item,index) in list">
          <bm-marker
              :position="{lng: item.lng, lat: item.lat}"
              :key="index"
              :dragging="false"
              @click="infoWindowOpen(index)"
              class="iconfont warn_type"
              :icon="iconStyle(item.type)"
          ></bm-marker>

        </template>
      </bml-marker-clusterer>


      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-view style="width: 100%; height:100px; flex: 1"></bm-view>
    </baidu-map>
  </div>
</template>

<script>
import {getAllDeviceslist} from "../../utils";
import {BmlMarkerClusterer} from 'vue-baidu-map'

export default {
  components: {
    BmlMarkerClusterer
  },
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      zoom: 8,
      show: false,
      list: [],
      current: 0,
      currentMark: 0,
      center: '长沙',

      statusList: [],
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
    this.$chntek.regions('CSCB001').then(res => {
      const param = getAllDeviceslist(res, []);
      this.$chntek.statusPrimary(param.toString()).then(res => {
        param.forEach(x => {
          this.getStatus(x, res)
        })
      })
    })
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onReady({BMap, map}) {
      this.getData();
    },
    getStatus(val, list) {
      this.$chntek.statusRecent(val).then(res => {
        this.statusList.push({
          title: list.find(a => a.id === val),
          data: res[0]
        });
        this.getData();
      })
    },
    getData() {
      this.statusList.forEach(x => {
        this.list.push({
          unit: x.title.location,
          id: x.title.id,
          longitude: x.title.longitude,
          latitude: x.title.latitude,
          type: x.title.type,
          lng: x.title.longitude && x.title.longitude.slice(1),
          lat: x.title.latitude && x.title.latitude.slice(1),
          hydraulic_pressure: x.data.hydraulic_pressure,
          temperature: x.data.temperature,
          energy: x.data.energy,
          signal_intensity: x.data.signal_intensity,
          time: x.data.time,
        });
      })
      this.center = this.list[0];
    },
    infoWindowOpen(index) {
      this.currentMark = index;
      this.show = true;
    },
    infoWindowClose() {
      this.show = false;
    },
    iconStyle(type) {
      switch (type) {
        case 'pressure':
          return {url: require('@/assets/images/pressure_mini.png'), size: {width: 32, height: 32}};
        case 'firehydrant':
          return {url: require('@/assets/images/firehydrant_mini.png'), size: {width: 32, height: 32}};
        case 'cylinders':
          return {url: require('@/assets/images/cylinders_mini.png'), size: {width: 32, height: 32}};
      }

    },
  }
}
</script>

<style lang="less" scoped>
/* 地图容器必须设置宽和高属性 */
.map {
  position: fixed;
  top: 45px;
  /* left:0 有用，不要删 */
  left: 0px;
  padding: 0;
  width: 100%;
  height: calc(100vh - 95px);
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

.message {
  span {
    text-align: right;
  }
}
</style>

