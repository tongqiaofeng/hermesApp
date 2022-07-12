<template>
	<view style="display: flex; flex-direction: column; align-items: center;">
		<uqrcode style="margin-top: 50rpx;" ref="uQRCode" errorCorrectLevel="M" :text="qrString" />
		<button style="width: 540rpx; margin-top: 50rpx; background-color: #85dbd0; color: #FFFFFF;" @click="save">保存二维码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrString:''
			}
		},
		onLoad(e){
			this.qrString = 'https://bzbb.com/qr/?id='+e.id;
		},
		methods: {
			save() {
			      this.$refs.uQRCode.save({
			        success: res => {
			          console.log(res)
			        }
			      })
			}
		}
	}
</script>

<style>

</style>
