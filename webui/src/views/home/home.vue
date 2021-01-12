<template>
  <div class="table-page-search-wrapper">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="8" :sm="24">
          <a-form-item label="城市">
            <a-select :default-value="cityData[0]" @change="handleProvinceChange">
              <a-select-option v-for="city in cityData" :key="city">
                {{ city }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item label="区域">
            <a-select v-model="districtData">
              <a-select-option v-for="district in districtData" :key="district">
                {{ district }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item label="设备">
            <a-select v-model="devicesData">
              <a-select-option v-for="device in devicesData" :key="device">
                {{ device }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :md="8" :sm="24">
          <span
            class="table-page-search-submitButtons"
            style="float: right">
            <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          </span>
        </a-col>
      </a-row>
    </a-form>

    <a-descriptions title="CSCB0000003">
      <a-descriptions-item>
        <a-tag color="blue">温度(℃):30
        </a-tag>
        <a-tag color="blue">水压(Mpa):1000
        </a-tag>
        <a-tag color="blue">电量(%):30
        </a-tag>
        <a-tag color="blue">检测时间:2020-12-12 09:01:00
        </a-tag>
      </a-descriptions-item>
      <!--      <a-descriptions-item label="温度(℃)">30</a-descriptions-item>-->
      <!--      <a-descriptions-item label="水压(Mpa)">1000</a-descriptions-item>-->
      <!--      <a-descriptions-item label="电量(%)">20</a-descriptions-item>-->
      <!--      <a-descriptions-item label="检测时间"> 2020-12-12 09:01:00</a-descriptions-item>-->
    </a-descriptions>
    <a-descriptions title="CSCB0000002">
      <a-descriptions-item>
        <a-tag color="blue">30℃
        </a-tag>
        <a-tag color="blue">1000mpa
        </a-tag>
        <a-tag color="blue">30%
        </a-tag>
        <a-tag color="blue">2020-12-12 09:01:00
        </a-tag>
      </a-descriptions-item>
      <!--      <a-descriptions-item label="设备编号">CSCB0000003</a-descriptions-item>-->
      <!--      <a-descriptions-item label="温度(℃)">30</a-descriptions-item>-->
      <!--      <a-descriptions-item label="水压(Mpa)">1000</a-descriptions-item>-->
      <!--      <a-descriptions-item label="电量(%)">20</a-descriptions-item>-->
      <!--      <a-descriptions-item label="检测时间"> 2020-12-12 09:01:00</a-descriptions-item>-->
    </a-descriptions>

    <a-card :bordered="false">
      <s-table
        style="margin-bottom: 24px"
        row-key="id"
        :columns="goodsColumns"
        :data="loadGoodsData">

      </s-table>
    </a-card>

    <home-chart></home-chart>
  </div>
</template>

<script>
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar, STable } from '@/components'

import Chart from 'chart.js'
import HomeChart from '@/views/home/homeChart'

const cityData = ['长沙']
const districtData = {
  长沙: ['望城', '岳麓', '天心']
}
export default {
  name: 'Workplace',
  components: {
    STable,
    HomeChart,
    Chart,
    PageHeaderWrapper,
    Radar
  },
  data () {
    return {
      queryParam: { status: '' },
      cityData,
      cities: districtData[cityData[0]],
      districtData: districtData[cityData[0]][0],
      devicesData: ['CSCB0000003', 'CSCB0000002'],

      goodsColumns: [
        {
          title: '设备编号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '温度(℃)',
          dataIndex: 'temp',
          key: 'temp'
        },
        {
          title: '水压(Mpa)',
          dataIndex: 'mpa',
          key: 'mpa'
        },
        {
          title: '电量(%)',
          dataIndex: 'elect',
          key: 'elect'
        },
        {
          title: '检测时间',
          dataIndex: 'time',
          key: 'time'
        }
      ],
      loadGoodsData: () => {
        return new Promise(resolve => {
          resolve({
            data: [
              {
                id: 'CSCB0000003',
                temp: '30',
                mpa: 1000,
                elect: 20,
                time: '2020-12-12 09:01:00'
              },
              {
                id: 'CSCB0000002',
                temp: '40',
                mpa: 900,
                elect: 50,
                time: '2020-12-12 09:02:00'
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      }
    }
  },
  methods: {
    handleProvinceChange (value) {
      this.cities = cityData[value]
      this.secondCity = cityData[value][0]
    }

  }
}
</script>

<style lang="less" scoped>

</style>
