<template>
  <div style="margin-bottom: 15%">
    <!--遮罩层-->
    <van-overlay style="z-index: 999999" :show="overlayShow">
      <div class="wrapper">
        <van-loading size="24px" color="#0094ff" vertical>数据量太大,正在加载中...</van-loading>
      </div>
    </van-overlay>
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
    <van-row>
      <van-col span="24">
        <van-cell title="选择日期区间" :value="date" @click="dateRangeShow = true"/>
        <van-calendar v-model="dateRangeShow" :min-date="new Date(2010, 0, 1)" type="range" @confirm="onConfirm"/>
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


    <van-collapse v-model="activeNames" accordion @change="getStatusDetail">
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
          <template v-for="(item,key) in detailList">
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
  Picker, Calendar, Loading, Overlay
} from 'vant';
import {formatDate, formatDateBeforDay, getAllDeviceslist} from "../../utils";

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
    [Calendar.name]: Calendar,
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
  },
  data() {
    return {
      Arealoading: true,
      activeNames: ['1', '2'],
      overlayShow: false,
      value: '',
      date: '',
      starTime: '',
      endTime: '',
      show: false,
      dateRangeShow: false,
      fieldValue: '',
      statusList: [],
      detailList: [],
      nowCheck: -1,
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
      optionList: {},
    };
  },
  created() {
    // 初始化加载所有历史数据
    // const p = localStorage.getItem('chntek-account');
    this.$chntek.regions('CSCB001').then(res => {
      const param = getAllDeviceslist(res, []);
      this.$chntek.statusPrimary(param.toString()).then(res => {
        param.forEach(x => {
          this.getStatus(x, res)
        })
      })
    })
    const nowDate = new Date();
    this.starTime = formatDateBeforDay(nowDate, -7);
    this.endTime = formatDate(nowDate);
    this.date = `${this.starTime}/${this.endTime}`;
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
            list: []
          })
          this.optionList[a] = res[x][a]
          res[x][a].forEach(b => {
            const i = opt.children.findIndex(i => i.text === a)
            opt.children[i].list.push(b)
          });
        })
        this.options.push(opt)
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
      this.$chntek.statusHistory(val, this.starTime, this.endTime, 1).then(res => {
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
    onConfirm(date) {
      const [start, end] = date;
      this.dateRangeShow = false;
      this.starTime = this.formatDate(start);
      this.endTime = this.formatDate(end);
      this.date = `${this.formatDate(start)}/${this.formatDate(end)}`;
    },
    getStatusDetail: function ($activeNames) {
      const data = this.statusList[$activeNames];
      this.statusList.forEach(x => {
        if (x === data) {
          if (this.nowCheck !== $activeNames) {
            this.detailList = [];
            this.nowCheck = $activeNames;
            this.overlayShow = true;
            this.$chntek.statusHistory(x.title.id, this.starTime, this.endTime, 10000).then(res => {
              this.detailList = res;
              this.overlayShow = false;
            }).catch(() => {
              this.overlayShow = false;
            })
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  align-content: center;
  background-color: #fff;
}
</style>
