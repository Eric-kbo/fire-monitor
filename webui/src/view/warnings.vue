<template>
  <div style="margin-bottom: 15%">
    <!--遮罩层-->
    <van-overlay style="z-index: 999999" :show="overlayShow">
      <div class="wrapper">
        <van-loading size="24px" color="#0094ff" vertical>数据正在加载中...</van-loading>
      </div>
    </van-overlay>
    <!--    <van-search v-model="value" placeholder="请输入搜索关键词"/>-->
    <van-row>
      <van-col span="24">
        <van-field
            :disabled="loading"
            v-model="typeValue"
            :right-icon="loading?'fail':'success'"
            readonly
            placeholder="点击选择告警类型"
            @click="typeClick()"/>
      </van-col>
    </van-row>
    <van-tabs type="card" v-model="active" @click="tagChange" style="background-color: white">
      <van-tab title="今天">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-row>
            <van-grid :column-num="3">
              <van-grid-item icon="cluster" :text="'总数：' + allCount"/>
              <van-grid-item icon="checked" :text="'正常：' + normalCount"/>
              <van-grid-item icon="warning" :text="'异常：' + abNormalCount"/>
            </van-grid>
          </van-row>
          <van-collapse v-model="activeNames" accordion @change="getNowStatusDetail">
            <template v-for="(list, key) in nowStatus">
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
                <template v-for="(item, key) in detailList">
                  <van-cell-group :key="key">
                    <van-row type="flex" justify="end" gutter="10">
                      <van-col>
                        温度
                        <van-tag plain type="success">{{ item.temperature }}°C</van-tag>
                      </van-col>
                      <van-col>
                        压力
                        <van-tag plain type="success">{{ item.hydraulic_pressure }}MPa</van-tag>
                      </van-col>
                      <van-col>
                        电量
                        <van-tag plain type="success">{{ item.energy }}%</van-tag>
                      </van-col>
                    </van-row>
                    <van-row type="flex" justify="end" gutter="10">
                      <van-tag plain type="danger">{{ item.type }}</van-tag>
                    </van-row>
                    <van-row type="flex" justify="end" gutter="10">
                      <van-col>
                        <van-tag plain type="warning">{{ item.time }}</van-tag>
                      </van-col>
                    </van-row>
                  </van-cell-group>
                </template>
              </van-collapse-item>
            </template>
          </van-collapse>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="历史">
        <van-collapse v-model="activeNames" accordion @change="getHisStatusDetail">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <template v-for="(list, key) in hisStatus">
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
                <template v-for="(item, key) in detailList">
                  <van-cell-group :key="key">
                    <van-row type="flex" justify="end" gutter="10">
                      <van-col>
                        温度:
                        <van-tag plain type="success">{{ item.temperature }}°C</van-tag>
                      </van-col>
                      <van-col>
                        压力:
                        <van-tag plain type="success">{{ item.hydraulic_pressure }}MPa</van-tag>
                      </van-col>
                      <van-col>
                        电量:
                        <van-tag plain type="success">{{ item.energy }}%</van-tag>
                      </van-col>
                    </van-row>
                    <van-row type="flex" justify="end" gutter="10">
                      <van-tag plain type="danger">{{ item.type }}</van-tag>
                    </van-row>
                    <van-row type="flex" justify="end" gutter="10">
                      <van-col>
                        <van-tag plain type="warning">{{ item.time }}</van-tag>
                      </van-col>
                    </van-row>
                  </van-cell-group>
                </template>
              </van-collapse-item>
            </template>
          </van-list>
        </van-collapse>
      </van-tab>
    </van-tabs>
    <van-dialog v-model="typeCheckShow" title="请选择告警类型" @confirm="typeChecked">
      <template>
        <van-checkbox-group v-model="typeCheckList">
          <van-cell-group style="max-height: 500px; overflow: scroll">
            <van-cell
                v-for="(item, index) in typeList"
                clickable
                :key="index"
                :title="item"
            >
              <template #right-icon>
                <van-checkbox :name="item" ref="checkboxes"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </template>
    </van-dialog>
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
  List,
  Tab,
  Tabs,
  PullRefresh,
  Checkbox,
  CheckboxGroup,
} from 'vant';
import {formatDateBeforDay, getAllDeviceslist} from '../utils';

