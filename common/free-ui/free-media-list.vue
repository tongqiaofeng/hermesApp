<template>
	<!-- :class="item.istop ? 'bg-light' : 'bg-white'" -->
	<view class="bg-light" hover-class="bg-light" >
		<div class="flex align-stretch" @click="onClick(item)" @longpress="long">
			<view class="flex align-center justify-center position-relative" style="width: 145rpx;">
				<free-avater v-if="item.head_pic == null || item.head_pic == ''" src="/static/imgs/demo/localhostpic.png" size="92"></free-avater>
				<free-avater v-else :src="baseurl + '/file/' + item.head_pic" size="92"></free-avater>
				<free-badge badgeClass="position-absolute" badgeStyle="top:15rpx;right:15rpx"
					v-if="item.num>0" :value="item.num"></free-badge>
			</view>
			<view class="flex flex-column border-bottom flex-1 py-3 pr-3 border-light-secondary">
				<view class="flex align-center justify-between mb-1">
					<text class="font-md" v-if="item.username">{{item.username}}</text>
					<text class="font-sm text-light-muted">{{item.time|formatTime}}</text>
				</view>
				<text class="font text-ellipsis text-light-muted" v-if="item.contentType==0" style="max-height: 40rpx;">{{item.contentText}}</text>
				<text class="font text-ellipsis text-light-muted" v-else>{{'['+'图片'+']'}}</text>
			</view>
		</div>
	</view>
</template>  

<script>
	import freeBase from "@/common/mixin/free-base.js"

	import freeAvater from "./free-avater.vue"
	import freeBadge from "./free-badge.vue"
	import {
		mapState
	} from 'vuex'


	export default {
		mixins: [freeBase],
		components: {
			freeAvater,
			freeBadge
		},
		props: {
			item: Object,
			index: Number,

		},
		onLoad() {

		},
		data() {
			return {
				baseurl: this.$baseFileUrl,
				isself: uni.getStorageSync('userId'),
				chatlistall: [],
				useridlist: [],
				mlist: [], //点击用户的所有聊天信息
				arr2: [],
				listindex: 0,
			}
		},
		methods: {
			onClick(emit) {
				let obj={
					head_pic:emit.head_pic,
					username:emit.username
				}
				uni.setStorageSync('chater',obj)
				console.log(emit)
				uni.navigateTo({
					url: '/pages/message/chat/chat/chat?id=' + emit.userId,
					fail: (res) => {
						console.log(res) //打印错误信息
					}
				});
				

			},
			findElem(array, attr, val) {
				for (var i = 0; i < array.length; i++) {
					if (array[i][attr] == val) {
						return i; //返回当前索引值
					}
				}
				return -1;
			},
			history(id) {
				let msg = {
					type: "history",
					token: uni.getStorageSync('token'),
					userId: id,
					num: 20,
					id: 0
				}
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
				});
			},


			long(e) {
				let x = 0
				let y = 0

				x = e.changedTouches[0].clientX
				y = e.changedTouches[0].clientY
	
				this.$emit('long', {
					x,
					y,
					index: this.index
				})
			}
		}
	}
</script>

<style>
</style>
