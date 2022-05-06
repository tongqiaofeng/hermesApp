<template>
	<view class="popwnd-box" v-if="visible" @click="close">
		<view id="popwnd" class="popwnd">
			<view class="top">
				<view>{{strTitle}}</view>
			</view>
			
			<view class="bottom">
				<view class="bottom-input">
					<input v-if="inputType == 1" class="bottom-input-ex" v-model="strInput" type="digit"
					:placeholder="strTip" placeholder-style="color:#d0d0d0;font-size:28upx;"/>
					<textarea v-if="inputType == 2" class="bottom-input-ex" placeholder-style="color:#d5d3d3;font-size:30rpx" v-model="strInput" :placeholder="strTip"></textarea>
					<input v-else class="bottom-input-ex" v-model="strInput" type="text"
					:placeholder="strTip" placeholder-style="color:#d0d0d0;font-size:28upx;"/>
				</view>	
			</view>
			
			<view class="foot">
				<view @tap="cancel" class="foot-cancel">取消</view>
				<view @tap="confirm" class="foot-ok">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			visible: {
				type: Boolean,
				default: false,
				required: true,
			},
			inputType: {
				type: Number,
				default: 0,
			},
			strTitle: {
				type: String,
				default: '',
				required: true,
			},
			strTip:{
				type: String,
				default: '',
			}
		},
		data() {
			return {
				strInput:'',	
			}
		},
		watch: {
			visible(val)
			{
				if(val)
					this.strInput = '';
			}
		},
		mounted() {},
		methods: {
			close(e) {
				//if(e.target.id != "popwnd")
				//	this.$emit('update:visible', false)
			},
			cancel() {
				this.$emit('update:visible', false)
			},
			confirm() {
				let strInput = this.strInput.trim();
				if(strInput.length == 0)
				{
					//uni.showToast({icon:'none', title:"内容不能为空", duration:2000});
					//return;
				}
				let ret = {input:strInput}
				this.$emit('confirm', ret);
				this.cancel();
			},
		}
	}
</script>

<style lang="scss">
	.popwnd-box {
		z-index: 999;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .2);
		transition: opacity .2s linear;
	}

	.popwnd {
		width: 600upx;
		background: white;
		border-radius: 20upx;
		overflow: hidden;
		
		display: flex; 
		flex-direction: column;
		
	}
	
	.top{
		height: 108upx;
		
		view{
			line-height: 108upx;
			font-size: 32upx;
			text-align: center;
			background-color: #00aaff; 
			color: #FFFFFF;
		}
	}
	
	.bottom{
		margin-top:40upx;
		margin-bottom: 40upx;
		font-size:30upx;
		line-height: 80upx;
		text-align: center;
		
		&-input{
			margin:30upx;
			padding-bottom: 10upx;
			border-bottom: 2upx solid #C1C1C1;
			
			&-ex{
				text-align: left;
				flex: 1;
				border: 0upx;
				outline: none; // 去除选中状态边框
			}
		}
	}
	
	.foot{
		display: flex;
		height: 100upx;
		line-height: 100upx;
		
		&-cancel{
			width: 300upx;
			text-align: center;
			background-color: #f1f1f1;
		}
		
		&-ok{
			width: 300upx;
			text-align: center;
			background-color: #00aaff;
			color: #ffffff;
		}
	}
	
	
	
	
</style>
