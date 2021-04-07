<template>
	<div style="margin-bottom: 15%">
		<!--遮罩层-->
		<van-overlay style="z-index: 999999" :show="overlayShow">
			<div class="wrapper"><van-loading size="24px" color="#0094ff" vertical>数据量太大,正在加载中...</van-loading></div>
		</van-overlay>
		<!--    <van-search v-model="value" placeholder="请输入搜索关键词"/>-->

		<van-tabs type="card" v-model="active" @click="tagChange" style="background-color: white">
			<van-tab title="今天">
				<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
					<van-row>
						<van-grid :column-num="3">
							<van-grid-item icon="cluster" :text="'总数：' + allCount" />
							<van-grid-item icon="checked" :text="'正常：' + normalCount" />
							<van-grid-item icon="warning" :text="'异常：' + abNormalCount" />
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
												<van-tag plain type="primary">{{ item.temperature }}°C</van-tag>
											</van-col>
											<van-col>
												压力
												<van-tag plain type="success">{{ item.hydraulic_pressure }}MPa</van-tag>
											</van-col>
											<van-col>
												电量
												<van-tag plain type="danger">{{ item.energy }}%</van-tag>
											</van-col>
										</van-row>
										<van-row type="flex" justify="end" gutter="10">
											信息
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
												<van-tag plain type="primary">{{ item.temperature }}°C</van-tag>
											</van-col>
											<van-col>
												压力:
												<van-tag plain type="success">{{ item.hydraulic_pressure }}MPa</van-tag>
											</van-col>
											<van-col>
												电量:
												<van-tag plain type="danger">{{ item.energy }}%</van-tag>
											</van-col>
										</van-row>
										<van-row type="flex" justify="end" gutter="10">
											信息:
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
	PullRefresh
} from 'vant';
import { getNowFormatDate, formatDateBeforDay, getAllDeviceslist } from '../utils';

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
		[PullRefresh.name]: PullRefresh
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
			isLoading: false
		};
	},
	created() {
		// 初始化加载所有历史数据
		this.account = localStorage.getItem('chntek-account');
	},
	mounted() {
		this.getNowStatus();
	},
	methods: {
		tagChange(name) {
			if (name != 0) {
				this.getHisStatus();
			}
		},
		getNowStatus() {
			this.nowStatus = this.model;
			this.abNormalCount = this.nowStatus.length;
			this.normalCount = this.allCount - this.abNormalCount;
			this.isLoading = false;
		},
		getHisStatus() {
			this.$chntek.regions(this.account).then(regionData => {
				const param = getAllDeviceslist(regionData, []);
				this.$chntek.statusPrimary(param.toString()).then(PrimaryData => {
					this.allDevices = PrimaryData;
					param.forEach(x => {
						this.$chntek.warrigs(x, this.hisDate.star, 1).then(res => {
							const data = PrimaryData.find(a => a.id === x);
							if (data) {
								if (res && res.length > 0) {
									this.hisStatus.push({
										title: data,
										data: res[0]
									});
								}
							}
						});
					});
				});
			});
		},
		// 下拉刷新列表
		onRefresh() {
			this.$emit('change');
			this.isLoading = true;
		},
		loadData() {
			this.$chntek.regions(this.account).then(res => {
				const param = getAllDeviceslist(res, []);
				this.allCount = param.length;
				this.getPrimary(param);
			});
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
			this.$chntek.warrigs(val, this.nowDate.star, 1).then(res => {
				const data = list.find(a => a.id === val);
				if (data) {
					if (res && res.length > 0) {
						this.nowStatus.push({
							title: data,
							data: res[0]
						});
						if (this.nowDate.star == getNowFormatDate(new Date())) {
							this.abNormalCount = this.hisStatus.length;
						}
						this.normalCount = this.allCount - this.abNormalCount;
					}
				}
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
			this.$chntek.warrigs(data.id, this.hisDate.star, 1).then(res => {
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
		getNowStatusDetail: function($activeNames) {
			const data = this.nowStatus[$activeNames];
			this.getStatusDetail(data, $activeNames, 'now');
		},
		getHisStatusDetail: function($activeNames) {
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
			} else {
				this.hisStatus.forEach(x => {
					if (x === data) {
						if (this.nowCheck !== index) {
							this.detailList = [];
							this.nowCheck = index;
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
			}
		}
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
