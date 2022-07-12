<template>
  <view class="content">
    <!-- 珠宝成品 -->
    <popwndSelect
      :visible.sync="bShowStock"
      strTitle="请选择地点"
      :lst="stocks"
      strName="name"
      :sel="stockIdx"
      @confirm="stockChange"
    >
    </popwndSelect>
    <popwndSelect
      :visible.sync="bShowTag"
      strTitle="请选择类型"
      :lst="tagList"
      :sel="tagIdx"
      @confirm="tagChange"
    >
    </popwndSelect>
    <popwndSelect
      :visible.sync="bShowState"
      strTitle="请选择状态"
      :lst="states"
      strName="name"
      :sel="stateIdx"
      @confirm="stateChange"
    >
    </popwndSelect>
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
          <view class="item-title">库存地点</view>
          <view class="clrGray" style="flex: 1" @click="bShowStock = true">
            <text v-if="stocks.length !== 0">{{ stocks[stockIdx].name }}</text>
            <image
              src="../static/imgs/mine/right.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>
        <view class="line"></view>
        <view class="item" style="flex: 1">
          <view class="item-title">类型</view>
          <view class="clrGray" style="flex: 1" @click="bShowTag = true">
            <text v-if="tagList.length !== 0">{{ tagList[tagIdx] }}</text>
            <image
              src="../static/imgs/mine/right.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>
        <view class="line"></view>
        <view class="item" style="flex: 1">
          <view class="item-title">状态</view>
          <view class="clrGray" style="flex: 1" @click="bShowState = true">
            <text>{{ states[stateIdx].name }}</text>
            <image
              src="../static/imgs/mine/right.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>
      </view>
    </view>
    <view v-if="haveData == 0" class="no-data">
      <image src="../static/imgs/common/no.png" mode="aspectFill"></image>
      <text style="font-size: 30rpx">暂无数据~</text>
    </view>
    <view v-else class="inventory-main">
      <view class="inventory-num">
        <view>共查询到{{ total }}件商品 </view>
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
                    :src="imgUrl + item.img.split('|')[0]"
                    mode="aspectFill"
                  >
                  </image>
                </view>
                <view style="flex: 1">
                  <view class="every-name">
                    <view class="bh">{{ item.productName }}</view>
                    <view
                      v-if="stateIdx == 0 || stateIdx == 3"
                      :style="{
                        color: getSaleStateClr(item),
                        'font-size': '28rpx',
                        'margin-left': '15rpx',
                      }"
                    >
                      {{ getSaleState(item) }}
                    </view>
                  </view>
                  <view v-if="item.state == 4">
                    <view class="cs"
                      >售价:
                      {{ getPrice(item.saleMoney, item.saleCurrency) }}
                    </view>
                    <view v-if="item.saleCurrency == 'CNY'" class="cs"
                      >利润:
                      {{
                        getPrice(
                          costPrice(item.saleMoney, item.totalCnPrice),
                          "CNY"
                        )
                      }}
                    </view>
                  </view>
                  <view v-else>
                    <view class="cs"
                      >价格:
                      {{ getPrice(item.tagPrice, "CNY") }}
                    </view>
                    <view class="cs"
                      >库存地:
                      {{ item.storageName }}
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
export default {
  components: {
    popwndSelect,
  },
  data() {
    return {
      imgUrl: this.$baseUrl + "/jewellery/api",
      haveData: 1,
      height: null,
      keyWord: "",
      page: 1,

      bShowStock: false,
      stockIdx: 0,
      stocks: [],

      bShowState: false,
      stateIdx: 3,
      states: [
        {
          id: -1,
          name: "全部",
        },
        {
          id: 0,
          name: "存货",
        },
        {
          id: 1,
          name: "运输中",
        },
        {
          id: 5,
          name: "未出售",
        },
        {
          id: 4,
          name: "已出售",
        },
      ],

      bShowTag: false,
      tagIdx: 0,
      tagList: [],

      list: [],
      total: 0,

      haveMore: 0,
    };
  },
  onLoad() {
    // 获取手机状态栏高度
    uni.getSystemInfo({
      success: (data) => {
        // 将其赋值给this
        this.height = data.statusBarHeight;
      },
    });

    this.stockIdx = 0;
    this.stateIdx = 3;

    if (this.list.length == 0 && uni.getStorageSync("token").length > 0) {
      console.log("重新获取数据");
      this.getStockList();
      this.getTagList();
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
    this.search();
    this.getStockList();
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
      };

      if (this.stockIdx > 0) data.storageId = this.stocks[this.stockIdx].id;
      if (this.stateIdx > 0) data.state = this.states[this.stateIdx].id;
      if (this.tagIdx > 0) data.tag = this.tagList[this.tagIdx];

      uni.request({
        url:
          this.$baseUrl +
          "/jewellery/api/productStockSearch?page=" +
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
          console.log("珠宝成品列表");
          console.log(res);
          if (this.checkBack(res) == false) return;

          this.total = res.data.total;

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
    // 获取库存地列表
    getStockList() {
      uni.request({
        url: this.$baseUrl + "/jewellery/api/storageList",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        complete: (ret) => {
          console.log("库存地列表");
          console.log(ret);
          uni.hideLoading();
          if (this.checkBack(ret, true) == false) return;
          if (ret.data.length > 0) this.stocks = ret.data;
          console.log(this.stocks);
        },
      });
    },
    // 获取标签列表
    getTagList() {
      uni.request({
        url: this.$baseUrl + "/jewellery/api/tagList",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        complete: (ret) => {
          console.log("标签列表");
          console.log(ret);
          uni.hideLoading();
          if (this.checkBack(ret, true) == false) return;
          if (ret.data.length > 0) this.tagList = ret.data;
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
    // 库存地变化
    stockChange(e) {
      this.stockIdx = e.sel;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 库存状态变化
    stateChange(e) {
      this.stateIdx = e.sel;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 标签
    tagChange(e) {
      this.tagIdx = e.sel;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 不同状态颜色
    getSaleStateClr(item) {
      if (item.state == 0) return "#54b7eb";
      else if (item.state == 1) return "#6bcda5";
      else return "#ef5b5b";
    },
    // 商品状态
    getSaleState(item) {
      for (let i = 0; i < this.states.length; ++i) {
        if (item.state == this.states[i].id) return this.states[i].name;
        else if (item.state == 4) return "已售";
      }
      return "";
    },
    // 查看包包详情
    checkDetails(item) {
      uni.navigateTo({
        url: "./jewelryDetails?id=" + item.id,
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
    padding-bottom: 26rpx;
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
  }

  .inventory-main {
    margin-top: 30rpx;
    /*#ifdef MP-WEIXIN*/
    padding: 460rpx 30rpx 30rpx;
    /*#endif*/
    /*#ifndef MP-WEIXIN*/
    padding: 400rpx 30rpx 30rpx;
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
