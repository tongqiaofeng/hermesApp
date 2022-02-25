<template>
	<view>
		<!-- <uni-nav-bar left-icon="back" left-text="返回" :title="·" style="z-index:1;" 
			statusBar="true"></uni-nav-bar> -->
		<uni-nav-bar statusBar="true" backgroundColor="#f8f9fa">
			<view slot="default" style="width: 100%;text-align: center;">{{picmsg.username}}</view>
			<view slot="left" @click="backto()">
				<u-icon name="arrow-left"></u-icon>
			</view>
			<view slot="right">
				<!-- <text v-if="msgtype==2">编辑</text> -->
			</view>
		</uni-nav-bar>
		<view v-if="msgbox" class="position-fixed free-animated z-index mt-3"
			style="z-index:9999;overflow:hidden;width: 100vw;margin: auto;top:32px;">
			<view class="flex flex-column bg-white rounded " style="width: 600rpx; padding: 20rpx;margin: auto;"
				@click="chattonew(newchater)">
				<text class="font mb-2">{{newchater.username}}</text>
				<text class="font-sm text-hover-dark">{{newchater.contentText}}</text>
			</view>
		</view>
		<!-- 聊天内容区域 -->
		<scroll-view scroll-y class="bg-light position-fixed left-0 right-0 px-3"
			style="bottom: 105rpx;box-sizing: border-box;" :style="chatBodyBottom" :show-scrollbar="false"
			:scroll-into-view="scrollIntoView" :scroll-with-animation="true" @click="clickPage" :scroll-y='true'>
			<text @click="chat_getMsgHistoryCmd(userId,false,lastmsg,'add')"
				class="flex align-center justify-center font-sm pt-2" style="width: 100%;text-align: center;"
				v-if="msgtype==1&&maxpage!=-1">加载更多</text>
			<!-- 聊天信息列表组件 -->
			<view v-for="(item,index) in detail" :key="index" :id="'chatItem_'+index" v-if="detail">
				<free-chat-item :item="item" :index="index" :baseurl="uploadUrl" ref="chatItem" :picmsg="picmsg"
					:ourpic='ourpic' :pretime=" index > 0 ? detail[index-1].time : 0" @long="long"
					@preview="previewImage">
				</free-chat-item>
			</view>
			<view v-if="detail.length==0" class="text-hover-dark flex align-center justify-center font-sm pt-2"
				style="width: 100vw;text-align: center;">开始聊天吧 </view>
		</scroll-view>

		<!-- #ifdef APP-PLUS-NVUE -->
		<!-- 	<div v-if="mode === 'action' " class="position-fixed top-0 right-0 left-0" :style="'bottom:'+maskBottom+'px;'"
			@click="clickPage"></div> -->
		<!-- #endif -->

		<!-- 底部输入框 -->
		<view class="position-fixed left-0 right-0 border-top" :style="'bottom:'+KeyboardHeight+'px;'">
			<view class="flex align-center justify-between" style="background-color: #F7F7F6;height: 105rpx;">
				<!-- <view class="flex-1"> -->
				<textarea fixed class="bg-white rounded  font-md ml-5 flex-1 pl-2"
					style="height: 80rpx;max-width: 600rpx;line-height: 80rpx;" :adjust-position="false" v-model="text"
					@focus="focus" @blur="blur" :show-confirm-bar='false' />
				<!-- </view> -->
				<template v-if="text.length === 0">
					<!-- 扩展菜单 -->
					<view class="flex align-center justify-center" hover-class="bg-hover-light"
						style="height: 90rpx;width: 90rpx;">
						<image src="../../../../static/imgs/demo/+.png" style="width:16px;height: 16px;"
							@click="openActionOrEmoticon('action')"></image>
					</view>
					<!-- <free-icon-button :icon="'\ue726'" @click="openActionOrEmoticon('action')"></free-icon-button> -->
				</template>
				<view v-else class="flex-shrink" style="margin-left: 10px;">
					<!-- 发送按钮 -->
					<!-- <free-main-button name="发送"  @touchend.prevent="send(0,text)"></free-main-button> -->
					<button @touchend.prevent="send(0,text)"
						class="rounded mr-2 px-2 py-1 text-white main-bg-color font-m"
						style="display: initial;">发送</button>
				</view>
			</view>

			<view v-if="mode == 'action'" style="height: 450rpx;display: flex;"
				class="border-top border-light-secondary bg-light">
				<swiper :indicator-dots="actionList.length > 1" style="height: 450rpx;width: 100vw;">
					<swiper-item v-for="(item,index) in actionList" :key="index" class="flex">
						<view class="col-3 flex flex-column align-center justify-center" style="height: 255rpx;"
							v-for="(item2,index2) in item" :key="index2" @click="actionEvent(item2)">
							<image v-if="item2.icon" :src="item2.icon" mode="widthFix"
								style="width: 100rpx;height: 100rpx;"></image>
							<text class="font-sm text-muted mt-2">{{item2.name}}</text>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- 弹出层 -->
		<free-popup ref="extend" :bodyWidth="250" :bodyHeight="450" :tabbarHeight="105">
			<view class="flex flex-column" style="width: 240rpx;" :style="getMenusStyle">
				<view class="flex-1 flex align-center  border-bottom" hover-class="bg-light"
					v-for="(item,index) in menusList" :key="index" @click="clickEvent(item.event)">
					<text class="font-md pl-3">{{item.name}}</text>
				</view>
			</view>
		</free-popup>


	</view>
