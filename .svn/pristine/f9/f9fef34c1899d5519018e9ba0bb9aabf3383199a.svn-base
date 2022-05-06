<template>
	<view class="content1">
		<view style="display: flex;">
			<input type="text" value="" v-model="userId" style="border:  #2C405A solid 1rpx; flex: 1;" />
			<navigator style="margin: 0rpx 20rpx;" :url='"../chat/chat?id="+userId'>聊天</navigator>	
		</view>
		<view class="">{{flushCnt}}</view>
		<view v-for="(user, index) in userList" :key="index">
			<navigator v-if="user.username" :url='"../chat/chat?id="+user.userId'>
				<view style="border: #007AFF solid 1rpx; margin: 15rpx; padding: 10rpx; font-size: 28rpx;">
					<view style="display: flex;justify-content: space-between;">
						<view class="">{{user.username}}</view>
						<view style="color: #C0C0C0; font-size: 12rpx;">{{user.time}}</view>
					</view>
					<view style="display: flex;">
						<view style="color: #C0C0C0;">{{user.contentText}}</view>
						<view v-if="user.num > 0" style="color: #ff0000;">[新消息]</view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				flushCnt:0,
				userList:[]
			}
		},
		onLoad() {
			uni.$on('user-list-update', (data) => {  
				this.flushData();
				//alert('user-list-update');
			})  
		},
		onShow() {
			this.flushData();
		},
		methods: {
			flushData(){
				this.userList = getApp().globalData.userList;
				this.flushCnt++;
				
				console.log(this.userList);
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
