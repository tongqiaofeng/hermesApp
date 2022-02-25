<template>
	<view>
		<!-- 时间显示 -->
		<view v-if="showTime" class="flex align-center justify-center pb-4 pt-2">
			<text class="font-sm text-light-muted">{{showTime}}</text>
		</view>
		<!-- 撤回消息 -->
		<view v-if="item.readStatus==-2" ref="isremove" class="flex align-center justify-center pb-4 pt-1">
			<text class="font-sm text-light-muted">{{ isself ? '你' : '对方' }}撤回了一条信息</text>
		</view>
		<!-- 系统消息 -->
		<view v-else-if="item.type === 'historyAdmin'" class="flex align-center justify-center pb-4 pt-1">
			<view class="bg-white p-4 flex" style="width: 600rpx;height: 100px;border-radius: 14px;">
				<text class="font-sm text-light-muted" style="text-overflow:ellipsis;">{{item.contentText}}</text>
			</view>
		</view>
		<view v-else-if="item==null">
			<text>暂无</text>
		</view>
		<!-- 气泡 -->
		<!-- && !item.isremove -->
		<view  v-else-if="item.type == 'history' " class="flex align-start position-relative mb-3"
			:class="!isself ? 'justify-start' : 'justify-end'">
			<!-- 好友 -->
			<template v-if="!isself">
				<free-avater v-if="picmsg.head_pic==null||picmsg.head_pic==''" src="/static/imgs/demo/localhostpic.png" size="70" @click="openUser">
				</free-avater>
				<free-avater v-else size="70" :src="baseurl+'/file/' +picmsg.head_pic" @click="openUser"></free-avater>
				<image v-if="hasLabelClass" class="position-absolute chat-left-icon"
					:style="shownickname ? 'top:45rpx;':'top:20rpx;'" style="width:16px ;height: 16px;"
					src="../../static/imgs/demo/l.png"></image>
				<!-- <text v-if="hasLabelClass" class="iconfont text-white font-md position-absolute chat-left-icon" :style="shownickname ? 'top:45rpx;':'top:20rpx;'">&#xe645;</text> -->
			</template>

			<div class="flex flex-column" @longpress="long">
				<!-- 昵称 -->
				<view v-if="shownickname" class="flex" :class="nicknameClass"
					style="max-width:500rpx;background-color: rgba(0,0,0,0);" >
					<text class="font-sm text-muted">{{item.username}}</text>
				</view>

				<view class="p-2 rounded" :class="labelClass" style="max-width:500rpx;" >
					<!-- 文字 -->
					<text v-if="item.contentType === 0" class="font-md">{{item.contentText}}</text>
					<!-- 图片-->
					<free-image @longpress="stop" v-else-if="item.contentType === 1" :src="baseurl+'/file/'+item.contentText"
						@click="preview(item.contentText)" imageClass="rounded" :maxWidth="500" :maxHeight="350">
					</free-image>

				</view>
			</div>
			<!-- 本人 -->
			<template v-if="isself&&item.readStatus!=-2">
				<image src="../../static/imgs/demo/r.png" v-if="hasLabelClass" class="position-absolute chat-right-icon"
					style="width:16px;height: 16px;" :style="shownickname ?'top:45rpx;':'top:20rpx;'"></image>
				<!-- <text v-if="hasLabelClass" class="iconfont text-chat-item font-md position-absolute chat-right-icon" :style="shownickname ? 'top:45rpx;':'top:20rpx;'">&#xe644;</text> -->
				<free-avater v-if="ourpic==null||ourpic==''" src="/static/imgs/mine/avatar.png" size="70" @click="openUser">
				</free-avater>
				<free-avater v-else size="70" :src="baseurl+'/file/' +ourpic" @click="openUser"></free-avater>
			</template>
		</view>
		<!-- <view v-if="item.sendStatus && item.sendStatus !== 'success'" class="flex align-center justify-end px-4">
			<text class="font-sm" :class="item.sendStatus === 'fail' ? 'text-danger' : 'text-muted'">{{item.sendStatus === 'fail' ? '发送失败' : '发送中...'}}</text>
		</view> -->
	</view>