export default {
  name: 'warnings',
  props: {
    model: {
      type: [Object, Array, String, Number]
    },
    allCount: {
      type: [Object, Array, String, Number]
    }
  },
  watch: {
    model(newV) {
      this.model = newV;
      this.getNowStatus();
    },
    allCount(newV) {
      this.allCount = newV;
    }
  },
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
    [List.name]: List,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [PullRefresh.name]: PullRefresh,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      active: 0,
      normalCount: 0,
      abNormalCount: 0,
      loading: false,
      finished: false,
      account: '',
      nowStatus: [],
      hisStatus: [],
      nowDate: {
        star: formatDateBeforDay(new Date(), 0),
        end: ''
      },
      hisDate: {
        star: formatDateBeforDay(new Date(), -1),
        end: ''
      },
      Arealoading: true,
      activeNames: ['1', '2'],
      overlayShow: false,
      detailList: [],
      allDevices: [],
      nowCheck: -1,
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
      optionList: {},
      //下拉刷新动画
      isLoading: false,
      typeCheckShow: false,
      typeValue: "",
      typeCheckList: [],
      typeList: ['低水压', '高水压', '倾斜'],

      devicesNames: [],
    };
  },
  created() {
    // 初始化加载所有历史数据
    this.account = localStorage.getItem('chntek-account');
    this.$chntek.regions(this.account).then(regionData => {
      this.devicesNames = getAllDeviceslist(regionData, []);
    });
    this.$chntek.waringTypes().then(res => {
      this.typeList = res;
    });
  },
  mounted() {
    this.getNowStatus();
  },
  methods: {
    typeChecked() {
      this.typeValue = this.typeCheckList.toString();
      this.loadData();
    },
    tagChange() {
      this.loadData()
    },
    getNowStatus() {
      this.nowStatus = this.model;
      this.abNormalCount = this.nowStatus.length;
      this.normalCount = this.allCount - this.abNormalCount;
      this.isLoading = false;
    },
    // 下拉刷新列表
    onRefresh() {
      this.loadData()
      this.isLoading = true;
    },
    loadData() {
      if (this.active === 0) {
        this.allCount = this.devicesNames.length;
        this.getPrimary(this.devicesNames);
      } else {
        this.hisStatus = [];
        this.allDevices = [];
        this.hisDate.star = formatDateBeforDay(new Date(), -1);
        this.getHisStatus();
      }
    },
    getPrimary(param) {
      this.$chntek.statusPrimary(param.toString()).then(res => {
        this.allDevices = res;
        param.forEach(x => {
          this.getStatus(x, res);
        });
      });
    },
    getStatus(val, list) {
      this.nowStatus = [];
      this.$chntek.warrigs(val, this.nowDate.star, 1, this.typeValue).then(res => {
        const data = list.find(a => a.id === val);
        if (data) {
          if (res && res.length > 0) {
            this.nowStatus.push({
              title: data,
              data: res[0]
            });
          }
          this.abNormalCount = this.nowStatus.length;
          this.normalCount = this.allCount - this.abNormalCount;
          this.isLoading = false;
        }
      });
    },
    getHisStatus() {
      this.$chntek.statusPrimary(this.devicesNames.toString()).then(PrimaryData => {
        this.allDevices = PrimaryData;
        this.devicesNames.forEach((x, index) => {
          this.$chntek.warrigs(x, this.hisDate.star, 1, this.typeValue).then(res => {
            const data = PrimaryData.find(a => a.id === x);
            if (data) {
              if (res && res.length > 0) {
                this.hisStatus.push({
                  title: data,
                  data: res[0]
                });
              }
            }
            if (index === this.allDevices.length - 1) {
              this.loading = true;
              this.onLoad();
            }
          });
        });
      });
    },
    onLoad() {
      setTimeout(() => {
        this.hisDate.star = formatDateBeforDay(this.hisDate.star, -1);
        this.allDevices.forEach(x => {
          this.getHistoryStatus(x);
        });
        this.loading = false;
      }, 1000);
    },
    getHistoryStatus(data) {
      this.$chntek.warrigs(data.id, this.hisDate.star, 1, this.typeValue).then(res => {
        if (data) {
          if (res && res.length > 0) {
            this.hisStatus.push({
              title: data,
              data: res[0]
            });
          }
        }
      });
    },
    getNowStatusDetail: function ($activeNames) {
      const data = this.nowStatus[$activeNames];
      this.getStatusDetail(data, $activeNames, 'now');
    },
    getHisStatusDetail: function ($activeNames) {
      const data = this.hisStatus[$activeNames];
      this.getStatusDetail(data, $activeNames, 'his');
    },
    getStatusDetail(data, index, type) {
      if (type === 'now') {
        this.nowStatus.forEach(x => {
          if (x === data) {
            if (this.nowCheck !== index) {
              this.detailList = [];
              this.nowCheck = index;
              this.overlayShow = true;
              this.$chntek
                  .warrigs(data.title.id, data.data.time.substring(0, 10), 20, this.typeValue)
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
      } else {
        this.hisStatus.forEach(x => {
          if (x === data) {
            if (this.nowCheck !== index) {
              this.detailList = [];
              this.nowCheck = index;
              this.overlayShow = true;
              this.$chntek
                  .warrigs(data.title.id, data.data.time.substring(0, 10), 20, this.typeValue)
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
      }
    },
    typeClick() {
      if (!this.loading) {
        this.typeCheckShow = true
      }
    },
  }
};
</script>

<style scoped="scoped" lang="less">
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

.van-collapse-item--border::after {
  border-top: 1px solid #989898 !important;
}
</style>
