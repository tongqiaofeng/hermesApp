<template>
  <view class="content">
    <popwndSelect
      :visible.sync="bShowUser"
      strTitle="请选择用户"
      :lst="usersList"
      strName="name"
      :sel="userIdx"
      @confirm="userChange"
    ></popwndSelect>
    <view class="inventory-top">
      <view :style="{ height: height + 'px' }"></view>
      <!--  #ifdef  MP-WEIXIN -->
      <view class="mine-title">
        <image
          @click="goBack"
          style="width: 17rpx; height: 30rpx"
          src="../static/imgs/common/back.png"
          mode="aspectFill"
        ></image>
        <input
          class="search-input"
          type="text"
          v-model="keyWord"
          placeholder="搜索"
          placeholder-style="color: #7b7b7b;font-size: 24rpx;"
          @input="inputChange"
        />
      </view>
      <!--  #endif -->
      <!--  #ifndef  MP-WEIXIN -->
      <uni-search-bar
        v-model="keyWord"
        placeholder="搜索"
        @input="inputChange"
        cancelButton="none"
      />
      <!--  #endif -->
      <view class="inputs">
        <view class="item" style="flex: 1">
          <view class="item-title">账户</view>
          <view class="clrGray" style="flex: 1" @click="bShowUser = viewAll">
            <text v-if="usersList.length !== 0">{{
              usersList[userIdx].name
            }}</text>
            <image
              src="../static/imgs/mine/right.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>
      </view>
	  
	  <view style="margin: 20rpx 30rpx;">
		  <uni-segmented-control v-if="userType == 0" :current="tabCurrent" :values="tabItems" styleType="text" activeColor="#85dbd0" @clickItem="onClickTabItem"></uni-segmented-control>
		  <view v-else style="display: flex; justify-content: space-between; margin-top: 30rpx;">
		  	<view class="list-title">账单流水</view>
		  		<view class="list-title" style="display: flex; font-weight: normal; font-size: 28rpx;">
		  			<view>公司欠{{usersList[userIdx].name}}总数：</view>
		  			<view :style="{ color: getSaleStateClr(totalMoney)}">{{currency}} {{formatNumberRgx(totalMoney)}}</view>
		  		</view>
		  </view>
	  </view>
		
    </view>
    <view v-if="list.length == 0" class="no-data">
      <image src="../static/imgs/common/no.png" mode="aspectFill"></image>
      <text style="font-size: 30rpx">暂无数据~</text>
    </view>
    <view v-else class="list-main">
		<view v-if="userType == 0">
			<view class="content">
				<view v-show="tabCurrent === 0">
					<view class="billList">
						<view v-for="(item, index) in listCensus" :key="index" class="item" @click="selectUser(item.personId)">
							<view style="display: flex;">
								<view class="" :style="{ color: getSaleStateClr(item.totalPrice), 'margin-right': '10rpx'}">●</view>
								<view style="display: flex;" v-if="item.type == '其他'">
									<view style="font-weight: bold;">{{item.name}}</view>
									<view>欠公司</view>
								</view> 
								<view style="display: flex;" v-else>
									<view>公司欠</view>
									<view style="font-weight: bold;">{{item.name}}</view>
									</view>
							</view>
							
							<view class="" :style="{ color: getSaleStateClr(item.totalPrice)}">{{item.currency}} {{formatNumberRgx(item.totalPrice)}}</view>
						</view>
					</view>
				</view>
				<view v-show="tabCurrent === 1">
					<view class="billList">
						<view v-for="(item, index) in list" :key="index" class="item" @click="checkDetails(item)">
							<view style="display: flex;">
								<view :style="{ color: getSaleStateClr(item.totalHkPrice, item.flag)}">●</view>
								<view  style="margin: 0rpx 30rpx 0rpx 10rpx;">{{item.time}}</view>
								<view>{{getTradeType(item.tradeType, item.flag)}}</view>
							</view>
							
							<view :style="{ color: getSaleStateClr(getShowMoney(item))}">{{currency}} {{formatNumberRgx(getShowMoney(item))}}</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<view v-else>
			<view class="billList">
				<view v-for="(item, index) in list" :key="index" class="item" @click="checkDetails(item)">
					<view style="display: flex;">
						<view :style="{ color: getSaleStateClr(item.totalHkPrice, item.flag)}">●</view>
						<view  style="margin: 0rpx 30rpx 0rpx 10rpx;">{{item.time}}</view>
						<view>{{getTradeType(item.tradeType, item.flag)}}</view>
					</view>
					
					<view :style="{ color: getSaleStateClr(getShowMoney(item))}">{{currency}} {{formatNumberRgx(getShowMoney(item))}}</view>
				</view>
			</view>
		</view>
      </view>
		
    </view>
  </view>
