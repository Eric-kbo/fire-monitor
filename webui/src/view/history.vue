<template>
  <div style="margin-bottom: 15%">
    <!--遮罩层-->
    <van-overlay style="z-index: 999999" :show="overlayShow">
      <div class="wrapper">
        <van-loading size="24px" color="#0094ff" vertical
        >数据量太大,正在加载中...
        </van-loading
        >
      </div>
    </van-overlay>
    <!--    <van-search v-model="value" placeholder="请输入搜索关键词"/>-->

    <van-row>
      <van-field
          v-model="fieldValue"
          is-link
          readonly
          placeholder="请选择地区"
          @click="show = true"
      />
    </van-row>
    <van-row>
      <van-col span="24">
        <van-field
            v-model="typeValue"
            readonly
            placeholder="请选择类型"
            @click="typeCheckShow = true"
        />
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <van-field
            v-model="devicesValue"
            readonly
            placeholder="请选择设备"
            @click="checkShow = true"
        />
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <van-cell
            title="选择日期区间"
            :value="date"
            @click="dateRangeShow = true"
        />
        <van-calendar
            v-model="dateRangeShow"
            allow-same-day
            :default-date="defaultDate"
            :min-date="new Date(2010, 0, 1)"
            type="range"
            @confirm="onConfirm"
        />
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <van-button
            type="info"
            @click="getRegion"
            loading-text="查询"
            :loading="searchBtnOn !== 0"
            block
        >查询
        </van-button
        >
      </van-col>
    </van-row>
    <van-collapse v-model="activeNames" accordion @change="getStatusDetail">
      <template v-for="(list, key) in statusList">
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
          <template v-for="(item, key) in detailList">
            <van-cell-group :key="key">
              <van-row type="flex" justify="end" gutter="10">
                <van-col>
                  水压
                  <van-tag plain type="success"
                  >{{ item.hydraulic_pressure }}MPa
                  </van-tag
                  >
                </van-col>
                <van-col>
                  温度
                  <van-tag plain type="success"
                  >{{ item.temperature }}°C
                  </van-tag
                  >
                </van-col>
                <van-col>
                  电量
                  <van-tag plain type="success">{{ item.energy }}%</van-tag>
                </van-col>
              </van-row>

              <van-row type="flex" justify="end" gutter="10">
                <van-col v-if="item.flow!=undefined">
                  累计流量
                  <van-tag plain type="success">{{ item.flow }}m³</van-tag>
                </van-col>
                <van-col v-if="item.flow_difference!=undefined">
                  本次流量
                  <van-tag plain type="success">{{ item.flow_difference }}m³</van-tag>
                </van-col>
                <van-col v-if="item.sluice!=undefined">
                  阀门<van-tag plain type="danger">{{ item.sluice }}</van-tag>
                </van-col>
              </van-row>

              <van-row type="flex" justify="end">
                <van-col>
                  <van-tag plain type="warning">{{ item.time }}</van-tag>
                </van-col>
              </van-row>
            </van-cell-group>
          </template>
        </van-collapse-item>
      </template>
    </van-collapse>

    <van-popup v-model="show" round position="bottom">
      <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          @close="show = false"
          @finish="onFinish"
      />
    </van-popup>

    <van-dialog v-model="typeCheckShow" title="请选择类型" @confirm="typeCheckDevice">
      <template>
        <van-checkbox-group v-model="typeCheckList">
          <van-cell-group style="max-height: 500px; overflow: scroll">
            <van-cell
                v-for="(item, index) in typeList"
                clickable
                :key="index"
                :title="item.name"
            >
              <template #right-icon>
                <van-checkbox :name="item.name" ref="checkboxes"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </template>
    </van-dialog>

    <van-dialog v-model="checkShow" title="请选择设备" @confirm="checkDevice">
      <template>
        <van-checkbox-group v-model="checkList">
          <van-cell-group style="max-height: 500px; overflow: scroll">
            <van-cell
                v-for="(item, index) in devicesList"
                clickable
                :key="index"
                :title="`${item.id} - ${item.title.location}`"
            >
              <template #right-icon>
                <van-checkbox :name="item.id" ref="checkboxes"/>
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
  Checkbox,
  CheckboxGroup,
} from "vant";

