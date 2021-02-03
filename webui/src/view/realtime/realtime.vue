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
      <van-grid :column-num="3">
        <van-grid-item icon="cluster" :text="'总数：'+allCount" />
        <van-grid-item icon="checked" :text="'正常：'+normalCount" />
        <van-grid-item icon="warning" :text="'异常：'+abNormalCount" />
      </van-grid>
    </van-row>

    <van-collapse v-model="activeNames" accordion @change="getStatusDetail">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <template v-for="(list,key) in statusList">
          <van-collapse-item :name="key" :key="key">
            <template #title>
              <van-row>
                <van-col span="12">{{ list.title.id }}</van-col>
                <van-col span="4">{{ list.title.city }}</van-col>
                <van-col span="8">{{ list.title.county }}</van-col>
              </van-row>
              <van-row>
                <van-col span="24">{{ list.title.location }}</van-col>
              </van-row>
              <van-row>
                <van-col span="24">{{ list.data.type }}</van-col>
              </van-row>
              <van-row>
                <van-col span="24">{{ list.data.time }}</van-col>
              </van-row>
            </template>
            <template v-for="(item,key) in detailList">
              <van-cell-group :key="key">
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
                <van-row>
                  信息:
                  <van-tag plain type="danger">{{ item.type }}</van-tag>
                </van-row>
              </van-cell-group>
            </template>
          </van-collapse-item>
        </template>
      </van-list>
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
  Search,
  Button,
  Picker,
  Calendar,
  Loading,
  Overlay,
  Grid,
  GridItem,
  List
} from "vant";
import {
  formatDate,
  getNowFormatDate,
  formatDateBeforDay,
  getAllDeviceslist
} from "../../utils";

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
    [GridItem.name]: GridItem,
    [Grid.name]: Grid,
    [List.name]: List
  },
  data() {
    return {
      active: 0,
      allCount: 0,
      normalCount: 0,
      abNormalCount: 0,
      loading: false,
      finished: false,
      account: "",

      Arealoading: true,
      activeNames: ["1", "2"],
      overlayShow: false,
      starTime: "",
      endTime: "",
      statusList: [],
      detailList: [],
      allDevices: [],
      nowCheck: -1,
      cascaderValue: "",
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
      optionList: {}
    };
  },
  created() {
    // 初始化加载所有历史数据
    this.account = localStorage.getItem("chntek-account");
    const nowDate = new Date();
    this.starTime = formatDateBeforDay(nowDate, -1);
    this.endTime = formatDate(nowDate);
    this.loadData();
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.starTime = formatDateBeforDay(this.starTime, -1);
        // if (this.refreshing) {
        //   this.list = [];
        //   this.refreshing = false;
        // }
        this.allDevices.forEach(x => {
          this.getHistoryStatus(x);
        });
        this.loading = false;
      }, 1000);
    },
    loadData() {
      this.$chntek.regions(this.account).then(res => {
        const param = getAllDeviceslist(res, []);
        this.allCount = param.length;
        this.$chntek.statusPrimary(param.toString()).then(res => {
          this.allDevices = res;
          param.forEach(x => {
            this.getStatus(x, res);
          });
        });
      });
    },
    getHistoryStatus(data) {
      this.$chntek.warrigs(data.id, this.starTime, 1).then(res => {
        if (data) {
          if (res && res.length > 0) {
            this.statusList.push({
              title: data,
              data: res[0]
            });
          }
        }
      });
    },
    getStatus(val, list) {
      this.$chntek.warrigs(val, this.starTime, 1).then(res => {
        const data = list.find(a => a.id === val);
        if (data) {
          if (res && res.length > 0) {
            this.statusList.push({
              title: data,
              data: res[0]
            });
            if (this.starTime == getNowFormatDate(new Date())) {
              this.abNormalCount = this.statusList.length;

              if (localStorage.getItem("abnormalCount") != this.abNormalCount)
                window.cordova.plugins.notification.local.schedule({
                  text: "有新的告警信息...",
                  foreground: true
                });
            }
            this.normalCount = this.allCount - this.abNormalCount;
            localStorage.setItem("abnormalCount", this.abNormalCount);
          }
        }
      });
    },
    getStatusDetail: function($activeNames) {
      const data = this.statusList[$activeNames];
      this.statusList.forEach(x => {
        if (x === data) {
          if (this.nowCheck !== $activeNames) {
            this.detailList = [];
            this.nowCheck = $activeNames;
            this.overlayShow = true;
            this.$chntek
              .warrigs(data.title.id, data.data.time.substring(0, 10), 20)
              .then(res => {
                this.detailList = res;
                this.overlayShow = false;
              })
              .catch(() => {
                this.overlayShow = false;
              });
          }
        }
      });
    },
    getPosition(data) {
      if (data) {
        return data.longitude + ";" + data.latitude;
      }
      return "";
    }
  }
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
