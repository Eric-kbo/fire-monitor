<template>
  <div style="margin-bottom: 15%">
    <template v-for="(item,key) in list">
      <van-collapse :key="key" v-model="activeNames">
        <van-collapse-item :name="key">
          <template #title>
            <van-row>
              <van-col span="12">
                {{ item.id }}
              </van-col>
              <van-col span="4">
                {{ item.temperature }}°C
              </van-col>
              <van-col span="8">
                {{ item.item }}
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                {{ item.unit }}
              </van-col>
            </van-row>
          </template>
          <template>
            <van-cell title="当前水压" :value="item.hydraulic_pressure+'Mpa'"/>
            <van-cell title="当前温度" :value="item.temperature+'°C'"/>
            <van-cell title="当前电量" :value="item.energy+'%'"/>
            <van-cell title="信号强度" :value="item.signal_intensity"/>
            <van-cell title="经纬坐标" :value="getPosition(item)"/>
          </template>
        </van-collapse-item>
      </van-collapse>
    </template>
  </div>
</template>

<script>
import {
  Col,
  Collapse, List,
  CollapseItem, Row,
  Cell,
} from 'vant';

export default {
  name: "tagDetail",
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [List.name]: List,
    [Cell.name]: Cell,
  },
  data() {
    return {
      activeNames: ['1'],
      list: [],
    }
  },
  created() {
    if (this.$route.params && this.$route.params.ids) {
      this.list = this.$route.params.ids;
    } else {
      this.$router.push({
            name: 'gmap'
          }
      )
    }
  },
  methods: {
    getPosition(data) {
      if (data) {
        return data.longitude + ';' + data.latitude;
      }
      return '';
    },
  }
}
</script>

<style scoped>

</style>