</template>

<script>
	var app = getApp();
	// #ifdef APP-PLUS-NVUE
	const dom = weex.requireModule('dom')
	// #endif
	// #ifdef APP-PLUS
	import permision from "@/common/free-lib/permission.js"
	// #endif
	import $T from "@/common/free-lib/time.js"
	import freeNavBar from "@/common/free-ui/free-nav-bar.vue"
	import freeIconButton from "@/common/free-ui/free-icon-button.vue"
	import freeChatItem from '@/common/free-ui/free-chat-item.vue';
	import freePopup from "@/common/free-ui/free-popup.vue"
	import freeMainButton from '@/common/free-ui/free-main-button.vue';
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			freeNavBar,
			freeIconButton,
			freeChatItem,
			freePopup,
			freeMainButton
		},
		data() {
			return {
				baseurl: this.$baseUrl,
				uploadUrl: this.$baseFileUrl,
				// http://192.168.0.233:8088/app/recruitment/api/upload
				token: uni.getStorageSync("token"),
				scrollIntoView: "",
				mode: "text",

				// 扩展菜单列表
				actionList: [
					[{
						name: "相册",
						icon: "/static/imgs/demo/pic.png",
						event: "uploadImage"
					}, {
						name: "拍摄",
						icon: "/static/imgs/demo/video.png",
						event: "uploadVideo"
					}]
				],
				// 键盘高度
				KeyboardHeight: 0,
				menusList: [],
				navBarHeight: 100,
				// 当前操作的气泡索引
				propIndex: -1,
				// 输入文字
				text: "",
				detail: [],
				isfocus: false,
				lastmsg: '',
				newchater: [],
				msgtype: 1,
				picmsg: uni.getStorageSync('chater'),
				maxpage: 0,
				userId: '',
				ourpic: uni.getStorageSync("headPic")
			}
		},
		mounted() {
			var statusBarHeight = 0;
			// #ifdef APP-PLUS-NVUE
			statusBarHeight = plus.navigator.getStatusbarHeight();
			// #endif
			this.navBarHeight = statusBarHeight + uni.upx2px(150);
			// #ifdef MP-WEIXIN
			this.navBarHeight = statusBarHeight + uni.upx2px(130);
			// #endif                                   
			this.pageToBottom();
			// console.log("000----",this.userbox,this.$store.state.audio.msgbox)
		},
		onLoad(e) {
			this.userId = e.id;
			getApp().globalData.chatUserId = e.id;
			console.log('onload', this.detail)
			uni.$on('user-msg-update', (data) => {
				this.flushData();
				// console.log('user-msg-update');
			})
		},
		onShow() {
			this.chat_updateUserMsg(this.userId);
			if (getApp().globalData.userList.length == 0) {
				this.maxpage = -1

			}
			console.log('onshow', getApp().globalData.userList)
		},
		computed: {
			msgbox() {
				return this.$store.state.audio.msgbox
			},
			...mapState({
				KeyboardH: state => state.common.KeyboardHeight,
			}),
			// 获取蒙版的位置
			maskBottom() {
				let h = this.mode == 'action' ? uni.upx2px(505) : uni.upx2px(105)
				if (this.isfocus) {
					h = this.KeyboardHeight + uni.upx2px(105)
				}
				return h
			},
			// 聊天区域bottom
			chatBodyBottom() {
				let h = this.mode == 'action' ? uni.upx2px(505) : uni.upx2px(105)
				if (this.isfocus) {
					h = this.KeyboardHeight + uni.upx2px(105)
				}
				return `bottom:${h}px;top:${this.navBarHeight}px;`
				console.log("聊天区域bottom", this.mode, h)
			},
			// 动态获取菜单高度
			getMenusHeight() {
				let H = 100
				return this.menusList.length * H
			},
			// 获取菜单的样式
			getMenusStyle() {
				return `height: ${this.getMenusHeight}rpx;`
			},
			// 所有信息的图片地址
			imageList() {
				let arr = []
				this.detail.forEach((item) => {
					if (item.contentType === 1) {
						arr.push(this.uploadUrl + '/file/' + item.contentText)
					}
				})
				return arr
			}
		},
		watch: {
			mode(newValue, oldValue) {
				// console.log("mode --change==========",newValue)
				if (newValue !== 'text') {
					this.KeyboardHeight = 0
					this.isfocus = false
					uni.hideKeyboard()
				}
			},
			KeyboardH(newValue, oldValue) {
				console.log("KeyboardH --change-========", newValue)
				this.pageToBottom();
				this.KeyboardHeight = newValue
				if (newValue > 0) {
					this.mode = 'text'
				}
			},

		},
		methods: {
			flushData() {
				let userIdx = this.chat_findUser(this.userId);
				if (userIdx > -1) {
					this.detail = getApp().globalData.userList[userIdx].msgList;
					this.lastmsg = getApp().globalData.userList[userIdx].msgList[0].id
					this.newchater = getApp().globalData.userList[0]
				}

				this.flushCnt++;
				if (this.detail.length == 0 || this.detail.length % 20 != 0) {
					this.maxpage = -1
				}
				if (uni.getStorageSync('addmore') == false)
					// this.pageToBottom(); 
					console.log("展示列表", uni.getStorageSync('addmore'))

			},
			chattonew(val) {
				uni.setStorageSync('chater', val)
				uni.redirectTo({
					url: '/pages/message/chat/chat/chat?id=' + val.userId,
					fail: (res) => {
						console.log(res) //打印错误信息
					}
				});
			},
			// 扩展菜单
			actionEvent(e) {
				console.log(e)
				switch (e.event) {
					case 'uploadImage': // 选择相册
						uni.chooseImage({
							count: 9,
							sourceType: ['album'], //从相册选择
							success: (res) => {
								console.log("图片选择成功", res);
								this.sendpic(res)
							}
						})
						break;
					case 'uploadVideo': //拍摄
						uni.chooseImage({
							count: 9,
							sourceType: ['camera'], //从选择
							success: (res) => {
								this.sendpic(res)
							}
						})
						break;
				}
			},
			// 发送图片
			sendpic(res) {
				const tempFilePaths = res.tempFilePaths;
				let promiseWorkList = [];
				for (let i = 0; i < tempFilePaths.length; i++) {
					promiseWorkList.push(
						new Promise((resolve, reject) => {
							console.log('上传项', tempFilePaths[i]);
							uni.uploadFile({
								url: this.$baseFileUrl + "/upload",
								fileType: "image",
								filePath: tempFilePaths[i],
								name: "upload-images",
								success: (res) => {
									console.log('上传成功', res);
									if (res.statusCode === 200) {
										console.log('图片信息', res.data);
										let pic = res.data.split("|")[0]
										this.send(1, pic)
									} else {
										console.log()("failt to upload image:", res);
										uni.showToast({
											title: "图片上传失败",
											icon: "none",
											duration: 2000,
										});
									}
								},
								fail: (res) => {
									console.log("failt to upload image:", res);
									uni.showToast({
										title: "网络连接失败",
										icon: "none",
										duration: 2000,
									});
								},
							})
						})
					)
				};
			},
			send(type, data) {
				this.text = ''
				// this.mode = 'text' 
				this.chat_sendMsgToUserCmd(this.userId, data, type);
				this.pageToBottom();
			},
			// 预览图片
			previewImage(url) {
				uni.previewImage({
					current: this.uploadUrl + '/file/' + url,
					urls: this.imageList,
					indicator: "default"
				})
			},

			// 回到底部
			pageToBottom() {
				setTimeout(() => {
					// #ifdef APP-PLUS-NVUE
					let chatItem = this.$refs.chatItem
					if (chatItem) {
						let lastIndex = chatItem.length > 0 ? chatItem.length - 1 : 0
						if (chatItem[lastIndex]) {
							dom.scrollToElement(chatItem[lastIndex], {})
						}
					}
					// #endif
					// #ifndef APP-NVUE
					let lastIndex = this.detail.length - 1
					this.scrollIntoView = 'chatItem_' + lastIndex
					console.log(this.scrollIntoView)
					// #endif
				}, 300)

			},
			backto() {
				// console.log("8888***",this.msgtype)
				uni.navigateBack({
					delta: 1
				})
				// uni.navigateTo({
				// 	url:'../../message'
				// })
			},
			// 打开扩展菜单或者表情包
			openActionOrEmoticon(mode = 'action') {
				this.mode = mode
				uni.hideKeyboard()
			},
			// 点击页面
			clickPage() {
				this.mode = ''
				uni.hideKeyboard()
				console.log('点击页面')
			},
			focus(e) {
				this.mode = 'text'
				// this.pageToBottom();   
				this.isfocus = true
				this.KeyboardHeight = e.detail.height
				console.log("fous", e)
			},
			blur() {
				// this.KeyboardHeight = 0
				this.isfocus = false
				console.log("blur", this.KeyboardHeight)
			},
			// scroll(e){
			// 	console.log('滚动到',e)
			// },
			getChatTime(v1, v2) {
				let vv2 = $T.ISO8601DateStr2Date(v2)
				v1 = v1.toString().length < 13 ? v1 * 1000 : v1;
				vv2 = vv2.toString().length < 13 ? vv2 * 1000 : vv2;
				if (((parseInt(v1) - parseInt(vv2)) / 1000) > 120) {
					return false
				} else {
					return true
				}
			},
			// 长按消息气泡
			long({
				x,
				y,
				index
			}) {
				// 初始化 索引
				this.propIndex = index
				// 组装菜单
				let menus = []
				let item = this.detail[this.propIndex]
				console.log("this.propIndex", x, y, item)
				let remove = this.getChatTime((new Date().getTime()), item.time)
				let isSelf = getApp().globalData.userId == this.detail[this.propIndex].sender
				if (isSelf && remove && this.msgtype == 1) {
					menus.push({
						name: "撤回",
						event: 'removeChatItem'
					})
					this.$refs.extend.show(x, y)
				}
				// else if (this.msgtype == 2) {
				// 	menus.push({
				// 		name: "删除",
				// 		event: 'delChatItem'
				// 	})
				// 	this.$refs.extend.show(x, y)
				// }
				console.log("changan", remove)
				// console.log("changan333", item.contentType, this.msgtype)
				// #ifndef H5
				if (item.contentType === 0 && this.msgtype == 1) {
					menus.unshift({
						name: "复制",
						event: 'copy',
					})
					this.$refs.extend.show(x, y)
				} else if (item.contentType === 1 && this.msgtype == 1) {
					menus.unshift({
						name: "保存图片",
						event: 'saveimg',
					})
					console.log(item)
					this.$refs.extend.show(x, y)
				}
				// #endif
				this.menusList = menus
				// 显示扩展菜单


			},

			// 操作菜单方法分发
			clickEvent(event) {
				let item = this.detail[this.propIndex]
				let isSelf = item.isself
				console.log('event', event)
				switch (event) {
					case 'copy': // 复制
						uni.setClipboardData({
							data: item.contentText,
							success: () => {
								uni.showToast({
									title: '复制成功',
									icon: 'none'
								});
							}
						});
						break;
					case 'removeChatItem':
						uni.showModal({
							content: '是否要删除该记录？',
							success: (res) => {
								if (res.confirm) {
									this.chat_deleteMsgCmd(item.receiver, item.id)
								}
							}
						});
						break;
					case 'saveimg':
						uni.saveImageToPhotosAlbum({
							filePath: item.contentText,
							success: function() {
								console.log('save success');
							}
						});
						break;
					case 'delChatItem':
						uni.showModal({
							content: '是否要删除该系统消息？',
							success: (res) => {
								uni.sendSocketMessage({
									data: JSON.stringify({
										type: "deletAdmin",
										token: this.token,
										id: item.chatid,
									})
								})
							}
						})
						break;
				}
				// 关闭菜单
				this.$refs.extend.hide()
			},
		}
	}
</script>

<style>

</style>