</template>
 
<script>
	import freeAvater from "./free-avater.vue"
	import freeImage from './free-image.vue';
	import $T from "@/common/free-lib/time.js"
	import {
		mapState
	} from 'vuex'

	export default {
		components: {
			freeAvater,
			freeImage
		},
		props: {
			item: Object,
			index: Number,
			// 上一条消息的时间戳
			pretime: [Number, String],
			shownickname: {
				type: Boolean,
				default: false
			},
			baseurl: String,
			picmsg:Object,
			ourpic:String
		},
		data() {
			return {
				innerAudioContext: null,
				audioPlaying: false,
				
			}
		},
		onLoad() {

			console.log('onload')
		},
		computed: {
			// ...mapState({
			// 	user:state=>state.user.user
			// }),
			// 是否是本人
			isself() {
				// 获取本人id
				// console.log('this.item',this.item,uni.getStorageSync('userId'))
				if (this.item != null && this.item.type == 'history') {
					if (getApp().globalData.userId == this.item.sender)
						return true;
					else
						return false;
				}

			},
			// 显示的时间
			showTime() {
				// console.log(this.item.time,this.pretime)
				let time1type = typeof(this.item.time) == 'number' ? true : false
				let time2type = typeof(this.pretime) == 'number' ? true : false
				// console.log(time1type,time2type)
				if (this.item != null && this.item.time != undefined) {
					let time1 = time1type ? this.item.time : $T.ISO8601DateStr2Date(this.item.time)
					let time2 = time2type ? this.pretime : $T.ISO8601DateStr2Date(this.pretime)
					if (this.pretime == 0) {
						return $T.getChatTime(time1, 0)
					} else {
						return $T.getChatTime(time1, time2)
					}
				}

			},
			// 是否需要气泡样式
			hasLabelClass() {
				if (this.item != null && this.item.type == 'history') {
					return this.item.contentType === 0
				} else {
					return true
				}

			},
			// 气泡的样式
			labelClass() {
				if (this.item != null && this.item.type == 'history') {
					let label = this.hasLabelClass ? 'bg-chat-item mr-3' : 'mr-3'
					return this.isself ? label : 'bg-white ml-3'
				} else {
					return 'bg-white ml-3'
				}
			},
			nicknameClass() {
				if (this.item != null && this.item.type == 'history') {
					let c = this.isself ? 'justify-end' : ''
					return c + ' ' + this.labelClass
				}
			},
		},
		mounted() {
			// 注册全局事件
			// console.log('全局变量',this.baseurl);
			// 监听是否撤回消息
			// #ifdef APP-PLUS-NVUE
			this.$watch('item.isremove', (newVal, oldVal) => {
				if (newVal) {
					const animation = weex.requireModule('animation')
					this.$nextTick(() => {
						animation.transition(this.$refs.isremove, {
							styles: {
								opacity: 1
							},
							duration: 100, //ms
							timingFunction: 'ease',
						}, function() {
							console.log('动画执行结束');
						})
					})
				}
			})
			// #endif
		},
		methods: {
			stop() {},
			openUser() {
				// uni.navigateTo({
				// 	url: '/pages/mail/user-base/user-base?user_id='+this.item.from_id,
				// });
			},

			// 预览图片
			preview(url) {
				this.$emit('preview', url)
			},
			// 长按事件
			long(e) {
				
				let x = 0
				let y = 0
				x = e.changedTouches[0].clientX
				y = e.changedTouches[0].clientY
				// console.log(e)
				this.$emit('long', {
					x,
					y,
					index: this.index
				})
			},

		}
	}
</script>

<style scoped>
	.chat-left-icon {
		left: 80rpx;
	}

	.chat-right-icon {
		right: 80rpx;
	}

	.chat-animate {
		/* #ifndef APP-PLUS-NVUE */
		opacity: 0;
		/* #endif */
	}
</style>
