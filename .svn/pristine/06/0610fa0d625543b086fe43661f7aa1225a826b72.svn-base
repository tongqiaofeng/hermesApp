<template>
	<view class="popwnd-box" v-if="visible" @click="close">
		<view id="popwnd" class="popwnd">
			<view class="top">
				<view>{{strTitle}}</view>
			</view>
			<scroll-view class="bottom" scroll-y="true">
				<view v-for="(item, index) in lst" :key="index"
					:class="['bottom-item', {'bottom-active':curIdx==index}]" @tap="curIdx = index">
					<view v-if="item.hide == true"></view>
					<view v-else-if="strName.length > 0">{{item[strName]}}</view>
					<view v-else>{{item}}</view>
					<view v-if="item.child">{{item.child}}</view>
					<image v-if="curIdx==index" :src="ischeck" mode="aspectFit"></image>
					<image v-else :src="nocheck" mode="aspectFit"></image>
				</view>
			</scroll-view>
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
			strName: {
				type: String,
				default: '',
			},
			strTitle: {
				type: String,
				default: '',
				required: true,
			},
			sel: {
				type: Number | String,
				default:'0'
			},
			lst: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				curIdx: this.sel,
				nocheck: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRjNERjJFMDBBMEIxMUVDOEExMEFFRDA0QzlEOEI2MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRjNERjJFMTBBMEIxMUVDOEExMEFFRDA0QzlEOEI2MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNGM0RGMkRFMEEwQjExRUM4QTEwQUVEMDRDOUQ4QjYwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNGM0RGMkRGMEEwQjExRUM4QTEwQUVEMDRDOUQ4QjYwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+K6jfEgAAArJJREFUeNq8l11ojXEcx59zNuaImEN5KeViXEiSsERrSs3bSNxIZJOshgvExbK83YiiWIYLrpiXQgrlLRo3hLYaoZOXYdyYFRl2fH6n71lPj+2c52znOb/69H+e5/zP833+b7+XUCwWc3zaMJgHs2EijIQCaIe30AR34ZnfF+b76DMNdkA5RHz0fwHH4ST8SNUxlGLko+AQrLZ+0AUP4A40wyfohEKYAMWwAMbo/62wBS5lKm5Tex7GwU+og8PwIc2o82AJ1MB0PauHzfrQtOIL4aKm2Ea6Dt44mVkYquAgDIIbsAx+eTu5bRZckPAJbbBMhR0t0TGYC21QBg1avh7FR2iqB0t4I/xx+mePYb5OxFLY1pv4ARgPD6Ea4k52rEmb1t63B4q84pO1trYmFfDbya5dgzNa/31e8a26PgUvnWCsRoNboaOZEIzoQVzHKShr1WYOaxkSF7Yjh8ITeO0Ea+fUliXFi/XgnhO83dcxnGGu3cQn6YfmHIh3wDsYYOtu4sP1w1cnN/ZZbdTEB+qmM0fiSceVmPYOV7zOhRWqbTfxZGQpyoFwOHnGLQGxm+euMBq0TVXseAXfw0p9zMGUwpCAxcvVXk1Ow3tolPCqAIXzFTfMLrt9e53anXL+QVilomaLIme3eINCn22G2gCELa/br+taeblu8S6lPX9hu/KwbJn5kbPmVOCmgst/yUSjgn2eAkBpFoQLJFyi5HNtqhxuL5zWcbgOG/ohbJnvLVgO35SYtqUSj2tjHNFX12uqpmQ42k0KVHMUx0u0p3wXDXbsjsodxjUKm8LbikxewZmwGNbAaFf6VNFb0AqlqdWsHtsF6z2lkmWjX1RQWFQc6ym9nsJuuNLXcsnxpNUrYZHccLSHSNWiUsqO7SM/Lw1lUKW6LaoPimgWPvYl4/0nwAAnXp/GZKNBigAAAABJRU5ErkJggg==',
				ischeck: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMDk5QkI4MTBBMEIxMUVDOUQwNzkzMjQyOTUzMjkwMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMDk5QkI4MjBBMEIxMUVDOUQwNzkzMjQyOTUzMjkwMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQwOTlCQjdGMEEwQjExRUM5RDA3OTMyNDI5NTMyOTAzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQwOTlCQjgwMEEwQjExRUM5RDA3OTMyNDI5NTMyOTAzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ouYgdwAAA2FJREFUeNrEl2tsDFEUx3VRr5BSomGliLeopEHrUUGwpB4hTahX9wMRVJSIlA/9gCUIi3qEEqnwoRHdD2grEpVqQzziGTT9IGga8WqKBEut/2n+I5PJvdPZHYmT/LLtzJ37nzn3nHPPjQvUPWzzv6ydw3EeMAlkgglgMOjNe9/BKyBfcQOUgnf/QjwerASbwQDNmI5gKFkEDoOLYAd41toX6WwMeACOUvg12ANmgb4gjnQCo8FqcInPLgaPwD7QIVrxbFAFRoA6kMUXyAdXQYNprLj9MTgJ5oGB4DhfTDx2EyQ5FZcHztOdQTCKbvztMD7qwVrGxkswFtQAb2viOWAvhVaBTeBHjMF8h8L36I0y0EUnPhwco7vWg9M2E8s69gdDQGebcR+Bj4EnHizUiZ/gRGe5ZiqbAyrAZ7q0FnwBt+gpVfZ8YsxIbPjBFKv4DJAB3oONigl6gHJGs48paJ4jnQF3n96w2nMQoFd3WsXz+HuAb2q2bqCSKdaapYBqMEhx7yD4ACYyjVvEE8FMEAanFA8VclKn1guUKJbgKyjm38sM8WkcWMU3M5sUj+UxRHoqWKK4HuLvdEM8lReqFYNzuE6xmF+TfmEWr64e0/q8UAxOc7FpjVNc+8kskQ/q52FAiTUqBie5EJeCkqC4bixtdxGP8B+VeyMut+xfimuGTkTEm0y5bLVaF8INjHBVNrQUHw93LbGRioEVLsTLNXu/7I7NsvYifpc3MhSDi1mfo7Vmax2njWdaP5UNy8PWJ8zK08cyWGr4hhjEg2wmrJZl9qix5lKz22rquuztBVEIl7DpsFqCUdk459/aHuRvLkhWPCj92ELmqM4auUdk0+1W28a0vgaemBvIGn79XHAILFCkmZTGK+xgfXzJeHYulbzfZFNw8tikFKi611y2x/PBVrBLMUmYIqEolsHLNqw9PXxb1UxId7qCLgto1i1aS6abvRTNt+vhLoM1dM9ucE5TIp3YbKbxMB4oMuk52+61iH23VKel7ELWsT93Yil0cxmrmbTaUxVNivbEcoERWcQ4OMKlCDG45N5b9mWJrFrp/Lo0U/OwHezXtd12xyXZYicz8rdwUr9mnzabRPwZita7OatFePAr5VnMOChKk9iTtVrc+YYl8zqr1zcn6/NHgAEA8pW+RLD/M9cAAAAASUVORK5CYII=',
			}
		},
		watch: {
			sel(val) {
				this.curIdx = val;
			},
		},
		methods: {
			close(e) {
				//if(e.target.id != "popwnd")
				//	this.$emit('update:visible', false)
			},
			cancel() {
				this.curIdx = this.sel;
				this.$emit('update:visible', false)
			},
			confirm() {
				let name = '';
				if (this.strName.length > 0)
					name = this.lst[this.curIdx][this.strName];
				else
					name = this.lst[this.curIdx];

				let ret = {
					sel: this.curIdx,
					name: name
				};
				this.$emit('confirm', ret);
				this.cancel();
			},
			SelChange(idx) {
				this.curIdx = idx;
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

	.top {
		height: 108upx;

		view {
			//width: 170upx;
			//margin-top: 14upx;
			line-height: 108upx;
			font-size: 32upx;
			text-align: center;
			background-color: #85dbd0;
			color: #FFFFFF;
		}
	}

	.bottom {
		margin-top: 40upx;
		font-size: 30upx;
		line-height: 80upx;
		height: 50vh;

		&-item {
			width: 600upx;
			display: flex;
			align-items: center;

			view {
				margin-left: 50upx;
				flex: 1;
			}

			image {
				width: 30upx;
				height: 30upx;
				margin-right: 54upx;
			}
		}

		&-active {
			background-color: #f2faf9;
			color: #85dbd0;
		}
	}

	.foot {
		display: flex;
		height: 100upx;
		line-height: 100upx;

		&-cancel {
			width: 300upx;
			text-align: center;
			background-color: #f1f1f1;
		}

		&-ok {
			width: 300upx;
			text-align: center;
			background-color: #85dbd0;
			color: #ffffff;
		}
	}
</style>
