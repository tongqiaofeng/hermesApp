<template>
		<view class="main">
			<view id="topWnd">
				<view class="slogan">
					<uni-transition mode-class="slide-right" :show="isShow" :duration="500">
						<view >{{indexTitle}}</view>
					</uni-transition>
					<uni-transition mode-class="slide-left" :show="isShow" :duration="500">
						<view class="detail">{{slogan}}</view>
					</uni-transition>
					<!-- <view class="detail">{{ slogan }}</view> -->
				</view>
				
				<navigator class="search" :url="'../../commonPackage/search/search?type=' + tabItems[tabIndex].name" hover-class="none">
					<view> 搜索商品 </view>
					<image src="../../static/imgs/index/search.png" mode="aspectFit" style="width: 29rpx; height: 30rpx;"></image>
				</navigator> 
				
				<!-- <input type="text" value="" v-model="typeIdx" placeholder="请输入文本"/> -->
				
				<uni-transition modeClass="zoom-in" :show="isShow" :duration="500">
					<view style=" padding-bottom: 13rpx;">
						<view class="menuList" v-if="initType == '' || initType == 'J'">
							<view class="item" v-for="(item, index) in tagList" :key="index" @click="labelCheck(item.name)">	
								<image class="img" v-if="item.pic" :src="imgUrl + '/img' + item.pic" mode="aspectFill"></image>
								<view class="name">{{ item.name }} </view>
							</view>
						</view>
						<view class="menuList" v-if="initType == '' || initType == 'H'">
							<view class="item" v-for="(item, index) in modelList" :key="index" @click="modelCheck(item.model)">
								<image class="img" v-if="item.pic" :src="imgUrl + '/img' + item.pic" mode="aspectFill"></image>
								<view class="name">{{ item.model }} </view>
							</view>
						</view>
					</view>
				</uni-transition>
				
				<view style="height: 20rpx; background-color: #F5f8f7"></view>
			</view>
			
			
			<view class="tabContrl" id="tabContrl">
				<uni-transition mode-class="fade" :show="isFixed" :duration="400">
					<view :style="{ height: statusBarHeight + 'px', 'background-color': '#85dbd0'}"></view>
				</uni-transition>
				 
				<view class="contrl">
					<view class="tab" v-for="(tab, index) in tabItems" :key="index" @click="switchTab(index)">
						 <view :class="{'name':true, 'nameActive': tabIndex == index}">{{tab.name}}</view>
						 <view :class="{'line':true, 'lineActive': tabIndex == index}"></view>
					</view>
				</view>
			 </view>
			 
			 
			 <view v-if="tabItems[tabIndex].id == 'J'" class="list">
				 <view v-for="(item, index2) in tabItems[tabIndex].list" :key="item.uuid">
					 <view class="item" style="position: relative;">
					 
					 	<view v-if="item.img" class="img" @click="checkDetails(item)">
					 		<easy-loadimage :image-src="jewelryImgUrl + item.img" :scroll-top="scrollTop" border-radius="30rpx" mode="aspectFill"></easy-loadimage>
					 	</view>
					 	<image v-if="item.activityInfo" src="../../static/imgs/details/discount.png" mode="aspectFill" style="position: absolute; top:20rpx; right: 20rpx; width: 80rpx; height: 80rpx;"></image>
					 	<view class="title">{{item.productName}}</view>
					 	<view class="price" v-if="item.sellPrice != 0">
					 		<text >
					 			{{ item.currency }}
					 			<text style="font-size: 30rpx">{{" " + formatNumberRgx(item.sellPrice)}}</text>
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
					 		<easy-loadimage class="img" :image-src="item.pic" :scroll-top="scrollTop" border-radius="30rpx" mode="aspectFill"></easy-loadimage>
					 	</view>
					 	<view class="title">{{getItemName(item, index3)}}</view>
					 	<view class="price" v-if="item.sellPrice != 0">
					 		<text>
					 			HKD
					 			<text style="font-size: 30rpx">{{" " + formatNumberRgx(item.priceIndi)}}</text>
					 		</text>
					 	</view>
					 	<view class="price" style="font-size: 24rpx" v-else>价格请咨询客服</view>
					 </view>
				</view>
			 </view>
			 
			
			
			<view>
				<view class="downloadApp" v-if="isMobile" @click="downloadApk">
					<image class="downloadApp-img" src="../../static/imgs/common/logo.png" mode="aspectFill"></image>
					<view class="downloadApp-font"> 下载APP </view>
					<navigator url="../../commonPackage/openWechat" hover-class="none" v-if="isWechat">
						<view class="downloadApp-font" style="margin-top: 20rpx;"> 打开小程序 </view>
					</navigator>
				</view>
				<view class="jump" v-if="isJump == 1" @click="cancelJump">
					<image src="../../static/imgs/common/jump.png" mode="aspectFill"></image>
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
						<image src="../../static/imgs/index/iphone.png" mode="aspectFill"></image>
						<image src="../../static/imgs/index/android.png" mode="aspectFill"></image>
						<text @click="downloadClick">点击下载APP</text>
					</view>
					<view class="sel-close">
						<image src="../../static/imgs/index/close.png" mode="aspectFill" @click="cancelJump"></image>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	
	export default {
		data() {
			return {
				scrollTop:0,
				initType:'',
				isShow: false,
				imgUrl: this.$baseUrl,
				modelList: [],
				tagList: [],

				statusBarHeight:0,
				slogan: "",
				indexTitle: "",
				//设置默认的分享参数
				share: {
					title: "PAULIANA 宝莉安娜高级珠宝",
					path: "/pages/index/index",
					imageUrl: "",
					desc: "",
					content: "",
				},
				isMobile: false,
				isWechat: false,
				isJump: 0,
				
				tabItems: [
					{
						name:'珠宝',
						id:'J',
						page:1,
						list:[],
						pageScroll: 0,
					},
					{
						name:'爱马仕',
						id:'H',
						page:1,
						list:[],
						pageScroll: 0,
					}
				],
				tabIndex: 0,
				cacheTab: [],
				jewelryImgUrl: this.$baseJewelleryUrl,
				isFixed:false,
				type:[
					'slide-in-right',
					'slide-in-left',//	slide-out-left	新窗体从左侧进入
					'slide-in-top',//	slide-out-top	新窗体从顶部进入
					'slide-in-bottom',//	slide-out-bottom	新窗体从底部进入
					'pop-in',//	pop-out	新窗体从左侧进入，且老窗体被挤压而出
					'fade-in',//	fade-out	新窗体从透明到不透明逐渐显示
					'zoom-out',//	zoom-in	新窗体从小到大缩放显示
					'zoom-fade-out',//	zoom-fade-in	新窗体从小到大逐渐放大并且从透明到不透明逐渐显示
					'none'
				],
				typeIdx:0,
				topWndHeight: 0,
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
			this.chat_updateReddot();
		},
		// onShow
		onLoad(e) {
			let initType = e.t;
			if(!initType) initType = '';
			initType = initType.toUpperCase();
			
			let initSel = e.s;
			if(!initSel) initSel = '';
			initSel = initSel.toUpperCase();
			
			this.initType = initType;
			uni.setStorageSync('initType', initType);
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
		},
		onPullDownRefresh() {
			this.getInfo();
			this.getList(0);
			this.getList(1);
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			
		},
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
		onPageScroll(e){
			this.scrollTop = e.scrollTop;
			this.tabItems[this.tabIndex].pageScroll = e.scrollTop;
			
			console.log(this.tabIndex, parseInt(e.scrollTop));
			const query = uni.createSelectorQuery().in(this);
			query.select('#topWnd').boundingClientRect(data => {
				this.topWndHeight = data.bottom - data.top;
				if(data.bottom <= 0 )
					this.isFixed = true;
				else
					this.isFixed = false;
					
			}).exec();
		},
		onReachBottom()
		{
			this.loadMore();
		},
		methods: {
			getItemName(item, index)
			{
				if(index == 0){
					console.log(item);
				}
				return item.name;
			},
			getNewTabItem(id){
				let tabs = [];
				for(let i = 0; i < this.tabItems.length; ++i){
					if(this.tabItems[i].id == id){
						tabs.push(this.tabItems[i]);
						break;
					}
				}
				
				if(tabs.length > 0)
					this.tabItems = tabs;
			},
			getnewTabIdx(id){
				for(let i = 0; i < this.tabItems.length; ++i){
					if(this.tabItems[i].id == id){
						this.tabIndex = i;
						break
					}
				}
			},
			// 点击下载
			downloadApk() {
				let ua = window.navigator.userAgent.toLowerCase();
				if (
					ua.match(/MicroMessenger/i) == "micromessenger" ||
					ua.match(/_SQ_/i) == "_sq_"
				) {
					this.isJump = 1;
				} else {
					this.isJump = 2;
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
					url: this.$baseUrl + "/versionGet",
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
			// 查看该包款下的包包
			modelCheck(model) {
				console.log(model);
				uni.navigateTo({
					url: "../../commonPackage/search/search?model=" +
						encodeURIComponent(JSON.stringify(model)) +
						"&type=爱马仕",
				});
			},
			// 查看该标签下的珠宝
			labelCheck(label) {
				console.log(label);
				uni.navigateTo({
					url: "../../commonPackage/search/search?tag=" + label + "&type=珠宝",
					//animationType: this.type[this.typeIdx]
				})
			},
			// 查看包包详情
			checkDetails(item) {
				if (this.tabItems[this.tabIndex].id == 'J') {
					uni.navigateTo({
						url: "../../jewelryPackage/jewelryDetails?id=" + item.id,
					});
				} else if (this.tabItems[this.tabIndex].id == 'H') {
					uni.navigateTo({
						url: "../../minePackage/details?id=" + item.id,
					})
				}
			},
			getList(index){
				if(this.tabItems[index].id == 'J')
					this.getJewelryList(index);
				else if(this.tabItems[index].id == 'H')
					this.getBagList(index);
			},
			getJewelryList(index){
				uni.showLoading({
					title: "加载中......",
				});
				uni.request({
					method: "POST",
					url: this.$baseJewelleryUrl + "/jewellerySearch?pageNum=10&page=" + this.tabItems[index].page,
					header: {
						"content-type": "application/json",
					},
					data: {
						keyword: '',
						tag: '',
						sort: '',
					},
					complete: (res) => {
						uni.hideLoading();
				
						let list = this.tabItems[index].list.concat(res.data.list);
						for(let i = 0; i < list.length; ++i){
							list[i].uuid = this.tabItems[index].id + i;
						}
						this.tabItems[index].list = list;
						
						
						setTimeout(() => {
							this.scrollTop ++;
						}, 500) 
				
					},
				});
			},
			getBagList(index){
				uni.showLoading({
					title: "加载中......",
				});
				uni.request({
					method: "POST",
					url: this.$baseUrl + "/modelSearch",
					header: { "content-type": "application/json", },
					data: {
						page: this.tabItems[index].page,
						pageNum: 10,
					},
					complete: (res) => {
						uni.hideLoading();
				
						let list = this.tabItems[index].list.concat(res.data);
						for(let i = 0; i < list.length; ++i){
							list[i].uuid = this.tabItems[index].id + i;
						}
						this.tabItems[index].list = list;
						
						console.log(this.tabItems[1].list)
				
						setTimeout(() => {
							this.scrollTop ++;
						}, 500) 
					},
				});
			},
			// 获取数据列表
			getInfo() {
				uni.showLoading({
					title: "加载中......",
				});
				uni.request({
					url: this.$baseUrl + "/indexMsgGet",
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
						
						this.slogan = res.data.slogan;
						this.indexTitle = res.data.title;
						
						this.isShow = true;
					},
				});
			},
			loadMore() {
			    setTimeout(() => {
					++this.tabItems[this.tabIndex].page;
			        this.getList(this.tabIndex);
			    }, 500) 
			},
			switchTab(index) {
			    if (this.tabItems[index].list.length === 0) {
			        this.getList(index);
			    }
				
				if(this.tabIndex != index){
					uni.pageScrollTo({
						scrollTop: this.tabItems[index].pageScroll < this.topWndHeight ? this.topWndHeight : this.tabItems[index].pageScroll, 
						duration: 0
					});
				}
				
				setTimeout(() => {
					this.scrollTop ++;
				}, 100) 
				
				this.tabIndex = index;
			}
		},
	};
</script>

<style lang="scss" scoped>
	.main{
		background: url(../../static/imgs/index/indexBack.png) no-repeat; 
		background-size: 750rpx 769rpx;
		
		.slogan{
			padding: 130rpx 30rpx 0rpx 30rpx;
			font-size: 48rpx;
			
			.detail {
				color: #6B8481;
				font-size: 20rpx;
				font-style: oblique;
				margin-top: 30rpx;
			}
		}
		
		.search {
			margin: 50rpx 30rpx 60rpx 30rpx;
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			height: 80rpx;
			line-height: 80rpx;
			background-color: #FFFFFF;
			border-radius: 30px;
			font-size: 28rpx;
			color: #6B8481;
		
		}
		
		.menuList{
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			margin-bottom: 30rpx;
			
			.item{
				width: 25%;
				text-align: center;
				
				.img{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
					background-color: #fff;
					
				}
				
				.name{
					margin-top: 16rpx;
					font-size: 22rpx; 
					color: #2b2b2f;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				
			}
		}
		
		.tabContrl{
			background-color: #FFFFFF; 
			position: sticky; 
			top: 0rpx; 
			z-index: 980;
			
			.contrl{
				display: flex;
				padding: 48rpx 30rpx 30rpx 30rpx;
				border-bottom: 1rpx solid #F5f8f7;
				
				.tab{
					display: flex; 
					flex-direction: column; 
					align-items: center;
					margin-right: 66rpx;
					
					.name{
						font-size: 30rpx; 
						color: #e0e0e0;
						
					}
					
					.nameActive{
						color: #2B2D2F;
						font-size: 36rpx;
						font-weight: bold;
					}
					
					.line{
						width: 24rpx; 
						height: 10rpx; 
						border-radius: 5rpx; 
						margin-top: 10rpx;
					}
					
					.lineActive{
						background-color: #85dbd0; 
					}
				}
			}
			
		}
		
		.list{
			padding:20rpx;
			display: grid;
			justify-content: space-between;
			grid-template-columns: repeat(auto-fill, 344rpx);
			grid-gap: 20rpx;
			//background-color: #FDFDFD;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			
		
			
			.item{
				padding: 20rpx;
				border-radius: 40rpx;
				//background-color: #0055ff;
				margin-bottom: 20rpx;
				box-shadow: 0px -5px 0 0 #FFFFFF, -10rpx 0px 20rpx 0 #f9f9f9,
					10rpx 0px 20rpx 0 #f9f9f9, 0px 20rpx 30rpx 0 #f9f9f9;
				
				
				.img{
					width: 304rpx;
					height: 304rpx;
					border-radius: 30rpx;
				}
				
				.title{
					//height: 70rpx;
					margin-top: 28rpx;
					font-size: 28rpx;
					//font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					//display: -webkit-box;
					//-webkit-box-orient: vertical;
					white-space: nowrap;
					//-webkit-line-clamp: 2;
				}
				
				.price{
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
				background: url(../../static/imgs/index/back01.png) no-repeat;
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
				background: url(../../static/imgs/index/back02.png) no-repeat;
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
