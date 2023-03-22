<template>
	<view class="main">
		<view id="topWnd" class="index-top">
			<!-- <view class="slogan">
				<uni-transition mode-class="slide-right" :show="isShow" :duration="500">
					<view>{{ indexTitle }}</view>
				</uni-transition>
				<uni-transition mode-class="slide-left" :show="isShow" :duration="500">
					<view class="detail">{{ slogan }}</view>
				</uni-transition>
			</view> -->
			<navigator class="search" :url="
				'../comm/search?type=' + tabItems[tabIndex].name
			" hover-class="none">
				<image src="../static/imgs/index/new/search.png" mode="aspectFit" style="width: 26rpx; height: 27rpx">
				</image>
				<view class="font">搜索商品</view>
			</navigator>

			<scroll-view class="scrollContainer" scroll-x>
				<view class="scrollitem" v-for="(item, index) in allClassifyList" :key="index" @click="goSearch(item)">
					<image class="scrollimage" v-if="item.pic" :src="imgUrl + '/img' + item.pic" mode="aspectFill">
					</image>
					<view class="recommandItemText">{{ item.name }}</view>
				</view>
			</scroll-view>
			<!-- <view class="animate-button">
				立即抢购
			</view> -->

			<swiper style="height: 248rpx;margin: 32rpx 24rpx 20rpx;" circular autoplay :duration="500">
				<swiper-item style="text-align: center;" @click="bannerClick(2)">
					<image style="width: 703rpx;height: 248rpx;" src="../static/imgs/index/new/banner01.png" mode="widthFix">
					</image>
				</swiper-item>
			</swiper>

			<view class="classify-big-container">
				<navigator :url="'../comm/search?type=' + tabItems[1].name" hover-class="none" class="classify-big-every">
					<view class="title">
						奢品包袋
					</view>
					<view class="desc">
						大品牌值得信赖
					</view>
					<view class="img">
						<image style="width: 209rpx;height: 158rpx;" src="../static/imgs/index/new/img02.png" mode="aspectFill">
						</image>
					</view>
				</navigator>
				<navigator :url="'../comm/search?type=' + tabItems[2].name" hover-class="none" class="classify-big-every">
					<view class="title">
						时尚潮物
					</view>
					<view class="desc">
						夏日时尚风
					</view>
					<view class="img">
						<image style="width: 220rpx;height: 151rpx;" src="../static/imgs/index/new/img03.png" mode="aspectFill">
						</image>
					</view>
				</navigator>
				<navigator :url="'../comm/search?type=' + tabItems[0].name" hover-class="none" class="classify-big-every">
					<view class="title">
						潮流腕表
					</view>
					<view class="desc">
						都在抢的爆款好物
					</view>
					<view class="img">
						<image style="width: 129rpx;height: 154rpx;" src="../static/imgs/index/new/img01.png" mode="aspectFill">
						</image>
					</view>
				</navigator>
			</view>

			<view class="discounts-product-container">
				<view class="discounts-top">
					<text class="title">限时优惠</text>
					<view class="top-time">
						<text style="margin-right: 16rpx;">距结束</text>
						<view class="time-every">
							{{ hourEnd }}
						</view>
						<text class="maohao">:</text>
						<view class="time-every">
							{{ minutesEnd }}
						</view>
						<text class="maohao">:</text>
						<view class="time-every">
							{{ secondsEnd }}
						</view>
					</view>
				</view>
				<scroll-view class="scrollDiscountsContainer" scroll-x>
					<view class="scroll-item" v-for="(item, index) in discountsProdoctList" :key="index">
						<!--  v-if="item.sellPrice > 1000" -->
						<navigator :url="'../jewelry/jewelryDetails?id=' + item.id" hover-class="none">
							<view v-if="item.img" class="item-img">
								<easy-loadimage :image-src="jewelryImgUrl + item.img" :scroll-top="scrollTop" border-radius="30rpx"
									mode="aspectFill"></easy-loadimage>
								<!-- <image :src="jewelryImgUrl + item.img" mode="aspectFill"></image> -->
							</view>
							<view class="item-name">{{ item.name }}</view>
							<view class="item-bottom">
								<view class="bottom-left">
									<view class="left-now">
										<text> {{ item.currency }}
											<text style="font-size: 28rpx">{{ " " + formatNumberRgx(item.sellPrice) }}</text>
										</text>
									</view>
									<view class="left-old">
										<text> {{ item.currency }}
											<text style="font-size: 28rpx">{{ item.sellPrice > 500 ? " " + formatNumberRgx(item.sellPrice - 500) :
												" " + formatNumberRgx(item.sellPrice) }}</text>
										</text>
									</view>
								</view>
								<image class="bottom-right" src="../static/imgs/index/new/car.png" mode="aspectFill">
								</image>
							</view>
						</navigator>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="tabContrl" id="tabContrl">
			<uni-transition mode-class="fade" :show="isFixed" :duration="400">
				<view :style="{
					height: statusBarHeight + 'px',
					'background-color': '#85dbd0',
				}"></view>
			</uni-transition>

			<view class="contrl">
				<view class="tab" v-for="(tab, index) in tabItems" :key="index" @click="switchTab(index)">
					<view :class="{ name: true, nameActive: tabIndex == index }">{{
						tab.name
					}}</view>
					<view :class="{ line: true, lineActive: tabIndex == index }"></view>
				</view>
			</view>
		</view>

		<view v-if="tabItems[tabIndex].id == 'J'" class="list">
			<view v-for="item in tabItems[tabIndex].list" :key="item.uuid">
				<view class="item" style="position: relative">
					<view v-if="item.img" class="img" @click="checkDetails(item)">
						<easy-loadimage :image-src="jewelryImgUrl + item.img" :scroll-top="scrollTop" border-radius="30rpx"
							mode="aspectFill"></easy-loadimage>
					</view>
					<image v-if="item.activityInfo" src="../static/imgs/details/discount.png" mode="aspectFill"
						style=" position: absolute; top: 20rpx; right: 20rpx; width: 80rpx; height: 80rpx; "></image>
					<view class="title">{{ item.productName }}</view>
					<view class="price" v-if="item.sellPrice != 0">
						<text> {{ item.currency }} <text style="font-size: 30rpx">{{ " " + formatNumberRgx(item.sellPrice) }}</text>
						</text>
					</view>
					<view class="price" style="font-size: 24rpx" v-else>价格请咨询客服</view>
				</view>
			</view>
		</view>

		<view v-if="tabItems[tabIndex].id == 'H'" class="list">
			<view v-for="(item, index3) in tabItems[tabIndex].list" :key="item.uuid">
				<view class="item">
					<view v-if="item.pic" class="img" @click="checkDetails(item)">
						<easy-loadimage class="img" :image-src="item.pic" :scroll-top="scrollTop" border-radius="30rpx"
							mode="aspectFill"></easy-loadimage>
					</view>
					<view class="title">{{ item.name }}</view>
					<view class="price" v-if="item.sellPrice != 0">
						<text> {{ item.indiCurrency }} <text style="font-size: 30rpx">{{ " " + formatNumberRgx(item.priceIndi)
						}}</text>
						</text>
					</view>
					<view class="price" style="font-size: 24rpx" v-else>价格请咨询客服</view>
				</view>
			</view>
		</view>

		<view v-if="tabItems[tabIndex].id == 'W'" class="list">
			<view v-for="(item, index3) in tabItems[tabIndex].list" :key="item.uuid">
				<view class="item">
					<view v-if="item.pics" class="img" @click="checkDetails(item)">
						<easy-loadimage class="img" :image-src="item.pics" :scroll-top="scrollTop" border-radius="30rpx"
							mode="aspectFill"></easy-loadimage>
					</view>
					<view class="title">{{ getShowTitle(item) }}</view>
					<view class="title" style="margin-top: 10rpx;">{{ item.model }}</view>
					<view v-if="item.price != 0" class="price">
						<text> HKD <text style="font-size: 30rpx">{{ " " + formatNumberRgx(item.price) }}</text> </text>
					</view>
					<view v-else class="price" style="font-size: 24rpx">价格请咨询客服</view>
				</view>
			</view>
		</view>

		<view>
			<view class="downloadApp" v-if="isMobile" @click="downloadApk">
				<image class="downloadApp-img" src="../static/imgs/common/logo.png" mode="aspectFill"></image>
				<view class="downloadApp-font"> 下载APP </view>
				<navigator url="../comm/openWechat" hover-class="none" v-if="isWechat">
					<view class="downloadApp-font" style="margin-top: 20rpx">
						打开小程序
					</view>
				</navigator>
			</view>
			<view class="jump" v-if="isJump == 1" @click="cancelJump">
				<image src="../static/imgs/common/jump.png" mode="aspectFill"></image>
				<view class="jump-top">
					<text style="margin-right: 5px">点击右上方的</text>
					<view class="jump-circle"></view>
					<view class="jump-circle"></view>
					<view class="jump-circle"></view>
					<text style="margin-left: 5px">按钮</text>
				</view>
				<view class="jump-bottom"> 选择在浏览器中打开 </view>
			</view>
			<view class="downloadSel" v-if="isJump == 2">
				<view class="sel-bottom">
					<image src="../static/imgs/index/iphone.png" mode="aspectFill"></image>
					<image src="../static/imgs/index/android.png" mode="aspectFill"></image>
					<text @click="downloadClick">点击下载APP</text>
				</view>
				<view class="sel-close">
					<image src="../static/imgs/index/close.png" mode="aspectFill" @click="cancelJump"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0,
			initType: "",
			isShow: false,
			imgUrl: this.$baseUrl + "/wechat/api",
			modelList: [],
			tagList: [],
			brandList: [],
			allClassifyList: [],

			statusBarHeight: 0,
			slogan: "",
			indexTitle: "",
			//设置默认的分享参数
			share: {
				title: "PAULIANA 宝莉安娜高级珠宝",
				path: "/pages/index",
				imageUrl: "",
				desc: "",
				content: "",
			},
			isMobile: false,
			isWechat: false,
			isJump: 0,

			tabItems: [{
				name: "腕表",
				id: "W",
				page: 1,
				list: [],
				pageScroll: 0,
			},
			{
				name: "爱马仕",
				id: "H",
				page: 1,
				list: [],
				pageScroll: 0,
			},
			{
				name: "珠宝",
				id: "J",
				page: 1,
				list: [],
				pageScroll: 0,
			},
			],
			tabIndex: 0,
			cacheTab: [],
			jewelryImgUrl: this.$baseUrl + "/jewellery/api",
			isFixed: false,
			isLoadMore: true,
			type: [
				"slide-in-right",
				"slide-in-left", //	slide-out-left	新窗体从左侧进入
				"slide-in-top", //	slide-out-top	新窗体从顶部进入
				"slide-in-bottom", //	slide-out-bottom	新窗体从底部进入
				"pop-in", //	pop-out	新窗体从左侧进入，且老窗体被挤压而出
				"fade-in", //	fade-out	新窗体从透明到不透明逐渐显示
				"zoom-out", //	zoom-in	新窗体从小到大缩放显示
				"zoom-fade-out", //	zoom-fade-in	新窗体从小到大逐渐放大并且从透明到不透明逐渐显示
				"none",
			],
			typeIdx: 0,
			topWndHeight: 0,

			hourEnd: '00',
			minutesEnd: '00',
			secondsEnd: '00',
			discountsProdoctList: [],

		};
	},
	onShow() {
		if (window) {
			console.log("平台");
			this.isMobile = true;
			let ua = window.navigator.userAgent.toLowerCase();
			if (
				ua.match(/MicroMessenger/i) == "micromessenger" ||
				ua.match(/_SQ_/i) == "_sq_"
			) {
				this.isWechat = true;
			} else {
				this.isWechat = true;
			}
		} else {
			this.isMobile = false;
		}
		if (getApp().globalData.g_chat)
			getApp().globalData.g_chat.updateReddot();
	},
	// onShow
	onLoad(e) {
		this.getTime();

		let initType = e.t;
		if (!initType) initType = "";
		initType = initType.toUpperCase();

		let initSel = e.s;
		if (!initSel) initSel = "";
		initSel = initSel.toUpperCase();

		this.initType = initType;
		uni.setStorageSync("initType", initType);
		this.getNewTabItem(initType);
		this.getnewTabIdx(initSel);

		uni.getSystemInfo({
			success: (data) => {
				this.statusBarHeight = data.statusBarHeight;
			},
		});

		this.getInfo();
		this.getList(0);
		this.getList(1);
		this.getList(2);
	},
	onPullDownRefresh() {
		this.getInfo();
		this.getList(0);
		this.getList(1);
		this.getList(2);
		uni.stopPullDownRefresh();
	},
	onReachBottom() { },
	onReady() {
		this.hidePageNavInWechatBrowser();
	},
	// 分享好友
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			desc: this.share.desc,
			content: this.share.content,
			success: (res) => {
				uni.showToast({
					title: "分享成功",
					icon: "none",
				});
			},
			fail: (res) => {
				uni.showToast({
					title: "分享失败",
					icon: "none",
				});
			},
		};
	},
	// 分享朋友圈
	onShareTimeline(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			desc: this.share.desc,
			content: this.share.content,
			success: (res) => {
				uni.showToast({
					title: "分享成功",
					icon: "none",
				});
			},
			fail: (res) => {
				uni.showToast({
					title: "分享失败",
					icon: "none",
				});
			},
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
		this.tabItems[this.tabIndex].pageScroll = e.scrollTop;

		// console.log(this.tabIndex, parseInt(e.scrollTop));
		const query = uni.createSelectorQuery().in(this);
		query
			.select("#topWnd")
			.boundingClientRect((data) => {
				this.topWndHeight = data.bottom - data.top;
				if (data.bottom <= 0) this.isFixed = true;
				else this.isFixed = false;
			})
			.exec();
	},
	onReachBottom() {
		this.loadMore();
	},
	methods: {
		bannerClick(index) {
			uni.navigateTo({
				url: '../comm/search?type=' + this.tabItems[index].name
			})
		},
		// 活动倒计时
		getTime() {
			let expireTime = Number(Date.parse(new Date()) + (72 * 3600 * 1000));

			setInterval(() => {
				//订单过期时候的时间戳，或者是一个其它时间，这里灵活处理
				let houtime = Number(expireTime - Date.parse(new Date())) / 1000; //秒
				this.timeStamp(houtime);
			}, 1000)
		},
		timeStamp(second_time) {
			if (second_time <= 0) {
				return;
			}

			if (parseInt(second_time) > 60) {
				let second = parseInt(second_time) % 60;
				let min = parseInt(second_time / 60);
				let hour = 0;

				if (min > 60) {
					min = parseInt(second_time / 60) % 60;
					hour = parseInt(parseInt(second_time / 60) / 60);
				}
				hour = hour > 9 ? hour : '0' + hour;
				min = min > 9 ? min : '0' + min;
				second = second > 9 ? second : '0' + second;

				this.hourEnd = hour;
				this.minutesEnd = min;
				this.secondsEnd = second;
			}
		},

		scroll() { },
		getNewTabItem(id) {
			let tabs = [];
			for (let i = 0; i < this.tabItems.length; ++i) {
				if (this.tabItems[i].id == id) {
					tabs.push(this.tabItems[i]);
					break;
				}
			}

			if (tabs.length > 0) this.tabItems = tabs;
		},
		getnewTabIdx(id) {
			for (let i = 0; i < this.tabItems.length; ++i) {
				if (this.tabItems[i].id == id) {
					this.tabIndex = i;
					break;
				}
			}
		},
		// 点击下载
		downloadApk() {
			if (window) {
				let ua = window.navigator.userAgent.toLowerCase();
				if (
					ua.match(/MicroMessenger/i) == "micromessenger" ||
					ua.match(/_SQ_/i) == "_sq_"
				) {
					this.isJump = 1;
				} else {
					this.isJump = 2;
				}
			}
		},
		// 下载app
		downloadClick() {
			this.isJump = 0;
			uni.showLoading({
				title: "APP后台下载中...",
			});
			setInterval(() => {
				uni.hideLoading();
			}, 1500);

			let type = uni.getSystemInfoSync().platform;
			let req = {
				type: type,
			};
			uni.request({
				url: this.$baseUrl + "/wechat/api/versionGet",
				data: req,
				complete: (res) => {
					console.log("下载");
					console.log(res);

					let list = res.data.url.split("/");
					let name = list[list.length - 1];
					console.log(name);

					if (this.browserIsIe()) {
						//假如是ie浏览器
						let elemIF = document.createElement("iframe");
						elemIF.src = res.data.url;
						elemIF.style.display = "none";
						document.body.appendChild(elemIF);
					} else {
						const a = document.createElement("a");
						// a.setAttribute('target', '_blank');
						a.setAttribute("href", res.data.url);
						a.setAttribute("download", name);
						a.click();
					}
				},
			});
		},
		//判断是否为ie浏览器
		browserIsIe() {
			if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
			else return false;
		},
		// 取消在浏览器打开
		cancelJump() {
			this.isJump = 0;
		},
		goSearch(item) {
			if (item.type == 'brand') {
				this.brandCheck(item.name)
			}
			if (item.type == 'model') {
				this.modelCheck(item.name)
			}
			if (item.type == 'tag') {
				this.labelCheck(item.name)
			}
		},
		// 查看该品牌下的手表
		brandCheck(brand) {
			uni.navigateTo({
				url: "../comm/search?brand=" +
					encodeURIComponent(JSON.stringify(brand)) +
					"&type=腕表",
			});
		},
		// 查看该包款下的包包
		modelCheck(model) {
			console.log(model);
			uni.navigateTo({
				url: "../comm/search?model=" +
					encodeURIComponent(JSON.stringify(model)) +
					"&type=爱马仕",
			});
		},
		// 查看该标签下的珠宝
		labelCheck(label) {
			console.log(label);
			uni.navigateTo({
				url: "../comm/search?tag=" + label + "&type=珠宝",
				//animationType: this.type[this.typeIdx]
			});
		},
		// 查看包包详情
		checkDetails(item) {
			if (this.tabItems[this.tabIndex].id == "J") {
				uni.navigateTo({
					url: "../jewelry/jewelryDetails?id=" + item.id,
				});
			} else if (this.tabItems[this.tabIndex].id == "H") {
				uni.navigateTo({
					url: "../hermes/details?id=" + item.id,
				});
			} else if (this.tabItems[this.tabIndex].id == "W") {
				uni.navigateTo({
					url: "../watch/detail?id=" + item.id,
				});
			}
		},
		getList(index) {
			if (this.tabItems[index].id == "J") this.getJewelryList(index);
			else if (this.tabItems[index].id == "H") this.getBagList(index);
			else if (this.tabItems[index].id == "W") this.getWatchList(index);
		},
		getJewelryList(index) {
			uni.showLoading({
				title: "加载中......",
			});
			uni.request({
				method: "POST",
				url: this.$baseUrl +
					"/jewellery/api/jewellerySearch?pageNum=10&page=" +
					this.tabItems[index].page,
				header: {
					"content-type": "application/json",
				},
				data: {
					keyword: "",
					tag: "",
					sort: "",
				},
				complete: (res) => {
					console.log('珠宝数据', res);
					uni.hideLoading();

					this.discountsProdoctList = res.data.list;

					let list = this.tabItems[index].list.concat(res.data.list);
					for (let i = 0; i < list.length; ++i) {
						list[i].uuid = this.tabItems[index].id + i;
					}
					this.tabItems[index].list = list;

					setTimeout(() => {
						this.scrollTop++;
					}, 500);
				},
			});
		},
		getBagList(index) {
			uni.showLoading({
				title: "加载中......",
			});
			uni.request({
				method: "POST",
				url: this.$baseUrl + "/wechat/api/modelSearch",
				header: {
					"content-type": "application/json",
				},
				data: {
					page: this.tabItems[index].page,
					pageNum: 10,
				},
				complete: (res) => {
					uni.hideLoading();

					let list = this.tabItems[index].list.concat(res.data);
					for (let i = 0; i < list.length; ++i) {
						list[i].uuid = this.tabItems[index].id + i;
					}
					this.tabItems[index].list = list;

					setTimeout(() => {
						this.scrollTop++;
					}, 500);
				},
			});
		},
		getWatchList(index) {
			uni.showLoading({
				title: "加载中......",
			});
			uni.request({
				method: "POST",
				url: this.$baseUrl + "/watch/api/watchSearch",
				header: {
					"content-type": "application/json",
				},
				data: {
					page: this.tabItems[index].page,
					pageNum: 10,
				},
				complete: (res) => {
					console.log('手表列表', res);
					uni.hideLoading();

					let list = res.data.data;
					for (let i = 0; i < list.length; ++i) {
						if (list[i].pics.length == 0) {
							list[i].pics = '~@/static/imgs/common/nopic.jpg';
						} else {
							list[i].pics = this.$baseUrl + "/watch/api" + list[i].pics;
						}
					}
					list = this.tabItems[index].list.concat(list);
					for (let i = 0; i < list.length; ++i) {
						list[i].uuid = this.tabItems[index].id + i;
					}
					this.tabItems[index].list = list;


					console.log(list);

					setTimeout(() => {
						this.scrollTop++;
					}, 500);
				},
			});
		},
		// 获取数据列表
		getInfo() {
			uni.showLoading({
				title: "加载中......",
			});
			uni.request({
				url: this.$baseUrl + "/wechat/api/indexMsgGet",
				header: {
					"content-type": "application/json",
				},
				data: {
					page: 1,
					pageNum: 10,
				},
				complete: (res) => {
					uni.hideLoading();

					console.log("首页数据");
					console.log(res);

					this.modelList = res.data.modelList;
					this.tagList = res.data.tagList;
					this.brandList = res.data.brandList;

					this.allClassifyList = [];
					let list1 = this.modelList.map(item => {
						return {
							pic: item.pic,
							name: item.model,
							type: 'model'
						}
					});
					let list2 = this.brandList.map(item => {
						return {
							pic: item.pic,
							name: item.brand,
							type: 'brand'
						}
					})
					let list3 = this.tagList.map(item => {
						return {
							pic: item.pic,
							name: item.name,
							type: 'tag'
						}
					})
					this.allClassifyList = list2.concat(list1).concat(list3);


					this.slogan = res.data.slogan;
					this.indexTitle = res.data.title;

					this.isShow = true;
				},
			});
		},
		loadMore() {
			// setTimeout(() => {
			if (this.isLoadMore) {
				++this.tabItems[this.tabIndex].page;
				this.getList(this.tabIndex);
			}
			//}, 500)
		},
		switchTab(index) {
			if (this.tabItems[index].list.length === 0) {
				this.getList(index);
			}

			let isScroll = -1;
			if (this.tabIndex != index) {
				isScroll = this.tabItems[index].pageScroll;
			}

			this.tabIndex = index;
			this.isLoadMore = false;
			this.scrollTop++;

			setTimeout(() => {
				this.scrollTop++;
			}, 100);

			setTimeout(() => {
				if (isScroll > -1) {
					uni.pageScrollTo({
						scrollTop: isScroll < this.topWndHeight ? this.topWndHeight : isScroll,
						duration: 0,
					});
				}
				this.scrollTop++;
				this.isLoadMore = true;
			}, 200);
		},
		getShowTitle(item) {
			if (item.series && item.series != '其他') {
				return item.brand + ' - ' + item.series;
			} else {
				return item.brand;
			}
		}
	},
};
</script>

