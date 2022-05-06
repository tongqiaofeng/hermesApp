import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$baseUrl = 'http://192.168.0.164:8081/wechat/api';
Vue.prototype.$baseFileUrl = 'http://192.168.0.164:8081/stock';
Vue.prototype.$baseJewelleryUrl = 'http://192.168.0.164:8081/jewellery/api';

// Vue.prototype.$baseUrl = 'https://hk.wistechx.cn/HermesNewApi/wechat/api';
// Vue.prototype.$baseFileUrl = 'https://hk.wistechx.cn/HermesApi';
// Vue.prototype.$baseJewelleryUrl = 'https://hk.wistechx.cn/HermesNewApi/jewellery/api';

// H5跳转小程序，微信官方推出的开放标签<wx-open-launch-weapp>
Vue.config.ignoredElements.push('wx-open-launch-weapp')

Vue.prototype.checkBack = function (ret, bShwoTip = 1) {
	console.log('状态码判断')
	console.log(ret)
	if (ret.statusCode == 200) {
		return true;
	} else if (bShwoTip == 1) {
		if (ret.statusCode == 400)
			uni.showToast({
				icon: 'none',
				title: ret.data.message,
				duration: 2000
			});
		else if (ret.statusCode == 300)
			uni.showToast({
				icon: 'none',
				title: '请登录后再操作',
				duration: 2000
			});
		else
			uni.showToast({
				icon: 'none',
				title: "操作失败，请重试",
				duration: 2000
			});
	}

	return false;
}

Vue.prototype.$onLaunched = new Promise(resolve => {
	console.log('这是啥')
	console.log(resolve);
	Vue.prototype.$isResolve = resolve;
})

Vue.prototype.checkLogin = function () {
	console.log('要去登录')
	if (uni.getStorageSync('token').length == 0) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		})
		uni.switchTab({
			url: '/pages/mine/mine'
		})
		return true
	} else {
		return false
	}
}

Vue.prototype.setUserInfo = function (ret) {
	console.log('用户信息')
	console.log(ret);
	if (ret.data.id == null)
		return;

	let userInfo = {};
	userInfo.userId = ret.data.id;
	userInfo.userRole = ret.data.role;
	userInfo.userToken = ret.data.token;
	userInfo.userNick = ret.data.nick;
	userInfo.userHeadPic = ret.data.headPic;
	userInfo.phoneNumber = ret.data.username;

	console.log(userInfo);

	getApp().globalData.userInfo = userInfo;
	uni.setStorageSync('userId', userInfo.userId);
	uni.setStorageSync("token", userInfo.userToken);
	uni.setStorageSync("role", userInfo.userRole);
	uni.setStorageSync("nick", userInfo.userNick);
	uni.setStorageSync("headPic", userInfo.userHeadPic);
	uni.setStorageSync("phoneNumber", userInfo.phoneNumber);
}

// 千分价格
Vue.prototype.formatNumberRgx = function (num) {
	if (num == "" || num == null || num == 0) {
		return 0;
	} else {
		let parts = num.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}
}

// 国旗
Vue.prototype.ensignSel = function (currency) {
	// console.log(currency)
	switch (currency) {
		case "CNY":
			return require("./static/imgs/common/CN.png")
			break;
		case "HKD":
			return require("./static/imgs/common/HK.png")
			break;
		case "USD":
			return require("./static/imgs/common/mei.png")
			break;
		case "EUR":
			return require("./static/imgs/common/ou.png")
			break;
		case "GBP":
			return require("./static/imgs/common/ying.png")
			break;
		case "AUD":
			return require("./static/imgs/common/ao.png")
			break;
	}
}

// 币种
Vue.prototype.currencySel = function (currency) {
	// console.log(currency)
	switch (currency) {
		case "1":
			return "CNY"
			break;
		case "2":
			return "HKD"
			break;
		case "3":
			return "USD"
			break;
		case "4":
			return "EUR"
			break;
		case "5":
			return "GBP"
			break;
		case "6":
			return "AUD"
			break;
	}
}

/// 地区
Vue.prototype.regionSel = function (region) {
	// console.log(region)
	switch (region) {
		case "香港":
			return "HK"
			break;
		case "大陆":
			return "CN"
			break;
		case "金边":
			return "KH"
			break;
		case "海外":
			return "ABD"
			break;
		case "成都":
			return "CN"
			break;
		default:
			return "ABD"
			break;
	}
}

// 地区国旗
Vue.prototype.ensignReSel = function (region) {
	// console.log(region)
	switch (region) {
		case "大陆":
			return require("./static/imgs/common/CN.png")
			break;
		case "成都":
			return require("./static/imgs/common/CN.png")
			break;
		case "香港":
			return require("./static/imgs/common/HK.png")
			break;
		case "金边":
			return require("./static/imgs/common/KH.png")
			break;
		case "海外":
			return require("./static/imgs/common/mei.png")
			break;
		default:
			return require("./static/imgs/common/mei.png")
			break;
	}
}

Vue.prototype.getPrice = function (num, currency, noPrice) {
	// console.log(num)
	if (noPrice == undefined)
		noPrice = '--';
	if (num == null || num == "null" || num == "" || num == 0)
		return noPrice;

	num = String(num);

	var parts = num.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return currency + ' ' + parts.join(".");
};

App.mpType = 'app'

const app = new Vue({
	...App
})

app.$mount()