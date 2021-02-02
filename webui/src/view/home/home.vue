<template>
  <div style="margin-bottom: 15%">
    <!--    <van-search v-model="value" placeholder="请输入搜索关键词"/>-->

    <van-row>
    </van-row>

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
      <template v-for="(list,key) in statusList">
        <van-collapse-item :name="key" :key="key">
          <template #title>
            <van-row>
              <van-col span="12">
                {{ list.title.id }}
              </van-col>
              <van-col span="4">
                {{ list.title.city }}
              </van-col>
              <van-col span="8">
                {{ list.title.county }}
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                {{ list.title.location }}
              </van-col>
            </van-row>
          </template>
          <template v-for="(item,key) in list.data">
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
      </template>
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
  Search, Button,
  Picker
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
    [Picker.name]: Picker,
    HomeChart,
  },
  data() {
    return {
      Arealoading: true,
      activeNames: ['1', '2'],
      overlayShow: false,
      value: '',
      show: false,
      fieldValue: '',
      statusList: [],
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
      optionList: {},

      account: '',
    };
  },
  created() {
    this.account = localStorage.getItem('chntek-account');
    this.$chntek.regions(this.account).then(res => {
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
            list: []
          })
          this.optionList[a] = res[x][a]
          res[x][a].forEach(b => {
            const i = opt.children.findIndex(i => i.text === a)
            opt.children[i].list.push(b)
          });
        })
        this.options.push(opt)
        console.log(JSON.stringify(this.options))
      })
    })
  },
  methods: {
    getRegion() {
      const list = this.fieldValue.split('-');
      const val = list[list.length - 1]
      const datas = this.optionList[val]
      if (datas && datas.length > 0) {
        this.$chntek.statusPrimary(datas.toString()).then(res => {
          datas.forEach(x => {
            this.getStatus(x, res)
          })
        })
      }
    },
    getStatus(val, list) {
      this.$chntek.statusRecent(val).then(res => {
        this.statusList.push({
          title: list.find(a => a.id === val),
          data: res
        });
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
</style>