<style lang="scss" scoped>
.main {
	background: url('../static/imgs/index/indexBack.png') no-repeat;
	// background-size: 750rpx 769rpx;
	background-size: 100% 1000rpx;

	.slogan {
		padding: 130rpx 30rpx 0rpx 30rpx;
		font-size: 48rpx;

		.detail {
			color: #6b8481;
			font-size: 20rpx;
			font-style: oblique;
			margin-top: 30rpx;
		}
	}

	.index-top {
		padding-top: 130rpx;

		.search {
			// margin: 50rpx 30rpx 60rpx 30rpx;
			margin: 0 24rpx 60rpx 24rpx;
			padding: 0 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			// height: 80rpx;
			// line-height: 80rpx;
			height: 66rpx;
			line-height: 66rpx;
			background-color: #ffffff;
			border-radius: 30px;
			font-size: 28rpx;
			// color: #6b8481;
			color: #AFBCBA;

			.font {
				margin-left: 14rpx;
				font-size: 24rpx;
			}
		}

		// 容器

		::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
		}

		.scrollContainer {
			width: 100%;
			margin-left: 40rpx;
			height: fit-content;
			white-space: nowrap;

			// 容器项
			.scrollitem {
				display: inline-block;
				margin-right: 40rpx;
				height: fit-content;

				.scrollimage {
					width: 96rpx;
					height: 96rpx;
					border-radius: 50%;
				}

				.recommandItemText {
					width: 96rpx;
					font-size: 24rpx;
					color: #4F4F4F;
					text-align: center;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}

		}

		/* 按钮动画效果 */
		.animate-button {
			width: 250rpx;
			margin: 0 auto;
			padding: 20rpx 30rpx;
			background-color: #FE7722;
			color: #fff;
			font-size: 26rpx;
			font-weight: bold;
			letter-spacing: 2rpx;
			border-radius: 60rpx;
			text-align: center;
			-webkit-animation: free_download 0.5s linear alternate infinite;
			animation: free_download 0.5s linear alternate infinite;
		}

		@-webkit-keyframes free_download {
			0% {
				-webkit-transform: scale(0.9);
			}

			100% {
				-webkit-transform: scale(1);
			}
		}

		@keyframes free_download {
			0% {
				transform: scale(0.9);
			}

			100% {
				transform: scale(1);
			}
		}


		.classify-big-container {
			padding: 0 24rpx;
			display: flex;
			justify-content: space-between;

			.classify-big-every {
				width: 220rpx;
				height: 270rpx;
				padding-top: 34rpx;
				background-color: #fff;
				border-radius: 30rpx;
				text-align: center;

				.title {
					color: #000;
					font-weight: bold;
					font-size: 28rpx;
				}

				.desc {
					margin-top: 20rpx;
					color: #666666;
					font-size: 20rpx;
				}

				.img {
					margin-top: 17rpx;
				}
			}
		}

		.discounts-product-container {
			margin: 20rpx 24rpx 0;
			padding: 39rpx 0 30rpx 31rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.discounts-top {
				padding-right: 26rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					font-size: 32rpx;
					font-weight: bold;
					color: #000;
				}

				.top-time {
					display: flex;
					align-items: center;
					color: #666666;
					font-size: 24rpx;

					.time-every {
						margin-left: 6rpx;
						padding: 6rpx;
						background-color: #323140;
						color: #fff;
						border-radius: 6rpx;
					}

					.maohao {
						margin-left: 6rpx;
					}
				}
			}

			.scrollDiscountsContainer {
				width: 100%;
				height: fit-content;
				margin-top: 40rpx;
				white-space: nowrap;

				.scroll-item {
					width: 236rpx;
					height: fit-content;
					margin-right: 40rpx;
					display: inline-block;

					.item-img {
						height: 264rpx;
						// padding: 15rpx 0;
						border: 4rpx #E4E4E4 solid;
						border-radius: 30rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.item-name {
						margin-top: 34rpx;
						color: #000;
						font-size: 24rpx;
					}

					.item-bottom {
						padding-right: 10rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.bottom-left {
							.left-now {
								font-size: 22rpx;
								font-weight: bold;
								color: #FF7821;
							}

							.left-old {
								font-size: 22rpx;
								color: #BFBFBF;
								text-decoration: line-through;
							}
						}

						.bottom-right {
							width: 46rpx;
							height: 46rpx;
						}
					}
				}
			}
		}
	}

	.tabContrl {
		background-color: #ffffff;
		position: sticky;
		top: 0rpx;
		z-index: 980;

		.contrl {
			display: flex;
			padding: 48rpx 30rpx 30rpx 30rpx;
			border-bottom: 1rpx solid #f5f8f7;

			.tab {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 66rpx;

				.name {
					font-size: 30rpx;
					color: #e0e0e0;
				}

				.nameActive {
					color: #2b2d2f;
					font-size: 36rpx;
					font-weight: bold;
				}

				.line {
					width: 24rpx;
					height: 10rpx;
					border-radius: 5rpx;
					margin-top: 10rpx;
				}

				.lineActive {
					background-color: #85dbd0;
				}
			}
		}
	}

	.list {
		padding: 20rpx;
		display: grid;
		justify-content: space-between;
		grid-template-columns: repeat(auto-fill, 344rpx);
		grid-gap: 20rpx;
		//background-color: #FDFDFD;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;

		.item {
			padding: 20rpx;
			border-radius: 40rpx;
			//background-color: #0055ff;
			margin-bottom: 20rpx;
			box-shadow: 0px -5px 0 0 #ffffff, -10rpx 0px 20rpx 0 #f9f9f9,
				10rpx 0px 20rpx 0 #f9f9f9, 0px 20rpx 30rpx 0 #f9f9f9;

			.img {
				width: 304rpx;
				height: 304rpx;
				border-radius: 30rpx;
			}

			.title {
				margin-top: 28rpx;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.note {
				margin-top: 18rpx;
				font-size: 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.price {
				margin-top: 22rpx;
				font-size: 22rpx;
				color: #ff8b62;
				//font-weight: bold;
			}
		}
	}

	.downloadApp {
		position: fixed;
		bottom: 120px;
		right: 40rpx;
		text-align: center;
		z-index: 990;

		.downloadApp-img {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}

		.downloadApp-font {
			padding: 8rpx 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			// background-color: #ff7f22;
			background-color: #85dbd0;
			border-radius: 30px;
			color: #fff;
		}
	}

	.jump {
		width: 100%;
		height: 100vh;
		background-color: rgba($color: #000000, $alpha: 0.7);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		text-align: center;

		image {
			width: 481rpx;
			height: 352rpx;
			margin: 0 auto;
			margin-top: 150rpx;
			margin-right: 50rpx;
		}

		.jump-top {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
			font-size: 26rpx;
			color: #fff;

			.jump-circle {
				width: 5px;
				height: 5px;
				margin: 0 2px;
				border-radius: 50%;
				background-color: #fff;
			}
		}

		.jump-bottom {
			margin-top: 5px;
			font-size: 26rpx;
			color: #fff;
		}
	}

	.downloadSel {
		width: 100%;
		height: 100vh;
		background-color: rgba($color: #000000, $alpha: 0.7);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;

		.sel-top {
			width: 462rpx;
			height: 232rpx;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			text-align: center;
			background: url(../static/imgs/index/back01.png) no-repeat;
			background-size: 100%;

			image {
				width: 150rpx;
				height: 150rpx;
				margin: 0 auto;
			}

			.top-font {
				font-size: 28rpx;
				font-weight: bold;
			}
		}

		.sel-bottom {
			width: 462rpx;
			height: 232rpx;
			margin: 0 auto;
			margin-top: 18rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: url(../static/imgs/index/back02.png) no-repeat;
			background-size: 100%;

			image {
				width: 58rpx;
				height: 57rpx;
				margin-right: 20rpx;
			}

			text {
				font-weight: bold;
				font-size: 30rpx;
				color: #ff7822;
				border-bottom: 4rpx solid #ff7822;
			}
		}

		.sel-close {
			margin-top: 100rpx;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
}
</style>
