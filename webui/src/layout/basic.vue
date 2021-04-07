<template>
	<div>
		<!-- 顶部菜单 -->
		<van-nav-bar title="启泰传感" :left-arrow="getLeft()" @click-left="onClickLeft" @click-right="onClickRight">
			<template #title>
				<div><img style="height: 47px;display: inline-block;max-width: 100%" src="../assets/images/headerLogo.png" /></div>
			</template>
			<template #right>
				<van-popover v-model="showPopover" trigger="click" :actions="actions" @select="onSelect" placement="bottom-end">
					<template #reference>
						<van-icon name="wap-nav" color="#000000" size="20" />
					</template>
				</van-popover>
			</template>
		</van-nav-bar>
    <div style="margin-top: 46px;">
      <gmap v-show="active == 'gmap'" @change="gmapChange"></gmap>
      <tagDetail v-if="active == 'tagDetail'&&tagDetailData" :model="tagDetailData"></tagDetail>
      <warnings v-show="active == 'warnings'" :model="warningsData" :allCount="warningsAllCount" @change="warningsChange"></warnings>
      <History v-show="active == 'history'"></History>
    </div>
		<!-- 模块 -->
		
		<!-- 底部切换菜单 -->
		<van-tabbar v-model="active">
			<van-tabbar-item replace name="gmap" icon="map-marked">GIS模块</van-tabbar-item>
			<van-tabbar-item replace name="warnings" icon="underway">实时告警</van-tabbar-item>
			<van-tabbar-item replace name="history" icon="browsing-history">数据中心</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
import gmap from '../view/gmap/gmap.vue';
import tagDetail from '../view/gmap/tagDetail.vue';
import warnings from '../view/warnings.vue';
import History from '../view/history.vue';
import { formatDateBeforDay, getAllDeviceslist } from '../utils';
export default {
	name: 'basic',
	components: {
		gmap,
    tagDetail,
		warnings,
		History
	},
	data() {
		return {
			active: 'gmap',
			showPopover: false,
			// 通过 actions 属性来定义菜单选项
			actions: [{ text: '版本1.1.6', disabled: true }, { text: '更新' }, { text: '注销' }],
			//wanings
			warningsData: [],
			warningsAllCount: 0,
      tagDetailData:[]
		};
	},
	created() {
		const token = localStorage.getItem('chntek-token');
		if (!token) {
			this.$router.push({
				path: '/login'
			});
		}
		this.account = localStorage.getItem('chntek-account');
		this.getNowStatus();
	},
	methods: {
		onClickLeft() {
			this.active='gmap';
		},
		onClickRight() {},
		getLeft() {
      if(this.active=='tagDetail'){
        return true;
      }
		},
		async onSelect(action) {
			switch (action.text) {
				case '注销':
					window.cordova.plugins.backgroundMode.disable();
					localStorage.clear();
					this.$router.push({
            name:'login'
          });
					break;
				case '更新':
					await this.$chntek.update();
					break;
			}
		},
		//获取实时告警所有数据
		getNowStatus() {
			this.$chntek.regions(this.account).then(regionData => {
				const param = getAllDeviceslist(regionData, []);
				this.warningsAllCount = param.length;
				this.getStatusPrimary(param);
			});
		},
		getStatusPrimary(param) {
			let vm = this;
			this.$chntek.statusPrimary(param.toString()).then(PrimaryData => {
				param.forEach(x => {
					vm.getWarrigsData(x, PrimaryData);
				});
			});
		},
		getWarrigsData(x, PrimaryData) {
			this.$chntek.warrigs(x, formatDateBeforDay(new Date(), 0), 1).then(res => {
				const data = PrimaryData.find(a => a.id === x);
				if (data) {
					if (res && res.length > 0) {
						this.warningsData.push({
							title: data,
							data: res[0]
						});
					}
				}
			});
		},
		warningsChange() {
			this.warningsData=[];
			this.getNowStatus();
		},
    gmapChange(val){
      console.log(val);
      this.active='tagDetail';
      this.tagDetailData=val;
    }
	}
};
</script>
<style>
 .van-nav-bar .van-nav-bar__content{
    position: fixed !important;
    width: 100% !important;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 10000;
  }
</style>