</template>

<script>
import popwndSelect from "@/components/popwnd/popwnd_select_blue.vue";
export default {
  components: {
    popwndSelect,
  },
  data() {
    return {
      height: null,
      keyWord: "",
      page: 1,

      bShowUser: false,
      userIdx: 0,
      usersList: [],

	  tabItems: ['债务统计', '账单流水'],
      tabCurrent: 0,
		
      listCensus: [],
      list: [],
	  totalMoney:0,
	  currency:'',
	  userType:0,

      haveMore: 0,
	  viewAll:false
    };
  },
 async onLoad() {
 	await this.$onLaunched;
    // 获取手机状态栏高度
    uni.getSystemInfo({
      success: (data) => {
		  this.height = data.statusBarHeight;
      },
    });

    if (this.list.length == 0 && uni.getStorageSync("token").length > 0) {
      this.getUserList();
    }
  },
  onReady() {
  	this.hidePageNavInWechatBrowser();
  },
  onPullDownRefresh() {
    uni.showLoading({
      title: "正在刷新",
    });
    this.page = 1;
    this.list = [];
    this.haveMore = 0;
    this.getUserList();
    uni.stopPullDownRefresh();
  },
  onReachBottom() {
    if (this.haveMore == 0) {
      this.page++;
      this.search();
    }
  },
  methods: {
    // 查询商品
    search() {
      uni.showLoading({
        title: "加载中...",
      });
      this.soldNum = 0;
      this.reserveNum = 0;
      let data = {};
      data = {
        keyword: this.keyWord.trim(),
        personId: this.usersList[this.userIdx].id,
        page: this.page,
        pageNum: 10,
		flag:2,
      };

	  this.userType = this.usersList[this.userIdx].type;

      uni.request({
        url: this.$baseFileUrl + "/billSearch?pageNum=10&page="+this.page,
        method: "POST",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        data: data,
        complete: (ret) => {
          uni.hideLoading();
          if (this.checkBack(ret) == false) return;
		  
		  if(this.userType == 0){
			  this.listCensus = ret.data.censusData;
			  
			  this.totalMoney = ret.data.allRecord.personAllMoney;
			  this.currency = ret.data.allRecord.currency;
			  
			  if (ret.data.allRecord.list.length == 0) {
			    this.haveMore = 1;
			  } else {
			    let data = this.list.concat(ret.data.allRecord.list);
			    this.list = data;
			  }
		  }
		  else{
			  this.totalMoney = ret.data.personAllMoney;
			  this.currency = ret.data.currency;
			  
			  if (ret.data.list.length == 0) {
			    this.haveMore = 1;
			  } else {
			    let data = this.list.concat(ret.data.list);
			    this.list = data;
			  }
		  }


          if (this.list.length == 0) {
            uni.showToast({
              icon: "none",
              title: "暂无数据",
            });
          }
        },
      });
    },
    // 获取用户列表
    getUserList() {		
      uni.request({
        url: this.$baseFileUrl + "/billUserList",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        data: {},
        complete: (ret) => {
          uni.hideLoading();
          if (this.checkBack(ret, true) == false) return;
          if (ret.data.length > 0) this.usersList = ret.data;
		  
		  let userPermissions = getApp().globalData.userInfo.userPermissions;
		  console.log(userPermissions);
		  if(userPermissions.hermes_bill){
			  if(userPermissions.hermes_bill.userId > 0){
				  this.selectUser(userPermissions.hermes_bill.userId);
			  }
			  else if(userPermissions.hermes_bill.userId == 0){
				  this.viewAll = true;
			  }
		  }
		  
		  

          this.search();
        },
      });
    },
    // 模糊搜索
    inputChange() {
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 用户变化
    userChange(e) {
      this.userIdx = e.sel;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
	onClickTabItem(e){
		if (this.tabCurrent != e.currentIndex) {
		     this.tabCurrent = e.currentIndex;
		}
	},
    getShowMoney(item){
		if(this.userType == 0)
			return item.totalHkPrice*item.flag;
		else if(this.userType == 1)
			return item.totalHkPrice*-item.flag;
		else
			return item.money*item.flag;
	},
    // 不同状态颜色
    getSaleStateClr(value) {
		 if(value < 0) return "#D62B46";
		 else return "#4DCCB3";
    },
	getTradeType(type, flag) {
		let gs = '';
		if(this.userType == 2) gs = 'TopTime';
	
		switch(type){
			case 0: return gs+'买入'; break;
			case 1: return gs+'卖出'; break;
			case 2: return '转账' + ((flag == 1) ? '-收入' : '-支出'); break;
			case 3: return '买入退款'; break;
			case 4: return '卖出退款'; break;
			case 5: return '其他收入'; break;
			case 6: return '其他支出'; break;
			default: return '/';	break;
		}
	},
    // 查看包包详情
    checkDetails(item) {
      uni.navigateTo({
        url: "../minePackage/billDetail?ut=" + this.userType + '&id=' + item.id,
      });
    },
	selectUser(userId){
		for(let i = 0; i < this.usersList.length; ++i){
			if(this.usersList[i].id == userId){
				let e = {sel:0};
				e.sel = i;
				this.userChange(e);
				break;
			}
		}
	},
    // 返回上一层
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  //background-color: #f9f9f9;

  .inventory-top {
    padding-bottom: 0rpx;
    position: fixed;
    top: var(--window-top);
    left: 0;
    right: 0;
    z-index: 99;
    background-color: #fff;

    .top-input,
    .item {
      padding: 0 30rpx;
    }

    .mine-title {
      height: 44px;
      padding: 0 40rpx;
      display: flex;
      align-items: center;

      .search-input {
        width: 400rpx;
        padding: 10rpx 20rpx;
        margin-left: 20rpx;
        background-color: #f6f6f6;
        border-radius: 30px;
        text-align: center;
        font-size: 24rpx;
      }
    }

    .inputs {
      margin-top: 40rpx;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item-title {
          font-size: 28rpx;
          color: #565656;
          font-weight: bold;
        }

        .clrGray {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          text {
            font-size: 28rpx;
            color: #c8c8c8;
          }

          image {
            width: 44rpx;
            height: 44rpx;
            margin-left: 30rpx;
          }
        }
      }

      .line {
        width: 100%;
        height: 2rpx;
        margin-top: 26rpx;
        margin-bottom: 26rpx;
        background-color: #f9f9f9;
      }
    }
	
	.list-title{
		font-size: 30rpx;
		font-weight: bold; 
		color: #333333;
	}
  }

  .list-main {
    margin-top: 30rpx;
    /*#ifdef MP-WEIXIN*/
    padding: 350rpx 20rpx 20rpx;
    /*#endif*/
    /*#ifndef MP-WEIXIN*/
    padding: 280rpx 20rpx 20rpx;
    /*#endif*/

    .billList {
		font-size: 28rpx;
		padding: 20rpx;
		box-shadow: 0rpx 0rpx 30rpx #e5e5e5;
		color: #444444;
		.item {
			display: flex;
			justify-content: space-between;
			line-height: 90rpx;
			background-color: #F8F8F8;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			padding: 0rpx 10rpx 0rpx 20rpx;
		}
    }
  }
}
</style>
