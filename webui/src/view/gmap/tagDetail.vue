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
            <van-cell v-if="item.hydraulic_pressure" title="当前水压" :value="item.hydraulic_pressure+'Mpa'"/>
            <van-cell v-if="item.temperature!=undefined" title="当前温度" :value="item.temperature+'°C'"/>
            <van-cell v-if="item.energy!=undefined" title="当前电量" :value="item.energy+'%'"/>
            <van-cell v-if="item.signal_intensity!=undefined" title="信号强度" :value="item.signal_intensity"/>
            <van-cell v-if="item.flow!=undefined" title="累计流量" :value="item.flow"/>
            <van-cell v-if="item.flow_difference!=undefined" title="本次流量" :value="item.flow_difference"/>
            <van-cell v-if="item.sluice" title="阀门状态" :value="item.sluice"/>
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
      activeNames: [0],
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