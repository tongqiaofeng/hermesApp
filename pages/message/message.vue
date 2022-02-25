<template>
	<view>
		<view >
			<!-- :noreadnum="totalNoreadnum" -->
			<!-- 导航栏 -->
			<!-- 系统消息 -->
	<!-- 		<view style="display: flex;">
				<input type="text" value="" v-model="userId" style="border:  #2C405A solid 1rpx; flex: 1;" />
				<navigator style="margin: 0rpx 20rpx;" :url='"../chat/chat/chat?id="+userId'>聊天</navigator>	
			</view> -->
<!-- 			<div class="flex align-stretch" @click="adminclick()" v-if='historyAdminlist.length>0'>
				<view class="flex align-center justify-center position-relative" style="width: 145rpx;">
					<free-avater src="/static/imgs/demo/shh.png" size="92"></free-avater>
				</view>
				<view class="flex flex-column border-bottom flex-1 py-3 pr-3 border-light-secondary">
					<view class="flex align-center justify-between mb-1">
						<text class="font-md">通知</text>
						<text
							class="font-sm text-light-muted">{{historyAdminlist[historyAdminlist.length-1].time|formatTime}}</text>
					</view>
					<text class="font text-ellipsis text-light-muted"
						v-if="historyAdminlist[historyAdminlist.length-1].contentType==0">{{historyAdminlist[historyAdminlist.length-1].contentText}}</text>
					<text class="font text-ellipsis text-light-muted" v-else>{{'['+'图片'+']'}}</text>
				</view>
			</div> -->
			<!-- 列表 -->
			<block v-for="(item,index) in chatlist" :key="index" v-if="chatlist">
				<free-media-list :item="item" :index="index"  >
				</free-media-list>
			</block>

			<!-- 非置顶列表 -->
			<!-- 	<block v-for="(item,index) in chatlist" :key="index">
				<free-media-list v-if="!item.istop" :item="item" :index="index" @long="long"></free-media-list>
			</block> -->


			<!-- 弹出层 -->
			<!-- <free-popup ref="extend" :bodyWidth="240" :bodyHeight="getMenusHeight">
				<view class="flex flex-column" style="width: 240rpx;" :style="getMenusStyle">
					<view class="flex-1 flex align-center  border-bottom" hover-class="bg-light"
						v-for="(item,index) in menus" :key="index" @click="clickEvent(item.event)">
						<text class="font-md pl-3">{{item.name}}</text>
					</view>
				</view>
			</free-popup> -->
		</view>
		<!-- <view v-else style="width:100vw;height:100vh;display: flex;" class="justify-center">
			<text class="text-center">暂无聊天列表哦~</text>
		</view> -->
	</view>
</template>
<script>
	import freeMediaList from "@/common/free-ui/free-media-list.vue"
	import freePopup from "@/common/free-ui/free-popup.vue"
	import freeAvater from "@/common/free-ui/free-avater.vue"
	import freeBase from "@/common/mixin/free-base.js"
	// import auth from '@/common/mixin/auth.js';
	import {
		mapState
	} from 'vuex'
	export default {
		mixins: [freeBase],
		components: {
			freeMediaList,
			freePopup,
			freeAvater
		},
		data() {
			return {
				propIndex: -1,
				chatlist: [], //一个用户只有一条，列表显示
				// historyAdminlist: uni.getStorageSync('adminlist'),
				menus: [{
						name: "设为置顶",
						event: "setTop"
					},
					{
						name: "删除该聊天",
						event: "delChat"
					}
				],
			}
		},
		onLoad() {
			uni.$on('user-list-update', (data) => {  
				this.flushData();
				//alert('user-list-update');
			})
			console.log('lll')
		},
		onShow() {
			this.chat_updateUserMsg(0); 
			this.flushData();
			// console.log('000')
			
		},
		computed: {

			// 动态获取菜单高度 
			getMenusHeight() { 
				let H = 100
				return this.menus.length * H
			},
			// 获取菜单的样式
			getMenusStyle() {
				return `height: ${this.getMenusHeight}rpx;`
			}
		},
		methods: {
			flushData(){
				this.chatlist = getApp().globalData.userList;
				console.log('messagelist',getApp().globalData.userList)
				this.flushCnt++;
			},
			// long({
			// 	x,
			// 	y,
			// 	index
			// }) {
			// 	// 初始化 索引
			// 	this.propIndex = index
			// 	// 拿到当前对象
			// 	let item = this.list[index]
			// 	// 判断之前是否处于置顶状态
			// 	this.menus[0].name = item.istop ? '取消置顶' : '设为置顶'
			// 	//展示弹框
			// 	this.$refs.extend.show(x, y)

			// },
			// // 分发菜单事件
			// clickEvent(event) {
			// 	switch (event) {
			// 		case "setTop": // 置顶/取消置顶会话
			// 			this.setTop()
			// 			break;
			// 		// case "delChat": // 删除当前会话
			// 		// 	this.delChat()
			// 		// 	break;
			// 	}
			// 	this.$refs.extend.hide() //取消弹框
			// },
			// // 置顶/取消置顶会话
			// setTop() {
			// 	let item = this.list[this.propIndex]
			// 	item.istop = !item.istop
			// },

		}
	}
</script>

<style>

</style>