import {
  formatDate,
  formatDateBeforDay,
  getAllDeviceslist,
  getNowFormatDate,
} from "../utils";
import {getDevicesList} from "@/utils";

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
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      Arealoading: true,
      activeNames: ["1", "2"],
      overlayShow: false,
      value: "",
      date: "",
      starTime: "",
      endTime: "",
      show: false,
      dateRangeShow: false,
      checkShow: false,
      fieldValue: "",
      devicesValue: "",
      devicesList: [],
      allDevicesList: [],
      checkList: [],
      typeValue: "",
      typeList: [],
      typeCheckShow: false,
      typeCheckList: [],
      defaultDate: [],
      statusList: [],
      detailList: [],
      nowCheck: -1,
      cascaderValue: "",
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
      optionList: {},
      searchBtnOn: 0,
    };
  },
  created() {
    this.account = localStorage.getItem("chntek-account");
    this.fieldValue = localStorage.getItem("chntek-history-search")
        ? localStorage.getItem("chntek-history-search")
        : "";
    this.devicesValue = localStorage.getItem("chntek-history-devicesValue")
        ? localStorage.getItem("chntek-history-devicesValue")
        : [];
    this.typeValue = localStorage.getItem("chntek-history-typeValue")
        ? localStorage.getItem("chntek-history-typeValue")
        : [];
    this.contractArea();
    this.contractDevice();
    const nowDate = new Date();
    this.starTime = formatDateBeforDay(nowDate, -1);
    this.endTime = formatDate(nowDate);
    this.date = `${this.starTime}/${this.endTime}`;
    this.defaultDate = [new Date(this.starTime), new Date(this.endTime)];
  },
  methods: {
    getRegion() {
      this.searchBtnOn = -1; // 防止误触
      this.statusList = [];
      localStorage.setItem("chntek-history-search", this.fieldValue);
      localStorage.setItem("chntek-history-devicesValue", this.devicesValue);
      localStorage.setItem("chntek-history-typeValue", this.typeValue);
      const devices = this.devicesValue ? this.devicesValue.split(",") : [];
      if (devices.length > 0) {
        this.searchBtnOn = devices.length;
        devices.forEach((x) => {
          this.getNewStatus(this.devicesList.find((a) => a.id === x));
        });
      } else {
        this.searchBtnOn = this.devicesList.length;
        this.devicesList.forEach(x => {
          this.getNewStatus(x);
        })
      }
    },
    getNewStatus(data) {
      this.$chntek
          .statusHistory(data.id, this.starTime, this.endTime, 1)
          .then((res) => {
            this.searchBtnOn = this.searchBtnOn - 1;
            this.statusList.push({
              title: data.title,
              data: res,
            });
          })
          .finally(this.getDetail(this.nowCheck));
    },
    contractArea() {
      this.$chntek.regions(this.account).then((res) => {
        const keys = Object.keys(res);
        keys.forEach((x) => {
          const opt = {
            text: x,
            value: x,
          };
          opt.children = [];
          const areaKeys = Object.keys(res[x]);
          areaKeys.forEach((a) => {
            opt.children.push({
              text: a,
              value: a,
              list: [],
            });
            this.optionList[a] = res[x][a];
            res[x][a].forEach((b) => {
              const i = opt.children.findIndex((i) => i.text === a);
              opt.children[i].list.push(b);
            });
          });
          this.options.push(opt);
        });
      });
    },
    contractDevice() {
      if (!this.fieldValue) {
        return;
      }
      const areaList = this.fieldValue.split("-");
      this.$chntek.regions(this.account).then((res) => {
        const param =
            areaList.length > 0
                ? res[areaList[0]][areaList[1]]
                : getAllDeviceslist(res, []);
        this.allDevicesList = [];
        this.$chntek.statusPrimary(param.toString()).then((res) => {
          param.forEach((x) => {
            const data = res.find((a) => a.id === x);
            if (data) {
              this.allDevicesList.push({
                id: x,
                title: data,
              });
              if (!this.typeList.find(i => i.id == data.type)) {
                this.typeList.push(
                    {
                      id: data.type,
                      name: getDevicesList(data.type)
                    }
                )
              }
            }
          });
          this.checkList = this.devicesValue
              ? this.devicesValue.split(",")
              : [];
          this.typeCheckList = this.typeValue
              ? this.typeValue.split(",")
              : [];
          this.transParam();
          this.getRegion();
        });
      });
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({selectedOptions}) {
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("-");
      this.devicesValue = "";
      this.checkList = [];
      this.contractDevice();
    },
    changeFinish({selectedOptions}) {
      this.fieldValue = selectedOptions.map((option) => option.text).join("-");
      this.devicesValue = "";
      this.checkList = [];
    },
    onConfirm(date) {
      const [start, end] = date;
      this.dateRangeShow = false;
      this.starTime = getNowFormatDate(start);
      this.endTime = getNowFormatDate(end);
      this.date = `${this.starTime}/${this.endTime}`;
    },
    getStatusDetail: function ($activeNames) {
      this.getDetail($activeNames);
    },
    getDetail(val) {
      const data = this.statusList[val];
      this.statusList.forEach((x) => {
        if (x === data) {
          // if (this.nowCheck !== val) {
          this.detailList = [];
          this.nowCheck = val;
          this.overlayShow = true;
          this.$chntek
              .statusHistory(x.title.id, this.starTime, this.endTime, 10000)
              .then((res) => {
                this.detailList = res;
                this.overlayShow = false;
              })
              .catch(() => {
                this.overlayShow = false;
              });
          // }
        }
      });
    },
    checkDevice() {
      this.devicesValue = this.checkList.toString();
      this.getRegion();
    },
    typeCheckDevice() {
      this.typeValue = this.typeCheckList.toString();
      this.devicesValue = '';
      this.checkList = [];
      this.transParam();
      this.getRegion();
    },
    transParam() {
      if (this.typeCheckList.length > 0) {
        this.devicesList = [];
        this.allDevicesList.forEach(x => {
          if (this.typeCheckList.find(a => a == getDevicesList(x.title.type))) {
            this.devicesList.push(x);
          }
        });
      } else {
        this.devicesList = this.allDevicesList;
      }
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
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
