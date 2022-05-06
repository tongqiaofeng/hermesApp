<template>
	<view class="commodity">
		<view v-if="haveData == 0" class="no-data">
			<image src="../static/imgs/common/no.png" mode="aspectFill"></image>
			<text style="font-size: 30rpx">暂无浏览记录~</text>
		</view>
		<view v-else>
			<view class="title">
				<text>{{ "共" + goodsnum + "件商品" }}</text>
				<text style="font-size: 26rpx;" @click="isCheckBox">编辑</text>
			</view>
			<checkbox-group @change="checkChange" style="padding-top: 120rpx;">
				<view class="commoditybox" v-for="(item, index) in favoriteslist" :key="index">
					<label v-show="isSelect == 1" class="box-check">
						<checkbox :value="item.id" :checked="item.checked" color="#85dbd0"
							style="transform: scale(0.7)" />
					</label>
					<view class="box-left" @click="navto(item.id)">
						<image v-if="item.pic" :src="item.pic" mode="aspectFill"></image>
					</view>
					<view class="box-right" @click="navto(item.id)">
						<view class="name">{{ item.model + " " + item.size }}</view>
						<view class="price">{{ item.currency + " " + formatNumberRgx(item.hkdPriceIndi) }}
						</view>
					</view>
					<view class="closeicon" v-if="item.sold == 3 || item.sold == 4">
						<image src="../static/imgs/common/sold.png" mode="aspectFill"></image>
					</view>
					<view class="delIcon">
						<image src="../static/imgs/collect/del.png" mode="aspectFill" @click="bindClick(item.id)">
						</image>
					</view>
				</view>
			</checkbox-group>
			<view class="bottom">没有更多了~</view>
			<!-- 全选按钮 -->
			<view class="allCheck" v-if="isSelect == 1">
				<checkbox-group @change="changeBook">
					<label>
						<view>
							<checkbox color="#85dbd0" style="transform: scale(0.7)" :checked="allFlag.checked"
								:value="allFlag.cb" />
							全选
						</view>
					</label>
				</checkbox-group>
				<view @click="clickclose">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				haveData: 1,
				goodsnum: 0,
				page: 1,
				favoriteslist: [],

				isSelect: 0,
				allFlag: {
					value: "cb",
					checked: false,
				},
				selList: [],
			};
		},
		onLoad() {
			this.favorites();
		},
		filters: {
			picsfilter(str) {
				if (str.indexOf("|") !== -1) {
					return str.substring(0, str.indexOf("|"));
				} else {
					return str;
				}
			},
		},
		onPullDownRefresh() {
			this.favoriteslist = [];
			this.favorites();
			uni.stopPullDownRefresh();
		},
		methods: {
			bindClick(e) {
				console.log(e);
				this.selList = [];
				this.selList.push(e);
				this.clickclose();
			},
			// 是否选中
			checkChange(e) {
				console.log("是否选中");
				console.log(e);

				let values = e.detail.value;
				this.selList = values;
				for (let i = 0; i < this.favoriteslist.length; ++i) {
					const item = this.favoriteslist[i];
					if (values.includes(item.id)) {
						this.$set(item, "checked", true);
					} else {
						this.$set(item, "checked", false);
					}
				}
				//  商品是否全部勾选，判断全选与否状态
				let allChecks = values.length == this.favoriteslist.length;
				allChecks
					?
					this.$set(this.allFlag, "checked", true) :
					this.$set(this.allFlag, "checked", false);
			},
			// 全选或者反选 checkbox
			changeBook(e) {
				console.log("全选否");
				console.log(e);
				this.selList = [];
				if (e.detail.value.length == 0) {
					this.favoriteslist.map((item) => this.$set(item, "checked", false));
					this.$set(this.allFlag, "checked", false);
				} else {
					this.favoriteslist.map((item) => {
						this.$set(item, "checked", true);
						this.selList.push(item.id);
					});
					this.$set(this.allFlag, "checked", true);
				}
				console.log(this.selList);
			},
			// 是否显示多选框
			isCheckBox() {
				if (this.isSelect == 0) {
					this.isSelect = 1;
				} else if (this.isSelect == 1) {
					this.isSelect = 0;
				}
			},
			// 获取浏览记录列表
			favorites() {
				uni.showLoading({
					title:"加载中..."
				})
				uni.request({
					url: this.$baseUrl + "/browseRecords/?page=1",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						uni.hideLoading();
						
						console.log("浏览足迹列表");
						console.log(res.data);
						
						this.favoriteslist = res.data.list;
						this.goodsnum = res.data.total;
						
						if(this.favoriteslist.length == 0){
							this.haveData = 0;
						}else{
							this.haveData = 1;
						}
					},
				});
			},
			// 删除
			clickclose(id) {
				uni.request({
					method: "DELETE",
					url: this.$baseUrl + "/browseRecordDel",
					data: {
						stockIdList: this.selList,
					},
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					success: (res) => {
						console.log(res.data);
						this.favoriteslist = [];
						uni.showToast({
							title: "删除成功",
							icon: "none",
						});
						this.favorites();
					},
					fail: (err) => {
						uni.showToast({
							title: err.data.message,
							icon: "none",
						});
					},
				});
			},
			navto(id) {
				console.log('查看')
				console.log(this.isSelect)
				if (this.isSelect == 0) {
					uni.navigateTo({
						url: "../commonPackage/details?id=" + id,
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.commodity {
		padding: 0 40rpx 0 40rpx;
		background-color: #fff;

		.title {
			height: 100rpx;
			padding: 0 40rpx;
			position: fixed;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 22rpx;
			background-color: #fff;
			z-index: 999;
		}

		.commoditybox {
			margin-bottom: 40rpx;
			display: flex;
			align-items: center;
			position: relative;
			box-shadow: -1px 5px 10px 2px #f6f6f7;
			border-radius: 30rpx;

			.box-check {
				margin-left: 10rpx;
			}

			.box-left {
				width: 180rpx;
				height: 174rpx;
				padding: 20rpx 0 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			
				image {
					width: 100%;
					height: 100%;
					border-radius:30rpx;
				}
			}
			
			.box-right {
				padding: 25rpx 20rpx 30rpx 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			
				.name {
					margin-bottom: 20rpx;
					font-size: 24rpx;
				}
			
				.price {
					font-size: 26rpx;
					color: #ff8b62;
				}
			}
			
			.closeicon {
				position: absolute;
				right: 20rpx;
				bottom: 20rpx;
				color: #ef5b5b;
				font-size: 28rpx;
				
				image{
					width: 124rpx;
					height: 103rpx;
				}
			}
			
			.delIcon {
				position: absolute;
				top: 20rpx;
				right: -20rpx;
				color: #ef5b5b;
				font-size: 28rpx;
			
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.bottom {
			padding-bottom: 140rpx;
			font-size: 24rpx;
			color: #e3e3e3;
			text-align: center;
			font-size: 30rpx
		}

		.allCheck {
			height: 100rpx;
			padding: 0 40rpx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #f9f9f9;
			font-size: 28rpx;
		}
	}
</style>
