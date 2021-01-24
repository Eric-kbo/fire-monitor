<template>
  <div style="margin-bottom: 15%">
    <van-nav-bar
        title="启泰传感"
    />
    <!--    <van-search v-model="value" placeholder="请输入搜索关键词"/>-->
    <van-row>
      <van-col span="18">
        <van-field
            v-model="fieldValue"
            is-link
            readonly
            placeholder="请选择设备"
            @click="show = true"
        />
      </van-col>
      <van-col span="6">
        <van-button type="info" @click="getRegion" block>查询</van-button>
      </van-col>
    </van-row>
    <van-popup v-model="show" round position="bottom">
      <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          @close="show = false"
          @finish="onFinish"
          @change="changeFinish"
      />
    </van-popup>

    <home-chart style="margin-top: 15px; "></home-chart>

    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <template #title>
          <div>设备1</div>
        </template>
        <template v-for="(item,key) in statusList">

          <van-cell-group
              :key="key">
            <van-row>
              <van-col span="6">
                温度:
                <van-tag plain type="primary">{{ item.temperature }}</van-tag>
              </van-col>
              <van-col span="6">
                压力:
                <van-tag plain type="success">{{ item.hydraulic_pressure }}</van-tag>
              </van-col>
              <van-col span="6">
                电量:
                <van-tag plain type="danger">{{ item.energy }}%</van-tag>
              </van-col>
              <van-col span="12">
                时间:
                <van-tag plain type="warning">{{ item.time }}</van-tag>
              </van-col>
            </van-row>
          </van-cell-group>
        </template>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Icon,
  Cell,
  CellGroup,
  Cascader,
  Field,
  Popup,
  Collapse,
  CollapseItem,
  Tag,
  Divider,
  Card,
  Search, Button
} from 'vant';
import HomeChart from './homeChart'

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Cascader.name]: Cascader,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Tag.name]: Tag,
    [Divider.name]: Divider,
    [Search.name]: Search,
    [Button.name]: Button,
    [Card.name]: Card,
    HomeChart,
  },
  data() {
    return {
      activeNames: ['1', '2'],
      value: '',
      show: false,
      fieldValue: '',
      statusList: [],
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
    };
  },
  created() {
    this.$chntek.regions('CSCB001').then(res => {
      const keys = Object.keys(res);
      keys.forEach(x => {
        const opt = {
          text: x,
          value: x,
        }
        opt.children = []
        const areaKeys = Object.keys(res[x]);
        areaKeys.forEach(a => {
          opt.children.push({
            text: a,
            value: a,
            children: []
          })
          res[x][a].forEach(b => {
            const i = opt.children.findIndex(i => i.text === a)
            opt.children[i].children.push({
              text: b,
              value: b,
            })
          });
        })
        this.options.push(opt)
      })
    })
    this.getStatus('CSCB0000001');
  },
  methods: {
    getRegion() {
      const list = this.fieldValue.split('-');
      const val = list[list.length - 1]
      this.getStatus(val)
    },
    getStatus(val) {
      this.$chntek.statusRecent(val).then(res => {
        this.statusList = res;
        console.log(this.statusList)
      })
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({selectedOptions}) {
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join('-');
    },
    changeFinish({selectedOptions}) {
      this.fieldValue = selectedOptions.map((option) => option.text).join('-');
    },
  },
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
