<template>
  <div style="margin-bottom: 15%">
    <van-nav-bar
        title="启泰传感"
    />
    <van-search v-model="value" placeholder="请输入搜索关键词"/>
    <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="设备"
        placeholder="请选择设备"
        @click="show = true"
    />
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

    <van-cell-group style="margin-top: 15px;">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="CSCB000001" name="1">
          <van-row>
            <van-col span="3">
              <van-tag plain type="primary">30℃</van-tag>
            </van-col>
            <van-col span="5">
              <van-tag plain type="success">1000mpa</van-tag>
            </van-col>
            <van-col span="3">
              <van-tag plain type="danger">30%</van-tag>
            </van-col>
            <van-col span="12">
              <van-tag plain type="warning">2020-12-12 09:01:00</van-tag>
            </van-col>
          </van-row>
        </van-collapse-item>
        <van-collapse-item title="CSCB000002" name="2">
          <van-row>
            <van-col span="3">
              <van-tag plain type="primary">30℃</van-tag>
            </van-col>
            <van-col span="5">
              <van-tag plain type="success">1000mpa</van-tag>
            </van-col>
            <van-col span="3">
              <van-tag plain type="danger">30%</van-tag>
            </van-col>
            <van-col span="12">
              <van-tag plain type="warning">2020-12-12 09:01:00</van-tag>
            </van-col>
          </van-row>
        </van-collapse-item>
        <van-collapse-item title="CSCB000003" name="3">
          <van-row>
            <van-col span="3">
              <van-tag plain type="primary">30℃</van-tag>
            </van-col>
            <van-col span="5">
              <van-tag plain type="success">1000mpa</van-tag>
            </van-col>
            <van-col span="3">
              <van-tag plain type="danger">30%</van-tag>
            </van-col>
            <van-col span="12">
              <van-tag plain type="warning">2020-12-12 09:01:00</van-tag>
            </van-col>
          </van-row>
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
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
  Search
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
    HomeChart,
  },
  data() {
    return {
      activeNames: ['1', '2'],
      value: '',
      show: false,
      fieldValue: '',
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [
        {
          text: '湖南省',
          value: '330000',
          children: [{
            text: '长沙市',
            value: '330100',
            children: [{
              text: 'CSCB000001',
              value: '12313123'
            }]
          }],
        },
        {
          text: '广东省',
          value: '320000',
          children: [{text: '深圳市', value: '320100'}],
        },
      ],
    };
  },
  methods: {
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
