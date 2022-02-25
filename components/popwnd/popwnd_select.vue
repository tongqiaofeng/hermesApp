<template>
	<view class="popwnd-box" v-if="visible" @click="close">
		<view id="popwnd" class="popwnd">
			<view class="top">
				<view>{{strTitle}}</view>
			</view>

			<scroll-view class="bottom" scroll-y="true">

				<view v-for="(item, index) in lst" :key="index"
					:class="['bottom-item', {'bottom-active':curIdx==index}]" @click="SetSel(index)">
					<view v-if="strName.length > 0">{{item[strName]}}</view>
					<view v-else>{{item}}</view>
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
				type: Number,
				default: 0,
			},
			lst: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				curIdx: 0,
				nocheck: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQjJDRUVFRUY1NDMxMUU5OTE0NUI4MDYwMkE4Qzc4MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQjJDRUVFRkY1NDMxMUU5OTE0NUI4MDYwMkE4Qzc4MSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJCMkNFRUVDRjU0MzExRTk5MTQ1QjgwNjAyQThDNzgxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJCMkNFRUVERjU0MzExRTk5MTQ1QjgwNjAyQThDNzgxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+z0E8WAAAAnFJREFUeNq8l1tIFFEYgI/b0kN2M6uneijKBIkeelihixGEWEgL0Q0psIuBUiglFQVKllFEUb0E2Y2ULhBlghEEFQTt+tJDSWQPQVAQhIVYLaXW98M/cZic3NU988PHz56ZOd+c2XPm/JOTSCRMmlEKZVAMC2GCtv+Cl5CEh7FYrD2dznLSENfCEZhktb2DbhiEQlhgHZMbaYST3MRAUKeR/whXQi+cgX7YD3PkZmEulEOczgtB2mbBbvgAx+BHMpksz3TEh6EJhmArtAV1gPSfNoRx0jWYDCc450A6Iz6l0k69sM1kGIjukfLgljwpbuTySOIG2AuXYA18M6MM5EOwSQdSifx0kHiZTopHsMNkKZDXk25DHfLVw4kfwE9YZbIcyDeSvkIH8nG2WP78XFhv3EVcfU22+Dh8gfuurIz6KektHPTEpXrskHEfzbrcykS8QRuvhyC+qblaxEv1R79rK487pZNsuYgL4IUJL17Ji8mbXG9CFH+0Z/XEEMUpW1wQoniaJ34N80MUL4IBET/XPTY3JPFsWcoivqMNm10brcLgQkT3XaNVg+to0HwjYklnQonD0RaRFsNVXiSDEavU+Q3tDkfbobnGvx/LtjUFWh2M9pwWitsZ7Xe/WLbE81ABR7Mo3afVZyvSv7VX1HfeHsjXLXIG7Bqj9Kz22Yl0i30sOsz5FbqDVIPUSHLBkwyFS0gtWuxfQbrNf0404NoafbHIHv0YnsFFLdpSAbLxpHVQBSu0eSfSltF8wuRpqVJvtb2HHvisK2E6zNPJ44VMpmakn8by7eTtXmv1scunw1Tf8T7o0hVxF2HfSB3+EWAAYv+orw4aqcUAAAAASUVORK5CYII=',
				ischeck: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBREFEMTE0NUY1NDMxMUU5OEQ3OEVCNUMwN0RCMjRFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBREFEMTE0NkY1NDMxMUU5OEQ3OEVCNUMwN0RCMjRFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFEQUQxMTQzRjU0MzExRTk4RDc4RUI1QzA3REIyNEUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFEQUQxMTQ0RjU0MzExRTk4RDc4RUI1QzA3REIyNEUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mm8eSwAAAyRJREFUeNq8l1tIlEEUxz+3zSArysqHsKIoEyIieijoSi+hYS5EUZjd7IJGF0npJhiZQmGl1UOQ2UWlC0QlYQRCPQRRLz5UhBFGQUYQGtJlI936nTgbH9vM7re70YHfDsw3M/+5nJlzNmVC3U/Hoy2FHJgLM2Co1v+Ap/AY7r3Z5dz2MliKB+HdcBiGu+pew3MYgGyY5vomEzkEx5hEv21QXxTBJdADJ+Ez7IVJMlmYDHkQYPBskLpM2AHvoBq+Taz/3SauFVdAFYRgHbTYBkD0L0MwQHEJRsBR2uzzsuJaFW3Tji1OnIbQLYpRcE12iok0xhKuhD1wHpbBFydBQzwEq3UhGxE/YRNeoE7RDpudf2SIl1Nch1LEc01nLA40GIZEGUe2bwMsUmeSiXfDI2hE5L2tI6K9enSptBsIr1gOPw1WRhHdptdItiwfZsMsPZIj0MXg+6P0D+hEq9wrlh+ZUbqlU62evRe7wIo2WVb9kmKqXD+fvkhiBy0DrY9D1FFHOmD5VqMTyBHhVVrZZGiYKitIwKeqGTzTUH9VyxIRnu9yrkgr1pcqESs2eHiQ4hMsFOEs6LB0Xp7ETQpY6p+Jd4e9utPSaHQSwhls9yBDfbf7ARnm/D8LuoWzLI16kxDokYfCUJ8eFn4hd8vSuT0J4buW+pnQ79PnLkVfrkg7nYTwGUv9eMlWRPiGVqwxNOqDsgRE69jmV4aXK5wYnPVp3HU0azDZcQkAcYjeQbTU8q1Syys+l2iGRh2TFWlW4mWleZZ3eroGlovidO6wGNKtHRllYEnqCjXbHKfOKaHwPlxmwI4oYbFLc7Y02n31R7w0kpo2w1pL/05deYXGbh+DfI+1DYieUtEiEY3MQFrViws0vsYySWO9iJZp9tmM6B9f8Ue026nPpITIsRr8EzZE63XMNkQL3d/8hvYFGkFKIFfP9EGcgvMoGjTZNyYGfkvf7fqwNKnjPIRzmrQFLWISu1fAVlis1VsQbUjkL4wkd5JHlbvq3oKkMB81ZRoDU9R5wibOVIPoh2T+O4WjV75u+xzDlZNr+ERvxE0E+2IN+EuAAQB8YdTThj6A9wAAAABJRU5ErkJggg==',

			}
		},
		watch: {
			sel(val) {
				this.curIdx = val;
			},
		},
		mounted() {},
		methods: {
			SetSel(index) {
				this.curIdx = index;
			},
			close(e) {
				//if(e.target.id != "popwnd")
				//	this.$emit('update:visible', false)
			},
			cancel() {
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
		width: 658upx;
		height: 752upx;
		background: white;
		border-radius: 20upx;
		overflow: hidden;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top {
		height: 90upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		view {
			font-size: 34upx;
			text-align: center;
		}
	}

	.bottom {
		margin-top: 40upx;
		margin-bottom: 10upx;
		font-size: 30upx;
		line-height: 80upx;
		height: 510upx;

		&-item {
			margin-left: 81upx;
			margin-bottom: 30upx;
			width: 496upx;
			height: 80upx;
			text-align: center;

			border: 1upx solid #c8c8c8;
			border-radius: 40upx;

		}

		&-active {
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfAAAABQCAYAAADmxye8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowOTQxMEIzMzEyNTQxMUVBODE4MzlCMjA2RTRGNzA1RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowOTQxMEIzNDEyNTQxMUVBODE4MzlCMjA2RTRGNzA1RSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA5NDEwQjMxMTI1NDExRUE4MTgzOUIyMDZFNEY3MDVFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA5NDEwQjMyMTI1NDExRUE4MTgzOUIyMDZFNEY3MDVFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MEM6CAAABoBJREFUeNrs3c+PnHUd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');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			color: #FFFFFF;
			border: 1upx solid #FFFFFF;
		}
	}

	.foot {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;

		&-cancel {
			width: 228upx;
			text-align: center;
			background-color: #f1f1f1;
			border-radius: 40upx;
			margin-right: 40upx;
		}

		&-ok {
			width: 228upx;
			text-align: center;
			background-color: #e5c5ab;
			border-radius: 40upx
		}
	}
</style>
