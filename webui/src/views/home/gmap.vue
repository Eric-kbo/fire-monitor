<template>
  <div class="map-container">
    <!-- 注意这里必须设置center和zoom，不然组件是不会渲染地图的 -->
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="onReady">
      <!-- 自定义组件 -->
      <!-- 缩放组件 -->
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      <!-- 标记组件 -->
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

      <!-- 信息窗体 -->
      <bm-info-window
        v-for="(item,index) in list"
        :show="show && currentMark == index"
        :key="index"
        :width="220"
        :closeOnClick="true"
        :autoPan="true"
        :offset="{width: 0 , height: -10}"
        :position="{lng: item.lng, lat: item.lat}"
        @close="infoWindowClose"
        class="message-box"
      >
        <p class="display-flex message">
          单位地点:
          <span class="flex_1 overEllipsis">{{ item.unit }}</span>
        </p>
        <p class="display-flex message">
          设备编号:
          <span class="flex_1">{{ item.id }}</span>
        </p>
        <p class="display-flex message">
          当前水压:
          <span class="flex_1">{{ item.hydraulic_pressure }}Mpa</span>
        </p>
        <p class="display-flex message">
          当前温度:
          <span class="flex_1">{{ item.temperature }}°C</span>
        </p>
        <p class="display-flex message">
          当前电量:
          <span class="flex_1">{{ item.energy }}%</span>
        </p>
        <p class="display-flex message">
          信号强度:
          <span class="flex_1">{{ item.signal_intensity }}db</span>
        </p>
        <p class="display-flex message">
          监测时间:
          <span class="flex_1">{{ item.time }}</span>
        </p>
        <p class="display-flex message">
          经纬坐标:
          <span class="flex_1">{{ item.longitude.slice(0, 7) }} {{ item.latitude.slice(0, 6) }}</span>
        </p>
      </bm-info-window>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: new Date().toISOString().slice(0, 10),
      zoom: 8,
      show: false,
      list: [],
      current: 0,
      currentMark: 0,
      center: '长沙'
    }
  },
  watch: {
    current (newV) {
      this.$nextTick(() => {
        this.center = {
          lng: this.list[newV].lng,
          lat: this.list[newV].lat
        }
        setTimeout(() => {
          console.log(this.list[newV])
          this.infoWindowOpen(newV)
        }, 0)
      })
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    onReady ({ BMap, map }) {
      this.getData()
    },
    async getData () {
      const resultObj = await this.$chntek.transUnitList()

      // 过滤空数组和没有经纬度的点
      const array = resultObj
      // 从数组的第一个元素中映射需要展示的数据
      this.list = array.map(item => {
        console.log(item.id, item.longitude, item.latitude)
        return {
          unit: item.location,
          id: item.id,
          hydraulic_pressure: item.hydraulic_pressure,
          temperature: item.temperature,
          energy: item.energy,
          signal_intensity: item.signal_intensity,
          time: item.time,
          longitude: item.longitude,
          latitude: item.latitude,
          lng: item.longitude && item.longitude.slice(1),
          lat: item.latitude && item.latitude.slice(1),
          type: item.type
        }
      })
      this.center = this.list[0]
    },
    infoWindowOpen (index) {
      this.currentMark = index
      this.show = true
    },
    infoWindowClose () {
      this.show = false
    },
    iconStyle (type) {
      switch (type) {
        case 'pressure':
          return { url: require('@/assets/images/pressure.png'), size: { width: 32, height: 32 } }
          break
        case 'firehydrant':
          return { url: require('@/assets/images/firehydrant.png'), size: { width: 32, height: 32 } }
          break
        case 'cylinders':
          return { url: require('@/assets/images/cylinders.png'), size: { width: 32, height: 32 } }
          break
      }
      ;
    }
  }
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

.message {
  span {
    text-align: right;
  }
}
</style>
