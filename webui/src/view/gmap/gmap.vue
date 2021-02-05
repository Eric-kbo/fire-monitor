<template>
  <div class="map-container">
    <!--     注意这里必须设置center和zoom，不然组件是不会渲染地图的 -->
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="onReady">
      <!-- 自定义组件 -->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!-- 缩放组件 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- 标记组件 -->
      <bml-marker-clusterer :averageCenter="true" :maxZoom="11">
        <bm-marker
            v-for="(item,index) in list"
            :key="index+'-'"
            :position="{lng: item.lng, lat: item.lat}"
            :dragging="false"
            :offset="{width: 0 , height: 0}"
            @click="infoWindowOpen(index)"
            class="iconfont warn_type"
            :icon="iconStyle(item.type)"
        ></bm-marker>
      </bml-marker-clusterer>

      <!-- 信息窗体 -->
      <bm-info-window
          :show="show"
          :width="220"
          :closeOnClick="true"
          :autoPan="true"
          :offset="{width: 0 , height: -10}"
          :position="{lng: showTag.lng, lat: showTag.lat}"
          @close="infoWindowClose"
          class="message-box"
      >
        <div style="border-bottom: #999999 1px solid">
          <p class="display-flex message">
            单位地点:
            <span class="flex_1 overEllipsis">{{ showTag.unit }}</span>
          </p>
          <p class="display-flex message">
            设备编号:
            <span class="flex_1">{{ showTag.id }}</span>
          </p>
          <p class="display-flex message">
            当前水压:
            <span class="flex_1">{{ showTag.hydraulic_pressure }}Mpa</span>
          </p>
          <p class="display-flex message">
            当前温度:
            <span class="flex_1">{{ showTag.temperature }}°C</span>
          </p>
          <p class="display-flex message">
            当前电量:
            <span class="flex_1">{{ showTag.energy }}%</span>
          </p>
          <p class="display-flex message">
            信号强度:
            <span class="flex_1">{{ showTag.signal_intensity }}db</span>
          </p>
          <p class="display-flex message">
            监测时间:
            <span class="flex_1">{{ showTag.time }}</span>
          </p>
          <p class="display-flex message">
            经纬坐标:
            <span class="flex_1">{{ getPosition() }}</span>
          </p>
        </div>
        <div style="text-align: center;margin-top: 1rem" v-if="currentList.length>1">
          <p class="display-flex message">
            此坐标还有:
            <span class="flex_1">{{ currentList.length - 1 }}</span>
            个设备
          </p>
          <van-button type="primary" @click="showMoreDetail">查看更多</van-button>
        </div>
      </bm-info-window>
    </baidu-map>
  </div>
</template>

<script>
import {getAllDeviceslist} from "../../utils";
import {BmlMarkerClusterer} from 'vue-baidu-map';
import {
  Button,
  Collapse, CollapseItem,
  Row,
  Col,
  Icon,
  Cell,
  CellGroup,
} from 'vant';

export default {
  components: {
    BmlMarkerClusterer,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
  },
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      zoom: 8,
      show: false,
      list: [],
      currentList: [],
      showTag: {},
      current: 0,
      currentMark: 0,
      center: '长沙',
      account: '',
    };
  },
  mounted() {
    this.account = localStorage.getItem('chntek-account');
    this.$chntek.regions(this.account).then(res => {
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
    getStatus(val, datas) {
      this.$chntek.statusRecent(val).then(res => {
        this.getData(datas.find(a => a.id === val), res[0]);
      })
    },
    getData(title, data) {
      if (title && data) {
        this.list.push({
          unit: title.location,
          id: title.id,
          longitude: title.longitude,
          latitude: title.latitude,
          type: title.type,
          lng: title.longitude && title.longitude.slice(1),
          lat: title.latitude && title.latitude.slice(1),
          hydraulic_pressure: data.hydraulic_pressure,
          temperature: data.temperature,
          energy: data.energy,
          signal_intensity: data.signal_intensity,
          time: data.time,
        });
        this.center = this.list[0];
      }
    },
    getPosition() {
      if (this.showTag) {
        return this.showTag.longitude + ';' + this.showTag.latitude;
      }
      return '';
    },
    infoWindowOpen(index) {
      this.currentMark = index;
      const checkData = this.list[index];
      this.currentList = this.list.filter(a => a.latitude === checkData.latitude && a.longitude === checkData.longitude);
      this.showTag = this.currentList[0];
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
    showMoreDetail() {
      this.$router.push({
        name: 'tagDetail',
        params: {
          ids: this.currentList
        }
      })
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

