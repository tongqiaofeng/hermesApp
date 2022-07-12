<template>
	<view class="content">
		<!-- 销售报表 -->
		<popwndSelect :visible.sync="bShowCurrency" strTitle="请选择统计币种" :lst="currencyList" strName="name"
			:sel="currencyIdx" @confirm="currencyChange">
		</popwndSelect>
		<popwndSelect :visible.sync="bShowProductType" strTitle="请选择产品类别" :lst="productTypeList" strName="name"
			:sel="typeIdx" @confirm="typeChange">
		</popwndSelect>
		<popwndSelect :visible.sync="bShowGroup" strTitle="请选择销售组" :lst="groupList" :sel="groupIdx"
			@confirm="groupChange">
		</popwndSelect>
		<view class="inventory-top" id="inventory-top">
			<view :style="{ height: height + 'px' }"></view>
			<!--  #ifdef  MP-WEIXIN -->
			<view class="mine-title">
				<image @click="goBack" style="width: 17rpx; height: 30rpx" src="../static/imgs/common/back.png"
					mode="aspectFill"></image>
			</view>
			<!--  #endif -->
			<view class="inputs">
				<view class="item" style="flex: 1">
					<view class="item-title">统计币种</view>
					<view class="clrGray" style="flex: 1" @click="bShowCurrency = true">
						<text>{{ currencyList[currencyIdx].name }}</text>
						<image src="../static/imgs/mine/right.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="line"></view>
				<view class="item" style="flex: 1">
					<view class="item-title">产品类别</view>
					<view class="clrGray" style="flex: 1" @click="bShowProductType = true">
						<text>{{ productTypeList[typeIdx].name }}</text>
						<image src="../static/imgs/mine/right.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="line"></view>
				<view class="item" style="flex: 1">
					<view class="item-title">销售组</view>
					<view class="clrGray" style="flex: 1" @click="bShowGroup = true">
						<text v-if="groupList.length !== 0">{{ groupList[groupIdx] }}</text>
						<image src="../static/imgs/mine/right.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="line"></view>
				<view class="item" style="flex: 1">
					<view class="item-title">销售时间</view>
					<view class="clrGray" style="flex: 1" @click="openPicker">
						<input type="text" style="text-align: right; font-size: 28rpx; color: #c8c8c8"
							v-model="saleTime" placeholder="点击选择销售时间"
							placeholder-style="font-size: 28rpx; color: #c8c8c8;" />
						<image src="../static/imgs/mine/right.png" mode="aspectFill"></image>
					</view>
					<sofar-picker :visable.sync="pickerVisable" :defaultDate="defaultDate" @confirm="confirm">
					</sofar-picker>
				</view>
				<view class="line"></view>
				<view class="item-state">
					<view class="state-left">
						<view class="state" @click="stateClick(1)" :style="{
                color: state == 1 ? '#85dbd0' : '#000',
                borderBottom: state == 1 ? '2rpx solid #85dbd0' : '#f9f9f9',
              }"
            >
              可结算</view
            >
            <view
              class="state"
              @click="stateClick(-1)"
              :style="{
                color: state == -1 ? '#85dbd0' : '#000',
                borderBottom: state == -1 ? '2rpx solid #85dbd0' : '#f9f9f9',
              }"
            >
              不可结算</view
            >
          </view>
          <view class="state-right" @click="exportData">导出数据</view>
        </view>
      </view>
    </view>
    <view
      v-if="haveData == 0"
      class="no-data"
      :style="{ 'padding-top': topHeight + 30 + 'px' }"
    >
      <image src="../static/imgs/common/no.png" mode="aspectFill"></image>
      <text style="font-size: 30rpx">暂无数据~</text>
    </view>
    <view
      v-else
      class="inventory-main"
      :style="{ 'padding-top': topHeight + 'px' }"
    >
      <view class="inventory-num">
        <view>总数量：{{ total }}</view>
        <view
          style="display: flex; justify-content: space-between"
          v-if="state == 1 && currencyIdx == 0"
        >
          <view>销售额：{{ getPrice(allSaleMoney, "CNY") }}</view>
          <view>利润：{{ getPrice(allProfit, "CNY") }}</view>
        </view>
        <view
          style="display: flex; justify-content: space-between"
          v-if="state == 1 && currencyIdx == 1"
        >
          <view>销售额：{{ getPrice(allSaleMoney, "HKD") }}</view>
          <view>利润：{{ getPrice(allProfit, "HKD") }}</view>
        </view>
      </view>
      <view class="plantList">
        <view v-for="(item, index) in list" :key="index" class="plant">
          <view @click="checkDetails(item)">
            <view class="item">
              <view class="row">
                <view class="img">
                  <image
                    class="img"
                    v-if="item.img"
                    :src="imgUrl + item.img"
                    mode="aspectFill"
                  >
                  </image>
                </view>
                <view style="flex: 1">
                  <view class="every-name">
                    <view class="bh">{{ item.name }}</view>
                  </view>
                  <view v-if="state == 1">
                    <view v-if="currencyIdx == 0">
                      <view class="cs"
                        >售价：
                        <text>{{
                          getPrice(item.saleCnyOrHkdMoney, "CNY")
                        }}</text>
                      </view>
                      <view class="cs"
                        >利润：
                        <text
                          :style="{ color: item.profit < 0 ? 'red' : '#999' }"
                          >{{ getPrice(item.profit, "CNY") }}</text
                        >
                      </view>
                    </view>
                    <view v-if="currencyIdx == 1">
                      <view class="cs"
                        >售价：
                        <text>{{
                          getPrice(item.saleCnyOrHkdMoney, "HKD")
                        }}</text>
                      </view>
                      <view class="cs"
                        >利润：
                        <text
                          :style="{ color: item.profit < 0 ? 'red' : '#999' }"
                          >{{ getPrice(item.profit, "HKD") }}</text
                        >
                      </view>
                    </view>
                  </view>
                  <view v-if="state == -1">
                    <view v-if="currencyIdx == 0">
                      <view class="cs"
                        >售价：
                        <text>{{
                          getPrice(item.saleCnyOrHkdMoney, "CNY")
                        }}</text>
                      </view>
                      <view class="cs"
                        >利润：
                        {{
                          item.profit < 0 ? "--" : getPrice(item.profit, "CNY")
                        }}
                      </view>
                    </view>
                    <view v-if="currencyIdx == 1">
                      <view class="cs"
                        >售价：
                        <text>{{
                          getPrice(item.saleCnyOrHkdMoney, "HKD")
                        }}</text>
                      </view>
                      <view class="cs"
                        >利润：
                        {{
                          item.profit < 0 ? "--" : getPrice(item.profit, "HKD")
                        }}
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import popwndSelect from "@/components/popwnd/popwnd_select_blue.vue";
	import sofarPicker from "@/components/sofar-picker/sofar-picker.vue";

	export default {
		components: {
			popwndSelect,
			sofarPicker
		},
		data() {
			return {
				imgUrl: this.$baseUrl + "/jewellery/api",
				haveData: 1,
				height: null,
				page: 1,

      bShowCurrency: false,
      currencyIdx: 0,
      currencyList: [
        {
          id: 1,
          name: "CNY",
        },
        {
          id: 2,
          name: "HKD",
        },
      ],

      bShowProductType: false,
      typeIdx: 0,
      productTypeList: [
        {
          id: 0,
          name: "全部",
        },
        {
          id: 1,
          name: "原材料",
        },
        {
          id: 2,
          name: "成品",
        },
      ],

      bShowGroup: false,
      groupIdx: 0,
      groupList: [],

      list: [],
      total: 0,

      haveMore: 0,
      state: 1,
      saleTime: "",
      pickerVisable: false,
      defaultDate: [],
      startTime: "",
      endTime: "",

      allSaleMoney: 0,
      allProfit: 0,
      topHeight: 0,

      platform: "",
    };
  },
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query
      .select("#inventory-top")
      .boundingClientRect((data) => {
        console.log("顶部高度");
        console.log(data);
        this.topHeight = data.height;
      })
      .exec();
  },
  onLoad() {
    // 获取手机状态栏高度
    uni.getSystemInfo({
      success: (data) => {
        // 将其赋值给this
        this.height = data.statusBarHeight;
      },
    });

    this.typeIdx = 0;
    this.groupIdx = 0;
    if (this.list.length == 0 && uni.getStorageSync("token").length > 0) {
      console.log("重新获取数据");
      this.getGroupList();
      this.search();
    }
  },
  onPullDownRefresh() {
    uni.showLoading({
      title: "正在刷新",
    });
    console.log("获取数据");
    this.page = 1;
    this.list = [];
    this.haveMore = 0;
    this.getGroupList();
    this.search();
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
        startTime: this.startTime,
        endTime: this.endTime,
        state: this.state,
        currency: this.currencyIdx == 0 ? "CNY" : "HKD",
      };

      if (this.typeIdx > 0) data.type = this.productTypeList[this.typeIdx].id;
      if (this.groupIdx > 0) data.group = this.groupList[this.groupIdx];

      uni.request({
        url:
          this.$baseUrl +
          "/jewellery/api/jewellerySalesReport?page=" +
          this.page +
          "&pageNum=10",
        method: "POST",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        data: data,
        complete: (res) => {
          uni.hideLoading();
          console.log("销售报表列表");
          console.log(res);
          if (this.checkBack(res) == false) return;

          this.total = res.data.total;
          this.allSaleMoney = res.data.allSaleMoney;
          this.allProfit = res.data.allProfit;

          if (res.data.list.length == 0) {
            this.haveMore = 1;
          } else {
            let data = this.list.concat(res.data.list);
            this.list = data;
          }

          if (this.list.length == 0) {
            this.haveData = 0;
            uni.showToast({
              icon: "none",
              title: "暂无数据",
            });
          } else {
            this.haveData = 1;
          }
        },
      });
    },
    // 导出数据
    exportData() {
      uni.showLoading({
        title: "下载中...",
      });
      this.soldNum = 0;
      this.reserveNum = 0;
      let data = {};
      data = {
        startTime: this.startTime,
        endTime: this.endTime,
        currency: this.currencyIdx == 0 ? "CNY" : "HKD",
      };

      if (this.typeIdx > 0) data.type = this.productTypeList[this.typeIdx].id;
      if (this.groupIdx > 0) data.group = this.groupList[this.groupIdx];

      uni.request({
        url: this.$baseUrl + "/jewellery/api/salesReportExport",
        method: "POST",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        data: data,
        complete: (res) => {
          uni.hideLoading();
          console.log("导出销售报表");
          console.log(res);
          if (res.statusCode === 200) {
            let url = this.$baseUrl + "/jewellery/api" + res.data.url;

            // #ifdef APP-PLUS
            this.platform = "APP";
            // #endif
            // #ifdef H5
            this.platform = "H5";
            // #endif

            if (this.platform === "H5") {
              //h5使用a标签下载
              let el = document.createElement("a");
              document.body.appendChild(el);
              el.href = url;
              el.target = "_blank";
              el.click();
              document.body.removeChild(el);
            } else if (this.platform == "APP") {
              //app使用原生plus下载
              let dtask = plus.downloader.createDownload(
                url,
                {
                  filename: "_downloads/" + url, //利用保存路径，实现下载文件的重命名
                },
                (d, status) => {
                  //d为下载的文件对象
                  if (status == 200) {
                    plus.runtime.openFile(d.filename); //选择软件打开文件
                  } else {
                    //下载失败
                    plus.downloader.clear(); //清除下载任务
                  }
                }
              );
              dtask.start();

              // uni.downloadFile({
              // 	url: url,
              // 	success: (res) => {
              // 		if (res.statusCode === 200) {
              // 			uni.saveFile({
              // 				tempFilePath: res.tempFilePath,
              // 				success: (resData) => {
              // 					uni.openDocument({
              // 						filePath: resData
              // 							.savedFilePath,
              // 					});
              // 				},
              // 			});
              // 		}
              // 	}
              // });
            } else {
              //微信端使用uni.downloadFile、uni.openDocument
              //this.copyUrl(url)
              uni.downloadFile({
                url: url,
                success: (res) => {
                  if (res.statusCode === 200) {
                    let filePath = res.tempFilePath;
                    uni.openDocument({
                      filePath: filePath,
                      success: function (res) {
                        console.log("已打开");
                      },
                    });
                  }
                },
              });
            }
          }
        },
      });
    },
    // 统计币种
    currencyChange(e) {
      this.currencyIdx = e.sel;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 产品类别
    typeChange(e) {
      this.typeIdx = e.sel;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 销售员
    groupChange(e) {
      this.groupIdx = e.sel;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 销售时间
    openPicker() {
      this.pickerVisable = true;
    },
    confirm(date) {
      console.log(date);
      this.startTime = date[0];
      this.endTime = date[1];
      this.saleTime = date.join(" 至 ");
    },
    // 是否可结算
    stateClick(num) {
      this.state = num;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 查看珠宝详情
    checkDetails(item) {
      if (item.isMaterial == 1) {
        uni.navigateTo({
          url: "./materialDetails?id=" + item.id,
        });
      } else {
        uni.navigateTo({
          url: "./jewelryDetails?id=" + item.id,
        });
      }
    },
    // 获取销售员列表
    getGroupList() {
      uni.request({
        url: this.$baseUrl + "/jewellery/api/groupList",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        complete: (ret) => {
          console.log("销售员列表");
          console.log(ret);
          uni.hideLoading();
          if (this.checkBack(ret, true) == false) return;
          if (ret.data.length > 0) this.groupList = ret.data;
        },
      });
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
  background-color: #f9f9f9;

  .inventory-top {
    // padding-bottom: 26rpx;
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

      .item-state {
        padding: 0 30rpx;
        flex: 1;
        display: flex;
        justify-content: space-between;
        font-size: 24rpx;

        .state-left {
          display: flex;
          justify-content: flex-start;

          .state {
            margin-right: 30rpx;
            padding-bottom: 20rpx;
          }
        }

        .state-right {
          color: #85dbd0;
          cursor: pointer;
        }
      }

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
  }

  .inventory-main {
    margin-top: 20rpx;
    /*#ifdef MP-WEIXIN*/
    padding: 500rpx 30rpx 30rpx;
    /*#endif*/
    /*#ifndef MP-WEIXIN*/
    padding: 380rpx 30rpx 30rpx;
    /*#endif*/

    .inventory-num {
      margin-bottom: 20rpx;
      font-size: 22rpx;
      color: #aaa;
    }

    .plantList {
      .plant {
        margin-bottom: 30rpx;
        padding: 20rpx 20rpx 30rpx;
        border-radius: 30rpx;
        position: relative;
        background-color: #ffffff;
        font-size: 26rpx;

        .item {
          .every-name {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .bh {
              width: 350rpx;
              flex: 1;
              overflow: hidden;
              word-break: keep-all;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 28rpx;
              font-weight: bold;
              color: #000;
            }
          }

          .row {
            display: flex;
            // justify-content: space-between;
            align-items: center;
            color: #999999;

            .img {
              width: 166rpx;
              height: 168rpx;
              margin-right: 20rpx;
              border-radius: 30rpx;
            }

            .cs {
              margin-top: 10rpx;
              font-size: 22rpx;
            }
          }
        }

        .line {
          width: 100%;
          height: 2rpx;
          margin: 30rpx 0;
          background-color: #f9f9f9;
        }

        .price {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          font-size: 26rpx;

          .price-every {
            margin-top: 20rpx;
          }
        }
      }
    }
  }
}
</style>
