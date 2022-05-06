<template>
	<view class="pay-order-container">
		<!-- 选择支付方式进行支付 -->
		<!-- 选择支付方式后，跳转支付界面，立即支付~~~~选择银行卡、余额...支付，
		点击支付调用uni.requestPayment进行支付 -->
		<view class="payPopup-container">
			<radio-group @change="radioChange">
				<label v-for="(item, index) in payList" :key="item.value">
					<view class="payPopup-every">
						<radio :value="item.value" :checked="index === current" style="transform: scale(0.7,0.7)"
							color="#85dbd0" />
						<text>{{item.name}}</text>
					</view>
				</label>
			</radio-group>
			<view class="button-sure" @click="pay">确认支付</view>
		</view>
		<uni-popup ref="payPopup" type="center">
			<view class="popup-container">
				<view class="">
					支付金额
				</view>
				<view class="button-sure" @click="paySure">立即支付</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				payList: [{
						value: '0',
						name: '微信支付'
					},
					{
						value: '1',
						name: '支付宝支付'
					}
				]
			}
		},
		onShow() {

		},
		onLoad() {

		},
		methods: {
			// 选择支付方式
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			// 支付
			pay() {
				this.$refs.payPopup.open();
			},
			// 调取支付界面支付
			paySure() {
				// 传递参数
				// 商品id、数量、商品价格、交易金额
				// 交易类型（JSAPI--JSAPI支付（或小程序支付）、NATIVE--Native支付、APP--app支付，MWEB--H5支付）
				// 货币类型  境内商户号仅支持人民币  CNY：人民币
				// 调用后端支付接口，后端调用微信统一下单接口返回给前端订单信息
				// 前端根据订单信息调用  uni.requestPayment()调取支付界面进行支付，成功后异步从新请求列表页，更新订单状态
				// md5() 加密签名字段
				
				/*let time = String(Date.now());
				let $chars = 'ABCDEFGHJKMNPQRSTWXYZ2345678';
				let maxPos = $chars.length;
				let str = '';
				for (let i = 0; i < 32; i++) {
					str += $chars.charAt(Math.floor(Math.random() * maxPos));
				};
				
				let paySign ="wxd7cb2e8575630361\n" + time + "\n" + str +"\n" + res.data.payMsg.package + '\n';
				
				let key = "-----BEGIN PRIVATE KEY-----" +
					"MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSAfmcCgYjQcF0" +
					"/UqUszy4UMF9AgbPcXhy9WUk3esc+xYwMsTb5J/yNFZxJZG3AaYUy/GT5Iju4ynY" +
					"M5FMJtJC2is8cGtDEv1wdzpjpK3/9M8nlU3UA1vvAbXB9B4Fd4N03qUpg04t4dik" +
					"b5IRd0oUMO2dHoA8dAKTD5anz+jh78lt3xhWk+eo2ipbq+ewTrUh9aRMDK2x++TV" +
					"URYvp0X0fdJcgjAzGtvGnb/xRpU9l6cYCWy5Gbc5qTuc6reanB+YlsKmKc/FIRDN" +
					"7mNSvnAL6IfbgCb7XzCdPiQuXVvks9rjXqDALAuatsK4iMhsL9B3Xr4eWNlCZn1z" +
					"HBtTvRN7AgMBAAECggEAQn6rmVO3M8yrQ667wa+rBzVSvpE4tNBZ8hRvTSgTPN7n" +
					"3KUGnhWa62bVBAiARfD4tFcLC+ftz64P3swdMn6MTuyjigSSge9uXgDydQB8s7HB" +
					"Mehdd0cFAf2Jnnr8UoDQF94zb5yK0Y5UOWS2XF9oDlKbugchVYLqGcRy0HnNZFQk" +
					"nLdRvxIcyhgwDCh71tQeoXbhzE5KXafN9mupjbUG2Rl2PYUMdy3vRek3wkgHSGrO" +
					"Sr9IMHsL3DHIBEMSiT4OwLt+BmKzBxGS8FS/G3Nh3cqdqMmxWk3qaRtGFn/JWHfB" +
					"FGlSzZiBN0O6qgblFKVudG345Oz3MoZsRp9tEzp/gQKBgQDqYwXDeuN8PJTIS2g5" +
					"tmi5YAoTxRzcTh2NvSPWxk+AdgnoReVUZoaoLslxHXApZB1aEX8ldSkjNeSK+oN9" +
					"Rj1B+tH7O5iAxxNGhRxMndxbGKmTjYqfgWTCbSmWSPfxymPWPn/IySmGbuvC5Ea/" +
					"tzLOQ0cncwWKmJSHVC2Tpc5xQQKBgQDlX3SL/H6LOXsbncwi7+TORuqZW58QyhOQ" +
					"0LoVnCnCxz+HQkGwrerJonUiSSAwKKdoW2Kg+y/ftcefnxiL6J0w54CfE5v2YV6i" +
					"AZFEF0/jK1Kmin2/+pXp/8xR94hg9UbCQgX/cYjh0qxE9HmC1Y0QSzS5VjdDqk5U" +
					"qCUTE6EZuwKBgEukFVIWsJ+BdYqGO2aUpYtdoSLsM/otA4Cgj5ZafYG5lkztcash" +
					"Q0e3ga8NjwrskkRk7SGLg/EnDVCEtDaTmmVWqrlnbDnzBRd3EcDwGRMVDHTf8uKz" +
					"AW91hzxG5C2V4U5c8SQ9Nzd5SICm5uYsGytRrv7eMeWehCCAXA0QL2WBAoGAM8KP" +
					"pUtMLxTAkCHSwAuMgXQFWqgPRBWlxqcjZt7/mYGm91nfQwRsGCY98oe36MYzyNve" +
					"bN9iFUSLEJ0xR9ktJ60GHF+rcTTVyw85fbkZAPV0yDo2WE0u6UgdDl4ie2a+GfYW" +
					"LmercPI+h6z3gqu4EnY2JqCrBez3kikDfMOQNiMCgYAVyXfjqQWFPryaggpR+60b" +
					"pzvTul0Bgp8eKX4kvvn4WOo7i5QPw+sMFs35RME1QbWbUmirInRscKPdPqyCPjeC" +
					"6q6reAr8/RfmtKUA9P0IX+8ysOy0Fll8+aj+vyOQfVSgbsFROz7ktSOH2ASwnqfK" +
					"rz922JiOXkHQk+9MXIx31w==" + "-----END PRIVATE KEY-----";
				
				let en = new JSEncrypt();
				en.setPublicKey(key);
				let encStr = en.encrypt(paySign);
				
				console.log('签名')
				console.log(time)
				console.log(str)
				console.log(paySign);
				console.log(res.data.prepayId)
				console.log(encStr);*/
				
				uni.request({
					url: this.$baseUrl + "/weChatCreateOrder",
					method: "POST",
					data: {
						
					},
					header: {
						"content-type": "application/json",
						// token: uni.getStorageSync('token')
						token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrIjoiYWRtaW4iLCJhdWQiOiIxNCIsInJvbGUiOiJhZG1pbiIsImlkIjoiMTQiLCJ1c2VybmFtZSI6ImFkbWluX2hrIn0.zGu2d3hDhyXBdN8Awmo7RVyYTQhCT_b4tgSQniNQ7Qg"
					},
					complete: (res) => {
						uni.hideLoading();
						console.log('生成订单');
						console.log(res);
						let verification = res.data;

						/*let time = String(Date.now());
						let $chars = 'ABCDEFGHJKMNPQRSTWXYZ2345678';
						let maxPos = $chars.length;
						let str = '';
						for (let i = 0; i < 32; i++) {
							str += $chars.charAt(Math.floor(Math.random() * maxPos));
						};
				
						let paySign ="wxd7cb2e8575630361\n" + time + "\n" + str +"\n" + res.data.payMsg.package + '\n';
				
						let key = "-----BEGIN PRIVATE KEY-----" +
							"MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSAfmcCgYjQcF0" +
							"/UqUszy4UMF9AgbPcXhy9WUk3esc+xYwMsTb5J/yNFZxJZG3AaYUy/GT5Iju4ynY" +
							"M5FMJtJC2is8cGtDEv1wdzpjpK3/9M8nlU3UA1vvAbXB9B4Fd4N03qUpg04t4dik" +
							"b5IRd0oUMO2dHoA8dAKTD5anz+jh78lt3xhWk+eo2ipbq+ewTrUh9aRMDK2x++TV" +
							"URYvp0X0fdJcgjAzGtvGnb/xRpU9l6cYCWy5Gbc5qTuc6reanB+YlsKmKc/FIRDN" +
							"7mNSvnAL6IfbgCb7XzCdPiQuXVvks9rjXqDALAuatsK4iMhsL9B3Xr4eWNlCZn1z" +
							"HBtTvRN7AgMBAAECggEAQn6rmVO3M8yrQ667wa+rBzVSvpE4tNBZ8hRvTSgTPN7n" +
							"3KUGnhWa62bVBAiARfD4tFcLC+ftz64P3swdMn6MTuyjigSSge9uXgDydQB8s7HB" +
							"Mehdd0cFAf2Jnnr8UoDQF94zb5yK0Y5UOWS2XF9oDlKbugchVYLqGcRy0HnNZFQk" +
							"nLdRvxIcyhgwDCh71tQeoXbhzE5KXafN9mupjbUG2Rl2PYUMdy3vRek3wkgHSGrO" +
							"Sr9IMHsL3DHIBEMSiT4OwLt+BmKzBxGS8FS/G3Nh3cqdqMmxWk3qaRtGFn/JWHfB" +
							"FGlSzZiBN0O6qgblFKVudG345Oz3MoZsRp9tEzp/gQKBgQDqYwXDeuN8PJTIS2g5" +
							"tmi5YAoTxRzcTh2NvSPWxk+AdgnoReVUZoaoLslxHXApZB1aEX8ldSkjNeSK+oN9" +
							"Rj1B+tH7O5iAxxNGhRxMndxbGKmTjYqfgWTCbSmWSPfxymPWPn/IySmGbuvC5Ea/" +
							"tzLOQ0cncwWKmJSHVC2Tpc5xQQKBgQDlX3SL/H6LOXsbncwi7+TORuqZW58QyhOQ" +
							"0LoVnCnCxz+HQkGwrerJonUiSSAwKKdoW2Kg+y/ftcefnxiL6J0w54CfE5v2YV6i" +
							"AZFEF0/jK1Kmin2/+pXp/8xR94hg9UbCQgX/cYjh0qxE9HmC1Y0QSzS5VjdDqk5U" +
							"qCUTE6EZuwKBgEukFVIWsJ+BdYqGO2aUpYtdoSLsM/otA4Cgj5ZafYG5lkztcash" +
							"Q0e3ga8NjwrskkRk7SGLg/EnDVCEtDaTmmVWqrlnbDnzBRd3EcDwGRMVDHTf8uKz" +
							"AW91hzxG5C2V4U5c8SQ9Nzd5SICm5uYsGytRrv7eMeWehCCAXA0QL2WBAoGAM8KP" +
							"pUtMLxTAkCHSwAuMgXQFWqgPRBWlxqcjZt7/mYGm91nfQwRsGCY98oe36MYzyNve" +
							"bN9iFUSLEJ0xR9ktJ60GHF+rcTTVyw85fbkZAPV0yDo2WE0u6UgdDl4ie2a+GfYW" +
							"LmercPI+h6z3gqu4EnY2JqCrBez3kikDfMOQNiMCgYAVyXfjqQWFPryaggpR+60b" +
							"pzvTul0Bgp8eKX4kvvn4WOo7i5QPw+sMFs35RME1QbWbUmirInRscKPdPqyCPjeC" +
							"6q6reAr8/RfmtKUA9P0IX+8ysOy0Fll8+aj+vyOQfVSgbsFROz7ktSOH2ASwnqfK" +
							"rz922JiOXkHQk+9MXIx31w==" + "-----END PRIVATE KEY-----";
						
						let en = new JSEncrypt();
						en.setPublicKey(key);
						let encStr = en.encrypt(paySign);
				
						console.log('签名')
						console.log(time)
						console.log(str)
						console.log(paySign);
						console.log(res.data.prepayId)
						console.log(encStr);*/

						uni.requestPayment({
							timeStamp: verification.payMsg.timeStamp.toString(),
							nonceStr: verification.payMsg.nonceStr,
							package: verification.payMsg.package,
							signType: 'RSA',
							paySign: verification.payMsg.paySign,
							// timeStamp: time,
							// nonceStr: str,
							// package: 'prepay_id=' + res.data.prepayId,
							// signType: 'RSA',
							// paySign: encStr,
							success: (ret) => {
								console.log('success:');
								console.log(ret);
							},
							fail: (err) => {
								console.log('fail:');
								console.log(err);
							}
						});
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.pay-order-container {

		.button-sure {
			padding: 20rpx 60rpx;
			background-color: #85dbd0;
			border-radius: 60rpx;
			color: #fff;
		}

		.payPopup-container {
			width: 600rpx;
			height: 507rpx;
			padding: 40rpx;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			text-align: center;
			background-color: #fff;

			.payPopup-every {
				width: 110px;
				margin: 0 auto;
				margin-bottom: 20rpx;
				text-align: left;

				text {
					font-size: 28rpx;
				}
			}
		}

		.popup-container {
			width: 600rpx;
			height: 507rpx;
			padding: 40rpx;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			text-align: center;
			background-color: #fff;
		}
	}
</style>
