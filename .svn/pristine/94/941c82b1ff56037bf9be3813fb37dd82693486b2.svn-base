<template>
	<view>

<!-- 		<camera v-if="showImage == false" class="camera" :device-position="cameraPosition" :flash="cameraFlash" >
			
			
			<cover-view class="coverView" direction="all" ></movable-view>
				<cover-view class="bkPlace"></cover-view>
				<cover-image class='bkImg' :style="{'top': bkTop+'px'}" src="../static/imgs/adron/bk.png"></cover-image> 
				<cover-image class='ring' :style="{'top': ringTop+'px' ,'left': ringLeft+'px'}" src="../static/imgs/adron/ring.png"></cover-image> 
				<cover-image class='cFlash' src='../static/imgs/chat/video.png' @tap="cameraFlash = cameraFlash == 'off' ? 'on' : 'off'"> </cover-image>
				<cover-image class='takePhoto'  src='../static/imgs/chat/video.png' @tap="takePhoto()"> </cover-image>
				<cover-image class='cPosition'  src='../static/imgs/chat/video.png' @tap="cameraPosition = cameraPosition == 'back' ? 'front' : 'back'"> </cover-image>
				
			</cover-view>
			
		</camera> -->

		<canvas v-else canvas-id="canvas" class="camera">
			<cover-view class="coverView">
				<cover-view class="bkPlace"></cover-view>
				<cover-image class='takePhoto'  src='../static/imgs/chat/video.png' @tap="showImage = false"> </cover-image>
				<!-- <cover-image class='ring' :style="{'top': ringTop+'px' ,'left': ringLeft+'px'}" src="../static/imgs/adron/ring.png"></cover-image> -->
			</cover-view>
		</canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cameraPosition: 'back',
				cameraFlash: 'off',
				ctx: null,
				showImage: false,
				windownHeight:0,
				bkTop: 0,
				ringTop: 0,
				ringLeft: 0,
			}

		},
		onLoad() {
			//this.ctx = uni.createCameraContext();
		},
		onReady(){
			this.calcHeight();
		},
		methods: {
			calcHeight() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						that.windownHeight = res.windowHeight;
						that.bkTop = (res.windowHeight - uni.upx2px(200-50) - uni.upx2px(750))/2;
						that.ringTop = that.bkTop +  uni.upx2px(750-140)/2;
						that.ringLeft = uni.upx2px(400);
					}
				})
			},
			takePhoto() {
				this.ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						console.log(res)
						this.imageChange(res)
					}
				});
			},
			imageChange(options) {
				var that = this
				//原图片信息
				var _width = options.width
				var _height = options.height
				var _path = options.tempImagePath

				//需要的图片信息
				var image_x = parseInt(_width * 0.1);
				var image_y = parseInt(_height * 0.09);
				var image_width = parseInt(_width * 0.8);
				var image_height = parseInt(_height * 0.87);
				
				

				uni.getImageInfo({
					src: _path,
					success: function(res) {
						that.showImage = true
						//将原图画到canvas上面
						that.canvas = uni.createCanvasContext("canvas", that)
						that.canvas.drawImage(_path, 0, 0, uni.upx2px(750), that.windownHeight)
						that.canvas.drawImage('../static/imgs/adron/ring.png', that.ringLeft, that.ringTop, uni.upx2px(140), uni.upx2px(140))
						uni.showLoading({
							title: '数据处理中...',
							icon: 'loading',
							duration: 10000
						})
						that.canvas.draw()
						setTimeout(function() {
							//导出自己需要的图片
							uni.canvasToTempFilePath({
								canvasId: "canvas",
								x: image_x,
								y: image_y,
								width: image_width,
								height: image_height,
								destWidth: image_width, 
								destHeight: image_height,
								success: function(res) {
									uni.hideLoading()
									uni.saveImageToPhotosAlbum({ //保存图片到相册
										filePath: res.tempFilePath,
										success: function() {
											uni.hideLoading()
											uni.showToast({
												title: "图片已保存",
												duration: 2000
											})
										},
										fail() {
											uni.hideLoading()
										}
									})
									//TODO........

								},
								fail: function(e) {
									uni.hideLoading()
									uni.showToast({
										title: '出错啦...',
										icon: 'loading'
									})

								}
							});
						}, 1000);
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.camera{
		width: 750rpx;
		height: 100vh;
		
		.coverView{
			display: flex; 
			flex-direction: column; 
			align-items: center;
			
			.bkPlace{
				width: 750rpx;
				height: 100vh;
				position: relative;
			}
			
			.bkImg{
				width: 750rpx;
				height: 750rpx;
				position: absolute;
			}
			
			.cFlash{
				width: 100rpx;
				height: 100rpx;
				position: absolute;
				bottom: 100rpx;
				left: 100rpx;
			}
			
			.takePhoto{
				width: 100rpx;
				height: 100rpx;
				position: absolute;
				bottom: 100rpx;
			}
			
			.cPosition{
				width: 100rpx;
				height: 100rpx;
				position: absolute;
				bottom: 100rpx;
				right: 100rpx;
			}
			
			.ring{
				width: 140rpx;
				height: 140rpx;
				position: absolute;
				top: 400rpx;
			}
		}
		
		
	}

</style>
